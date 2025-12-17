/**
 * Utilitaire http : construire l'url avec les parametres de requete (query string)
 * cette fonction va transformer un objet js en parametre d'url 
 */

/**
 * methode qui recnstruit l'url en get grace a un objet de parametres
 * 
 * @param {string} baseUrl l'url de base (sans parametre)
 * @param {object} params un objet js contenant les parametres de requete
 * @returns {string} l'url complete avec les parametres de requete
 */
export function buildUrl(baseUrl, params = {}) {
    // on transforme notre objet params en tableau de clefs/valeurs
    const entries = Object.entries(params).filter(([, value]) => value !== undefined && value !== '')

    // si aucun parametre valide, on retourne l'url de base
    if (!entries.length) {
        return baseUrl;
    }

    // transformation de chaque [clef/valeur] en chaine "clef=valeur" avec encodage URI
    const query = entries
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
        
    // on retourne l'url complete
    return `${baseUrl}?${query}`;
}