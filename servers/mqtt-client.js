var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');

const publishRandom = () => client.publish('test', Math.floor(Math.random()*100).toString());

client.on('connect', function () {
    client.subscribe('test', function (err) {
        if (!err) {
            setInterval(publishRandom, 1000)
        } else {
            console.log("Are you sure the MQTT broker address is correct?");
        }
    })

});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    // client.end()  //If you want to end the subscription here
});

module.exports = client;
