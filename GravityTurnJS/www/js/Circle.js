/**
 * Circle class 
 */
class Circle 
{
    /**
     * @constructor 
     * @param {int} x x position of the circle
     * @param {int} y y position of the circle
     * @param {int} radius of the circle
     */
    constructor(x,y, radius)
    {
        this.rad = (70 * ((window.innerWidth / 40) / 16)) / 2.8;
        this.x = x;
        this.y = y;
        this.radius = this.rad;
    }

    /**
     * updates the frame per second count which
     * determines how fast the sprite is drawn
     */
    update()
    {
       
    }

    draw(ctx) {
       // ctx.beginPath();
       // ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
       // ctx.stroke();
    }



   
}
