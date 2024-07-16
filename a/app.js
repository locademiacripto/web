document.getElementById('findArbitrage').addEventListener('click', async () => {
    const crypto = document.getElementById('crypto').value;
    const apiUrl = 'https://criptoya.com/api/btc/usd/0.5'; // Replace with the actual API URL

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayArbitrageOpportunities(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

function displayArbitrageOpportunities(data) {
    const exchanges = data;
    const opportunities = findArbitrageOpportunities(exchanges);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (opportunities.length > 0) {
        opportunities.forEach(opp => {
            const div = document.createElement('div');
            div.textContent = `Buy from ${opp.buyExchange} at ${opp.buyPrice} and sell to ${opp.sellExchange} at ${opp.sellPrice}. Profit: ${opp.profit}`;
            resultsDiv.appendChild(div);
        });
    } else {
        resultsDiv.textContent = 'No arbitrage opportunities found.';
    }
}

function findArbitrageOpportunities(exchanges) {
    let opportunities = [];

    for (let buyExchange in exchanges) {
        for (let sellExchange in exchanges) {
            if (buyExchange !== sellExchange) {
                const buyPrice = exchanges[buyExchange].ask;
                const sellPrice = exchanges[sellExchange].bid;

                if (buyPrice < sellPrice) {
                    opportunities.push({
                        buyExchange: buyExchange,
                        buyPrice: buyPrice,
                        sellExchange: sellExchange,
                        sellPrice: sellPrice,
                        profit: sellPrice - buyPrice
                    });
                }
            }
        }
    }

    return opportunities;
}
