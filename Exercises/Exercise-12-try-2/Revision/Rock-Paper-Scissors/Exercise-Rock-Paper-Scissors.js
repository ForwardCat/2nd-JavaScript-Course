  // code for picking role
  document.querySelector('.js-rock').addEventListener('click', () => {
    playGame('rock');
  });
  document.querySelector('.js-paper').addEventListener('click', () => {
    playGame('paper');
  });
  document.querySelector('.js-scissors').addEventListener('click', () => {
    playGame('scissors');
  });

  // autoPlay button  
  const autoPlayButton = document.querySelector('.js-auto-play-button');
  
  autoPlayButton.addEventListener('click', () => {
    autoPlay();
  });
  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
      autoPlay();
    }
  })
  
  // reset button
  function resetScore() {
    const confirmationDisplay = document.querySelector('.js-confirmation-message')
    confirmationDisplay.innerHTML = `Are you sure you want to reset the score? 
    <button class="js-yes-button">Yes</button>
    <button class="js-no-button">No</button>`

    const yesButton = document.querySelector('.js-yes-button');
    const noButton = document.querySelector('.js-no-button');

    yesButton.addEventListener('click', () => {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');

      updateScoreElement();  
      confirmationDisplay.innerHTML = '';
    });
    noButton.addEventListener('click', () => {
      confirmationDisplay.innerHTML = '';
    })
  };

  document.querySelector('.js-reset-score-button').addEventListener('click', () => {
    resetScore();
  });
  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
      resetScore();
    }
  });

  // got the item 'score' from localStorage 
    // 'score' is stored as a string, so convert it back with JSON.parse
    let score = JSON.parse(localStorage.getItem('score')) || {
      wins: 0,
      losses: 0,
      ties: 0
    };

    updateScoreElement();

  /*
  if (!score) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    }
  }
  */

    let isAutoPlaying = false;
    let intervalID;


  function autoPlay() {
    if(!isAutoPlaying) {
      intervalID = setInterval(function() {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000); 
      isAutoPlaying = true;
      autoPlayButton.innerHTML = 'Stop Playing';
    } else {
      clearInterval(intervalID);
      isAutoPlaying = false;
      autoPlayButton.innerHTML = 'Auto Play';
    }
  }

  function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
        result = 'You lose.'
      } else if (computerMove === 'paper') {
        result = 'You win.';
      } else if (computerMove === 'scissors') {
        result = 'Tie.';
      } 

    } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'You win.'
      } else if (computerMove === 'paper') {
        result = 'Tie.';
      } else if (computerMove === 'scissors') {
        result = 'You lose.';
      } 
      
    } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
        result = 'Tie.'
      } else if (computerMove === 'paper') {
        result = 'You lose.';
      } else if (computerMove === 'scissors') {
        result = 'You win.';
      } 
    }

    if (result === 'You win.') {
      score.wins += 1;
    } else if (result === 'You lose.') {
      score.losses += 1;
    } else if (result === 'Tie.') {
      score.ties += 1;
    }

    // everytime we run the results function, the score is updated, and saved to the localStorage
    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result')
      .innerHTML = result;

    document.querySelector('.js-moves')
      .innerHTML = `You
  <img src="./Rock Paper Scissors Images/${playerMove}-emoji.png" class="move-icon">
  <img src="./Rock Paper Scissors Images/${computerMove}-emoji.png" class="move-icon">
  Computer`
  }

  function updateScoreElement() {
    document.querySelector('.js-score')
      .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
  }

  // function to pick a computer move

  function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
      computerMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
      computerMove = 'scissors';
    }

    return computerMove;
  }