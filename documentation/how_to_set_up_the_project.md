# Set Up and Scripts

## To set up the backend

Create two `.env` files in the **backend** folder: `.env.development` and `.env.test` for the development and test environments respectively. **IMPORTANT NOTE: An example .env file has been included for the purpose of testing the solution only - do not use the credentials in this file for production databases. To use this, you can simply rename `.env.example` to `.env.development` and/or `.env.test`**

The .env files should contain the following environment variables. :

| Variable name          | Purpose                                                                                                                                                                                                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DEFAULT_POSTGRES_PORT  | This should normally be set to 5432                                                                                                                                                                                                                                                                              |
| POSTGRES_HOST          | Host URL or IP address for the postgres database                                                                                                                                                                                                                                                              |
| POSTGRES_PORT          | The port that should be exposed to access the postgres database                                                                                                                                                                                                                                               |
| POSTGRES_DB            | Name for the postgress database                                                                                                                                                                                                                                                                               |
| POSTGRES_USER          | Name of the user the API should create to access the database                                                                                                                                                                                                                                                 |
| POSTGRES_PASSWORD      | Password the API should use to access the database                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                 |
| API_HOST               | The base URL or IP address that should be used to access the API                                                                                                                                                                                                                                              |
| API_PORT               | The port that should be exposed to access the API                                                                                                                                                                                                                                                             |
| DEFAULT_USER_AUTHLEVEL | The authorisation level that will be given to end users who use the registration route. Normally you will want to leave this set to 1 (the lowest level)                                                                                                                                                      |
| SUPERUSER_AUTH_LEVEL   | The authorisation level that will be given to the super user account that is automatically created. This should be the highest authorisation level in use.                                                                                                                                                    |
| SUPERUSER_USERNAME     | The username that will be given to the super user account that is automatically created.                                                                                                                                                                                                                      |
| SUPERUSER_PASSWORD     | The password that will be given to the super user account that is automatically created.                                                                                                                                                                                                                      |
| BCRYPT_PASSWORD        | The password that will be used for the function that encrypts and decrypts user passwords.                                                                                                                                                                                                                    |
| SALT_ROUNDS            | The number of salt rounds to use when encrypting user passwords.                                                                                                                                                                                                                                              |
| TOKEN_SECRET           | A string that is used as the private key for creating user authorisation tokens.                                                                                                                                                                                                                              |

**IMPORTANT NOTE**: You should not include any .env files in your production environment. Instead set these variables directly in your production environment.

For testing and development environments, open a terminal in the **backend** folder and **set up the database** (NOTE: this app uses a dockerised version of the postgres database for testing and development to avoid having to install and set up postgres locally. You will need to have the Docker engine installed and running first if you don't already have it. [Getting started with Docker](https://www.docker.com/get-started))

```
docker-compose up
```

Open a new terminal in the project root (leaving the terminal with Docker open and running) and **install the application** NOTE: You can start the install process while the docker containers are still being created but please wait for the dockerised databases to be ready to accept connections before completing any further steps:

```
npm install
```

Not a required set up step, but at this point you might want to **run the test suite** to ensure that everything is running as it should:

```
npm run test
```

NOTE: The test suite uses the Test database - this database is set up immediately prior to running the tests and then torn down again immediately afterwards.

Not a required set up step, but if you are making changes to the source files you might want to **start the application in development mode**:

```
npm run watch
```

This will run the required database migrations and then start the application while watching for changes to the source files. If the source files are updated, the application will restart.

**Start the application** in production mode:

```
npm run start
```

NOTE this will compile the source files and run the required database migrations using db-migrate before starting the server.

**Stop the application**:

You can stop the running node server by hitting `CRTL + C` in the terminal in which it is running. Note this will terminate the application but will leave the database intact and the postgres servers running.

To **remove the database** (CAUTION: This will permanantly destroy all data):

```
npm run migrate-down
```

To **stop and remove the postgres database servers**:

```
docker-compose down
```

## To set up the frontend

After downloading and unzipping the files, open a terminal in the **frontend** folder and install the application:

```
npm install
```

Once the installation of dependencies has finished, you might want to run the test suite to check everything is working correctly:
```
npm run test
```

To run the full product, you will need a suitable back end to be up and running (see the documentation for the backend in this project):

```
npm start
```

This serves the application on the default port (4200) and will automatically open the application in the default browser.