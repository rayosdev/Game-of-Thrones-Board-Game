

function moveToTile(element, number){
         
    let elementPos    = {x:0, y:0}
    let elementOffset = {x:42, y:-1}

    let tilesIndex = [
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
    

    // if(number >= tilesIndex.length + 1){number = 1}

    elementPos.x = 120 * tilesIndex[number -1].x 
    elementPos.y = 120 * tilesIndex[number -1].y
    
    elementPos.x += elementOffset.x
    elementPos.y += elementOffset.y

    element.style.left = `${elementPos.x}px`
    element.style.top = `${elementPos.y}px`

    element.innerText = number
    element.tileIndex = number
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
    _startRound()
}



function createHTMLCard(card){
    // console.log("CreatecardTime:")
    let tileCard = document.getElementById('tileCard')
    let name = Object.keys(card)[0]
    let cardInner = `
        <h3 class="tile-card__name">${name}</h3>
        <div class="tile-card__image-container"></div>
        <ul class="tile-card__states-container">
            <li class="stats-item stats__strength">${ card[name].strength }</li>
            <li class="stats-item stats__magic">${ card[name].magic }</li>
            <li class="stats-item stats__life">${ card[name].lives }</li>
        </ul>
    `
    tileCard.innerHTML = cardInner
    // console.log(tileCard.children[2].children[0])
    let statsItems = Array.from(document.getElementsByClassName('stats-item'))
    statsItems.forEach(li => {
        // console.log(li.innerText)
        if(li.innerText == "undefined"){
            // console.log("found")
            li.classList.add('hide')
            // console.log(li.classList)
        }
    });

    tileCard.classList.remove('hide')
    tileCard.classList.add('tile-card--anim-appear')
    
    return tileCard
}


function resetGrapics(){
    roleDiceButton.classList.add('hide')
}


function _startRound(){
    roleDiceButton.classList.remove('hide')
    playerTurnLabel.innerHTML = `${activePlayer.id}'s turn`
}


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }