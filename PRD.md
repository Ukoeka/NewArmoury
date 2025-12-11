# Product Requirements Document (PRD)
## ArmoryCore - Firearms Management System

**Document Version**: 1.0  
**Last Updated**: December 9, 2025  
**Product Owner**: Firearms Management System Team  
**Project Scope**: Frontend Application  

---

## Executive Summary

ArmoryCore is a comprehensive web-based firearms and ammunition inventory management system designed for military and law enforcement operations. The system provides centralized control over inventory tracking, personnel management, equipment allocations, and audit compliance for armory operations. This PRD covers the frontend application architecture, features, and user experience requirements.

## Product Vision

To provide a secure, intuitive, and efficient platform for managing firearms, ammunition, tactical kits, and personnel allocations with complete audit trails and role-based access control.

## Goals & Objectives

### Primary Goals
1. **Inventory Accuracy**: Maintain real-time visibility of all firearms, ammunition, and equipment
2. **Operational Efficiency**: Streamline allocation and return processes
3. **Compliance & Auditing**: Ensure complete audit trails for regulatory compliance
4. **Security**: Implement role-based access control with comprehensive permissions
5. **Usability**: Provide an intuitive interface for users across all operational levels

### Success Metrics
- User adoption rate > 80% within first 3 months
- System uptime > 99.5%
- Average task completion time < 5 minutes
- Zero critical security incidents
- Audit compliance score 100%

## User Personas

### 1. System Administrator
- **Role**: Full system access and management
- **Primary Tasks**: User management, role configuration, system settings
- **Tech Proficiency**: High
- **Key Needs**: Complete control, reporting, audit logs

### 2. Armory Manager
- **Role**: Oversee regional armory operations
- **Primary Tasks**: Inventory oversight, allocation approvals, team management
- **Tech Proficiency**: Medium
- **Key Needs**: Dashboard insights, quick approvals, personnel coordination

### 3. Armory Officer/Technician
- **Role**: Daily inventory operations and maintenance
- **Primary Tasks**: Record allocations, process returns, maintenance logging
- **Tech Proficiency**: Medium
- **Key Needs**: Quick workflows, clear status indicators, error prevention

### 4. Clerk/Support Staff
- **Role**: Administrative and documentation support
- **Primary Tasks**: Data entry, form submissions, report generation
- **Tech Proficiency**: Low to Medium
- **Key Needs**: Simple forms, clear instructions, minimal complexity

## Feature Requirements

### 1. Authentication & Authorization

#### 1.1 Login System
- **Requirement**: Users must authenticate with email and password
- **Security**: Password must meet complexity requirements (min 8 characters, mixed case, numbers)
- **Session Management**: Implement session timeout after 30 minutes of inactivity
- **Features**:
  - Email/password login
  - Password reset via forgot-password flow
  - Session management with token-based authentication
  - Remember me option (optional, not recommended for sensitive environments)

#### 1.2 Role-Based Access Control (RBAC)
- **Roles Defined**:
  - **Admin**: Full system access including all CRUD operations
  - **Manager**: Regional oversight, approval authority, limited user management
  - **Officer**: Allocation and return operations, inventory viewing
  - **Technician**: Maintenance and condition tracking, repairs logging
  - **Clerk**: Data entry, form submissions, reporting

- **Permission Model**: Implement per-feature and per-action permissions
- **Default Permissions**: Each role has predefined default permissions that can be customized

#### 1.3 Multi-Factor Authentication (Future Enhancement)
- Plan for MFA implementation (e.g., TOTP, SMS)
- Current phase focuses on email/password authentication

### 2. User Management

#### 2.1 User Administration
- **Create Users**: Admins can create new user accounts with assigned roles
- **Edit Users**: Update user information, role changes, and permissions
- **Deactivate Users**: Soft delete functionality - mark users as disabled instead of hard delete
- **View Users**: List all users with filtering, sorting, and searching

