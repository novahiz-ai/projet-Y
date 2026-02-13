# ==========================================================
# V15 — SOVEREIGN AI RUNTIME
# Edition: Google AI Studio + Supabase
# Niveau: Banque / SaaS critique / Multi-tenant
# ==========================================================

SYSTEM_ROLE: AI_Studio_Runtime_Governor
EXECUTION_MODE: Deterministic_Structure_Lock
TARGET_ENV:
  - Google_AI_Studio
  - Supabase
SECURITY_LEVEL: Financial_Infrastructure_Grade

# ==========================================================
# 1. OBJECTIF
# ==========================================================

PRIMARY_OBJECTIVES:
  - Empêcher mutation structurelle non déclarée
  - Stabiliser génération AI Studio
  - Garantir cohérence base Supabase
  - Forcer typage strict end-to-end
  - Maintenir conformité audit-ready
  - Assurer sécurité maximale des clés et secrets

# ==========================================================
# 2. RÈGLES SPÉCIFIQUES GOOGLE AI STUDIO
# ==========================================================

AI_STUDIO_CONSTRAINTS:
  - Ne jamais réécrire un composant existant sans instruction explicite
  - Ne jamais changer nom fichier sans migration déclarée
  - Interdiction de supprimer imports existants
  - Respect strict de l’architecture déclarée
  - Interdiction d’injecter logique hors périmètre demandé

AI_STUDIO_STRUCTURE_LOCK:
  ENABLED: true
  PROTECTED:
    - folder_structure
    - shared_types
    - global_state
    - environment_config

# ==========================================================
# 3. SUPABASE GOVERNANCE
# ==========================================================

SUPABASE_POLICY:
  SCHEMA_LOCK: true
  REQUIRE_MIGRATION_FILE: true
  FORBIDDEN:
    - DROP_TABLE without migration
    - ALTER_TYPE silent
    - Direct schema overwrite

SUPABASE_RLS:
  ENABLED: true
  REQUIRED_ON:
    - user_data
    - payments
    - accounting
  POLICY_RULES:
    - deny_by_default
    - explicit_allow_only

SUPABASE_TYPES:
  AUTO_GENERATE_TYPES: true
  TYPE_SYNC_REQUIRED: true
  BLOCK_BUILD_IF_DESYNC: true

# ==========================================================
# 4. TYPE FINGERPRINTING GLOBAL
# ==========================================================

TYPE_FINGERPRINTING:
  ENABLED: true
  HASH_ALGORITHM: SHA-256
  INCLUDE:
    - frontend_types
    - supabase_generated_types
    - api_contracts
  ACTION_ON_MISMATCH:
    - block_generation
    - require_mutation_log

TYPE_MANIFEST:
  FILE: type-manifest.json
  VERSIONING: semantic
  REQUIRE_SIGNATURE: true

# ==========================================================
# 5. CI/CD POLICY (Vercel / GitHub / Local CI)
# ==========================================================

CI_POLICY:
  BLOCK_IF:
    - type_hash_changed_without_log
    - supabase_types_not_regenerated
    - migration_missing
    - rls_disabled
    - environment_variable_missing
  REQUIRE:
    - deterministic_build
    - lint_clean
    - strict_types_pass

# ==========================================================
# 6. ARCHITECTURE REACT ULTRA STABLE
# ==========================================================

FRONTEND_ARCHITECTURE:
  FRAMEWORK: React
  PATTERN: CleanArchitecture
  FOLDERS:
    - /core
    - /domain
    - /application
    - /infrastructure
    - /ui
  RULES:
    - domain isolated from ui
    - infrastructure depends on domain only
    - no circular dependency
    - no implicit any
    - readonly state by default

STATE_MANAGEMENT:
  - immutable_updates_only
  - no global mutation
  - typed context providers only

# ==========================================================
# 7. MULTI-PAYS (FR / DE READY)
# ==========================================================

MULTI_COUNTRY_MODE:
  ENABLED: true
  ISOLATION:
    - country_config_separated
    - compliance_rules_per_country
  REQUIRED:
    - audit_export_per_country
    - ledger_trace_per_country

# ==========================================================
# 8. AUDIT MODE
# ==========================================================

AUDIT_MODE:
  ENABLED: true
  EXPORT_PACKAGE:
    - type_manifest
    - supabase_schema_snapshot
    - migration_history
    - rls_policies
    - build_hash
  FORMAT: regulator_ready_json

# ==========================================================
# 9. ANALYSE PRÉDICTIVE AVANT MUTATION
# ==========================================================

IMPACT_ANALYSIS:
  ENABLED: true
  CHECK:
    - impacted_tables
    - impacted_types
    - impacted_components
  RISK_CLASSIFICATION:
    - LOW
    - MEDIUM
    - HIGH
    - CRITICAL
  CRITICAL_POLICY:
    - require_manual_validation
    - block_auto_merge

# ==========================================================
# 10. SÉCURITÉ ENVIRONNEMENT & ROTATION CLÉS SUPABASE (V13)
# ==========================================================

SUPABASE_KEY_ROTATION:
  ENABLED: true
  ROTATION_INTERVAL: 24h
  SAFE_REDEPLOY: true
  AUDIT_LOG: true
  ALERT_ON_FAILURE: true

ENVIRONMENT_POLICY:
  REQUIRE:
    - SUPABASE_URL
    - SUPABASE_ANON_KEY
    - SERVICE_ROLE_KEY_protected
  FORBIDDEN:
    - expose_service_role_frontend
    - hardcoded_secrets

# ==========================================================
# 11. DÉTECTION IA DES PATTERNS INSTABLES (V14)
# ==========================================================

CODE_STABILITY_AI:
  ENABLED: true
  SCAN_ON_COMMIT: true
  DETECT_PATTERNS:
    - implicit_mutation
    - circular_dependency
    - unsafe_state_update
    - silent_type_override
  ACTION_ON_DETECTION:
    - block_merge
    - notify_dev_team
    - suggest_fix

# ==========================================================
# 12. AUTO-SPLIT INTELLIGENT DU PROJET (V15)
# ==========================================================

PROJECT_AUTO_SPLIT:
  ENABLED: true
  CRITERIA:
    - folder_size > 50MB
    - component_complexity_score > threshold
    - circular_dependency_risk
  ACTIONS:
    - split_folder
    - create_shared_lib
    - update_import_paths
    - regenerate_types
  AUDIT_LOG: true

# ==========================================================
# 13. INTERDICTIONS ABSOLUES
# ==========================================================

FORBIDDEN:
  - silent_refactor
  - implicit_schema_change
  - type_override_without_log
  - direct_db_modification_without_migration
  - disable_rls

# ==========================================================
# FIN V15
# ==========================================================