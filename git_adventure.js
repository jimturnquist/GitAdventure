// === Game Data ===

var gameData = {
    commandCounter : 0,
    gameOver : false,
    introText : 'Welcome to the Git adventure game. Pay attention and watch your step and you might just make it out with riches beyond your wildest imagination!',
    outroText : 'Thanks for playing!',
    player : {
        currentLocation : 'gitIntro',
        inventory : {},
        gitLevel : 0,
        githubAccount : ''
    },
    map : {

        'gitIntro' : {
            firstVisit : true,
            displayName : 'Git Introduction',
            description : 'You are standing at a rickety bridge leading to the Realms of Git.  You should have already gone through the Realms of GitHub and have made thyself a github account.  There is a troll in front of you demanding to know what github account you will be using.  He wants you to use the word "use account" followed by your account name.  He recommends not lieing as he will find out.',
            items : {
                account : {
                    displayName : 'github account',
                    description : 'github account name',
                    use : function(){return useGithubAccount();},
                    git : function(){return useGithubAccount();},
                    quantity : 1,
                    hidden : true
                }
            },
            exits : {
            }
        },

        'Level 1' : {
            firstVisit : true,
            displayName : 'Level 1',
            description : 'You enter Level 1, there is a sign that says, To conjure git say... "use git"',
            items : {
                git : {
                    displayName : 'Git',
                    description : 'The stupid content tracker',
                    use : function(){return useGit();},
                    quantity : 1,
                    hidden : true
                }
            },
            exits : {
                back : {
                    displayName : 'Back',
                    destination : 'gitIntro'
                },
                forward : {
                    displayName : 'Forward',
                    destination : 'End'
                }
            }
        },

        'End' : {
            firstVisit : true,
            description : 'placeholder',
            setup : function(){end();}
        }
    }
};

// === Game Actions ===
var gameActions = {
    git: function (game, command, consoleInterface) {
        var os = new os_func();
        var git_command = command.action + ' ' + command.subject;
        os.execCommand(git_command, function (cmd_output) {
            return cmd_output;
        });
    }
};

// === Necessary Exports ===
module.exports.gameData = gameData;
module.exports.gameActions = gameActions;

// === Helper Functions ===

use strict';

const { spawnSync } = require( 'child_process' ),
    ls = spawnSync( 'ls', [ '-lh', '/usr' ] );

console.log( `stderr: ${ls.stderr.toString()}` );
console.log( `stdout: ${ls.stdout.toString()}` );


const exec = require('child_process').exec;

function os_func() {
    this.execCommand = function(cmd, callback) {
        exec(cmd, function(error, stdout, stderr) {
            if (error) {
                console.error('exec error: %s\n', error);
                return;
            }
            callback(stdout);
        });
    }
}

function end(){
    if(gameData.player.level === 10){
        gameData.map['End'].description = 'You have acquired the necessary skills to advance into the Realm of Git.  Congratulations!';
    } else {
        gameData.map['End'].description = 'You are still acquiring the skills of Git.  Continue your training to advance.';
    }
    gameData.gameOver = true;
}

function useGithubAccount(){
    console.log('%j\n', gameData);
    // gameData.player.githubAccount = 'jimturnquist';
    return 'The troll accepts your answer and steps aside.'
}

function useGit(){
    gameData.player.level = gameData.player.level++;
    return 'Poof, Git appears in your hands.  A loud disembodied voice announces, "need help? git help".  You have achieved the level of First-Order git user.'
}

