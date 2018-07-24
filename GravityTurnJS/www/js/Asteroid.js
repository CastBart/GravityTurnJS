
class Asteroid 
{
    /**
     * @constructor 
     * @param {Sprite} sprite 
     */
    constructor(speed)
    {
        this.sprite = new Sprite(gameNs.game.canvas.ctx, {
            width: 1120,
            height: 70,
            startY: Math.random() * (window.innerHeight - (window.innerHeight / 5.142857142857143)),
            startX: window.innerWidth + (window.innerHeight / 5.142857142857143),
            image: gameNs.game.img
        }, 40, 70, 70, true,16);
      
        this.speed = speed;
       
        this.circle = new Circle(this.sprite.startX + this.sprite.sizeX / 2, this.sprite.sizeY/2, 25);
     
    }

    /**
     * updates the frame per second count which
     * determines how fast the sprite is drawn
     */
    update(speed)
    {
        this.sprite.startX -= speed;
        this.circle.x = this.sprite.startX + (this.sprite.sizeX * ((window.innerWidth / 40) / 16)) / 2;
        this.circle.y = this.sprite.startY + (this.sprite.sizeY * ((window.innerWidth / 40) / 16)) / 2;
        this.sprite.update();
        
    }

    /**
     * Draw function that draws the sprite
     * @param {Object} ctx 
     */
    draw(ctx)
    {
        this.sprite.draw(ctx);
        this.circle.draw(ctx);
    }



   
}
