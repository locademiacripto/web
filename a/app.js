document.getElementById('findArbitrage').addEventListener('click', async () => {
    const crypto = document.getElementById('crypto').value;
    const apiUrl = 'https://criptoya.com/api/btc/usd/0.5'; // Reemplaza con la URL real de tu API

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // Eliminar binancep2p de los datos
        delete data.binancep2p;
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
            const button = document.createElement('div');
            button.className = 'arbitrage-button';
            button.innerHTML = `
                <div>
                    <span>Buy from:</span>
                    <strong>${opp.buyExchange}</strong>
                    <small>at ${opp.buyPrice.toFixed(2)}</small>
                </div>
                <div class="arrow">➡️</div>
                <div>
                    <span>Sell to:</span>
                    <strong>${opp.sellExchange}</strong>
                    <small>at ${opp.sellPrice.toFixed(2)}</small>
                </div>
            `;
            resultsDiv.appendChild(button);
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
