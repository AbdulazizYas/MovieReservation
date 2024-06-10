# Movie Reservation API

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/movie-reservation-api.git
   cd movie-reservation-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create `.env` file in the root of the project and add the following:

   ```bash
   PORT=8000
   MONGODB_URL=mongodb://localhost:27017/movieReservation
   ```

4. **Seed the database (For Seeding Movies and Time Slots):**

    Ensure that the mongodb is running

   ```bash
   node src/seed.js
   ```

5. **Start the server:**

   ```bash
   npm start
   ```

## Endpoints

- Get all movies:
  
   ```bash
    curl -X GET http://localhost:3000/api/v1/movies
   ```

- Check availability for a time slot:
  
   ```bash
   curl -X GET http://localhost:3000/api/v1/movies/{movieId}/{timeSlotId}
   ```

- Reserve a time slot:

   ```bash
   curl -X POST http://localhost:3000/api/v1/movies/{movieId}/{timeSlotId}