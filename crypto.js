const cryptoURL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD&CMC_PRO_API_KEY=b0c29897-9630-4d3d-9f94-92c490757ef0";
const ctx = document.getElementById('myChart').getContext('2d');

async function getCryptoPrices(){
    const response = await fetch(cryptoURL)
    const json = await response.json()
    console.log("this is json", json)
    const coin = []
    coin.push(json.data)
    console.log("this is array coin", coin)
    renderLineGraph(coin)
}
getCryptoPrices()

function renderLineGraph(coin){
    const ctx = document.getElementById("myChart")
    coin.forEach(element => {
    const price = element.quote.USD.price;
    const [ninetyAgoPrice] = getHistoricPrices(element.quote.USD)
    const timeAgo = ["90d", "60d", "30d", "7d", "24h", "1h", "Current"]
    const coinObj = {
        type: "line", 
        data: {
            labels: timeAgo,
            datasets: [
                {
                 label: "Bitcoin", 
                 borderWidth: 1, 
                 data: getHistoricPrices(element.quote.USD),
                 borderColor: "rgba(255, 99, 132, 1)", 
                 backgroundColor: "rgba(255, 99, 132, 0.2)",
                },
                {
                    label: "Ethereum", 
                    borderWidth: 1, 
                    data: getHistoricPrices(element.quote.USD),
                    borderColor: "rgba(255, 99, 132, 1)", 
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                   },
                   {
                    label: "Binance", 
                    borderWidth: 1, 
                    data: getHistoricPrices(element.quote.USD),
                    borderColor: "rgba(255, 99, 132, 1)", 
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                   },
                   {
                    label: "Cardano", 
                    borderWidth: 1, 
                    data: getHistoricPrices(element.quote.USD),
                    borderColor: "rgba(255, 99, 132, 1)", 
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                   },
                   {
                    label: "Tether", 
                    borderWidth: 1, 
                    data: getHistoricPrices(element.quote.USD),
                    borderColor: "rgba(255, 99, 132, 1)", 
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                   },
            ],
        },
    }
    console.log("this is coinObj", coinObj);
    })
}


    // const myChart = new Chart (ctx, coinObj)
//         options: {
//             tooltips: {
//               enabled: true,
//               mode: "nearest",
//             },
//             scales: {
//               yAxes: [
//                 {
//                   ticks: {
//                     beginAtZero: false,
//                     suggestedMax: price,
//                     suggestedMin: ninetyAgoPrice,
//                   },
//                 },
//               ],
//             },
//           },
//     })
// }
//     )}

function getHistoricPrices(prices){
    const {
        percent_change_90d,
        percent_change_60d,
        percent_change_30d,
        percent_change_7d,
        percent_change_24h,
        percent_change_1h,
        price,
      } = prices;
    
      const ninetyAgoPrice = calculatePriceFromPercentageChange(
        price,
        percent_change_90d
      );
      const sixtyAgoPrice = calculatePriceFromPercentageChange(
        price,
        percent_change_60d
      );
      const thirtyAgoPrice = calculatePriceFromPercentageChange(
        price,
        percent_change_30d
      );
      const sevenAgoPrice = calculatePriceFromPercentageChange(
        price,
        percent_change_7d
      );
      const dayAgoPrice = calculatePriceFromPercentageChange(
        price,
        percent_change_24h
      );
      const hourAgoPrice = calculatePriceFromPercentageChange(
        price,
        percent_change_1h
      );
    
      return [
        ninetyAgoPrice,
        sixtyAgoPrice,
        thirtyAgoPrice,
        sevenAgoPrice,
        dayAgoPrice,
        hourAgoPrice,
        price,
      ];
    }

    function calculatePriceFromPercentageChange(currentPrice, percentageChange) {
        let denominator;
        let historicPrice;
        if (percentageChange >= 100) {
          percentageChange = percentageChange + 100;
          denominator = percentageChange * 0.01;
          historicPrice = currentPrice / denominator;
        }
      
        if (percentageChange < 100 && percentageChange > 0) {
          denominator = 1 + percentageChange / 100;
          historicPrice = currentPrice / denominator;
        }
      
        if (percentageChange < 0) {
          const original = (currentPrice / (100 + percentageChange)) * 100;
          historicPrice = original;
        }
        return historicPrice;
      }