#### 2.2 User Properties
- First Name, Last Name (required)
- Email (required, unique)
- Username (optional, for display purposes)
- Phone Number (optional)
- Assigned Armory Location (optional)
- Role Assignment (required)
- Account Status (Active, Disabled, Suspended, Banned)
- Notes (optional, for internal comments)
- Last Login Timestamp (system-tracked)
- Creation Date (system-tracked)

#### 2.3 User Search & Filtering
- Search by first name, last name, email, or username
- Filter by role, status, assigned armory
- Sort by any column
- Export user list (CSV/PDF)

### 3. Role Management

#### 3.1 Role Configuration
- **Predefined Roles**: System comes with 5 predefined roles
- **Custom Roles**: Admins can create custom roles
- **Permission Assignment**: Select specific permissions for each role
- **Role Properties**: Name, description, list of assigned permissions

#### 3.2 Permissions
- **Inventory Permissions**:
  - View Inventory
  - Create Item
  - Edit Item
  - Delete Item
  - Export Inventory

- **Allocation Permissions**:
  - View Allocations
  - Create Allocation
  - Approve Allocation
  - Process Returns
  - Edit Allocation

- **User Management Permissions**:
  - View Users
  - Create User
  - Edit User
  - Deactivate User
  - Manage Roles

- **Audit Permissions**:
  - View Audit Logs
  - Export Audit Logs

### 4. Inventory Management

#### 4.1 Firearms Inventory
- **Required Fields**:
  - Serial Number (unique identifier)
  - Model Name (e.g., Remington 870)
  - Firearm Type (Handgun, Rifle, Shotgun, Carbine, etc.)
  - Caliber (e.g., 9mm, .45 ACP, 5.56mm)
  - Manufacturer
  - Acquisition Date
  
- **Status Tracking**:
  - Available
  - Allocated (In Use)
  - In Maintenance
  - Damaged
  - Decommissioned

- **Condition Tracking**:
  - Operational
  - Needs Maintenance
  - Damaged
  - Non-Functional

- **Optional Fields**:
  - Internal Notes
  - Last Maintenance Date
  - Maintenance History
  - Assigned To (current user/unit)
  - Location
  - Attachments (Serial number photos, inspection reports)

#### 4.2 Ammunition Inventory
- **Required Fields**:
  - Lot Number (unique batch identifier)
  - Ammunition Type (caliber)
  - Quantity (count)
  - Manufacturer
  - Date Manufactured
  - Date Received

- **Tracking**:
  - Current Quantity
  - Minimum Safe Stock Level
  - Maximum Capacity
  - Location/Storage Area
  - Expiration Date (if applicable)
  - Usage Log (allocation and return history)

- **Status**:
  - In Stock
  - Allocated
  - Depleted
  - Expired/Damaged

#### 4.3 Tactical Kits
- **Definition**: Pre-configured equipment sets (e.g., Rapid Response Kit, Training Kit)
- **Properties**:
  - Kit Name
  - Kit Type (Tactical, Training, Maintenance, etc.)
  - Associated Equipment (list of items contained)
  - Condition Status
  - Allocation Status
  - Replacement Parts List

- **Kit Management**:
  - Create custom kits from available items
  - Track individual kit conditions
  - Monitor component availability

#### 4.4 Inventory Operations
- **Add New Item**: Create new inventory entries with validation
- **Edit Item**: Modify item details and status
- **Delete Item**: Soft delete with audit trail
- **Bulk Operations**: Import/export inventory (CSV format)
- **Search & Filter**: By type, status, location, serial number, lot number
- **Sort**: By any column
- **Status History**: View complete status change history for audit purposes

### 5. Allocation Management

#### 5.1 Allocation Workflow
1. **Request Creation**: Officer/User requests allocation of item
   - Select item or items
   - Specify request reason
   - Set expected return date

2. **Approval**: Manager/Admin reviews and approves request
   - View request details
   - Approve or reject with notes
   - Set conditions if needed

