var timezoneSelect = document.getElementById('timezone-select')
var currentZone = timezoneSelect.value

function getTime(zone) {
    if (zone === 'local') {
        var now = new Date()
        return {
            hour: now.getHours(),
            minute: now.getMinutes(),
            second: now.getSeconds(),
            date: now
        }
    }

    var formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: zone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    })

    var parts = formatter.formatToParts(new Date())
    var hour = parseInt(parts.find(p => p.type === 'hour').value)
    var minute = parseInt(parts.find(p => p.type === 'minute').value)
    var second = parseInt(parts.find(p => p.type === 'second').value)

    var dateStr = new Date().toLocaleString('en-US', { timeZone: zone })
    var date = new Date(dateStr)

    return {
        hour: hour,
        minute: minute,
        second: second,
        date: date
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

function updateDate(date) {
    var weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December']

    var day = String(date.getDate()).padStart(2, '0')
    var monthNumber = String(date.getMonth() + 1).padStart(2, '0')
    var year = String(date.getFullYear())
    var weekday = weekdays[date.getDay()]
    var monthName = months[date.getMonth()]
    var week = getWeekNumber(date)

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

function updateAll() {
    var time = getTime(currentZone)
    updateHands(time)
    updateDigital(time)
    updateDate(time.date)
}

function startClock() {
    createMainMarks()
    createSmallMarks()
    updateAll()
    setInterval(updateAll, 1000)
}

timezoneSelect.addEventListener('change', function () {
    currentZone = timezoneSelect.value
    updateAll()
})

document.addEventListener('DOMContentLoaded', function () {
    startClock()
})

function resizeTimezoneBox() {
    var select = document.getElementById('timezone-select')
    var box = select.parentElement

    var tempSpan = document.createElement('span')
    tempSpan.style.position = 'absolute'
    tempSpan.style.visibility = 'hidden'
    tempSpan.style.whiteSpace = 'nowrap'
    tempSpan.style.fontFamily = window.getComputedStyle(select).fontFamily
    tempSpan.style.fontSize = window.getComputedStyle(select).fontSize
    tempSpan.textContent = select.options[select.selectedIndex].text

    document.body.appendChild(tempSpan)
    var newWidth = tempSpan.offsetWidth + 50
    document.body.removeChild(tempSpan)

    box.style.width = newWidth + 'px'
    select.style.minWidth = newWidth + 'px'
}

document.addEventListener('DOMContentLoaded', function () {
    resizeTimezoneBox()
})

timezoneSelect.addEventListener('change', function () {
    resizeTimezoneBox()
})
