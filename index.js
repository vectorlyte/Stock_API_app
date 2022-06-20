let values = [];
let candleCloses = [];
let time = [];
let select = 0;
const names = []
const functions = ["TIME_SERIES_DAILY", "TIME_SERIES_WEEKLY", "TIME_SERIES_MONTHLY"];
const series = ["Time Series (Daily)", "Weekly Time Series", "Monthly Time Series"];
let apiFunction = functions[select];
let timeSeries = series[select];
const dataSeries = [];
const port = location.port

const chartGrid = document.getElementById("chart-grid");
const searchEl = document.getElementById("search-in");
const searchContainer = document.getElementById;("search-container");
const resultsEl = document.getElementById("results-container");
let results = [];

const chartChildren = [];
let id = 1;
//This creates the initial chart
fetchData("AAPL","Apple");

searchEl.addEventListener("input", function(){
    if(searchEl.value)searchStocks(searchEl.value);
    else if(searchEl.value == "")resultsEl.innerHTML = "";
});

function searchStocks(value){
    fetch(`http://localhost:${port}/${value}`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        results.push(data);
        showResults(results);
    })
};

function showResults(){
    let searches = ""
    if(results[0].Note){
        resultsEl.innerHTML = `<div>API busy</div>`;
        results = [];
    }
    else if(results[0].bestMatches){
    for(let i = 0; i < results[0].bestMatches.length; i++){
        searches += `<div class="result" onclick="fetchData('${results[0].bestMatches[i]["1. symbol"]}','${results[0].bestMatches[i]["2. name"]}')">${results[0].bestMatches[i]["2. name"]}
        </div>`
    } 
    resultsEl.innerHTML = searches;
    searches = "";
    results = [];
    }else{resultsEl.innerHTML = `<div>Invalid input</div>`;results = [];};
}

// get data from stock API

function fetchData(symbol, name){
fetch(`http://localhost:${port}/${apiFunction}/${symbol}`)
    .then(res => {
        return res.json()
    })
    .then(data => {
        console.log(data)
        if(data.Note){
        resultsEl.innerHTML = `<div>API busy</div>`;
        console.log("API busy")
    }
    else {
        let stockName = name;
        names.push(stockName);
        results = [];
        resultsEl.innerHTML = "";
    let series = sortData(data)
    dataSeries.push(series)
    renderGraph()
}
    })
}
// Sort data into readable format for JSCharting
function sortData(data){
    let series = []
    values = Object.values(data[timeSeries])
            values.forEach(function (row){
                candleCloses.unshift(parseFloat(row["4. close"].substring(0,6)))
            })
            
            Object.getOwnPropertyNames(data[timeSeries]).forEach(function (row){
                time.unshift(new Date(row))
            })

            for(let i = 0; i < time.length; i++){
                series.push({x: time[i], y: candleCloses[i]})
            }
            time = [];
            candleCloses = [];
            return [
                {name: "price", points: series}
            ]
        }

// Create the graph with data from API
function renderGraph(){
    chartChild = `
    <div id=${id} class="chart-container">
        <div class="button-container">
            <button id="deleteChart" class="buttons" onclick="deleteChart(${id})"></button>
        </div>
        <div id="chart${id}" class="chartDiv"></div>
    </div>`;
    chartGrid.innerHTML += chartChild;
for(let i = 0; i < id; i++){
    JSC.chart('chart'+(i + 1) , {
        defaultPoint_marker_type: 'none',
        xAxis_crosshair_enabled: true,
                legend: {
                    template: '%icon %name',
                    position: 'inside top left'
                },
                title: {
                    label: {
                    text: names[i],
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
                series: dataSeries[i]
            });
        }
    id++;
}

function deleteChart(chartId){
    dataSeries.pop(chartId);
    names.pop(chartId);
    chartGrid.removeChild(document.getElementById(chartId))
    id--;
}
