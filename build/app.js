"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = __importStar(require("readline"));
var board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']; // nine initial spaces for the nine cells on the board
var X = true; // true for player X's turn, false for O's turn
var Xwon = 0, Owon = 0;
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function initialize() {
    board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    X = true;
    printBoard();
    readAns();
}
function readAns() {
    var player = 'O';
    if (X)
        player = 'X';
    rl.question("Player " + player + "'s turn. Pick a square.\n (row, col): ", function (ans) {
        console.log(ans + '\n'),
            checkAns(ans);
    });
}
function checkAns(ans) {
    if (!ifValid(ans)) {
        console.log("Invalid input. Pick again\n");
        readAns();
    }
    else {
        //calculate the cell number from input
        var cell = (Number(ans.charAt(0)) - 1) * 3 + Number(ans.charAt(2)) - 1;
        if (ifOccupied(cell)) {
            console.log("The cell is occupied. Pick again\n");
            readAns();
        }
        else { // pick validated
            var player = 'O';
            if (X)
                player = 'X';
            board[cell] = player; //mark the pick on the board
            printBoard();
            //check the status now
            if (ifWin()) {
                console.log(player + ' Wins!\n');
                if (X)
                    Xwon++;
                else
                    Owon++;
                console.log('Player X won: ' + Xwon + ' , Player O won: ' + Owon);
                ifNewGame();
            }
            else if (ifDraw()) {
                console.log('No more cells available and the game is a Draw\n');
                ifNewGame();
            }
            else { // next pick
                X = !X;
                readAns();
            }
        }
    }
}
function ifValid(ans) {
    if (ans.length == 3 && ans.charAt(0) >= '0' && ans.charAt(2) >= '0' && ans.charAt(0) <= '3' && ans.charAt(2) <= '3')
        return true;
    return false;
}
function ifOccupied(cell) {
    if (board[cell] != ' ')
        return true;
    return false;
}
function ifWin() {
    if (X) {
        if (board[4] == 'X') { //middle row & middle col & two diagnols
            if ((board[0] == 'X' && board[8] == 'X') ||
                (board[2] == 'X' && board[6] == 'X') ||
                (board[3] == 'X' && board[5] == 'X') ||
                (board[1] == 'X' && board[7] == 'X'))
                return true;
        }
        else if (board[0] == 'X') { //first row & first col
            if ((board[1] == 'X' && board[2] == 'X') ||
                (board[3] == 'X' && board[6] == 'X'))
                return true;
        }
        else if (board[8] == 'X') { //last row & last col
            if ((board[2] == 'X' && board[5] == 'X') ||
                (board[6] == 'X' && board[7] == 'X'))
                return true;
        }
    }
    else {
        if (board[4] == 'O') { //middle row & middle col & two diagnols
            if ((board[0] == 'O' && board[8] == 'O') ||
                (board[2] == 'O' && board[6] == 'O') ||
                (board[3] == 'O' && board[5] == 'O') ||
                (board[1] == 'O' && board[7] == 'O'))
                return true;
        }
        else if (board[0] == 'O') { //first row & first col
            if ((board[1] == 'O' && board[2] == 'O') ||
                (board[3] == 'O' && board[6] == 'O'))
                return true;
        }
        else if (board[8] == 'O') { //last row & last col
            if ((board[2] == 'O' && board[5] == 'O') ||
                (board[6] == 'O' && board[7] == 'O'))
                return true;
        }
    }
    return false;
}
function ifDraw() {
    for (var _i = 0, board_1 = board; _i < board_1.length; _i++) {
        var cell = board_1[_i];
        if (cell == ' ')
            return false;
    }
    return true;
}
function ifNewGame() {
    rl.question("Play agian?\n (yes or no): ", function (ans) {
        if (ans == 'yes') {
            initialize();
        }
        else if (ans == 'no') {
            console.log('Thanks for playing!');
            rl.close();
        }
        else {
            console.log('Invalid input. Input agian.');
            ifNewGame();
        }
    });
}
function printBoard() {
    console.log('   1   2   3\n' +
        '1  ' + board[0] + ' | ' + board[1] + ' | ' + board[2] + '\n' +
        '  -----------\n' +
        '2  ' + board[3] + ' | ' + board[4] + ' | ' + board[5] + '\n' +
        '  -----------\n' +
        '3  ' + board[6] + ' | ' + board[7] + ' | ' + board[8] + '\n');
}
function main() {
    initialize();
    return;
}
main();
