
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
    function listner() {
    diceRoll(
    steps => movePlayer(steps,
    e => tileAction()
    ))
    endListner(diceButton,'click', listner)
    })

}


function tileAction(){
    let tileNr = activePlayer.tile - 1
    switch(allHTMLTiles[tileNr].tileDitails.tileAction){
        
        case tileActionList.DRAW_CARD:
            setTimeout( e => {
                let tileCardHTML = drawCard()
                evaluateDrawnTileCard(tileCardHTML)
            }, 5) //    500
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
                    setTimeout(e => fight(card), 5) //     500
                    break
            }
        })
}


// window.addEventListener('click', function test(){
//     this.console.log("nice")
//     this.endListner('click', test)
// })



// function player(e) {
//     console.log("test ", e)
// }


function fight(enemy) {
    playerDamage = 0
    EnemyDamage = 0

    show(diceButton)
    diceButton.addEventListener('click', 
    function listner() {
    diceRoll(
    diceDamage => {
        
        function showDamageLabel(actor, strength, magic){
            if(actor == "Player"){
                show(playerDamageLabel)
                playerDamageLabel.innerText = 
                `Player Damage: ${(strength)? strength:magic} + ${diceDamage} = ${playerDamage}`
            }
        }


        playerDamage += diceDamage
        if('strength' in enemy[Object.keys(enemy)[0]]){
            playerDamage += activePlayer.stats.strength
            showDamageLabel("Player", activePlayer.stats.strength, null)
            moveToElement(diceNumberLabel, document.getElementById("playerStrength", 1000))
            
        }
        if('magic' in enemy[Object.keys(enemy)[0]]){
            playerDamage += activePlayer.stats.magic
            showDamageLabel("Player", null, activePlayer.stats.magic)
            moveToElement(diceNumberLabel, document.getElementById("playerMagic", 1000))
        }
        

        
    }
    )
    endListner(diceButton, 'click',listner)
    })
}



function moveToElement(elementA, elementB, speed){
    console.log(elementA, " : ", elementB)
    let interval = setInterval(e => {
        // elementPos(elementA).x += elementPos(elementA).x - elementPos(elementB).x
        elementA.getClientRects().left = 100
        console.log(elementPos(elementA).left)
    }, speed)
}

moveToElement(
    document.getElementById("testDiv"), 
    document.getElementById("testDiv2"), 200)


function elementPos(obj){return obj.getClientRects()[0]}



function diceRoll(actingFuction){
    hide(diceButton)
    let randNumber = Math.round(Math.random() * 5 + 1)
    diceNumberLabel.innerHTML = randNumber
    show(diceNumberLabel)
    actingFuction(randNumber)
}




const boardMovmentSpeed = 2 //      200

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
