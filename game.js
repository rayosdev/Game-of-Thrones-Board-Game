

let extraRound = false


// Entry Point
function startRound(){
    updateTurnInterface()

    let breakFlow = checkRoundModifiers()
    if(breakFlow){return}

    setupMovmentDice()

}


function setupMovmentDice() {
    show(diceButton)

    addTmpListner(diceButton,'click', function (){
        diceRoll(steps => movePlayer(steps,
        e => tileAction())
        )
    })
}


function checkRoundModifiers(){
    console.log(activePlayer.roundModifer.shift())
    console.log(activePlayer.roundModifer.length)
    if(activePlayer.roundModifer.length >= 0){return false}
    switch(activePlayer.roundModifer.shift()){
        case "SKIP_ROUND":
            console.log("round skipt")
            endRound()
            break
    }
}





function tileAction(){
    let tileNr = activePlayer.tile - 1
    switch(allHTMLTiles[tileNr].tileDitails.tileAction){

        case tileActionList.DICE_OUTCOME:
            
            break
        
        case tileActionList.SKIP_ROUND:
            activePlayer.roundModifer.push('SKIP_ROUND')
            endRound()
            break

        // case tileActionList.DRAW_CARD:
        //     setTimeout( e => {
        //         let tileCardHTML = drawCard()
        //         evaluateDrawnTileCard(tileCardHTML)
        //     }, 500) //    500
        //     break

        default:
            endRound()
    }
}


function endRound(){
    
    // initialise extra round
    if(extraRound){
        startRound()
        extraRound = false
        return
    }

    flipTurns()
    startRound()
}


function evaluateDrawnTileCard(tileCardHTML) {
    
        let card = tileCardHTML.cardInfo
        const cardType = card[Object.keys(card)[0]].cardType
        let tmpListner = tileCardHTML.addEventListener("animationend", e =>{
            this.removeEventListener("animationend", tmpListner)
            switch (cardType){
    
                case "FIGHT":
                    setTimeout(e => startFight(card), 500) //     500
                    break
            }
        })
}



function startFight(enemy) {
    playerDamage = 0
    EnemyDamage = 0

    show(diceButton)
    // diceButton.addEventListener('click', 
    // function listner() {

    
    addTmpListner(diceButton,'click', function (){
    diceRoll(
    playerDiceDamage => {
        
        // let strengthStat = document.getElementById("playerStrength")
        // let magicStat = document.getElementById("playerMagic")
        
        playerDamage += playerDiceDamage
        if('strength' in enemy[Object.keys(enemy)[0]]){
            playerDamage += activePlayer.stats.strength
            showDamageLabel("Player", activePlayer.stats.strength, null, playerDiceDamage)
        }
        if('magic' in enemy[Object.keys(enemy)[0]]){
            playerDamage += activePlayer.stats.magic
            showDamageLabel("Player", null, activePlayer.stats.magic, playerDiceDamage)
        } 
        
    }, 
    diceRoll(
    enemyDiceDamage => {
        console.log("enemyDiceDamage: ", enemyDiceDamage)

        let strengthStat = document.getElementById("tileCardStrenght")
        let magicStat = document.getElementById("tileCardMagic")
        
        console.log(strengthStat)

        enemyDamage += enemyDiceDamage
        if('strength' in enemy[Object.keys(enemy)[0]]){
            enemyDamage += activePlayer.stats.strength
            showDamageLabel("Player", activePlayer.stats.strength, null, enemyDiceDamage)
        }
        if('magic' in enemy[Object.keys(enemy)[0]]){
            enemyDamage += activePlayer.stats.magic
            showDamageLabel("Player", null, activePlayer.stats.magic, enemyDiceDamage)
        } 
        
    }))

    // coment

    function showDamageLabel(actor, strength, magic, diceDamage){    

        if(actor == "Player"){
            show(playerDamageLabel)
            playerDamageLabel.innerText = 
            `Player Damage: ${(strength)? strength:magic} + ${diceDamage} = ${playerDamage}`
        }
        if(actor == "Enemy"){
            show(enemyDamageLabel)
            enemyDamageLabel.innerText = 
            `Player Damage: ${(strength)? strength:magic} + ${diceDamage} = ${playerDamage}`
        }
    }

    // endListner(diceButton, 'click',listner)
    })
}



function elementPos(obj){return obj.getClientRects()[0]}



function diceRoll(actingFuction){
    hide(diceButton)
    let randNumber = Math.round(Math.random() * 5 + 1)
    
    // for testing
    randNumber = 1

    diceNumberLabel.innerHTML = randNumber
    show(diceNumberLabel)
    actingFuction(randNumber)
    // actingFuction(30)
}




const boardMovmentSpeed = 200 //      200

function movePlayer(steps, nextFunction){

    // you get an extra round if the dice throw was 6
    if(steps == 6){
        extraRound = true
    }
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
