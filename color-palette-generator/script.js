const generatePaletteBtn = document.querySelector("#generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generatePaletteBtn.addEventListener("click", updatePaletteDisplay);

paletteContainer.addEventListener("click", (e) => {
	if (e.target.classList.contains("copy-btn")) {
		const hexValue = e.target.previousElementSibling.textContent;

		navigator.clipboard
			.writeText(hexValue)
			.then(() => showCopySuccess(e.target))
			.catch((err) => console.log(err));
	} else if (e.target.classList.contains("color")) {
		const hexValue =
			e.target.nextElementSibling.querySelector(".hex-value").textContent;

		navigator.clipboard
			.writeText(hexValue)
			.then(() =>
				showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")),
			)
			.catch((err) => console.log(err));
	}
});

function showCopySuccess(element) {
	element.classList.remove("far", "fa-copy");
	element.classList.add("fas", "fa-check");

	element.style.color = "#48bb78";

	setTimeout(() => {
		element.classList.remove("fas", "fa-check");
		element.classList.add("far", "fa-copy");
		element.style.color = "";
	}, 1500);
}

function generatePalette() {
	const palette = [];
	for (let i = 0; i < 5; i++) {
		palette.push(randomColor());
	}
	return palette;
}

function randomColor() {
	const hex = "0123456789ABCDEF";
	let color = "#";

	for (let i = 0; i < 6; i++) {
		color += hex[Math.floor(Math.random() * 16)];
	}

	return color;
}

function updatePaletteDisplay() {
	const colorBoxes = document.querySelectorAll(".color-box");
	const palette = generatePalette();

	colorBoxes.forEach((box, index) => {
		const colorBox = box.querySelector(".color");
		const hexValue = box.querySelector(".hex-value");

		colorBox.style.backgroundColor = palette[index];
		hexValue.textContent = palette[index];
	});
}

updatePaletteDisplay();
