


// Entry Point
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
            }, 500) //    500
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
                    setTimeout(e => fight(card), 500) //     500
                    break
            }
        })
}



function fight(enemy) {
    playerDamage = 0
    EnemyDamage = 0

    show(diceButton)
    diceButton.addEventListener('click', 
    function listner() {
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

    endListner(diceButton, 'click',listner)
    })
}

diceRoll( test => console.log("test: ", test))

// 'function moveToElement(elementA, elementB){
//     let elmA = {}
//     let elmB = {}
//     console.log(elementB)
//     elementA.style.position = "relative"
//     elementA.classList.add('move-tranisiton')
//     elmA.x = elementPos(elementA).left
//     elmA.y = elementPos(elementA).top
//     elmB.x = elementPos(elementB).left
//     elmB.y = elementPos(elementB).top
//     // console.log(elm)
//     // elementA.style.transform = `translate3d(${(elmB.x - elmA.x) * 2.7}px, ${(elmB.y - elmA.y) * 2.7}px, 0)`
//     elementA.style.transform = `translate3d(${(elmB.x - elmA.x) * 3.2}px, ${(elmB.y - elmA.y) * 3.2}px, 0)`
    
// }




// function moveElement(element, vector2D){
//     element.style.left = `${vector2D.x}px`
//     element.style.top = `${vector2D.y}px`
// }





function elementPos(obj){return obj.getClientRects()[0]}



function diceRoll(actingFuction){
    hide(diceButton)
    let randNumber = Math.round(Math.random() * 5 + 1)
    diceNumberLabel.innerHTML = randNumber
    show(diceNumberLabel)
    actingFuction(randNumber)
}




const boardMovmentSpeed = 200 //      200

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
