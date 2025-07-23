function getTime() {
	var now = new Date()
	var second = now.getSeconds()
	var minute = now.getMinutes()
	var hour = now.getHours()

	return {
		second: second,
		minute: minute,
		hour: hour
	}
}

function updateHands(time) {
	var secondDeg = time.second * 6
	var minuteDeg = time.minute * 6 + time.second * 0.1
	var hourDeg = (time.hour % 12) * 30 + time.minute * 0.5

	var secondHand = document.getElementById('second-hand')
	var minuteHand = document.getElementById('minute-hand')
	var hourHand = document.getElementById('hour-hand')

	secondHand.style.transform = 'translateX(-50%) rotate(' + secondDeg + 'deg)'
	minuteHand.style.transform = 'translateX(-50%) rotate(' + minuteDeg + 'deg)'
	hourHand.style.transform = 'translateX(-50%) rotate(' + hourDeg + 'deg)'
}

function updateDigital(time) {
	var hour = String(time.hour).padStart(2, '0')
	var minute = String(time.minute).padStart(2, '0')
	var second = String(time.second).padStart(2, '0')

	var digitalClock = document.getElementById('digital-clock')
	digitalClock.textContent = hour + ':' + minute + ':' + second
}

function updateDate() {
	var now = new Date()

	var weekdays = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	]

	var months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	]

	var day = String(now.getDate()).padStart(2, '0')
	var monthNumber = String(now.getMonth() + 1).padStart(2, '0')
	var year = String(now.getFullYear())
	var weekday = weekdays[now.getDay()]
	var monthName = months[now.getMonth()]
	var week = getWeekNumber(now)

	var line1 = document.getElementById('date-numeric')
	var line2 = document.getElementById('date-named')

	line1.textContent = day + '.' + monthNumber + '.' + year
	line2.textContent = weekday + ' · ' + monthName + ' · Week ' + week
}

function getWeekNumber(date) {
	var firstJan = new Date(date.getFullYear(), 0, 1)
	var dayOfYear = Math.floor((date - firstJan) / 86400000) + 1
	var weekNumber = Math.ceil((dayOfYear + firstJan.getDay()) / 7)
	return weekNumber
}

function createMainMarks() {
	var container = document.querySelector('.numbers')
	var radius = container.offsetWidth / 2
	var numberRadius = radius * 0.85
	var tickRadius = radius * 0.91
	var tickLength = radius * 0.06

	var i = 1
	while (i <= 12) {
		var angle = (i * 30 - 90) * Math.PI / 180
		var x = Math.cos(angle)
		var y = Math.sin(angle)

		var mark = document.createElement('div')
		mark.style.position = 'absolute'
		mark.style.left = 'calc(50% + ' + tickRadius * x + 'px)'
		mark.style.top = 'calc(50% + ' + tickRadius * y + 'px)'
		mark.style.width = tickLength + 'px'
		mark.style.height = '5px'
		mark.style.background = '#e0e0e0'
		mark.style.transformOrigin = 'left center'
		mark.style.transform = 'translate(0, -50%) rotate(' + (i * 30 - 90) + 'deg)'
		mark.style.zIndex = '3'
		mark.style.boxShadow = '0 2px 4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.3)'
		mark.style.borderRadius = '1.5px'

		container.appendChild(mark)

		var label = document.createElement('div')
		label.className = 'number'
		label.textContent = i
		label.style.left = 'calc(50% + ' + numberRadius * x + 'px)'
		label.style.top = 'calc(50% + ' + numberRadius * y + 'px)'

		container.appendChild(label)

		i = i + 1
	}
}

function createSmallMarks() {
	var container = document.querySelector('.numbers')
	var radius = container.offsetWidth / 2
	var tickRadius = radius * 0.92
	var tickLength = radius * 0.042

	var i = 0
	while (i < 60) {
		if (i % 5 !== 0) {
			var angle = (i * 6 - 90) * Math.PI / 180
			var x = Math.cos(angle)
			var y = Math.sin(angle)

			var tick = document.createElement('div')
			tick.style.position = 'absolute'
			tick.style.left = 'calc(50% + ' + tickRadius * x + 'px)'
			tick.style.top = 'calc(50% + ' + tickRadius * y + 'px)'
			tick.style.width = tickLength + 'px'
			tick.style.height = '1.67px'
			tick.style.background = '#e0e0e0'
			tick.style.transformOrigin = 'left center'
			tick.style.transform = 'translate(0, -50%) rotate(' + (i * 6 - 90) + 'deg)'
			tick.style.zIndex = '2'
			tick.style.boxShadow = '0 1px 2px rgba(0,0,0,0.4), inset 0 0.5px 0 rgba(255,255,255,0.2)'
			tick.style.borderRadius = '0.8px'

			container.appendChild(tick)
		}

		i = i + 1
	}
}

function startClock() {
	createMainMarks()
	createSmallMarks()
	updateAll()
	updateDate()

	setInterval(function () {
		updateAll()
		updateDate()
	}, 1000)
}

function updateAll() {
	var time = getTime()
	updateHands(time)
	updateDigital(time)
}

document.addEventListener('DOMContentLoaded', function () {
	startClock()
})
