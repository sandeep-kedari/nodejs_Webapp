//console.log("Hello in client side Console");



const weatherForecast = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#Message1')
const messageTwo = document.querySelector('#Message2')

weatherForecast.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading ....'
    messageTwo.textContent = ''
    const Locat = search.value
    fetch('/weather?address='+Locat).then((response) => {
    response.json().then((data) => {
        if(data.Error) {
            messageOne.textContent = data.Error
            //console.log( "URL Ivalid..!!", data.Error);
        } else {
            messageOne.textContent = data.Forecast
            //console.log( " Data " + data.Location)
        }
    })
})
    //console.log(Locat)
})