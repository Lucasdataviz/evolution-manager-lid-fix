# Evolution Manager: correção de conversas @lid

Esta imagem personalizada corrige o Manager embutido da Evolution API para
mostrar, na mesma conversa, as mensagens enviadas e recebidas quando o
WhatsApp utiliza identificadores `@lid`.

## O que ela altera

O Manager original consulta somente `key.remoteJid`. A correção transforma a
consulta de cada conversa em:

- `key.remoteJid = numero@s.whatsapp.net`; ou
- `key.remoteJidAlt = numero@s.whatsapp.net`.

Nenhuma tabela, mensagem, instância, Redis ou configuração do PostgreSQL é
alterada.

## Como publicar

1. Envie esta pasta para um repositório Git privado ou público.
2. No Coolify, crie uma nova Application usando esse repositório e selecione
   `Dockerfile` como método de build.
3. Configure a imagem de destino no seu registro Docker.
4. Após a imagem ser publicada, no compose da Evolution substitua somente a
   imagem da API pela imagem personalizada gerada.
5. Faça o redeploy e atualize o navegador com `Ctrl + F5`.

## Retorno seguro

Para desfazer, volte a imagem da API para:

```text
evoapicloud/evolution-api:v2.3.7
```

Os volumes `evolution_instances`, `evolution_redis` e `postgres_data` não são
modificados por esta imagem.
