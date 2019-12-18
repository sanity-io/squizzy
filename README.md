# Squizzy: A Kahoot-style real-time quiz game

![Squizzy logo](https://repository-images.githubusercontent.com/222647703/1c3ab900-1fdf-11ea-924e-10ed07035d95)

Squizzy is a real-time quiz game powered by Sanity.io.

- Create quizes and host matches with [Sanity Studio][sanity-studio]
- Real-time web app built with [Vue][vue], optimized for mobile
- [Unsplash][unsplash] integration to easily add photos
- Easy deployment on [ZEIT’s Now][now]

Table of contents:

- [Deploy your own Squizzy instance](#deploy-your-own-squizzy-instance)
  - [Deploying the Sanity Studio and host display on \*.sanity.studio](#deploying-the-sanity-studio-and-host-display-on-sanitystudio)
  - [Deploying the web app and the serverless functions on Now](#deploying-the-web-app-and-the-serverless-functions-on-now)
- [Play Squizzy](#play-squizzy)
  - [Create and edit quizzes](#create-and-edit-quizzes)
  - [Create a new match](#create-a-new-match)
- [Local development](#local-development)
  - [Sanity Studio](#sanity-studio)
  - [Web app](#web-app)
- [Extras](#extras)

## Deploy your own Squizzy instance

To get started with Squizzy, follow these instructions.

1. [Copy](https://github.com/sanity-io/squizzy/generate) this repository and clone it to your computer
2. Install dependencies with `npm install` (or `yarn`) in the root and `/studio` folders.
3. Install Now CLI and Sanity CLI: `npm install --global @sanity/cli now`

### Deploying the Sanity Studio and host display on \*.sanity.studio

1. Run `sanity init` inside the `/studio` folder. Follow the instructions to connect the studio up with a new project and dataset.
2. Run `sanity deploy` to build and upload the studio to `<your-studio-name>.sanity.studio`
3. Run `sanity deploy` again whenever you want to upload changes to the studio code

### Deploying the web app and the serverless functions on Now

1. First you need to add a secret token with write permissions to your Now account:
   1. Find your project’s API settings on https://manage.sanity.io/{YOUR_PROJECTID}/settings/api (or run `sanity manage` inside `/studio`)
   2. Under the Tokens sections, create a new token with write permissions
   3. Rename the `.env.template` file to `.env` in the root folder, it will be ignored by git.
   4. Copy-paste the token into the `.env` file for the `SQUIZZY_WRITE_TOKEN=` variable
   5. Make sure you have copied the token and run `now secrets add squizzy_write_token $(pbpaste)` to add it on Now.
   6. Alternatively: `now secrets add squizzy_write_token <the-token>` (put a space before `now` to avoid the token going into your bash history).
2. Replace the `projectId` and `dataset` in `./sanityClientConfig.js` with the one you connected the Studio to. Find them by looking in `/studio/sanity.json` or by running `sanity debug` in the `/studio` folder.
3. Run `now` in the root folder to deploy the app, or go to [your Now account and add the GitHub repository][now-github]
4. Add your app domain to your Sanity project’s CORS settings. In the `/studio` folder, run `sanity cors add https://your-name.now.sh --no-credentials` or go to your project’s API settings on [manage.sanity.io](https://manage.sanity.io)
5. Update the `remoteWebHost` in `/studio/quizConfig` to match your new URL on Now.

## Play Squizzy

Squizzy comes with the following routes:

- Participants can join the game on https://the-app-name.now.sh
- You manage the quizzes on https://the-app-name.now.sh/studio
- You start games on https://the-app-name.now.sh/studio/quiz-match
- The serverless functions will run on https://the-app-name.now.sh/api/function-name

### Create and edit quizzes

To make a new quiz, go to your studio, click “Quiz” and creat new. Give it a name, description, and some questions with multiple choice answers. The time limit will default to 20 seconds, but you can override it. You can also add an image.

### Create a new match

To launch a new game, click _Match_ (`/studio/desk/match`) and create new. The slug will be created automatically, and you can select from all your published quizes. When you have selected a quiz, publish the match.

Now you can click the **Let’s play** button in the studio’s top bar. Here you get an overview over all published and ongoing matches. Select the one you just published to initiate the host screen.

The host screen will show a QR code. Your players can join by scanning this QR code by going to where your Squizzy instance is deployed (https://the-app-name.now.sh), allow camera access, and scan the QR-code. If they aren't able to scan the QR code, they can go to https://the-app-name.now.sh/match/the-game-slug to join.

The host controls the game play from the “Let’s play” tool in the studio.

## Local development

### Sanity Studio

Go to [sanity.io/docs](https://sanity.io/docs) to find more documentation on how to configure and customize Sanity Studio.

1. Make sure you have the CLI installed: `npm i -g @sanity/cli` (or `yarn global @sanity/cli`)
2. Inside the `/studio` folder, install dependencies with `sanity install`
3. `npm run dev` to start the local development server
4. You can open the studio on [localhost:3333](http://localhost:3333)

You'll find the content model for the quiz, match, and players inside of `/studio/schemas`.

You'll find the host play display inside of `/studio/plugins/quiz-match`.

You can tweak the Studio’s color scheme in `/studio/squizzyTheme.css`

### Web app

Go to [vuejs.org/docs](https://vuejs.org/docs) for documentation on Vue.

1. Install dependencies by running `npm i` (or `yarn`) in the root folder
2. Run `now dev` to start the web app, the studio, and serverless functions concurrently (remember to install studio dependencies first)
3. You can access the following endpoints:
   - Web app on `localhost:3000`
   - Serverless functions on `localhost:3000/api/<function-name>`
   - Sanity Studio on `localhost:3333`

N.B! The web app will run on `localhost:3000` (the dev server log will show a different port number, but `now dev` binds this random port to :3000).

## Extras

- Add the [Giphy][giphy] asset source selector if you want easy access to animated GIFs for your quizzes.

\* You can also use `npx @sanity/cli <command>` and `npx now <command>` if you prefer not to install global dependencies.

[sanity-studio]: https://www.sanity.io/docs/sanity-studio
[nuxt]: https://nuxtjs.org
[vue]: https://vuejs.org
[now]: https://zeit.co/now
[unsplash]: https://www.sanity.io/plugins/sanity-plugin-asset-source-unsplash
[youtube]: https://youtube.com
[giphy]: https://www.sanity.io/plugins/sanity-plugin-asset-source-giphy
[now-github]: https://zeit.co/docs/v2/more/now-for-github/
