
let Phase = {
    _IDEL   :1,
    _MOVE   :2,
    _ON_TILE:3,
    _DRAW   :4,
    _FIGHT  :5,
    _END_ROUND:6
}

let CurrentPhase = Phase._IDEL

function changePhase(_phase){
    console.log("Phase_chnaged from: ", getKeyByValue(Phase, CurrentPhase), " to: ", getKeyByValue(Phase, _phase))
    runOnce = true
    CurrentPhase = _phase
}

let runOnce = true

function Game_Loop(){
    switch(CurrentPhase){
        


        case Phase._IDEL:
            if(runOnce){
                runOnce = false

                // console.log("_IDEL: ", runOnce)
                startRound()
            }
            if(randomDiceNumber !== 0){
                changePhase(Phase._MOVE)
            }

            break
            


        case Phase._MOVE:
            if(runOnce){
                runOnce = false

                // console.log("_MOVE: ", runOnce)
                playerMovment()
            }
            
            break

            
            
        case Phase._ON_TILE:
            if(runOnce){
                runOnce = false

                // console.log("_ON_TILE: ", runOnce)
                diceNumberLabel.classList.add('hide')
                tileAction()
            }

            break

            
            
        case Phase._DRAW:
            if(runOnce){
                runOnce = false

                // console.log("DRAW TIME?")
                drawCard()
            }
            
            break

            
            
        case Phase._FIGHT:
            if(runOnce){
                runOnce = false
                diceButton.classList.remove('hide')
            }
            
            if(randomDiceNumber != 0){

                gatherDamage(randomDiceNumber)
                randomDiceNumber = 0
            }
            break

    }
    
}







function startRound(){
    updateTurnInterface()
    show(diceButton)
    
    diceButton.addEventListener('click', 
    function tmpListner() {
    diceRoll(
    steps => movePlayer(steps,
    e => tileAction()
    ))
    diceButton.removeEventListener('click', tmpListner)
    })

}


function tileAction(){
    let tileNr = activePlayer.tile - 1
    switch(allHTMLTiles[tileNr].tileDitails.tileAction){
        
        case tileActionList.DRAW_CARD:
            setTimeout( e => {
                let tileCardHTML = drawCard()
                evaluateDrawnTileCard(tileCardHTML)
            }, 500)
            break
    }
}


function evaluateDrawnTileCard(tileCardHTML) {
    
        let card = tileCardHTML.cardInfo
        const cardType = card[Object.keys(card)[0]].cardType
        let tmpListner = tileCardHTML.addEventListener("animationend", e =>{
            this.removeEventListener("animationend", tmpListner)
            switch (cardType){
    
                case "FIGHT":
                    setTimeout(e => startFight(card), 500)
                    break
            }
        })
}


function startFight(enemy) {
    
    show(diceButton)
}






function diceRoll(actingFuction){
    hide(diceButton)
    let randNumber = Math.round(Math.random() * 5 + 1)
    diceNumberLabel.innerHTML = randNumber
    show(diceNumberLabel)
    actingFuction(randNumber)
}




function gatherDamage(diceNumber){
    // console.log(card)
}









const boardMovmentSpeed = 200

function movePlayer(steps, nextFunction){

    let moveInterval = setInterval(e => {  
        moveToTile(activePlayer, activePlayer.tile + 1)
    
        steps -= 1
        if(steps <= 0){
            clearInterval(moveInterval)
            nextFunction()
        }
    }, boardMovmentSpeed)
}




function drawCard() {
    let card = tileCardDeck.shift() // shift removes first pops first item in array
    let tileCardHTML = createHTMLCard(card)
    return tileCardHTML
}
