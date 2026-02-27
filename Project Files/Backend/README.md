# BookNest Backend

Express.js API server for the BookNest e-commerce platform built with MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

## Installation

1. Navigate to the backend directory:
   ```bash
   cd Project\ Files/Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from the `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your MongoDB connection string:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/booknest
   PORT=5000
   CORS_ORIGIN=http://localhost:3000
   NODE_ENV=development
   ```

## Running the Server

```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Add a new book (with image upload)
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id` - Update an order
- `PATCH /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete an order

### Sellers
- `GET /api/sellers` - Get all sellers
- `GET /api/sellers/:id` - Get seller by ID
- `POST /api/sellers/register` - Register a new seller
- `PUT /api/sellers/:id` - Update seller information
- `DELETE /api/sellers/:id` - Delete a seller

## Project Structure

```
Backend/
├── models/
│   ├── book.js
│   ├── Order.js
│   └── Seller.js
├── routes/
│   ├── bookRoutes.js
│   ├── orderRoutes.js
│   └── sellerRoutes.js
├── public/
│   └── images/        (Uploaded book images)
├── server.js
├── package.json
└── .env.example
```

## Features

- ✅ RESTful API with Express.js
- ✅ MongoDB integration with Mongoose
- ✅ CORS enabled for frontend communication
- ✅ Image upload with Multer
- ✅ Error handling and validation
- ✅ Environment configuration management
- ✅ Modular route structure

## Environment Variables

Required environment variables in `.env`:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/booknest` |
| `PORT` | Server port | `5000` |
| `CORS_ORIGIN` | Frontend URL | `http://localhost:3000` |
| `NODE_ENV` | Environment type | `development` or `production` |

## Development

To run in development mode with auto-reload:

```bash
npm install -g nodemon
nodemon server.js
```

## Troubleshooting

- **MongoDB Connection Error**: Verify your MONGO_URI is correct and your IP is whitelisted in MongoDB Atlas
- **Port Already in Use**: Change the PORT in `.env` or kill the process using that port
- **CORS Errors**: Ensure CORS_ORIGIN matches your frontend URL

## License

ISC
