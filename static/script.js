function getPrediction() {
    const location = document.getElementById('location').value;
    if (!location) {
        alert('Please enter a location');
        return;
    }

    document.getElementById('loader').style.display = 'flex';

    document.getElementById('error').style.display = 'none';
    document.getElementById('result').style.display = 'none';

    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location: location }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('loader').style.display = 'none';

        if (data.error) {
            document.getElementById('error').style.display = 'block';
            document.getElementById('error').innerText = data.error;
        } else {
            document.getElementById('result').style.display = 'flex';

            // Current day data
            document.getElementById('current-temperature').innerText = data.current_temperature;
            document.getElementById('current-humidity').innerText = data.current_humidity;
            document.getElementById('current-windspeed').innerText = data.current_windspeed;
            document.getElementById('current-rainfall').innerText = data.current_rainfall;
            document.getElementById('current-flood-risk').innerText = data.current_flood_risk;
            document.getElementById('current-risk-percentage').innerText = data.current_risk_percentage;

            // Next day data
            document.getElementById('next-day-temperature').innerText = data.next_day_temperature;
            document.getElementById('next-day-humidity').innerText = data.next_day_humidity;
            document.getElementById('next-day-windspeed').innerText = data.next_day_windspeed;
            document.getElementById('next-day-rainfall').innerText = data.next_day_rainfall;
            document.getElementById('next-day-flood-risk').innerText = data.next_day_flood_risk;
            document.getElementById('next-day-risk-percentage').innerText = data.next_day_risk_percentage;
        }
    })
    .catch(error => {
        // Hide loader
        document.getElementById('loader').style.display = 'none';

        document.getElementById('error').style.display = 'block';
        document.getElementById('error').innerText = 'An error occurred: ' + error.message;
    });
}

// Existing scroll script remains the same
const scrollContainer = document.getElementById('temp');

scrollContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    const speed = 50;
    const scrollAmount = e.deltaY * speed;

    requestAnimationFrame(() => {
        scrollContainer.scrollLeft += scrollAmount;
    });
});