const mqtt = require('mqtt');

// Define the MQTT broker URL and port
const brokerUrl = 'mqtt://mqtt.devbit.be';
const brokerPort = 1883;

const brokerUrl2 = 'mqtt://mqtt.lannootree.org';
const brokerPort2 = 1883;


// Create an MQTT client
const client = mqtt.connect(`${brokerUrl}:${brokerPort}`);

// Handle connection events
client.on('connect', () => {
  console.log('Connected to MQTT broker');
  
  // Subscribe to a topic
  client.subscribe('PM/Lannootree', (err) => {
    if (!err) {
      console.log('Subscribed to "PM/Lannootree"');
    }
  });


});

client.on('message', (topic, message) => {
  console.log(`Received message on topic "${topic}"`);  //: ${message.toString()}
  const data = JSON.parse(message.toString());
  const rgbValue = data.rgb;
  const deviceStatus = data.command;
  const media = data.media_id;

  console.log(`Received RGB value: ${rgbValue}`);
  console.log(`Received device status: ${deviceStatus}`);
  console.log(`Received device texture playing: ${media}`);

});


// Handle errors
client.on('error', (err) => {
  console.error('Error:', err);
});

// Handle disconnection
client.on('close', () => {
  console.log('Disconnected from MQTT broker');
});