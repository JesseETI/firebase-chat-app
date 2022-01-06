# Firebase Chat App

Live demo link: https://worldwide-chat-46374.firebaseapp.com/ 

## About
A simple chat app that allows anyone with a Google Account to send messages. Cloud functions allowed me to write backend logic to lifetime ban users for using profane language.

## Architecture

Built with functional React + Firebase services
Mobile first responsive design was built with Material UI.

Firebase services used:
- Firebase Authentication
- Firestore Database
- Firebase Hosting
- Firebase Functions

## Deployment
Uses Github actions to implement CI/CD to Google Firebase hosting on git merge or pull request.
Preview channels made it really easy to test on mobile without commiting too much.

