


const STATE = {
    ROUND_SETUP:"ROUND_SETUP",
    MOVE_DICE:"MOVE_DICE",
    MOVE_PLAYER:"MOVE_PLAYER",
    END_ROUND:"END_ROUND",
    SKIP_ROUND:"SKIP_ROUND",

}

let currentStat = STATE.ROUND_SETUP

function * stateMachine() {
    switch (currentStat) {
        
        case STATE.ROUND_SETUP:
            yield updateTurnInterface()
            yield checkRoundModifiers()
            yield changeState(STATE.MOVE_DICE)
        break

        case STATE.MOVE_DICE:
            yield setupDiceMoveBtn()
            yield changeState(STATE.MOVE_PLAYER)
        break
            
        case STATE.MOVE_PLAYER:
            yield movePlayer(diceRollNumber)
            yield tileAction()     
            yield changeState(STATE.END_ROUND)  
        break
        
        case STATE.END_ROUND:
            yield changeTurns()
            changeState(STATE.ROUND_SETUP) 
        break
   
        case STATE.SKIP_ROUND:
            
            yield changeState(STATE.END_ROUND) 
        break
    }
    
    
}

let runStateGenerator = stateMachine()

function changeState(newState) {
    currentStat = newState
    runStateGenerator = stateMachine()
    nextGeneratorStep(`... changetate(${newState})`)
    // setTimeout(() => console.log( runStateGenerator.next(), `changetate(${newState})`), 100)
}



let extraRound = false



function setupDiceMoveBtn() {
    show(diceButton)

    addTmpListner(diceButton,'click', function (){
        diceRoll()
        nextGeneratorStep("... setupDiceMoveBtn()")
        // setTimeout(() => console.log( runStateGenerator.next() , "setupDiceMoveBtn()"), 100)
    })
}


function checkRoundModifiers(){

    // console.log(activePlayer.stats.name," : ",activePlayer.roundModifer.length)
    // console.log(activePlayer.roundModifer.shift())

    switch(activePlayer.roundModifer.shift()){
        case "SKIP_ROUND":
            changeState(STATE.SKIP_ROUND)
        // showInformationDialog()
        // endRound()
        // return true
        break

        default:
        nextGeneratorStep("... checkRoundModifiers()")
    }

    // setTimeout(() => console.log(runStateGenerator.next(), "checkRoundModifiers()"), 100)    
}





function showInformationDialog(test) {
    console.log(Array.isArray(test))
    if(Array.isArray(test) == false){return}
    test.forEach(element => {
        console.log('que ', element)
        element()
    });
}


// showInformationDialog([e => alert('test1'),e => alert('test2'),e => alert('test3')])
// showInformationDialog()



function tileAction(){
    let tileNr = activePlayer.tile - 1
    switch(allHTMLTiles[tileNr].tileDitails.tileAction){

        case tileActionList.DICE_OUTCOME:
            
            break
        
        case tileActionList.SKIP_ROUND:
            activePlayer.roundModifer.push('SKIP_ROUND')
            // endRound()

            break

        // case tileActionList.DRAW_CARD:
        //     setTimeout( e => {
        //         let tileCardHTML = drawCard()
        //         evaluateDrawnTileCard(tileCardHTML)
        //     }, 500) //    500
        //     break

        default:
            // endRound()
    }
    nextGeneratorStep("... tileAction()")
    // setTimeout(() => console.log(runStateGenerator.next(), "tileAction()"), 100)   
}


function endRound(){
    console.log("QUE PASSA")
    // initialise extra round
    if(extraRound){
        startRound()
        extraRound = false
        return
    }
    
    changeTurns()
    changeState(STATE.ROUND_SETUP)
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


let diceRollNumber = null

function diceRoll(actingFuction){
    hide(diceButton)
    let randNumber = Math.round(Math.random() * 5 + 1)
    
    // for testing
    randNumber = 1

    diceNumberLabel.innerHTML = randNumber
    show(diceNumberLabel)
    diceRollNumber = randNumber
    // actingFuction(randNumber)
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
            diceRollNumber = null
            clearInterval(moveInterval)
            // nextFunction()
            nextGeneratorStep("... movePlayer()")
            // setTimeout(() => console.log(runStateGenerator.next(), "movePlayer()"), 100) 
        }
    }, boardMovmentSpeed)
}




function drawCard() {
    let card = tileCardDeck.shift() // shift removes first pops first item in array
    let tileCardHTML = createHTMLCard(card)
    return tileCardHTML
}

// document.addEventListener('DOMContentLoaded', startRound())




//  START ENTRY POINT


function startRound(){
    changeState(STATE.ROUND_SETUP)
    // console.log(runStateGenerator.next())

}