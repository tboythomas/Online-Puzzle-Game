

(function(){
	
	"use strict";
	var emptycol = 4; // keep track of the empty square
	var emptyrow = 4; 

	window.onload = function(){
		create();
		var button = document.getElementById("shufflebutton");
		button.onclick = random;
	};

	// create all the tiles in order and display the order inside each tile
	function create(){
		for(var i = 1; i < 5; i ++){
			for(var j = 1; j < 5; j ++){
				if((i * j) != 16){
					var part = document.createElement("div");
					part.className = "parts";
					var count = 4 * j + i - 4;
					part.id = i + "-" + j;
					part.innerHTML = count;
					part.style.left = (i - 1)* 100 + "px";
					part.style.top = (j - 1)* 100 + "px";
					part.style.backgroundPosition = -100 * (i - 1) +"px" + " " + -100 * (j- 1) +"px";
					part.onmouseover = check;
					part.onclick = move;
					part.onmouseout = remove;
					document.getElementById("puzzlearea").appendChild(part);
				}
			}
		}
	}

	// check if the square is movale or not, if it is, it will turn red
	function check(){
		var temp = this.id;
		var temp2 = temp.split("-");
		var row = temp2[0];
		var col = temp2[1];
		if(movable(row,col)){
			this.classList.add("red");
		}
	}

	// helper method to check if the square is movable or not
	function movable(row, col){
		if(row == 0 || row == 5 || col == 0 || col == 5){
			return false;
		}
		if((row == emptyrow && emptycol -1 == col)||(col == emptycol && row == emptyrow -1)||
		(row == emptyrow && emptycol +1 == col)||(col == emptycol && row == emptyrow +1)){
			return true;
		}
	}

	//this function is to make the square appears to be normal
	function remove(){
		this.classList.remove("red");
	}

	//this function is to move the clicked square to empty spot
	function move(){
		if(this.classList.contains("red")){
			move2(this);
		}
	}

	// this function is to move the passed square to the empty spot
	function move2(rect){
		var temp = rect.id;
		var temp2 = temp.split("-");
		var row = parseInt(temp2[0]);
		var col = parseInt(temp2[1]);
		var dx = parseInt(emptyrow - row);
		var dy = parseInt(emptycol - col);
		if(dx == 0){
			var oldY = parseInt(window.getComputedStyle(rect).top);
			rect.style.top = oldY  + 100 * dy + "px";
			emptycol = emptycol - dy;
		}else{
			var oldX = parseInt(window.getComputedStyle(rect).left);
			rect.style.left = oldX  + 100 * dx + "px";
			emptyrow = emptyrow - dx;
		}
		var newrow = row + dx;
		var newcol = col + dy;
		rect.id = newrow + "-" + newcol;
	}

	// this function is to shuffle the whole puzzles
	function random(){
		for(var i = 0 ; i < 1000; i ++){
			var neighbor = [];
			// check if the surrounding squares are movable
			if(movable(emptyrow + 1, emptycol)){
				neighbor.push(document.getElementById(parseInt(emptyrow + 1) + "-" + emptycol));
			}if(movable(emptyrow-1, emptycol)){
				neighbor.push(document.getElementById(parseInt(emptyrow - 1) + "-" + emptycol));
			}if(movable(emptyrow, emptycol + 1)){
				neighbor.push(document.getElementById(emptyrow + "-" + parseInt(emptycol + 1)));
			}if(movable(emptyrow, emptycol - 1)){
				neighbor.push(document.getElementById(emptyrow + "-" + parseInt(emptycol - 1)));
			}
			if(neighbor.length != 0){
				var temp = Math.round(Math.random()* (neighbor.length - 1));
				move2(neighbor[temp]);
			}
		}
	}
})();