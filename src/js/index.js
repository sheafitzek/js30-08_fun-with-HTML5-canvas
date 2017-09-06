const app = {
	rangeSlider() {
		const slider = [...document.querySelectorAll(`.range-slider`)];
		const range = [...document.querySelectorAll(`.range-slider-range`)];
		const value = [...document.querySelectorAll(`.range-slider-value`)];

		slider.forEach((sliderElem)=> {
			value.forEach((valElem)=> {
				const prevVal = valElem.previousElementSibling.value;

				valElem.innerHTML = prevVal;
			});

			range.forEach((rangeElem, index, array)=> {
				addEventListener(`input`, ()=> {
					const nextVal = rangeElem.nextElementSibling;

					nextVal.innerHTML = rangeElem.value;
				// this.nextElementSibling.value.innerHTML(this.value);
				});
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
