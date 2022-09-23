
import './battleship.css'
import Dom from './battleship.dom.js'
import Ship from './battleship.ship.js'
import Player from './battleship.player.js'
import Gameboard from './battleship.gameboard.js'

export default function start () {	
	const dom = new Dom('grid-computer')
	
	const computerBoard = new Gameboard('grid-computer')
	const playerBoard = new Gameboard('grid-player')
	
	const computer = new Player(computerBoard, null, 'computer')
	const player = new Player(playerBoard, computer)
	
	computerBoard.addPlayer(computer)
	playerBoard.addPlayer(player)
	
	computer.addOpponentBoard(player)
	console.log(computer.name)
	
	const boards = [computerBoard, playerBoard]

	boards.forEach((board) => {
		board.populate()
		dom.showGameboard(board)
	})
	
	
}

start()
