

import mqtt from "mqtt";
import fs from "fs";

// Define the MQTT broker URL and port
const brokerUrl = 'mqtt://projectmaster.devbit.be';
const brokerPort = 1883;

const brokerUrl2 = 'mqtt://fenix.devbit.be';
const brokerPort2 = 38883;


// Create an MQTT client

var options1 = {
  port: "1883",
  host: "projectmaster.devbit.be",
  protocol:'mqtt',
  rejectUnauthorized : false,
  username : "Lannootree",
  password : "Lannootree"
 
};
const client = mqtt.connect(options1);

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
let currentCommand = "";



// Handle connection events
client.on('connect', () => {
  console.log('Connected to MQTT broker projectmaster');
  
  // Subscribe to a topic
  client.subscribe('PM/Lannootree/command', (err) => {
    if (!err) {
      console.log('Subscribed to "PM/Lannootree/command"');
    }
  });

  // Publish a message after a short delay
  /*setTimeout(() => {
    client.publish('PM/Lannootree', 'Hello, MQTT!');
    console.log('Message published');
  }, 2000);*/
  /*setInterval(() => {
    client.publish('PM/Lannootree', 'Hello, MQTT!');
    console.log('Message published');
  }, 1000); // 60000 milliseconds = 1 minute
});*/
});
// Publish a message after a short delay
  /*setTimeout(() => {
    const messageData = {
      "rgb": "FF0000",
      "status": "ingeschakeld"
    };
    const jsonMessage = JSON.stringify(messageData);
    client.publish('PM/Lannootree', jsonMessage);
    console.log('Message published:', jsonMessage);
  }, 1000); // 1000 milliseconds = 1 second
  });*/
/*setInterval(() => {
  const messageData = {
    "rgb": "FF0000",
    "status": "ingeschakeld"
  };
  const jsonMessage = JSON.stringify(messageData);
  client.publish('PM/Lannootree', jsonMessage);
  console.log('Message published:', jsonMessage);
}, 1000); // 1000 milliseconds = 1 second
});*/

/*// Handle incoming messages
client.on('message', (topic, message) => {
  console.log(`Received message on topic "${topic}": ${message.toString()}`);
});*/
client.on('message', (topic, message) => {
  console.log(`Received message on topic "${topic}": ${message.toString()}`);
  const data = JSON.parse(message.toString());
  const rgbValue = data.rgb;
  const deviceStatus = data.status;

  console.log(`Received RGB value: ${rgbValue}`);
  console.log(`Received device status: ${deviceStatus}`);
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
    var  media = "2";
    var deviceStatus = "play_media";
  
client.on('message', (topic, message) => {
  console.log(`Received message on topic "${topic}"`);  
  try{
    

    if(topic == "PM/Lannootree/effect"){
       media = message.toString();
    }else if (topic == "PM/Lannootree/command") {
       deviceStatus = message.toString();

    }
    
    

    //console.log(`Received device something: ${data}`);
    console.log(`Received device status: ${deviceStatus}`);

    if(deviceStatus == "ON"){
        deviceStatus = "play_media"
    }else if(deviceStatus == "OFF"){
      deviceStatus = "stop"
    }

    console.log(`Received device status: ${deviceStatus}`);
    


    console.log(`Received device texture playing: ${media}`);

    if(currentMedia !== media || currentCommand !== deviceStatus){
      client2.publish('controller/in', `{"command": "${deviceStatus}", "media_id": ${media}}`); //`{"command": "play_media", "media_id": ${media}}`    ${data} ==> werkt niet    {"command": "play_media", "media_id": "3"}   ${message.toString()}
      console.log(`Message published tree : {"command": "${deviceStatus}", "media_id": ${media}}` );
      //console.log(message.toString());


      currentMedia = media;
      currentCommand = deviceStatus;
  
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