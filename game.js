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
        for (const key in keys) {
            if (keys[key].pressed) {
                switch (key) {
                    case "w":
                        this.velocity.y--;
                        break;
                    case "a":
                        this.velocity.x--;
                        break;
                    case "s":
                        this.velocity.y++;
                        break;
                    case "d":
                        this.velocity.x++;
                        break;
                }
            }
        }
        this.draw();
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
let player1 = new Player({ x: 400, y: 300 }, { x: -0, y: 0 });
let keys = {
	w: { pressed: false },
	a: { pressed: false },
	s: { pressed: false },
	d: { pressed: false },
};
players.push(player1);

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

window.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "w":
            console.log("W pressed");
			keys.w.pressed = true;
			break;
		case "a":
			keys.a.pressed = true;
			break;
		case "s":
			keys.s.pressed = true;
			break;
		case "d":
			keys.d.pressed = true;
			break;
	}
});

window.addEventListener("keyup", (event) => {
	switch (event.key) {
		case "w":
			keys.w.pressed = false;
			break;
		case "a":
			keys.a.pressed = false;
			break;
		case "s":
			keys.s.pressed = false;
			break;
		case "d":
			keys.d.pressed = false;
			break;
	}
});