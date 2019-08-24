/**
 * Setup the game rules, defining who wins over who, and tranformations
 * required for correct visualiation of the icons in the avatars.
 */
var rules = {
    ROCK: {
        beats: [
        {
            action: 'crushes',
            subject: 'LIZARD'
        },
        {
            action: 'crushes',
            subject: 'SCISSORS'
        }],
        transforms: 'rotate(90deg)',
        transformsMirror: 'rotate(90deg) scaleY(-1)'
    },
    PAPER: {
        beats: [
        {
            action: 'covers',
            subject: 'ROCK'
        },
        {
            action: 'disproves',
            subject: 'SPOCK'
        }],
        transforms: 'rotate(90deg)',
        transformsMirror: 'rotate(90deg) scaleY(-1)'
    },
    SCISSORS: {
        beats: [
        {
            action: 'cuts',
            subject: 'PAPER'  
        },
        {
            action: 'decapitate',
            subject: 'LIZARD'
        }],
        transforms: 'scaleX(-1)',
        transformsMirror: ''
    },
    LIZARD: {
        beats: [
        {
            action: 'poisons',
            subject: 'SPOCK'
        },
        {
            action: 'eats',
            subject: 'PAPER'
        }],
        transforms: 'scaleX(-1)',
        transformsMirror: ''
    },
    SPOCK: {
        beats: [
        {
            action: 'vaporizes',
            subject: 'ROCK'
        },
        {
            action: 'smashes',
            subject: 'SCISSORS'
        }],
        transforms: 'rotate(90deg)',
        transformsMirror: 'rotate(90deg) scaleY(-1)'
    }
}

/**
 * Necessary constants
 */
const DEFAULT_ICON = 'ROCK';
const FIRST_WORD = 0;
const TO_MILLISECONDS = 1000;
const FIRST_LETTER = 0;

/**
 * Game variables
 */
var cpu = undefined;
var player = undefined;

/**
 * Randomly choses one of the moves available in the rules.
 */
function selectMove() {
    let options = Object.keys(rules);
    let selected = Math.floor(Math.random() * options.length);
    return options[selected];
}

/**
 * Checks if option wins over option2, returning the string with
 * the winner and action taken over loser. If it does not win, 
 * returns false.
 */
function winsOver(option, option2) {
    let wins = rules[option].beats;
    for (let i = 0; i < wins.length; ++i) {
        if (wins[i].subject === option2) {
            return `${option} ${wins[i].action} ${option2}`;
        }
    }
    return false;
}

/**
 * Find out the outcome of player1 against player2.
 */
function findOutcome(player1, player2) {
    let result = 'tie';
    if (player1 !== player2) {
        result = winsOver(player1, player2) || winsOver(player2, player1);
    }
    return result;
}

/**
 * Get the FontAwesome class name for the selected option.
 */
function getFAClassName(option) {
    return `fa-hand-${option}`.toLowerCase();
}

/**
 * Retrieves the move selected by the player.
 */
function getPlayerMove() {
    let radios = document.getElementsByName('playerMove');
    for (let i = 0; i < radios.length; ++i) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}

/**
 * Initial setup of UI elements.
 */
function setupUI() {
    let container = document.getElementById('cardContainer');
    let moves = Object.keys(rules);
    for (let i = 0; i < moves.length; i++) {
        let lbl = document.createElement('label');
        let chkBox = document.createElement('input');
        chkBox.type = 'radio';
        chkBox.name = 'playerMove';
        chkBox.value = moves[i];
        let spn = document.createElement('span');
        spn.classList.add('fas', 'fa-3x', 'fa-fw', getFAClassName(moves[i]));
        lbl.appendChild(chkBox);
        lbl.appendChild(spn);
        lbl.appendChild(document.createElement("br"));
        lbl.appendChild(document.createTextNode(moves[i]));
        lbl.onclick = function() {
            // Do not let the user play until he selects a move.
            document.getElementById('playButton').disabled = false;
        }
        container.appendChild(lbl);
    }
    document.getElementById('replayButton').onclick = resetGame;
}

/**
 * Notifies who won the game and update the screen.
 */
function resolveGame() {
    cpuAvatar.classList.remove(getFAClassName(DEFAULT_ICON));
    playerAvatar.classList.remove(getFAClassName(DEFAULT_ICON));
    cpuAvatar.classList.add(getFAClassName(cpu));
    cpuAvatar.style.transform = rules[cpu].transforms;
    playerAvatar.classList.add(getFAClassName(player));
    playerAvatar.style.transform = rules[player].transformsMirror;
    let result = findOutcome(cpu, player);
    let winner = result.split(' ')[FIRST_WORD];
    result = result.toLowerCase().capitalize()
    if (winner == cpu) {
        result = "Computer Wins!<br>" + result;
    } else if (winner == player) {
        result = "You Win!<br>" + result;
    }
    document.getElementById('gameResult').innerHTML = `${result}!`;
    document.getElementById('gameResultDialog').style.visibility = 'visible';
    document.getElementById('playButton').disabled = true;
}

/**
 * Starts the animations and the game.
 */
function runGame() {
    player = getPlayerMove();
    shakeHands();
}

/**
 * Reset the UI elements.
 */
function resetBoard() {
    let hands = document.querySelectorAll('.hand');
    for (let i = 0; i < hands.length; ++i) {
        let el = hands[i];
        for (let j = 0; j < el.classList.length; ++j) {
            let className = el.classList.item(j);
            if (className.startsWith('fa-hand')) {
                el.classList.remove(className);
            }
        }
        el.classList.remove('run-animation');
        void el.offsetWidth;
        el.classList.add(getFAClassName(DEFAULT_ICON));
        let transformation = rules[DEFAULT_ICON].transforms;
        if (el.getAttribute('data-mirror') == 'mirror') {
            transformation = rules[DEFAULT_ICON].transformsMirror;
        }
        el.style.transform = transformation;
    }
    let moves = document.getElementsByName('playerMove');
    for (let i = 0; i < moves.length; ++i) {
        moves[i].checked = false;
    }
    document.getElementById('gameResultDialog').style.visibility = 'hidden';
}

/**
 * Animates the avatars with a shaking motion.
 */
function shakeHands() {
    let docHands = document.querySelectorAll('.hand');
    let duration = 0;
    for (let i = 0; i < docHands.length; ++i) {
        let el = docHands[i];
        el.classList.remove('run-animation');
        void el.offsetWidth;
        el.classList.add('run-animation');
        let compStyle = window.getComputedStyle(el);
        let animDurationS = parseFloat(compStyle.animationDuration);
        let animCount = parseInt(compStyle.animationIterationCount);
        duration = Math.max(animDurationS * animCount * TO_MILLISECONDS, duration);
    }
    setTimeout(() => {
        // After the animation is done, update the UI an show the winner.
        resolveGame();
    }, duration);
}

/**
 * Restarts the game.
 */
function resetGame() {
    cpu = selectMove();
    document.getElementById('playButton').onclick = runGame;
    document.getElementById('playButton').disabled = true;

    resetBoard();
}

// setup ui after the page is loaded
window.addEventListener('DOMContentLoaded', () => { setupUI(); resetGame(); });

// Utility function for strings.
String.prototype.capitalize = function() {
    return this[FIRST_LETTER].toUpperCase() + this.slice(1);
}
