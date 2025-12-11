Breakdown of the Arms and Ammunition Management System
===================================================

Based on the video summary, this system is designed for secure, auditable management of firearms (arms), ammunition, and related kits in an organizational context (e.g., security branches with a central head office). It emphasizes traceability, OTP-based confirmation for handovers, approval workflows, and role-based access control (RBAC) to prevent unauthorized access. The system integrates email/SMS for notifications and OTPs, and it assumes integration with external systems (e.g., for PDF approvals).

### Key System Components
- **Processes**: Focus on routine handovers, returns, ammunition requests, and special requests. All involve auditing (e.g., bullet counts) and status tracking (e.g., "in transit," "active," "returned").
- **User Roles**:
  - **Security Officer**: End-users who request/receive arms; limited access (e.g., view their own handovers).
  - **Armory Keeper**: Manages daily handovers/returns at the branch; enters details, handles OTPs, requests ammunition.
  - **BISO (Branch Information Security Officer)**: Oversees branch security; approves requests, views reports; designates users for static data changes.
  - **Branch Head/Director/Manager**: Approves ammunition requests; views branch-level reports.
  - **Head Office Admin**: Views all-branch reports and inventories; manages global static data.
- **Data Elements**:
  - **Static**: Branches/locations, arms/kits inventory (e.g., type, status like "defective"), users/roles, shifts (morning/night).
  - **Dynamic**: Handover records (officer, arm, bullets issued/returned/used), ammunition requests (with PDF attachments), inventory levels.
- **Integrations**: Email/SMS for OTPs/notifications; PDF uploads for approvals.
- **Security**: RBAC for screens/access; OTP for confirmations; audit logs for all actions.
- **Reporting/Dashboard**: Aggregated views for inventory, usage, and compliance.

The system should be web-based (e.g., using Nuxt.js with Shadcn UI, as per previous context), with mobile-friendly elements for officers in the field.

### Proposed Screens
I've broken the system into logical screens based on the processes and roles. Each screen includes:
- Purpose.
- Key UI Elements (using Shadcn components like Dialog, Table, Button, Select, Input).
- Role Access.

1. **Login Screen**
   - Purpose: Authenticate users and enforce RBAC.
   - UI Elements: Email/password input, "Forgot Password" link, role-based redirect to Dashboard.
   - Access: All users.

2. **Dashboard Screen**
   - Purpose: Overview of key metrics; entry point for processes.
   - UI Elements: Cards showing total arms inventory, arms in use, ammunition levels, overdue returns. Quick links to Handover, Requests, Reports. Search bar for quick lookups.
   - Access: All roles (branch-level filtered; head office sees all).

3. **Arm Handover/Issuance Screen**
   - Purpose: Manage routine/special arm handovers and returns.
   - UI Elements: Table of current handovers (columns: Officer, Arm Type, Bullets Issued/Returned/Used, Status, Date). Buttons for "Issue Arm" (opens dialog), "Return Arm" (opens dialog with bullet count input). OTP input field in dialog.
   - Access: Armory Keeper (primary); BISO/Head for view/approve.

4. **Ammunition Request Screen**
   - Purpose: Handle requests from branches to main branch.
   - UI Elements: Form for request (Select: Ammo Type/Quantity; Upload: PDF Approval; Input: Reason). Table of pending requests (Status: Pending, Approved, In Transit, Received). Designation of receiving officer. OTP confirmation in dialog.
   - Access: Armory Keeper (create); Branch Head/BISO (approve); Head Office (verify/fulfill).

5. **Inventory Management Screen**
   - Purpose: View/update arms, ammunition, and kits inventory.
   - UI Elements: Tabs for Arms/Kits/Ammunition. Tables with filters/search (columns: Type, Quantity, Status e.g., Defective/In Use). Buttons to add/edit items (e.g., mark defective).
   - Access: Armory Keeper/BISO (branch-level); Head Office (global).

6. **User Management Screen**
   - Purpose: Manage users, roles, and static data (e.g., branches, shifts).
   - UI Elements: Table of users (columns: Name, Role, Branch). Forms to add/edit users, assign roles. Sections for static data (e.g., dropdowns for shifts, inventory items).
   - Access: BISO/Head Office (limited to designated users for changes).

7. **Reports Screen**
   - Purpose: Generate and view required reports.
   - UI Elements: Filters for date range, branch. Sections for:
     - Daily/Weekly Handover Report: Table (Officer, Arm, Bullets Issued/Returned/Used).
     - Monthly/Quarterly Ammo Inventory: Chart/Table (Stock Levels, Additions/Usage).
     - Arms/Kits Inventory: Table (Type, Status, Quantity).
   - Export buttons (PDF/CSV).
   - Access: All roles (scoped by branch/head office).

