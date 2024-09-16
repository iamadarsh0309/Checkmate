// const { Chess } = require("chess.js");

const socket = io();
const chess = new Chess();

const boardElement = document.querySelector(".chessboard");
// console.log("Board Element: ", boardElement); 
 

let draggedPiece = null; 
let sourceSquare = null;
let playerRole = null;


const renderBoard = () => {
    console.log("Rendering the board...");
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowindex) => {
        row.forEach((square, squareindex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add("square",
                (rowindex + squareindex) % 2 === 0 ? "light" : "dark"
            );

            squareElement.dataset.row = rowindex;
            squareElement.dataset.column = squareindex;

            if (square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add("piece", square.color === "w" ? "white" : "black");

                pieceElement.innerText = getPieceUnicode(square);
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowindex, col: squareindex };
                        e.dataTransfer.setData("text/plain", "");
                    }
                });
                pieceElement.addEventListener("dragend", (e) => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener("dragover", function (e) {
                e.preventDefault();
            });

            squareElement.addEventListener("drop", function (e) {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSource = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col)
                    };

                    handleMove(sourceSquare, targetSource);
                }
            })

            boardElement.appendChild(squareElement);
        });
    });

    if (playerRole === 'b') {
        boardElement.classList.add("flipped")
    }
    else {
        boardElement.classList.remove("flipped")
    }
};

const handleMove = (source, target) => {
    // Ensure that `source` and `target` have correct row and column values
    if (source && target) {
        const from = `${String.fromCharCode(97 + source.col)}${8 - source.row}`;
        const to = `${String.fromCharCode(97 + target.col)}${8 - target.row}`;
        
        const move = {  
            from: from,
            to: to,
            promotion: 'q'  // Only promote if necessary
        };

        console.log("Attempting move:", move);
        socket.emit("move", move);
    } else {
        console.error("Invalid source or target for move:", source, target);
    }
};


const getPieceUnicode = (piece) => {
    const unicodePieces = {
        p: "♙",
        r: "♖",
        n: "♘",
        b: "♗",
        q: "♕",
        k: "♔",
        P: "♟",
        R: "♜",
        N: "♞",
        B: "♝",
        Q: "♛",
        K: "♚"
    };
    return unicodePieces[piece.type] || "";

}
    
socket.on("playerRole", function (role) {
    playerRole = role; 
    renderBoard();
});

socket.on("spectatorRole", function () {
    playerRole = null; 
    renderBoard();
});

socket.on("boardState", function (fen) {
    if (fen) {
        chess.load(fen); 
        renderBoard();
    } else {
        console.error("Invalid FEN received:", fen);
    }
});



socket.on("move", function (move) {
    console.log("Move received from server:", move);
    const result = chess.move(move);
    if (result) {
        renderBoard();
    } else {
        console.error("Invalid move from server:", move);
    }
});



document.addEventListener("DOMContentLoaded", () => {
        console.log("DOM is fully loaded");  // Debugging output
        renderBoard();  // Call the function to render the board
    });

