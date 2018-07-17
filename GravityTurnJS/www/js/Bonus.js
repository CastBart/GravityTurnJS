
class Bonus 
{
    /**
     * @constructor 
     */
    constructor(speed,bonusType)
    {
        this.tempImg;
        if (bonusType === "Slow")
        {
            this.tempImg = gameNs.game.imgSlow;
        }
        else if (bonusType === "Health")
        {
            this.tempImg = gameNs.game.imgHealth;
        }
        this.sprite = new Sprite(gameNs.game.canvas.ctx, {
            width: 51,
            height: 52,
            startY: Math.random() * window.innerHeight,
            startX: window.innerWidth + (window.innerHeight / 5.142857142857143),
            image: this.tempImg
        }, 40, 51, 52, false);
        this.bonusType = bonusType;
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

    applyEffect()
    {
        if (this.bonusType === "Slow")
        {
            gameNs.game.asteroidSpeed -= innerWidth / 1280;
        }
        if (this.bonusType === "Health") {
            {
                if (gameNs.game.lives < 3) {
                    gameNs.game.lives++;
                }
            }

        }
    }



   
}
