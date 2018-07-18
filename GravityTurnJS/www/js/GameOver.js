/**
 * @author Bartosz Zych
 * Started 21.11.17 - 09:30
 * Finished 
 * Description simple main menu class that manages button clicks in that menu
 */

class GameOver
{

    constructor()
    {
        this.createDiv("Restart", screen.width / 2, screen.height / 4);
        this.createDiv("Main Menu", screen.width / 2, screen.height / 2);
    }

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
        
        div.addEventListener("touchstart", this.onTouchEvent.bind(this,divId));
    }


    onTouchEvent(divId,e)
    {
        if (divId === "Restart") {
            //change state to credits
            gameNs.game.initialize();
            gameNs.game.currentGameScreen = 2;
        }
        if (divId === "Main Menu") {
            //change state to playing
            gameNs.game.currentGameScreen = 0;
        }
       
    }
    setDivVisability(id)
    {
        var x = document.getElementById(id);

        //check if current game is mainmenu
        if (gameNs.game.currentGameScreen === 4) {

            x.style.display = "block";
        }
        else {
            x.style.display = "none";
        }
    }

    update()
    {
        this.setDivVisability("Restart");
        this.setDivVisability("Main Menu");
       
    }

   
}

