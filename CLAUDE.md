# Firearms Management System — Frontend

## Project Overview

**Application name:** Armoury System / "Comprehensive Management Platform"
**Figma file:** `figma.com/design/yCORKm7KffwPgmjjC0SWsn/🔫-Amoury-Design--Copy-` (Page 1)
**Backend:** FastAPI at `http://localhost:5000`, base path `/api/v1/`
**Framework:** Nuxt 3 + Vue 3, Tailwind CSS v4, Shadcn-Vue (prefix `''`), Reka-UI
**Theme:** Dark theme only — forced via `@nuxtjs/color-mode` with `preference: 'dark'`

---

## Tech Stack

- **UI:** Shadcn-Vue (via `shadcn-nuxt`), Reka-UI primitives, Lucide Vue Next icons
- **Tables:** TanStack Vue Table
- **Charts:** ApexCharts / `vue3-apexcharts`
- **Forms:** VeeValidate + Zod
- **State:** Pinia
- **Toasts:** Vue Sonner
- **Auth:** JWT Bearer tokens via `access_token` + `refresh_token` cookies

---

## Authentication

- Login: `POST /api/v1/auth/login` (form-data: username, password)
- Logout: `POST /api/v1/auth/logout` (body: refresh_token)
- Token refresh: `POST /api/v1/auth/refresh` (body: refresh_token)
- Auth middleware at `app/middleware/auth.ts` — redirects to `/auth/login` if no token
- `useApi` composable (`app/composables/util/useApi.ts`) wraps `$fetch`, auto-retries on 401 with token refresh
  - Exposes: `get`, `post`, `put`, `patch`, `delete`, `useFetch`
  - `apiBase` from `useRuntimeConfig().public.apiBase`

---

## Design System

### Layout Dimensions
- Full page frame: 1600px wide
- Sidebar width: ~256px
- Main content area: 1344px (starts at x=256)

### Color Palette (dark theme)
| Usage | Value |
|---|---|
| Page / sidebar background | `#0A0E1A` |
| Card background (elevated) | `#161b27` |
| Card background (data rows) | `#1D293D` |
| Stat card — firearms (blue) | `#0f1829` + border `#1e3a5f` |
| Stat card — malfunction (red) | `#1a0d0d` + border `red-900/35` |
| Stat card — deployment (purple) | `#130d1f` + border `purple-900/35` |
| Stat card — ammo variance (orange) | `#1a0e08` + border `orange-900/35` |
| Default border | `#1e2535` |
| Text primary | `slate-100` / `slate-200` |
| Text muted | `slate-500` |
| Text secondary | `slate-400` |
| Primary accent | `blue-500` / `blue-600` |
| Warning badge | `amber-400/500` |
| Critical/danger | `red-400/500` |
| Deployment/purple | `purple-400` |
| Ammo variance | `orange-500` |
| Active status | `emerald-500` |
| Logo background | `blue-600` |

### Typography
- Page title (H1): `text-2xl font-bold text-slate-100 -tracking-[0.3px]`
- Section heading: `text-[15-16px] font-semibold`
- Stat number: `text-[28px] font-bold`
- Nav section label: 10.5px, bold, tracking 0.8px, uppercase, `slate-500`
- Table headers: `text-[12-13px] font-medium`
- Body text: `text-[13-14px]`
- Badges/Tags: `text-[10px] font-bold`

### Spacing & Radius
- `--radius: 0.625rem`
- Card border radius: `rounded-xl`
- Row border radius: `rounded-[10px]`
- Page padding: `p-6`
- Card padding: `px-5–7 py-5–7`

### Date/Currency Format
- Dates: `DD/MM/YYYY, HH:MM:SS`
- Currency: TZS (Tanzanian Shillings)

---

## Layout

- `AdminLayout.vue` — SidebarProvider + AppSidebar + SidebarInset (dark header)
- `AppSidebar.vue` — collapsible (`collapsible="icon"`) grouped nav using Shadcn Sidebar
- Sidebar footer: user display (`[Initial]. [Surname] / [ROLE]`) + Sign Out button

### Sidebar Navigation Groups
```
OVERVIEW
  └── Dashboard           → /admin/dashboard

MASTER DATA
  ├── Use Locations       → /admin/locations
  ├── Arms Register       → /admin/arms-register
  ├── Ammunition          → /admin/ammunition
  ├── Security Devices    → /admin/security-devices
  └── Users & Roles       → /admin/users

OPERATIONS
  ├── Firearm Handover    → /admin/firearms-allocation
  ├── SP Deployment       → /admin/deployment
  ├── Ammo Requests       → /admin/requests
  └── Occurrence Book     → /admin/occurrence

REPORTS
  └── All Reports         → /admin/reports

SYSTEM
  └── Settings            → /admin/settings
```

---

## Pages & Figma Node IDs

| Screen | Figma Node | Route |
|---|---|---|
| Dashboard | `1:31442` | `/admin/dashboard` |
| Arms Register | `1:31426` | `/admin/arms-register` |
| Ammunition Inventory | `1:31427` | `/admin/ammunition` |
| Security Devices & Fire Brigades | `1:31428` | `/admin/security-devices` |
| Use Locations | `1:31423` | `/admin/locations` |
| Users & Roles | `1:31430` | `/admin/users` |
| Issue Firearms | `1:31431` | `/admin/firearms-allocation` |
| Return Firearms | `1:31432` | `/admin/firearms-allocation` (tab) |
| Handover History | `1:31433` | `/admin/firearms-allocation` (tab) |
| SP Deployment | `1:31436` | `/admin/deployment` |
| All Deployments | `1:31435` | `/admin/deployment` (tab) |
| Upcoming Deployments | `1:31434` | `/admin/deployment` (tab) |
| Ammunition Requests | `1:31438` | `/admin/requests` |
| Occurrence Book & Inspections | `1:31439` | `/admin/occurrence` |
| Reports & Analytics | `1:31441` | `/admin/reports` |

---

## Data Models

### User
- Fields: `first_name`, `surname`, `initial`, `title`, `file_number` (e.g. ADM001), `email`, `phone`, `directorate`, `department`, `branch_id`, `role`, `status` (ACTIVE/INACTIVE)
- File number patterns: ADM001, MIS001, AMIS001, BISO001, AK001, MAK001, SP001–SP006, AUD001

### Roles (8)
`system_admin`, `manager` (MIS), `amis`, `biso`, `main_armory_keeper`, `armory_keeper`, `security_personnel`, `auditor`

### Role Display Labels
| Slug | Label |
|---|---|
| system_admin | SYSTEM_ADMIN — System Administrator |
| manager | MIS — Manager Internal Security |
| amis | AMIS — Assistant Manager Internal Security |
| biso | BISO — Branch Information Security Officer |
| main_armory_keeper | MAK — Main Armoury Keeper |
| armory_keeper | AK — Armoury Keeper |
| security_personnel | SP — Security Personnel |
| auditor | AUDITOR |

### Branches (7)
Dodoma HQ (head office), Dar es Salaam Sub-HQ, Arusha Branch, Mbeya Branch, Mtwara Branch, Mwanza Branch, Zanzibar Sub-HQ

### Firearm
- `barcode`, `car_number`, `make`, `model`
- `firearm_type`: PISTOL | RIFLE | REVOLVER | SHOTGUN | SHORT_GUN
- `condition`: GOOD | MALFUNCTION
- `availability`: ARMOURY | DUTY | IN_TRANSIT | MAINTENANCE | DISPOSED | LOST
- `weapon_number`, `branch_id`, `location_id`, `planned_maintenance_date`, `estimated_cost` (TZS), `photograph_url`, `registered_by_id`
- `approval_status`: PENDING | APPROVED | REJECTED (with `rejection_reason`)

### AmmunitionType
- `name` (e.g. "9mm Parabellum", ".45 ACP", "7.62mm", "12 Gauge", ".40 S&W")
- `applicable_firearms`: PISTOL | RIFLE | SHOTGUN | MACHINE_GUN

