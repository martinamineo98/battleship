
export default function Player (board, opponent = null, type = 'player') {
	
	function randomSquare (min = 0, max = 9) {
		function randomCoordinates () {
			return Math.floor(Math.random() * (max - min + 1)) + min
		}
		
		return [randomCoordinates(), randomCoordinates()]
	}
	
	return {
		board: board,
		opponent: opponent,
		type: type.toLowerCase(),
		name: type.split('').map((el, index) => index === 0 ? el.toUpperCase() : el).join(''),
		
		randomAttack () {
			const [row, col] = randomSquare()
			this.attack(row, col)
		},
		
		attack (row, col) {
			this.opponent.board.receiveAttack(row, col)
		},
		
		addOpponentBoard (opponent) {
			this.opponent = opponent
		}
	}
}
