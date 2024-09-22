This project is a simple RESTful API for managing tickets. It allows you to create, read, update, and delete (CRUD) tickets using Node.js and MongoDB.

1.Project Overview:
This Ticket Management System is designed to help teams manage support tickets effectively. The system includes:
Creating tickets
Viewing all tickets or a single ticket
Updating ticket details
Deleting tickets

2. Features:
Create Ticket: Add a new support ticket.
Read Tickets: View all tickets or a specific ticket.
Update Ticket: Modify details of an existing ticket.
Delete Ticket: Remove a ticket from the system.

3. Technologies Used:
Node.js: JavaScript runtime environment.
Express.js: Web framework for building the API.
MongoDB: NoSQL database for storing ticket information.
Mongoose: Object Data Modeling (ODM) library for MongoDB.
Postman (optional): Tool for testing the API.

4. Setup Instructions
Setup Instructions Prerequisites:
1.Node.js and npm (Node Package Manager)
2.MongoDB: A running instance of MongoDB or access to a MongoDB Atlas cluster.

Steps to Setup Locally:
1. Clone the repository:

git clone https://github.com/your-username/ticket-management-system.git
cd ticket-management-system

2. Install dependencies:

npm install

3. Set up environment variables:

Create a .env file in the project root and add the following:
PORT=3000
MONGO_DB_URI = mongodb+srv://priyansh:priyansh@cluster0.wewnn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

4. Start the application:
npm start

API Documentation

1. Base URL
The API runs locally on http://localhost:3000/api/tickets.

2. Endpoints

1.  Create Ticket
Method: POST
Endpoint: /api/tickets
Request:
{
  "title": "priyansh",
  "description": "aa",
  "status": "Open"
  "priority":"Medium"
}

Response:
[
  {
    "_id": "66f057e8f88e753b93f515b1",
    "title": "priyansh",
    "description": "aa",
    "status": "Open",
    "priority": "Medium",
    "createdBy": "User",
    "assignedTo": null,
    "createdAt": "2024-09-22T17:46:16.922Z",
    "updatedAt": "2024-09-22T17:46:16.922Z",
    "__v": 0
  }
]

2. Get All Tickets

Method: GET
Endpoint: /api/tickets
Response:
[
  {
    "_id": "66f057e8f88e753b93f515b1",
    "title": "priyansh",
    "description": "aa",
    "status": "Open",
    "priority": "Medium",
    "createdBy": "User",
    "assignedTo": null,
    "createdAt": "2024-09-22T17:46:16.922Z",
    "updatedAt": "2024-09-22T17:46:16.922Z",
    "__v": 0
  }
]

3. Get Single Ticket

Method: GET
Endpoint: /api/tickets/:id
Response:
[
  {
    "_id": "66f057e8f88e753b93f515b1",
    "title": "priyansh",
    "description": "aa",
    "status": "Open",
    "priority": "Medium",
    "createdBy": "User",
    "assignedTo": null,
    "createdAt": "2024-09-22T17:46:16.922Z",
    "updatedAt": "2024-09-22T17:46:16.922Z",
    "__v": 0
  }
]

4. Update Ticket

Method: PUT
Endpoint: /api/tickets/:id
Request Body:

{
  "title": "rahul",
  "description": "bb",
  "status": "Open"
  "priority":"Medium"
}

Response:
{
  "_id": "66f057e8f88e753b93f515b1",
  "title": "rahul",
  "description": "bb",
  "status": "Open",
  "priority": "Medium",
  "createdBy": "User",
  "assignedTo": null,
  "createdAt": "2024-09-22T17:46:16.922Z",
  "updatedAt": "2024-09-22T17:54:11.861Z",
  "__v": 0
}

5. Delete Ticket

Method: DELETE
Endpoint: /api/tickets/:id
Response:
{
  "message": "Ticket not found"
}



