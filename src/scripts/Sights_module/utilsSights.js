import 'regenerator-runtime/runtime';

function getLang(link) {
	if (link !== undefined) {
		let start = link.indexOf('://');
		let finish = link.indexOf('.');
		return link.substring(start + 3, finish);
	}
	return 'without description';
}

export { getLang };