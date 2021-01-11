import 'regenerator-runtime/runtime';
import { isoCountries, layer_names } from './constants';

export default class Sights {

	constructor() {
		this.apiKey = "5ae2e3f221c38a28845f05b62bbe071f19521c604a8cf46705e35fc4";
		this.pageLength = 5;

		this.offset = 0;
		this.count = 10;

		this.lon = null;
		this.lat = null;
	}

	createSightsInfo = () => {
		this.createSearcher();
	}

	apiGet(method, query) {
		let otmAPI = `https://api.opentripmap.com/0.1/en/places/${method}?apikey=${this.apiKey}`
		if (query !== undefined) {
			otmAPI += "&" + query;
		}
		return fetch(otmAPI)
			.then(response => response.json())
			.then((data) => data)
			.catch((err) => {
				console.log("Fetch Error :-S", err);
			});
	}

	getCountryName(countryCode) {
		if (isoCountries.hasOwnProperty(countryCode)) {
			return isoCountries[countryCode];
		} else {
			return countryCode;
		}
	}

	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	getCategoryName(kinds) {
		let names = [];
		kinds.split(",").forEach((kind) => {
			let item = layer_names[kind];
			if (item) names.push(this.parsePlural(item.n)?.single);
		});
		return names.join(", ");
	}

	firstLoad() {
		if (this.lat && this.lon) {
			this.apiGet(
				"radius",
				`radius=1000&limit=${this.pageLength}&offset=${this.offset}&lon=${this.lon}&lat=${this.lat}&rate=2&format=count`
			).then((data) => {
				this.count = data.count;
				this.offset = 0;
				document.querySelector(
					"#info"
				).innerHTML += `<p>${this.count} objects with description in a 1km radius</p>`;
				this.loadList();
			});
		}
	}

	parsePlural(label) {
		var sb_single = new Array("");
		var sb_plural = new Array("");
		var spaces = 0;
		for (var i = 0; i < label.length; i++) {
			var ch = label.charAt(i);
			if (ch != "[") {
				sb_single.push(ch);
				sb_plural.push(ch);
				if (ch == " ") {
					spaces++;
				} else {
					spaces = 0;
				}
			} else {
				var sb = new Array("");
				var j = i + 1;
				for (; j < label.length; j++) {
					ch = label.charAt(j);
					if (ch == "]") break;
					sb.push(ch);
				}
				var len = j - i - 1;
				i = sb_plural.length;
				sb_plural.splice(Math.max(0, i - len), len);
				sb_plural.push(sb.join(""));
				if (spaces != 0) {
					i = sb_single.length;
					sb_single.splice(Math.max(0, i - spaces), spaces);
				}
				i = j;
			}
		}
		return {
			single: this.capitalizeFirstLetter(sb_single.join("")),
			plural: sb_plural.join("")
		};
	}

	loadList() {
		if (this.lon && this.lat) {
			this.apiGet(
				"radius",
				`radius=1000&limit=${this.pageLength}&offset=${this.offset}&lon=${this.lon}&lat=${this.lat}&rate=2&format=json`
			).then((data) => {
				let list = document.querySelector("#list");
				list.innerHTML = "";
				data.forEach(item => list.appendChild(this.createListItem(item)));
				let nextBtn = document.querySelector("#next_button");
				if (this.count < this.offset + this.pageLength) {
					nextBtn.style.visibility = "hidden";
				} else {
					nextBtn.style.visibility = "visible";
					nextBtn.innerText = `Next (${this.offset + this.pageLength} of ${this.count})`;
				}
			});
		}
	}

	createListItem(item) {
		let a = document.createElement("a");
		a.className = "list-group-item list-group-item-action";
		a.setAttribute("data-id", item.xid);
		a.innerHTML = `<h5 class="list-group-item-heading">${item.name}</h5>
				<p class="list-group-item-text">${this.getCategoryName(item.kinds)}</p>`;

		a.addEventListener("click", () => {
			document.querySelectorAll("#list a").forEach((item) => {
				item.classList.remove("active");
			});
			a.classList.add("active");
			let xid = a.getAttribute("data-id");
			this.apiGet("xid/" + xid).then((data) => { this.onShowPOI(data) });
		});
		return a;
	}

