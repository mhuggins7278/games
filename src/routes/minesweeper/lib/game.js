import { get } from "svelte/store"
import { bombAmount, width, flags, board, result, isGameOver } from "./stores"

export function createBoard() {
  const _bombAmount = get(bombAmount)
  const _width = get(width)
  result.set("😐")
  isGameOver.set(false)
  flags.set(0)

  //get shuffled game array with random bombs
  const bombsArray = Array(_bombAmount).fill("bomb")
  const emptyArray = Array(_width * _width - _bombAmount).fill("valid")
  const gameArray = [...emptyArray, ...bombsArray].sort(() => Math.random() - 0.5)

  board.set(
    gameArray.map((item, index, originalArray) => {
      let total = 0
      const {isLeftEdge, isRightEdge, isTopRow, isBottomRow } = getSquarePosition(index)

      //set the count of the number of bombs that touch the current square
      if (item === "valid") {
        //check the square to left
        if (!isLeftEdge && originalArray[index - 1] === "bomb") total++
        //check the square up and to the right
        if (!isTopRow && !isRightEdge && originalArray[index + 1 - _width] === "bomb") total++
        //check the square above
        if (!isTopRow && originalArray[index - _width] === "bomb") total++
        //check the square up and to the left
        if (!isTopRow && !isLeftEdge && originalArray[index - 1 - _width] === "bomb") total++
        //check the square to the right
        if (!isRightEdge && originalArray[index + 1] === "bomb") total++
        //check the square below and to the left
        if (!isBottomRow && !isLeftEdge && originalArray[index - 1 + _width] === "bomb") total++
        //check the square below and to the right
        if (!isBottomRow && !isRightEdge && originalArray[index + 1 + _width] === "bomb") total++
        //check the square below
        if (!isBottomRow && originalArray[index + _width] === "bomb") total++
      }
      return {
        id: index,
        value: item,
        count: total,
        checked: false,
        flag: false,
        displayValue: ""
      }
    })
  )
}

export function getSquarePosition(id) {
  const _width = get(width)
  //check if the square is in the first column
  const isLeftEdge = id % _width === 0
  //check if the square is in the last column
  const isRightEdge = id % _width === _width - 1
  //check if the square is in the top row.
  //our id's are based on the array index.
  const isTopRow = id < _width
  //check if the square is in the bottom row
  //for a 10x10 grid the first squares in the last row will be 90-99
  //our 10x10-10 === 90
  const isBottomRow = id >= _width * _width - _width

  return {isLeftEdge, isRightEdge, isTopRow, isBottomRow}
}
