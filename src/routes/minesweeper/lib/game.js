import { get } from 'svelte/store';
import { bombAmount, width, flags, board, result, isGameOver } from './stores'

export function createBoard() {
	const _bombAmount = get(bombAmount)
	const _width = get(width)
	result.set('😐');
	isGameOver.set(false)
	flags.set(0)

	//get shuffled game array with random bombs
	const bombsArray = Array(_bombAmount).fill('bomb');
	const emptyArray = Array(_width * _width - _bombAmount).fill('valid');
	const gameArray = [...emptyArray, ...bombsArray].sort(() => Math.random() - 0.5);

	board.set(gameArray.map((item, index, originalArray) => {
		let total = 0;
		const isLeftEdge = (index % _width === 0);
		const isRightEdge = (index % _width === _width - 1);

		//set the count of the number of bombs that touch the current square
		if (item === 'valid') {
			//check the square to left
			if (index > 0 && !isLeftEdge && originalArray[index - 1] === 'bomb') total++;
			//check the square up and to the right
			if (index > 9 && !isRightEdge && originalArray[index + 1 - _width] === 'bomb') total++;
			//check the square above the current square
			if (index >= 10 && originalArray[index - _width] === 'bomb') total++;
			//check the square up and to the left
			if (index > 10 && !isLeftEdge && originalArray[index - 1 - _width] === 'bomb') total++;
			//check the square to the right 
			if (index <= 98 && !isRightEdge && originalArray[index + 1] === 'bomb') total++;
			//check the square below and to the left				
			if (index < 90 && !isLeftEdge && originalArray[index - 1 + _width] === 'bomb') total++;
			//check the square below and to the right 
			if (index <= 88 && !isRightEdge && originalArray[index + 1 + _width] === 'bomb') total++;
			//check the square below
			if (index <= 89 && originalArray[index + _width] === 'bomb') total++;
		}
		return {
			id: index,
			value: item,
			count: total,
			checked: false,
			flag: false,
			displayValue: ''
		};
	}));
}
