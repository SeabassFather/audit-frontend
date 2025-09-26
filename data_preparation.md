# Data Preparation for AuditDNA Frontend

## 1. Purpose

This document specifies all steps, standards, and validation rules for preparing data sources used by the AuditDNA frontend. This ensures data integrity, accuracy, and seamless integration across all app modules.

---

## 2. Accepted Data Formats

- **JSON** (preferred for config, lookup tables, service lists)
- **RESTful API** endpoints (for dynamic, live data)
- **CSV/Excel** (for bulk uploads, converted to JSON before use)
- **File Uploads** (PDF, images, reports—handled by backend and referenced via API)

---

## 3. Data Structure Requirements

### Service Lists (e.g. `data_overview.json`)

- Must be grouped by category
- Each category contains an array of service names
- All keys and values must be UTF-8 encoded
- Example:
  ```json
  {
    "Agriculture & Food Systems": [
      "USDA Pricing Engine",
      "Produce Search Engine",
      ...
    ],
    "Mortgage & Real Estate": [
      "Mortgage Search Engine",
      ...
    ]
  }
  ```

### Tabular Data (e.g. lender lists, contracts, analytics)

- Use an array of objects
- Each object must have all required fields; optional fields are allowed
- Keys use camelCase or snake_case, not spaces
- Example:
  ```json
  [
    { "name": "Wells Fargo", "state": "CA", "industry": "Residential", "rate": 6.2 },
    ...
  ]
  ```

---

## 4. Data Validation Rules

- No null, undefined, or empty values for required fields
- All numeric fields must be valid numbers (no strings unless required)
- Dates must be ISO 8601 or valid timestamp
- Strings must be trimmed, sanitized, and free of control characters
- For API sources, validate response schema with every fetch

---

## 5. Upload & Sync Process

- All static data files (`.json`, `.csv`) are committed and versioned in the repository
- Dynamic data is fetched from backend APIs, which enforce schema validation before responding
- File uploads are stored securely and referenced via unique IDs or URLs

---

## 6. Data Change Workflow

1. Prepare data in accepted format
2. Run local validation scripts (see `/scripts/validate_data.js`)
3. Commit changes with clear message (e.g. `Update lender list for Mortgage module`)
4. Open PR for review; automated checks will run
5. Merge only after successful validation and reviewer approval

---

## 7. Documentation

- All data sources must be documented in `/docs/data_sources.md`
- For each data file or API, document:
  - Purpose
  - Format
  - Example payload
  - Update frequency
  - Responsible team/member

---

## 8. Security & Compliance

- Sensitive data (PII, financial, medical) must be encrypted in transit and at rest
- Access controls are enforced for uploads and API endpoints
- Compliance standards (GDPR, HIPAA, etc) must be documented per dataset

---

## 9. Troubleshooting

- If data fails to load: check schema, encoding, and access permissions
- Use logs and validation scripts for diagnosis
- Contact data steward or backend team for resolution

---

_Last updated: 2025-09-26 by @SeabassFather_