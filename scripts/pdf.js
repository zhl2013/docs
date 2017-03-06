'use strict';

var fs = require('fs');
var child_process = require('child_process');
var async = require('async');

/* This plugin generates PDF for datasheets for using a separate layout.
 */
module.exports = function(options) {
	function noop(files, metalsmith, done) {
		done();
	}

	var tool = 'wkhtmltopdf';

	var checkTool = child_process.spawnSync(tool);
	if (checkTool.error) {
		console.log('Skipping PDF generation since ' + tool + ' is not installed');
		return noop;
	}

	var key = options.key;

	return function(files, metalsmith, done) {
		function shouldProcess(filePath, done) {
			done(!!files[filePath][key]);
		}

		function process(filePath, complete) {
			var content = files[filePath];
			fs.writeFileSync('/home/monkbroc/Programming/docs/photon-datasheet.tmp', content.contents)
			complete();
		}

		async.filter(Object.keys(files), shouldProcess, function (results) {
			async.each(results, process, done);
		});
	};
};
