import { WeatherService } from "./services/weather-service";
 
export class App {
 
    //propriété privé : stocke l'élément DOM racine ou l'app sera rendu
    #root;
 
    //Propriété privée : instannce du service météo (gère les appels API)
    #service;
 
    // propriété privé : etat interne de l'application (loading, erreurs, resultat)
    #state = {
        loading: false,
        error: '',
        lastResult: null
    }
 
    constructor(rootElement){
        this.#root = rootElement;
 
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        if(!apiKey || apiKey === 'votre_clé_d_api'){
            console.error("VITE_OPENWEATHER_API_KEY non défini ou invalide")
        }
        //Service dédié aux appels réseau, isolé du rendu
        this.#service = new  WeatherService(apiKey);
    }
 
    #render(){
        this.#root.innerHTML = '';
        // contenair principale de la page avec les classes tailewind
        const page = document.createElement("div");
        page.className = "mx-auto max-w-[920px] px-9 pb-12 pt-8"
        //carte principale
        const card = document.createElement("div");
        card.className = "rounded-xl border border-border-light bg-bg-primary p-6 shadow-md ";
        card.innerHTML =`
        <h1 class="mb-2 text-3xl font-bold">Météo</h1>
        <p class="mb-6 text-text-secondary">Cherchez par ville ou par coordonnées géographiques.</p>
        `;
 
        //formulaire
        const form = document.createElement("form");
        form.className = "space-y-6";
        form.addEventListener('submit', this.#handleSubmit.bind(this));
 
        //Section 1 : Recherche par ville
        const citySelection = document.createElement("div");
        citySelection.className = "rounded-lg border-2 border-dashed border-border-light bg-bg-secondary/50 p-5 transition-colors hover:border-primary-500/30";
        citySelection.innerHTML = `
        <div class="mb-3 flex items-center gap-2">
        <div class="text-2xl">
        <svg clxmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128"><path fill="#78a3ad" d="M0 71.05V23.54c0-1.5 1.46-2.69 2.96-2.69h16.12c1.5 0 2.92 1.19 2.92 2.69v47.51z"/><path fill="#fff" d="M4 35.17h5.06v6.32H4zm8.85 0h5.06v6.32h-5.06zM4 26.23h5.06v6.32H4zm8.85 22.8h5.06v6.32h-5.06zM110 41.49h5.06v6.32H110zm8.85 0h5.06v6.32h-5.06zm0 16.49h5.06v6.32h-5.06zM110 50.97h5.06v6.32H110z"/><path fill="#78a3ad" d="M73.33 127.88V11.33c0-2.23 2.16-4 4.39-4h23.94c2.23 0 4.34 1.77 4.34 4v116.54H73.33zm38.75 0V35.33c0-2.23 2.16-4 4.39-4H128v96.54h-15.92z"/><path fill="#fff" d="M78 17.33h5.33V24H78zm9.33 0h5.33V24h-5.33zm-9.33 10h5.33V34H78zm18.67 0H102V34h-5.33zm0 14H102V48h-5.33zm0 10H102V58h-5.33z"/><path fill="#78a3ad" d="M28.17 127.98V19.82c0-2.46 2.36-4.42 4.78-4.42h26.07c2.43 0 4.72 1.96 4.72 4.42v108.17H28.17z"/><path fill="#fff" d="M43.42 20.58h5.81v7.36h-5.81zm10.16 0h5.81v7.36h-5.81zM33.25 31.63h5.81v7.36h-5.81zm20.33 0h5.81v7.36h-5.81zM33.25 53.68h5.81v7.36h-5.81zm10.17-11h5.81v7.36h-5.81zm10.16 22.05h5.81v7.36h-5.81z"/><path fill="#78a3ad" d="M51.74 18.34H41.63a4.02 4.02 0 0 1-4.02-4.02v-.8c0-2.22 1.8-4.02 4.02-4.02h10.11c2.22 0 4.02 1.8 4.02 4.02v.8c0 2.22-1.8 4.02-4.02 4.02M63.31 46H76v14H63.31z"/><path fill="#006ca2" d="M49 127.98V61.54c0-1.91 1.86-3.43 3.77-3.43h21.5c1.91 0 3.72 1.52 3.72 3.43v66.44z"/><path fill="#fff" d="M54 63.11h7v9h-7zm12 0h7v9h-7zm0 13h7v9h-7zm-12 13h7v9h-7zm12 0h7v9h-7zm-12 13h7v9h-7z"/><path fill="#006ca2" d="M96 127.98H75V90.1h16.99A4.01 4.01 0 0 1 96 94.11z"/><path fill="#006ca2" d="M88 127.98V45.1c0-2.68 2.61-4.82 5.29-4.82l29.49-.18c2.68 0 5.22 2.13 5.22 4.82v83.06z"/><path fill="#fff" d="M106 52.1h6v7h-6zm-11 0h6v7h-6zm22 11h6v7h-6zm-11 0h6v7h-6zm0 11h6v7h-6zm-11 0h6v7h-6zm22 11h6v7h-6zm-11 0h6v7h-6zm-11 0h6v7h-6zm11 22h6v7h-6zm-11-11h6v7h-6z"/><path fill="#006ca2" d="M27.11 47.5H14.28c-1.67 0-3.02-.74-3.02-2.41v-3.62c0-1.67 1.35-3.02 3.02-3.02h12.83c1.67 0 3.02 1.35 3.02 3.02v3.62c0 1.67-1.35 2.41-3.02 2.41"/><path fill="#006ca2" d="M0 127.96V50c0-2.68 2.61-4.82 5.29-4.82L34.78 45c2.68 0 5.22 2.13 5.22 4.82v78.14z"/><path fill="#fff" d="M18 52.75h6v7h-6zm11-.16h6v7h-6zm-22.08 11h6v7h-6zm11.08.16h6v7h-6zm0 11h6v7h-6zm11 11h6v7h-6zm-22 0h6v7H7zm22 22h6v7h-6zm-11 0h6v7h-6zm-11-11h6v7H7z"/></svg>        </div>
        <h2 class="text-base font-semibold text-text-primary">Recherche par ville</h2>
        </div>
        <div class="space-y-2">
            <label for="city" class="block text-sm font-medium text-text-secondary">Nom de la ville</label>
            <input id="city" name="city" type="text" placeholder="Ex: Pais, Londres, Tokyo" autocomplete="off" class="w-full rounded-lg border border-border-medium bg-white px-4 py-3 test-sm transition-all placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-1">
            <p class="text-xs text-text-muted">Saisissez le nom de la ville pour obtenir la météo</p>
        </div>
        `;
 
        //séparateur visuel "OU"
        const separator = document.createElement("div");
        separator.className = "relative";
        separator.innerHTML = `
        <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-border-medium">
        </div>
        </div>
        <div class="relative flex justify-center text-sm">
        <span class="bg-bg-primary px-4 text-text-muted">OU</span>
        </div>
        `;
 
        //section 2 : Recherche par coordonnées
        const coordsSection = document.createElement("div");
        coordsSection.className = "rounded-lg border-2 border-dashed border-border-light bg-bg-secondary/50 p-5 transition-colors hover:border-primary-500/30";
        coordsSection.innerHTML = `
        <div class="mb-3 flex items-center gap-2">
        <div class="text-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M11.25 6.749a6 6 0 1 0 12 0a6 6 0 0 0-12 0"/><path d="M14.25 7.5A3.75 3.75 0 0 1 18 3.749M.75 23.249l12.258-12.258"/></g></svg>        </div>
        <h2 class="text-base font-semibold text-text-primary">Recherche par coordonnées</h2>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="space-y-2">
            <label for="lat" class="block text-sm font-medium text-text-secondary">Latitude<span class="ml-1 text-xs text-text-muted">(-90,90)</span></label>
            <input id="lat" name="lat" type="text" placeholder="48.8566" autocomplete="off" step="any" inputmode="decimal" min="-90" max="90" class="w-full rounded-lg border border-border-medium bg-white px-4 py-3 test-sm transition-all placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-1">
        </div>
        <div class="space-y-2">
            <label for="lon" class="block text-sm font-medium text-text-secondary">Longitude<span class="ml-1 text-xs text-text-muted">(-180,180)</span></label>
            <input id="lon" name="lon" type="text" placeholder="2.3522" autocomplete="off" step="any" inputmode="decimal" min="-180" max="180" class="w-full rounded-lg border border-border-medium bg-white px-4 py-3 test-sm transition-all placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-1">
            </div>
        </div>
        <p class="mt-3 text-xs"> Saisissez les coordonnées GPS pour obtenir les informations météorologiques correspondantes.</p>
        `;

        
 
        form.append(citySelection,separator,coordsSection)

        // contenaire des boutons
        const actions = document.createElement("div");
        actions.className = "flex flex-col-reverse gap-3 sm:flex-row sm:justify-end ";
        

        // bouton secondeaire : effacer
        const clear= document.createElement("button");
        clear.type = "button";
        clear.className = "flex items-center justify-center gap-2 rounded-lg border border-border-medium bg-white px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:border-primary-500 hover:bg-primary-50 hover:text-primary-600 active:scale-95";
        clear.innerHTML= `
        <svg class="text-xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m14.031 1.888l9.657 9.657l-8.345 8.345l-.27.272H20v2H6.748L.253 15.667zM5.788 12.96l-2.707 2.707l4.495 4.495h4.68l.365-.37z"/></svg> Effacer

        `;

        clear.addEventListener('click', () => {console.log("supprimer")});

        // bouton principal
        const submit = document.createElement("button");
        submit.type = "submit";
        submit.className = "group flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-primzry-500/25 transition-all hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0";
        submit.disabled = this.#state.loading;

        if(this.#state.loading){
            submit.innerHTML= `
                <svg class="text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><circle cx="18" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="6" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle></svg> Chargement...
            `;
        } else {
            submit.innerHTML= `
            <svg class="text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10 21v-1m0-16V3m0 6a3 3 0 0 0 0 6m4 5l1.25-2.5L18 18M14 4l1.25 2.5L18 6"/><path d="m17 21l-3-6l1.5-3H22m-5-9l-3 6l1.5 3M2 12h1"/><path d="m20 10l-1.5 2l1.5 2M3.64 18.36l.7-.7m0-11.32l-.7-.7"/></g></svg> Afficher la météo
            `;
        }
           
            
        
        
        actions.append(clear, submit);
        form.append(actions);


        card.append(form);
        page.append(card);
        this.#root.append(page);
    }

    /**
     * methode privee : soumissiont du formulaire de recherche
     * 
     * @param {Event} event l'evenement de soumission du formulaire
     * 
     */

    async #handleSubmit(event){
        // on desactive le comportement par defaut du formulaire
        event.preventDefault();
        const form = new FormData(event.target);
        const city = form.get('city');
        const lat = form.get('lat');
        const lon = form.get('lon');    
        console.log("form data :", {city, lat, lon});

        if(!city && (!lat || !lon)){
            this.#setState({ error: 'Veuillez saisir une ville ou des coordonnées valides.',lastResult: null});
            return;
            
        }
        this.#setState({ loading: true, error: '', lastResult: null});

        const search = city ? { q: city } : { lat, lon };
        console.log("search params :", search);
        const response = await this.#service.getCurrent(search);
        console.log("response API :", response);
        
        if(!response.ok){
            this.#setState({ loading: false , error: response.error || 'Erreur inconnue'});

            return;
        }
        this.#setState({ loading: false, error: '', lastResult: response.data});
        console.log("etat du state :", this.#state);
    }

    /**
     * methode pour mettre a jour le state
     * @param {object} next un objet avec les nouvelles valeurs du state
     */
    #setState(next){
        this.#state = { ...this.#state, ...next};
        this.#render();
    }
        

 
    mount(){
        this.#render();
    }
}
 