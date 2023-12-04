import mqtt from "mqtt";

var options = {
    port: "1883",
    host: "projectmaster.devbit.be",
    protocol:'mqtt',
    rejectUnauthorized : false,
    username : "Discovery",
    password : "Discovery"
   
  };

const client = mqtt.connect(options);
console.log("Main");
const HAtopic = "PM/homeassistant/";
var projects = [
    {
        "name":"all",
        "group":"all",
        "rgb":"true",
        "deviceType":"light"
    },
    {
        "name":"Lannootree",
        "group":"Lannootree",
        "rgb":"true",
        "effects":[
            "1. RUNNING PIKACHU",
            "2. VIVES",
            "3. QATAR",
            "4. DIK VET KONIJN MOVIE",
            "5. DONALD TRUMP",
            "6. HOMER 420",
            "7. BANANA",
            "8. SILLEVL",
            "9. DONKERE KERSTBOOM",
            "11. SHOCKED MONKEY",
            "12. ACCIDENTAL CODER",
            "13. ALIEN",
            "14. AMOGUS",
            "15. BAD APPLE",
            "16. O'BALLENBOOM",
            "17. CASH",
            "18. BIJEN",
            "19. COLORWHEEL",
            "20. HOMER",
            "21. DIAMONDS",
            "22. HOMER DONUT",
            "23. KAARS",
            "24. KIRBY",
            "26. THE LION KING",
            "27. TEAM LANNOOTREE",
            "28. NEON",
            "29. PIKACHU",
            "30. POES",
            "31. PRISMARINE",
            "32. RICARDO WHIP",
            "33. RICK",
            "35. DANCING SANTA",
            "36. SANTA'S EYES",
            "37. SINT",
            "38. SPINNING TREE",
            "39. SPONGEBOB",
            "40. STAR",
            "41. SHOWER",
            "42. TF2 ENGINEER",
            "43. ???",
            "44. EO-ICT VIVES"
        ],
        "deviceType":"light"
    },{
        "name":"MLT1",
        "group":"MLT",
        "deviceType":"light",
        "rgb":"true"
    },{
        "name":"MLT2",
        "group":"MLT",
        "deviceType":"light",
        "rgb":"true"
    },{
        "name":"MLT3",
        "group":"MLT",
        "deviceType":"light",
        "rgb":"true"
    },{
        "name":"58CF79E35BCC",
        "group":"EOMarkers",
        "deviceType":"light",
        "rgb":"true"
    },{
        "name":"58CF79E39D18",
        "group":"EOMarkers",
        "deviceType":"light",
        "rgb":"true"
    },{
        "name":"58CF79E3782C",
        "group":"EOMarkers",
        "deviceType":"light",
        "rgb":"true"
    },{
        "name": "1091A8F10F7C",
        "group": "EOMarkers",
        "deviceType": "light",
        "rgb": "true"
    },{
        "name":"58CF79E37FA4",
        "group":"EOMarkers",
        "deviceType":"light",
        "rgb":"true"
    },{
        "name":"58CF79E2C6C4",
        "group":"EOMarkers",
        "deviceType":"light",
        "rgb":"true"
    },{
        "name":"58CF79E29ABC",
        "group":"EOMarkers",
        "deviceType":"light",
        "rgb":"true"
    },{
        "name": "58CF79E2A994",
        "group": "EOMarkers",
        "deviceType": "light",
        "rgb": "true"
    },{
        "name":"58CF79E3AB00",
        "group":"EOMarkers",
        "deviceType":"light",
        "rgb":"true"
    },{
        "name": "58CF79E35F68",
        "group": "EOMarkers",
        "deviceType": "light",
        "rgb": "true"
    },{
        "name":"DL",
        "group":"DL",
        "deviceType":"light",
        "rgb":"true"
    },{
        "name":"RL",
        "group":"RL",
        "deviceType":"light",
        "rgb":"true"
    },{
        "name":"Aurora",
        "group":"Aurora",
        "deviceType":"light",
        "rgb":"true"
    }
    ];


function topicBuilder(deviceType, name) {
    return HAtopic + deviceType + "/" + name + "/config";
}

// Function to build the payload for each project
function payloadBuilder(project) {
    return {
        "effect_list": project.effects,
        "name": project.name,
        "command_topic": "PM/" + project.group + "/" + project.name + "/command",
        "rgb_command_topic": "PM/" + project.group + "/" + project.name + "/rgb",
        "effect_command_topic": "PM/" + project.group + "/" + project.name + "/effect",
        "brightness_command_topic": "PM/" + project.group + "/" + project.name + "/brightness",
        "schema": project.schema
    };
}

function JSONPayloadBuilder(project) {
    return {
        "rgb_command_topic": "PM/" + project.group + "/" + project.name + "/rgb",
        "color_mode": project.rgb,
        "commandTopic": "PM/" + project.group + "/" + project.name + "/command",
        "name": project.name,
        "schema":"JSON"
    };
}

var outputMsgs = [];

function sendProjects() {
    for (var deviceId in projects) {
      var project = projects[deviceId];
      var deviceType = project.deviceType;
      var schema = project.schema;
      var payload = {};
      var topic = topicBuilder(deviceType, project.name);
      if (schema == "JSON") {
        payload = JSONPayloadBuilder(project);
      } else {
        payload = payloadBuilder(project);
      }
      console.log(topic)
      console.log(payload)
      client.publish(topic, JSON.stringify(payload));
    }
  }
  
  // Initial send
sendProjects();
  
  // Set interval to send projects every 5 minutes
setInterval(() => {
    sendProjects();
  }, 5 * 60 * 1000); 
// Handle errors
client.on('error', (err) => {
    console.error('Error:', err);
  });
  
// Handle disconnection
  client.on('close', () => {
    console.log('Disconnected from MQTT broker');
});