let values = []
let candleCloses = []
let time = []
var key = config.MY_API_KEY
let select = 0
let symbol = "AAPL"
const functions = ["TIME_SERIES_DAILY", "TIME_SERIES_WEEKLY", "TIME_SERIES_MONTHLY"]
const series = ["Time Series (Daily)", "Weekly Time Series", "Monthly Time Series"]
let apiFunction = functions[select]
let timeSeries = series[select]
// get data from stock API
fetchData();
function fetchData(){
fetch('https://www.alphavantage.co/query?function=' + apiFunction + '&symbol=' + symbol + '&interval=60min&apikey=' + key)
    .then(res => {
        return res.json()
    })
    .then(data => {
        console.log(data)
    let series = sortData(data)
    console.log(series)
    renderGraph(series)
    })
}
// Sort data into readable format for JSCharting
function sortData(data){
    let series = []
    values = Object.values(data[timeSeries])
            values.forEach(function (row){
                candleCloses.unshift(parseInt(row["4. close"].substring(0,6)))
            })
            
            Object.getOwnPropertyNames(data[timeSeries]).forEach(function (row){
                time.unshift(new Date(row))
            })

            for(let i = 0; i < time.length; i++){
                series.push({x: time[i], y: candleCloses[i]})
            }
            return [
                {name: "price", points: series}
            ]
        }

// Create the graph with data from API
function renderGraph(series){
    JSC.chart('chartDiv', {
        defaultPoint_marker_type: 'none',
        xAxis_crosshair_enabled: true,
        // yAxis: {
            //     scale: {
                //         range: [Math.floor(candleCloses[series.length-1], Math.floor(candleCloses[0]))]
                //     }
                // },
                legend: {
                    template: '%icon %name',
                    position: 'inside top left'
                },
                title: {
                    label: {
                    text: symbol,
                    style_fontSize: 20,
                    },
                    position: 'center'
                }, 
                box: {
                    padding: 10,
                    outline: {color: 'rgb(50,120,20)', width: 4},
                    radius: 5,
                    fill: 'rgb(100,200,30)'
                },
                yAxis_formatString: 'c',
                series: series
                
    });
}


//Callbacks

// function firstFunction(parameters, callback){
//     //do stuff
//     callback();
// }

// // "callback hell"
// firstFunction(para, function(){
//     secondFumction(para, function(){
//         thirdFunction(para, function(){
            
//         });
//     });
// });

// Promises

// 3 states: Pending, Fulfilled, Rejected

// const myPromise = new Promise((resolve, reject) => {
//     const error = true;
//     if(!error) {
//         resolve("Yes! resolved the promise!");
//     } else {
//         reject("No! rejected the promise.");
//     }
// });

// console.log(myPromise);

// myPromise.then(value => {
//     return value + 1;
// })
// .then(newValue => {
//     console.log(newValue);
// })
// .catch(err => {
//     console.log(err);
// })

// const myNextPromise = new Promise((resolve, reject) => {
//     setTimeout(function(){
//         resolve("myNextPromise resolved")
//     }, 3000)
// })