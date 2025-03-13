# SkylineShine Website

## Description
This website is designed for **Skyline Shine**, a Cyptus company specializing in mobile car cleaning and detailing services.

## Prerequisites
To run the files, you will need:
1. **Node.js**
2. **pgAdmin 4** (or any other database interface)

## Setup
1. Open the project folder in a text editor.
2. Navigate to the root directory of the project in the terminal.
3. Run `npm init -y` to initialize npm.
4. Run `npm install` to install all dependencies.
5. Run `node app.js` to start the application locally.
6. Open the provided link in your terminal (e.g., `http://localhost:8080`).
7. You’re all set!

## Project Structure
The project is organized into several key components, each responsible for different aspects of the application. Here is an overview of the structure:
- **`app.js`:**
    - This is the main entry point of the application. It contains the core server setup and handles API calls to the database.
- **`routes/`:**
    - This directory contains multiple route.js files, each responsible for different aspects of the application’s routing
- **`components/`:**
    - This directory includes reusable components used across various routes. Each component is responsible for rendering specific parts of the application
- **`views/`:**
    - This directory contains EJS (Embedded JavaScript) template files that define the structure and layout of the web pages


## Navigating the Site
The website consists of the following sections:
1. **Home Page**
2. **Services Page**
3. **Book an Appointment Page**
4. **About Us Page**
5. **Contact Us Page**
6. **Opening Hours Page**
7. **Login / Register Page**
8. **Client Area**
9. **Admin Area**

## Features
1. Forgot Password functionality with a unique reset token.
2. Mailer integration for appointment booking.
3. Ability to alter bookings.
4. Google account integration for login and registration.
5. Google Maps links and addresses.
6. Google Reviews integration.

## Frameworks Used
1. **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine, used for building scalable server-side applications.
2. **Express.js:** A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
3. **EJS:** A templating engine for JavaScript that allows embedding JavaScript code into HTML, making it easier to generate dynamic content.
4. **Bootstrap 5:** A front-end framework for developing responsive and mobile-first websites, providing pre-designed components and styles.

## Disclaimers
-   The project files could not be uploaded to the university server due to compatibility issues between the server and the PostgreSQL database. At the time of the viva the system will be available online at [http://62.228.193.232:8080/](http://62.228.193.232:8080/).
-   Google Authentication works only locally since google redirects it's users to only authorized websites (ending on `.com` or `.org` etc.)

## Admin Credentials
**Email:** no.reply.skyline.shine@gmail.com
**Google Password:** SkylineShine01$
**Website Password:** 1234

Admin Account can be used to check:
- Inbox (Contact us): Emails copming from the contact forms
- Admin Dashboard: Analytic booking dashboard for the admins


## Contact Information
**Name:** Elena Blissi  
**Email:** [elenablissifbg@gmail.com](mailto:elenablissifbg@gmail.com)