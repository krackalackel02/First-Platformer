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
	constructor(x, y) {
		this.position = {
			x: x,
			y: y,
		};
	}
	draw() {
		c.fillStyle = "red";
		c.fillRect(this.position.x, this.position.y, 100, 100);
	}
	update() {
		this.position.y++;
	}
}

let players = [];
players.push(new Player(100, 100));
players.push(new Player(300, 100));
players.push(new Player(500, 100));
players.push(new Player(700, 100));

function animate() {
	setTimeout(() => {
		window.requestAnimationFrame(animate);
		// Draw a white background on the canvas
		c.fillStyle = "white";
		c.fillRect(0, 0, canvas.width, canvas.height);

		for (const player of players) {
			player.draw();
			player.update();
		}
	}, 1000 / 144);
}
animate();

