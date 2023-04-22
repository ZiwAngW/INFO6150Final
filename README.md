
# HouseHub - Hotel Booking Project

HouseHub is a hotel booking project built using Node.js, Express.js, and React.js. It allows users to search and book hotels, while also providing an admin panel for managing hotel listings and bookings. The project uses MongoDB Atlas for the database and is hosted on an Azure virtual machine (VM) with process monitoring using PM2.

| Following .env file is needed in the api folder
```
JWT = 
MAILGUN_API_KEY= 
MONGO= 
```
## Features

-   User-friendly interface for searching and booking hotels
-   Admin panel for managing hotel listings and bookings
-   Secure authentication and authorization for users and admins
-   Interactive and responsive UI using React.js
-   Scalable and performant backend using Node.js and Express.js
-   Robust database management using MongoDB Atlas
-   Deployment on an Azure VM with PM2 for process monitoring

## Technologies Used

-   Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine, used for server-side development.
-   Express.js: A fast and minimal web application framework for Node.js, used for building RESTful APIs and handling HTTP requests.
-   React.js: A popular JavaScript library for building user interfaces, used for building the frontend of the application.
-   MongoDB Atlas: A cloud-based database service that provides a fully managed, scalable, and secure MongoDB database.
-   Azure VM: A virtual machine hosting service provided by Microsoft Azure, used for hosting the application.
-   PM2: A process manager for Node.js applications that helps in process monitoring, automatic restarts, and scaling.

## Installation

To run HouseHub locally, follow these steps:

1.  Clone the repository: `git clone https://github.com/your-username/househub.git`
2.  Change directory to the project folder: `cd househub`
3.  Install backend dependencies: `npm install`
4.  Install frontend dependencies: `cd client` and `npm install`
5.  Create a `.env` file in the root directory and set the required environment variables, such as database connection URI, JWT secret key, etc.
6.  Start the backend server: `npm run server`
7.  Start the frontend development server: `npm run client`
8.  Open your web browser and go to `http://localhost:3000` to access the application.

Note: You will need to have Node.js and MongoDB Atlas account credentials to run the application locally.

## Deployment

HouseHub is deployed on an Azure virtual machine using PM2 for process monitoring. To deploy the application to a production environment, follow these steps:

1.  Set up an Azure VM with Node.js and MongoDB Atlas installed.
2.  Clone the repository on the VM: `git clone https://github.com/your-username/househub.git`
3.  Change directory to the project folder: `cd househub`
4.  Install backend dependencies: `npm install`
5.  Install frontend dependencies: `cd client` and `npm install`
6.  Create a `.env` file in the root directory and set the required environment variables for production.
7.  Build the frontend production bundle: `cd client` and `npm run build`
8.  Start the backend server with PM2: `npm run start`
9.  Access the application using the public IP or domain name of your Azure VM.

## Contribution

If you want to contribute to HouseHub, please follow these steps:

1.  Fork the repository and clone it to your local machine.
2.  Create a new branch for your feature or bug fix: `git checkout -b my-feature-branch`
3.  Make your changes and test thoroughly.
4.  Commit your changes with descriptive commit messages: `git commit -m "Add new feature"`.
5.  Push your changes to your forked repository: `git push origin my-feature-branch`.
6.  Create a pull request against the main repository's `master` branch. 7
