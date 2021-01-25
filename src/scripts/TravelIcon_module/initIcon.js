let canvas, stage, exportRoot;

function handleComplete() {

    exportRoot = new lib1.logoRYMS();
    stage = new createjs.Stage(canvas);
    stage.addChild(exportRoot);
    createjs.Ticker.setFPS(lib1.properties.fps);
    createjs.Ticker.addEventListener("tick", stage);
    (function (isResp, respDim, isScale, scaleType) {
        let lastW, lastH, lastS = 1;
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        function resizeCanvas() {
            let w = lib1.properties.width, h = lib1.properties.height;
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
    })(true, 'both', false, 1);
}

const init = () => {
    canvas = document.querySelector("#canvas");
    handleComplete();
}

export default init;