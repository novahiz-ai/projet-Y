
# REGISTRE DES RESTRICTIONS (V1.1)

Ce fichier consigne les interdictions formelles dictées par l'utilisateur pour l'évolution de l'application.

## DESIGN & TYPOGRAPHIE
- **PROHIBITION_001** : Interdiction d'utiliser des tailles de police supérieures à `text-6xl` pour les titres, même sur les résolutions ultra-larges. L'élégance prime sur la masse.
- **PROHIBITION_002** : Interdiction des espacements verticaux (padding-top/bottom) supérieurs à `py-24`. Le contenu doit rester dense et dynamique.
- **PROHIBITION_003** : Interdiction des ombres portées trop dures (ex: `shadow-2xl` sans opacité contrôlée). Privilégier des ombres diffuses et colorées (`shadow-brand/20`).
- **PROHIBITION_008** : Interdiction d'utiliser des teintes sombres (ex: brand-primary #4f46e5) directement sur des fonds noirs ou slate-900 sans ajustement de luminosité. Privilégier des teintes "light" ou "pastel" (ex: indigo-300/400) pour les éléments textuels critiques.
- **PROHIBITION_009** : Interdiction formelle d'utiliser l'icône de type "étoiles scintillantes" (Sparkles/Magic) dans toute l'application. Cette icône est jugée intrusive et non représentative du sérieux financier attendu.

## STRUCTURE & COMPOSANTS
- **PROHIBITION_004** : Interdiction de supprimer l'avertissement de crédit obligatoire ("Un crédit vous engage...") du footer. 
- **PROHIBITION_010** : **INTERDICTION ABSOLUE** de mentionner des certifications techniques, numéros d'agrément ACPR ou ORIAS sur l'ensemble du site (Header, Footer, Hero, Cartes). Ces mentions sont exclusivement réservées à la page "Mentions Légales". Elles sont jugées anxiogènes et contraires au design minimaliste.
- **PROHIBITION_005** : Interdiction d'utiliser des images sans superposition (overlay) adaptative. La lisibilité du texte sur image est une priorité absolue.
- **PROHIBITION_007** : [ANNULÉE PAR INSTRUCTION UTILISATEUR] Initialement l'interdiction d'afficher les témoignages, désormais autorisée sous réserve de design moderne et européen.

## LOGIQUE MÉTIER
- **PROHIBITION_006** : Interdiction d'afficher le Chatbot ou le Footer pendant les phases de simulation active pour éviter toute distraction cognitive.
