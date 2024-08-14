Project README
Table of Contents
Setup Instructions
API Documentation
Assumptions and Decisions
Approach to the Task
Database Design and Schema
Security and Performance
Challenges and Solutions
Setup Instructions
Prerequisites
Before you begin, ensure that you have the following software installed on your local machine:

Node.js (v14.x or higher)
npm or yarn (Node package manager)
PostgreSQL (or another relational database)
Git (for cloning the repository)
Installation
Clone the repository:

bash

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
Install dependencies:

Using npm:

bash

npm install
Or using yarn:

bash

yarn install
Set up environment variables:

Create a .env file in the root directory of your project and add the following variables:

plaintext

DATABASE_URL=your_database_url_here
JWT_SECRET=your_jwt_secret_here
PORT=3000
DATABASE_URL: The connection string for your PostgreSQL database.
JWT_SECRET: A secret key for signing JWT tokens.
PORT: The port number on which the application will run (optional, defaults to 3000).
Set up the database:

Make sure your PostgreSQL server is running, and you have created a database for this project.

Run database migrations:

If you are using Sequelize or another ORM with migrations, run the migrations to create the necessary tables:

bash

npx sequelize-cli db:migrate
Start the application:

Using npm:

bash

npm start
Or using yarn:

bash

yarn start
The application should now be running on http://localhost:3000.

API Documentation
Authentication Endpoints
Register User

Endpoint: /api/auth/register
Method: POST
Description: Registers a new user.
Body:
json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Response:
json

