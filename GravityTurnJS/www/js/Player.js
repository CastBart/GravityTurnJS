

/**
 * Player class which will draw a rectangle as a player
 * and controll its movement
 * @class
 */
class Player
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
       

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;
        this.yVel = this.y;
        this.rectWidth = this.width * ((window.innerWidth / 40) / 16);
        this.rectHeight = this.height * ((window.innerWidth / 40) / 16);
        this.rect = [this.x, this.y, this.rectWidth, this.rectHeight];
        this.sprite = new Sprite(gameNs.game.canvas.ctx, {
            width: 204,
            height: 96,
            startY: this.y,
            startX: this.x,
            image: gameNs.game.imgPlayer
        }, 40, 80, 40, false);
        
    }

    /**
     * draw function that draws the player object
     * @param {Object} ctx is the context variable in the game
     */
    draw(ctx)
    {
        if (!gameNs.game.gameIsOver) {
            this.sprite.draw(ctx);
           // ctx.strokeRect(this.x, this.y, this.rect[2], this.rect[3]);
        }
    }

    applyGravity(gravity)
    {
        if (!gameNs.game.gameIsOver) {
            this.rect = [this.x, this.y, this.rectWidth, this.rectHeight];
            this.yVel += gravity;
            this.y = this.yVel;
            this.sprite.startY = this.y;
        }
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