	onShowPOI(data) {
		// console.log(data)
		let poi = document.querySelector("#poi");
		// console.log(poi)
		poi.innerHTML = "";
		if (data.preview) {
			poi.innerHTML += `<img src="${data.preview.source}">`;
		}
		poi.innerHTML += data.wikipedia_extracts
			? data.wikipedia_extracts.html
			: data.info
				? data.info.descr
				: "No description";

		poi.innerHTML += `<p><a target="_blank" href="${data.otm}">Show more at OpenTripMap</a></p>`;
	}

	createSearcher() {
		const main_content_block = document.querySelector('.main-content-section');

		const form = document.createElement('form');
		form.setAttribute('id', 'search_form');
		form.classList.add('input-group', 'mb-4', 'border', 'p-1');

		const form_div = document.createElement('div');
		form_div.classList.add('input-group-prepend', 'border-0');

		const button = document.createElement('button');
		//button.setAttribute('id', 'button-search');
		button.setAttribute('type', 'button');
		button.classList.add('btn', 'btn-link', 'search');

		const button_search_i = document.createElement('i');
		button_search_i.classList.add('fa', 'fa-search', 'search');

		const info = document.createElement('div');
		info.setAttribute('id', 'info');
		info.classList.add('alert');

		const mainBlockRow = document.createElement('div');
		mainBlockRow.classList.add('row');

		const mainBlockRow_left = document.createElement('div');
		mainBlockRow_left.classList.add('col-12', 'col-lg-5');
		const list = document.createElement('div');
		list.setAttribute('id', 'list');
		list.classList.add('list-group');
		const mainBlockRow_left_nav = document.createElement('nav');
		mainBlockRow_left_nav.classList.add('text-center');

		const mainBlockRow_right = document.createElement('div');
		mainBlockRow_right.classList.add('col-12', 'col-lg-7');
		const poi = document.createElement('div');
		poi.setAttribute('id', 'poi');

		let button_next = document.createElement('button');
		button_next.setAttribute('id', 'next_button');
		button_next.setAttribute('type', 'button');
		button_next.classList.add('btn', 'btn-primary');
		button_next.innerHTML = 'button_next';

		const input = document.createElement('input');
		input.setAttribute('id', 'textbox');
		input.setAttribute('type', 'search');
		input.setAttribute('placeholder', 'Choose city for search sights...');
		input.setAttribute('aria-describedby', 'button-search');
		input.classList.add('form-control', 'bg-none', 'border-0');

		button.appendChild(button_search_i)
		form_div.appendChild(button);
		form.appendChild(form_div);
		form.appendChild(input);

		mainBlockRow_left_nav.appendChild(button_next);

		mainBlockRow_left.appendChild(list);
		mainBlockRow_left.appendChild(mainBlockRow_left_nav);
		mainBlockRow_right.appendChild(poi);

		mainBlockRow.appendChild(mainBlockRow_left);
		mainBlockRow.appendChild(mainBlockRow_right);

		main_content_block.appendChild(form);
		main_content_block.appendChild(info);
		main_content_block.appendChild(mainBlockRow);
	}

	search() {
		let name = document.querySelector("#textbox").value;
		this.apiGet("geoname", "name=" + name).then((data) => {
			let message = "Name not found";
			if (data.status == "OK") {
				message = data.name + "," + this.getCountryName(data.country);
				// console.log(data)
				this.lon = data.lon;
				this.lat = data.lat;
				this.firstLoad();
			}
			document.querySelector("#info").innerHTML = `<p>${message}</p>`;
			document.querySelector('#info').classList.add('alert-primary');

		});
		event.preventDefault();
	}

	showNext() {
		this.offset += this.pageLength;
		this.loadList();
	}
}
