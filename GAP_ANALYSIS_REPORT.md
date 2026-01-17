# Gap Analysis Report: Production Frontend vs. Legacy Backend

## Executive Summary
This report compares the "Production Ready Frontend" (`apps/web`) and the proposed `schema.prisma` against the "Legacy Test Backend" (`reference_code`). The goal is to identify missing features and data models that must be migrated to ensure the new system has feature parity with the legacy test environment.

## Critical Gaps Identified

### 1. Medicine & Inventory Management (High Impact)
The legacy system has a highly detailed `Medicine` model suitable for pharmaceutical compliance. The new schema is too simplistic.

| Feature | Legacy Backend (`models/medicine.py`) | New Schema (`schema.prisma`) | Impact |
| :--- | :--- | :--- | :--- |
| **Clinical Info** | `composition`, `indications`, `side_effects`, `contraindications` | ❌ Missing | Doctors/Pharmacists cannot see drug interactions or advice. |
| **Formulation** | `dosage_form` (Tablet, Syrup, etc.), `strength` (500mg), `pack_size` | ❌ Missing | Cannot distinguish between Paracetamol 500mg vs 650mg. |
| **Regulatory** | `DrugSchedule` (H, H1, X), `HSNCode` (GST), `is_narcotic` | ❌ Missing | **Compliance Risk**. Cannot calculate GST or enforce prescription rules. |
| **Pricing** | `ptr` (Retailer Price), `pts` (Stockist Price), `mrp` | Only `unitPrice`, `costPrice` | Cannot handle B2B pricing or margin calculations. |
| **Master Data** | Separate tables for `Manufacturer`, `Category` | String fields only | Data duplication and lack of standardization. |

### 2. Medicine Equivalence (High Impact)
**Legacy Logic**: Uses `generic_name` + `strength` + `dosage_form` to find substitutes.
**Gap**: Without `strength` and `dosage_form` in the new schema, the "Find Generic Substitute" feature (critical for the Pharmacist Portal) will fail or return inaccurate results (e.g., suggesting a 500mg tablet for a 10mg injection).

### 3. Audit & Security (Medium Impact)
**Legacy Logic**: `AuditLog` table tracks `old_values`, `new_values`, `ip_address`, `action` (LOGIN, VIEW, UPDATE).
**Gap**: The new schema has no `AuditLog` model. The Frontend `HospitalAuditPage` exists but has no backend table to fetch data from.

### 4. AI & Chatbot (Medium Impact)
**Legacy Logic**: `chatbot.py` integrates with LM Studio.
**Gap**: No database storage for `ChatSession` or `ChatMessage`. The AI features in the frontend (`AIExplanationDrawer`) need a place to store history.

### 5. ML Model Registry (Low Impact)
**Legacy Logic**: `MLModel` table tracks model versions, accuracy (RMSE, MAE), and training dates.
**Gap**: Missing in new schema. Harder to track which model version is currently serving predictions.

## Recommendations

1.  **Upgrade `Medicine` Model**: Add all missing fields (strength, dosage, composition, etc.).
2.  **Create Master Tables**: Add `Manufacturer`, `TherapeuticCategory`, `DrugSchedule`.
3.  **Add `AuditLog` Model**: To support the Audit Page.
4.  **Add `ChatSession` & `ChatMessage` Models**: To support the AI Assistant.
5.  **Add `MLModelRegistry`**: To track the Python ML service's performance.

## Next Steps
I will now update `apps/api/prisma/schema.prisma` to incorporate these missing models and fields.
