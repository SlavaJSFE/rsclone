import 'regenerator-runtime/runtime';

function getLang(link) {
	let start = link.indexOf('://');
	let finish = link.indexOf('.');
	return link.substring(start + 3, finish);
}

export { getLang };