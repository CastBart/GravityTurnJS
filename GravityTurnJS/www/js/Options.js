/**
 * @author Bartosz Zych
 * Started 10.10.17 - 09:30
 * Finished 
 * 
 */

class Options
{

    constructor()
    {
        this.createDiv("Mute", window.innerWidth / 2, window.innerHeight / 4);
        this.createDiv("Unmute", window.innerWidth / 2, window.innerHeight / 4);
        this.createDiv("Back", window.innerWidth / 2, window.innerHeight / 2);
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
        d.style.borderRadius = fontSize + "px";

        var width = d.offsetWidth;
        var height = d.offsetHeight;
        d.style.position = "absolute";
        d.style.left = posX - (width / 2) + 'px';
        d.style.top = posY + 'px';

        var tapped = false;
        var looping = false;
        div.addEventListener("touchstart", function (e) {
            if (gameNs.game.currentGameScreen === 1) {


                if (divId === "Mute") {
                    gameNs.soundOn = false;
                }
                if (divId === "Unmute") {
                    gameNs.soundOn = true;
                }
                if (divId === "Back") {
                    //change state to options
                    gameNs.game.currentGameScreen = 0
                }

            }
        })
    }

    onTouchEvent(divId, e)
    {
    
}

    setDivVisability(id) {
        var x = document.getElementById(id);
        var mute = document.getElementById("Mute");
        var unmute = document.getElementById("Unmute");

      
        //check if current game is mainmenu
        if (gameNs.game.currentGameScreen === 1) {
            x.style.display = "block";
            x.style.visibility = "visible";
            if (gameNs.soundOn) {
                mute.style.display = "block";
                mute.style.visibility = "visible";
                unmute.style.display = "none";
            }
            else if (!gameNs.soundOn)
            {
                mute.style.display = "none";
                
                unmute.style.display = "block";
                unmute.style.visibility = "visible";
            }
        }
        else {
            x.style.display = "none";
        }

       


    }

    update() {
       
        this.setDivVisability("Back");
        this.setDivVisability("Mute");
        this.setDivVisability("Unmute");
    }



}

