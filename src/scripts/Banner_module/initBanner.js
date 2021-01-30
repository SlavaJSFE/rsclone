let canvas, stage, exportRoot;

const init = () => {
	canvas = document.querySelector("#canvas2");
	images = images || {};
	ss = ss || {};
	let loader = new createjs.LoadQueue(false);
	loader.addEventListener("fileload", handleFileLoad);
	loader.addEventListener("complete", handleComplete);
	loader.loadManifest(lib.properties.manifest);

	function handleFileLoad(evt) {
		if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
	}
	function handleComplete(evt) {
		let queue = evt.target;
		let ssMetadata = lib.ssMetadata;
		for (let i = 0; i < ssMetadata.length; i++) {
			ss[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames })
		}
		exportRoot = new lib.bannerRYMS();
		stage = new createjs.Stage(canvas);
		stage.addChild(exportRoot);
		stage.enableMouseOver();
		createjs.Ticker.setFPS(lib.properties.fps);
		createjs.Ticker.addEventListener("tick", stage);
		(function (isResp, respDim, isScale, scaleType) {
			let lastW, lastH, lastS = 1;
			window.addEventListener('resize', resizeCanvas);
			resizeCanvas();
			function resizeCanvas() {
				let w = lib.properties.width, h = lib.properties.height;
				let iw = window.innerWidth, ih = window.innerHeight;
				let pRatio = window.devicePixelRatio, xRatio = iw / w, yRatio = ih / h, sRatio = 1;
				if (isResp) {
					if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
						sRatio = lastS;
					}
					else if (!isScale) {
						if (iw < w || ih < h)
							sRatio = Math.min(xRatio, yRatio);
					}
					else if (scaleType == 1) {
						sRatio = Math.min(xRatio, yRatio);
					}
					else if (scaleType == 2) {
						sRatio = Math.max(xRatio, yRatio);
					}
				}
				canvas.width = w * pRatio * sRatio;
				canvas.height = h * pRatio * sRatio;
				canvas.style.width = w * sRatio + 'px';
				canvas.style.height = h * sRatio + 'px';
				stage.scaleX = pRatio * sRatio;
				stage.scaleY = pRatio * sRatio;
				lastW = iw; lastH = ih; lastS = sRatio;
			}
		})(true, 'both', false, 2);
	}
}

export default init;