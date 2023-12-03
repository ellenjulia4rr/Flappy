const wmFlappy = document.querySelector('[wm-flappy]')

const bird = document.createElement('span')
bird.classList.add('bird')
wmFlappy.appendChild(bird)

let isBirdFlapped = false
const voo = () => {
    if (!isBirdFlapped) {
        bird.style.backgroundImage = 'url("./imgs/passaro2.png")'
        isBirdFlapped = true
    }

    setTimeout(() => {
        bird.style.backgroundImage = 'url("./imgs/passaro1.png")'
        isBirdFlapped = false 
    }, 200)

    moverBirdUp(80)
}

document.addEventListener('keydown', voo)

const queda = setInterval(() => {
    moveBirdDown(8)
    checkBirdPosition()
}, 50)

function moverBirdUp(px) {
    let currentBottom = parseInt(window.getComputedStyle(bird).bottom)

    bird.style.bottom = `${currentBottom + px}px`
}

function moveBirdDown(px) {
    let currentBottom = parseInt(window.getComputedStyle(bird).bottom)

    bird.style.bottom = `${currentBottom - px}px`
}

function checkBirdPosition() {
    let windowHeight = wmFlappy.offsetHeight
    let birdBottom = parseInt(window.getComputedStyle(bird).bottom)
    let birdTop = parseInt(window.getComputedStyle(bird).top)

    if (birdTop <= 0) {
        bird.style.bottom = (windowHeight - bird.clientHeight) + 'px';
    }

    if (birdBottom <= 0) {
        bird.style.bottom = '-9px'
    }
}

const contador = document.createElement('div')
contador.classList.add('progresso')
contador.innerHTML = '0'
wmFlappy.appendChild(contador)

function criarBarreiras() {
    const wmFlappy = document.querySelector('[wm-flappy]')
    const espacamentoEntreBarreiras = 150      
    const alturaViewport = wmFlappy.offsetHeight
    const espacamentoEntreBarreirasVH = 30
    const espacamentoEntreBarreirasH = (espacamentoEntreBarreirasVH / 100) * alturaViewport

    let leftOffset = wmFlappy.offsetWidth
    function criarBarreira(left) {
        const alturaBarreiraSuperior = Math.floor(Math.random() * (alturaViewport - espacamentoEntreBarreirasH))
        const alturaBarreiraInferior = alturaViewport - alturaBarreiraSuperior - espacamentoEntreBarreirasH

        const barrierTop = document.createElement('div')
        barrierTop.classList.add('barrier-top', 'barreira')
        barrierTop.style.height = `${alturaBarreiraSuperior}px`
        barrierTop.style.left = `${left}px`

        const barrierBottom = document.createElement('div')
        barrierBottom.classList.add('barrier-bottom', 'barreira')
        barrierBottom.style.height = `${alturaBarreiraInferior}px`
        barrierBottom.style.left = `${left}px`

        wmFlappy.appendChild(barrierBottom)
        wmFlappy.appendChild(barrierTop)
    }

    while (leftOffset < wmFlappy.offsetWidth * 2) {
        criarBarreira(leftOffset)
        leftOffset += espacamentoEntreBarreiras + 320
    }


    const mover = setInterval(() => {
        const barreiras = Array.from(document.getElementsByClassName('barreira'))
        const largura = wmFlappy.offsetWidth
        barreiras.forEach(barreira => {
            const barreiraLeft = barreira.style.left.split('px')[0]
            if (barreiraLeft < -80) {
                barreira.style.left = (120 + espacamentoEntreBarreiras + largura) + 'px'
            } else {
                barreira.style.left = (barreiraLeft - 1) + 'px'
            }
            wmFlappy.appendChild(barreira)
        })

        function colisao() {
            let barreiras = document.getElementsByClassName('barreira')
            let bird = document.getElementsByClassName('bird')
            let passaro = bird[0].getBoundingClientRect()
            
            bird = Array.from(bird)
            barreiras = Array.from(barreiras)
            
            barreiras.forEach(barreira => {
                barreiraElemento = barreira
                barreira = barreira.getBoundingClientRect()
           
                if (
                    passaro.x < barreira.x + barreira.width &&
                    passaro.x + passaro.width > barreira.x &&
                    passaro.y < barreira.y + barreira.height &&
                    passaro.y + passaro.height > barreira.y
                ) {
                    clearInterval(mover)
                    clearInterval(queda)
                    document.removeEventListener('keydown', voo)
                }

                if (Math.round(passaro.x) == Math.round(barreira.x) && barreiraElemento.classList.contains('barrier-top')) {
                    contador.innerHTML = parseInt(contador.innerHTML) + 1
                }
            })
        }
        colisao()
    },)
}
document.addEventListener('DOMContentLoaded', criarBarreiras)