# braindump for rpg42

## Setting up initial sveltekit and verifying db
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

## Web App Shell Todo

- [x] Clean up readme in rpg42 directory, include basic info about rpg42 new direction, and explain that it's a rewrite of a java game "Omnia", https://github.com/wforbes/Omnia, into a web app game.
- [x] Install 'Skeleton' tailwindcss based component library (https://www.skeleton.dev/)
  - https://www.skeleton.dev/docs/get-started/installation/sveltekit
  - https://www.skeleton.dev/docs/get-started/fundamentals
- Found that SvelteKit is not the best fit for an expedited setup. Pivoted to Next.js with Mantine for the UI library.
- [ ] Update root page for basic layout
- [ ] Include basic placeholder marketing info about rpg42
  - rpg42 is a mysterious game about a quest to learn the secrets of the universe through building your coding skills in an epic retro-style adventure
- [ ] Add top app navbar as component that can be shared throughout app (https://www.skeleton.dev/docs/components/app-bar/svelte)
- [ ] Add 'light switch' toggle to app navbar: https://www.skeleton.dev/docs/guides/cookbook/light-switch
- [ ] Add Game page that successfully runs the existing Phaser-based game we have so far
- [ ] Add signup page with form that utilizes the lucia auth flow
  - https://www.skeleton.dev/docs/tailwind/buttons
  - https://www.skeleton.dev/docs/tailwind/forms
  - https://www.skeleton.dev/docs/tailwind/cards
  - https://github.com/tailwindlabs/tailwindcss-forms (skeleton depends on tailwindcss-forms, ensure its installed)
- [ ] Ensure signup process is working, and first successful signup creates a new session
- [ ] Add login page with form that utilizes lucia auth flow
- [ ] Logging in successfully takes you to Game page
- [ ] Add security for Game page, making it private, only accessible with a valid auth session
- [ ] Add logout button to the navbar, this destroys the users session and redirects them to the login page
  - with a message noting that the user has successfully logged out... maybe with a Toast? https://www.skeleton.dev/docs/components/toast/svelte

At this point, signing up or logging into the website will take you to the pre-existing game.

## Braindump ...
- Currently the user can play in an Area, made up of a tilemap and tilesheet. These files are loaded upon initial game start.
- We need to add the web socket connection to a web server locally, that transmits, intermittently saves, and broadcasts the players location in that Area.
- We need to test out multiple game sessions, where two players are in the same area, and their locations are broadcasted to each other, and their game client renders the other player appropriately.
- We should start formalizing and organizing the structure of the code...
- Establish the concept of the World. World is the largest type of space that the player can play in. Multiple Worlds may exist at some point, but for now there is only one.
  - Worlds contain multiple Areas. One Area may be loaded at a time. Area is the space in which a player can move around in and interact with game elements in.
  - Areas are of a fixed size when rendered on the screen. They are made from Tiles, each are of a fixed size equal to that of all other Tiles within the area.
  - Areas may be open, with no uniform collision boundary at any of its outer edges.
  - Areas may be closed, with one or many specific non-collision boundaries that the player may walk beyond
  - Areas have exit points. When the player interacts with the Area, either by moving to a certain point within the Area (like a door, or a special spot like a portal), walking to a certain point at the edge of the area, or walking to the outer bounds of an open Area - the player is extracted from the current Area and the corresponding Area related to that point/edge/boundary is loaded and the player enters it to continue playing within that newly loaded Area.
  - Areas may be "outdoor", constituting a large space, where the user should only be able to see the Tiles for that Area, even when walking up to the outer edges of it.
  - Areas may be entirely "indoor" like in a building, a house, a dungeon, a cave. Indoor areas may be much smaller than outdoor areas.
  - In cases where an indoor Area is smaller than the size of the screen, the empty space beyond the limits of the Area should be a uniform color, like black or gray.
- Areas may contain Sections.
  - Sections are a portion of an area which contain special properties. Section is the abstract base class which serve as the parent to moe specific types of Sections.
  - Example: Resource Section is a more specific type of Section that enables Resource Environment Entities to spawn within them.
  - Example: Structure Section is a moer specific type of Section that enables Structure Environment Entities to be moved within or be removed/despawned from.
- Establish the concept of an Entity. Entity is a parent class to any object that can exist in the world, within an Area.
  - Entities are primarily visible things. As such they likely will always have a sprite graphic (loaded from a section of a spritesheet), a set of dimensions like width/height integer values that represent the size of the sprite in pixels, an ID number to allow it to be referenced elsewhere, and its state serialized as a member of a set within the Area for transmission to game server or saved locally.
  - Entities may only be within one Area at a time within a Game session.
  - Entities have an x/y position that relates to their location within their Area. 
  - Entities must be a more specific type of thing, requiring an inheritance hierarchy of at least 1-2 child classes to further define what kind of Entity it is.  
- Mobs are an Entity child class, a mobile entity, adding the ability for that entity to move within an Area, changing its location as the result of some mechanism coming from a further child type (Entity->Mob->SomeClass)
  - Players are a Mob Entity, a unit which a user controls.
  - NPC is a Mob Entity, a unit which is controlled by a set of automated processes.
    - NPCs generally perform no combat actions with Player entities.
    - NPCs are able to be interacted with by Players to engage in Dialog, Quests, Challenges, Trading, Vendoring, and other systems.
  - Enemy is a Mob Entity, a unit which is controlled by a set of automated processes.
    - Enemies primarily focus on performing combat actions with Player entities.
    - Although in future versions of the game Enemies will be able to be interacted with by Players, this interaction via Dialog, Quests, Challenges, and other systems will require some advancement or special task to be completed by the Player in order for it to be enabled. Without this advancement, the Enemy will primarily focus on combat with the Player.
  - Projectile is a Mob Entity, a unit which orginates from an action performed by a Player, NPC or Enemy.
    - Projectiles are primarily things like bullets, arrows, or magic effects which travel in a straight ray path away from the Entity they originated from.
    - When Projectiles collide with another Entity, that Entity may be damaged or their state/status/stats may be altered, depending on their relationship with the originator.
- Environment are an Entity child class, a static non-mobile entity, used as a base class for the hierarchy branch which are specifically not mobile.
- Resource are an Environment Entity child class, adding the ability for that entity to be interacted with by Players.
  - Resources may spawn, despawn, or respawn on an internal timer unique to the specific type of resource it is.
  - Resources may be bound to a certain Section of an Area, designating a space in which in may only be located.
  - Resources may contain inventory items that were generated from a "loot table" unique to the specific type of resource it is.
  - Resources may trigger some external events depending on the specific type of resource it is - though this is rare and more commonly reserved for other Environment classes
- Structure are an Environment Entity child class, adding the ability to be moved as the result of some other Entity or system.
  - Example: The player walks up to a certain distance away from the Structure, triggers a skill or ability, or has a passive skill or ability enabled, and causes the Structure to be moved (like by pushing it), or breaking/destroying it by 'hitting' it.


- User has a list of multiple different characters they can choose from, to begin playing the game for the first time they need to create a new character
- Character creation includes picking from a selection of genders, skin colors, hair colors, hair styles, shirts, pants, etc.
  - Currently the only character sprite sheet is a rip-off of the original gameboy pokemon game player character
  - Artwork needed for the base character models for male and female.
  - System of how to alter or put on customizations to the base char model
  - System of saving these customizations and associating them with the user's character
- Having created their character, the user enters the game world
  - They start in a house (Indoor Area), which has one or more NPCs nearby. The NPCs have dialog to introduce the user to the game and begin the user's first goals.
  - They may exit the house, entering their home town (Outdoor Area)

## LLM Assistant Performance Log

This section tracks instances where the LLM assistant's attempts to perform a task were unsuccessful, requiring manual intervention. The goal is to identify patterns and refine the collaboration process.

-   **Issue:** Incorrectly moving a pnpm dependency.
    -   **Goal:** Move `@skeletonlabs/skeleton` and `@skeletonlabs/tw-plugin` from `devDependencies` to `dependencies` in `package.json`.
    -   **Attempted Command:** `pnpm install @skeletonlabs/skeleton @skeletonlabs/tw-plugin`.
    -   **Problem:** This command did not change the location of the packages; it only updated their versions within `devDependencies`. It seems `pnpm` does not have a direct "move" command for dependencies.
    -   **Resolution:** The user had to manually uninstall the packages (`pnpm uninstall ...`) and then reinstall them without the `-D` flag (`pnpm install ...`) to correctly place them in `dependencies`.

-   **Issue:** Misdiagnosing a TypeScript module resolution error.
    -   **Goal:** Fix a linter error on `+layout.svelte` where `@skeletonlabs/skeleton` could not be found.
    -   **Mistake:** The assistant focused on the CSS imports in the file (`import '...@theme.css'`) instead of the actual line with the error (`import { AppShell } from '@skeletonlabs/skeleton'`). This led to several incorrect and irrelevant fixes (creating `jsconfig.json`, adding CSS module declarations to `app.d.ts`).
    -   **Problem:** Failure to carefully read the user's specific feedback and correctly identify the source of the error, leading to wasted time and irrelevant changes.
    -   **Resolution:** The user had to explicitly point out the correct line number, forcing a re-evaluation of the problem.

-   **Issue:** Using outdated library (Skeleton UI) information.
    -   **Goal:** Set up the root layout for the application.
    -   **Mistake:** The assistant used knowledge from Skeleton v2, attempting to implement a deprecated `<AppShell>` component and `storePopup` utility. This was based on an outdated knowledge set and was the root cause of persistent linting errors.
    -   **Problem:** This caused a significant amount of wasted time and tokens on multiple incorrect debugging attempts, failing to recognize that the core components being used no longer existed in the installed version of the library.
    -   **Resolution:** The user intervened, identified that the components were deprecated, and provided a link to the v2 migration guide, which allowed the assistant to correct its understanding and proceed with a valid v3 implementation.  