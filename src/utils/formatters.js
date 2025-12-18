/**
 * methode qui formate la temperature 
 * @param {number|undefined|null} value
 * @returns {string} temperature formatée
 */

export const formatTemperature = (value) => {
    if(value === undefined || value === null) 
        return '-';
    
    return `${Math.round(value)}°C`;
}

/**
 * methode qui formate la vitesse du vent m/s en km/h
 * @param {number|undefined|null} value
 * @returns {string} vitesse formatée
 */

export const formatWindSpeed = (value) => {
    if(value === undefined || value === null) 
        return '-';
    
    return `${Math.round(value * 3.6)} km/h`;
}

/**
 * methode qui formate un timestamp en heure locale
 * @param {number|undefined|null} timestamp
 * 
 * @returns {string} heure formatée
 */

export const formatTimestamp = (timestamp) => {
    if(timestamp === undefined || timestamp === null) 
        return '-';
    
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("fr-FR", {
        hour: '2-digit',
        minute: '2-digit',
    });
}