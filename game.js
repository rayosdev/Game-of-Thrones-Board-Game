
// 14 des


const STATE = {
    ROUND_SETUP:"ROUND_SETUP",
    MOVE_DICE:"MOVE_DICE",
    MOVE_PLAYER:"MOVE_PLAYER",
    END_ROUND:"END_ROUND",
    SKIP_ROUND:"SKIP_ROUND",
    MOVE_X_SPACES:"MOVE_X_SPACES",
    GAME_DRAW:"GAME_DRAW"

}

let currentStat = STATE.ROUND_SETUP

function * stateMachine() {
    switch (currentStat) {
        

        case STATE.ROUND_SETUP:
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
            yield tileActionNextFunction()
        break
        

        case STATE.END_ROUND:
            yield checkForExtraRound()
            yield checkForGameEnd()
            yield changeTurns()
            console.log("___________________________________________________")
            console.log(activePlayer.stats.name)
            changeState(STATE.ROUND_SETUP) 
        break
   



        case STATE.SKIP_ROUND:
            yield changeState(STATE.END_ROUND) 
        break
        
        
        case STATE.MOVE_X_SPACES:
            yield movePlayer(xSpaces)
            xSpaces = 0
            // yield () => {xSpaces = 0; nextGeneratorStep("... xSpace = 0")}
            // console.log("--- After Player Move")
            yield changeState(STATE.END_ROUND)
        break
        
        case STATE.GAME_DRAW:
            yield changeTurns()
            console.log("_______________DRAW ROUDN___________________________")
            console.log(activePlayer.stats.name)
            yield setupDrawDiceBtn()
            yield checkDrawDiceWinner()
            yield changeState(STATE.GAME_DRAW)
        break



    }
    
    
}


let runStateGenerator = stateMachine()

function changeState(newState) {
    currentStat = newState
    runStateGenerator = stateMachine()
    nextGeneratorStep(`... changeState(${newState})`)
    // setTimeout(() => console.log( runStateGenerator.next(), `changetate(${newState})`), 100)
}


function checkForGameEnd() {
    if(endGame && oneLastRound){
            oneLastRound = false
            console.log("One More Round")
            return nextGeneratorStep("... checkForGameEnd()")
    }
    if(endGame){
        if(playersFinsihed.length == 1){ 
            console.log(playersFinsihed[0].stats.name, " reached the end alone")
            victory(playersFinsihed[0]) 
        }
        else if(player1.overflowSteps == player2.overflowSteps){
            return changeState(STATE.GAME_DRAW)
        }else{
            console.log("overflowSteps: ", player1.overflowSteps, " | ", player2.overflowSteps)
            if(player1.overflowSteps > player2.overflowSteps){
                return victory(player1)
            }else{
                return victory(player2)
            }
            
        }
        
    }
    else{nextGeneratorStep("... checkForGameEnd()")}
   
}


function checkDrawDiceWinner() {
    // console.log("player1.gameDrawDiceThrow > 0: ", player1.gameDrawDiceThrow > 0, " : ", player1.gameDrawDiceThrow)
    if(player1.gameDrawDiceThrow > 0 && player2.gameDrawDiceThrow > 0){
        
        if(player1.gameDrawDiceThrow == player2.gameDrawDiceThrow){
            console.log("draw round was a ... mhmm ... draw .... new draw round ")
            player1.gameDrawDiceThrow = null
            player2.gameDrawDiceThrow = null
        }else{

            if(player1.gameDrawDiceThrow > player2.gameDrawDiceThrow){
                return victory(player1)
            }else{ 
                return victory(player2)
            }
        }
    }
    nextGeneratorStep("... checkDrawDiceWinner")
}


let extraRound = false
let endGame = false
let oneLastRound = false


function checkForExtraRound() {

    if(extraRound){
        changeState(STATE.ROUND_SETUP)
        extraRound = false
    }
    else{nextGeneratorStep("... checkForExtraRound()")}
}


function setupDiceMoveBtn() {
    // show(diceButton)
    diceButton.focus()

    addTmpListner(diceButton,'click', function (){
        diceRoll()
        if(diceRollNumber == 6){extraRound = true}
        // nextGeneratorStep("... setupDiceMoveBtn()")
        setTimeout( () => nextGeneratorStep("... setupDiceMoveBtn()"), 1500)
     })
}


