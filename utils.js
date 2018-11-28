

function moveToTile(element, number){
         
    let elementPos    = {x:0, y:0}
    let elementOffset = {x:42, y:-1}

    let tileVectors = [
    //Top Side
        {x:0,y:0},
        {x:1,y:0},
        {x:2,y:0},
        {x:3,y:0},
        {x:4,y:0},
        {x:5,y:0},
        {x:6,y:0},
        {x:7,y:0},
                    //Right Side
        {x:7,y:1},
        {x:7,y:2},
        {x:7,y:3},
        {x:7,y:4},
        {x:7,y:5},
        {x:7,y:6},
                    //Bottom Side
        {x:7,y:7},
        {x:6,y:7},
        {x:5,y:7},
        {x:4,y:7},
        {x:3,y:7},
        {x:2,y:7},
        {x:1,y:7},
        {x:0,y:7},
                    //Left Side
        {x:0,y:6},
        {x:0,y:5},
        {x:0,y:4},
        {x:0,y:3},
        {x:0,y:2},
        {x:0,y:1}
    ] 
    
    if(number > tileVectors.length){number = 1}

    elementPos.x = 120 * tileVectors[number -1].x 
    elementPos.y = 120 * tileVectors[number -1].y
    
    elementPos.x += elementOffset.x
    elementPos.y += elementOffset.y

    element.style.left = `${elementPos.x}px`
    element.style.top = `${elementPos.y}px`

    element.innerText = number
    element.tile = number
}




function shuffle(array){
    let i = 0
    for (const item of array) {
        let j = Math.floor(Math.random() * (i))
        let tmpI = array[i]
        let tmpJ = array[j]
        array[i] = tmpJ
        array[j] = tmpI 
        i++
    }
    return array
    
    //-------FOR REFACTORING
        // function shuffle(a) {
        //     for (let i = a.length - 1; i > 0; i--) {
        //         const j = Math.floor(Math.random() * (i + 1));
        //         [a[i], a[j]] = [a[j], a[i]];
        //     }
        //     return a;
        // }

}





function flipTurns(){
    if(activePlayer.id == 'player1'){activePlayer = player2}
    else{activePlayer = player1}
    // startRound()
    updateTurnInterface()
}





function createHTMLCard(card){
    // console.log("CreatecardTime:")
    let tileCard = document.getElementById('tileCard')
    let name = Object.keys(card)[0]
    let cardInner = `
        <h3 class="tile-card__name">${name}</h3>
        <div class="tile-card__image-container"></div>
        <ul class="tile-card__stats-container">
            <li class="tile-card__stat stats__strength id="tileCardStrenght">${ card[name].strength }</li>
            <li class="tile-card__stat stats__magic" id="tileCardMagic">${ card[name].magic }</li>
            <li class="tile-card__stat stats__life" id="tileCardLife">${ card[name].lives }</li>
        </ul>
    `
    tileCard.innerHTML = cardInner
    // console.log(tileCard.children[2].children[0])
    let cardStat = Array.from(document.getElementsByClassName('tile-card__stat'))
    cardStat.forEach(li => {
        if(li.innerText == "undefined"){hide(li)}
    });
    show(tileCard)
    tileCard.classList.add('tile-card--anim-appear')
    
    tileCard.cardInfo = card
    return tileCard
}




//DEPRECTTED
function resetGrapics(){
    roleDiceButton.classList.add('hide')
}




function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }



function updateHTMLStats() {
    let strengthStatHTML    = document.getElementById('playerStrength')
    let magicStatHTML       = document.getElementById('playerMagic')
    let expStatHTML         = document.getElementById('playerExpiriance')
    let goldStatHTML        = document.getElementById('playerGold')
    let lifeStatHTML        = document.getElementById('playerLife')
    
    let playerNaneHTML        = document.getElementById('playerNameHTML')


    playerNaneHTML.innerText = activePlayer.stats.name
    
    strengthStatHTML.querySelector('.stat-item__number').innerText  = activePlayer.stats.strength
    magicStatHTML.querySelector('.stat-item__number').innerText     = activePlayer.stats.magic
    expStatHTML.querySelector('.stat-item__number').innerText       = activePlayer.stats.expiriance
    goldStatHTML.querySelector('.stat-item__number').innerText      = activePlayer.stats.gold
    lifeStatHTML.querySelector('.stat-item__number').innerText      = activePlayer.stats.life

}



function updateTurnInterface() {
    playerTurnLabel.innerHTML = `${activePlayer.id}'s turn`
    updateHTMLStats()
}

// player-name-label

function endListner(element ,event, funcName){
    element.removeEventListener(event, funcName)
}