### Ammunition Inventory
- `ammunition_type_id`, `batch_lot_number` (BATCH2024-XXX format), `quantity`
- `armoury_location`: MAIN | SUB
- `status`: GOOD | LOW | CRITICAL | IN_TRANSIT

### Handover
- `deployment_id`, `firearm_id`, `ammo_issued`, `ammo_returned` (nullable)
- `issued_at`, `returned_at` (nullable)
- `status`: ON_DUTY | RETURNED | COMPLETED | OVERDUE
- `otp_verified` — issuance requires OTP verification (Generate OTP & Issue flow)

### Deployment
- `security_personnel_id`, `duty_assignment` (e.g. "Day shift - Server Room")
- `duty_type`: PLANNED_SHIFT
- `scheduled_start`, `scheduled_end`
- `status`: SCHEDULED | ACTIVE | COMPLETED

### Location
- `name`, `type`: in_office | out_of_office
- `specific_area` (e.g. Server Room, VIP Protection), `branch_id`

### SecurityDevice
- `device_name`, `device_id`, `device_type`, `use_purpose`, `quantity`
- `location_id`, `branch_id`
- `status`: GOOD | MALFUNCTION | MAINTENANCE
- `next_inspection_date`

### AmmoRequest
- `request_type`: BRANCH_TO_BRANCH | BRANCH_TO_HQ
- `requesting_branch_id`, `supplying_branch_id`, `collecting_officer_id`
- `status`: NEW | APPROVED | VERIFIED | IN_TRANSIT | COMPLETED
- `items`: list of `{ ammunition_type_id, quantity }`

### OccurrenceBook
- `occurrence_type`: PLANNED_SHIFT | EQUIPMENT_ISSUE | EMERGENCY | SECURITY_ISSUE
- `duty_type`, `details`, `time`, `reported_by_id`
- `biso_response` (nullable)

### InspectionReport
- `inspection_type`: SCHEDULED | SURPRISE | QUARTERLY
- `status`: OK | NOT_OK
- `findings`, `recommendations`, `biso_instructions` (nullable), `inspected_by_id`, `date`

---

## Key UI Behaviours & Decisions

1. **Approval workflow** — New firearms submitted by BISOs are PENDING; MIS/AMIS approves or rejects via "Pending Approvals" panel in Arms Register
2. **OTP-gated issuance** — Firearm handover requires 6-digit OTP; button label is "Generate OTP & Issue"
3. **Firearm Handover page** has 3 tabs: Issue Firearms | Return Firearms | Handover History
4. **SP Deployment page** has 3 tabs: All Deployments | Active | Upcoming
5. **Ammunition page** has 2 tabs: Inventory | Ammunition Types
6. **Dashboard action cards** use `→` arrows for navigation links
7. **Sidebar collapsible** to icon-only mode (`collapsible="icon"`)
8. **Page subtitles** use `·` separator (e.g. "Organization-wide overview · Branch-level operations and alerts")
9. **Role-based access** controls which sidebar items and actions are visible

---

## Dashboard Panels (summary)

- **Stat cards (4):** Total Firearms (blue), Malfunctioning Arms (red), Active Deployments (purple), Ammo Variance Alerts (orange)
- **Risk Heat Indicators:** Low Ammunition Stock (WARNING), Maintenance Overdue (CRITICAL)
- **Branch Locations & Risk Map:** per-branch card with Total / Available / On Duty / Issues
- **Out-of-Office Deployments:** active SP deployments list
- **Charts:** Daily Activity Trends (line), Ammunition Usage Trend (bar), Firearms Status Distribution (donut), Firearms by Availability (bar/pie)
- **Action items row:** Late Return Alerts, Low Ammo Stock, Today's Handovers, Branch Availability, Pending OTP Handovers, Returns Due Today, Maintenance Due


# Firearms Backend Service — CLAUDE.md

## Project Overview

