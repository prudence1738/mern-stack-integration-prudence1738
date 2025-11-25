# MERN Blog - Week 4 Assignment

## Overview
Full-stack MERN blog demonstrating Express API, MongoDB, React front-end (Vite), Mongoose models, authentication, image uploads, pagination, search and comments.

## Setup - Server
1. `cd server`
2. `cp .env.example .env` and fill values (MONGO_URI, JWT_SECRET, CLIENT_URL)
3. `npm install`
4. `npm run dev` (needs nodemon) or `npm start`

## Setup - Client
1. `cd client`
2. `cp .env.example .env` and edit VITE_API_URL if needed
3. `npm install`
4. `npm run dev`

## API
- `POST /api/auth/register` — body `{ username, password }`
- `POST /api/auth/login` — body `{ username, password }`
- `GET /api/posts` — query params `page`, `limit`, `q` (search), `category` (category id)
- `GET /api/posts/:id`
- `POST /api/posts` — auth, form-data (featuredImage file)
- `PUT /api/posts/:id` — auth + author only
- `DELETE /api/posts/:id` — auth + author only
- `GET /api/categories`
- `POST /api/categories` — auth
- `POST /api/comments` — body `{ post, authorName, content }`

## Features implemented
- CRUD for posts + categories
- Mongoose models and relationships
- Validation with `express-validator`
- JWT authentication (register/login)
- Image uploads (multer)
- Pagination and search
- Comments
- Front-end with React, router, custom hook for API
