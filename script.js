import { updateBird, setupBird, getBirdRect } from './bird.js'
import { updatePipes, setupPipes, getPassedPipesCount, getPipesRects } from './pipe.js'

document.addEventListener('keypress', handleStart, { once: true })
const title = document.querySelector('[data-title]')
const subtitle = document.querySelector('[data-subtitle]')

let lasTime
function updateLoop(time) {
	if (lasTime == null) {
		lasTime = time
		window.requestAnimationFrame(updateLoop)
		return
	}
	const delta = time - lasTime
	updateBird(delta)
	updatePipes(delta)
	if (checkLose()) return handleLose()
	lasTime = time
	window.requestAnimationFrame(updateLoop)
}

function checkLose() {
	const birdRect = getBirdRect()
	const insidePipe = getPipesRects().some(rect => isCollision(birdRect, rect))
	const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight

	return outsideWorld || insidePipe
}

function isCollision(rect1,rect2) {
	return (
		rect1.left < rect2.right &&
		rect1.top < rect2.bottom &&
		rect1.right > rect2.left &&
		rect1.bottom > rect2.top
	)
}

function handleStart() {
	title.classList.add('hide')
	setupBird()
	setupPipes()
	lasTime = null
	window.requestAnimationFrame(updateLoop)
}

function handleLose() {
	setTimeout(() => {
	title.classList.remove('hide')
	subtitle.classList.remove('hide')
	subtitle.textContent = `${getPassedPipesCount()} Tuberias`
	document.addEventListener('keypress', handleStart, { once: true })
	})
}