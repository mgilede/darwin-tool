const express = require('express');
const dotenv = require('dotenv');
const Sketcher = require('./sketcher');

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.get('/sketcher', async (req, res, next) => {
	Sketcher.sketcher((err, result) => {
		if (err) {
			res.status(400).json(400, { message: err });
			return;
		}
		res.status(200).json({ status: result });
		return;
	});
});

app.get('/', (req, res, next) => {
	res.status(200).json({ status: 'ok' });
	next();
});

app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
