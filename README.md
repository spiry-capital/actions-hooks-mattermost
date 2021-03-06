<p>
  <h3 align="center">GitHub deployment hooks for Mattermost</h3>
  <h5 align="center">Powered by NextJS API functions</h5>
</p>

## About
This is a simple webhook for logging deployment events from GitHub in a Mattermost channel. It will log when the deployment begins and when the deployment status change. It fits perfect for our team as we use GitHub actions for CI/CD and we wanted a channel with every log so everyone can see whats happening with the builds.

## Screenshot
<p align="center">
  <img src="https://user-images.githubusercontent.com/31714350/113020261-ce58ae80-9158-11eb-952f-218522aa8de0.png" />
</div>

## Features
- Send text message when a deployment starts
- Send text message when a deployment status changes
- If the build fails, it will tag the channel (@channel) and the users will receive notification about the failure, so people can safely mute the channel and receive only these notifications

## Usage
- Create a "Incoming webhook" in Mattermost > Integrations, configure what you want and copy the generated URL
- Deploy the code (we recommend using Vercel and the link below, its free) and set the env "WEBHOOK_URL" with your Mattermost hook URL
- Create a GitHub webhook in your organization and/or in a single repository using this URL: `"https://{YOUR_DEPLOYMENT}/api/event"`
- Choose Content type: application/json
- Still under webhook creation, choose "Let me select individual events." and check "Deployment statuses" and "Deployments". Any other event will just do nothing
- Enjoy the features :)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fspiry-capital%2Factions-hooks-mattermost&env=WEBHOOK_URL&envDescription=WEBHOOK_URL%3A%20The%20%22Incoming%20Webhook%22%20URL%20from%20Mattermost&project-name=actions-hooks-mattermost&repository-name=actions-hooks-mattermost)

## License
This repository is under MIT license
