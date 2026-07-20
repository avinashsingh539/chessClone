const board = document.getElementById("board");
const moveHistory = document.getElementById("moveHistory");

const whiteCapturedDiv = document.getElementById("whiteCaptured");
const blackCapturedDiv = document.getElementById("blackCaptured");

const whiteTimer = document.getElementById("whiteTimer");
const blackTimer = document.getElementById("blackTimer");

const startGameBtn = document.getElementById("startGame");
const restartBtn = document.getElementById("restart");
const resignBtn = document.getElementById("resign");

// Modal will be initialized once DOM content is ready (modal element is in HTML)
let gameModal = null;
document.addEventListener('DOMContentLoaded', function(){
    const modalEl = document.getElementById("gameOverModal");
    if(modalEl){
        gameModal = new bootstrap.Modal(modalEl);
        const playBtn = document.getElementById("playAgain");
        if(playBtn){
            playBtn.onclick = function(){
                gameModal.hide();
                setTimeout(function(){
                    newGame();
                },300);
            }
        }
    }
});

function showGameOver(winner, reason){

    gameEnded = true;

    clearInterval(timer);

    gameStarted = false;

    document.getElementById("winnerText").innerHTML = winner;

    document.getElementById("reasonText").innerHTML = reason;

    gameModal.show();

}

const game = new Chess();

const files = ["a","b","c","d","e","f","g","h"];

let selectedSquare = null;
let legalMoves = [];
let lastMove = null;

let whiteCaptured = [];
let blackCaptured = [];

let whiteTime = 600;
let blackTime = 600;

let timer;

let gameStarted = false;

let gameEnded = false;

createBoard();

startGameBtn.onclick = startGame;
restartBtn.onclick = newGame;
resignBtn.onclick = resignGame;

function createBoard(){

    board.innerHTML="";

    const position = game.board();

    for(let row=0; row<8; row++){

        for(let col=0; col<8; col++){

            const square=document.createElement("div");

            square.classList.add("square");

            if((row+col)%2==0){

                square.classList.add("light");

            }

            else{

                square.classList.add("dark");

            }

            square.dataset.row=row;
            square.dataset.col=col;

            const squareName = files[col] + (8-row);

            if(lastMove){

                if(squareName==lastMove.from || squareName==lastMove.to){

                    square.classList.add("lastMove");

                }

            }

            if(selectedSquare){

                if(selectedSquare.row==row && selectedSquare.col==col){

                    square.classList.add("selected");

                }

            }

            const settings = JSON.parse(localStorage.getItem("settings"));

            const showHighlight = settings ? settings.highlight : true;

            if(showHighlight){

                for(let move of legalMoves){

                    if(move.to==squareName){

                        square.classList.add("legal");

                    }

                }

            }

            const piece = position[row][col];

            if(piece){

                const img=document.createElement("img");

                img.src=`pieces/${piece.color}${piece.type}.png`;

                img.classList.add("piece");

                square.appendChild(img);

            }

            square.onclick=squareClicked;

            board.appendChild(square);

        }

    }

    updateCapturedPieces();

}

function updateCapturedPieces(){

    whiteCapturedDiv.innerHTML="";

    blackCapturedDiv.innerHTML="";

    whiteCaptured.forEach(piece=>{

        const img=document.createElement("img");

        img.src=`pieces/b${piece}.png`;

        img.className="capturedPiece";

        whiteCapturedDiv.appendChild(img);

    });

    blackCaptured.forEach(piece=>{

        const img=document.createElement("img");

        img.src=`pieces/w${piece}.png`;

        img.className="capturedPiece";

        blackCapturedDiv.appendChild(img);

    });

}

