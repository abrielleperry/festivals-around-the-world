#  Custom API From Scratch

# Festivals Around the World

## Description
This project is a Node.js application that provides server-side functionality, including caching, logging, and data handling. It is modular, with each file handling specific functionalities to ensure clean code and maintainability.

## Features
- **Caching**: Implements efficient caching mechanisms.
- **Logging**: Provides detailed logging for debugging and monitoring.
- **Data Loading**: Manages the loading of data for the application.
- **Routing**: Handles search routes for API or application endpoints.
- **Server Initialization**: Sets up and runs the server.

## Requirements

To meet the project requirements:
1. **Database Setup**:
   - Design and set up a database based on project requirements.
   - Populate the database using ETL processes or manual input as necessary.
2. **API Implementation**:
   - Interact with the database to retrieve, manipulate, and return data.
   - Use proper status codes in HTTP responses.
3. **Core Functionalities**:
   - Map database data to useful models, if necessary.
4. **Required Features** (Three implemented):
   - **Logging**: Implemented via `logger.js`.
   - **Pagination**: Provided in the API endpoints.
   - **Caching**: Implemented via `cache.js` to reduce database hits and improve responsiveness.

Additional Features include a test user for API testing, and Postman is recommended for API testing and development.

## File Overview

### 1. `App.js`
- **Purpose**: Serves as the main entry point for the application.
- **Key Features**:
  - Initializes and configures the application.
  - Integrates all the modular functionalities (caching, logging, routing, etc.).

### 2. `cache.js`
- **Purpose**: Manages caching to optimize performance.
- **Key Features**:
  - Implements in-memory caching.
  - Provides methods to set, get, and clear cache entries.

### 3. `logger.js`
- **Purpose**: Provides logging capabilities for the application.
- **Key Features**:
  - Logs messages with different levels (info, warning, error).
  - Formats log outputs for better readability.
  - Includes timestamps for all logs.

### 4. `loadData.js`
- **Purpose**: Handles data loading and processing.
- **Key Features**:
  - Loads data from files, APIs, or other sources.
  - Processes data into formats usable by other parts of the application.

### 5. `searchRoutes.js`
- **Purpose**: Defines search-related routes for the application.
- **Key Features**:
  - Sets up API endpoints for searching data.
  - Processes incoming requests and returns appropriate responses.

### 6. `server.js`
- **Purpose**: Initializes and starts the server.
- **Key Features**:
  - Configures server settings (port, middleware, etc.).
  - Listens for incoming HTTP requests.
  - Integrates routing modules.

## Installation

1. Clone the repository:
   ```bash
   git clone https://[PAC]@github.com/abrielleperry/festivals-around-the-world.git
   ```

2. Navigate to the project directory:
   ```bash
   cd festivals-around-the-world
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the Redis server in one terminal:
   ```bash
   redis-server
   ```

2. In a second terminal, start the application:
   ```bash
   cd backend
   node server.js
   ```

3. Access the application in your browser or via API endpoints at:
   ```
   http://localhost:5001/festivals
   ```

### Examples for Testing

- Festivals:
  - `http://localhost:5001/festivals?page=1&limit=5`
  - `http://localhost:5001/festivals`
  - `http://localhost:5001/festivals/674f38206160cd3d943298e0`

## Dependencies
List all the main dependencies for the project (add these based on your `package.json`):
- Node.js
- Express
- Redis
- Other modules (e.g., for logging or caching)




## Authors


|  Abrielle Perry | Frank Blation |
|--|--|
|<a href="mailto:abrielleperry22@icloud.com">Email</a>|<a href="mailto:franklin.blation@atlasschool.com">Email</a>
 [LinkedIn](www.linkedin.com/in/abriellerperry)|[LinkedIn](https://www.linkedin.com/in/frankblation/)
 [GitHub](https://github.com/abrielleperry) | [GitHub](https://github.com/Frankblation)



