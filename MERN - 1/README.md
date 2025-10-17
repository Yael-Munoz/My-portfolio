# MERN-1 Project

This is a full-stack MERN (MongoDB, Express, React, Node.js) project for managing user accounts. Users can register, log in, update their account, and delete their account. Authentication is handled with JWTs stored in HTTP-only cookies.

## Project Structure

- `server/` – Express server, API routes, MongoDB models  
- `client/` – React client  
- `README.md` – Project instructions

## Features

- User registration and login  
- JWT-based authentication (access and refresh tokens)  
- Account management: update profile, delete account  
- Password hashing with bcrypt  
- React frontend with responsive UI  
- Secure cookies for token storage

## Prerequisites

- Node.js installed  
- MongoDB installed locally **or** use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)  
- npm (comes with Node.js)

## Setup Instructions

### Backend Setup

1. Navigate to the `server` folder.  
2. Install dependencies with `npm install`.  
3. Create a `.env` file in the `server` folder with the following variables:

- `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` can be any long, random string.  
- `MONGO_URI` should point to your MongoDB instance.  

4. Start the backend server. The server will run at `http://localhost:3000`.

### Frontend Setup

1. Navigate to the `client` folder.  
2. Install dependencies with `npm install`.  
3. Start the frontend development server. The React app will run at `http://localhost:5173`.

### Using the App

- Visit `/register` to create a new account.  
- Login at `/login`.  
- Manage your account at `/home` (update profile, delete account, sign out).  

## Notes

- Do **not** commit your `.env` file or `node_modules/`.  
- For deployment, ensure you have a MongoDB instance accessible to your server.  