function squareClicked(){

    if(!gameStarted){
        return;
    }

    const row = parseInt(this.dataset.row);
    const col = parseInt(this.dataset.col);

    const clickedSquare = files[col] + (8-row);

    const clickedPiece = game.board()[row][col];

    // First Click
    if(selectedSquare == null){

        if(!clickedPiece) return;

        if(clickedPiece.color != game.turn()) return;

        selectedSquare = {
            row,
            col
        };

        legalMoves = game.moves({
            square: clickedSquare,
            verbose: true
        });

        createBoard();
        return;
    }

    // Change Selected Piece
    if(clickedPiece && clickedPiece.color == game.turn()){

        selectedSquare = {
            row,
            col
        };

        legalMoves = game.moves({
            square: clickedSquare,
            verbose: true
        });

        createBoard();
        return;
    }

    const from = files[selectedSquare.col] + (8-selectedSquare.row);

    const move = game.move({

        from: from,
        to: clickedSquare,
        promotion: "q"

    });

    console.log("Player Move:", move);
    console.log("Turn =", game.turn());
    console.log("History =", game.history());
    console.log("Moves =", game.moves());

    selectedSquare = null;
    legalMoves = [];

    if(move){

        lastMove = {
            from: move.from,
            to: move.to
        };

        if(move.captured){

            if(move.color=="w"){

                whiteCaptured.push(move.captured);

            }

            else{

                blackCaptured.push(move.captured);

            }

        }

        updateHistory();

        if(game.in_check()){

        console.log("Check!");

    }

        if(game.in_checkmate()){

            createBoard();

            setTimeout(()=>{


                if(game.turn() == "b"){

                    addWin();

                    showGameOver("🎉 You Win!","Checkmate");

                }

                else{

                    addLoss();

                    showGameOver("💻 Computer Wins","Checkmate");

                }

            },100);

        }

        if(game.in_draw()){

            createBoard();

            setTimeout(()=>{


                addDraw();

                showGameOver("🤝 Draw","Game Drawn");

            },100);

        }

    }

    createBoard();

    console.log("Reached AI Call");

    setTimeout(computerMove,500);

}

function updateHistory(){

    const history = game.history();

    moveHistory.innerHTML="";

    history.forEach(function(move,index){

        const p=document.createElement("p");

        const playerIcon = index % 2 === 0 ? "♙" : "♟";

        p.innerHTML = `${index+1}. ${playerIcon} ${move}`;

        moveHistory.appendChild(p);

    });

}

function newGame(){

    gameEnded = false;

    gameStarted = false;

    clearInterval(timer);

    game.reset();

    selectedSquare=null;

    legalMoves=[];

    lastMove=null;

    whiteCaptured=[];

    blackCaptured=[];

    whiteTime=600;

    blackTime=600;

    updateTimer();

    moveHistory.innerHTML="<p>Game Started...</p>";

    createBoard();

    startGameBtn.innerHTML = "Start Game";
    startGameBtn.onclick = startGame;

}

function startGame(){

    gameStarted = true;

    startTimer();

    startGameBtn.innerHTML = "New Game";

    startGameBtn.onclick = newGame;

}

function resignGame(){

    let winner;

    if(game.turn()=="w"){

        winner="Black";

    }

    else{

        winner="White";

    }

    if(game.turn()=="w"){

        addLoss();

    }

    else{

        addWin();

    }

    showGameOver(winner + " Wins","Opponent Resigned");

}

function startTimer(){

    clearInterval(timer);

    timer=setInterval(function(){

        if(game.turn()=="w"){

            whiteTime--;

        }

        else{

            blackTime--;

        }

        updateTimer();

        if(whiteTime<=0){

            clearInterval(timer);

            addLoss();

            showGameOver(" Computer Wins","Time Out");

        }

        if(blackTime<=0){

            clearInterval(timer);

            addWin();

            showGameOver(" You Win!","Time Out");

        }

    },1000);

}

function updateTimer(){

    whiteTimer.innerHTML=formatTime(whiteTime);

    blackTimer.innerHTML=formatTime(blackTime);

}

function formatTime(seconds){

    let min=Math.floor(seconds/60);

    let sec=seconds%60;

    if(sec<10){

        sec="0"+sec;

    }

    return min+":"+sec;

}

function computerMove(){

    if(game.game_over()) return;

    const moves = game.moves({ verbose: true });

    if(moves.length==0) return;

    const randomMove = moves[Math.floor(Math.random()*moves.length)];

    const move = game.move(randomMove);

    if(move.captured){

        blackCaptured.push(move.captured);

    }

    lastMove = {

        from: move.from,

        to: move.to

    };

    updateHistory();

    if(game.in_check()){

        console.log("Check!");

    }

    if(game.in_checkmate()){

        createBoard();

        setTimeout(function(){

            addLoss();

            showGameOver("S Computer Wins","Checkmate");

        },100);

        return;

    }

    if(game.in_draw()){

        createBoard();

        setTimeout(function(){

            addDraw();

            showGameOver(" Draw","Game Drawn");

        },100);

        return;

    }

    createBoard();

}