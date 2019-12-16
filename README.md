# Squizzy: A Kahoot-style real-time quiz game

Squizzy is a real-time quiz game powered by Sanity.io.

- Create quizes and host matches with [Sanity Studio][sanity-studio]
- Real-time client frontend built with [Nuxt][nuxt] and [Vue][vue], optimized for mobile
- [Unsplash][unsplash] and [Gipghy][giphy] integration to easily add photos
- Easy deployment on [ZEIT’s Now][now]

Table of contents:

- [Deploy your own Squizzy instance](#deploy-your-own-squizzy-instance)
- [Play Squizzy](#play-squizzy)
  - [Create and edit quizzes](#create-and-edit-quizzes)
  - [Create a new match](#create-a-new-match)
- [Local development](#local-development)
- [Extras](#extras)

## Deploy your own Squizzy instance

To get started with Squizzy, follow these instructions. You can also watch this [video walkthrough on YouTube][youtube].

1. Fork/clone this repository
2. Install dependencies, including `npm install --global @sanity/cli now`\*
3. Run `npx sanity init` inside the `/studio` folder. Follow the instructions to connect the studio up with a new project and dataset.
4. Run `now` in the root folder to deploy the app.
5. Add a secret token with write permissions to your Now app:
   1. Find your project’s API settings on https://manage.sanity.io/{YOUR_PROJECTID}/settings/api (or run `sanity manage` inside `/studio`)
   2. Under the Tokens sections, create a new token with write permissions
   3. Copy-paste the token, and paste it into the `.env.template` file in the root folder
   4. Rename the file to `.env` to prevent it from being tracked in git
   5. Make sure you have copied the token and run `now secrets add $(pbpaste)` to add it on Now

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

## Local development

## Extras

- Add the [Giphy][giphy] asset source selector

\*You can also use `npx @sanity/cli <command>` and `npx now <command>` if you prefer not to install global dependencies.

[sanity-studio]: https://www.sanity.io/docs/sanity-studio
[nuxt]: https://nuxtjs.org
[vue]: https://vuejs.org
[now]: https://zeit.co/now
[unsplash]: https://www.sanity.io/plugins/sanity-plugin-asset-source-unsplash
[youtube]: https://youtube.com
[giphy]: https://www.sanity.io/plugins/sanity-plugin-asset-source-giphy