A FastAPI backend for a firearms management system (ArmoryCore). Handles user management, role-based access control, branch/location management, and notifications. Built async-first with PostgreSQL, Redis, Celery, and MinIO.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | FastAPI (async) |
| ORM | SQLAlchemy 2.x (async, `AsyncSession`) |
| Database | PostgreSQL via `asyncpg` |
| Migrations | Alembic |
| Pagination | `fastapi-pagination` with explicit `Params` |
| Auth | JWT (access + refresh) via `python-jose`, bcrypt |
| Cache/Broker | Redis |
| Task queue | Celery |
| Object storage | MinIO (S3-compatible) |
| Email | SMTP |
| Validation | Pydantic v2 |
| Settings | `pydantic-settings` (`.env` file) |

---

# Firearms Backend Service — CLAUDE.md

## Project Overview

A FastAPI backend for a firearms management system (ArmoryCore). Handles user management, role-based access control, branch/location management, and notifications. Built async-first with PostgreSQL, Redis, Celery, and MinIO.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | FastAPI (async) |
| ORM | SQLAlchemy 2.x (async, `AsyncSession`) |
| Database | PostgreSQL via `asyncpg` |
| Migrations | Alembic |
| Pagination | `fastapi-pagination` with explicit `Params` |
| Auth | JWT (access + refresh) via `python-jose`, bcrypt |
| Cache/Broker | Redis |
| Task queue | Celery |
| Object storage | MinIO (S3-compatible) |
| Email | SMTP |
| Validation | Pydantic v2 |
| Settings | `pydantic-settings` (`.env` file) |

---

## Project Structure

```
app/
├── api/v1/
│   ├── router.py              # Mounts all routers under /api/v1
│   └── endpoints/
│       ├── auth.py            # Login, refresh, OTP
│       ├── users.py           # User CRUD
│       ├── roles.py           # Role & permission management
│       ├── branches.py        # Branch CRUD + search/filter
│       ├── locations.py       # Location CRUD + search/filter
│       ├── notifications.py   # User notifications
│       └── util.py            # Health/utility routes
├── core/
│   ├── security.py            # JWT helpers, auth dependencies
│   ├── exceptions.py          # Typed HTTP exceptions
│   ├── email.py               # Email sending
│   ├── otp.py                 # OTP generation/validation
│   ├── logging.py             # Logger factory
│   ├── middleware.py          # Request middleware
│   └── storage.py             # MinIO client
├── crud/                      # Async DB operations per domain
├── db/
│   ├── base.py                # DeclarativeBase (auto created_at/updated_at)
│   ├── session.py             # AsyncSession factory
│   ├── redis_client.py        # Redis connection
│   └── constant.py            # DB-level constants
├── models/                    # SQLAlchemy ORM models
├── schemas/                   # Pydantic request/response schemas
├── workers/
│   ├── celery_app.py          # Celery app init
│   ├── tasks.py               # General async tasks
│   └── notification_tasks.py  # Notification-specific tasks
├── config.py                  # Settings via pydantic-settings
├── dependencies.py            # FastAPI dependency aliases
└── main.py                    # App factory
```

---

## Database Models

### Base (`app/db/base.py`)
All models inherit from `Base`. Auto-injected columns:
- `created_at: DateTime(timezone=True)` — server default `now()`
- `updated_at: DateTime(timezone=True)` — server default `now()`, auto-updated on change

### `User` (`app/models/user.py`)
Table: `users`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | auto uuid4 |
| `username` | String(255) | unique, indexed |
| `email` | String(255) | unique, indexed |
| `first_name` | String(100) | nullable |
| `surname` | String(100) | nullable |
| `initial` | String(10) | nullable |
| `file_number` | String(50) | unique, nullable |
| `title` | String(50) | nullable |
| `department` | String(255) | nullable |
| `directorate` | String(255) | nullable |
| `phone_number` | String(50) | nullable |
| `hashed_password` | String | required |
| `status` | Enum(`UserStatus`) | default `active` |
| `is_active` | Boolean | default `True` |
| `is_superuser` | Boolean | default `False` |
| `last_login` | DateTime | nullable |
| `notes` | Text | nullable |
| `role_id` | UUID FK → `roles.id` | SET NULL on delete |
| `branch_id` | UUID FK → `branches.id` | SET NULL on delete |

