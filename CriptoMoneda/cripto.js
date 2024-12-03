const apiUrl = "https://api.coingecko.com/api/v3";

async function fetchCryptoList() {
    const select = document.getElementById("cryptoSelect");

    try {
        const response = await fetch(`${apiUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`);
        const data = await response.json();

        data.forEach(coin => {
            const option = document.createElement("option");
            option.value = coin.id;
            option.textContent = `${coin.name} (${coin.symbol.toUpperCase()})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar la lista de criptomonedas:", error);
    }
}

async function fetchCryptoData() {
    const selectedCrypto = document.getElementById("cryptoSelect").value;
    const cryptoInfoDiv = document.getElementById("cryptoInfo");
    cryptoInfoDiv.innerHTML = "Cargando datos...";

    try {
        const response = await fetch(`${apiUrl}/coins/${selectedCrypto}`);
        const data = await response.json();

        const { name, symbol, market_data } = data;

        cryptoInfoDiv.innerHTML = `
            <h2>${name} (${symbol.toUpperCase()})</h2>
            <p><strong>Precio actual:</strong> $${market_data.current_price.usd.toFixed(2)}</p>
            <p><strong>Cambio (24h):</strong> ${market_data.price_change_percentage_24h.toFixed(2)}%</p>
            <p><strong>Cambio (7 días):</strong> ${market_data.price_change_percentage_7d.toFixed(2)}%</p>
            <p><strong>Volumen de transacciones:</strong> $${market_data.total_volume.usd.toLocaleString()}</p>
            <p><strong>Capitalización de mercado:</strong> $${market_data.market_cap.usd.toLocaleString()}</p>
        `;
    } catch (error) {
        cryptoInfoDiv.innerHTML = `<p style="color: red;">Error al obtener los datos: ${error.message}</p>`;
    }
}

fetchCryptoList();
