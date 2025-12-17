import { buildUrl } from "../utils/http.js";

export class WeatherService {
    // champs prive pour stocker la clef d'API
    #apiKey;
    // champs privee pour les options par defauts
    #baseOptions;

    constructor(apiKey) {
        this.#apiKey = apiKey;
        this.#baseOptions = {
            units: 'metric',
            lang: 'fr',
            
        };
    }
    /**
     * recupere les donnees meteo actuelles pour une ville donnee
     * @param {object} params ex: { q: 'Paris', lat: 48.8566, lon: 2.3522 }
     * @returns {Promise<object>} les donnees meteo actuelles
     * -{ok true, data: {...}} si reussite
     * -{ok false, error: 'message'} si erreur
     */
    async getCurrent(params) {
        // on verifie la cle api 
        if (!this.#apiKey) {
            return { ok: false, error: 'Aucune cle API' };
        }
    

    // on fusionne les options de base avec les parametres specifiques
    const query = {
        ...this.#baseOptions,
        ...params,
        appid: this.#apiKey,
    };

    // construction de l'url complete
    const url = buildUrl('https://api.openweathermap.org/data/2.5/weather', query);

    try {
        // on passe la requete avec le fetch
        const response = await fetch (url);

        const data = await response.json();

        // on verifie le code de reponse
        if (!response.ok) {
            return { ok: false, error: data?.message || 'Erreur lors de la requete meteo' };
        }

        // tout est ok
        return { ok: true, data };
    } catch (error) {
        return { ok: false, error: error.message };
    }
 }
}