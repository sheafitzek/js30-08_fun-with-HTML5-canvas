const app = {
	rangeSlider() {
		const ranges = [...document.querySelectorAll(`.form-range`)];

		ranges.forEach((range)=> {
			const rangeValue = range.querySelector(`.form-range span`);
			const rangeSlider = range.querySelector(`[type="range"]`);

			rangeValue.innerHTML = rangeSlider.value;

			rangeSlider.addEventListener(`input`, ()=> {
				rangeValue.innerHTML = rangeSlider.value;
			});
		});
	},

	getBgColor() {
		const canvas = document.querySelector(`.draw`);
		const bgColor = document.querySelector(`input[name="bg-color"]`);

		app.canvasProps.bgColor = bgColor.value;
		canvas.style.background = app.canvasProps.bgColor;
	},

	getLineWidth() {
		const lineWidth = document.querySelector(`input[name="line-width"]`);

		app.canvasProps.lineWidth = lineWidth.value;
		app.setCanvasProps(app.ctx);
	},

	getStrokeStyle() {
		const strokeStyle = document.querySelector(`input[name="stroke-style"]`);

		app.canvasProps.strokeStyle = strokeStyle.value;
		app.setCanvasProps(app.ctx);
	},

	getLineJoin() {
		const lineJoin = document.querySelector(`select[name="line-join"]`);

		app.canvasProps.lineJoin = lineJoin.value;
		app.setCanvasProps(app.ctx);
	},

	getMiterLimit() {
		const miterLimit = document.querySelector(`input[name="miter-limit"]`);

		app.canvasProps.miterLimit = miterLimit.value;
		app.setCanvasProps(app.ctx);
	},

	getLineCap() {
		const lineCap = document.querySelector(`select[name="line-cap"]`);

		app.canvasProps.lineCap = lineCap.value;
		app.setCanvasProps(app.ctx);
	},

	getComposite() {
		const composite = document.querySelector(`select[name="global-composite-operation"]`);

		app.canvasProps.composite = composite.value;
		app.setCanvasProps(app.ctx);
	},

	canvasProps: {
		context: `2d`,
		bgColor: `#ffffff`,
		lineWidth: 1,
		strokeStyle: `#000000`,
		lineJoin: `miter`,
		miterLimit: 10,
		lineCap: `butt`,
		composite: `source-over`,
	},

	canvasCoordinates: {
		isDrawing: false,
		mouseX: 0,
		mouseY: 0,
		touchX: 0,
		touchY: 0,
		lastX: 0,
		lastY: 0,
	},

	setCanvasProps(ctx) {
		ctx.lineWidth = app.canvasProps.lineWidth;
		ctx.strokeStyle = app.canvasProps.strokeStyle;
		ctx.lineJoin = app.canvasProps.lineJoin;
		ctx.miterLimit = app.canvasProps.miterLimit;
		ctx.lineCap = app.canvasProps.lineCap;
		ctx.composite = app.canvasProps.composite;
	},

	setCoordinates(e, rect, canvas) {
		app.canvasCoordinates.mouseX = Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width);
		app.canvasCoordinates.mouseY = Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height);

		if (e.touches) {
			app.canvasCoordinates.touchX = Math.round(e.targetTouches[0].pageX - e.targetTouches[0].target.offsetLeft);
			app.canvasCoordinates.touchY = Math.round(e.targetTouches[0].pageY - e.targetTouches[0].target.offsetTop);
		}

		app.canvasCoordinates.lastX = e.touches
			? app.canvasCoordinates.touchX
			: app.canvasCoordinates.mouseX;
		app.canvasCoordinates.lastY = e.touches
			? app.canvasCoordinates.touchY
			: app.canvasCoordinates.mouseY;
	},

	ctx: document.querySelector(`.draw`).getContext(`2d`),

	setCanvas() {
		const canvas = document.querySelector(`.draw`);
		const canvasSize = canvas.getBoundingClientRect();

		canvas.setAttribute(`width`, `${canvasSize.width}`);
		canvas.setAttribute(`height`, `${canvasSize.height}`);

		app.setCanvasProps(app.ctx);

		function draw(e) {
			if (!app.canvasCoordinates.isDrawing) return;
			const lineToX = e.offsetX || e.targetTouches[0].pageX - canvasSize.left;
			const lineToY = e.offsetY || e.targetTouches[0].pageY - canvasSize.top;

			app.ctx.beginPath();
			app.ctx.moveTo(app.canvasCoordinates.lastX, app.canvasCoordinates.lastY);
			app.ctx.lineTo(lineToX, lineToY);
			app.ctx.stroke();

			app.setCoordinates(e, canvasSize, canvas);
		}

		[`mousedown`, `touchstart`].forEach((e)=> {
			canvas.addEventListener(e, ()=> {
				app.canvasCoordinates.isDrawing = true;

				app.setCoordinates(e, canvasSize, canvas);
			}, {passive: true});
		});

		[`mousemove`, `touchmove`].forEach((e)=> {
			canvas.addEventListener(e, draw, {passive: true});
		});

		[`mouseup`, `mouseout`, `touchend`, `touchcancel`].forEach((e)=> {
			canvas.addEventListener(e, ()=> app.canvasCoordinates.isDrawing = false);
		});
	},

	onloadFunction() {
		app.rangeSlider();
		app.setCanvas();
	},
};

window.onload = app.onloadFunction;
