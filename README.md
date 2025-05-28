# School Management API

A Node.js API for managing schools with location-based features.

## Features

- Add new schools with location data
- List schools sorted by proximity to a given location
- Input validation
- Distance calculation using Haversine formula

## Prerequisites

- Node.js (v14 or higher)
- MySQL

## Local Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=school_management
   PORT=3000
   ```
4. Create a MySQL database named 'school_management'
5. Start the server:
   ```bash
   npm start
   ```

## API Documentation

### Add School
- **POST** `/api/addSchool`
- **Body:**
  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 12.3456,
    "longitude": 78.9012
  }
  ```
- **Response:**
  ```json
  {
    "message": "School added successfully",
    "schoolId": 1
  }
  ```

### List Schools
- **GET** `/api/listSchools?latitude=12.3456&longitude=78.9012`
- Returns schools sorted by distance from the provided coordinates
- **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "School Name",
      "address": "School Address",
      "latitude": 12.3456,
      "longitude": 78.9012,
      "distance": 0
    }
  ]
  ```

## Deployment

### Deploying to Railway.app (Recommended)

1. Create an account on [Railway.app](https://railway.app)
2. Install Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```
3. Login to Railway:
   ```bash
   railway login
   ```
4. Initialize Railway project:
   ```bash
   railway init
   ```
5. Add MySQL plugin from Railway dashboard
6. Set environment variables in Railway dashboard
7. Deploy:
   ```bash
   railway up
   ```

### Alternative Deployment Options

1. **Heroku**
   - Create a Procfile
   - Set up environment variables
   - Connect to external MySQL database

2. **DigitalOcean**
   - Create a droplet
   - Set up Node.js
   - Configure MySQL
   - Use PM2 for process management

## Testing

### Postman Collection

1. Import the `School_Management_API.postman_collection.json` file into Postman
2. Set up environment variables:
   - For local testing: `base_url = http://localhost:3000`
   - For production: `base_url = your-deployed-url`

### Sample Test Data

```json
{
    "name": "DPS School",
    "address": "123 Education Street, Delhi",
    "latitude": 28.6139,
    "longitude": 77.2090
}
```

```json
{
    "name": "St. Mary's School",
    "address": "456 Learning Road, Mumbai",
    "latitude": 19.0760,
    "longitude": 72.8777
}
```

## Error Handling

- The API includes input validation
- All endpoints return appropriate HTTP status codes
- Detailed error messages are provided when something goes wrong

## Development

For development with auto-reload:
```bash
npm run dev
```

## Production Considerations

1. Set up proper SSL/TLS certificates
2. Implement rate limiting
3. Add API authentication
4. Set up monitoring and logging
5. Configure proper database backups

## Support

For any queries or support, please contact: [Your Contact Information] 