# city_explorer_api

# Node, npm, and Express

## Overview

Today we will take a step into the back end, beginning to write a proper `server.js` file to serve API data to the City Explorer client application. You will continue to build out this file through lab 9, working with a new partner each day.

Another component of this portion of the course involves working with a static client which you have no control over. You will be able to view the source code for this client, but will not be permitted to modify it in anyway. Servers and clients are separate entities; the only relationships that exist between them are the relationships we create. This week, you will be creating those relationships.

# Project Name

**Author**: Lee Thomas
**Version**: 2.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->
This application is being made to house all types of information for any given place. This includes but is not limited to weather conditions of the area, trails to hike, restaurants nearby atc.

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->
You need a back end server to launch this site first and foremost. You will also need your very own unique API keys to access the data we are displaying. We need to require our dependencies in our server js, and listen to the server as well. Lastly you will need route handler functions that take in a request and return a response to each unique route. 

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->
This server uses dotenv, express, and cors as its dependencies. We are using superagent to make the API processing easier. We will take in a unique route, such as /location and that will run a callback function that takes in a request, and returns its unique response. We are using PORT 3000 because we are building out a backend, and its common practice to use 3000 for backend.

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource.

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
Version 1.0.0 - base
Version 2.0.0 - start of lab 07, feature 1
Version 2.0.1 - cleaned up server.js now ready for refactor
Version 2.1.0 - finished refactoring old code, and get a map of whichever unique city was requested rendering.
Version 2.2.0 - finished rendering weather forecast for selected city.
Version 2.3.0 - finished rendering nearby trails.
Version 3.0.0 - start of lab 09, feature 1 (database)
Version 3.0.1 - Cant get psql to communicate with my server.js
Version 3.0.2 - fixed terminal bug
Version 3.1.0 - finished saving locations into database
Version 3.1.1 - couldnt figure out how to get weather into the database.

# Lab 06

### Number and name of feature: #1 Repository Set Up

Estimate of time needed to complete: 10 minutes

Start time: 2:25

Finish time: 2:46

Actual time needed to complete: 21 minutes

### Number and name of feature: #2 Locations

Estimate of time needed to complete: 1 hour

Start time: 2:47

Finish time: 4:40

Actual time needed to complete: 1 hour and 53 minutes

### Number and name of feature: #3 Weather

Estimate of time needed to complete: 1 hour

Start time: 4:55

Finish time: 5:54

Actual time needed to complete: 59 minutes

### Number and name of feature: #4 Errors

Estimate of time needed to complete: 1 hour

Start time: 6:00

Finish time: 6:30

Actual time needed to complete: 30 minutes

# Lab 07

### Number and name of feature: #5 Data Formatting

Estimate of time needed to complete: 1 hour

Start time: 1:40

Finish time: 4:40

Actual time needed to complete: 3 Hours

### Number and name of feature: #6 Locations

Estimate of time needed to complete: 1 hour

Start time: 1:40

Finish time: 4:40

Actual time needed to complete: 3 Hours

### Number and name of feature: #7 Weather

Estimate of time needed to complete: 1 hour

Start time: 4:40

Finish time: 6:40

Actual time needed to complete: 2 Hours

### Number and name of feature: #8 Trails

Estimate of time needed to complete: 1 hour

Start time: 6:40

Finish time: 7:10

Actual time needed to complete: 30 minutes

#Lab 08 

Number and name of feature: #9 Database

Estimate of time needed to complete: 2 hours

Start time: 7:00

Finish time: tbd

Actual time needed to complete: 

#Lab 09

Number and name of feature: #9 Location Database

Estimate of time needed to complete: 1 hours

Start time: 2:30

Finish time: 3:10

Actual time needed to complete: 40min

Number and name of feature: #10 Weather Database

Estimate of time needed to complete: 2 hours

Start time: 3:30pm - 10pm ;nextday; 12:30

Finish time: 

Actual time needed to complete: 
