/**
 * Constructor function to initialise this sprite with the canvas context
 *  and a set of image options. The image options specify both image and
 *  animation properties. For example, image width, image height, the image
 *  object and the y coordinate where the image should be drawn.
 *  The animation properties include the ticks per frame and number of 
 *  frames.
 * @param {context} context The 2D context for the canvas.
 * @param {Object} imageOptions An object describing the image and animation     
 *                  properties.
 */
class Sprite 
{
    /**
     * @constructor 
     * @param {any} context 
     * @param {any} imageOptions contains image width, height, start y position
     * @param {any} fps frames per second
     */
    constructor(context, imageOptions, fps, sizeX,sizeY,animate,frames)
    {

        this.imageOptions = imageOptions;
        this.width = imageOptions.width;
        this.height = imageOptions.height;
        this.image = imageOptions.image;
        this.startY = imageOptions.startY;
        this.startX = imageOptions.startX;
        this.ctx = context;
        this.frameIndex = frames;
        this.tickCount = 0;
        this.ticksPerFrame = 100 / fps;
        this.numberOfFrames = frames;
        this.sizeX = sizeX;
        this.sizeY = sizeY
        this.animate = animate;
    }

    /**
     * updates the frame per second count which
     * determines how fast the sprite is drawn
     */
    update()
    {
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame)
        {
            if (gameNs.game.asteroidSpeed <= window.innerWidth / 80) {
                gameNs.game.asteroidSpeed += window.innerWidth/ 640000;
            }
            this.tickCount = 0;
            this.frameIndex--;
            if (this.frameIndex <= 0)
            {
                this.frameIndex = this.numberOfFrames-1;
            }
        }
    }

    /**
     * Draw function that draws the sprite
     * @param {Object} ctx 
     */
    draw(ctx)
    {
        if (this.animate) {
            ctx.drawImage(
                this.image,
                this.frameIndex * this.sizeX,
                0,
                this.sizeX,
                this.sizeY,
                this.startX,
                this.startY,
                this.sizeX * ((window.innerWidth / 40) / this.numberOfFrames),
                this.sizeY * ((window.innerWidth / 40) / this.numberOfFrames));
        }
        else
        {
            ctx.drawImage(
                this.image,
                0,
                0,
                this.sizeX,
                this.sizeY,
                this.startX,
                this.startY,
                this.sizeX * ((window.innerWidth / 40) / 16),
                this.sizeY * ((window.innerWidth / 40) / 16));
           
        }
    }



   
}