Relationships: `role` (selectin), `branch` (selectin)

**`UserStatus` enum:** `active`, `disabled`, `suspended`, `banned`

---

### `Role` & `Permission` (`app/models/role.py`)
Tables: `roles`, `permissions`, `role_permissions` (M2M association)

**`Role`:** `id`, `name`, `abbreviation`, `description`, `is_system`
- `permissions` → M2M via `role_permissions` (selectin loaded)

**`Permission`:** `id`, `name`, `slug` (unique), `category`

**`PermissionCategory` enum:** `inventory`, `allocations`, `users`, `audit`, `handover`, `ammo_requests`

---

### `Branch` (`app/models/branch.py`)
Table: `branches`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | |
| `name` | String(255) | unique, indexed |
| `location` | String(500) | nullable |
| `type` | Enum(`BranchType`) | default `branch` |

**`BranchType` enum:** `branch`, `head_office`, `sub_hq`

---

### `Location` (`app/models/location.py`)
Table: `locations`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | |
| `name` | String(255) | indexed |
| `type` | Enum(`LocationType`) | required |
| `specific_area` | String(255) | nullable |
| `branch_id` | UUID FK → `branches.id` | SET NULL on delete |

Relationships: `branch` (selectin)

**`LocationType` enum:** `in_office`, `out_of_office`

---

### `Notification` (`app/models/notification.py`)
Table: `notifications`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | |
| `user_id` | UUID FK → `users.id` | CASCADE delete |
| `title` | String(255) | |
| `body` | Text | |
| `type` | Enum(`NotificationType`) | |
| `data` | JSON | nullable, arbitrary metadata |
| `is_read` | Boolean | default `False` |
| `read_at` | DateTime | nullable |

**`NotificationType` enum:** `handover_request`, `handover_confirmed`, `handover_returned`, `allocation_made`, `allocation_returned`, `ammo_request`, `ammo_approved`, `ammo_fulfilled`, `user_created`, `system`

---

## Schemas

### Generic Wrapper: `ApiResponse[T]` (`app/schemas/util.py`)
```python
ApiResponse(message="...", data=<T>)
```
Used on create/update responses.

### Auth (`app/schemas/auth.py`)
- `TokenResponse` — `access_token`, `refresh_token`, `token_type`, `user: UserResponse`
- `RefreshTokenRequest` — `refresh_token`
- `OTPRequest` — `email`
- `OTPVerify` — `email`, `code`, `verification_token`

### User (`app/schemas/user.py`)
- `UserBase` — shared fields: `username`, `email`, profile fields, `is_active`
- `UserCreate` — extends `UserBase` + `password` (validated: min 8 chars, 1 uppercase, 1 digit), `role_id`, `branch_id`
- `UserUpdate` — all fields optional, including `status`, `role_id`, `branch_id`, `notes`
- `UserResponse` — full user with nested `role: RoleResponse`, `branch: BranchResponse`
- `UserRoleStat` — `{ role: str, count: int }` — single entry in role breakdown; `"Unassigned"` for users with no role
- `UserStatusStats` — status counts + role breakdown:
  ```
  active, disabled, suspended, banned, total: int
  by_role: list[UserRoleStat]   # counts per role name, scoped to same branch filter
  ```
- `UserListResponse` — paginated list + `stats: UserStatusStats`

### Role (`app/schemas/role.py`)
- `RoleResponse` — `id`, `name`, `description`, `is_system`, `permissions: list[PermissionResponse]`, `created_at`, `updated_at`
- `PermissionResponse` — `id`, `name`, `slug`, `category: PermissionCategory`

**`PermissionCategory` enum:** `inventory`, `allocations`, `users`, `audit`, `handover`, `ammo_requests`

Permission slugs follow the pattern `category:action` (e.g. `users:manage_roles`, `inventory:view`). Superusers bypass all permission checks.

### Branch (`app/schemas/branch.py`)
- `BranchCreate` — `name`, `location`, `type`
- `BranchUpdate` — all optional
- `BranchResponse` — full branch with `created_at`, `updated_at`
- `BranchTypeStats` — `branch: int`, `head_office: int`, `sub_hq: int`
- `BranchListResponse` — paginated list + `stats: BranchTypeStats`

