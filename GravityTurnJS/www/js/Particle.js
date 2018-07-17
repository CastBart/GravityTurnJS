

/**
 * Player class which will draw a rectangle as a player
 * and controll its movement
 * @class
 */
class Particle
{
    /**
     * 
     * @param {Number} x holds the current position of the player on the x axis
     * @param {Number} y holds the current position of the player on the y axis
     * @param {Number} width represents whats the width of the player
     * @param {Number} height represent how hight the player is
     * @param {String} colour represents the colour of the player by a hex value
     */
    constructor(x, y, width, height, colour)
    {
        this.xDirection = (Math.random() * (1 + 7 - 3) - 3);
        this.yDirection = (Math.random() * (1 + 7 - 3) - 3);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;
    }

    /**
     * draw function that draws the player object
     * @param {Object} ctx is the context variable in the game
     */
    draw(ctx)
    {
        ctx.beginPath();
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    update()
    {
        this.x += this.xDirection;
        this.y += this.yDirection
    }

    /**
     * 
     * @param {Goal} goal object which will 
     */
    checkCollision(object)
    {
        return (this.x < object.x + object.width &&
                this.x + this.width > object.x &&
                this.y + this.height > object.y &&
                this.y < object.y + object.height)
    }

}

