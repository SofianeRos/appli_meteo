/**
 * point d'entree principal de l'application
 * 
 * c'est le premier fichier a etre executer lors du demmarage de l'application
 * 
 * 1. on importe le css
 * 2. import de la classe App
 * 3. recuperation de l'element DOM racine
 * 4. creation de l'instance de l'application
 * 5. Montage de l'application dans le DOM
 */




// 1. on importe le css

import './style.css';

// 2. import de la classe App
import { App } from './app.js';

// 3. recuperation de l'element DOM racine
const appContainer = document.getElementById('app');

// 4. creation de l'instance de l'application
const app = new App(appContainer);

// 5. Montage de l'application dans le DOM
app.mount();