# webRTC
A draft project of webRTC videogame

At the moment si a simply project. It's based on webRTC protocol.

There are a server wich listen on port 3000 and then broadcats message from clients to all connected sockets.

The draft contains a basic chat, relatime whiteboard and basic videogame wich has a controller.

The videogame is the most relevant. You can open "the game" in whatever chrome browser platform and with an other device, most likely
a mobile phone, will act as the game controller.

All of those is called dual-screen videogame. On mobile phone you access to URL controller attached to main videogame and both interact
with nodejs to response the realtime events.


How it works?

1) Initialize the server:
/home/user$ node index.js
2) Open main game:
Access to http://server_name:3000
3) Obtain the controller
Access with some device to http://server_name:3000/controller

Have fun!


