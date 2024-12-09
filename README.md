# Festivals Around the World

## Project Description

**Festivals Around the World**  is a Node.js application that delivers server-side functionality, including caching, logging, and data handling. It is designed to be modular, with each file dedicated to specific functionalities to ensure clean, maintainable code.



## Our Story

Our exploration of festivals and events began with a dataset from  [Kaggle](https://www.kaggle.com/). However, the dataset fell short of our requirements. Frank discovered a developer-friendly website offering similar data. While awaiting an API key, we directly requested the data and received 16 pages of JSON-formatted information. This data, converted into a CSV file (`originalFestivalsAndPerformers.csv`), contained over 1,000 fields, much more than needed.

We identified essential fields and split the data into two datasets: one for festivals and one for performers.

----------

### Data Cleaning and Splitting

1.  **Festival Data**: Extracted using  `extractFestivalFields.js`  and saved as  `festivalsOnly.csv`.
2.  **Performer Data**: Extracted using  `deleteFestivalFields.js`  and saved as  `performersOnly.csv`. 

*Although we were uncertain about using performer data, we decided to keep it just in case.*

----------

### Database and API Setup

We built an Express API (`server.js`) and connected it to a MongoDB database:

-   **Festivals**: Stored in the  `FestivalsAroundTheWorld`  database as the  `festivals`  collection.
-   **Performers**: Stored in the  `FestivalsAroundTheWorld`  database as the  `performers`  collection. 

We loaded the cleaned data into MongoDB using the  `loadData.js`  script.



## Features


1. **Logging**: 
  - We used the `winston` library, encapsulated in `logger.js`.
  - Logs are written to both the terminal and date-stamped files in the `logs` directory.
  - Logs are color-coded, formatted, and prettified for readability.
  - Logs messages with different levels (info, warning, error).

2. **Pagination**:
  - Built into `server.js` and `searchRoutes.js`, enabling users to handle the overwhelming amount of data by limiting the number of records displayed per page.
 - Provided in the API endpoints.
 - Handles the large dataset and optimizez responsiveness.

3. **Caching**:
  - The `caching.js` file establishes a Redis connection to cache data for 1 hour, improving performance for repeated queries.
- Cached data is stored in-memory for fast access, reducing database hits and improving responsiveness.
-   After the 1-hour cache expiration, Redis automatically saves the expired data to a  `dump.rdb`  file. This ensures the data can be restored if needed during future operations.
  

4.  **Data Loading:**
   -   Implemented using  `loadData.js`  to manage the ETL process, ensuring seamless cleaning, transformation, and loading of data into MongoDB.
    -   Automates the preparation and population of datasets for efficient database setup.
5. **Routing:**
    
  -   Handled by  `searchRoutes.js`, featuring well-organized and modularized API routes for efficient functionality and maintainability.
    -   Includes advanced filtering and search capabilities for detailed data retrieval, such as filtering by name, city, country, and date ranges.
6. **Server Initialization**:
    
 -   Set up using  `server.js`, providing a robust and scalable foundation for API operations.
    -   Manages the Express server configuration, including middleware setup, route integration, and database connection.

## Advanced Filtering
We developed routes in `searchRoutes.js` for detailed filtering. Users can filter festivals based on:

 **Attributes**: Name, Start date, End date, Location name, Street address, City, Country, Postal code, and Time zone

**Combination**: Multiple filters can be applied simultaneously for precise searches.



## Frontend
For the frontend, we set up a React application:
- Displayed festival details on cards, including images from the data.
- Includes a **search bar** for festival names.
- Integrated a **calendar selector** for filtering by start date.



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


## Backend Usage

1.  Start the Redis server in one terminal:
    
    ```
    redis-server
    ```
  2. If you need to confirm Redis is running:

		```
		redis-cli ping
		```
    
3.  Start the application in another terminal:
    
    ```
    cd backend
    node server.js
    ```
    
4.  Access the application:
    
    ```
    http://localhost:5001/festivals
    ```
    

### Testing Examples

-   **List festivals with pagination:**
    
    `http://localhost:5001/festivals?page=1&limit=5`
        
-   **Fetch all festivals:**
    
      `http://localhost:5001/festivals`
        
-   **Fetch a specific festival by ID:**
    
      `http://localhost:5001/festivals/674f38206160cd3d943298e0`
    
-   **Search festivals by name**:
    

    
    `http://localhost:5001/api/search-festivals?name=Trotamundo` 
    
-   **Search festivals by city**:
    

    `http://localhost:5001/api/search-festivals?city=Houston` 
    
-   **Search festivals by city and country**:
    

    
    `http://localhost:5001/api/search-festivals?city=Groningen&countryName=Netherlands` 
    
-   **Search festivals by country identifier**:
    

    
    `http://localhost:5001/api/search-festivals?countryIdentifier=MX` 
    
-   **Search festivals by timezone**:

    
    `http://localhost:5001/api/search-festivals?timezone=Europe/Vienna` 
    
-   **Search festivals by start date**:
    

    
    `http://localhost:5001/api/search-festivals?startDate=2025-01-24` 
    
-   **Search festivals by start and end date**:
    

    
    `http://localhost:5001/api/search-festivals?startDate=2025-01-24&endDate=2025-01-25`


        


## Frontend Usage

1. Start the Redis server in one terminal:
   ```bash
   redis-server
   ```

2. In a second terminal, start the application:
   ```bash
   cd backend
   node server.js
   ```

3. In third terminal, start React application:
   ```
   cd frontend
   npm start
   ```

## Dependencies
List all the main dependencies for the project (add these based on your `package.json`):
- Node.js
- Express
- Redis
- MongoDB
- Additional modules for logging, caching, and data handling.


## Project Requirments


1.  **Database Setup**:
    
    -   Design and set up a database based on your project requirements.
    -   Populate the database using ETL processes, data collected from external sources, or manual input, as necessary. Setting up a database is essential, even if data is entered manually, for the API to interact with it.
2.  **API Implementation**:
    
    -   Build an API to interact with the database for retrieving, manipulating, and returning data.
    -   Ensure proper HTTP status codes are used in responses.
3.  **Core Functionalities**:
    
    -   Map database data to useful models, if needed, before returning responses.


## Challenges and Solutions

We resolved a MongoDB access issue by updating the IP Access List in MongoDB Atlas’s Network Access settings to `0.0.0.0/0`, allowing universal access.


## Authors


|  Abrielle Perry | Frank Blation |
|--|--|
|<a href="mailto:abrielleperry22@icloud.com">Email</a>|<a href="mailto:franklin.blation@atlasschool.com">Email</a>
 [LinkedIn](www.linkedin.com/in/abriellerperry)|[LinkedIn](https://www.linkedin.com/in/frankblation/)
 [GitHub](https://github.com/abrielleperry) | [GitHub](https://github.com/Frankblation)

