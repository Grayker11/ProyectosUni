// Escuchar el evento 'submit' en el formulario
document.getElementById('climaForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Previene la recarga de la página

    // Obtén las coordenadas de la ciudad seleccionada
    const coordinates = document.getElementById('ciudad').value; // 'ciudad' es el ID del select
    const [latitude, longitude] = coordinates.split(','); // Separa latitud y longitud

    try {
        // Realiza la solicitud a la API de Open-Meteo
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`);
        
        // Convierte la respuesta en un objeto JSON
        const data = await response.json();

        // Referencia al div donde se mostrarán los resultados
        const resultDiv = document.getElementById('result');

        if (data.current_weather) {
            // Datos del clima actual
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

        // Muestra un mensaje de error en el div de resultados
        document.getElementById('result').innerHTML = `<p>Hubo un error al consultar el clima. Por favor, intenta nuevamente más tarde.</p>`;
    }
});
