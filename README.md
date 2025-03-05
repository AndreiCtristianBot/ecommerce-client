# E-commerce Client

This is the frontend of the e-commerce project, built with React. The application allows users to browse products, add them to a shopping cart, place orders, and view order history.

## Features

- **Navigation and Routing:**  
  Uses React Router for navigation between pages (Home, Login, Register, Cart, Checkout, Order History, etc.).
- **Modular UI:**  
  React components for product display, shopping cart, checkout, and order history.
- **Form Validation:**  
  Validates user inputs such as phone numbers, postal codes, and address fields based on the selected country.
- **Security:**  
  React automatically escapes data to prevent XSS attacks, and client-side validations improve the user experience (critical validations are also performed on the backend).

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/ecommerce-client.git
   cd ecommerce-client

2. **Install dependencies:**

   ```bash
   npm install

## Development
    To run the application in development mode:
    npm install
    The app will be available at http://localhost:3000.

## Build and Deploy
    To build the application for production:
    npm run build
    This build can be deployed on platforms like Render or any static hosting service.

## Deploy on Render
1. **Publish this repository on GitHub.**
2. **In Render, create a new Web Service for the frontend.**
3. **Select the ecommerce-client repository.**
4. **Render will automatically detect that it’s a React app (if using Create React App) and use the default build and start commands.**
5. **Configure any necessary environment variables in the Render dashboard.**

## Security
    The application uses React, which escapes data in JSX by default to prevent XSS attacks.
    Client-side validations are implemented, but critical validations are also handled on the backend.
    For additional security, consider implementing a Content Security Policy (CSP) through your hosting configuration.

## License
    This project is licensed under the MIT License.