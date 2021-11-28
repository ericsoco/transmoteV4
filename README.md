# Transmote v4
AKA Transmote For Dummies. Nothing experimental here.



## dev

`nvm use` to switch to the old-ass version (`@0.12`) of Node I'm using here.

`npm start` to run dev build (to `./build/dev/`) and serve via `grunt-contrib-connect` on `localhost:5421`



## deploy

`npm run dist` to run deploy build (to `./build/deploy/`) and serve via `grunt-contrib-connect` on `localhost:5420`

Deploy files in `./build/deploy/` to root as needed.



## projects config

tl;dr: run `npm run dist` to transpile `projects.json5` to `projects.json` and upload it to `transmote.com/data`.

Config for each project displayed on the site (`transmote.com/projects/*`) is in `/src/data/projects.json5`. Many changes to the site require only a change to this file. Since the file is a `.json5` file, the above deployment steps must be followed to transpile the `.json5` to the `.json` format loaded at runtime.



## server config

Files in `./server-config/` do not run through build process; deploy to server as needed/updated. Ideally, this content, and the contents of `./renderer`, would be copied to build folders as needed, and `phantomjs-1.9.2-linux` would be renamed `phantomjs` and have `chmod` run on it. But that part of the build is just not quite worked out. Oh well.



## server rendering

Bots are redirected to `./index-bots.php` via `./htaccess`. That php file sends the request through [PhantomJS](http://phantomjs.org/), which renders via [`phantom-renderer.js`](./src/renderer/phantom-renderer.js). Note that the repo contains, embarrassingly, two compiled versions of PhantomJS: an [OSX version](./src/renderer/phantomjs) for testing locally, and a [Linux version](./server-config/phantomjs-1.9.2-linux). The latter must be deployed to the server and renamed `phantomjs` (no extension), and made executable (`chmod 755`) in order for `index-bots.php` to run it when a bot requests a page.

Side note: there are a few commented-out lines in `htaccess` about "php parsing within html". I thought these were different configurations that needed to be toggled to run on MAMP/transmote, but things appear to work well in both dev and prod with everything commented out.
