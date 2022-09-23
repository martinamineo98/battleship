
export default function Ship (length) {
	
	return {
		length: length,
		status: [...Array(length).keys()].map(() => 0),
		coordinates: [],
		gameboard: null,
		
		hit (square) {			
			this.status[this.coordinates.findIndex((element) => {
				return JSON.stringify(element) === JSON.stringify(square)
			})] = 1
		},
		
		isSunk () {
			return this.status.every((pos) => pos === 1)
		}
	}
	
}
