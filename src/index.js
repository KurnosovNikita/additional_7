module.exports = function solveSudoku(matrix) {
    var sudoku = new Array;
    for(var i=0;i<=8;i++)
        {
            for(var j=0;j<=8;j++){
                sudoku.push(matrix[i][j]);
            }
        }
    var saved = new Array();
	var savedSudoku = new Array();
	var i=0;
	var next;
	var perhapsNumbers;
	var tries;
	while (!isSudokuTrue(sudoku)) {
		i++;
		next = findZero(sudoku);
		if (next == false) {
			next = saved.pop();
			sudoku = savedSudoku.pop();
		}
		perhapsNumbers = randomNumber(next);
		tries = posibleNumber(next,perhapsNumbers);
		if (next[perhapsNumbers].length>1) {
			next[perhapsNumbers] = clearTries(next[perhapsNumbers],tries);
			saved.push(next.slice());
			savedSudoku.push(sudoku.slice());
		}
		sudoku[perhapsNumbers] = tries;
	}
    var k=0;
   
    while(k<=80){
        for(var i=0;i<=8;i++)
        {
            for(var j=0;j<=8;j++){
                matrix[i][j]=sudoku[k];
                k++;
            }
        }
    }
       return matrix;
  // your solution
}
function getRow(cell) {
	return Math.floor(cell / 9);
}

function getCol(cell) {
	return cell % 9;
}

function returnBlock(cell) {
	return Math.floor(getRow(cell) / 3) * 3 + Math.floor(getCol(cell) / 3);
}

function isRowTrue(number,row,sudoku) {
	for (var i=0; i<=8; i++) {
		if (sudoku[row*9+i] == number) {
			return false;
		}
	}
	return true;
}

function isColTrue(number,col,sudoku) {
	for (var i=0; i<=8; i++) {
		if (sudoku[col+9*i] == number) {
			return false;
		}
	}
	return true;
}

function isBlockTrue(number,block,sudoku) {
	for (var i=0; i<=8; i++) {
		if (sudoku[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)] == number) {
			return false;
		}
	}
	return true;
}

function isNumberTrue(cell,number,sudoku) {
	var row = getRow(cell);
	var col = getCol(cell);
	var block = returnBlock(cell);
	return isRowTrue(number,row,sudoku) && isColTrue(number,col,sudoku) && isBlockTrue(number,block,sudoku);
}

function checkRow(row,sudoku) {
	var trueOrder = new Array(1,2,3,4,5,6,7,8,9);
	var rowTemp= new Array();
	for (var i=0; i<=8; i++) {
		rowTemp[i] = sudoku[row*9+i];
	}
	rowTemp.sort();
	return rowTemp.join() == trueOrder.join();
}

function checkCol(col,sudoku) {
	var trueOrder = new Array(1,2,3,4,5,6,7,8,9);
	var colTemp= new Array();
	for (var i=0; i<=8; i++) {
		colTemp[i] = sudoku[col+i*9];
	}
	colTemp.sort();
	return colTemp.join() == trueOrder.join();
}

function checkBlock(block,sudoku) {
	var trueOrder = new Array(1,2,3,4,5,6,7,8,9);
	var blockTemp= new Array();
	for (var i=0; i<=8; i++) {
		blockTemp[i] = sudoku[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)];
	}
	blockTemp.sort();
	return blockTemp.join() == trueOrder.join();
}

function isSudokuTrue(sudoku) {
	for (var i=0; i<=8; i++) {
		if (!checkBlock(i,sudoku) || !checkRow(i,sudoku) || !checkCol(i,sudoku)) {
			return false;
		}
	}
	return true;
}

function posibleNumbers(cell,sudoku) {
	var possible = new Array();
	for (var i=1; i<=9; i++) {
		if (isNumberTrue(cell,i,sudoku)) {
			possible.unshift(i);
		}
	}
	return possible;
}

function posibleNumber(possible,cell) {
	var randomPicked = Math.floor(Math.random() * possible[cell].length);
	return possible[cell][randomPicked];
}

function findZero(sudoku) {
	var possible = new Array();
	for (var i=0; i<=80; i++) {
		if (sudoku[i] == 0) {
			possible[i] = new Array();
			possible[i] = posibleNumbers(i,sudoku);
			if (possible[i].length==0) {
				return false;
			}
		}
	}
	return possible;
}

function clearTries(massOfTries,number) {
	var newArray = new Array();
	for (var i=0; i<massOfTries.length; i++) {
		if (massOfTries[i] != number) {
			newArray.unshift(massOfTries[i]);
		}
	}
	return newArray;
}

function randomNumber(possible) {
	var max = 9;
	var minChoices = 0;
	for (var i=0; i<=80; i++) {
		if (possible[i]!=undefined) {
			if ((possible[i].length<=max) && (possible[i].length>0)) {
				max = possible[i].length;
				minChoices = i;
			}
		}
	}
	return minChoices;
}

