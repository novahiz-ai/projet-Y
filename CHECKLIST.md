# CHECKLIST DE VALIDATION SOUVERAINE (V4.0-S)

Avant chaque réponse, modification ou déploiement, les points suivants doivent être impérativement validés :

## 1. RUNTIME & DÉPENDANCES
- [ ] **Importmap Intact :** Aucune modification implicite des versions. Pinning strict requis.
- [ ] **React Singleton :** Vérification de l'absence de double bundle React dans le runtime client.
- [ ] **Modèle ESM :** Conformité totale au modèle sans bundler.
- [ ] **Compatibilité React 19 :** Aucune API dépréciée utilisée.

## 2. DÉPLOIEMENT VERCEL
- [ ] **Classification Dépendances :** Build vs Runtime correctement identifié.
- [ ] **Edge Runtime :** Validation des APIs compatibles (pas de `fs`, `path` ou modules Node.js natifs).
- [ ] **Sécurité Variables :** Absence de clés API en clair dans le code.
- [ ] **Rendu Client-Only :** Isolation des librairies sensibles (SignaturePad, Recharts).

## 3. STRUCTURE & MODULARISATION
- [ ] **Snapshot Inviolable :** Les structures de pages et le routage sont préservés.
- [ ] **Externalisation :** Blocs > 50 lignes déplacés dans `components/`.
- [ ] **Propriété .text :** Extraction des réponses Gemini via la propriété `.text` exclusivement.

## 4. DESIGN & UX
- [ ] **Tokens Design :** Utilisation stricte des variables de thème CSS.
- [ ] **Accessibilité :** Attributs ARIA présents sur les nouveaux composants.
- [ ] **Responsive :** Validation mobile/tablette/desktop.

**DÉCISION FINALE REQUISE : AUTORISÉ | AUTORISÉ_SOUS_RÉSERVE | BLOQUÉ**