function setupDrawDiceBtn() {
    // show(diceButton)
    diceButton.focus()

    addTmpListner(diceButton,'click', function (){
        diceRoll()
        activePlayer.gameDrawDiceThrow = diceRollNumber
        setTimeout( () => nextGeneratorStep("... setupDrawDiceBtn()"), 1000)
        
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
        case STATE.GAME_DRAW:
            changeState(STATE.GAME_DRAW)
        break

        default:
        nextGeneratorStep("... checkRoundModifiers()")
    }

    // setTimeout(() => console.log(runStateGenerator.next(), "checkRoundModifiers()"), 100)    
}


function victory(player) {
    console.log(player.stats.name, " is Victoris!!!!!!!")
    sessionStorage.setItem('victor' ,JSON.stringify(player))
    
    setTimeout( () => window.location.href = "end.html", 1000)
}


let tileActionNextFunction

function tileAction(){
    let tileNr = activePlayer.tile - 1
    let tileInfo = allHTMLTiles[tileNr].tileDitails
    console.log("TileAction: " ,tileInfo.tileAction)
    switch(tileInfo.tileAction){


        case tileActionList.DICE_OUTCOME:
            
            break

            
        case tileActionList.SKIP_ROUND:
            activePlayer.roundModifer.push('SKIP_ROUND')
            tileActionNextFunction = changeState.bind(null, STATE.END_ROUND)
            break
        

        case tileActionList.MOVE_X_SPACES:
            xSpaces = tileInfo.xSpaces
            
            tileActionNextFunction = changeState.bind(null, STATE.MOVE_X_SPACES)
            // tileActionFunction = changeState(STATE.MOVE_X_SPACES)
            break    
        

        case tileActionList.EMPTY_TILE:
            tileActionNextFunction = changeState.bind(null, STATE.END_ROUND)
            // console.log(tileActionFunction)
            break
            
            
        default:
            tileActionNextFunction = changeState.bind(null, STATE.END_ROUND)
        
    }
    console.log(tileAction)
    if(tileInfo.tileAction == tileActionList.EMPTY_TILE){return nextGeneratorStep("... Empty Tile")}
    // console.log(tileInfo)
    dialogElement.querySelector('h2').innerText = tileInfo.name 
    dialogElement.querySelector('h4').innerText = tileInfo.tileAction 
    dialogElement.querySelector('p').innerText = tileInfo.flavorText 
    dialogElement.classList.remove('hide')
    dialogElement.classList.toggle('anim-dialog-hide')
    dialogElement.querySelector('button').focus()
    
    addTmpListner(dialogElement, 'click', function () {
        dialogElement.classList.toggle('anim-dialog-hide')
        nextGeneratorStep("... dialogButton")
    })
}


//# Not in use ?
function showDialog() {
    // class="hide anim-dialog-show anim-dialog-hide"
}

//# Deprecated ?
function showInformationDialog(test) {
    console.log(Array.isArray(test))
    if(Array.isArray(test) == false){return}
    test.forEach(element => {
        console.log('que ', element)
        element()
    });
}


//# Deprecated
function endRound(){
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
    // hide(diceButton)
    let randNumber = Math.round(Math.random() * 5 + 1)
    runDiceAnimation(randNumber)
    
    //# Only for testing
    // randNumber = 6

    diceNumberLabel.innerHTML = randNumber
    show(diceNumberLabel)
    diceRollNumber = randNumber
}




const boardMovmentSpeed = 200 //      200
let playersFinsihed = []

function movePlayer(steps, nextFunction){
    
    // you get an extra round if the dice throw was 6
    let signNr = Math.sign(steps)
    
    let moveInterval = setInterval(() => {  

        if(playerOnLastTile(steps)){
            clearInterval(moveInterval)
            return changeState(STATE.END_ROUND)
        }


        moveToTile(activePlayer, activePlayer.tile + signNr)
        
        // console.log("STEPS: ", steps, " SIGNNR: ", signNr)
        console.log("steps: ", steps)
        steps -= signNr
        if(steps == 0){
            console.log("end tile: ", activePlayer.tile)
            diceRollNumber = null
            clearInterval(moveInterval)
            // nextFunction()
            nextGeneratorStep("... movePlayer()")
            // setTimeout(() => console.log(runStateGenerator.next(), "movePlayer()"), 100) 
        }
    }, boardMovmentSpeed)
}



function playerOnLastTile(steps) {
    //# Check if player is going past tile 30
    if(activePlayer.tile == 30 && steps >= 1){

        console.log("steps when on tile 30: ", steps)
        //# Save overflow of steps and start last round
        if(player1 == activePlayer){
            player1.overflowSteps = steps
            playersFinsihed.push(player1)
            oneLastRound = true
            console.log("player1: ", player1.stats.name, "  :  oneLastRound: ", oneLastRound )
        }
        if(player2 == activePlayer){
            player2.overflowSteps = steps
            playersFinsihed.push(player2)
        }
        endGame = true

        extraRound = false

        console.log(activePlayer.stats.name, "overflowSteps: ", activePlayer.overflowSteps)
        console.log("oneLastRound: ", oneLastRound)
        return true
    }    
}





function drawCard() {
    let card = tileCardDeck.shift() // shift removes first pops first item in array
    let tileCardHTML = createHTMLCard(card)
    return tileCardHTML
}

// document.addEventListener('DOMContentLoaded', startRound())




//  START ENTRY POINT


function startRound(){
    console.log("___________________________________________________")
    console.log(activePlayer.stats.name)
    changeState(STATE.ROUND_SETUP)
    // console.log(runStateGenerator.next())

}



// console.log("GOT THE VALUES? ")
// console.log(JSON.parse (sessionStorage.getItem('player1')))

// console.log(JSON.stringify(sessionStorage.getItem('player1')))
// console.log(JSON.stringify(sessionStorage.getItem('player2')))



function runDiceAnimation(number) {
    let diceImg = [
        'img/die1.svg',
        'img/die2.svg',
        'img/die3.svg',
        'img/die4.svg',
        'img/die5.svg',
        'img/die6.svg'
    ]

    diceButton.classList.add('dice-roll-anim')
    setTimeout(() => {
        diceButton.setAttribute('src', diceImg[number -1])
    },500)
    setTimeout( () => diceButton.classList.remove('dice-roll-anim'), 1500)
}