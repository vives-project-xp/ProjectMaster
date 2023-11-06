# STUDENTPROJECTS
Hier vermeldt men de structuur voor de topics.
## Table of contents
 - [connection](#connection)
 - [data](#data)
 - [logins](#logins)
 - [users](#users)
 - [Commands](#Commands)

## Connection
Om een connectie te verkrijgen verbind met de de MQTT (zie [link](https://www.home-assistant.io/getting-started/) voor MQTT download) verbind met projectmaster.devbit.be 

## Data
maak een json aan en geef dit aan de Admins die dan de json toevoegen aan de data.
<!--pending change-->
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

**GEEF NOOIT EEN PASWOORD AAN IEMAND BUITEN JE PROJECT OF ZET PASWOORDEN IN EEN COMMIT!!!**

## Users
elk groep kan alleen op hun eigen project werken.<!--pending change-->

## Commands
### Info
Vraag om een topic door de admins van PM, deze topic is uniek per project en zal men ervoor zorgen dat er geen conflict is met andere projecten.

### Commands
Hier zullen de commands voor de topics gedocumenteerd.
de head topic is PM
verander de ../"project"/.. met de topic van je eigen project.
Eerder had je een json (see [json](#data) doorgegeven aan de admin om te zorgen dat je aan de comandos kunt oproepen.
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

