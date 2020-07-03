const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const Sketcher = require('./sketcher');

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use(fileUpload());

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

app.post('/uploads', (req, res) => {
	if (req.files === null) {
		return res.status(400).json({ message: 'No file was uploaded.' });
	}

	const file = req.files.file;

	file.mv(`${__dirname}/inputFiles/${file.name}`, (err) => {
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}

		res.json({ fileName: file.name, filePath: `inputFiles/${file.name}` });
	});
});

app.get('/', (req, res, next) => {
	res.status(200).json({ status: 'ok' });
	next();
});

app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
