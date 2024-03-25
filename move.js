const creativeMode = true;
const person = document.getElementById('marker');
const grid_size = [5, 4];
const maze = document.getElementById('maze');

const x_step = maze.clientWidth / grid_size[0];
const y_step = maze.clientHeight / grid_size[1];

init();
document.getElementById('blocklyReset').addEventListener('click', function () {
    init();
});

const correct_moves = ['moveRight(1);', 'moveRight(1);', 'moveDown(1);', 'moveDown(1);', 'moveDown(1);', 'moveRight(1);', 'moveRight(1);'];

function move(code) {
    console.log(code);
    init();
    code.split('\n').forEach((line, index) => {
        if (line == correct_moves[index] || creativeMode) {
            setTimeout(() => eval(line), 1000 * (index + 1));
        }
    });
}

function init() {
    person.style.left = (x_step / 2) - (person.clientWidth / 2) + 'px';
    person.style.top = (y_step / 2) - (person.clientHeight / 2) + 'px';
}

function moveRight(steps) {
    console.log('moveRight');
    person.style.left = (parseInt(person.style.left) + x_step * steps) + 'px';
}

function moveLeft(steps) {
    console.log('moveLeft');
    person.style.left = (parseInt(person.style.left) - x_step * steps) + 'px';
}

function moveUp(steps) {
    console.log('moveUp');
    person.style.top = (parseInt(person.style.top) - y_step * steps) + 'px';
}

function moveDown(steps) {
    console.log('moveDown');
    person.style.top = (parseInt(person.style.top) + y_step * steps) + 'px';
}