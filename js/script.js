const form = document.querySelector('#formDates')
const results = document.querySelector('.results')
const daysInput = document.forms['formDates']['day']
const monthsInput = document.forms['formDates']['month']
const yearsInput = document.forms['formDates']['year']
const button = document.querySelector('#buttonId')
const spanDay = document.querySelector('#spanClassIdDay')
const spanMonth = document.querySelector('#spanClassIdMonth')
const classDay = document.querySelector('.spanInputD')
const classMonth = document.querySelector('.spanInputM')
const classYear = document.querySelector('.spanInputY')

let getDaysInMonth = function(month, year) {
    return new Date(year, month+1, 0).getDate()
}
const data = new Date()

let yearHTML = ''
let monthHTML = ''
let dayHTML = ''


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

for (let contador = 1950; contador <= data.getFullYear(); contador++){
    yearHTML += `<option value="${contador}">${contador}</option>`
    yearsInput.innerHTML = yearHTML
    
}

for (let contador = 1; contador <= 12; contador++) {
    monthHTML += `<option value="${contador}">${months[contador - 1]}</option>`
    monthsInput.innerHTML = monthHTML
}

function mudando() {
    dayHTML = ''
    
    for (let contador = 1; contador <= getDaysInMonth(parseInt(monthsInput.value - 1), parseInt(yearsInput.value)); contador++) {
        dayHTML += `<option value="${contador}">${contador}</option>`
        daysInput.innerHTML = dayHTML
    }
}

monthsInput.addEventListener("change", mudando)

function calcData(data1, data2) {
    const convertDate1 = new Date(data1)
    const convertDate2 = new Date(data2)

    const data1TimeStamp = convertDate1.getTime()
    const data2TimeStamp = convertDate2.getTime()

    let calc

    if (data1TimeStamp > data2TimeStamp) {
        calc = new Date(data1TimeStamp - data2TimeStamp)
    } else {
        calc = new Date(data2TimeStamp - data1TimeStamp)
    }

    const calcFormatTemplate = calc.getDate() + '-' + (calc.getMonth()+1) + '-' + calc.getFullYear()
    const calcFormat = calcFormatTemplate.split("-")

    const daysPassed = Number(Math.abs(parseInt(calcFormat[0])) - 1)
    const monthsPassed = Number(Math.abs(parseInt(calcFormat[1])) - 1)
    const yearsPassed = Number(Math.abs(parseInt(calcFormat[2])) - 1970)

    let dateInput = new Date(data1TimeStamp)

    return {
        yearsPassed,
        monthsPassed,
        daysPassed,
        dateInput
    }
}


function enviar(event){
    event.preventDefault()
    let dataYear = calcData(`"${monthsInput.value}-${daysInput.value}-${yearsInput.value}"`, data).yearsPassed
    let dataMonth = calcData(`"${monthsInput.value}-${daysInput.value}-${yearsInput.value}"`, data).monthsPassed
    let dataDay = calcData(`"${monthsInput.value}-${daysInput.value}-${yearsInput.value}"`, data).daysPassed
    let dateFull = calcData(`"${monthsInput.value}-${daysInput.value}-${yearsInput.value}"`, data).dateInput

    if (!daysInput.value) {
        results.innerHTML = `
        <span><span class="yearsSpan">--</span> years</span>
        <span><span class="monthsSpan">--</span> months</span>
        <span><span class="daysSpan">--</span> days</span>
        `
        daysInput.classList.add("errorBorder")
        monthsInput.classList.add("errorBorder")
        classDay.classList.add("error")
        classMonth.classList.add("error")
        spanDay.classList.add("error")
        spanDay.classList.remove("hidden")
        spanMonth.classList.add("error")
        spanMonth.classList.remove("hidden")

    } else if (dateFull > data){
        results.innerHTML = `
        <span><span class="yearsSpan">${dataYear}</span> years</span>
        <span><span class="monthsSpan">${dataMonth}</span> months</span>
        <span><span class="daysSpan">${dataDay}</span> days</span>
        <span class="spanFuture">The date is in the future*</span>
        `
        monthsInput.classList.remove("errorBorder")
        monthsInput.classList.add("borderFuture")
        daysInput.classList.remove("errorBorder")
        daysInput.classList.add("borderFuture")
        yearsInput.classList.add("borderFuture")
        spanDay.classList.remove("error")
        spanDay.classList.add("hidden")
        spanMonth.classList.remove("error")
        spanMonth.classList.add("hidden")
        classDay.classList.add("colorFuture")
        classMonth.classList.add("colorFuture")
        classYear.classList.add("colorFuture")
        
    } else {
        results.innerHTML = `
        <span><span class="yearsSpan">${dataYear}</span> years</span>
        <span><span class="monthsSpan">${dataMonth}</span> months</span>
        <span><span class="daysSpan">${dataDay}</span> days</span>
        `
        monthsInput.classList.remove("errorBorder", "borderFuture")
        daysInput.classList.remove("errorBorder", "borderFuture")
        yearsInput.classList.remove("borderFuture")
        classDay.classList.remove("error")
        classMonth.classList.remove("error")
        spanDay.classList.remove("error")
        spanDay.classList.add("hidden")
        spanMonth.classList.remove("error")
        spanMonth.classList.add("hidden")
        classDay.classList.remove("colorFuture")
        classMonth.classList.remove("colorFuture")
        classYear.classList.remove("colorFuture")
    }
}   

form.addEventListener('submit', enviar)