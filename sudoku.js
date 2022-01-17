//global variable
//accesible to all functions
var sol =
    [[0, 7, 0, 2, 3, 8, 0, 0, 0],
    [0, 0, 0, 7, 4, 0, 8, 0, 9],
    [0, 6, 8, 1, 0, 9, 0, 0, 2],
    [0, 3, 5, 4, 0, 0, 0, 0, 8],
    [6, 0, 7, 8, 0, 2, 5, 0, 1],
    [8, 0, 0, 0, 0, 5, 7, 6, 0],
    [2, 0, 0, 6, 0, 3, 1, 9, 0],
    [7, 0, 9, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 9, 7, 4, 0, 8, 0]];

//this function prints the board
var printBoard = function () {
    for (var row = 0; row < 9; row++) {
        for (var column = 0; column < 9; column++) {
            var string = "r" + (row + 1) + (column + 1);
            document.getElementById(string).innerHTML = sol[row][column];
        }
    }
};

var solve = function() {
    for (var row = 0; row < 9; row++) {
        console.log("row ended")                                 // DELETE THIS AFTER
        for (var column = 0; column < 9; column++) {             // creates row + columns
            if (sol[row][column] == 0) {                         // checking if cell is empty
                for (var check = 1; check < 10; check++) {       // checking numbers 1-9          PROBLEM
                    // sudoku check
                    if (row_check(row, check) && column_check(column, check) && box_check(row, column, check)) {
                        sol[row][column] = check;
                        if (solve() == true) {
                            return true;                         // continue
                        }
                        else {
                            sol[row][column] = 0;                // try next number
                        }
                    }
                }
            return false;                                        // this returns if no number works so we backtrack
            }
        }
    }
    console.log(sol);                                            // DELETE THIS AFTER
    printBoard();                                                // prints the solution
    return true;                                                 // returns true when all cells are filled with correct values
};

// checks the row
function row_check(row, number) {
    var row_array = [];
    for (var index = 0; index < 9; index++) {
        row_array[index] = sol[row][index];
    }
    if (row_array.includes(number)) {
        return false;
    }
    console.log(row_array);
    return true;
};

// checks the column
function column_check(column, number) {
    var column_array = [];
    for (var row = 0; row < 9; row++) {
        column_array.push(sol[row][column]);
    }
    if (column_array.includes(number)) {
        return false;
    }
    return true;
}

// row     # 0-8
// column  # 0-8
// box     # 0:0 1:0 2:0 3:1 4:1 5:1 6:2 7:2 8:2
// box numbers     0:0, 1, 2   1: 3, 4, 5   2: 6, 7, 8
// checks the box
function box_check(row, column, number) {
    const box_row = Math.floor(row / 3);
    const box_column = Math.floor(column / 3);
    var box_array = [];
    var index = 0;
    for (var horizontal = box_row * 3; horizontal < ((box_row * 3) + 3); horizontal++) {
        for (var vertical = box_column * 3; vertical < ((box_column * 3) + 3); vertical++) {
            box_array[index] = sol[horizontal][vertical];
            index++;
        }
    }
    if (box_array.includes(number)) {
        return false;
    }
    return true;
};


printBoard();