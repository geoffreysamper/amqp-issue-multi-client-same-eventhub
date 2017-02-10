# amqp-issue-multi-client-same-eventhub
simulate reconnection failure with amqp10 and amqp-link-cache

# how to use
- npm install
- configure enviremont variables
- edit file default.env and fill in the values and rename it to .env
- install [cports](http://www.nirsoft.net/utils/cports.html) for windows or tcpkill for linux
- run node.exe index.js

#how to simulate the failure (with amqp link cache)
- run node index.js
- open cport as adm
- kill the connection for the eventhub for eventhub port 5671

Normally you should have the error

- [with link cache](https://www.screencast.com/t/8ZVFihHPG7) reconnect not working
- [without link cache](https://www.screencast.com/t/Cc6Jzpfekj) the Reconnect works

 [see issue](https://github.com/mbroadst/amqp10-link-cache/issues/11)
