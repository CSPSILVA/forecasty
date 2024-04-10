const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { parse } = require('json2csv');
const fs = require('fs');
const { exec } = require('child_process');
const moment = require('moment');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.SOLCAST_API_KEY;

app.post('/getSolarForecast', async (req, res) => {
    const { dateTime, city } = req.body; // dateTime format: "YYYY-MM-DD HH:MM"

    res.json({ apiKey: API_KEY });
    
    try {
	// Convert input dateTime to moment object and calculate start and end times
        const endTime = moment(dateTime, "YYYY-MM-DD HH:mm");
        const startTime = moment(endTime).subtract(24, 'hours');

        // Format times for API call
        const formattedStartTime = startTime.toISOString();
        const formattedEndTime = endTime.toISOString();

        // API calls with start and end times
        const weatherApiUrl = `https://api.solcast.com.au/data/historic/radiation_and_weather?latitude=-33.856784&longitude=151.215297&azimuth=44&tilt=90&start=2022-10-25T14:45:00.000Z&duration=P31D&format=csv&time_zone=utc?city=${encodeURIComponent(city)}&start=${encodeURIComponent(formattedStartTime)}&end=${encodeURIComponent(formattedEndTime)}`;
        const pvApiUrl = `https://api.solcast.com.au/data/forecast/rooftop_pv_power?latitude=-33.856784&longitude=151.215297&output_parameters=pv_power_rooftop&capacity=1&format=json?city=${encodeURIComponent(city)}&start=${encodeURIComponent(formattedStartTime)}&end=${encodeURIComponent(formattedEndTime)}`;

        const weatherResponse = await axios.get(weatherApiUrl);
        const weatherData = weatherResponse.data; // This is an array of objects
        
        const pvResponse = await axios.get(pvApiUrl);
        const pvData = pvResponse.data; // This is an array of objects

        res.json({ message: 'Received POST request', dateTime, city });

        // WeatherData and pvData including a 'timestamp' field
	const mergedData = [];

	// Creating a map of PV data for easy lookup by timestamp
	const pvDataMap = new Map(pvData.map(item => [item.timestamp, item]));

	// Iterate through the weather data to merge with corresponding PV data
	weatherData.forEach(weatherItem => {
    		const pvItem = pvDataMap.get(weatherItem.timestamp);
    		const record = {
        		timestamp: weatherItem.timestamp, // Ensure alignment by including the timestamp in the merged record
        		air_temp: weatherItem.air_temp,
        		relative_humidity: weatherItem.relative_humidity,
        		wind_speed_10m: weatherItem.wind_speed_10m,
        		pv_power_advanced: pvItem ? pvItem.pv_power_advanced : null
    		};
    		mergedData.push(record);
	});


        // Convert selected data to CSV
        const fields = ['air_temp', 'relative_humidity', 'wind_speed_10m', 'pv_power_advanced'];
        const csv = parse(mergedData, { fields });
        const tempCsvFileName = 'temp_data.csv';
        fs.writeFileSync(tempCsvFileName, csv);

        // Preprocess and predict using Python scripts
	
        const scriptPath = path.join(__dirname, '..', '..', 'python', 'preprocess_and_predict.py');
	exec(`python ${scriptPath} ${tempCsvFileName} '${formattedStartTime}'`, (error, predictionOutput, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).send('Error in prediction');
            }
            if (stderr) {
                console.warn(`Warning/Non-critical error: ${stderr}`);
            }
            
            // Python script prints the prediction result in JSON format
            try {
        	const predictions = JSON.parse(predictionOutput.trim());
        	res.json({ predictions });
    	    } catch (parseError) {
        	console.error(`Error parsing prediction output: ${parseError}`);
        	res.status(500).send('Error processing prediction output');
    	    }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch data');
    }
});

const port = process.env.PORT || 5173;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

