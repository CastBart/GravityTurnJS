/**
 * Game class which has a game loop
 * to update and draw the game
 * @class 
 */
class Game
{

    
    /**
    *@constructor
    */
    constructor()
    {
        this.assetManager = new AssetManager(); //load assets

        //variables
        this.currentGameScreen = 5;
        this.canvas;
        this.assetsLoaded = false;
       
        this.img = new Image();   // Create new img element for the asteroid animation
        this.imgLoaded = false;
        this.imgSlowLoaded = false;

        //images
        this.imgSlow = new Image(); //image element for the slow asset
        this.imgPlayer = new Image();
        this.imgHealth = new Image();
        

        //screens
        this.mainMenu = new MainMenu();
        this.options = new Options();
        this.splashScreen = new SplashScreen();

        //divs
        this.createDiv("Restart", window.innerWidth / 2, window.innerHeight/ 4);
        this.createDiv("Main Menu", window.innerWidth / 2, window.innerHeight / 2);
       
    }

    initialize() {
        this.tickCount = 0;
        this.ticksPerFrame = 100 / 30;
        this.singleFrame = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.asteroidSpeed = window.innerWidth/320;
        this.player = new Player(window.innerWidth/16, window.innerHeight / 2, 40, 20, "#3af8ff");
        this.asteroidList = [];
        this.bonusList = [];
        this.particleList = [];
        this.asteroidList.push(new Asteroid(this.asteroidSpeed));
        this.bonusList.push(new Bonus(this.asteroidSpeed, "Health"));
        this.tickparicle = 0;
        this.singleParticleFrame = 0;
        this.score = 0;
        this.blinking = false;
        this.blinkTimer = 0;
        this.blinkingTimes = 0;
        this.drawPlayer = true;
    }
    /**
     * 
     * @param {any} divId string on how the div is called
     * @param {any} posX position of the div on x axis
     * @param {any} posY position of div on y axis
     */
    createDiv(divId, posX, posY) {
        var div = document.createElement("div");
        div.id = divId;
        div.innerHTML = divId;
        div.classList.add("myButton");

        document.body.appendChild(div);
        //setting the postition of the div
        var d = document.getElementById(divId);
        var fontSize = (window.innerHeight / 18);
        d.style.fontSize = fontSize + "px";

        d.style.paddingTop = fontSize / 2 + "px";
        d.style.paddingBottom = fontSize / 2 + "px";
        d.style.paddingLeft = fontSize + "px";
        d.style.paddingRight = fontSize + "px";

        var width = d.offsetWidth;
        var height = d.offsetHeight;
        d.style.position = "absolute";
        d.style.left = posX - (width / 2) + 'px';
        d.style.top = posY + 'px';

        var tapped = false;
        var looping = false;

        div.addEventListener("touchstart", this.onTouchEvent.bind(this, divId));
    }
    /**
     * Detect a touch event on the div
     * @param {any} divId
     * @param {any} e
     */
    onTouchEvent(divId, e) {
        if (divId === "Restart") {
            //change state to credits
            gameNs.game.initialize();
            gameNs.game.currentGameScreen = 2;
        }
        if (divId === "Main Menu") {
            //change state to playing
            gameNs.game.gameIsOver = false;
            gameNs.game.currentGameScreen = 0;
        }

    }
    setDivVisability(id) {
        var x = document.getElementById(id);

        //check if current game is mainmenu
        if (this.gameIsOver) {

            x.style.display = "block";
        }
        else {
            x.style.display = "none";
        }
    }
   
   
   
    /**
     * initializing the game function
     */
    initWorld()
    {
        console.log("Initialising Game!");
        this.initCanvas();
       
        this.initialize();

        this.loop();
    }

    onTouchStart(e)
    {
        if (gameNs.game.currentGameScreen === 2)
        {
            gameNs.gravity = -gameNs.gravity;
        }
    }


    /**
    * Initialises the canvas - the drawing surface. The canvas
    * is added to the document. When a HTML document is loaded into a
    * browser, it becomes a document object. This document object is
    * the root node of the HTML document and is considered the 'owner' of all other
    * nodes such as forms, buttons, the canvas etc.
    */
    initCanvas()
    {
        // Use the document object to create a new element canvas.
        this.canvas = document.createElement("canvas");
        // Assign the canvas an id so we can reference it elsewhere.
        this.canvas.id = 'mycanvas';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.levelComplete = "Level Complete";
        
        document.addEventListener("touchstart", this.onTouchStart);

        // We want this to be a 2D canvas.
        this.canvas.ctx = this.canvas.getContext("2d");
        // Adds the canvas element to the document.
        document.body.appendChild(this.canvas);
    }

