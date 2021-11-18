<script>
  export let square;
  import {
    flags,
    flagsLeft,
    bombAmount,
    width,
    isGameOver,
    board,
    result
  } from '../lib/stores';

  function handleClick(square, event) {
    //if the game is over or the square was already clicked return
    if ($isGameOver || square.checked || square.flag) return;
    //if the function was called from checkNeighbouringSquares and the value is a bomb return
    if (!event && square.value === 'bomb') return;
    const localBoard = [...$board];

    if (square.value === 'valid') {
      localBoard[square.id].displayValue = square.count > 0 ? square.count : '';
      localBoard[square.id].checked = true;
      $board = [...localBoard];
      //only recurse if the square has no adjecent bombs
      if (square.count === 0) checkNeighbouringSquares(square);
    } else {
      bombClicked(square.id);
    }
  }

  function bombClicked(id) {
    $result = '🤯';
    $isGameOver = true;

    //show ALL the bombs
    $board = [
      ...$board.map(square => {
        if (square.value === 'bomb') {
          square.displayValue = '💣';
          square.checked = square.id === id ? true : false;
        }
        return square;
      })
    ];
  }

  function checkNeighbouringSquares(square) {
    const { id } = square;
    const isLeftEdge = id % $width === 0;
    const isRightEdge = id % $width === $width - 1;

    setTimeout(() => {
      if (id > 0 && !isLeftEdge) {
        const nextSquare = $board[id - 1];
        handleClick(nextSquare);
      }
      if (id > 9 && !isRightEdge) {
        const nextSquare = $board[id + 1 - $width];
        handleClick(nextSquare);
      }
      if (id > 10) {
        const nextSquare = $board[id - $width];
        handleClick(nextSquare);
      }
      if (id > 11 && !isLeftEdge) {
        const nextSquare = $board[id - 1 - $width];
        handleClick(nextSquare);
      }
      if (id < 98 && !isRightEdge) {
        const nextSquare = $board[id + 1];
        handleClick(nextSquare);
      }
      if (id < 90 && !isLeftEdge) {
        const nextSquare = $board[id - 1 + $width];
        handleClick(nextSquare);
      }
      if (id < 88 && !isRightEdge) {
        const nextSquare = $board[id + 1 + $width];
        handleClick(nextSquare);
      }
      if (id < 89) {
        const nextSquare = $board[id + $width];
        handleClick(nextSquare);
      }
    }, 20);
  }

  //toggle Flag with right click
  function toggleFlag(square) {
    let localFlagCount = $flags;
    if ($isGameOver) return;
    if (!square.checked && $flags < $bombAmount) {
      const localBoard = $board;
      localBoard[square.id].flag = !square.flag;
      localBoard[square.id].displayValue = square.flag ? '🚩' : '';
      square.flag ? localFlagCount++ : localFlagCount--;
      $flags = localFlagCount;
      $board = [...localBoard];
      if (square.flag) checkForWin();
    }
  }

  //check for win
  function checkForWin() {
    if ($flagsLeft > 0) return;
    ///simplified win argument
    const matches = $board.reduce((acc, square) => {
      if (square.flag && square.value === 'bomb') acc++;
      return acc;
    }, 0);

    if (matches === $bombAmount) {
      $result = '😅';
      $isGameOver = true;
    }
  }
</script>

{#if square}
  <span
    on:click={event => handleClick(square, event)}
    on:contextmenu|preventDefault={toggleFlag(square)}
    class="
		font-black
  border-gray-500
  border 
  rounded 
	{square.value === 'bomb' && square.checked ? 'bg-red-500' : ''}
	{square.value === 'bomb' && $isGameOver ? 'bg-gray-50' : ''}
	{square.checked ? 'bg-gray-100' : 'bg-gray-300 shadow-xl-2'} 
	lg:w-14 
	lg:h-14
	h-8
  w-8	
	flex 
	justify-center
	items-center
	{square.count === 1 && square.value === 'valid' ? 'text-blue-500' : ''}
	{square.count === 2 && square.value === 'valid' ? 'text-green-500' : ''}
	{square.count === 3 && square.value === 'valid' ? 'text-yellow-500' : ''}
	{square.count >= 4 && square.value === 'valid' ? 'text-red-500' : ''}
	">{square.displayValue}</span
  >
{/if}
