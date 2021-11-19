let field = document.createElement('div')
document.body.appendChild(field)
field.classList.add("field")
let x = 1,
    y = 20

for (let i = 0; i < 400; i++) {
    let excel = document.createElement('div')
    field.appendChild(excel);
    excel.classList.add('excel');
    excel.setAttribute("posX", x);
    excel.setAttribute("posY", y);
    x++;
    if (x > 20) {
        x = 1;
        y--
    }
}

function generateSnake() {

    let posX = Math.round(Math.random() * (20 - 3) + 3);
    let posY = Math.round(Math.random() * (20 - 1) + 1);
    return [posX, posY]
}
let positionSnake = generateSnake();
let snakeBody = [
    document.querySelector(`[posX = "${positionSnake[0]}"][posY = "${positionSnake[1]}"]`),
    document.querySelector(`[posX = "${positionSnake[0]-1}"][posY = "${positionSnake[1]}"]`),
    document.querySelector(`[posX = "${positionSnake[0]-2}"][posY = "${positionSnake[1]}"]`)

]
for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody')
}
snakeBody[0].classList.add('head')


let food;

function spawnFood() {
    function generateFood() {

        let posX = Math.round(Math.random() * (20 - 1) + 1);
        let posY = Math.round(Math.random() * (20 - 1) + 1);
        return [posX, posY]
    }
    do {
        let positionFood = generateFood();
        food = document.querySelector(`[posX = "${positionFood[0]}"][posY = "${positionFood[1]}"]`)
    } while (food.classList.contains('snakeBody'))
    food.classList.add('food');
}
spawnFood()
let direction = 'right';

function move() {
    let cordinatesSnake = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('head');
    snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
    snakeBody.pop();
    if (direction == 'right') {
        if (cordinatesSnake[0] == 20) {
            cordinatesSnake[0] = 0;
        }
        snakeBody.unshift(document.querySelector(`[posX = "${+cordinatesSnake[0]+1}"][posY = "${+cordinatesSnake[1]}"]`));
    }
    else if (direction == 'left') {
        if (cordinatesSnake[0] == 1) {
            cordinatesSnake[0] = 21;
        }
        snakeBody.unshift(document.querySelector(`[posX = "${+cordinatesSnake[0]-1}"][posY = "${+cordinatesSnake[1]}"]`));
    }
    else if (direction == 'up') {
        if (cordinatesSnake[1] == 20) {
            cordinatesSnake[1] = 0;
        }
        snakeBody.unshift(document.querySelector(`[posX = "${+cordinatesSnake[0]}"][posY = "${+cordinatesSnake[1]+1}"]`));
    }
    else if (direction == 'down') {
        if (cordinatesSnake[1] == 1) {
            cordinatesSnake[1] = 21;
        }
        snakeBody.unshift(document.querySelector(`[posX = "${+cordinatesSnake[0]}"][posY = "${+cordinatesSnake[1]-1}"]`));
    }
    if(snakeBody[0].getAttribute('posX')==food.getAttribute('posX') && snakeBody[0].getAttribute('posY')==food.getAttribute('posY') ){
        food.classList.remove('food')
        spawnFood();
        let x = snakeBody[snakeBody.length-1].getAttribute('posX');
        let y = snakeBody[snakeBody.length-1].getAttribute('posY');
        snakeBody.push(document.querySelector(`[posX = "${+x}"][posY = "${+y}"]`));

    }
    if (snakeBody[0].classList.contains('snakeBody')){
        clearInterval(moveSnakeInterval) 
        snakeBody[0].style.background='url(./peak/dead.png)'
        snakeBody[0].style.backgroundSize='cover'
    }
    snakeBody[0].classList.add('head');
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody')
    }
}
let moveSnakeInterval = setInterval(move, 120)
window.addEventListener('keydown', (event)=>{
    let key = event.code;
    if(key=='ArrowRight' && direction != 'left') {
       direction = 'right'
    }
    else if(key=='ArrowLeft' && direction != 'right') {
        direction = 'left'
     }
     else if(key=='ArrowUp' && direction != 'down') {
        direction = 'up'
     }
     else if(key=='ArrowDown' && direction != 'up') {
        direction = 'down'
     }
})
