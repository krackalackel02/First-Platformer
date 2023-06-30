let simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;
/* Periods are empty space, hash (#) characters are walls, and plus signs are
lava. The player’s starting position is the at sign (@). Every O character is a
coin, and the equal sign (=) at the top is a block of lava that moves back and
forth horizontally. 

We’ll support two additional kinds of moving lava: the pipe character (|)
creates vertically moving blobs, and v indicates dripping lava—vertically moving lava that doesn’t bounce back and forth but only moves down, jumping
back to its start position when it hits the floor*/

const canvas = document.getElementById("myCanvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
// Clear the canvas
c.clearRect(0, 0, canvas.width, canvas.height);

class Player {
	constructor(position, velocity) {
		this.position = position;
		this.velocity = velocity;
		this.bounce = 0.5;
	}
	draw() {
        c.fillStyle = "red";
		c.fillRect(this.position.x, this.position.y, 100, 100);
        c.strokeStyle = "blue";
        c.strokeRect(this.position.x, this.position.y, 100, 100);
	}
	update() {
        this.collision();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        this.velocity.y += 0.1;
        this.draw();
        console.log(this.velocity.y);
    }
    
    collision() {
        if (this.position.x + 100 >= canvas.width) {
            this.position.x = canvas.width - 100;
            this.velocity.x *= -this.bounce;
        }
        if (this.position.x <= 0) {
            this.position.x = 0;
            this.velocity.x *= -this.bounce;
        }
        if (this.position.y + 100 >= canvas.height) {
            this.position.y = canvas.height - 100;
            this.velocity.y *= -this.bounce;
        }
        if (this.position.y <= 0) {
            this.position.y = 0;
            this.velocity.y *= -this.bounce;
        }
    }
    
}

let players = [];
players.push(new Player({ x: 100, y: 125 }, { x: -9, y: -10 }));
players.push(new Player({ x: 300, y: 100 }, { x: -10, y: -10 }));
players.push(new Player({ x: 500, y: 75 }, { x: 2, y: +10 }));
players.push(new Player({ x: 500, y: 75 }, { x: -2, y: -10 }));
players.push(new Player({ x: 200, y: 200 }, { x: 15, y: 12 }));
players.push(new Player({ x: 400, y: 300 }, { x: -13, y: -18 }));
players.push(new Player({ x: 600, y: 150 }, { x: 11, y: 14 }));
players.push(new Player({ x: 800, y: 250 }, { x: -61, y: -13 }));

function animate() {
	setTimeout(() => {
		window.requestAnimationFrame(animate);
		// Draw a white background on the canvas
		c.fillStyle = "white";
		c.fillRect(0, 0, canvas.width, canvas.height);

		for (const player of players) {
			player.update();
		}
	}, 1000 / 144); /* 144fps */
}
animate();
