# ArmoryCore - Firearms Management System Frontend

A comprehensive web application for managing firearms, ammunition, kits, and personnel allocations. Built with Nuxt 4, Vue 3, TypeScript, and Tailwind CSS.

## Overview

ArmoryCore is a modern, enterprise-grade frontend for a complete firearms and ammunition inventory management system. It provides role-based access control, comprehensive data tables with drag-and-drop functionality, and an intuitive interface for managing military/law enforcement armory operations.

## Features

### Core Functionality
- **User Authentication**: Secure login and password reset functionality
- **Role-Based Access Control**: Admin, Manager, Officer, Technician, and Clerk roles with different permission levels
- **Dashboard**: Overview of system operations and key metrics
- **Personnel Management**: User creation, editing, and role assignment with search and filtering
- **Role Management**: Configure roles and their associated permissions
- **Inventory Management**: Track firearms, ammunition, and tactical kits
  - Firearms: Serial numbers, models, status, condition tracking
  - Ammunition: Quantities, lot numbers, caliber tracking
  - Kits: Tactical kits with associated equipment
- **Allocation System**: Manage the distribution of items to personnel with return tracking
  - Track allocation dates and expected return dates
  - Monitor overdue items and status changes
- **Audit Logging**: Track system changes and user actions

### UI/UX Features
- **Drag-and-Drop Interface**: Reorganize data rows with intuitive drag handles
- **Advanced Data Tables**: Sortable, filterable, with pagination and visibility controls
- **Responsive Design**: Mobile-first approach with dark mode support
- **Form Validation**: Real-time validation using Zod schema validation
- **Toast Notifications**: User feedback through toast notifications (Sonner)
- **Modern Components**: Built with shadcn/ui and Reka UI component libraries

## Technology Stack

### Core Framework
- **Nuxt**: 4.2.1 - Vue 3 meta-framework
- **Vue**: 3.5.25 - Progressive JavaScript framework
- **TypeScript**: 5.9.3 - Type-safe JavaScript

### UI & Styling
- **Tailwind CSS**: 4.1.17 - Utility-first CSS framework
- **shadcn-nuxt**: 2.4.1 - Shadcn components for Nuxt
- **Reka UI**: 2.6.1 - Component library
- **Lucide Vue Next**: 0.555.0 - Icon library

### State Management & Forms
- **Pinia**: 3.0.4 - State management store
- **Vee-Validate**: 4.15.1 - Form validation
- **Zod**: 4.1.13 - TypeScript-first schema validation
- **Class Variance Authority**: 0.7.1 - Component variant management

### Data Handling
- **TanStack Vue Table**: 8.21.3 - Headless UI table library
- **Date-fns**: 4.1.0 - Date manipulation library
- **DnD Kit**: Drag-and-drop functionality with Vue bindings
- **Vue Router**: 4.6.3 - Client-side routing

### Utilities
- **VueUse**: 14.1.0 - Essential Vue 3 composition utilities
- **Tailwind Merge**: 3.4.0 - Merge Tailwind class conflicts
- **clsx**: 2.1.1 - Conditional className utility
- **Vue Sonner**: 2.0.9 - Toast notifications
- **Nuxt Icon**: 2.1.0 - Icon component support
- **Nuxt Image**: 2.0.0 - Optimized image handling
- **Nuxt Color Mode**: 4.0.0 - Dark mode support
- **Nuxt Hints**: 1.0.0-alpha.3 - Development hints

## Project Structure

