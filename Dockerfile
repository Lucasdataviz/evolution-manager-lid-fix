FROM evoapicloud/evolution-api:2.4.0-rc2

# Adds an early browser patch to the bundled Evolution Manager. The Manager
# normally filters a contact by key.remoteJid only; inbound WhatsApp messages
# may instead be stored under key.remoteJidAlt when WhatsApp uses a @lid JID.
COPY manager-lid-fix.js /evolution/manager/dist/assets/manager-lid-fix.js

RUN sed -i 's#</head>#    <script src="/assets/manager-lid-fix.js"></script>\n  </head>#' \
  /evolution/manager/dist/index.html
