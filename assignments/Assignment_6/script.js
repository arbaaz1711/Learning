$(document).ready(function() {
    // API key for OpenWeatherMap
    const apiKey = '7eab817d912539a1077384e0bdc13b54';
    
    // Default city
    let city = 'Mumbai';
    
    // Function to fetch weather data
    function getWeatherData() {
        // Add refreshing animation
        $('#refresh-btn').addClass('refreshing');
        
        // Fetch weather data from OpenWeatherMap API
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                updateWeatherUI(data);
                
                // Remove refreshing animation
                setTimeout(function() {
                    $('#refresh-btn').removeClass('refreshing');
                }, 500);
            },
            error: function(error) {
                console.error('Error fetching weather data:', error);
                $('#city').text('Error');
                $('#weather-description').text('Could not fetch weather data');
                $('#temp').text('--');
                $('#humidity').text('--%');
                $('#wind').text('-- km/h');
                
                // Remove refreshing animation
                $('#refresh-btn').removeClass('refreshing');
            }
        });
    }
    
    // Function to update UI with weather data
    function updateWeatherUI(data) {
        // Update city name
        $('#city').text(data.name);
        
        // Update weather description (capitalize first letter)
        const description = data.weather[0].description;
        $('#weather-description').text(
            description.charAt(0).toUpperCase() + description.slice(1)
        );
        
        // Update temperature (round to nearest integer)
        $('#temp').text(Math.round(data.main.temp));
        
        // Update humidity
        $('#humidity').text(data.main.humidity + '%');
        
        // Update wind speed (convert to km/h if needed)
        $('#wind').text(Math.round(data.wind.speed * 3.6) + ' km/h');
        
    }
    
    // Initialize weather data
    getWeatherData();
    
    // Refresh button click event
    $('#refresh-btn').on('click', function() {
        getWeatherData();
    });
}); 