### Location (`app/schemas/location.py`)
- `LocationCreate` — `name`, `type`, `specific_area`, `branch_id`
- `LocationUpdate` — all optional
- `LocationResponse` — with nested `branch: BranchResponse | None`
- `LocationTypeStats` — `in_office: int`, `out_of_office: int`, `total: int`
- `LocationListResponse` — paginated list + `stats: LocationTypeStats`

### Notification (`app/schemas/notification.py`)
- `NotificationResponse` — full notification
- `UnreadCountResponse` — `count: int`

---

## API Endpoints

All routes are prefixed `/api/v1`.

### Auth — `/auth`
| Method | Path | Description |
|---|---|---|
| POST | `/auth/login` | Returns `TokenResponse` |
| POST | `/auth/refresh` | Exchange refresh token |
| POST | `/auth/otp/request` | Send OTP email |
| POST | `/auth/otp/verify` | Verify OTP, returns verification token |

### Users — two routers in `app/api/v1/endpoints/users.py`

**`branch_router`** prefix: `/users/branch`

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/users/branch/register` | Open | Create user → `UserResponse` |
| GET | `/users/branch/me` | `CurrentUserID` | Own profile |
| PATCH | `/users/branch/me` | `CurrentUserID` | Update own profile |
| GET | `/users/branch/search` | `CurrentUserID` | Quick search → `ApiResponse[list[UserResponse]]` (non-paginated, max 20) |
| GET | `/users/branch/` | `CurrentUserID` | Paginated list → `UserListResponse` |
| GET | `/users/branch/{branch_id}` | `CurrentUserID` | Users in branch → `UserListResponse` (superusers excluded) |
| GET | `/users/branch/{username}` | `CurrentUserID` | Get user by username |
| DELETE | `/users/branch/{username}` | `CurrentUserID` | Delete own account only |

**Global list query params:** `search` (username/first_name/surname/email/file_number ILIKE), `role_id`, `status`, `page`, `size`

**Branch list query params:** `search`, `role_id`, `page`, `size` — superusers always excluded

**`admin_router`** prefix: `/users/admin` — reserved, no endpoints currently implemented

### Roles — `/roles`
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/roles/` | `CurrentAdminUser` | List all roles → `ApiResponse[list[RoleResponse]]` |
| GET | `/roles/permissions` | `CurrentAdminUser` | List all permissions → `ApiResponse[list[PermissionResponse]]` |

Roles are ordered by `name asc`. Permissions are ordered by `category asc, slug asc`.

### Branches — `/branches`
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/branches/` | Admin + `users:manage_roles` | Create → `ApiResponse[BranchResponse]` |
| GET | `/branches/` | Auth | Paginated list → `BranchListResponse` |
| GET | `/branches/{id}` | Auth | Get branch |
| PATCH | `/branches/{id}` | Admin + `users:manage_roles` | Update |
| DELETE | `/branches/{id}` | Admin + `users:manage_roles` | Delete |

**List query params:** `search` (name/location ILIKE), `branch_type`, `page`, `size`

### Locations — `/locations`
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/locations/` | Admin + `users:manage_roles` | Create → `ApiResponse[LocationResponse]` |
| GET | `/locations/` | Auth | Paginated list → `LocationListResponse` |
| GET | `/locations/{id}` | Auth | Get location |
| PATCH | `/locations/{id}` | Admin + `users:manage_roles` | Update → `ApiResponse[LocationResponse]` |
| DELETE | `/locations/{id}` | Admin + `users:manage_roles` | Delete |

**List query params:** `search` (name/specific_area ILIKE), `location_type`, `branch_id`, `page`, `size`

