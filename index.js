require("console-stamp")(console);
//load env'
require('dotenv').config();
var amqp = require('amqp10');
var linkCache = require('amqp10-link-cache');
var AMQPClient = require('amqp10').Client;
var Policy = require('amqp10').Policy;
var utils = require("./utils");
amqp.use(linkCache());


var eventHubConnectionString = utils.createEventHubConnectionString();
var hub1 = "webview";
var hub2 = "webevent";

var eventhubOpt = {
    senderLink: {
        attach: {
            maxMessageSize: 256000, // Max eventhub size
        }
    }
}

var eventHubPolicy = amqp.Policy.merge(eventhubOpt, Policy.EventHub)
//var viewClient = new AMQPClient(amqp.Policy.merge(eventhubOpt, Policy.EventHub));
var eventClient = new AMQPClient(amqp.Policy.merge(eventhubOpt, Policy.EventHub));

var eventConnectPromise = eventClient.connect(eventHubConnectionString);
//var viewConnectPromise = viewClient.connect(eventHubConnectionString);

Promise.all([/*viewConnectPromise,*/eventConnectPromise]).then(startSendingMessages).catch(err => console.error(err));


function startSendingMessages() {
    setInterval(function () {
    //    sendMessage(viewClient, hub1);
    }, 100)

    setInterval(function () {
        sendMessage(eventClient, hub2);
    }, 300)
}

function sendMessage(client, eventHubName) {
    var payload = "abc";
    return client.createSender(eventHubName).then(function (sender) {
        return sender.send(payload).then( function (){
            console.log('sending message to ' + eventHubName);
        } );
    }).catch(errorCallback);
}

function errorCallback(err) {
    console.error("error while sending", err)
};




