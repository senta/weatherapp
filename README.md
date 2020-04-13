# Weather As A Service

## Notes

_Please do not supply your name or email address in this document. We're doing our best to remain unbiased._

## Date

> The date you're submitting this.

April 12, 2020

## Location of deployed application

> If applicable, please provide the url where we can find and interact with your running application.

- The API endpoint is `http://ec2-13-232-255-134.ap-south-1.compute.amazonaws.com/v1/weather?city=Vancouver`
- You can also access to the UI on http://ec2-13-232-255-134.ap-south-1.compute.amazonaws.com/

## Time spent

> How much time did you spend on the assignment? Normally, this is expressed in hours.

I spent 7-8 hours to implement the application. Plus, a few hours to deploy the app on the hosting server.

## Assumptions made

> Use this section to tell us about any assumptions that you made when creating your solution.

- The API will be called no more than 60 times a minute (limitation of Open Weather free tier).
- The API will be called only from the same domain or non-browser environment, such as `curl`.
- Support only modern browsers for the UI.

## Shortcuts/Compromises made

> If applicable. Did you do something that you feel could have been done better in a real-world application? Please let us know.

### Cache Layer

I would add a cache layer between my application and a service API (Open Weather). It will reduce network stress on the service, and it ill also help to reduce latency for my application user.

### Error Handling and Logging

The application just returns an error response whenever an error occurs without any reports. However, in a real-world application, error reporting and logs are essential to detect bugs and problems.

### Server Side Rendering

Because I choose React, server-side rendering will be a good option to improve application performance.

## Stretch goals attempted

> If applicable, use this area to tell us what stretch goals you attempted. What went well? What do you wish you could have done better? If you didn't attempt any of the stretch goals, feel free to let us know why.

I have completed all stretch goals except the authentication part. I couldn't make sense that what part of the application should be protected. If the API does not allow unauthorized calls, you cannot test it with the curl command stated on the PDF. Perhaps I could implement user log-in to save their profile.

Other than that, I believe that I did well on stretch goals.

## Instructions to run assignment locally

> If applicable, please provide us with the necessary instructions to run your solution.

I used Pipenv, a dependency management tool, for backend implementation. And I also created Dockerfile to make it easy to test on your environment. Please use whichever convenient for you. (_tested only on macOS_) For the front-end part, I put built files in the repo. So you don't need to run any script to build.

### with Docker

1. Copy `.env` file onto the project root directory
   - The file includes the API key so that I will share the file separately.
2. Build the docker image `docker build -t weather-as-a-service .`
3. Run `docker run -p 5000:5000 --env-file .env weather-as-a-service`
4. Open http://127.0.0.1:5000/ in your browser or run `curl 'http://127.0.0.1:5000/v1/weather?city=Vancouver'`

### with Pipenv

1. Copy `.env` file onto the project root directory
   - The file includes the API key so that I will share the file separately.
2. RUn `pipenv install --dev` to install dependencies.
3. RUn `pipenv run flask init-db` to setup local database (sqlite3 in default).
4. RUn `pipenv run flask run` to launch a web server.
5. Open http://127.0.0.1:5000/ in your browser or run `curl 'http://127.0.0.1:5000/v1/weather?city=Vancouver'`

## What did you not include in your solution that you want us to know about?

> Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.

I wanted to have test code for all code. However, I couldn't manage the time.

## Other information about your submission that you feel it's important that we know if applicable.

### Keyword (city name) suggestion

I implemented an extra feature that suggests available cities on the UI. Since the API does not allow users to search for the unknown city, it will be a bit stressful if they mistype.

### Technology Stack

I choose Python+Flask for the backend and React for the front-end, and hosting on Amazon EC2.

As for the backend, I choose it because I am familiar, and Flask is simple enough for this type of small application.

For the front-end, I initially implemented it without any libraries because it was just calling API. However, when I started implementing keyword-suggestion UI, I found that the application starts having more states. So I decided to switch to using React for eas of state management. As a result, the application code became more clear and pluggable.

In the beginning, I hosted the app on Heroku. However, because of the big list of the available city (200,000+), it exceeded the free tier limit. So I switched to Amazon EC2.

### File Structure

I want to provide a brief file structure of this project in case if it is helpful for you to review the code.

#### Backend Application Structure

```
<apiserver>
|-- README.md
|-- test/                       # Unit test for backend
|-- weatherapp/                 # Main Application
    |-- __init__.py
    |-- commands/               # Has a command for DB initialization
    |-- lib/
    |-- models/                 # DB Model Layer
    |-- resources/              # API Endpoints (Controller Layer)
    |   |-- citylist.py         # /city API
    |   `-- weather.py          # /weather API
    |-- services/               # Open Weather API Client
        `-- openweather.py
```

#### Front-end Application Structure

```
<clientui>
|-- src/
    |-- index.tsx   # Entry point
    |-- index.css   # Main CSS
    |-- components/ # React UI Comopnents
    |-- libs/       # Small utilities
    `-- services/   # Backend API client
        `-- weather.ts
```

## Your feedback on this technical challenge

> Have feedback for how we could make this assignment better? Please let us know.

I had a lot of fun though this challenge. It was even hard to stop adding more functionality.
