document.getElementById('climaForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const coordinates = document.getElementById('ciudad').value;
    const [latitude, longitude] = coordinates.split(',');
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`);
        
        const data = await response.json();

        const resultDiv = document.getElementById('result');

        if (data.current_weather) {
            const weather = data.current_weather;
            resultDiv.innerHTML = `
                <h2>Clima Actual:</h2>
                <p><strong>Temperatura:</strong> ${weather.temperature}°C</p>
                <p><strong>Velocidad del Viento:</strong> ${weather.windspeed} km/h</p>
                <p><strong>Dirección del Viento:</strong> ${weather.winddirection}°</p>
            `;
        } else {
            resultDiv.innerHTML = `<p>No se encontraron datos del clima para esta ciudad.</p>`;
        }
    } catch (error) {
        console.error('Error al consultar la API:', error);

        document.getElementById('result').innerHTML = `<p>Hubo un error al consultar el clima. Por favor, intenta nuevamente más tarde.</p>`;
    }
});
