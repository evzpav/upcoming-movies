# Posts

Retrieve posts from JSON placeholder API

It consists of a backend server in NodeJs with Express and a frontend client in VueJs.

- Client: VueJs
- Server: NodeJs


## Instructions to run
Below you can find 2 ways to run this project.

### Method 1 (recommended):
#### Pre-requisites:
- [Docker](https://docs.docker.com/install/)
- [Make](https://www.gnu.org/software/make/)

```bash
# Clone repository

# Build front and run server on docker
make run-docker

# Server will be running on http://localhost:3000

```

### Method 2
#### Pre-requisites:
- [Node 12](https://nodejs.org/en/)
- [Make](https://www.gnu.org/software/make/)

```bash
# Clone repository


# Download dependencies for client and server
make install

# Generate build files for client (./dist folder)
make build-front

# Run server (it will also serve the ./dist folder)
make run

# Server will be running on http://localhost:3000

```

### Unit Tests
The business logic inside server/services is tested within ./tests folder using [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com):

```bash

make test

``` 

### Lint
Run linters on server and client

```bash

make lint

``` 

### Audits
Run dependencies audit

```bash

make audit

``` 

## REST API Documentation
All available REST API documentation exposed by the project was documented using the [OpenAPI](https://www.openapis.org/) standard.

To view this documentation locally use the following command:
```bash
make run-swagger
```


### Deployment to Heroku or Dokku
To deploy this project to Heroku as one app only, it the server will be serving the static content of the ./client/dist folder.
For that, the way I figured to make it work it is to commit the ./client/dist folder to git.

```bash

# Build front needs to be done locally
make build-front

# And on .gitignore ./client/dist folder needs to be removed
# So the static files are commited when sent to heroku/dokku

```

After this the normal procedure for a Heroku app deploy can be done.

PS.: A better way would be to run server as a separate Heroku app and another app with NGINX image to run the web server for the static files of the frontend. However it would need to git repositories for it.
