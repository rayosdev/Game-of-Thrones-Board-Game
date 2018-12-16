let victoryEmblem = document.getElementById('victoryEmblem')
        let playerInstructions = document.getElementById('playerInstructions')
        let coatOfArms = document.getElementById('coatOfArms')
        
        
        let victor = JSON.parse (sessionStorage.getItem('victor'))
        console.log(victor.stats.name)
        
        switch (victor.stats.name) {
            case "Jon Snow":
                victoryEmblem.setAttribute('src', "img/victory emblem jon.svg") 
                playerInstructions.innerText = `You “${victor.stats.name}”, Alone survived the journey North`
                coatOfArms.setAttribute('src', "img/Shild Wolf.svg")
                break;
        
            
            case "Daenerys Targaryen":
                victoryEmblem.setAttribute('src', "img/victory emblem dyneris.svg") 
                playerInstructions.innerText = `You “${victor.stats.name}”, Alone survived the journey North`
                coatOfArms.setAttribute('src', "img/Shild Dragon.svg")
                break;
        

            case "Tyrion Lannister":
                victoryEmblem.setAttribute('src', "img/victory emblem tyrian.svg") 
                playerInstructions.innerText = `You “${victor.stats.name}”, Alone survived the journey North`
                coatOfArms.setAttribute('src', "img/Shild Lion.svg")
                break;
        

            case "Brienne of Tarth":
                victoryEmblem.setAttribute('src', "img/victory emblem brian.svg") 
                playerInstructions.innerText = `You “${victor.stats.name}”, Alone survived the journey North`
                coatOfArms.setAttribute('src', "img/Shild Dear.svg")
                break;
        
            
        }

        document.getElementById('playButton').addEventListener('click', e =>{
            window.location.href = "index.html"
        }) 