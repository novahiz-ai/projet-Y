import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Enregistrement du Service Worker pour le mode Offline
// Correction V16.3 : Vérification de l'origine pour éviter les erreurs de sécurité sur ai.studio
if ('serviceWorker' in navigator && window.location.origin.includes('usercontent.goog')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => {
      // Échec silencieux car non critique pour le fonctionnement de l'app
      console.debug('Service Worker non enregistré (environnement restreint)');
    });
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);