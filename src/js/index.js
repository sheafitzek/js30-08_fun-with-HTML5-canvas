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

	setCanvas() {
		const canvas = document.querySelector(`.canvas`);
		const ctx = canvas.getContext(`2d`);

		// canvas.width = window.innerWidth;
		// canvas.height = window.innerHeight;
		
	},

	submitForm() {
		
	},

	onloadFunction() {
		app.rangeSlider();
	}
};

window.onload = app.onloadFunction;

// context (2d, webgl)
// ctx.lineWidth (px)
// ctx.strokeStyle (color, gradient, pattern)
// ctx.lineJoin (bevel, round, miter)
// ctx.miterLimit (px)
// ctx.lineCap (butt, round, square)
// ctx.globalCompositeOperation (source-over, source-atop, source-in, source-out, destination-over, destination-atop, destination-in, destination-out, lighter, copy, xor)
