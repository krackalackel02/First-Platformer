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



let initY = 100;
function animate() {
    setTimeout(() => {
        window.requestAnimationFrame(animate);
        // Draw a white background on the canvas
        c.fillStyle = "white";
        c.fillRect(0, 0, canvas.width, canvas.height);
		c.fillStyle = "red";
		c.fillRect(200,initY , 100, 100);
		initY ++;
	}, 1000 / 144);
}
animate()