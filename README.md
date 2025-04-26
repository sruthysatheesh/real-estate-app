A full-stack real estate application that allows users to buy, sell, or rent properties with advanced map-based search functionality using OpenStreetMap API.

Features
1. User Authentication: Secure signup/login with JWT

2. Property Listings: Create, view, update, and delete property listings

3. Advanced Search: Filter properties by type, price range, bedrooms, etc.

4. Map Integration: Precise location selection using OpenStreetMap

5. Responsive Design: Works on all device sizes

6. Favorites System: Save properties to your favorites list

Technologies Used
Frontend
1. React.js - JavaScript library for building user interfaces

2. SCSS - CSS preprocessor for styling

3. Leaflet.js - Interactive maps with OpenStreetMap

4. React Router - Client-side routing

5. Axios - HTTP client for API requests

Backend
1. Node.js - JavaScript runtime environment

2. Express.js - Web application framework

3. MongoDB - NoSQL database

4. Mongoose - MongoDB object modeling

5. JSON Web Tokens (JWT) - Authentication

6. Multer - File upload handling

APIs
OpenStreetMap API - Map data and geocoding

Installation
Prerequisites
1. Node.js (v14 or later)

2. MongoDB (v4 or later)

Git

Setup Instructions
Clone the repository

```bash
git clone https://github.com/yourusername/real-estate-app.git
cd real-estate-app
```
Install dependencies

```bash
# Install server dependencies
cd app
npm install


# Install client dependencies
cd ../client
npm install
```

Environment Setup

Create a .env file in the server directory with the following variables:

```MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Run the application
```

```bash
# In app directory
node app.js

# In client directory
npm run dev
```

Map Integration
The application uses OpenStreetMap with Leaflet.js for:

Displaying properties on an interactive map

Precise location selection when creating listings

Address search and geocoding

Property clustering for better visualization of dense areas

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request
