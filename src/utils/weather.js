// 判断风向
export default function determineWindDirection(degrees) {
    let direction;
    if (degrees >= 0 && degrees < 22.5) {
        direction = 'N';
    } else if (degrees >= 22.5 && degrees < 67.5) {
        direction = 'NNE';
    } else if (degrees >= 67.5 && degrees < 112.5) {
        direction = 'NE';
    } else if (degrees >= 112.5 && degrees < 157.5) {
        direction = 'ENE';
    } else if (degrees >= 157.5 && degrees < 202.5) {
        direction = 'E';
    } else if (degrees >= 202.5 && degrees < 247.5) {
        direction = 'ESE';
    } else if (degrees >= 247.5 && degrees < 292.5) {
        direction = 'SE';
    } else if (degrees >= 292.5 && degrees < 337.5) {
        direction = 'SSE';
    } else if (degrees >= 337.5 || degrees < 22.5) {
        direction = 'S';
    } else if (degrees >= 337.5 + 22.5 && degrees < 337.5 + 67.5) {
        direction = 'SSW';
    } else if (degrees >= 337.5 + 67.5 && degrees < 337.5 + 112.5) {
        direction = 'SW';
    } else if (degrees >= 337.5 + 112.5 && degrees < 337.5 + 157.5) {
        direction = 'WSW';
    } else if (degrees >= 337.5 + 157.5 && degrees < 337.5 + 202.5) {
        direction = 'W';
    } else if (degrees >= 337.5 + 202.5 && degrees < 337.5 + 247.5) {
        direction = 'WNW';
    } else if (degrees >= 337.5 + 247.5 && degrees < 337.5 + 292.5) {
        direction = 'NW';
    } else if (degrees >= 337.5 + 292.5 && degrees < 337.5 + 337.5) {
        direction = 'NNW';
    }
    return direction;
}

// 判断空气湿度
export default function determineHumidityStatus(humidity) {
    let status;
    if (humidity < 30) {
        status = 'Low';
    } else if (humidity >= 30 && humidity <= 60) {
        status = 'Normal';
    } else if (humidity > 60) {
        status = 'High';
    } else {
        status = 'Invalid';
    }
    return status;
}

// 判断能见度
export default function determineVisibilityStatus(visibility) {
    let status;
    if (visibility < 2) {
        status = 'Low';
    } else if (visibility >= 2 && visibility <= 5) {
        status = 'Average';
    } else if (visibility > 5) {
        status = 'High';
    } else {
        status = 'Invalid';
    }
    return status;
}

// 判断空气质量
export default function determineAirQuality(aqi) {
    let quality;
    if (aqi <= 50) {
        quality = 'Good';
    } else if (aqi <= 100) {
        quality = 'Moderate';
    } else if (aqi <= 200) {
        quality = 'Unhealthy';
    } else if (aqi <= 300) {
        quality = 'Very Unhealthy';
    } else if (aqi > 300) {
        quality = 'Hazardous';
    } else {
        quality = 'Invalid';
    }
    return quality;
}
