# Geofencing API

A RESTful API for managing and checking geographical fences (geofences) using Node.js, Express, and Turf.js.

## Features

- Create, read, update, and delete geofences
- Check if coordinates are within defined geofences
- Calculate distances between points using Haversine formula
- Secure API key authentication
- CORS support with configurable allowed origins

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Fencing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   API_SECRET=your-secure-api-key
   ALLOWED_ORIGIN=http://localhost:3001
   ```

## API Endpoints

### Fences

- `GET /api/fences` - Get all geofences
- `POST /api/fences` - Create a new geofence
- `PUT /api/fences/:id` - Update a geofence
- `DELETE /api/fences/:id` - Delete a geofence

### Geofence Check

- `POST /api/fences/check` - Check if a point is within any geofence

## Request Headers

Include your API key in the request headers:
```
x-api-key: your-api-key
```

## Development

To run in development mode with auto-reload:
```bash
npx nodemon server.js
```

## Data Storage

Geofence data is stored in `data/fences.json` in GeoJSON format.

## Dependencies

- Express - Web framework
- @turf/turf - Geospatial analysis
- CORS - Cross-origin resource sharing
- dotenv - Environment variable management
- nodemon - Development server with auto-reload

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.