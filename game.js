
let test = true
test = true
console.log(test)


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
    resetGrapics()
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

                console.log("_IDEL: ", runOnce)
                _startRound()
            }
            if(randomDiceNumber !== 0){
                changePhase(Phase._MOVE)
            }

            break
            


        case Phase._MOVE:
            if(runOnce){
                runOnce = false

                console.log("_MOVE: ", runOnce)
                playerMovment()
            }
            
            break

            
            
        case Phase._ON_TILE:
            if(runOnce){
                runOnce = false

                console.log("_ON_TILE: ", runOnce)
                diceNumberLabel.classList.add('hide')
                tileAction()
            }

            break

            
            
        case Phase._DRAW:
            if(runOnce){
                runOnce = false

                console.log("DRAW TIME?")
                drawCard()
            }
            
            break

    }
    
}








function tileAction(){
    let tileNr = activePlayer.tileIndex - 1
    // console.log("current: ", allHTMLTiles[tileNr])
    switch(allHTMLTiles[tileNr].tileDitails.tileAction){
        
        
        case actionList.DRAW_CARD:
            changePhase(Phase._DRAW)
            break
    }
}


let randomDiceNumber = 0

function _diceRole(e){
    randomDiceNumber = Math.round(Math.random() * 5 + 1) 
    diceNumberLabel.classList.remove('hide')
    diceNumberLabel.innerText = randomDiceNumber
    
}

roleDiceButton.addEventListener("click", _diceRole)



function playerMovment(){
    let moveInterval = setInterval(e => {
        //Update player.tile property if it\s over 28 set it back to zero
        activePlayer.tile = (activePlayer.tile >= 28) ? 1 : activePlayer.tile + 1
        moveToTile(activePlayer, activePlayer.tile)
        randomDiceNumber -= 1
        //Breake interval when random number is depleated
        if(randomDiceNumber <= 0){
            clearInterval(moveInterval)
            changePhase(Phase._ON_TILE)
        }
    }, 200)
}

function drawCard() {
    // let beforeCopy = tileCardDeck.length
    let card = tileCardDeck.shift() // shift removes first pops first item in array
    let tileCardHTML = createHTMLCard(card)
    tileCardHTML.addEventListener("transitionend", e =>{
        console.log("QUW ", arguments.callee)
        this.removeEventListener("transitionend", arguments.callee)
        
    })
}


