# Books Wiki Web Application

Welcome to the Books Wiki web application! This application allows users to add, rank, search, and filter books based on various criteria. The application is built using JavaScript, with Node.js powering the backend and React handling the frontend.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)


## Introduction

The Books Wiki web application provides a user-friendly interface to manage a collection of books. Users can add new books along with details, rank books, search for specific books, and filter books based on publication year and rank. This application is designed to make book management and discovery easy and efficient.

## Features

1. **Add Books**: Users can add new books to the catalog by providing details such as title, author, publication year, and a brief description.

2. **Ranking**: Users can rank books based on their preference, helping others discover highly recommended books.

3. **Search**: The application provides a search functionality that allows users to find specific books based on keywords or titles.

4. **Filtering**: Users can filter the list of books based on publication year and rank to quickly find books that match their criteria.

5. **Responsive Design**: The frontend is built using React, ensuring a responsive and user-friendly experience across different devices.

## Installation

To run the Books Wiki web application locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/ohadAM12/BooksWiki.git
   ```

2. Navigate to the backend directory:
   ```sh
   cd BooksWiki/server
   ```

3. Install backend dependencies:
   ```sh
   npm install
   ```

4. Start the backend server:
   ```sh
   npm start
   ```

5. Open a new terminal window and navigate to the frontend directory:
   ```sh
   cd ../client
   ```

6. Install frontend dependencies:
   ```sh
   npm install
   ```

7. Start the frontend development server:
   ```sh
   npm start
   ```

8. Access the application in your web browser at `http://localhost:3080`.

## Usage

1. **Adding Books**: On the homepage, there's an option to add a new book. Fill in the required details and submit the form.

2. **Ranking Books**: After adding books, you can visit each book's page and provide a ranking. Higher rankings indicate a stronger recommendation.

3. **Searching**: Utilize the search bar to find specific books by entering keywords or titles.

4. **Filtering**: Use the provided filters to narrow down the list of books based on publication year and rank.

## Technologies Used

- **Backend**: Node.js
- **Frontend**: React

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow the standard GitHub workflow:

1. Fork the repository.
2. Create a new branch for your feature/fix: `git checkout -b feature-name`.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your fork: `git push origin feature-name`.
5. Create a pull request detailing your changes.
