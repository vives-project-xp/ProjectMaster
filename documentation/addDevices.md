# Add devices
This readme will tell any future user of the Project Master how to add devices to their Dashboard
## Data
Inside the repo under Projectmaster/mqtt/discovery
there is a nodejs application. In here you will see a sizeable JS object named projects.

This is where you will add new devices

To add a device you will need to add a new item to the array seperated by a comma. Some values will be needed to be filled in. Some are optional

### Possible variables per device 

The following variables have been implemented per device devided by being optional or not

#### Not optional

- name :

    this is the name of the device inside of Home Assistant and the name of the device under the topic
- group :

    this is the project under which the device falls
    this is also the name of the project under the mqtt topic
    do make sure the group name is the same as the login credentials for the broker
- deviceType :

    this is the devicetype as required by HomeAssistant
    for further info about all possible device types look up the mqtt documentation by homeassistant [MQTT integrations](https://www.home-assistant.io/integrations/MQTT/)

#### Optional
- colorFormat:

    this is the colorFormat that HomeAssistant can use see [Studentprojects](STUDENTPROJECTS.md) for a list of all supported colorformats
- effectList:

    this is a list of effects HomeAssistant will add to the device





example of a project added inside of the json:
```json
{
    "name":"Device",
    "group":"Project",
    "deviceType":"light",
    "colorFormat":"rgb",
    "effects":[
        "effect1",
        "effect2",
        "effect3"
    ]
}
```
## Home Assistant lovelace
All projects added to the projects inside of the discovery nodeJS app will automatically show up under the PM dashboard inside of HomeAssistant [here](http://10.11.0.6:8123/lovelace/default_view).
However if you want a specific dashboard for a single project you will need to add this yourself.

### Add dashboard

To add a dashboard for a project inside of HA you press the +
Then you can add an autoentitycard inside of the dashboard and paste in the following.

```yaml
type: custom:auto-entities
filter:
  include:
    - name: /ProjectName/
  exclude: []
sort:
  method: domain
  numeric: true
card:
  type: entities
  show_header_toggle: false
```
Do take care to change the filter ProjectName to the correct name