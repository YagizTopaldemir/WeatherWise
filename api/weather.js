import axios from 'axios';

const apiKey = 'e28e3fe0de444e8a8a0192255242303';


const forecastEndpoint = params=> `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`
const locationsEndpoint = params=> `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;


const apiCall = async (endpoint)=>{
    const options = {
        method: 'GET',
        url: endpoint
    }
    try{
        const response = await axios.request(options);
        return response.data;
    }catch(err){
        console.log('error: ',err);
        return null;
    }
}

export const fetchWearherForecast = params=>{
    return apiCall(forecastEndpoint(params));
}

export const fetchLocation = params=>{
    return apiCall(locationsEndpoint(params));
}