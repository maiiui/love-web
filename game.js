// Page transition button

const menuScreen = $('.start-screen')
const playBtn = $('.start-item__play')
const instructBtn = $('.start-item__instruct')
const settingBtn = $('.start-item__setting')

const playScreen = $('.play-screen')
const gameplayReturnBtn = $('.gameplay-return')
const previousSelectionBtn = $('.setting-control__previous')
const nextSelectionBtn = $('.setting-control__next')
const userCarElement = $('.usercar')
const enemyCarElements = $$('.enemycar')
const rocketElement = $('.rocket')
const getControlBtn = $('.get-control')
const explodeElement = $('.explode')

const instructScreen = $('.instruct-screen')
const instructReturnBtn = $('.instruct-return')

const settingScreen = $('.setting-screen')
const confirmSettingBtn = $('.setting-control__confirm-btn')
const carSelectImage = $('.setting-selection')

const endgameScreen = $('.endgame-screen')
const endgameReturnBtn = $('.endgame-return')

// Page transition event
gameplayReturnBtn.onclick = function() {
    playScreen.style.display = 'none'
    menuScreen.style.display = 'flex'
    handleGameOver()
    setTimeout(function() {
        endgameReturnBtn.click()
    }, 1000)
}

endgameReturnBtn.onclick = function() {
    endgameScreen.style.display = 'none'
    menuScreen.style.display = 'flex'
}


instructBtn.onclick = function() {
    menuScreen.style.display = 'none'
    instructScreen.style.display = 'flex'
}
instructReturnBtn.onclick = function() {
    instructScreen.style.display = 'none'
    menuScreen.style.display = 'flex'
}


settingBtn.onclick = function() {
    menuScreen.style.display = 'none'
    settingScreen.style.display = 'flex'
}


// Select car in setting
var carSelect = 1
var lives = 3
const gameAbilityImage = $('.game-ability__image')
const livesDisplay = $('.lives-remain')

previousSelectionBtn.onclick = function() {
    if(carSelect === 1) {
        carSelect = 3
    } else {
        carSelect--
    }
    carSelectImage.style.backgroundImage = `url('./assets/images/choose${carSelect}.jpg')`
}

nextSelectionBtn.onclick = function() {
    if(carSelect === 3) {
        carSelect = 1
    } else {
        carSelect++
    }
    carSelectImage.style.backgroundImage = `url('./assets/images/choose${carSelect}.jpg')`
}

confirmSettingBtn.onclick = function() {
    settingScreen.style.display = 'none'
    menuScreen.style.display = 'flex'
    if(carSelect == 1) {
        gameAbilityImage.style.backgroundImage = 'url(./assets/images/ghost.jpg)'
        userCar.element.style.backgroundImage = 'url(./assets/images/xe1.jpg)'
        livesDisplay.style.display = 'none'
        $('.game-ability__instruct').style.display = 'flex'
    }
    if(carSelect == 2) {
        gameAbilityImage.style.backgroundImage = 'url(./assets/images/heart.jpg)'
        $('.game-ability__instruct').style.display = 'none'
        livesDisplay.style.display = 'block'
        livesDisplay.innerText = `${lives}   x`
        userCar.element.style.backgroundImage = 'url(./assets/images/xe2.jpg)'
    }   
    if(carSelect == 3) {
        gameAbilityImage.style.backgroundImage = 'url(./assets/images/rocket2.jpg)'
        userCar.element.style.backgroundImage = 'url(./assets/images/xe3.jpg)'
        livesDisplay.style.display = 'none'
        $('.game-ability__instruct').style.display = 'flex'
    }
}

// Constant variables
const carWidth = 40
const carHeight = 60
const distance = 400
const stepWidth = 72
const firstPositionX = 115
const firstPositionY = 330
const lastPositionX = 331
const lastPositionY = 20
const userSpeed = 20
const minSpeed = 12

function Car(x, y, speed, element) {
    this.x = x
    this.y = y
    this.speed = speed
    this.element = element
    this.moveElement = function() {
        this.element.style.left = this.x + "px"
        this.element.style.top = this.y + "px"
    }
}

