

/**
 * Particle system class which will draw a manage the particles of the game
 * @class
 */
class ParticleSystem {
    /**
     * 
     * @param {Number} x holds the current position of the goal on the x axis
     * @param {Number} y holds the current position of the goal on the y axis
     * @param {Number} width represents whats the width of the goal
     * @param {Number} height represent how hight the goal is
     * @param {String} colour represents the colour of the player by a hex value
     */
    constructor(x,y, img) {
        this.particleNum = 30;
        this.particleList = [];
        this.x = x; 
        this.y = y;
        this.img = img;
        for (var i = 0; i < this.particleNum; i++)
        {
            this.particleList.push(new Particle(this.x, this.y, 10, 10, this.img));
        }
    }

    /**
     * draw function that draws the goal object
     * @param {Object} ctx is the context variable in the game
     */
    draw(ctx) {
        //  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (var i = 0; i < this.particleList.length; i++)
        {
            this.particleList[i].draw(ctx);
        }
        
    }

    update()
    {
        for (var i = 0; i < 5; i++) {
            this.particleList.push(new Particle(this.x, this.y, 10, 10, this.img));
        }
        for (var i = 0; i < this.particleList.length; i++) {
            this.particleList[i].update();
        }
    }


}