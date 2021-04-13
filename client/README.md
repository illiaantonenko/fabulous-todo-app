# Fabulous TODO UI application

Here we'll have our application's UI.

## Running locally

To run application locally, you need to have Node installed. You can find installation tutorial on the NodeJS mainpage [here](https://nodejs.org/).

Follow the next steps:

### Install dependencies

To install dependencies, you need to run the following command in `client` dirrectory:

```sh
npm install
```

### Prepare env variables

Initially, environment variables to build UI are described in file `.env.example`. During any build, `webpack` validates availability of each required env variable and disallows build in case of abscense some of them.

Because of that, fallback for all env variables are present in `.env.default` file. If you're OK with using default env variables, follow to the next section.

For the local build, first of all you need to create env file for local build with the following command:

```sh
cp .env.default .env.local
```

After this you need to set variables values to what you expect them to be during the build.

### Local dev server
To run UI application in hot module replacement mode run command:

```sh
npm start
```

This command will start development server and serve all static assets, required for development. Follow the link in terminal to open served application.

For basic demo/dev purposes this would be more than enough.
In case of any specific questions aboud development or build process, open issue in this respository with capatious description.


## Building and serving

To prepare building and serving, first of all you need to prepare production env variables. Prod build variables are obtained from `.env` file so you need to create and fill it with corrseponding info (list of all variables and examples can be taken from `.env.example`).

To create a production build, run the following command:

```sh
npm run build:prod
```

To create a development build, run:

```sh
npm run build:dev
```

After build is craeted, you can serve it with the following command:
```sh
PORT={port_number} npm run serve
```

*Note: make sure your port variable is the same in `.env` file and in CLI node serve command*
