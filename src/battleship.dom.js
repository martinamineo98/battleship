
export default function Dom (unactiveClass) {	
	
	return {
		unactiveClass: unactiveClass,
		showGameboard (gameboard) {
			const wrapper = document.createElement('div')
			wrapper.classList.add('grid', gameboard._class)
			document.body.appendChild(wrapper)
			
			if (gameboard._class === this.unactiveClass) {
				wrapper.classList.toggle('unactive')
			}
			
			gameboard.grid.forEach((row, rowIndex) => {
				row.forEach((_, colIndex) => {
					const square = document.createElement('div')
					square.classList.add('square')
					square.setAttribute('data-row', rowIndex)
					square.setAttribute('data-col', colIndex)
					wrapper.appendChild(square)
				})
			})
			
			this.addEvent(gameboard)
		},
		
		changeActiveBoard (_class) {
			const activeBoard = document.querySelector('.' + _class)
			const unactiveBoard = document.querySelector('.' + this.unactiveClass)
			
			unactiveBoard.classList.toggle('unactive')
			activeBoard.classList.toggle('unactive')
			
			this.unactiveClass = _class
		},
		
		addEvent (gameboard) {
			const squares = document.querySelectorAll(`.${gameboard._class} .square`)
	
			squares.forEach((square) => {
				square.addEventListener('click', () => {
					const classes = ['unactive', 'attacked']
					const [row, col] = [square.getAttribute('data-row'), square.getAttribute('data-col')]
					if (gameboard.grid[row][col] === null) classes.push('missed')
					this.changeActiveBoard(gameboard._class)
					for (let _class of classes) {
						square.classList.add(_class)
					}
				}, {once: true})
			})
			
		}
	}
}
