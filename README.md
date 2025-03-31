# Steam Game Tracker

Steam Game Tracker is a web application that allows users to view information about their Steam profile, including their friends list, recently played games, and owned games. The project uses the Steam API to fetch user data and displays it in a clean and user-friendly interface.

## Features

- **Steam Login**: Users can log in using their Steam account.
- **Profile Information**: Displays detailed information about the user's Steam profile, such as username, avatar, country, and online status.
- **Friends List**: View the user's friends list with links to their profiles.
- **Recently Played Games**: Shows games the user has played in the last two weeks.
- **Owned Games**: Displays a list of all owned games with playtime information.

## Technologies

### Frontend

- **React**: Library for building the user interface.
- **React Query**: For state management and data fetching.
- **Tailwind CSS**: CSS framework for styling.
- **Vite**: Build tool for fast development.
- **GitHub Pages**: Hosting for the frontend application.

### Backend

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Framework for building the API.
- **Passport.js**: Handles Steam authentication.
- **AWS SSM**: Secure storage for the Steam API key.
- **CORS**: Enables cross-origin requests.

## API Endpoints

### Backend Endpoints

- **`GET /auth/steam`**: Initiates the Steam login process.
- **`GET /auth/steam/return`**: Callback after Steam login.
- **`GET /auth/status`**: Checks the authentication status.
- **`GET /getPlayerSummaries`**: Retrieves the user's profile information.
- **`GET /getFriendList`**: Retrieves the user's friends list.
- **`GET /getRecentlyPlayedGames`**: Retrieves recently played games.
- **`GET /getOwnedGames`**: Retrieves the list of owned games.

## Known Issues and Limitations

- **Safari on iOS**: Issues with third-party cookies may require additional configuration.
- **Private Browsing Mode**: Session data may not persist in private browsing mode.
- **Steam API Limitations**: Some data may be unavailable if the user has strict privacy settings.

## Live Demo

The project is hosted on **GitHub Pages** and can be accessed at:  
[Steam Game Tracker](https://michalele233.github.io/Steam-Game-Tracker/)

## Author

This project was created by **Michał Pieszko**.

## License

This project is licensed under the **ISC License**.
