# Hinge Health Testing Challenge

Welcome to the Hinge Health Testing Challenge, thank you for taking the time to participate.

## The Challenge

We would like you to evaluate some backend code with quality in mind. In this exercise you will generate a test plan and start writing tests for your test cases. The test plan itself is graded as 20% of the overall rubric. 

Limit yourself to no more than 2 hours, excluding any dev environment setup time.

Create a branch, perform your work there, push to github and do not merge it.

We download and attempt to run your branch as part of the code review process.

1. Pull the repo down and understand the requirements the engineer was trying to meet. They should have created endpoints for GET, POST, and DELETE. 
2. How would you test to make sure their code actually does what it should based on the requirements? Write a test plan that describes your approach, categories of tests and a list of prioritized test cases. Explain how you prioritized the test cases. Organize your thoughts into paragraphs and bullet points assuming your audience is the development team and your peer quality engineers.
3. Code tests for the top three test cases you prioritized.

## The Backend Code

The application renders and stores a tree of data.

Animals, an example of a tree;

```
1: root
    2: ant
    3: bear
        4: cat
        5: dog
            6: elephant
    7: frog
```

The format is a simple unique numeric id and alphanumeric label eg, `id: label`. Indentation indicates a child relationship. So, `1: root` has the children `2: ant, 3: bear, 7: frog`.

The application contains 3 API endpoints:

---

### 1. `GET /api/tree` returns the entire tree - in JSON format

```
{
  "id":1,
  "name":"rootElement",
  "children":[
    {
      "id":2,
      "name":"ant"
    },
    {
      "id":3,
      "name":"bear",
      "children":[
        {
          "id":4,
          "name":"cat"
        },
        {
          "id":5,
          "name":"dog",
          "children":[{
            "id":6,
            "name":"elephant"
          }]
        }
      ]
    },
    {
      "id":7,
      "name":"frog"
    }
  ]
}
```

---

### 2. `POST /api/tree/` creates new tree element. Accepts payload of the following format

```
{
    "parentId": 1,
    "name": "Squirrel"
}
```

---

### 3. `DELETE /api/tree/<id>`

Deletes the node of the corresponding id from the tree. If the node has children, the service should decline the request.

## Installation

The application is Dockerized. You need to have both [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed in your system. If installing Docker desktop on a Mac, Docker Compose will come with the installation.

## Running the app

### Starting the app

```bash
make start
```

This command will spin up the service with hot-reloading so every change you make will restart the server. You can view the logs in your terminal by running `make logs`. Once everything is started you can browse `localhost:3515/api/tree` to get the initial animal tree. 

### Rebuilding the containers

```bash
make clean && make build
```

If your database or npm packages or anything else gets into a bad state this will wipe the containers and allow you to start from scratch.

### Stopping the app

```bash
make stop
```

### Running your tests if using Jest

A sample jest test has been included. To run the test, make sure the app has started and pre-populated (see above steps).
Then run:

```
make test-e2e
```