const userCar = new Car(firstPositionX, firstPositionY, userSpeed, userCarElement)
const enemyCars = []
enemyCarElements.forEach(function(enemyCarElement, enemyIndex) {
    enemyCars.push(new Car(115 + enemyIndex * stepWidth, -carHeight, minSpeed, enemyCarElement))
    enemyCars[enemyIndex].moveElement()
    enemyCars[enemyIndex].element.style.backgroundImage = `url(./assets/images/enemy${enemyIndex + 1}.jpg)`
    enemyCars[enemyIndex].ifRun = false
})
const rocket = new Car(firstPositionX, firstPositionY, minSpeed, rocketElement)

var ifClearGameloop = false
var runGame = undefined
var currentScore = 0
var bestScore = 0
var notCheckCrash = 0
var cooldownTime = 0
var ifLaunch = false
var explodeCount = 0


function handleUserControl(key) {
    if (key == 37 && userCar.x > firstPositionX) {
       userCar.x -= stepWidth 
       userCar.moveElement()
    }
    if (key == 38 && userCar.y > lastPositionY) {
        userCar.y -= userCar.speed 
        userCar.moveElement()
    }
    if (key == 39 && userCar.x < lastPositionX) {
        userCar.x += stepWidth 
        userCar.moveElement()
    }
    if (key == 40 && userCar.y < firstPositionY) {
        userCar.y += userCar.speed 
        userCar.moveElement()
    }
    if (key == 32 && cooldownTime <= 0) {
        if (carSelect == 1) {
            notCheckCrash = 50
            cooldownTime = 240
        }
        if (carSelect == 3) {
            ifLaunch = true
            cooldownTime = 100
            rocket.x = userCar.x
            rocket.y = userCar.y
        }
    }
}

getControlBtn.onkeydown = function(e) {
    if (!ifClearGameloop) {
        handleUserControl(e.keyCode)
    }
}

function isCrash(enemycar, userCar) {
    // Check if crash head car
    const condition1 = (enemycar.y + carHeight > userCar.y) && (enemycar.y < userCar.y)
    // Check if crash tail car
    const condition2 = (userCar.y + carHeight > enemycar.y) && (userCar.y < enemycar.y)
    // Check if in the same lane
    const condition3 = (enemycar.x < userCar.x + 3) && (enemycar.x > userCar.x - 3)
    if ((condition1 || condition2) && condition3) {
        explodeElement.style.top = enemycar.y + 'px'
        explodeElement.style.left = enemycar.x + 'px'
        explodeElement.style.display = 'block'
        explodeCount = 8
        enemycar.y = -carHeight
        enemycar.ifRun = false
        if(carSelect == 2 && lives > 0) {
            enemycar.moveElement()
        }
        return true
    } 
    return false
}

function explode() {
    if(explodeCount >= 1) {
        explodeElement.style.backgroundImage = 'url(./assets/images/explode4.jpg)'
        explodeCount--
    }
    if(explodeCount >= 3) {
        explodeElement.style.backgroundImage = 'url(./assets/images/explode3.jpg)'
        explodeCount--
    }
    if(explodeCount >= 5) {
        explodeElement.style.backgroundImage = 'url(./assets/images/explode2.jpg)'
        explodeCount--
    }
    if(explodeCount >= 7) {
        explodeElement.style.backgroundImage = 'url(./assets/images/explode1.jpg)'
        explodeCount--
    }
    if(explodeCount <= 0) {
        explodeElement.style.display = 'none'
    }
}

function prepareGame() {
    getControlBtn.focus()
    ifClearGameloop = false
    cooldownTime = 0
    handleCooldownTime()
    notCheckCrash = 0
    activeGhostCar()
    lives = 3
    livesDisplay.innerText = `${lives}`
    enemyCars.forEach(function(enemycar, index) {
        enemycar.y = -carHeight
        enemycar.ifRun = false
        enemycar.speed = minSpeed
        enemycar.moveElement()
    })
    userCar.x = firstPositionX
    userCar.y = firstPositionY
    userCar.moveElement()
    if(runGame) {
        clearInterval(runGame)
    }
    currentScore = 0
}

function handleGameOver() {
    ifClearGameloop = true
    setTimeout(function() {
        endgameScreen.style.display = 'flex'
        playScreen.style.display = 'none'
    }, 1000)
}

