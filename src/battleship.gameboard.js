
import Ship from './battleship.ship.js'

export default function Gameboard (_class = null) {	
	
	function randomDirection () {
		return Boolean(Math.round(Math.random()))
	}
	
	function randomCoordinates (length, min = 0, max = 9) {		
		
		function generateCoordinates () {
			return Math.floor(Math.random() * (max - min + 1)) + min
		}
		
		let _static = generateCoordinates()
		let start = generateCoordinates()
		
		while (start + length > 9) {
			start = generateCoordinates()
		}
		
		return [_static, start, start + length]
	}
	
	function getSquares (direction, _static, start, end) {
		const arr = []
		
		for (let i = start; i < end; i++) {
			const row = (direction) ? i : _static
			const col = (direction) ? _static : i
			arr.push([row, col])
		}
		
		return arr
	}
	
	function generateMatrix () {		
		return [...Array(10).keys()].map(() => [...Array(10).keys()].map(() => null))
	}
		
	return {
		_class: _class,
		grid: generateMatrix(),
		hits: generateMatrix(),
		ships: [],
		player: null,
		opponent: null,
		
		// A ship can be placed vertically (top to bottom) or horizontally (
		// left to right). If the ship is vertical, then the row increases
		// but the column doesn't change, the opposite is true for an a ship
		// placed horizontally.
		
		// If direction === true -> Vertical
		// else -> Horizontal
		
		// If direction === true -> startCol === endCol
		// else -> startRow === endRow
		
		// If endRow > 9 || endCol > 9 -> ERROR

		// coordinates = [static element, start, end]
		// static element = (direction) ? col : row
		
		// If a square is not empty -> ERROR

		placeShip (ship, direction, coordinates) {
			const [_static, start] = coordinates
			const end = start + ship.length
			
			if (end > 9) throw new Error('Out of bounds.')
			
			const squares = getSquares(direction, _static, start, end)
			const squaresStatus = squares.map((square) => {
				const [row, col] = square
				return this.grid[row][col]
			}).every((square) => square === null)
			
			if (squaresStatus) {
				this.ships.push(ship)
				squares.forEach((square) => {
					const [row, col] = square
					this.grid[row][col] = ship
					ship.coordinates.push([row, col])
					ship.gameboard = this
				})
			} else {
				throw new Error('At least one square is not empty.')
			}
		},
		
		randomlyPlaceShip (ship) {
			const direction = randomDirection()
			const [_static, start, end] = randomCoordinates(ship.length)
			const squares = getSquares(direction, _static, start, end)
			const squaresStatus = squares.map((square) => {
				const [row, col] = square
				return this.grid[row][col]
			}).every((square) => square === null)
			
			if (squaresStatus) {
				this.ships.push(ship)
				squares.forEach((square) => {
					const [row, col] = square
					this.grid[row][col] = ship
					ship.coordinates.push([row, col])
					ship.gameboard = this
				})
			} else {
				this.randomlyPlaceShip(ship)
			}
		},
		
		populate () {
			const shipLengths = [5, 4, 3, 3, 2]
			shipLengths.forEach((length) => {
				this.randomlyPlaceShip(new Ship(length))
			})
		},
		
		receiveAttack (row, col) {
			this.hits[row][col] = (this.grid[row][col] === null) ? 0 : 1
		},
		
		checkShipsSunkStatus () {
			const status = []
			this.ships.forEach((ship) => {
				status.push(ship.isSunk())
			})
			
			return status.every((ship) => ship === true)
		},
		
		addPlayer (player) {
			this.player = player
			this.opponent = player.opponent
		}
	}
}

