
import Ship from './battleship.ship.js'
import Player from './battleship.player.js'
import Gameboard from './battleship.gameboard.js'

describe('Ship', () => {

	test('Return Ship Status', () => {
		const ship = new Ship(5)
		const status = () => ship.status
		expect(status()).toStrictEqual([0, 0, 0, 0, 0])
	})

	test('Hit Ship at 2nd position', () => {
		const board = new Gameboard()
		const ship = new Ship(5)
		const status = () => ship.status
		board.placeShip(ship, false, [0, 0])
		ship.hit([0, 1])
		expect(status()).toStrictEqual([0, 1, 0, 0, 0])
	})

	test('The ship is sunk', () => {
		const ship = new Ship(5)
		const status = () => ship.isSunk()
		ship.status = ship.status.map((pos) => pos = 1)
		expect(status()).toBe(true)
	})
	
})

describe('Player', () => {

	// const computerBoard = new Gameboard()
	// const playerBoard = new Gameboard()
	
	// const computer = new Player(computerBoard, null, 'computer')
	// const player = new Player(playerBoard, computer)
	
	// computer.board.populate()
	// player.board.populate()
	
	// computer.addOpponentBoard(player)	
	// computer.randomAttack()
	// console.log('Player: ', player.board)
	
	// player.attack(0, 0)
	// console.log('Computer: ', computer.board)

})

describe('Gameboard', () => {

	test ('Grid is an Array/Object', () => {
		const board = new Gameboard()
		const isMatrix = () => typeof board === 'object'
		expect(isMatrix()).toBe(true)
	})
	
	test('Populate Grid Randomly', () => {
		const board = new Gameboard()
		board.populate()
	})

})
