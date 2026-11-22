# React Admin Panel Boilerplate

A Vite + React + React Router starter with login, article CRUD forms, and user CRUD forms.

## Run locally
1. Install Node.js (18+ recommended).
2. In this folder run `npm install`.
3. Run `npm run dev` and open the local URL printed by Vite.
4. Run `npm run build` to create a production build.

## Routes
- `/` — login
- `/articles` — article list
- `/articles/new` — add article
- `/articles/:id/edit` — edit article
- `/users` — user list
- `/users/new` — add user
- `/users/:id/edit` — edit user

## Important
This is a frontend starter. Authentication is a demo boolean state, and records live in React state (they reset on refresh). Replace these with your API, real authentication/session handling, validation, and persistent storage before production.
