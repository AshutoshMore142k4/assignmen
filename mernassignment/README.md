# Real-Time Collaborative To-Do Board

## Project Overview

A full-stack MERN application for real-time collaborative task management, featuring live sync, JWT authentication, smart assign, and conflict resolution.

## Tech Stack

- **Frontend:** React 18+ (TypeScript), custom CSS
- **Backend:** Node.js 18+, Express.js, MongoDB (Mongoose)
- **Real-time:** Socket.IO
- **Authentication:** JWT, bcrypt
- **Testing:** Jest, Supertest
- **Deployment:** Vercel/Netlify (frontend), Render/Railway (backend)

## Features

- User registration & login (JWT, bcrypt)
- Kanban board (Todo, In Progress, Done)
- Real-time updates (Socket.IO)
- Smart Assign (assign to user with fewest active tasks)
- Conflict handling (merge/overwrite on edit conflict)
- Activity log (last 20 actions, live updates)
- Responsive, custom UI (no frameworks)
- Custom animations

## Setup & Installation

### Prerequisites

- Node.js 18+
- npm
- MongoDB

### Local Development

```sh
# Install dependencies
npm install

# Start backend (in one terminal)
npm run dev:backend

# Start frontend (in another terminal)
npm run dev:frontend
```

### Environment Variables

- See `.env.example` files in backend and frontend for required variables.

## Deployment

- Frontend: Vercel/Netlify
- Backend: Render/Railway

## Demo

- [Live App](#)
- [Demo Video](#)

## Logic Document

- [Logic_Document.md](./Logic_Document.md)

## API Endpoints

- See `/api` routes and documentation for details.

---

> For more details, see `.cursorrules` for coding standards and requirements.