8. **Settings/Admin Screen**
   - Purpose: Configure system-wide settings (e.g., email/SMS integrations, notifications).
   - UI Elements: Forms for API keys, notification preferences.
   - Access: Head Office Admin.

9. **Audit Logs Screen** (Optional, inferred for compliance)
   - Purpose: View history of actions for traceability.
   - UI Elements: Searchable table (User, Action, Timestamp, Details).
   - Access: BISO/Head Office.

### Actionable Flows
These are step-by-step user journeys for the main processes. Each flow includes preconditions, steps, postconditions, and error handling. Flows assume logged-in users with appropriate roles.

#### 1. Arm Handover Flow (Issuance to Officer)
   - **Preconditions**: Armory Keeper logged in; available arms in inventory; officer registered.
   - **Steps**:
     1. Navigate to Dashboard > Arm Handover Screen.
     2. Click "Issue Arm" button → Opens Dialog (e.g., CreateIssuanceForm from previous code).
     3. Select Officer (from dropdown of Security Officers).
     4. Select Arm (from available inventory dropdown).
     5. Enter details: Shift (morning/night), Bullets Issued, Reason (routine/special e.g., escort).
     6. Submit → System sends OTP to Officer via email/SMS.
     7. Officer provides OTP to Armory Keeper.
     8. Armory Keeper enters OTP in dialog → Confirms issuance; updates inventory (arm status: In Use).
     9. System emails/SMS confirmation to Officer.
   - **Postconditions**: Handover recorded; inventory updated; visible in reports.
   - **Error Handling**: Invalid OTP → Retry (limit 3 attempts); No available arms → Error toast; Network issue → Offline mode fallback.

#### 2. Arm Return Flow
   - **Preconditions**: Arm issued to Officer; Armory Keeper logged in.
   - **Steps**:
     1. On Arm Handover Screen, search/select active handover from table.
     2. Click "Return Arm" → Opens Dialog.
     3. Enter Bullets Returned (system calculates Used = Issued - Returned).
     4. Note any defects (updates status to Defective if needed).
     5. Submit → System sends confirmation email/SMS to Officer.
     6. Updates inventory (arm status: Available).
   - **Postconditions**: Return recorded; bullets audited; visible in daily reports.
   - **Error Handling**: Bullets Returned > Issued → Validation error; Defective arm → Alert BISO.

#### 3. Ammunition Request Flow (Branch to Main Branch)
   - **Preconditions**: Armory Keeper at branch logged in; PDF approval ready.
   - **Steps**:
     1. Navigate to Ammunition Request Screen.
     2. Click "New Request" → Opens Form/Dialog.
     3. Select Ammo Type/Quantity; Input Reason; Upload PDF Approval.
     4. Submit → Routes to Branch Head/BISO for approval (notification sent).
     5. Branch Head approves → Routes to Head Office for verification.
     6. Head Office approves → Designates Receiving Officer; sets status to "Approved."
     7. At Main Branch: Armory Keeper prepares ammo; sends OTP to Receiving Officer.
     8. Receiving Officer arrives, provides OTP → Confirms handover; status: "In Transit."
     9. Transporting Officer travels to branch.
     10. At Destination Branch: Armory Keeper receives, enters into inventory → Status: "Received"; email/SMS to Transporting Officer.
   - **Postconditions**: Ammo added to branch inventory; tracked in monthly reports.
   - **Error Handling**: Rejected approval → Notification with reason; Invalid PDF → Upload retry; Transit delay → Overdue alert.

#### 4. Special/Non-Routine Request Flow (e.g., Escort/Inspection)
   - **Preconditions**: Similar to routine handover but with approval.
   - **Steps**: Mirror Arm Handover Flow, but add:
     1. In Issuance Dialog: Select "Special" reason → Requires BISO/Head approval (workflow notification).
     2. Approval → Proceed with OTP confirmation.
   - **Postconditions**: Flagged as special in reports.
   - **Error Handling**: Unapproved → Block issuance.

#### 5. Report Generation Flow
   - **Preconditions**: User logged in with report access.
   - **Steps**:
     1. Navigate to Reports Screen.
     2. Select Report Type (e.g., Daily Handover).
     3. Filter: Date Range, Branch (auto-filtered by role).
     4. Generate → Displays table/chart.
     5. Export to PDF/CSV.
   - **Postconditions**: Report viewed/exported.
   - **Error Handling**: No data → "No results" message.

#### 6. Static Data Update Flow
   - **Preconditions**: Designated BISO/Head logged in.
   - **Steps**:
     1. Navigate to User Management/Settings.
     2. Edit section (e.g., Add Branch: Input Name/Location).
     3. Submit → Updates system-wide (with audit log).
   - **Postconditions**: Changes reflected in dropdowns/inventories.
   - **Error Handling**: Unauthorized → Access denied; Validation errors (e.g., duplicate branch).

