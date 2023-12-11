

import mqtt from "mqtt";
import fs from "fs";

// Define the MQTT broker URL and port
const brokerUrl = 'mqtt://projectmaster.devbit.be';
const brokerPort = 1883;

const brokerUrl2 = 'mqtt://fenix.devbit.be';
const brokerPort2 = 38883;




// Create an MQTT client
var pswkey = fs.readFileSync("./psw.key");
var options1 = {
  port: "1883",
  host: "projectmaster.devbit.be",
  protocol:'mqtt',
  rejectUnauthorized : false,
  username : "Lannootree", 
  password : pswkey   // Lannootree
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


function setColor(rgb) {
      const rgbString = rgb.toString(); // De string "163,202,255"
      const rgbArray = rgbString.split(','); // Splitten op komma

      // Controleren of we drie waarden hebben
      if (rgbArray.length === 3) {
         var r = parseInt(rgbArray[0], 10); // Eerste waarde als rode component
         var g = parseInt(rgbArray[1], 10); // Tweede waarde als groene component
         var b = parseInt(rgbArray[2], 10); // Derde waarde als blauwe component

        console.log(`R: ${r}, G: ${g}, B: ${b}`);

        // Nu heb je de individuele R, G en B-componenten in de variabelen r, g en b.
      } else {
        console.error('Ongeldige RGB-string: moet drie waarden bevatten');
      }
      client2.publish('controller/in', `{"command": "stop"}`); //`{"command": "play_media", "media_id": ${media}}`    ${data} ==> werkt niet    {"command": "play_media", "media_id": "3"}   ${message.toString()}
      setTimeout(() => {}, 50);
      client2.publish('controller/in', `{"command": "color", "red": ${r}, "green": ${g}, "blue": ${b}}`); //`{"command": "play_media", "media_id": ${media}}`    ${data} ==> werkt niet    {"command": "play_media", "media_id": "3"}   ${message.toString()}
      setTimeout(() => {}, 50);
      client2.publish('controller/in', `{"command": "color", "red": ${r}, "green": ${g}, "blue": ${b}}`); //`{"command": "play_media", "media_id": ${media}}`    ${data} ==> werkt niet    {"command": "play_media", "media_id": "3"}   ${message.toString()}
      console.log(`Message published tree : {"command": "color", "red": ${r}, "green": ${g}, "blue": ${b}}` );

}

function setEffect(effect) {
    const effectID = effect.toString(); 
    var firstNumber = parseFloat(effectID.match(/\d+/));
    console.log(firstNumber); // This will log the first number in the string


    client2.publish('controller/in', `{"command": "play_media", "media_id": ${firstNumber}}`); //`{"command": "play_media", "media_id": ${media}}`    ${data} ==> werkt niet    {"command": "play_media", "media_id": "3"}   ${message.toString()}
    console.log(`Message published tree : {"command": "play_media", "media_id": ${firstNumber}}` );
}

function Switch1(effect) {
  const effectID = effect.toString(); 
  
  console.log(firstNumber); // This will log the first number in the string


  client2.publish('controller/in', `{"command": "play_media", "media_id": ${firstNumber}}`); //`{"command": "play_media", "media_id": ${media}}`    ${data} ==> werkt niet    {"command": "play_media", "media_id": "3"}   ${message.toString()}
  console.log(`Message published tree : {"command": "play_media", "media_id": ${firstNumber}}` );
}

function off(messageOFF){
      const command = messageOFF.toString();
      if(command == "OFF"){
        client2.publish('controller/in', `{"command": "stop"}`); //`{"command": "play_media", "media_id": ${media}}`    ${data} ==> werkt niet    {"command": "play_media", "media_id": "3"}   ${message.toString()}
        setTimeout(() => {}, 50);
        client2.publish('controller/in', `{"command": "color", "red": 0, "green": 0, "blue": 0}`); //`{"command": "play_media", "media_id": ${media}}`    ${data} ==> werkt niet    {"command": "play_media", "media_id": "3"}   ${message.toString()}
        setTimeout(() => {}, 50);
        client2.publish('controller/in', `{"command": "color", "red": 0, "green": 0, "blue": 0}`); //`{"command": "play_media", "media_id": ${media}}`    ${data} ==> werkt niet    {"command": "play_media", "media_id": "3"}   ${message.toString()}
        console.log(`Message published tree : {"command": "color", "red": 0, "green": 0, "blue": 0}` );
        
      }
    else{
      console.log("device on")
      
    }

    



}


// Handle connection events
client.on('connect', () => {
  console.log('Connected to MQTT broker projectmaster');
  
  // Subscribe to a topic
  client.subscribe('PM/Lannootree/Lannootree/command', (err) => {
    if (!err) {
      console.log('Subscribed to "PM/Lannootree/Lannootree/command"');
    }
  });


});

client.on('connect', () => {
  console.log('Connected to MQTT broker projectmaster');
  
  // Subscribe to a topic
  client.subscribe('PM/Lannootree/Lannootree/effect', (err) => {
    if (!err) {
      console.log('Subscribed to "PM/Lannootree/Lannootree/effect"');
    }
  });


});

client.on('connect', () => {
  console.log('Connected to MQTT broker projectmaster');
  
  // Subscribe to a topic
  client.subscribe('PM/Lannootree/Lannootree/rgb', (err) => {
    if (!err) {
      console.log('Subscribed to "PM/Lannootree/Lannootree/rgb"');
    }
  });


});


client.on('connect', () => {
  console.log('Connected to Switch1');
  
  // Subscribe to a topic
  client.subscribe('zigbee2mqtt/Switch1', (err) => {
    if (!err) {
      console.log('Subscribed to "zigbee2mqtt/Switch1"');
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
    

    if(topic == "PM/Lannootree/Lannootree/effect"){
      setEffect(message)
       
    }
    else if((topic == "PM/Lannootree/Lannootree/rgb" )){  
      setColor(message);

    }else if((topic == "PM/Lannootree/Lannootree/command")){
      
      off(message);
      
    }else if((topic == "zigbee2mqtt/Switch1")){
      Switch1(message);
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