    /**
     * main loop of the game
     */
    loop()
    {
        //only loop if our data has been loaded
        if (gameNs.game.assetManager.dataLoaded)
        {
            gameNs.game.update();
            gameNs.game.draw();
        }
        window.requestAnimationFrame(gameNs.game.loop);
    }

    /**
     * Draw functions which draws everything in the game
     */
    draw()
    {
        /**
         * @type {CanvasRenderingContext2D}
         */
        let context2D = this.canvas.ctx;
        context2D.clearRect(0, 0, window.innerWidth, window.innerHeight);
        switch (this.currentGameScreen)
        {
            case 0: //MainMenu  
                context2D.fillStyle = "#000000";
                this.textSize = window.innerWidth / 20;
                context2D.font = this.textSize.toString() + "px Aerial";
                this.string = "Highest Score: " + localStorage.highestScore;
               
                context2D.textAlign = "center";
                context2D.fillText(this.string, (window.innerWidth - (window.innerWidth / 2)), (window.innerHeight / 7.2));
                
                break;
            case 1://Options
                break;
            case 2://Playing

                if (this.drawPlayer) {
                    this.player.draw(context2D);
                }
                if (this.bonusList.length > 0) {
                    this.bonusList[0].draw(context2D);
                }
                for (var i = 0; i < this.asteroidList.length; i++)
                {
                    this.asteroidList[i].draw(context2D);
                }
                if (this.particleList.length > 0) {
                    for (var i = 0; i < this.particleList.length; i++)
                    {
                        this.particleList[i].draw(context2D);
                    }
                }

                context2D.fillStyle = "#000000";
                // context2D.font = "12px Arial";
                this.textSize = window.innerHeight / 30;
                context2D.font = this.textSize.toString() + "px Aerial";
                context2D.fillText("Score: " + this.score, window.innerWidth - (window.innerWidth / 5), window.innerHeight / 18);
                this.livesString = "Lives: " + this.lives;
                context2D.fillText(this.livesString, (window.innerWidth - (window.innerWidth / 3)), window.innerHeight / 18);

                break;
            case 3://Credits
                break;
            case 4://GameOver
                break;
            case 5://SplashScreen
                this.splashScreen.draw(this.canvas.ctx);
                break;
           
        }
    }

    blink3times()
    {
        if (this.blinking)
        {
            if (this.blinkingTimes < 5)
            {
                this.blinkTimer++;
                if (this.blinkTimer <= 8 && this.blinkTimer >= 0) {
                    this.drawPlayer = true;
                }
                else if (this.blinkTimer <= 16 && this.blinkTimer >=8) {
                    this.drawPlayer = false;
                }
                else {
                    this.blinkingTimes++;
                    this.blinkTimer = 0;
                }
            }
            else
            {
                this.blinking = false;
                this.drawPlayer = true;
            }
        }
    }

