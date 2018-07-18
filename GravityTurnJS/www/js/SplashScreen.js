/**
 * @author Bartosz Zych
 * Started 21.11.17 - 09:30
 * Finished 
 * Description simple main menu class that manages button clicks in that menu
 */

class SplashScreen
{

    constructor()
    {
        this.message = "Loading"
        this.timer = 0;
    }


    update()
    {
        this.timer++;
        if (this.timer <= 50 && this.timer >= 0)
        {
            this.message = "Loading.";
        }
        else if (this.timer <= 100 && this.timer >= 50)
        {
            this.message = "Loading..";
        }
        else if (this.timer <= 150 && this.timer >=100)
        {
            this.message = "Loading...";
        }
        else if (this.timer <= 200 && this.timer >= 150)
        {
            this.timer = 0;
        }
       
    }

    draw(ctx)
    {
        let context2D = ctx;
        context2D.fillStyle = "#42f4d1";
        this.textSize = window.innerWidth / 20;
        context2D.font = this.textSize.toString() + "px Aerial";
        this.string = this.message;
        //   context2D.textAlign = "center";
        context2D.fillText(this.string, (window.innerWidth - (window.innerWidth / 2) - (window.innerWidth/10.6666667)), (window.innerHeight / 2));
    }

   
}

