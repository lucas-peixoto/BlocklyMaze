class Maze {

    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.player = document.getElementById("marker");
        this.obstacle = null;
        this.goal = null;

        this.maze = [
            [2, 0, 0, 0, 1],
            [0, 1, 0, 0, 0],
            [1, 0, 0, 1, 1],
            [0, 0, 0, 0, 0],
            [1, 0, 1, 1, 3]
        ];

        this.playerPosition = this.findStartPlayerPosition();
        this.goalPosition = this.findGoalPosition();

        this.squareWidth = this.canvas.width / this.maze[0].length;
        this.squareHeight = this.canvas.height / this.maze.length;
        this.itemPadding = 25;
        this.itemWidth = this.squareWidth - (this.itemPadding * 2);
        this.itemHeight = this.squareHeight - (this.itemPadding * 2);
        this.player.style.width = this.itemWidth + "px";
        this.player.style.height = this.itemHeight + "px";

        this.drawGrid();
        this.draw();
        console.log(this.playerPosition);
        console.log(this.goalPosition);
    }

    draw() {
        this.obstacle = new Image();
        this.obstacle.src = "img/rock.svg";
        this.obstacle.onload = () => {
            this.drawObstacles();
        };

        this.goal = new Image();
        this.goal.src = "img/goal.svg";
        this.goal.onload = () => {
            this.ctx.drawImage(this.goal, (this.goalPosition.x * this.squareWidth) + this.itemPadding, (this.goalPosition.y * this.squareHeight) + this.itemPadding, this.itemWidth, this.itemHeight);
        };

        this.resetPlayer();

        // this.player = new Image();
        // this.player.src = "img/player.png";
        // this.player.onload = () => {
        //     this.ctx.drawImage(this.player, 0 + this.itemPadding, 0 + this.itemPadding, this.itemWidth, this.itemHeight);
        // };
    }

    drawObstacles() {
        for (let i = 0; i < this.maze.length; i++) {
            for (let j = 0; j < this.maze[i].length; j++) {
                if (this.maze[i][j] === 1) {
                    this.ctx.drawImage(this.obstacle, (j * this.squareWidth) + this.itemPadding, (i * this.squareHeight) + this.itemPadding, this.itemWidth, this.itemHeight);
                }
            }
        }
    }

    drawGrid() {
        this.ctx.fillStyle = "#ece9e9";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.maze.length; i++) {
            for (let j = 0; j < this.maze[i].length; j++) {
                this.ctx.strokeStyle = "white";
                this.ctx.lineWidth = 5;
                this.ctx.strokeRect(j * this.squareWidth, i * this.squareHeight, this.squareWidth, this.squareHeight);
            }
        }
    }

    findStartPlayerPosition() {
        for (let i = 0; i < this.maze.length; i++) {
            for (let j = 0; j < this.maze[i].length; j++) {
                if (this.maze[i][j] === 2) {
                    return { x: j, y: i };
                }
            }
        }
    }

    findGoalPosition() {
        for (let i = 0; i < this.maze.length; i++) {
            for (let j = 0; j < this.maze[i].length; j++) {
                if (this.maze[i][j] === 3) {
                    return { x: j, y: i };
                }
            }
        }
    }

    resetPlayer() {
        this.player.style.top = (this.squareHeight / 2) - (this.player.clientHeight / 2) + 'px';
        this.player.style.left = (this.squareWidth / 2) - (this.player.clientWidth / 2) + 'px';
        this.playerPosition = this.findStartPlayerPosition();
    }

    moveCheck(canMove) {
        if (this.hasReachedGoal()) {
            setTimeout(() => {
                alert("Ganhou!");
                this.resetPlayer();
            }, 500);
        } else if (!canMove) {
            setTimeout(() => {
                const li = document.createElement("li");
                li.appendChild(document.createTextNode("Bateu!"));
                document.getElementById("alerts").appendChild(li);
            }, 500);
            throw new Error("Bateu!");
        }
    }

    canGoTo(x, y) {
        return x >= 0 && x < this.maze.length && y >= 0 && y < this.maze[0].length && this.maze[y][x] !== 1;
    }

    hasReachedGoal() {
        return this.playerPosition.x === this.goalPosition.x && this.playerPosition.y === this.goalPosition.y;
    }

    moveUp(steps) {
        console.log('moveUp');
        const canMove = this.canGoTo(this.playerPosition.x, this.playerPosition.y - steps);
        if (canMove) {
            this.player.style.top = (parseInt(this.player.style.top) - this.squareHeight * steps) + 'px';
            this.playerPosition.y -= steps;
        }

        this.moveCheck(canMove);
    }

    moveDown(steps) {
        console.log('moveDown');
        const canMove = this.canGoTo(this.playerPosition.x, this.playerPosition.y + steps);
        if (canMove) {
            this.player.style.top = (parseInt(this.player.style.top) + this.squareHeight * steps) + 'px';
            this.playerPosition.y += steps;
        }

        this.moveCheck(canMove);
    }

    moveRight(steps) {
        console.log('moveRight');
        const canMove = this.canGoTo(this.playerPosition.x + steps, this.playerPosition.y);
        if (canMove) {
            this.player.style.left = (parseInt(this.player.style.left) + this.squareWidth * steps) + 'px';
            this.playerPosition.x += steps;
        }

        this.moveCheck(canMove);
    }

    moveLeft(steps) {
        console.log('moveLeft');
        const canMove = this.canGoTo(this.playerPosition.x - steps, this.playerPosition.y);
        if (canMove) {
            this.player.style.left = (parseInt(this.player.style.left) - this.squareWidth * steps) + 'px';
            this.playerPosition.x -= steps;
        }

        this.moveCheck(canMove);
    }
}