/*
 * Evolution Manager LID conversation fix.
 *
 * A WhatsApp contact can have two JIDs. Outbound messages use remoteJid
 * (number@s.whatsapp.net); inbound messages may use remoteJid (@lid) and
 * store the number JID in remoteJidAlt. This rewrites the Manager's message
 * query so it retrieves both records as a single conversation.
 */
(() => {
  const open = XMLHttpRequest.prototype.open;
  const send = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (method, url, ...rest) {
    this.__evolutionRequestUrl = String(url || '');
    return open.call(this, method, url, ...rest);
  };

  XMLHttpRequest.prototype.send = function (body) {
    if (
      this.__evolutionRequestUrl.includes('/chat/findMessages/') &&
      typeof body === 'string'
    ) {
      try {
        const request = JSON.parse(body);
        const remoteJid = request?.where?.key?.remoteJid;

        if (remoteJid) {
          request.where = {
            OR: [
              { key: { path: ['remoteJid'], equals: remoteJid } },
              { key: { path: ['remoteJidAlt'], equals: remoteJid } },
            ],
          };
          body = JSON.stringify(request);
        }
      } catch (_) {
        // Keep the Manager's original request if it cannot be parsed.
      }
    }

    return send.call(this, body);
  };
})();
