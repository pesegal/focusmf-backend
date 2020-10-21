[![CircleCI](https://circleci.com/gh/pesegal/focusmf-backend.svg?style=svg&circle-token=fa818adeeb0b20dd5ee57f1d477eb83b79de9b92)](https://circleci.com/gh/pesegal/focusmf-backend)

# Focus.MF Backend API
This project is the backend services for the Focus.MF project. The service hosts a graphql playground instance at it's root.

## Getting started:

Install Node Version manager for easier management of node packages:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
```

Install the current LTS version of node. *Currently we are using 12.*

```bash
nvm install 12
```

Install the project dependencies

```bash
npm install
```

Initialize the local development database. This will create the initial databases and user accounts needed to do local development on the project. In the projects root directory run:

```bash
# Linux
sudo -su postgres psql --echo-all --file=init-config.sql

# Mac
psql postgres --echo-all --file=init-config.sql
```

## Development Workflow (Building, Running, Testing)

**Compile the code and start the server run:**

```bash
npm run start
```

**Start nodemon to watch src and live restart the server:**

```bash
npm run dev
```

**Run Unit/Integration Tests**

```bash
npm run test
```

**Run Test framework in *watch* mode**

```bash
npm run test:watch
```

## Deployment Notes
Once merged to the master branch the CircleCI configuration will deploy this project automatically to the server and build the project there. All the configuration values are stored inside environment variables for production. The server is using a tool called PM2 to manage the node instance. It is setup to watch the directory that this project gets deployed to and to automatically rerun the project.

## Database Persistance

The backend API uses a postgres relational database for persistance using TypeORM object relational mapper for modeling entities. To set up a development environment you will need to do the inital set up of the database. See getting started section. In development mode typeORM is has syncronize mode turned on which will automatically re-create entity schemas. This can cause data to be wiped out.

### Creating and Running a Postgres Instance via Docker
This method will allow you to setup a light-weight instance of Postgres running on the port mapping of your choosing.

*Please keep in mind that the instructions here do not outline the use of mapped volumes, although volumes can be used. If you do not use volumes and you remove the container, **all data will be lost** as the data exists only with the running instance.*

```bash
# Build the Docker image from our local Dockerfile
docker build -t focusmf-postgres-image .

# Run the container from the previously built image
docker run -d -p 5432:5432 --name focusmf-postgres-container focusmf-postgres-image

# Check the instance is up and running
docker ps
```

You can now connect to the running Postgres instance via `localhost:5432` on the database with the username and password specified in the `init-config.sql`'s initialization steps.

*Note: If you're already running an instance of Postgres on port 5432, use a different port:*
```bash
# Note the different host port but same container port
docker run -d -p 5435:5432 --name focusmf-postgres-container focusmf-postgres-image
```

### Migrations
```bash
# Perform the migrations
npm run typeorm migration:run

# Reverse the migrations
npm run typeorm migration:revert
```
---