{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
Login User

Endpoint: /api/auth/login
Method: POST
Description: Authenticates a user and returns a JWT token.
Body:
json

{
  "email": "john@example.com",
  "password": "password123"
}
Response:
json

{
  "message": "Login successful",
  "token": "your_jwt_token"
}
Course Endpoints
Create Course

Endpoint: /api/courses
Method: POST
Description: Creates a new course.
Headers: Authorization: Bearer <token>
Body:
json

{
  "title": "Introduction to Programming",
  "description": "Learn the basics of programming with this introductory course."
}
Response:
json

{
  "message": "Course created",
  "course": {
    "id": 1,
    "title": "Introduction to Programming",
    "description": "Learn the basics of programming with this introductory course."
  }
}
Get All Courses

Endpoint: /api/courses
Method: GET
Description: Retrieves a list of all courses.
Headers: Authorization: Bearer <token>
Response:
json

[
  {
    "id": 1,
    "title": "Introduction to Programming",
    "description": "Learn the basics of programming with this introductory course.",
    "lessons": []
  },
  {
    "id": 2,
    "title": "Advanced JavaScript",
    "description": "Deep dive into JavaScript with this advanced course.",
    "lessons": []
  }
]
Get Course by ID

Endpoint: /api/courses/:id
Method: GET
Description: Retrieves a single course by its ID.
Headers: Authorization: Bearer <token>
Response:
json

{
  "id": 1,
  "title": "Introduction to Programming",
  "description": "Learn the basics of programming with this introductory course.",
  "lessons": []
}
Update Course

Endpoint: /api/courses/:id
Method: PUT
Description: Updates an existing course.
Headers: Authorization: Bearer <token>
Body:
json

{
  "title": "Introduction to Programming - Updated"
}
Response:
json

{
  "message": "Course updated",
  "course": {
    "id": 1,
    "title": "Introduction to Programming - Updated",
    "description": "Learn the basics of programming with this introductory course."
  }
}
Delete Course

Endpoint: /api/courses/:id
Method: DELETE
Description: Deletes a course.
Headers: Authorization: Bearer <token>
Response:
json

{
  "message": "Course deleted"
}
Lesson Endpoints
Create Lesson

Endpoint: /api/lessons
Method: POST
Description: Creates a new lesson.
Headers: Authorization: Bearer <token>
Body:
json

{
  "title": "Lesson 1: Introduction to Programming",
  "content": "This lesson covers the basics of programming.",
  "courseId": 1
}
Response:
json

{
  "message": "Lesson created",
  "lesson": {
    "id": 1,
    "title": "Lesson 1: Introduction to Programming",
    "content": "This lesson covers the basics of programming.",
    "courseId": 1
  }
}
Get All Lessons

Endpoint: /api/lessons
Method: GET
Description: Retrieves a list of all lessons.
Headers: Authorization: Bearer <token>
Response:
json

[
  {
    "id": 1,
    "title": "Lesson 1: Introduction to Programming",
    "content": "This lesson covers the basics of programming.",
    "courseId": 1
  },
  {
    "id": 2,
    "title": "Lesson 2: Variables and Data Types",
    "content": "This lesson covers variables and data types in programming.",
    "courseId": 1
  }
]
Get Lesson by ID

Endpoint: /api/lessons/:id
Method: GET
Description: Retrieves a single lesson by its ID.
Headers: Authorization: Bearer <token>
Response:
json

{
  "id": 1,
  "title": "Lesson 1: Introduction to Programming",
  "content": "This lesson covers the basics of programming.",
  "courseId": 1
}
Update Lesson

Endpoint: /api/lessons/:id
Method: PUT
Description: Updates an existing lesson.
Headers: Authorization: Bearer <token>
Body:
json

{
  "title": "Lesson 1: Introduction to Programming - Updated"
}
Response:
json

{
  "message": "Lesson updated",
  "lesson": {
    "id": 1,
    "title": "Lesson 1: Introduction to Programming - Updated",
    "content": "This lesson covers the basics of programming.",
    "courseId": 1
  }
}
Delete Lesson

Endpoint: /api/lessons/:id
Method: DELETE
Description: Deletes a lesson.
Headers: Authorization: Bearer <token>
Response:
json

{
  "message": "Lesson deleted"
}
Search Endpoints
Search Content

Endpoint: /api/search
Method: GET
Description: Searches for courses or lessons based on keywords.
Query Parameters:
q: The search query (e.g., programming, JavaScript).
Headers: Authorization: Bearer <token>
Response:
json

[
  {
    "id": 1,
    "title": "Introduction to Programming",
    "description": "Learn the basics of programming with this introductory course.",
    "type": "course"
  },
  {
    "id": 2,
    "title": "Lesson 1: Introduction to Programming",
    "content": "This lesson covers the basics of programming.",
    "type": "lesson"
  }
]
Assumptions and Decisions
Assumptions
Relational Database: The application assumes the use of a relational database (e.g., PostgreSQL) for storing courses and lessons, with Sequelize ORM managing the relationships.
Authentication: JWT (JSON Web Token) is used for authentication and securing API endpoints.
User Roles: All users are assumed to have the same access level, with no role-based access control implemented.
Decisions
Database Structure: A normalized relational schema was chosen to efficiently manage and query courses and lessons.
Security Practices: Best practices, such as input validation, use of HTTPS (assumed in production), and error handling, were implemented to ensure the security of the API.
Caching: Basic caching was introduced to optimize performance, especially for frequently accessed data.
Approach to the Task
Database Design and Schema
The database schema was designed to reflect a typical educational content management system. The primary entities are Course and Lesson, with a one-to-many relationship where a course can have multiple lessons.

Courses Table:

id: Primary key.
title: The title of the course.
description: A brief description of the course.
createdAt and updatedAt: Timestamps managed by Sequelize.
Lessons Table:

id: Primary key.
title: The title of the lesson.
content: The main content of the lesson.
courseId: Foreign key referencing the Courses table.
createdAt and updatedAt: Timestamps managed by Sequelize.
Indexes were added to optimize query performance, especially on fields used frequently in search queries, such as title and content.

Security and Performance
Security
Security was a top priority throughout the development process. The following measures were taken:

Input Validation:

All incoming data is validated to prevent SQL injection, XSS, and other common web vulnerabilities. For example, the express-validator library can be used for this purpose.
Authentication and Authorization:

JWT is used to authenticate users and protect API endpoints. The authMiddleware ensures that only authenticated users can access protected routes.
Error Handling:

A global error handler middleware was implemented to catch and manage errors gracefully. Sensitive error information is not exposed to the client.
Environment Variables:

Sensitive information such as the database URL and JWT secret is stored in environment variables, which are loaded using the dotenv library.
HTTPS (in Production):

While HTTPS is not configured for local development, it is assumed that the application will be deployed with HTTPS in a production environment.
Performance
To ensure the application performs well under load, the following performance optimization strategies were applied:

Caching:

A basic in-memory caching mechanism was implemented using middleware to cache responses for frequently accessed data, such as course and lesson lists.
Database Indexing:

Indexes were added on fields used in search queries and filtering to speed up data retrieval.
Optimized Queries:

Sequelize ORM was used to write optimized queries with eager loading (include) to reduce the number of database calls, especially when retrieving related data like courses and their lessons.
Pagination (Optional):

Pagination can be added to endpoints that return large datasets (e.g., courses or lessons) to reduce the payload size and improve response times.
Challenges and Solutions
Database Relationships:

Challenge: Defining and managing the relationships between courses and lessons while ensuring data integrity.
Solution: Sequelize's belongsTo and hasMany associations were used to define the one-to-many relationship between courses and lessons. Foreign keys were managed by Sequelize to enforce referential integrity.
JWT Authentication:

Challenge: Implementing JWT authentication securely and ensuring it works seamlessly with the existing API.
Solution: The jsonwebtoken library was used to sign and verify tokens. Middleware was added to validate tokens on protected routes, ensuring that only authenticated users can access these endpoints.
Caching Mechanism:

Challenge: Implementing caching without introducing complexity or data inconsistency.
Solution: A simple in-memory cache was implemented as middleware, with a strategy to refresh cache entries after a set time period. This approach was balanced to avoid stale data while improving performance.
Error Handling:

Challenge: Providing informative error messages to the client while avoiding exposure of sensitive information.
Solution: A centralized error handling middleware was created to catch errors and format responses consistently. In production, detailed error information is logged, but only generic error messages are sent to the client.
