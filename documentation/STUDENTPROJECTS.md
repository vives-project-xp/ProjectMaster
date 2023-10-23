# STUDENTPROJECTS
Hier vermeldt men de structuur voor de topics.
## Table of contents
 - [connection](#connection)
 - [broker](#broker)
 - [data](#data)
 - [logins](#logins)
 - [users](#users)
 - [topics](#topics)

## Connection
Om een connectie te verkrijgen verbind met de de MQTT (zie [link]() voor MQTT download) verbind met 10.11.0.6 als IP address.

## Broker
We gebruiken EMQX als de Broker

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
 - otherTopic Bool: add a topic command when true(can [add more topics](#topics))

## Logins
### Info
Men verkrijgt een gebruikers naam (meestal de project naam) met een wachtwoord. 
Met deze naam en wachtwoord logt men in op MQTT.

vb: vives project heeft username vives met passwoord student om in te loggen op de MQTT.

## Users
elk groep kan alleen op hun eigen project werken.

## Topics
### Info
Vraag om een topic door de admins van PM

### Commands
Hier zullen de commands voor de topics gedocumenteerd.
de head topic is PM
verander de ../"project"/.. met de topic van je eigen project.
> het is best dat je met project het type device dat je gaat gebruiken meegeeft, hierdoor kan je makelijker aan de Commands voor dat device.(see [devicetype](#data))

command topic:
turn an device "ON" or "OFF"
```json
PM/project/command
```
rgb topic: control color and brightness of a LED or other colored light
```json
PM/project/rgb
```
effect topic: select a specific effect(mostly from an array)
```json
PM/project/effect
```
<!--add new command topics here-->
### current project topics
 - [MLT/](https://github.com/vives-project-xp/MusicLightTiles)
 - [DL/](https://github.com/vives-project-xp/DancingLight)
 - [TL/](https://github.com/vives-project-xp/TrackingLights)
 - [RL/](https://github.com/vives-project-xp/RainingLEDs)
 - [IOB/](https://github.com/vives-project-xp/MusicLightTiles)
 - [Lannootree/](https://github.com/vives-project-xp/Lannootree)
<!--add new project topics here-->
