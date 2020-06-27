class Canvas {
	constructor(dimensions) {
		this.rows = Number(dimensions[0]) + 2;
		this.columns = Number(dimensions[1]) + 2;
		this.canvas = new Array(this.columns);
		this.draw();
	}

	draw = () => {
		for (let i = 0; i < this.canvas.length; i++) {
			this.canvas[i] = new Array(this.rows);
			for (let j = 0; j < this.canvas[i].length; j++) {
				if (i === 0 || i === this.columns - 1) {
					this.canvas[i][j] = '-';
				} else if (j === 0 || j === this.rows - 1) {
					this.canvas[i][j] = '|';
				} else {
					this.canvas[i][j] = ' ';
				}
			}
		}
	};

	drawLine = (firstX, firstY, secondX, secondY) => {
		for (let i = firstY; i <= secondY; i++) {
			for (let j = firstX; j <= secondX; j++) {
				this.canvas[i][j] = 'X';
			}
		}
	};

	setLine = (points) => {
		const firstX = points[0];
		const firstY = points[1];
		const secondX = points[2];
		const secondY = points[3];
		this.drawLine(firstX, firstY, secondX, secondY);
	};

	drawSquare = (points) => {
		const firstX = points[0];
		const firstY = points[1];
		const secondX = points[2];
		const secondY = points[3];

		//Top
		this.drawLine(firstX, firstY, secondX, firstY);
		//Bottom
		this.drawLine(firstX, secondY, secondX, secondY);
		//Left
		this.drawLine(firstX, firstY, firstX, secondY);
		//Right
		this.drawLine(secondX, firstY, secondX, secondY);
	};

	drawFill = (coordX, coordY, color) => {
		if (
			coordX > 0 &&
			coordX < this.canvas[0].length - 1 &&
			coordY > 0 &&
			coordY < this.canvas.length - 1
		) {
			if (
				this.canvas[coordY][coordX] != 'X' &&
				this.canvas[coordY][coordX] != color
			) {
				this.canvas[coordY][coordX] = color;

				this.drawFill(coordX - 1, coordY, color);
				this.drawFill(coordX + 1, coordY, color);
				this.drawFill(coordX, coordY + 1, color);
				this.drawFill(coordX, coordY - 1, color);
			}
		}
	};

	setFill = (points) => {
		const coordX = points[0];
		const coordY = points[1];
		const color = points[2];

		this.drawFill(coordX, coordY, color);
	};
}

module.exports = Canvas;
