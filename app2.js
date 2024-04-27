const cells = document.querySelectorAll('.cell');

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});
playerWin = false;
// I know this is written improperly, but I am not sure how to best write it at this point.
function handleCellClick (cell) {
    console.log(`you attempted to click cell ${cell.id}`);
}
// Player turn can call helper functions 
$(document).ready(function() {
    $(".cell").each(function(index) {
        let cellId = $(this).attr("id");
        $(this).on("click", function() {
            console.log("You have clicked " + this.id);
            if ($(this).text() === '') {
                this.innerHTML = "X";
            } else {
                alert('You must select a legitimate move!')
            }
            checkPlayerWin()
            if (playerWin !== true) {
                updateTurnStatus()
                setTimeout(()=> {
                    computerMove()
                    updateTurnStatus()
                    checkCPUWin()
                }, 500)

            }
        });
    });
});
//A Button is needed to restart the game
$(document).ready(function() {
    $('#new-game').click(function() {
        console.log('Starting a new Game...')
        $(".cell").each(function() {
            $(this).text('');
        })
    })
});
// Banner function
// $(document).ready(function() {
//     // Function to update turn status

const updateTurnStatus = () => {
    if ($('#turn-status').html().trim() === 'Awaiting Player Move...') {
    $('#turn-status').html('The CPU is deciding...')
    } else if ($('#turn-status').html().trim() === 'The CPU is deciding...'||$('#turn-status').html().trim() === 'Welcome, player! Please select a square to begin') {
    $('#turn-status').html('Awaiting Player Move...')
    } else {
    $('#turn-status').html('Something is very wrong. Seek Professional Help')
    }
};

const computerMove = () => {
    // Select all elements with the class "cell"
    const cells = $(".cell");
  
    // Get the cells that are empty (have no text content)
    const emptyCells = cells.filter(function() {
      return $(this).text().trim() === "";
    });
  
    console.log("Available empty cells:", emptyCells.length);
  
    // If no empty cells, return
    if (emptyCells.length === 0) {
      console.log("No empty cells available.");
      return;
    }
  
    // Get a random index within the bounds of the emptyCells array
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    console.log("Random index:", randomIndex);
  
    // Get the randomly selected empty cell
    const randomCell = emptyCells.eq(randomIndex);
    console.log("Random cell ID:", randomCell.attr("id"));
  
    // Replace the text content of the randomly selected empty cell with 'O'
    randomCell.text("O");
    console.log("Cell updated with 'O'");
  };


//This is hella busted right now

// const computerMove = () => {
//     cells.map(function() {
//         return $(this).data();
//     }).get();
//     const randomIndex =Math.floor(Math.random() * cells.length);
//     return cells[randomIndex];
//     console.log(cells[randomIndex]);
// };

const checkPlayerWin = () => {
    // look for wins Horizontally
    if ($('#cell0').text() === 'X' && $('#cell1').text() === 'X' && $('#cell2').text() === 'X' || $('#cell3').text() === 'X' && $('#cell4').text() === 'X' && $('#cell5').text() === 'X' || $('#cell6').text() === 'X' && $('#cell7').text() === 'X' && $('#cell8').text() === 'X') {
        alert('You Win!')
        playerWin = true;
        return;
    }
    //look for wins Vertically
    if ($('#cell0').text() === 'X' && $('#cell3').text() === 'X' && $('#cell6').text() === 'X' || $('#cell1').text() === 'X' && $('#cell4').text() === 'X' && $('#cell7').text() === 'X' || $('#cell2').text() === 'X' && $('#cell5').text() === 'X' && $('#cell8').text() === 'X') {
        alert('You Win!')
        playerWin = true;
        return;
    }
    //look for wins Diagonally
    if ($('#cell0').text() === 'X' && $('#cell4').text() === 'X' && $('#cell8').text() === 'X' || $('#cell2').text() === 'X' && $('#cell4').text() === 'X' && $('#cell6').text() === 'X') {
        alert('You Win!')
        playerWin = true;
        return;
    }
}

const checkCPUWin = () => {
    // look for wins Horizontally
    if ($('#cell0').text() === 'O' && $('#cell1').text() === 'O' && $('#cell2').text() === 'O' || $('#cell3').text() === 'O' && $('#cell4').text() === 'O' && $('#cell5').text() === 'O' || $('#cell6').text() === 'O' && $('#cell7').text() === 'O' && $('#cell8').text() === 'O') {
        alert('The Machines are victorius. Prepare Yourself.')
    }
    //look for wins Vertically
    if ($('#cell0').text() === 'O' && $('#cell3').text() === 'O' && $('#cell6').text() === 'O' || $('#cell1').text() === 'O' && $('#cell4').text() === 'O' && $('#cell7').text() === 'O' || $('#cell2').text() === 'O' && $('#cell5').text() === 'O' && $('#cell8').text() === 'O') {
        alert('The Machines are victorius. Prepare Yourself.')
    }
    //look for wins Diagonally
    if ($('#cell0').text() === 'O' && $('#cell4').text() === 'O' && $('#cell8').text() === 'O' || $('#cell2').text() === 'O' && $('#cell4').text() === 'O' && $('#cell6').text() === 'O') {
        alert('The Machines are victorius. Prepare Yourself.')
    }
}

const isBoardFull = () => {
    let allFilled = true;
    $('.cell').each(function(){
        if ($(this).text() === '') {
            allFilled = false;
            return false;
        }
    });
    if (allFilled) {
        alert('The Game is a Tie!');
    }
}

// I need to communicate that making the first choice means that the game has started or restarted if the board is entirely clear.

// I need to make sure the computer selecting a move causes the proper marker to be selected.