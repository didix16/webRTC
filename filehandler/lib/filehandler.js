var fs = require('fs'),
	url = require('url'),
	path = require('path'),
	engines = require('../cfg/engines');

// handle http request
exports.onHandle = function(ctx) {
	var pathname = url.parse(ctx.request.url).pathname;
	if (pathname) {
		var ext = path.extname(pathname);
		var engine = engines[ext] ? engines[ext] : engines['*'];
		if (engine) {
			require(engine).onHandle(ctx);
		}else{
			module.onError(500, 'Not support extension :' + ext);
		}
	}else{
		module.onError(500, 'Invalid Request');
	}
};

// handle error request
module.onError = function(ctx, code, msg) {
	// Failed to handle the request.
	ctx.response.writeHead(code, msg);
	ctx.response.end();
};
