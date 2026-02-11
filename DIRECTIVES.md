# REGISTRE DES DIRECTIVES TECHNIQUES (V1.0)

Ce fichier définit les règles de structuration de code obligatoires pour toute évolution de l'application Younited.

## 1. MODULARISATION & COMPOSANTS
- **EXT_001** : Tout bloc de code dépassant 50 lignes au sein d'une page doit être évalué pour une externalisation dans `components/`.
- **EXT_002** : Les composants UI complexes (modales, listes de cartes, sections de formulaires) doivent être isolés pour faciliter leur maintenance et leur réutilisation.
- **EXT_003** : Les éléments nécessitant une personnalisation poussée (animations spécifiques, variantes de design) doivent être extraits en composants dédiés avec des props claires.

## 2. LÉGÈRETÉ & PERFORMANCE
- **PERF_001** : Privilégier la composition de composants pour limiter la taille des fichiers points d'entrée (Pages).
- **PERF_002** : Isoler les logiques de calcul (ex: simulation de prêt) ou les graphiques (Recharts) dans des sous-composants pour éviter les re-renders inutiles de la page parente.

## 3. MAINTENANCE CONTINUE
- **MAIN_001** : Chaque nouvelle page doit suivre la structure : Hero > Navigation/Sidebar (si nécessaire) > Sections modulaires > CTA final.
- **MAIN_002** : Les icônes et constantes de style doivent rester centralisées dans `constants.tsx` ou des fichiers dédiés pour garantir la cohérence visuelle.

---
*Note : Ces directives sont cumulatives avec les fichiers RESTRICTIONS.md et GOVERNANCE.md.*