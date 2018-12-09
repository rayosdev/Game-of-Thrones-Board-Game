

let extraRound = false


// Entry Point
function startRound(){
    updateTurnInterface()

    let breakFlow = checkRoundModifiers()
    // console.log('breakFlow :', breakFlow)
    if(breakFlow){return}
    setupDiceMoveBtn()

}


function setupDiceMoveBtn() {
    show(diceButton)

    addTmpListner(diceButton,'click', function (){
        diceRoll(steps => movePlayer(steps,
        e => tileAction())
        )
    })
}


function checkRoundModifiers(){
    console.log(activePlayer.stats.name," : ",activePlayer.roundModifer.length)
    // console.log(activePlayer.roundModifer.shift())
    if(activePlayer.roundModifer.length == 0){return false}
    let _roundModefier = activePlayer.roundModifer.shift()
    switch(_roundModefier){
        case "SKIP_ROUND":
            showInformationDialog()
            endRound()
            return true
            break
    }

}


// generator test¨




// function * generatorTest(num) {
//     for(let i = 0; i < num; i += 1){
//         yield console.log('test', i)
//     }
// }

// const genTest = generatorTest(5)

// genTest.next()
// genTest.next()
// genTest.next()





function * gameLoop(n) {

    console.log(n)
    let gameFunctions = [
        () => {console.log("testMAN")},
        () => {console.log("test1")},
        () => {console.log("test2")},
    ]

    // for (let i = 0; i <= gameFunctions.length; i += 1) {
    //     yield console.log(i)
    // }
//     for (const func of gameFunctions) {
//         yield func()
//     }
// }

// const test = gameLoop(4)


// window.addEventListener('keypress', e =>{
//     if(e.keyCode == KEY.E){
//         console.log(test.next())
//     }
//     // console.log(e.keyCode)
// })





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
