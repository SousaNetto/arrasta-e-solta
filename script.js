let areas = {
    a: null,
    b: null,
    c: null
};

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
});

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);

// Functions Item
function dragStart(e) {
    e.currentTarget.classList.add('dragging');
}
function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

// Functions Area
function dragOver(e) {
    if(e.currentTarget.querySelector('.item') === null) {
        e.preventDefault();
        e.currentTarget.classList.add('hover');
    }
}
function dragLeave(e) {
    e.currentTarget.classList.remove('hover');
}
function drop(e) {
    e.currentTarget.classList.remove('hover');

    if(e.currentTarget.querySelector('.item') === null) {
        let dragItem = document.querySelector('.item.dragging');
        e.currentTarget.appendChild(dragItem);
        updateAreas();
    }
}

// Functions Neutral Area
function dragOverNeutral(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}
function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover');
}
function dropNeutral(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem);
    updateAreas();
}

// Logic Functions
function updateAreas() {
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        if(area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }
    });

    if((areas.a === '<img src="images/cao.png" alt="cachorro">' ||
        areas.a === '<img src="../images/cao.png" alt="cachorro">')
        && (areas.b === '<img src="images/gato.png" alt="gato">' ||
            areas.b === '<img src="../images/gato.png" alt="gato">')
        && (areas.c === '<img src="images/peixe.png" alt="peixe">' ||
            areas.c === '<img src="../images/peixe.png" alt="peixe">')
        ) {
        document.querySelector('.areas').classList.add('correct');
        document.querySelector('#btn-next').classList.add('visible')
        document.querySelector('#btn-next').classList.remove('invisible')
    } else {
        document.querySelector('.areas').classList.remove('correct');
        document.querySelector('#btn-next').classList.add('invisible')
    }
}