3. **Allocation Confirmation**: System records allocation date and responsible party

4. **Return Process**: Track item returns
   - Mark as returned
   - Verify condition
   - Note any damages or issues
   - Update inventory status

#### 5.2 Allocation Tracking
- **Allocation Record Contains**:
  - Allocation Reference ID (e.g., TZ-FA-0003)
  - Item Type (Firearm/Ammunition/Kit)
  - Item Name/Serial Number
  - Quantity
  - Allocated To (User/Unit)
  - Request Reason
  - Allocation Date
  - Expected Return Date
  - Actual Return Date (if returned)
  - Current Status (Active, Returned, Overdue, Lost, Damaged)
  - Condition On Return
  - Notes

#### 5.3 Status Management
- **Active**: Item is currently allocated, within expected return window
- **Returned**: Item has been returned and logged back
- **Overdue**: Expected return date has passed
- **Lost**: Item has been reported lost
- **Damaged**: Item was returned in damaged condition

#### 5.4 Allocation Forms
- **Allocation Form**:
  - Item selection (dropdown with search)
  - Quantity field
  - Recipient selection
  - Request reason (required)
  - Expected return date (date picker)
  - Special conditions (text area)
  - Submit and cancel buttons

#### 5.5 Allocation Reports
- All active allocations
- Overdue items alert
- Return schedule
- Allocation history per user
- Allocation history per item
- Export to CSV/PDF

### 6. Dashboard

#### 6.1 Overview Metrics
- Total Firearms Count
- Total Ammunition Rounds
- Total Kits Available
- Active Allocations Count
- Overdue Allocations Alert
- System Users Count

#### 6.2 Widgets & Charts
- Allocation Status Distribution (pie chart)
- Inventory by Type (bar chart)
- Recent Allocations (table)
- Items Due for Return (sorted list)
- System Activity Log (recent actions)

#### 6.3 Quick Actions
- Quick allocation button
- Quick return button
- View pending approvals (for managers)
- Search bar for quick item lookup

#### 6.4 Role-Specific Dashboard
- **Admin**: Full analytics, user activity, system health
- **Manager**: Team allocations, regional inventory, approvals
- **Officer**: Personal allocations, return schedule
- **Technician**: Maintenance queue, damaged items
- **Clerk**: Recent entries, pending forms

### 7. Audit & Compliance

#### 7.1 Audit Logging
- **Events Logged**:
  - User login/logout
  - User creation/modification/deactivation
  - Inventory changes (add, edit, delete, status changes)
  - Allocation requests and approvals
  - Item returns
  - Permission changes
  - Role modifications
  - Data exports

- **Log Fields**:
  - Timestamp (system time)
  - User ID (who performed action)
  - Action Type (what was done)
  - Entity Type (what was affected)
  - Entity ID
  - Before/After Values (for changes)
  - IP Address
  - User Agent
  - Status (success/failure)
  - Error Message (if failed)

#### 7.2 Audit Reports
- View audit logs with filters
  - Date range
  - User
  - Action type
  - Entity type
  - Status

- Export audit logs (CSV format)
- Archive old logs (yearly basis)

#### 7.3 Compliance Features
- No ability to delete historical records (audit trail preservation)
- Timestamps cannot be modified
- User actions traceable to individual users
- Immutable audit logs

### 8. User Interface & Experience

#### 8.1 Layout & Navigation
- **Sidebar Navigation**: 
  - Dashboard link
  - Inventory submenu (Firearms, Ammunition, Kits)
  - Allocations link
  - Personnel submenu (Users, Roles)
  - Audit submenu (Logs)
  - User profile menu (Settings, Logout)

- **Responsive Design**:
  - Collapse sidebar on mobile
  - Mobile-optimized forms
  - Touch-friendly buttons and controls

#### 8.2 Data Tables
- **Features**:
  - Sortable columns (click header)
  - Filterable columns (filter icon)
  - Pagination (10, 25, 50 rows per page)
  - Column visibility toggle
  - Search bar
  - Drag-and-drop reordering of rows
  - Select rows for bulk actions
  - Expand rows for details
  - Export selected rows to CSV

