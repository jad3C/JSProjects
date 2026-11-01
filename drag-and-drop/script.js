const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");

for (const card of cards) {
	card.addEventListener("dragstart", dragStart);
	card.addEventListener("dragend", dragEnd);
}

for (const list of lists) {
	list.addEventListener("dragover", dragOver);
	list.addEventListener("dragenter", dragEnter);
	list.addEventListener("dragleave", dragLeave);
	list.addEventListener("drop", dragDrop);
}

function dragStart(e) {
	e.dataTransfer.setData("text/plain", this.id);
	console.log(e.dataTransfer.getData("text/plain"));
}

function dragEnd() {
	console.log("drag ended");
}

function dragOver(e) {
	e.preventDefault();
	console.log("Drop available");
}

function dragEnter(e) {
	e.preventDefault();
	this.classList.add("over");
}

function dragLeave(e) {
	this.classList.remove("over");
	console.log("Drag in process (drop was available)");
}

function dragDrop(e) {
	const id = e.dataTransfer.getData("text/plain");
	const card = document.getElementById(id);

	this.classList.remove("over");
	this.appendChild(card);
}
