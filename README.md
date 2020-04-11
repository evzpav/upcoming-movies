# Upcoming Movies

It is a web app and server API that integrates to The Movie Database ([TMDb](https://developers.themoviedb.org/3)) to show the list of upcoming movies and some details of them on a modal.

## Architecture
It consists of a backend server in [NodeJs](https://nodejs.org) with Express and a frontend client in [VueJs](https://vuejs.org/).

### Server (NodeJs): 
The architecture design for the server tries to follow the [Hexagonal Architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)).
The Controller handles the http interface(API routes) and communicates to the Service layer. Service layer handles logic to aggregate data from multiple requests to the Client layer and using the Model converts the object to the expected format for the frontend to consume. The client layer handles http requests to the TMDb API to get the data. 

#### Third party Libraries used on Backend:
- [express](https://www.npmjs.com/package/express) - API framework
- [cors](https://www.npmjs.com/package/cors)  - middleware for cors
- [axios](https://www.npmjs.com/package/axios) - http requests
- [spacetime](https://www.npmjs.com/package/spacetime) - format date
- [chai](https://www.npmjs.com/package/chai) - test assertions
- [mocha](https://www.npmjs.com/package/mocha) - test lib
- [prettier](https://www.npmjs.com/package/prettier) - format code
- [eslint](https://www.npmjs.com/package/eslint) - code lint warnings

### Client (VueJS)
On the frontend, when the "/" is called, it will redirect to the route "/upcoming-movies" and it will list the movies and show them in cards of the first page received from the server.
While scrolling to the bottom of the page it will load the next page of data and append to the list shown in the page, providing a infinite scroll feature.
The search input on the right top corner, does a simple string search on the titles of movies on the array of movies that were already loaded(in memory) on the page.
The click on a movie card, will open a modal with a larger poster and more details of the movie selected.

#### Third party Libraries used on Frontend:
- [axios](https://www.npmjs.com/package/axios) - http requests
- [vue-router](https://www.npmjs.com/package/vue-router)  - routes
- [vue-infinite-scroll](https://www.npmjs.com/package/vue-infinite-scroll)  - handle scrolling to load more movies
- [buefy](https://www.npmjs.com/package/buefy)  - UI components: Vue + Bulma (CSS framework)
- [eslint](https://www.npmjs.com/package/eslint) - code lint warnings

## Instructions to run
Below you can find 2 ways to run this project.

### Method 1 (recommended):
#### Pre-requisites:
- [Docker](https://docs.docker.com/install/)
- [Make](https://www.gnu.org/software/make/)

```bash
# Clone repository

# Build front and run server on docker
TMBD_API_TOKEN=token \ # Set TMDb API token as environment variable
make run-docker

# Server will be running on http://localhost:3000

```

### Method 2
#### Pre-requisites:
- [Node >= 12](https://nodejs.org/en/)
- [Make](https://www.gnu.org/software/make/)

```bash
# Clone repository

# Download dependencies for client and server
make install

# Generate build files for client (./dist folder)
make build-front

# Run server (it will also serve the ./dist folder)
TMBD_API_TOKEN=token \ # Set TMDb API token as environment variable
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
# Open on browser at: http://localhost:9900/
```


### Deployment to Heroku or Dokku
To deploy this project to Heroku as one app only, the server will be serving the static content of the ./client/dist folder.
For that, the way I figured to make it work it is to commit the ./client/dist folder to git.

```bash

# Build front needs to be done locally
make build-front

# And on .gitignore ./client/dist folder needs to be removed
# So the static files are commited when sent to heroku/dokku

```

After this is completed, the normal procedure for a Heroku app deploy can be done.

PS.: A better way would be to run server as a separate Heroku app and another app with NGINX image to run the web server for the static files of the frontend. However it would need to git repositories for it. To keep it simple, I opted to keep both frontend and backend in one repository and deploy as one.
