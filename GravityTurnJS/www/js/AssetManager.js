/**
 * @author Bartosz Zych
 * Started 21.11.17 - 09:30
 * Finished 
 * Description simple main menu class that manages button clicks in that menu
 */

class AssetManager
{

    constructor()
    {
        this.data = {};
        this.score = {};
        this.requestData = new XMLHttpRequest();
        let loadJsonData = this.loadJSON.bind(this);
        this.requestData.addEventListener("load", loadJsonData);
        this.requestData.open('GET', "js/data.json");
        this.requestData.send();

        this.requestScore = new XMLHttpRequest();
        let loadJsonScore = this.loadJSONScore.bind(this);
        this.requestScore.addEventListener("load", loadJsonScore);
        this.requestScore.open('GET', "js/score.json");
        this.requestScore.send();

        this.dataLoaded = false;
    }

   
    loadJSON(callback)
    {
        this.data = JSON.parse(this.requestData.responseText);
        var loadedAssets = 0;
        const TOTAL_ASSETS = 4;

        const onLoad = function (e)
        {
            if (this.complete === undefined)
            {
                this.complete = true;
            }
            gameNs.counter++;
        }

        gameNs.game.img.addEventListener("load", onLoad, false);
        gameNs.game.img.src = this.data["asteroid"];
        gameNs.game.imgSlow.addEventListener("load", onLoad, false);
        gameNs.game.imgSlow.src = this.data["slow"];
        gameNs.game.imgPlayer.addEventListener("load", onLoad, false);
        gameNs.game.imgPlayer.src = this.data["player"];
        gameNs.game.imgHealth.addEventListener("load", onLoad, false);
        gameNs.game.imgHealth.src = this.data["health"];
        gameNs.game.imgMainBackground.addEventListener("load", onLoad, false);
        gameNs.game.imgMainBackground.src = this.data["mainMenuBackground"];

       // this.dataLoaded = true;
    }

    loadJSONScore(callback) {

        this.score = JSON.parse(this.requestScore.responseText);

        gameNs.game.highScore = this.score["score"];
       // localStorage.highestScore = gameNs.game.highScore;
        this.dataLoaded = true;
    }

   
}

