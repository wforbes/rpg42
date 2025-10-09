# braindump42

- [x] scaffold new sveltekit project within rpg42 dir, named rpg42
- [x] remove node_modules in original C:\repos\rpg42\rpg42 dir and new sveltekit project at C:\repos\rpg42\rpg42\rpg42
- [x] rename C:\repos\rpg42\rpg42 dir as C:\repos\rpg42\_rpg42, delete package.json there
- [x] move sveltekit project upward in directory hierarchy so that its now C:\repos\rpg42\rpg42
- [x] install phaser to sveltekit project deps, double check typescript and vite versions present in sveltekit project
- [x] review the freshly scaffolded sveltekit project (here on referred to as 'rpg42')
- [x] update docker-compose to set postgresql container port to deconflict from local machine's pg port (set as 5433)
- [x] run the database container with pnpm db:start
- [x] setup and connect to database container on 'postgres' db via dbeaver to verify basic connection
- [x] run drizzle generate command to create schema file
- [x] update .env file for db connection string for 5433 port
- [x] run migration to set up db table(s)
- [x] update dbeaver connection to 'rpg42-local' for connecting to 'local' database in postgres docker container
- [x] confirm drizzle migration success via dbeaver connection to 'local' database
- [x] Test authentication via lucia demo page (rpg42\src\routes\demo\lucia\login\+page.svelte)
- [x] verify user and session table entries were created via dbeaver