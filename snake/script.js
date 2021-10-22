let field = document.createElement('div')
document.body.appendChild(field)
field.classList.add("field")
let x=1,  y = 10 

for (let i = 0; i<100;i++){
    let excel = document.createElement('div')
    field.appendChild(excel);
    excel.classList.add('excel');
    excel.setAttribute("posX",x);
    excel.setAttribute("posY",y);
    x++;
    if (x>10){
        x=1 ;
        y--
    }
}
function generateSnake(){
    
    let posX = Math.round(Math.random()*(10-3)+3);
    let posY = Math.round(Math.random()*(10-1)+1);
    return [posX,posY]
}
let positionSnake = generateSnake();
let snakeBody= [
    document.querySelector(`[posX = "${positionSnake[0]}"][posY = "${positionSnake[1]}"]`),
    document.querySelector(`[posX = "${positionSnake[0]-1}"][posY = "${positionSnake[1]}"]`),
    document.querySelector(`[posX = "${positionSnake[0]-2}"][posY = "${positionSnake[1]}"]`)

]
for(let i=0; i<snakeBody.length;i++){
    snakeBody[i].classList.add('snakeBody')
}
snakeBody[0].classList.add('head')


let food;
function spawnFood(){
    function generateFood(){
        
        let posX = Math.round(Math.random()*(10-1)+1);
        let posY = Math.round(Math.random()*(10-1)+1);
        return [posX,posY]
    }
    do {
        let positionFood = generateSnake();
        food = document.querySelector(`[posX = "${positionFood[0]}"][posY = "${positionFood[1]}"]`)
    } while(food.classList.contains('snakeBody'))
    food.classList.add('food');
}
spawnFood()
function move (){
    let cordinatesSnake = [snakeBody[0].getAttribute('posX'),snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('head');
    snakeBody[snakeBody.length-1].classList.remove('snakeBody');
    snakeBody.pop();
    if(cordinatesSnake[0]==10){
        cordinatesSnake[0]=0;
    }
    snakeBody.unshift(document.querySelector(`[posX = "${+cordinatesSnake[0]+1}"][posY = "${cordinatesSnake[1]}"]`));
    snakeBody[0].classList.add('head');
    for(let i=0; i<snakeBody.length;i++){
        snakeBody[i].classList.add('snakeBody')
    }
}
let moveSnakeInterval = setInterval(move,300)