```
app/
├── components/
│   ├── app-specific/          # Application-specific components
│   │   ├── forms/             # Form components (User, Firearm, etc.)
│   │   ├── datatable/         # Data tables (Users, Allocations, etc.)
│   │   ├── partial-page/      # Page sections (firearms, ammunition, kits)
│   │   ├── AppSidebar.vue     # Main navigation sidebar
│   │   ├── NavUser.vue        # User menu navigation
│   │   ├── DraggableRow.vue   # Drag-and-drop table rows
│   │   └── DragHandle.vue     # Drag handle component
│   └── ui/                    # Reusable UI components
│       ├── button/            # Button components
│       ├── card/              # Card components
│       ├── input/             # Input field components
│       ├── form/              # Form layout components
│       ├── table/             # Table components
│       ├── tabs/              # Tab components
│       ├── sidebar/           # Sidebar system
│       └── [other-ui]/        # Additional UI components
├── pages/
│   ├── login/                 # Login page
│   ├── forgot-password/       # Password reset page
│   └── admin/
│       ├── dashboard/         # Admin dashboard
│       ├── inventory/         # Inventory management
│       ├── allocations/       # Allocation tracking
│       ├── users/             # User management
│       ├── roles/             # Role management
│       ├── profile/           # User profile
│       └── audit/             # Audit logs
├── layouts/
│   └── AdminLayout.vue        # Main admin layout wrapper
├── composables/
│   └── auth/
│       └── useLogin.ts        # Login composable
├── lib/
│   ├── models.ts              # Data models and types
│   └── utils.ts               # Utility functions
└── assets/
    └── css/
        └── tailwind.css       # Tailwind configuration
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm 10.24.0+ (recommended package manager)

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start development server at http://localhost:3000
pnpm dev
```

The application will be available at `http://localhost:3000` with hot module replacement enabled.

### Production Build

```bash
# Build for production
pnpm build

# Preview production build locally
pnpm preview

# Generate static site (if needed)
pnpm generate
```

## Key Components & Pages

### Authentication
- **Login Page** (`/login`): User authentication with email/password
- **Forgot Password** (`/forgot-password`): Password reset functionality

### Admin Dashboard
- **Dashboard** (`/admin/dashboard`): System overview and metrics
- **Inventory** (`/admin/inventory`): Multi-tab interface for firearms, ammunition, and kits
- **Allocations** (`/admin/allocations`): Track item distributions with status monitoring
- **Users** (`/admin/users`): User management with CRUD operations
- **Roles** (`/admin/roles`): Role and permission configuration
- **Audit** (`/admin/audit`): System audit logs and activities

## Data Models

### User
- ID, First Name, Last Name, Username, Email
- Phone Number, Assigned Armory
- Role (Admin, Manager, Officer, Technician, Clerk)
- Status (Active, Disabled, Suspended, Banned)
- Creation & Last Login timestamps

### Allocation
- Reference ID, Item Type (Firearm/Ammunition/Kit)
- Item Name, Quantity, Allocated To
- Request Reason, Allocated Date, Expected Return Date
- Status (Active, Returned, Overdue, Lost, Damaged)
- Notes

### Role
- ID, Role Name, Description

## Configuration

### Nuxt Config
The application is configured in `nuxt.config.ts` with:
- Tailwind CSS integration
- shadcn component support
- Pinia store management
- Dark mode support
- Color mode preferences

### Styling
- Tailwind CSS with custom configuration
- Dark mode support via CSS classes
- Component-based styling with class-variance-authority
- Custom animation library (tw-animate-css)

## Development Tips

### Adding New Components
1. Create components in `app/components/ui/` for reusable UI components
2. Create components in `app/components/app-specific/` for domain-specific components
3. Use TypeScript for type safety
4. Follow the established component structure with slots and props

### Adding New Pages
1. Create page files in `app/pages/` following Nuxt conventions
2. Use `definePageMeta()` to set page title and layout
3. Implement layout wrapping with appropriate admin layout

### Form Validation
The application uses Vee-Validate with Zod schemas:
```typescript
const formSchema = toTypedSchema(
  z.object({
    email: email(),
    password: z.string().min(8),
    // ... other fields
  })
)
```

### State Management
Use Pinia stores for global state management. Define stores in `stores/` directory and access them via composables.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Dark mode support

## Performance Considerations

- Code splitting via Nuxt
- Image optimization with Nuxt Image
- Tree-shaking of unused dependencies
- Lazy-loaded components and routes

## Security

- Input validation with Zod schemas
- Form validation on client-side
- Type-safe API integration patterns
- Secure password reset flow

## Future Enhancements

- API integration for backend services
- Advanced reporting and analytics
- Real-time notifications
- Bulk import/export functionality
- Advanced audit trail analytics
- Mobile application companion

## Contributing

When contributing to this project:
1. Follow the established component structure
2. Use TypeScript for all new code
3. Maintain the existing code style
4. Add proper prop typing and validation
5. Use Tailwind CSS for styling consistency

## License

Proprietary - Firearms Management System

## Support

For issues and feature requests, contact the development team.
