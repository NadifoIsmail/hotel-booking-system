# Hotel Booking System
This is a full-stack Hotel Management System built with Flask (backend) and React (frontend). Users can view available rooms and book them, while admins can manage users and bookings.

## Resources
- **Deployed Frontend**: [Hotel Booking System- Frontend](https://bookrooms-nine.vercel.app/)
- **Deployed Backend**: [Hotel Booking System - Backend](https://hotel-booking-system-xvqy.onrender.com)

## Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js & npm** - Required to run and manage dependencies.
- **React + Vite** - Vite is used as a fast build tool for the React application.
- **Bootstrap** - Used for styling the user interface.
- **A code editor** (e.g., Visual Studio Code) - Recommended for editing and managing the codebase.

## Setup Instructions
To set up and run the frontend application, follow these steps:
1. Navigate to the Frontend Directory
    cd ../frontend
2. Install Dependencies
    npm install
3. Start the React Development Server
    npm run dev

To set up the backend:
1. Clone the Repository
    git clone https://github.com/yourusername/hotel-management.git
    cd hotel-management/backend
2. Create a Virtual Environment
    python -m venv venv
    source venv/bin/activate
3. Install Dependencies
    pip install -r requirements.txt
4. Run the backend server
    python app.py

## Features

- **Users can view available rooms and book a room.**
- **Admins can manage users and bookings.**
- **Rooms are displayed in cards (image, room type, number, price).**
- **Uses PostgreSQL for persistent storage.**

## Tech stack 
 1. Frontend: React (Vite, Bootstrap)
 2. Backend: Flask (Flask-SQLAlchemy, Flask-Migrate)
 3. Database: PostgreSQL
 4. Styling: Bootstrap