    /**
     * update function which will update the game(game loop)
     * does the draws and updates of the game
     */
    update()
    {
       
        this.mainMenu.update();
        this.options.update();

        this.setDivVisability("Restart");
        this.setDivVisability("Main Menu");

        switch (this.currentGameScreen) {
            case 0: //MainMenu
                
                break;
            case 1://Options
               
                break;
            case 2://PLaying
                this.blink3times();
                this.player.applyGravity(gameNs.gravity);
                if (this.bonusList.length > 0) {
                    this.bonusList[0].update(this.asteroidSpeed);
                }
                for (var i = 0; i < this.asteroidList.length; i++)
                {
                    this.asteroidList[i].update(this.asteroidSpeed);
                }

                //player collisions with asteroids
                for (var i = 0; i < this.asteroidList.length; i++)
                {
                    if (this.collisionCircleRect(this.asteroidList[i].circle, this.player.rect) && !this.gameIsOver && !this.blinking)
                    {
                        if (this.lives > 0) {
                            this.lives--;
                            this.blinking = true;
                            this.blinkTimer = 0;
                            this.blinkingTimes = 0;
                           
                        }
                        else {
                            //--------------------
                            // Do Particle Effect
                            //--------------------
                            for (var i = 0; i < 40; i++) {
                                this.particleList.push(new Particle(this.player.x, this.player.y, 5, 5, "#4286f4"));
                            }
                            if (this.score > gameNs.game.highScore) {
                                localStorage.highestScore = this.score;
                            }
                            
                            this.gameOver();
                        }
                    }
                }
                if (this.bonusList.length > 0) {
                    if (this.collisionCircleRect(this.bonusList[0].circle, this.player.rect)) {
                        this.bonusList[0].applyEffect();
                        this.bonusList.pop();
                        this.tickCount = 0;
                        this.singleFrame = 0;
                    }
                }
                if (this.particleList.length > 0)
                {
                    for (var i = 0; i < this.particleList.length; i++)
                    {
                        this.particleList[i].update();
                    }

                    this.deleteParticles();
                }
                if (this.bonusList.length <= 0)
                {
                    this.tickCount += 1;
                    if (this.tickCount > this.ticksPerFrame) {
                        this.tickCount = 0;
                        this.singleFrame++;
                        if (this.singleFrame >= 200)
                        {
                            this.max = 2;
                            this.min = 1;
                            this.randomNum = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;

                            if (this.randomNum === 1) {
                                this.bonusList.push(new Bonus(this.asteroidSpeed, "Health"));
                            }
                            else if (this.randomNum === 2) {
                                this.bonusList.push(new Bonus(this.asteroidSpeed, "Slow"));
                            }
                        }
                    }
                }
               
                this.spawnNewAsteroid();
                this.gameSceenCollision();
                this.deleteAsteroid();
                
               
                break;
            case 3://Credtis
                break;
            case 4://GameOver
                break;
            case 5://SplashScreen
                this.splashScreen.update();
                if (gameNs.counter >= gameNs.TOTAL_ASSETS)
                {
                    if (!this.assetsLoaded)
                    {
                        this.assetsLoaded = true;
                        this.currentGameScreen = 0;
                    }
                }
                break;
        }
    }
    deleteParticles()
    {
        this.tickparicle += 1;
        if (this.tickparicle > this.ticksPerFrame) {
            this.tickparicle = 0;
            this.singleParticleFrame++;
            if (this.singleParticleFrame >= 30) {
                for (var i = 0; i < this.particleList.length; i++) {
                    this.particleList.pop();
                }
            }
        }

    }
    spawnNewAsteroid()
    {
        if (this.asteroidList[this.asteroidList.length - 1].sprite.startX <= window.innerWidth - 70)
        {
            this.asteroidList.push(new Asteroid(this.asteroidSpeed));
            if (this.gameIsOver === false)
            {
                this.score++;
            }
        }
    }
    deleteAsteroid()
    {
        //if (this.asteroidList[0].sprite.startX <= -70)
        //{
        //    this.asteroidList.pop();
        //}
        if (this.bonusList.length > 0) {
            if (this.bonusList[0].sprite.startX <= -70) {
                this.bonusList.pop();
                this.tickCount = 0;
                this.singleFrame = 0;

            }
        }
    }
    gameSceenCollision()
    {
        if (this.player.y + 20 <= 0 || this.player.y >= window.innerHeight)
        {
            if (this.lives > 0) {
                this.lives--;
                this.blinking = true;
                this.blinkTimer = 0;
                this.blinkingTimes = 0;
                this.player.yVel = window.innerHeight/2;
                this.player.y = window.innerHeight / 2;
                this.player.sprite.startY = window.innerHeight / 2;
            }
            else {
                if (this.score > gameNs.game.highScore)
                {
                    localStorage.highestScore = this.score;
                }
                this.gameOver();
            }
           // gameNs.game.currentGameScreen = 4;
        }
    }

    gameOver()
    {

        this.gameIsOver = true;

        //this.fs = require("fs");
        //this.tempScoreObject = {
        //    score: this.highScore
        //};

        //fs.writeFile("./object.json", JSON.stringify(sampleObject, null, 4), (err) =>
        //{
        //    if (err)
        //    {
        //        console.error(err);
        //        return;
        //    };
        //    console.log("File has been created");
        //});
    }
    collisionCircleRect(circle, rect)
    {
      

        var circleDistX = Math.abs(circle.x - (rect[0] + (rect[2] / 2)));
        var circleDistY = Math.abs(circle.y - (rect[1] + (rect[3] / 2)));

        //check for definetly not colliding 
        if (circleDistX > ((rect[2] / 2) + circle.radius))
        {
            return false;
        }
        if (circleDistY > ((rect[3] / 2) + circle.radius))
        {
            return false;
        }

        //check for  definitely colliding
        if (circleDistX <= (rect[2]/2)) {
            return true;
        }
        if (circleDistY <= (rect[3]/2)) {
            return true;
        }

        var distSq = (circleDistX - (rect[2] / 2)) * (circleDistX - (rect[2] / 2)) +
            (circleDistY - (rect[3] / 2)) * (circleDistY - (rect[3] / 2));

        //check if collising with rectangle but not circle
        return (distSq <= (circle.radius * circle.radius));        
    }



}