const cooldownDesc = $('.ability-cooldown')
const abilityDesc = $('.game-ability')
const cooldownTimeDisplay = $('.ability-cooldown__time')
const abilityActiveDisplay = $('.ability-active')
const abilityTimeDisplay = $('.ability-active__time')
const raceGround = $('.race-ground')


function handleCooldownTime() {
    if (cooldownTime > 0) {
        cooldownTime--
        cooldownTimeDisplay.innerText = `${cooldownTime}`
        cooldownDesc.style.display = 'flex'
        abilityDesc.style.display = 'none'
    } else {
        cooldownDesc.style.display = 'none'
        abilityDesc.style.display = 'flex'
    }
}

function activeGhostCar() {
    if (notCheckCrash > 0) {
        notCheckCrash--
        abilityTimeDisplay.innerText = `${notCheckCrash}`
        abilityActiveDisplay.style.display = 'flex'
        userCar.element.style.backgroundImage = 'url(./assets/images/powercar1.jpg)'
    } else {
        abilityActiveDisplay.style.display = 'none'
        userCar.element.style.backgroundImage = 'url(./assets/images/xe1.jpg)'
    }
}

function countLives() {
    if (lives > 0) {
        lives--
        livesDisplay.innerText = `${lives}`
        notCheckCrash = 15
    }
     else {
        handleGameOver()
    }
}

function launchRocket() {
    // console.log(ifLaunch)
    if (ifLaunch) {
        rocketElement.style.display = 'block'
        rocket.y -= rocket.speed
        rocket.moveElement()
        if (ifDestroyEnemy()) {
            ifLaunch = false
        }
    } else {
        rocketElement.style.display = 'none'
    }
}

function ifDestroyEnemy() {
    for (let i = 0; i < 4; i++) {
        if (isCrash(enemyCars[i], rocket)) {
            enemyCars[i].moveElement()
            return true
        }
    }
    return false
}

function moveEnemyCars() {
    enemyCars.forEach(function(enemycar, index) {
        if(currentScore > (enemycar.speed - minSpeed + 1) * 60) {
            enemycar.speed ++
        }
        if(enemycar.ifRun) {
            enemycar.y += enemycar.speed
            enemycar.moveElement()
        } else {
            enemycar.ifRun = Math.floor(Math.random() + 0.06)
        }
        if(enemycar.y >= distance + carHeight) {
            enemycar.y = -carHeight
            enemycar.ifRun = false
        }
        if (!ifClearGameloop && !notCheckCrash && isCrash(enemycar, userCar)) {
            if (carSelect == 2) {
                countLives()
            } else {
                handleGameOver()
            }
        }
    })
}

function displayScore() {
    $$('.current-score').forEach(function(scoreHtml) {
        scoreHtml.innerText = `Your score: ${currentScore}`
    }) 
    $$('.best-score').forEach(function(scoreHtml) {
        scoreHtml.innerText = `Best score: ${bestScore}`
    }) 
}

function calcScore() {
    currentScore++
    if(currentScore >= bestScore) {
        bestScore = currentScore
    }
}

function gameloop() {
    moveEnemyCars()
    if(carSelect == 1) {
        handleCooldownTime()
        activeGhostCar()
    }
    if(carSelect == 2) {
        activeGhostCar()
    }
    if(carSelect == 3) {
        launchRocket()
        handleCooldownTime()
    }
    if(!ifClearGameloop) {
        calcScore()
    }
    explode()
    displayScore()
}

playBtn.onclick = function() {
    menuScreen.style.display = 'none'
    playScreen.style.display = 'flex'
    prepareGame()
    raceGround.style.backgroundImage = 'url(./assets/images/gamestart1.jpg)'
    setTimeout(function() {
        raceGround.style.backgroundImage = 'url(./assets/images/gamestart2.jpg)'
    }, 1000)
    setTimeout(function() {
        raceGround.style.backgroundImage = 'url(./assets/images/gamestart3.jpg)'
    }, 2000)
    setTimeout(function() {
        raceGround.style.backgroundImage = 'url(./assets/images/way.jpg)'
    }, 3000)
    setTimeout(function() {
        runGame = setInterval(gameloop, 80)
    }, 3000)
}



// Always focus
getControlBtn.onblur = function() {
    getControlBtn.focus()
}


