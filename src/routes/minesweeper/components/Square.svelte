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

import {getSquarePosition} from '../lib/game'

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
      ...$board.map((square) => {
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
    const { isLeftEdge, isRightEdge, isTopRow, isBottomRow } = getSquarePosition(id)

    setTimeout(() => {
      //check the square to the left
      if (!isLeftEdge) {
        const nextSquare = $board[id - 1];
        handleClick(nextSquare);
      }
      // check the square to the right
      if (!isRightEdge) {
        const nextSquare = $board[id + 1];
        handleClick(nextSquare);
      }
      //check the square below
      if (!isBottomRow) {
        const nextSquare = $board[id + $width];
        handleClick(nextSquare);
      }
      //check the square above the current square
      if (!isTopRow) {
        const nextSquare = $board[id - $width];
        handleClick(nextSquare);
      }
      //check the square up and to the right
      if (!isTopRow && !isRightEdge) {
        const nextSquare = $board[id + 1 - $width];
        handleClick(nextSquare);
      }
      //check the square up and to the left
      if (!isTopRow && !isLeftEdge) {
        const nextSquare = $board[id - 1 - $width];
        handleClick(nextSquare);
      }
      //check the square below and to the left
      if (!isBottomRow && !isLeftEdge) {
        const nextSquare = $board[id - 1 + $width];
        handleClick(nextSquare);
      }
      //check the square below and to the right
      if (!isBottomRow&& !isRightEdge) {
        const nextSquare = $board[id + 1 + $width];
        handleClick(nextSquare);
      }
    }, 10);
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
    on:click={(event) => handleClick(square, event)}
    on:contextmenu|preventDefault={toggleFlag(square)}
    class="
		font-black
  border-gray-500
  border 
  rounded 
	{square.value === 'bomb' && square.checked ? 'bg-red-500' : ''}
	{square.value === 'bomb' && $isGameOver ? 'bg-gray-50' : ''}
	{square.checked ? 'bg-gray-100' : 'bg-gray-300 shadow-xl-2'} 
	h-6
  w-6	
  md:w-10
  md:h-10
	xl:w-14 
	xl:h-14
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