#### 8.3 Forms
- **Validation**:
  - Real-time field validation
  - Inline error messages
  - Field-level error highlighting
  - Form-level validation summary
  - Prevent submission until valid

- **Form Types**:
  - Create/Edit dialogs (modal-based)
  - Inline forms (non-modal)
  - Multi-step forms (wizard)
  - Batch import forms

#### 8.4 Visual Feedback
- **Toast Notifications**:
  - Success messages (green)
  - Error messages (red)
  - Warning messages (yellow)
  - Info messages (blue)
  - Auto-dismiss after 5 seconds

- **Loading States**:
  - Loading spinners on buttons
  - Skeleton screens for tables
  - Disabled state during submission

- **Confirmation Dialogs**:
  - Confirm destructive actions (delete, deactivate)
  - Show impact summary before confirmation

#### 8.5 Dark Mode
- System supports dark mode
- User can toggle preference
- Preference persisted in local storage
- Default follows system preference

### 9. Data Security

#### 9.1 Client-Side Security
- **Input Validation**: Validate all user inputs with Zod schemas
- **XSS Prevention**: Sanitize all user inputs before display
- **CSRF Protection**: Implement CSRF tokens for state-changing operations
- **Secure Headers**: Set appropriate security headers

#### 9.2 API Integration
- **HTTPS Only**: All API calls over HTTPS
- **Token-Based Auth**: JWT or similar for API authentication
- **Rate Limiting**: Implement client-side rate limiting for API calls
- **Error Handling**: Do not expose sensitive data in error messages

#### 9.3 Password Security
- **Requirements**:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character

- **Storage**: Only send to server via HTTPS, never store client-side
- **Reset**: Secure password reset via email token

### 10. Data Privacy

#### 10.1 Personal Data
- Only collect necessary user information
- Comply with data protection regulations (GDPR if applicable)
- Provide data export for users
- Implement data retention policies

#### 10.2 Access Logs
- Users can view their own audit logs
- Admins can view all audit logs
- Logs are retained for minimum 1 year
- Archive and delete logs per policy

## Technical Requirements

### Frontend Architecture
- **Framework**: Nuxt 4.2.1 with Vue 3
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **State Management**: Pinia
- **Form Management**: Vee-Validate with Zod validation
- **UI Components**: shadcn-nuxt + Reka UI
- **Icons**: Lucide Vue Next
- **Tables**: TanStack Vue Table
- **Notifications**: Vue Sonner
- **Drag & Drop**: dnd-kit with Vue bindings

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

### Performance Requirements
- Page load time: < 3 seconds (first load)
- Time to interactive: < 5 seconds
- Lighthouse score: > 80
- No JavaScript errors in console
- Smooth animations (60 FPS)

### Accessibility Requirements
- WCAG 2.1 Level AA compliance
- Keyboard navigation for all features
- Screen reader support
- Proper contrast ratios
- Semantic HTML

## User Flows

### 1. User Login Flow
```
User Opens App → Login Page → Enter Credentials → Submit 
→ Authentication Check → Redirect to Dashboard/Inventory
```

### 2. Allocation Request Flow
```
Officer Views Inventory → Selects Item → Clicks "Request Allocation"
→ Fills Allocation Form → Submits → Toast Confirmation
→ Manager Receives Notification → Reviews Request → Approves/Rejects
→ Officer Gets Status Update → Item Marked as Allocated
```

### 3. Item Return Flow
```
Officer Selects Allocated Item → Clicks "Return Item"
→ Fills Return Form (Condition, Notes) → Submits
→ System Updates Status to Returned → Item Availability Updated
→ Audit Log Entry Created
```

### 4. User Management Flow (Admin)
```
Admin Views Users Page → Clicks "Add User"
→ Fills User Form → Assigns Role → Submits
→ System Creates User Account → Sends Welcome Email
→ User Can Reset Password and Login
```

