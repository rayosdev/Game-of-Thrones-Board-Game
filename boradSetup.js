
    let tiles = document.getElementsByClassName('tile')
    let player1 = document.getElementById('player1')
    let player2 = document.getElementById('player2')
    player1.tileIndex = 0
    player2.tileIndex = 0

    let roleDiceButton = document.getElementById('roleDiceButton')
    
    let activePlayer = player1
    let playerTurnLabel = document.getElementsByClassName('player-turn-label')[0]
    let diceNumberLabel = document.getElementsByClassName('dice-number-label')[0]

    


//Tile actions
let actionList = {
    DRAW_CARD: "DRAW_CARD",

}

let tileDitails = [
    {
        nr:1,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:2,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:3,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:4,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:5,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:6,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:7,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:8,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:9,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:10,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:11,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:12,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:13,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:14,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:15,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:16,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:17,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:18,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:19,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:20,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:21,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:22,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:23,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:24,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:25,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:26,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:27,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:28,
        name:"tile",
        tileAction:actionList.DRAW_CARD,
        flavorText:""
    },
]
let allHTMLTiles = []

function polulateTileDetails(){
    let topTiles    = document.getElementById('topTiles').childNodes
    topTiles = Array.prototype.slice.call(topTiles).filter(item => item.nodeName == "LI").map(item => allHTMLTiles.push(item))
    let rightTiles  = document.getElementById('rightTiles').childNodes
    rightTiles = Array.prototype.slice.call(rightTiles).filter(item => item.nodeName == "LI").map(item => allHTMLTiles.push(item))
    let bottomTiles = document.getElementById('bottomTiles').childNodes
    bottomTiles = Array.prototype.slice.call(bottomTiles).filter(item => item.nodeName == "LI").map(item => allHTMLTiles.push(item))
    let leftTiles   = document.getElementById('leftTiles').childNodes
    leftTiles = Array.prototype.slice.call(leftTiles).filter(item => item.nodeName == "LI").map(item => allHTMLTiles.push(item))

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

    player1.tile = 1
    player2.tile = 1
    
    moveToTile(player1, player1.tile)
    moveToTile(player2, player2.tile)

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
    gameInterval = setInterval(Game_Loop, 10)
}

document.addEventListener('DOMContentLoaded', onReady)