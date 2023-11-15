

## Base API URL

[https://varthak-task.onrender.com/](https://varthak-task.onrender.com/)

## Local Development

### Prerequisites

- Node.js 

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/MSaifKhan01/Varthak-TypeScript
    ```

2. **Install dependencies:**

    ```bash
    cd Varthak-TypeScript

    npm install
    ```

3. **Set environment variables:**

   Create a `.env` file in the project  directory and add the following environment variables:

    ```env
    url=<your-mongodb-connection-string>
    JWT_SECRET=<your-secret-key>
    port=5000
    ```

4. **Start the server:**

    ```bash
    npm start
    ```

   The server will be running locally at [http://localhost:5000](http://localhost:5000)

## API Endpoints

### Sign Up

- **Method:** POST
- **URL:** /register
- **Description:** Create a new user account
- **Request Body:**
  - username (string): User's username 
  - password (string): User's password
  - roles (array): User roles (e.g., ["CREATOR", "VIEWER"])

### Log In

- **Method:** POST
- **URL:** /login
- **Description:** Authenticate user and generate JWT token
- **Request Body:**
  - username (string): User's username 
  - password (string): User's password
- **Response:**
  - msg (string): Success message
  - token (string): JWT token

### Get Books

- **Method:** GET
- **URL:** /books
- **Description:** Get a list of books based on user role
- **Query Parameters:**
  - old (number, optional): Set to 1 to retrieve books created 10 minutes ago and older
  - new (number, optional): Set to 1 to retrieve books created less than 10 minutes ago
- **Headers:**
  - authorization (string): Bearer (JWT token)

  **Note:**
  - If the user role is VIEWER, the user can only see books created by them.
  - If the user role is VIEW_ALL, the user can see or access all books.

### Create Book

- **Method:** POST
- **URL:** /books
- **Description:** Create a new book
- **Request Body:**
  - title (string): Book title
  - author (string): Book author
- **Headers:**
  - authorization (string):(JWT token)
  - Content-Type: application/json

