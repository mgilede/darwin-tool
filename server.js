const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.get('/', (req, res, next) => {
	res.json({ status: 'ok' });
	next();
});

app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
