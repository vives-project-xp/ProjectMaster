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

  // Publish a message after a short delay
  /*setTimeout(() => {
    client.publish('PM/Lannootree', 'Hello, MQTT!');
    console.log('Message published');
  }, 2000);*/
  setInterval(() => {
    client.publish('PM/Lannootree', 'Hello, MQTT!');
    console.log('Message published');
  }, 1000); // 60000 milliseconds = 1 minute
});

// Handle incoming messages
client.on('message', (topic, message) => {
  console.log(`Received message on topic "${topic}": ${message.toString()}`);
});

// Handle errors
client.on('error', (err) => {
  console.error('Error:', err);
});

// Handle disconnection
client.on('close', () => {
  console.log('Disconnected from MQTT broker');
});
