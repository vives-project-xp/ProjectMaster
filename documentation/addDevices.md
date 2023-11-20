# add Devices
Ask the PM Admins to add a device
## Data
maak een json aan en geef dit aan de Admins die dan de json toevoegen aan de data.
vb van json:
```json
{
    "name":"MLT1",
    "group":"MLT",
    "deviceType":"light",
    "rgb":"true"
}
```
 - name: name device
 - group: project name
 - devicetype: type of device to add (see [MQTT integrations](https://www.home-assistant.io/integrations/MQTT/) at **MQTT Discovery**)
 - otherTopic Bool: add a topic command when true (can [add more topics](#topics))
