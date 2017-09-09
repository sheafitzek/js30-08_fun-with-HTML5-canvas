const app = {
	// rangeSlider() {
	// 	const ranges = [...document.querySelectorAll(`.form-range`)];
	// 	const sliders = [...document.querySelectorAll(`.form-range__slider`)];
	// 	const values = [...document.querySelectorAll(`.form-range__slider-value`)];

	// 	ranges.forEach(()=> {
	// 		values.forEach((value)=> {
	// 			const prevVal = value.previousElementSibling.value;

	// 			value.innerHTML = prevVal;
	// 		});

	// 		sliders.forEach((slider)=> {
	// 			addEventListener(`input`, ()=> {
	// 				const nextVal = slider.nextElementSibling;

	// 				nextVal.innerHTML = slider.value;
	// 			});
	// 		});
	// 	});
	// },

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
		
	},

	getLineWidth() {
		
	},

	getStrokeStyle() {
		
	},

	getLineJoin() {
		
	},

	getMiterLimit() {
		
	},

	getLineCap() {
		
	},

	getGlobalCompositeOperation() {
		
	},

	// setPosition(e, canvas, rect) {
	// 	mouseX = ~~((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width);
	// 	mouseY = ~~((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height);

	// 	// const touchX = ~~((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width);
	// 	// const touchY = ~~((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height);
	// },

	setCanvas() {
		const canvas = document.querySelector(`.draw`);
		const rect = canvas.getBoundingClientRect();
		let mouseX;
		let mouseY;
		let touchX;
		let touchY;

		canvas.setAttribute(`width`, `${rect.width}`);
		canvas.setAttribute(`height`, `${rect.height}`);

		const ctx = canvas.getContext(`2d`);

		ctx.lineWidth = 1;
		ctx.strokeStyle = `#000000`;
		// ctx.lineJoin = `miter`;
		ctx.lineJoin = `round`;
		ctx.miterLimit = 10;
		// ctx.lineCap = `butt`;
		ctx.lineCap = `round`;
		ctx.globalCompositeOperation = `source-over`;

		let isDrawing = false;
		let lastX = 0;
		let lastY = 0;

		function draw(e) {
			if (!isDrawing) return;
			console.log(e);

			ctx.beginPath();
			ctx.moveTo(lastX, lastY);
			ctx.lineTo(e.offsetX, e.offsetY);
			ctx.stroke();

			mouseX = Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width);
			mouseY = Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height);

			touchX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
			touchY = e.touches[0].pageY - e.touches[0].target.offsetTop;

			// [lastX, lastY] = [e.offsetX, e.offsetY];
			lastX = e.touches
				? touchX
				: mouseX;
			lastY = e.touches
				? touchY
				: mouseY;

			console.log(touchX, touchY);
		}

		[`mousedown`, `touchstart`].forEach((e)=> {
			canvas.addEventListener(e, ()=> {
				isDrawing = true;
				console.log(e);

				mouseX = Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width);
				mouseY = Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height);

				touchX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
				touchY = e.touches[0].pageY - e.touches[0].target.offsetTop;

				// [lastX, lastY] = [e.offsetX, e.offsetY];
				lastX = e.touches
					? touchX
					: mouseX;
				lastY = e.touches
					? touchY
					: mouseY;
			});
		});

		[`mousemove`, `touchmove`].forEach((e)=> {
			canvas.addEventListener(e, draw);
		});

		[`mouseup`, `mouseout`, `touchend`, `touchcancel`].forEach((e)=> {
			canvas.addEventListener(e, ()=> isDrawing = false);
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

// context (2d, webgl)
// ctx.lineWidth (px)
// ctx.strokeStyle (color, gradient, pattern)
// ctx.lineJoin (bevel, round, miter)
// ctx.miterLimit (px)
// ctx.lineCap (butt, round, square)
// ctx.globalCompositeOperation (source-over, source-atop, source-in, source-out, destination-over, destination-atop, destination-in, destination-out, lighter, copy, xor)
