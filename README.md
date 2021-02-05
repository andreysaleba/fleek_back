### Getting started

To start the server you need to follow the sequence of steps:

1. Install dependencies
2. Create .env file in the project folder with API_JWT_SECRET. Example:
   ```
   API_JWT_SECRET=fleek_secret
   ```
3. Then you need to install PostgreSQL ([link to the installation guide](https://www.postgresql.org/download/))
4. After installing and starting the service, you need to create a role with the name postgres and password pass.
   For doing this enter
   ```
   psql postgres
   ```
   then
   ```
   CREATE ROLE postgres WITH CREATEDB LOGIN PASSWORD 'pass';
   ```
   then enter `\q`.
   The new role has been added, now you need to go under it and create a database called `api`.
   To do this, enter
   ```
   psql -d postgres -U postgres
   ```
   Now we need to create a new database. To do this, enter
   ```
   CREATE DATABASE api;
   ```
   After successfully creating the new database, proceed to the next step.
5. For the server to work correctly, you need to migrate, for this, being in the project directory, enter to the terminal
   ```
   npx sequelize-cli db:migrate
   ```
   After successful migrations, you need to populate it, for this enter
   ```
   npx sequelize-cli db:seed:all
   ```
   The server is now ready to start
6. To start the server use the command `yarn start`

To send requests through a proxy, it is enough to use the endpoint http://localhost:3001 with which you need to send the header x-api-key with the correct key