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

	getCanvasContext() {
		// const forms = [...document.forms];
		const context = document.querySelector(`select[name="context"]`);

		app.canvasProps.context = context.value;
	},

	getBgColor() {
		const bgColor = document.querySelector(`input[name="bg-color"]`);

		app.canvasProps.bgColor = bgColor.value;
	},

	getLineWidth() {
		const lineWidth = document.querySelector(`input[name="line-width"]`);

		app.canvasProps.lineWidth = lineWidth.value;
		// app.setCanvas();
	},

	getStrokeStyle() {
		const strokeStyleGradient = document.querySelector(`input[name="stroke-style__gradient"]`);
		const strokeStyleColor1 = document.querySelector(`input[name="stroke-style__color-1"]`);
		const strokeStyleColor2 = document.querySelector(`input[name="stroke-style__color-2"]`);

		strokeStyleGradient.checked
			? strokeStyleColor2.disabled = false
			: strokeStyleColor2.disabled = true;

		app.canvasProps.strokeStyle = !strokeStyleGradient.checked
			? strokeStyleColor1.value
			: `${strokeStyleColor1.value}, ${strokeStyleColor2.value}`;
	},

	getLineJoin() {
		const lineJoin = document.querySelector(`select[name="line-join"]`);

		app.canvasProps.lineJoin = lineJoin.value;
	},

	getMiterLimit() {
		const miterLimit = document.querySelector(`input[name="miter-limit"]`);

		app.canvasProps.miterLimit = miterLimit.value;
	},

	getLineCap() {
		const lineCap = document.querySelector(`select[name="line-cap"]`);

		app.canvasProps.lineCap = lineCap.value;
	},

	getComposite() {
		const getComposite = document.querySelector(`select[name="global-composite-operation"]`);

		app.canvasProps.getComposite = getComposite.value;
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
		ctx.globalCompositeOperation = app.canvasProps.composite;
	},

	setCoordinates(e, rect, canvas) {
		app.canvasCoordinates.mouseX = Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width);
		app.canvasCoordinates.mouseY = Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height);

		if (e.touches) {
			app.canvasCoordinates.touchX = Math.round(e.touches[0].pageX - e.touches[0].target.offsetLeft);
			app.canvasCoordinates.touchY = Math.round(e.touches[0].pageY - e.touches[0].target.offsetTop);
		}

		app.canvasCoordinates.lastX = e.touches
			? app.canvasCoordinates.touchX
			: app.canvasCoordinates.mouseX;
		app.canvasCoordinates.lastY = e.touches
			? app.canvasCoordinates.touchY
			: app.canvasCoordinates.mouseY;
	},

	setCanvas() {
		const canvas = document.querySelector(`.draw`);
		const rect = canvas.getBoundingClientRect();

		canvas.setAttribute(`width`, `${rect.width}`);
		canvas.setAttribute(`height`, `${rect.height}`);

		const ctx = canvas.getContext(`${app.canvasProps.context}`);

		app.setCanvasProps(ctx);

		// ctx.lineWidth = app.canvasProps.lineWidth;
		// ctx.strokeStyle = app.canvasProps.strokeStyle;
		// ctx.lineJoin = app.canvasProps.lineJoin;
		// ctx.miterLimit = app.canvasProps.miterLimit;
		// ctx.lineCap = app.canvasProps.lineCap;
		// ctx.globalCompositeOperation = app.canvasProps.composite;

		function draw(e) {
			if (!app.canvasCoordinates.isDrawing) return;
			const lineToX = e.offsetX || e.targetTouches[0].pageX - rect.left;
			const lineToY = e.offsetY || e.targetTouches[0].pageY - rect.top;

			ctx.beginPath();
			ctx.moveTo(app.canvasCoordinates.lastX, app.canvasCoordinates.lastY);
			ctx.lineTo(lineToX, lineToY);
			ctx.stroke();

			app.setCoordinates(e, rect, canvas);
		}

		[`mousedown`, `touchstart`].forEach((e)=> {
			canvas.addEventListener(e, ()=> {
				app.canvasCoordinates.isDrawing = true;

				app.setCoordinates(e, rect, canvas);
			}, {passive: true});
		});

		[`mousemove`, `touchmove`].forEach((e)=> {
			canvas.addEventListener(e, draw, {passive: true});
		});

		[`mouseup`, `mouseout`, `touchend`, `touchcancel`].forEach((e)=> {
			canvas.addEventListener(e, ()=> app.canvasCoordinates.isDrawing = false);
		});
	},

	submitForm() {
		
	},

	onloadFunction() {
		app.rangeSlider();
		app.setCanvas();
	},
};

window.onload = app.onloadFunction;
