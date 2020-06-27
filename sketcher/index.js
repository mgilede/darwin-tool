const Canvas = require('./canvas.js');
const path = require('path');
const fs = require('fs');

const readFile = (fileToRead, callback) => {
	fs.readFile(fileToRead, 'utf8', (err, data) => {
		let arr = [];
		const rows = data.toString().split('\n');
		for (const row of rows) {
			let obj = {};
			obj[row.substr(0, row.indexOf(' '))] = row.substr(row.indexOf(' ') + 1);
			arr.push(obj);
		}
		callback(err, arr);
	});
};

const writeFile = (fileToWrite, data) => {
	fs.writeFile(fileToWrite, data, (err) => {
		if (err) {
			console.error(err);
		}
		console.log(`File printed in: ${fileToWrite}`);
	});
};

const printCanvas = (canvas) => {
	let canvasString = '';
	for (const canvasRow of canvas) {
		canvasString = canvasString.concat(canvasRow.join('') + '\n');
	}
	return canvasString;
};

const sketcher = (req, res, next) => {
	const inputFolder = '../inputFiles';
	const outputFolder = '../outputFiles';
	const inputPath = path.join(__dirname, inputFolder);
	const outputPath = path.join(__dirname, outputFolder);

	fs.readdir(inputPath, (err, files) => {
		if (err) {
			console.error(`Unable to scan directory: ${err}`);
			next();
			return;
		}
		for (const file of files) {
			readFile(path.join(inputPath, file), (err, result) => {
				if (err) {
					console.error(err);
					return;
				}
				let canvas = null;
				let canvasOutput = '';
				for (const row of result) {
					if ('C' in row) {
						canvas = new Canvas(row.C.split(' '));
					}
					if ('L' in row && canvas != null) {
						canvas.setLine(row.L.split(' '));
					}
					if ('R' in row && canvas != null) {
						canvas.drawSquare(row.R.split(' '));
					}
					if ('B' in row && canvas != null) {
						canvas.setFill(row.B.split(' '));
					}
					if (canvas != null) {
						canvasOutput = canvasOutput.concat(printCanvas(canvas.canvas));
					}
				}
				writeFile(path.join(outputPath, file), canvasOutput);
			});
		}
	});
	next();
};

module.exports = {
	sketcher,
};
