// Includes
const Canvas = require('./canvas.js');
const Line = require('./line.js');
const Rectangle = require('./rectangle.js');
const Bucket = require('./bucket.js');
const path = require('path');
const fs = require('fs');

const sketcher = () => {
	const inputFolder = '../inputFiles';
	console.log(path.join(__dirname, inputFolder));
};

module.exports = {
	sketcher,
};
