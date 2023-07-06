# TradeTech E-commerce API

This repository contains the API for TradeTech, an e-commerce solution tailored to suit the needs of young Ghanaian entrepreneurs who deal in the selling of digital and technological devices.

## Features

- User management:
  - Create, login, update, and delete users
  - User authentication and authorization using JSON Web Tokens (JWT)
  - User password reset and email verification functionality

- Product management:
  - Create, update, and delete products
  - Get single or all products
  - Add products to a user's wishlist
  - Product ratings and reviews

- Order management:
  - Create, update, and delete orders
  - Get single or all orders
  - Update order status

- Blog management:
  - Create, update, and delete blog posts
  - Like, dislike, and comment on blog posts

- Other features include:
  - Brand management
  - Color management
  - Coupon management
  - Enquiry management
  - Category management
  - Image uploading and deletion

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose

## Dependencies

- Cloudinary
- Jsonwebtoken
- Nodemailer
- Mongoose
- Bcrypt

## API Endpoints

Please refer to the API documentation for a detailed list of available endpoints and their functionalities.

## Getting Started

To get started with using the TradeTech E-commerce API, follow these steps:

1. Clone the repository: `git clone https://github.com/neophyte-programmer/tradetech_backend/`
2. Install dependencies: `npm install`
3. Configure environment variables by creating an `.env` file.
4. Run the API: `npm run server`

Make sure you have a MongoDB database set up and accessible.

## Known Limitations

- The TradeTech E-commerce API is designed as a single vendor e-commerce application and does not support multi-vendor functionality.

## Contributing

This project is not open-source (it is for a semester project), and contributions are not accepted at this time.
