let gameBoard = {
    "block0": 0,
    "block1": 0,
    "block2": 0,
    "block3": 0,
    "block4": 0,
    "block5": 0,
    "block6": 0,
    "block7": 0,
    "block8": 0,

}

const game = () => {

    const winCombos = [
        ["block0","block1","block2"],
        ["block0","block3","block6"],
        ["block3","block4","block5"],
        ["block6","block7","block8"],
        ["block1","block4","block7"],
        ["block2","block4","block6"],
        ["block2","block5","block8"],
        ["block0","block4","block8"]
    ];



    let turn = 0

    let winner = null

    const player = (playerName, mark) => {
        let score = 0
        const increaseScore = () => {
            return score += 1
    }

        return {playerName, mark, score, increaseScore}
    }

    const playerOne = player("playerOne", "X")
    const playerTwo = player("playerTwo", "O")

    const checkWinner = () => {
        for (let i = 0; i < 8; i++) {
            let playerOneScore = 0
            let playerTwoScore = 0
            for (let j = 0; j < 3; j++) {
                if (gameBoard[winCombos[i][j]] == "X") {
                    playerOneScore += 1
                } else if (gameBoard[winCombos[i][j]] == "O") {
                    playerTwoScore += 1
                }
                if (playerOneScore == 3) {
                    let winner = playerOne.mark 
                    const result = document.querySelector(".result")
                    if (result.textContent == ""){
                        const displayResult = document.createElement('p')
                        displayResult.textContent = `${winner} Wins the round!`
                        result.appendChild(displayResult)
                        return playerOne.mark
                    }
                } else if (playerTwoScore == 3) {
                    let winner = playerTwo.mark
                    const result = document.querySelector(".result")
                    if (result.textContent == ""){
                        const displayResult = document.createElement('p')
                        displayResult.textContent = `${winner} Wins the round!`
                        result.appendChild(displayResult)
                        return playerTwo.mark
                    }
                }
            }
        }
    }

    let drawMark = (content, position) => {
        let block = document.querySelector(`#${position}`)
        let p = document.createElement('p')
        p.style.color = "rgb(152, 193, 217)" 
        gameBoard[block.id] = playerTwo.mark
        p.textContent = content
        block.appendChild(p)
    }  
    
    let aiMove = () => {
        
        while (true) {
            position = Math.floor(Math.random() * 9);
            var key = `block${position}`
            if (gameBoard[key] != 0) {
                continue
            } else {
                break
            }
        }
        
        
        if (turn % 2 != 0) {
            if (gameBoard[key] == 0) {
                drawMark(playerTwo.mark, key)
                turn += 1
            }
        }
    }

    const blocks = document.querySelectorAll(".block")



    blocks.forEach((block) => {
        block.addEventListener('click', () => {
            const p = document.createElement("p")
            if (winner == null) {
                if (turn % 2 == 0) {
                    if (block.textContent == "") {
                        p.style.color = '#EE6C4D'
                        p.textContent = playerOne.mark
                        gameBoard[block.id] = playerOne.mark
                        block.appendChild(p)
                        turn += 1
                    }                    
                } 
                aiMove()
                winner = checkWinner()                
            }     
        })
    })
}

game()

const restart = document.querySelector(".restart")
restart.addEventListener('click', () => {
    location.reload()
})




