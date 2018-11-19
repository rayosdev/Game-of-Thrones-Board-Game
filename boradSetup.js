
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
    console.log(allHTMLTiles[4].tileDitails)
}

let tileCardDeck = []

function fetchTileCardDeck(){
    fetch("./tileCards.json")
    .then(response => response.json())
    .then(json => {
        // tileCardDeck = json[0]
        // let count = 0
        for (const key in json[0]) {
            let new_item = {}
            new_item[key] = json[0][key]
            tileCardDeck.push(new_item)
        }
        
    })
    .then(e => {
        tileCardDeck = shuffle(tileCardDeck)
    })
}

fetchTileCardDeck()

let gameInterval

function _onReady(){

    polulateTileDetails()

    player1.tile = 1
    player2.tile = 1
    
    moveToTile(player1, player1.tile)
    moveToTile(player2, player2.tile)
    
    gameInterval = setInterval(Game_Loop, 10)
}

document.addEventListener('DOMContentLoaded', _onReady)