## Content & Data Specifications

### Sample Data
- System includes sample users with different roles
- Sample firearms, ammunition, and kits
- Sample allocations in various states
- Sample audit logs

### Naming Conventions
- Firearms: Serial numbers (e.g., TZ-FA-0003)
- Ammunition: Lot numbers (e.g., LOT-AM-556-2024-A)
- Kits: Descriptive names (e.g., Rapid Response Tactical Kit)
- Allocations: Reference format (e.g., TZ-FA-0003 for firearm allocation)

## Timeline & Milestones

### Phase 1: MVP (Current - Week 1-2)
- Authentication system
- User and role management
- Inventory management (view/add/edit)
- Basic allocation tracking
- Dashboard with metrics

### Phase 2: Enhancement (Week 3-4)
- Advanced forms and validation
- Audit logging
- Advanced search and filtering
- Drag-and-drop interface
- Mobile optimization

### Phase 3: Polish (Week 5-6)
- Performance optimization
- Accessibility compliance
- Security hardening
- Testing and bug fixes
- Documentation

### Phase 4: Launch & Beyond
- User acceptance testing
- Production deployment
- Post-launch monitoring
- Feedback collection
- Future enhancements planning

## Success Criteria

### Functional Requirements Met
- All core features implemented and tested
- CRUD operations work for all entities
- Authentication and authorization functional
- Audit logging operational
- API integration complete

### Quality Standards
- > 80% code test coverage
- 0 critical bugs
- < 5 medium severity bugs
- All security requirements met
- WCAG 2.1 Level AA compliant
- Performance benchmarks met

### User Satisfaction
- User feedback score > 4/5
- System usability score > 80
- First-time task success rate > 90%
- Average task time within targets

## Out of Scope

### Features Not Included in MVP
- Mobile native applications
- Advanced analytics and reporting
- Predictive inventory management
- Integration with physical sensors/RFID
- Multiple language support (future)
- Video tutorials or advanced help system
- API documentation generator
- Third-party integrations

### Known Limitations
- Single armory location initially (future: multi-location support)
- No offline functionality (requires internet)
- No real-time collaboration features
- Limited bulk operations initially

## Risks & Mitigation

### Risk 1: Data Loss
- **Mitigation**: Implement proper database backup and recovery procedures
- **Mitigation**: Test restore procedures regularly

### Risk 2: Security Breach
- **Mitigation**: Conduct security audit before launch
- **Mitigation**: Implement comprehensive audit logging
- **Mitigation**: Use HTTPS and secure API patterns

### Risk 3: Performance Issues
- **Mitigation**: Load testing before launch
- **Mitigation**: Implement pagination and lazy loading
- **Mitigation**: Monitor performance in production

### Risk 4: User Adoption
- **Mitigation**: Comprehensive user training
- **Mitigation**: Detailed documentation and help system
- **Mitigation**: Gradual rollout with feedback loops

## Conclusion

ArmoryCore represents a comprehensive solution for firearms and ammunition inventory management. By combining an intuitive user interface with robust security and compliance features, it enables organizations to maintain complete control over their armory operations while ensuring proper audit trails and regulatory compliance.

The frontend application provides role-based access, advanced data management capabilities, and a responsive user experience that accommodates users across all operational levels—from system administrators to support staff.

---

**Document Approval**

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | TBD | | |
| Technical Lead | TBD | | |
| Project Manager | TBD | | |

---

**Appendix: Glossary**

- **Armory**: Secure storage facility for firearms and ammunition
- **Allocation**: Process of assigning an item to a user or unit
- **Lot Number**: Unique identifier for a batch of ammunition
- **Serial Number**: Unique identifier for a firearm
- **Kit**: Pre-configured set of equipment items
- **RBAC**: Role-Based Access Control
- **Audit Log**: Record of system actions and changes
- **Status**: Current state of an item (Active, Returned, etc.)
