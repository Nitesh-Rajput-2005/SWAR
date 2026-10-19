# SWAR 🎵

**SWAR is a full-stack music streaming web application** where users can create accounts, verify their email through OTP authentication, browse and play songs, and create personalized playlists.

🔗 **Live Demo:** https://swar-five.vercel.app/

## Features

- User signup and login
- Email OTP verification
- JWT-based authentication
- Browse and play songs
- Create and manage playlists
- Add songs to playlists
- MongoDB database integration
- Responsive music player interface

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Joi
- Resend / email service

## Project Structure

```text
SWAR/
├── Backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── db.js
│   ├── seed.js
│   └── server.js
├── public/
│   ├── svg/
│   ├── home.html
│   ├── homescript.js
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── verify-otp.html
│   ├── script.js
│   ├── style.css
│   └── utility.css
├── package.json
└── .gitignore
```

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nitesh-Rajput-2005/SWAR.git
   cd SWAR
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the required environment variables in your local `.env` file.

4. Start the application using the appropriate script defined in `package.json`.

## Author

**Nitesh Kumar**
