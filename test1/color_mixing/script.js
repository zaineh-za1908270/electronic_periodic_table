const elements = document.querySelectorAll('.element');
const dropzone = document.getElementById('dropzone');
const resultText = document.getElementById('result');

elements.forEach(element => {
    element.addEventListener('dragstart', dragStart);
});

dropzone.addEventListener('dragover', dragOver);
dropzone.addEventListener('drop', drop);

function dragStart(e) {
    e.dataTransfer.setData('text', e.target.id);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const draggedElement = document.getElementById(id);

    e.target.appendChild(draggedElement.cloneNode(true));

    // Display the symbol of the dropped element
    resultText.textContent = draggedElement.textContent;
}
