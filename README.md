# Checkmate
A real-time multiplayer chess game built using Node.js, Express, Socket.IO, and the Chess.js library. Play as white or black, with live board updates, move validation, and player roles (spectator mode included). Fully interactive drag-and-drop UI with chess piece Unicode rendering.
CheckMate is a real-time, multiplayer chess game inspired by Chess.com, built using Node.js, Express, Socket.IO, and the Chess.js library. It allows players to compete as white or black, with real-time board updates, move validation, and drag-and-drop functionality. Spectators can also observe the game in real-time.

Features
Real-Time Gameplay: Play against another player with real-time move updates using WebSockets.
Drag-and-Drop UI: User-friendly interface with drag-and-drop functionality to move chess pieces.
Move Validation: Chess.js library ensures only valid moves are allowed.
Multiplayer Support: Two-player mode with white and black pieces, and additional spectator mode.
Automatic Board Flip: The board automatically flips for black players for a natural playing experience.
Technologies Used
Frontend:

HTML, CSS, JavaScript
Chess.js library for chess logic
Socket.IO for real-time communication
Backend:

Node.js and Express.js for the server
Socket.IO for WebSocket-based real-time updates
Chess.js for move validation
Installation
To run this project locally, follow the steps below:

Clone the repository:

bash
Copy code
git clone https://github.com/iamadarsh0309/Checkmate.git
cd Checkmate
Install the dependencies:

bash
Copy code
npm install
Run the application:

bash
Copy code
npm start
Open your browser: Visit http://localhost:3000 to access the game.

Usage
Two players can join the game as white and black. Any additional connections will join as spectators.
Drag and drop the chess pieces to make a move.
The game board will update in real-time for both players and spectators.
The Chess.js library ensures that only valid moves are allowed.
Future Improvements
Add player authentication and match history tracking.
Implement game saving and loading features.
Add a timer for timed chess games.
Implement AI to play against the computer.
Contributing
Feel free to submit issues or pull requests if you would like to contribute to this project.

License
