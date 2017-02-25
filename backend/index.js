const path        = require('path');
const webpack     = require('webpack');
const express     = require('express');
const compression = require('compression');
const config      = require('./../webpack.config');

const app      = express();
const compiler = webpack(config);

const PORT  = process.env.PORT || 3000;
const DEBUG = process.env.NODE_ENV !== 'production';

if (DEBUG) {
	app.use(require('webpack-dev-middleware')(compiler, {
		publicPath: config.output.publicPath
	}));

	app.use(require('webpack-hot-middleware')(compiler));
} else {
	app.use('/public', express.static(path.join(__dirname, '..', config.output.publicPath)));
}

app.use(compression({ level: 3 }));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, function (err) {
	if (err) return console.error(err);

	console.log(`Listening at http://localhost:${PORT}/`);
});