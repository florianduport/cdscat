# Cdscat

Cdscat is catalog website based on Endurance Framework with MongoDB, Node.js, Sails and AngularJS. It is based on Docker containers.

## Prerequisite Tools

Docker (1.11.1 or higher)

https://docs.docker.com/linux/


Docker-compose version : 1.7.1 (version 2 yml files are used)

https://docs.docker.com/compose/install/

## Installation

It's pretty easy : Git clone or fork this repo and open a terminal.

Run : docker-compose up

Go to : http://172.0.0.10/  It works !

## How does it work ?

### Database

The database is built from the mongodb docker image. It uses a docker volume stored in db/data. This folder is ignored by git so these data aren't messing up the repo.

default ip address : 172.0.0.12

### Api

The api is built from the node docker image. It exposes a sails server. This server is not directly accessed by clients. It is only aimed to be requested by the angular application to manipulate database data.

default ip address : 172.0.0.11

### Front

The front api is running an Nginx server exposing the AngularJS application and serving static files. It is also the only entry point for the clients. It redirects automaticly all /api/ requests to the Api server. This behavior has been made in order to create a cache strategy over the api nodejs server.

default ip address : 172.0.0.10

## How do I get to code in it ?

Basically, there's two folders and seperate applications :

### Sails Application

The Sails Application is hosted in **/api/src**

You can edit everything you need in here.

### Angular Application

The Angular Application is hosted in **/front/src/app**. You can edit everything you need in here as well.

Grunt is configured to publish the application in the **/front/src/dist** folder. All the grunt tasks are defined in the file **/front/src/Grunfile.js**.

The application uses Bower to manage dependencies. Bower components are stored in **/front/src/bower_components** and are automatically copied to **/front/src/dist/libs**.

The Nginx root folder is configured to be the **/front/src/dist** folder.