### Notifications — `/notifications`
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/notifications/` | Auth | User's paginated notifications |
| GET | `/notifications/unread-count` | Auth | `UnreadCountResponse` |
| PATCH | `/notifications/{id}/read` | Auth | Mark as read |
| PATCH | `/notifications/read-all` | Auth | Mark all as read |

---

## Auth System (`app/core/security.py`)

- **JWT access token** — HS256, configurable expiry (default 30 min), `sub` = username
- **JWT refresh token** — 7-day expiry, `type: "refresh"` claim
- **`CurrentUserID`** — type alias, validates JWT + checks `status == active`
- **`CurrentAdminUser`** — same + requires `is_superuser == True`
- **`require_permissions(*slugs)`** — dependency factory, checks user role has ALL listed permission slugs; superusers bypass all checks

---

## Exceptions (`app/core/exceptions.py`)

All extend `AppException(HTTPException)`. Error body shape:
```json
{ "status": 4xx, "message": "...", "detail": "..." }
```

| Class | HTTP Status |
|---|---|
| `AlreadyExistsException` | 409 |
| `UnAuthorizedException` | 401 |
| `NotFoundException` | 404 |
| `BadRequestException` | 400 |
| `ForbiddenException` | 403 |
| `ValidationException` | 422 |

---

## CRUD Functions Reference

### `app/crud/user.py`

| Function | Signature | Notes |
|---|---|---|
| `get_user` | `(db, user_id)` | By UUID, selectin loads role + branch |
| `get_user_by_username` | `(db, username)` | |
| `get_user_by_email` | `(db, email)` | |
| `search_users` | `(db, query_str, limit=20)` | Non-paginated; ILIKE on username/first_name/surname/email/file_number |
| `get_all_users` | `(db, params, search, role_id, status)` | Paginated global list |
| `get_users_in_branch` | `(db, params, branch_id, search, role_id)` | Paginated; always excludes `is_superuser=True` |
| `get_user_stats` | `(db, branch_id?)` | Returns `UserStatusStats` with status counts + `by_role` list; scoped to branch when provided |
| `create_user` | `(db, payload)` | Hashes password; raises `AlreadyExistsException` on duplicate username/email |
| `update_user` | `(db, user, payload)` | Rehashes password if changed; syncs `is_active` with `status` |
| `delete_user` | `(db, username)` | Hard delete |

### `app/crud/role.py`

| Function | Signature | Notes |
|---|---|---|
| `get_roles` | `(db)` | All roles ordered by name, selectin loads permissions |
| `get_role` | `(db, role_id)` | By UUID |
| `get_role_by_name` | `(db, name)` | |
| `get_permission_by_slug` | `(db, slug)` | |
| `get_permissions` | `(db)` | All permissions ordered by category, slug |

---

## Pagination Pattern

All paginated endpoints use explicit `Params = Depends()` and pass them to the CRUD layer:

```python
# endpoint
async def list_x(params: Params = Depends(), ...):
    page = await crud.get_x(db, params=params, ...)
    stats = await crud.get_x_stats(db)
    return XListResponse(**page.model_dump(), stats=stats)

# crud
async def get_x(db, params, filter=None, search=None):
    query = select(X).order_by(...)
    # apply filters
    return await paginate(db, query, params=params)
```

`XListResponse` mirrors `Page` fields (`items`, `total`, `page`, `size`, `pages`) plus a domain-specific `stats` object.

---

## Configuration (`app/config.py`)

Settings loaded from `.env` via `pydantic-settings`. Key groups:
- **App:** `API_V1_PREFIX=/api/v1`, `DEBUG`
- **Security:** `SECRET_KEY`, `ACCESS_TOKEN_EXPIRE_MINUTES=30`, `ALGORITHM=HS256`
- **Database:** `DATABASE_URL` (asyncpg), pool settings
- **Redis:** `REDIS_URL`, `CELERY_BROKER_URL`, `CELERY_RESULT_BACKEND`
- **MinIO:** endpoint, credentials, bucket
- **Email:** SMTP settings
- **Seed:** `SUPERADMIN_USERNAME/EMAIL/PASSWORD`

---

## Workers (`app/workers/`)

- `celery_app.py` — Celery app instance configured from settings
- `tasks.py` — General background tasks (e.g. email sending)
- `notification_tasks.py` — Notification creation tasks called after domain events
