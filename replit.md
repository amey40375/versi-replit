# GetLife - Service Platform Application

## Overview

GetLife is a comprehensive service platform application that connects users with service providers (mitra) for home services like cleaning, massage, and barbering. The application features a modern React frontend with TypeScript, a Node.js/Express backend, and uses PostgreSQL for data persistence with Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Authentication**: Custom authentication system with role-based access
- **Routing**: Single Page Application (SPA) with view-based navigation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Session Management**: In-memory storage for development
- **API Design**: RESTful API with `/api` prefix
- **Error Handling**: Centralized error handling middleware

### Data Storage Architecture
- **Primary Database**: PostgreSQL (Neon Database)
- **ORM**: Drizzle ORM for type-safe database operations
- **Migration System**: Drizzle Kit for schema migrations
- **Development Storage**: In-memory storage for rapid development

## Key Components

### Authentication System
- **Multi-role Support**: Admin, User, and Mitra roles
- **Session-based Authentication**: Persistent login sessions
- **Role-based Access Control**: Different dashboards per user type
- **Account Verification**: Mitra account verification workflow

### User Interface Components
- **Landing Page**: Service showcase and registration portal
- **Authentication Forms**: Login and registration for users and mitra
- **Dashboard System**: Role-specific dashboards with different features
- **Component Library**: Comprehensive UI components using Radix UI primitives

### Service Management
- **Three Core Services**: GetClean (cleaning), GetMassage (massage), GetBarber (barbering)
- **Mitra Application System**: Service provider registration and verification
- **Order Management**: End-to-end order processing workflow
- **Payment Integration**: Top-up and payment processing system

### Administrative Features
- **Mitra Verification**: Admin approval workflow for service providers
- **Transaction Management**: Payment and top-up approval system
- **Chat System**: Communication between users, mitra, and admin
- **Content Management**: Banner and notification management

## Data Flow

### User Registration Flow
1. User selects registration type (User or Mitra)
2. Form submission creates account in storage
3. Mitra applications require admin approval
4. Approved mitra receive login credentials
5. Authentication grants role-based dashboard access

### Service Request Flow
1. User browses available services and mitra
2. Service booking creates order in system
3. Mitra receives and can accept/decline orders
4. Real-time work tracking with timer system
5. Payment processing upon completion
6. Rating and feedback collection

### Administrative Workflow
1. Admin reviews mitra applications
2. Verification process creates verified mitra accounts
3. Transaction monitoring and approval
4. Platform content and policy management
5. User support through chat system

## External Dependencies

### UI and Design System
- **Radix UI**: Headless UI components for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel component for banners

### Database and ORM
- **Neon Database**: Serverless PostgreSQL database
- **Drizzle ORM**: Type-safe database toolkit
- **Drizzle Kit**: Schema management and migrations

### Development Tools
- **Vite**: Fast build tool with HMR support
- **TypeScript**: Static type checking
- **TanStack Query**: Data fetching and caching
- **React Hook Form**: Form handling with validation

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express backend
- **Hot Module Replacement**: Instant feedback during development
- **Environment Variables**: Database connection and configuration
- **Development Logging**: Request/response logging for debugging

### Production Build
- **Frontend Build**: Vite production build with optimization
- **Backend Build**: ESBuild for Node.js backend compilation
- **Static Assets**: Served from `/dist/public` directory
- **Database Migrations**: Drizzle Kit push for schema updates

### Deployment Configuration
- **Single Application**: Frontend and backend served from same server
- **Environment Detection**: Development vs production mode switching
- **Asset Optimization**: Minification and bundling for production
- **Error Handling**: Production-ready error responses

## Changelog

- July 02, 2025: Initial setup completed
- July 02, 2025: Firebase migration implemented with hybrid storage system
  - Added Firebase SDK and configuration
  - Created Firebase service layer for Firestore operations
  - Implemented hybrid storage (Firebase primary, localStorage fallback)
  - Updated authentication system for async operations
  - Basic login/registration working with Firebase integration

## User Preferences

Preferred communication style: Simple, everyday language.