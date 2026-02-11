# REGISTRE DES RESTRICTIONS (V1.2 - 4.0-S)

Ce fichier consigne les interdictions formelles pour maintenir l'intégrité souveraine.

## SÉCURITÉ & INFRASTRUCTURE
- **PROHIBITION_SEC_001** : Interdiction absolue d'importer `@google/genai` dans un composant client si la clé API est requise côté client. Le passage par un proxy ou un middleware est obligatoire.
- **PROHIBITION_SEC_002** : Interdiction de définir `process.env` manuellement dans le code.
- **PROHIBITION_SEC_003** : Interdiction d'exposer des routes API non sécurisées sans RLS (Row Level Security) si un backend est connecté.

## RUNTIME & BUILD
- **PROHIBITION_RUN_001** : Interdiction d'utiliser des plugins Vite modifiant la résolution globale de React au-delà de l'importmap défini.
- **PROHIBITION_RUN_002** : Interdiction d'installer des binaires natifs (`postinstall`) incompatibles avec les environnements cloud standard.

## DESIGN & UX (RAPPEL)
- **PROHIBITION_001** : Taille de police titre <= `text-6xl`.
- **PROHIBITION_009** : Interdiction de l'icône "Sparkles/Magic" (Sérieux financier exigé).
- **PROHIBITION_010** : Mentions d'agrément réservées exclusivement à la page "Mentions Légales".

## GOUVERNANCE IA
- **PROHIBITION_IA_001** : Interdiction pour l'IA de proposer des changements structurels (suppression de pages, renommage de fichiers racines) sans instruction utilisateur explicite et auditée.