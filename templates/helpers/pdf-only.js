module.exports = function (options) {
	return '<div class="print-media">' + options.fn(this) + '</div>';
};

