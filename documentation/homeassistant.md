# Home Assistant 

## Table of contents

* Configuration Script

### configuration.yaml



//nog een beetje extra uitleg pls Robbe 

```yaml
default_config:

frontend:
  themes: !include_dir_merge_named themes

script: !include scripts.yaml
scene: !include scenes.yaml


input_boolean:
  58cf79e35bcc_button:
    name: "58CF79E35BCC Button"
    initial: off
    icon: mdi:flashlight

  58cf79e39d18_button:
    name: "58CF79E39D18 Button"
    initial: off
    icon: mdi:flashlight

  58cf79e3782c_button:
    name: "58CF79E3782C Button"
    initial: off
    icon: mdi:flashlight

  1091a8f10f7c_button:
    name: "1091A8F10F7C Button"
    initial: off
    icon: mdi:flashlight

  58cf79e37fa4_button:
    name: "58CF79E37FA4 Button"
    initial: off
    icon: mdi:flashlight

  58cf79e2c6c4_button:
    name: "58CF79E2C6C4 Button"
    initial: off
    icon: mdi:flashlight

  58cf79e29abc_button:
    name: "58CF79E29ABC Button"
    initial: off
    icon: mdi:flashlight

  58cf79e2a994_button:
    name: "58CF79E2A994 Button"
    initial: off
    icon: mdi:flashlight

  58cf79e3ab00_button:
    name: "58CF79E3AB00 Button"
    initial: off
    icon: mdi:flashlight

  58cf79e35f68_button:
    name: "58CF79E35F68 Button"
    initial: off
    icon: mdi:flashlight

  turn_on_all_buttons:
    name: "Turn On All Buttons"
    initial: off
    icon: mdi:flashlight

automation:
  - id: turn_on_all_buttons
    alias: Turn On All Buttons
    trigger:
      platform: state
      entity_id: input_boolean.turn_on_all_buttons
      to: "on"
    action:
      - service: mqtt.publish
        data:
          topic: "PM/EOMarkers/58CF79E35BCC/visualize"
          payload: "true"
      - service: mqtt.publish
        data:
          topic: "PM/EOMarkers/58CF79E39D18/visualize"
          payload: "true"
      - service: mqtt.publish
        data:
          topic: "PM/EOMarkers/58CF79E3782C/visualize"
          payload: "true"
      - service: mqtt.publish
        data:
          topic: "PM/EOMarkers/1091A8F10F7C/visualize"
          payload: "true"
      - service: mqtt.publish
        data:
          topic: "PM/EOMarkers/58CF79E37FA4/visualize"
          payload: "true"
      - service: mqtt.publish
        data:
          topic: "PM/EOMarkers/58CF79E2C6C4/visualize"
          payload: "true"
      - service: mqtt.publish
        data:
          topic: "PM/EOMarkers/58CF79E29ABC/visualize"
          payload: "true"
      - service: mqtt.publish
        data:
          topic: "PM/EOMarkers/58CF79E2A994/visualize"
          payload: "true"
      - service: mqtt.publish
        data:
          topic: "PM/EOMarkers/58CF79E3AB00/visualize"
          payload: "true"
      - service: mqtt.publish
        data:
          topic: "PM/EOMarkers/58CF79E35F68/visualize"
          payload: "true"
      - delay: "00:00:10"
      - service: input_boolean.turn_off
        entity_id: input_boolean.turn_on_all_buttons


  - alias: "Zigbee2MQTT Switch1 Action Listener"
    trigger:
      platform: mqtt
      topic: "zigbee2mqtt/Switch1/action"
    
    action:
      - service: logbook.log
        data:
          name: "Zigbee2MQTT Switch1 Action Payload"
          message: "Received payload: {{ trigger.payload }}"


  - alias: "Zigbee2MQTT Switch2 Action Listener"
    trigger:
      platform: mqtt
      topic: "zigbee2mqtt/Switch2/action"
    
    action:
      - service: logbook.log
        data:
          name: "Zigbee2MQTT Switch2 Action Payload"
          message: "Received payload: {{ trigger.payload }}"

```
