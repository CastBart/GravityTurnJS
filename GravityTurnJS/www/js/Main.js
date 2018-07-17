/**
 * @author Bartosz Zych
 * Started 10.10.17 - 09:30
 * Finished 
 * 
 */

//global variable
var gameNs = {};
var GameScreens =
    {
        0: "MainMenu",
        1: "Options",
        2: "Playing",
        3: "Credits",
        4: "GameOver",
        5: "SplashScreen"
    };

/**
 * main entry to the game
 */
function main()
{

    m_game = new Game();
    gameNs.game = m_game;
    gameNs.soundOn = true;
    gameNs.gravity = window.innerHeight / 90;
    gameNs.counter = 0;
	if(localStorage.highestScore === undefined)
	{
		localStorage.highestScore = 0;
	}
    m_game.initWorld();
}

