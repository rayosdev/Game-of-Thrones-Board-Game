
// Fetch Varaibles and init Setup

let tiles = document.getElementsByClassName('tile')
let player1 = document.getElementById('player1')
let player2 = document.getElementById('player2')
player1.tile = 1
player2.tile = 1


let activePlayer = player1
let playerTurnLabel = document.getElementById('playerTurnLabel')


let diceButton = document.getElementById('diceButton')
let diceNumberLabel = document.getElementById('diceNumberLabel')


let enemyDamageLabel = document.getElementById('enemyDamageLabel')
let playerDamageLabel = document.getElementById('playerDamageLabel')






function show(element) {element.classList.remove('hide')}
function hide(element) {element.classList.add('hide')}


// WORK AS AN ENUM
const tileActionList = {
    SKIP_ROUND      : "SKIP_ROUND",
    DRAW_CARD       : "DRAW_CARD",
    DICE_OUTCOME    : "DICE_OUTCOME",
    STORE           : "STORE",
    OTHER_LAND      : "OTHER_LAND",
    MOVE_X_SPACES   : "MOVE_X_SPACES",
    EMPTY_TILE      : "EMPTY_TILE",
}


const tileDitails = [
    {
        nr:1,
        name:"Kings Landing",
        // tileAction:tileActionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:2,
        name:"tile",
        tileAction:tileActionList.SKIP_ROUND,
        flavorText:""
    },
    {
        nr:3,
        name:"tile",
        tileAction:tileActionList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:4,
        name:"tile",
        tileAction:tileActionList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:5,
        name:"tile",
        tileAction:tileActionList.SKIP_ROUND,
        flavorText:""
    },
    {
        nr:6,
        name:"tile",
        tileAction:tileActionList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:7,
        name:"tile",
        tileAction:tileActionList.MOVE_X_SPACES,
        flavorText:"",
        xSpaces: -1
    },
    {
        nr:8,
        name:"tile",
        tileAction:tileActionList.SKIP_ROUND,
        flavorText:""
    },
    {
        nr:9,
        name:"tile",
        tileAction:tileActionList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:10,
        name:"tile",
        tileAction:tileActionList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:11,
        name:"tile",
        tileAction:tileActionList.SKIP_ROUND,
        flavorText:""
    },
    {
        nr:12,
        name:"tile",
        tileAction:tileActionList.MOVE_X_SPACES,
        flavorText:"",
        xSpaces: -3
    },
    {
        nr:13,
        name:"tile",
        tileAction:tileActionList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:14,
        name:"tile",
        tileAction:tileActionList.SKIP_ROUND,
        flavorText:""
    },
    {
        nr:15,
        name:"tile",
        tileAction:tileActionList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:16,
        name:"tile",
        tileAction:tileActionList.MOVE_X_SPACES,
        flavorText:"",
        xSpaces: 3
    },
    {
        nr:17,
        name:"tile",
        tileAction:tileActionList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:18,
        name:"tile",
        tileAction:tileActionList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:19,
        name:"tile",
        tileAction:tileActionList.SKIP_ROUND,
        flavorText:""
    },
    {
        nr:20,
        name:"tile",
        tileAction:tileActionList.MOVE_X_SPACES,
        flavorText:"",
        xSpaces: 2
    },
    {
        nr:21,
        name:"tile",
        tileAction:tileActionList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:22,
        name:"tile",
        tileAction:tileActionList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:23,
        name:"tile",
        tileAction:tileActionList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:24,
        name:"tile",
        tileAction:tileActionList.SKIP_ROUND,
        flavorText:""
    },
    {
        nr:25,
        name:"tile",
        tileAction:tileActionList.MOVE_X_SPACES,
        flavorText:"",
        xSpaces: 3
    },
    {
        nr:26,
        name:"tile",
        tileAction:tileActionList.SKIP_ROUND,
        flavorText:""
    },
    {
        nr:27,
        name:"tile",
        tileAction:tileActionList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:28,
        name:"tile",
        tileAction:tileActionList.MOVE_X_SPACES,
        flavorText:"",
        xSpaces: -10
    },
    {
        nr:29,
        name:"tile",
        tileAction:tileActionList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:30,
        name:"tile",
        tileAction:tileActionList.MOVE_X_SPACES,
        flavorText:"",
        xSpaces: -5
    }
]
let allHTMLTiles = []
function polulateTileDetails(){

    ['topTiles','rightTiles','bottomTiles','leftTiles'].forEach(section => {
        section = document.getElementById(section).children
        Array.prototype.slice.call(section)
        .filter(item => item.nodeName == "LI")
        .map(item => allHTMLTiles.push(item))
    })

    let i = 0
    allHTMLTiles.forEach(element => {
        element.tileDitails = tileDitails[i]
        i++
    });
    // console.log(allHTMLTiles[4].tileDitails)
}


let tileCardDeck = []

function fetchTileCardDeck(){
    fetch("./tileCards.json")
    .then(response => response.json())
    .then(json => {
        tileCardDeck = Object.keys(json[0]).map(key => {
            json[0][key].name = key
            let tmpObj = {}
            tmpObj[key] = json[0][key]
            return tmpObj   
        })   
    })
    .then(e => {
        tileCardDeck = shuffle(tileCardDeck)
    })
}


fetchTileCardDeck()

let gameInterval

function onReady(){

    polulateTileDetails()
    
    moveToTile(player1, player1.tile)
    moveToTile(player2, player2.tile)

    player1.roundModifer = []
    player2.roundModifer = []

    player1.stats = {
            name:"Brienne of Tarth",
            ID:216,
            strength:5,
            magic:1,
            life:6,
            expiriance:0,
            gold:1,
            modefiers:[]
    }
    player2.stats = {
            name:"Jon Snow", 
            ID:583,
            strength:4,
            magic:2,
            life:6,
            expiriance:0,
            gold:1,
            modefiers:[]
    }

    updateHTMLStats()
    startRound()
    // gameInterval = setInterval(Game_Loop, 10)
}

document.addEventListener('DOMContentLoaded', onReady)