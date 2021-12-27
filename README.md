# Getir Node.js Bootcamp Graduation Project

## Introduction

This guide covers the installation of the case study project 
and gives detailed explanation about API error codes as well as
responses and requests.

## Requirements

- [x] The code should be written in Node.js using express framework.
- [x] The endpoint should just handle HTTP POST requests.
- [x] The application is deployed to AWS.
- [x] Error handling is applied.
- [x] Logging is applied.
- [x] Modular structure is applied.
- [x] Test suites are applied.

The service is deployed to AWS Elastic Beanstalk. The URL is provided below.

- http://fatihkaya-getir-case-study.eu-central-1.elasticbeanstalk.com/

The following route handles post requests.

- http://fatihkaya-getir-case-study.eu-central-1.elasticbeanstalk.com/records

## Step 1 - installation

- Clone the project. 
- folder structure without node_modules folder and .env should like like the below diagram.

```

.
├── README.md
├── app.js
├── package-lock.json
├── package.json
└── src
    ├── config
    │   └── index.js
    ├── controllers
    │   └── index.js
    ├── db
    │   └── mongodb.js
    ├── errors
    │   └── ApiError.js
    ├── logger
    │   └── index.js
    ├── logs
    │   ├── error.log
    │   └── network-access.log
    ├── middlewares
    │   ├── errorHandler.js
    │   └── validate.js
    ├── models
    │   └── Records.js
    ├── routes
    │   └── index.js
    ├── services
    │   └── index.js
    ├── tests
    │   └── server.test.js
    └── validations
        └── Records.js

```
- within the same directory, create an .env file and write environment variables as described in .env-sample file.

``` bash
  touch .env
```
- Then, please install the required dependencies via npm.

``` bash
  npm install
```

## Step 2 - run the project

``` bash
  npm start
```
- The application service will log successful DB connection messages to the console.

``` json
{"level":"info","message":"trying to establish MongoDB connection","service":"express-app-service"}
{"level":"info","message":"Server is running on port 8080... press cntrl-c to exit","service":"express-app-service"}
{"level":"info","message":"connected to MongoDB","service":"express-app-service"}
```

## Step 3 - send POST request

- please send a post request to http://localhost:8080/records route within the provided body below via postman.

```json
{
    "startDate": "2016-01-26", 
    "endDate": "2016-04-02", 
    "minCount": 2900, 
    "maxCount": 2950
}
```
- or simply via curl command as below within single line.
```bash
curl -X POST http://localhost:8080/records 
     -H 'Content-Type: application/json' 
     -d '{"startDate": "2016-01-26", "endDate": "2016-04-02", "minCount": 2900 "maxCount": 2950}'
```
<details><summary> <b>Click to see response</b> </summary>
<p>


```json
{
  "code": 0,
  "msg": "Success",
  "records": [
      {
          "key": "rwghjfLQ",
          "createdAt": "2016-03-17T11:07:46.355Z",
          "totalCount": 2907
      },
      {
          "key": "HNUPzQoW",
          "createdAt": "2016-03-17T09:47:23.943Z",
          "totalCount": 2931
      },
      {
          "key": "HNUPzQoW",
          "createdAt": "2016-03-17T09:47:23.943Z",
          "totalCount": 2931
      },
      {
          "key": "UYOsBBSI",
          "createdAt": "2016-02-14T15:31:29.518Z",
          "totalCount": 2948
      }
  ]
}
```

</p>
</details>

## Error codes

| Response Code | HTTP Status Code | Error Explanation               |
| :---          |     :---         |          :---                   |
| 0             | 200              | Success                         |
| 1             | 404              | Response not found              |
| 3             | 500              | Internal Server Error           |
| 4             | 400              | Validation Error                |
| 5             | 404              | Endpoint is not found           |

## QA Plan

### 1. Test Scripts
- There are seven tests that evaluates for cases such as response codes, error handling mechanism and function results.
- In order too run test suites, please type...
```bash
npm test
```
### 2. eslint and prettier npm modules are installed as developer dependencies.

## Application structure

<img width="930" alt="diagram" src="https://user-images.githubusercontent.com/56218812/147465114-0257696a-fd69-47b1-bbe1-0728625151de.png">

the above diagram is prepared via https://miro.com/

- One of the key advantages of handling validation errors via Joi module at route level is to send response as much as quick to the client.
- Therefore; request is not required to go up until the model and database layer which increases response time efficiency.

## Further improvements

- [ ] cookie parser and session middleware might be added.
- [ ] error classes might be differentiated.
- [ ] The application might be deployed to AWS via Code Commit for continuous integration.

## Conclusion

Thanks for visiting my project.
Any feedback is highly welcomed.

### Fatih Kaya 

