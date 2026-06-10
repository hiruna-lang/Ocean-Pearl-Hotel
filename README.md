# Ocean Pearl Hotel

Ocean Pearl Hotel is a full-stack hotel booking and management website built with React, Vite, Tailwind CSS, Node.js, Express, MongoDB, JWT, Multer, and Axios.

## Project Structure

```text
Ocean-Pearl-Hotel/
├── client/
├── server/
├── README.md
└── .gitignore
```

## Frontend

- React.js with Vite
- Tailwind CSS for responsive styling
- React Router DOM for page navigation
- Framer Motion for smooth animations
- React Icons for visual accents
- Axios for API calls

## Backend

- Node.js + Express.js
- MongoDB with Mongoose
- JWT authentication
- bcryptjs password hashing
- Multer image uploads
- dotenv environment variables
- CORS enabled for frontend/backend communication

## Pages

- Home
- About
- Rooms
- Room Details
- Facilities
- Gallery
- Booking
- Contact
- Login
- Admin Dashboard

## API Endpoints

### Auth

- POST `/api/auth/register`
- POST `/api/auth/login`

### Rooms

- GET `/api/rooms`
- GET `/api/rooms/:id`
- POST `/api/rooms`
- PUT `/api/rooms/:id`
- DELETE `/api/rooms/:id`

### Bookings

- POST `/api/bookings`
- GET `/api/bookings`
- GET `/api/bookings/:id`
- PUT `/api/bookings/:id/status`
- DELETE `/api/bookings/:id`

### Contact

- POST `/api/contact`
- GET `/api/contact`
- DELETE `/api/contact/:id`

### Gallery

- GET `/api/gallery`
- POST `/api/gallery`
- DELETE `/api/gallery/:id`

## Setup

1. Install dependencies from the project root.
2. Copy `.env.example` to `.env` and fill in your values.
3. Start MongoDB locally or use MongoDB Atlas.
4. Run the client and server together with the root dev script.

## Scripts

From the project root:

- `npm run dev` starts both apps
- `npm run build` builds the frontend
- `npm run start` runs the backend

For a first-time install:

- `npm run install:all`

## Notes

- The frontend includes sample room, facility, gallery, and review data for quick testing.
- The admin dashboard is scaffolded to match the backend routes and can be connected to live API data next.
- The login page is wired to the JWT auth endpoint and stores the token in local storage.
