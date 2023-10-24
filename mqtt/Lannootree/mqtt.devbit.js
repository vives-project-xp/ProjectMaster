

import mqtt from "mqtt";
import fs from "fs";

// Define the MQTT broker URL and port
const brokerUrl = 'mqtt://mqtt.devbit.be';
const brokerPort = 1883;

const brokerUrl2 = 'mqtt://fenix.devbit.be';
const brokerPort2 = 38883;


// Create an MQTT client
const client = mqtt.connect(`${brokerUrl}:${brokerPort}`);

var caFile = fs.readFileSync("./ca.crt");
var clientcrt = fs.readFileSync("./client.crt");
var clientkey = fs.readFileSync("./client.key");
var options = {
  port: "38883",
  host: "fenix.devbit.be",
  protocol:'mqtts',
  rejectUnauthorized : false,
  ca:caFile,
  cert: clientcrt,
  key: clientkey,
 
};
const client2 = mqtt.connect(options);
let currentMedia = null; // Initialize currentMedia  



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

client2.on('connect', () => {
  console.log('Connected to MQTT broker Tree');
  
  // Subscribe to a topic
  client2.subscribe('controller/in', (err) => {
    if (!err) {
      console.log('Subscribed to "controller/in"');
    }
  });

});

  
client.on('message', (topic, message) => {
  console.log(`Received message on topic "${topic}"`);  
  try{
    
    const data = JSON.parse(message.toString());

    const deviceStatus = data.command;
    const media = data.media_id;


    console.log(`Received device status: ${deviceStatus}`);
    console.log(`Received device texture playing: ${media}`);

    if(currentMedia!== media){
      client2.publish('controller/in', `${message.toString()}`); //`{"command": "play_media", "media_id": ${media}}`    ${data} ==> werkt niet    {"command": "play_media", "media_id": "3"}
      console.log('Message published tree');
      console.log(message.toString());


      currentMedia = media;
  
    }
  
    
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
});


  
  


// Handle errors
client.on('error', (err) => {
  console.error('Error:', err);
});

// Handle disconnection
client.on('close', () => {
  console.log('Disconnected from MQTT broker');
});