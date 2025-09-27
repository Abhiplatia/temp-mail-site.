# QuickTempMail.live - Temporary Email Service

## Overview

QuickTempMail.live is a temporary email service that provides users with disposable email addresses that automatically expire after 10 minutes. The application allows users to generate random temporary email addresses, receive emails in real-time, and manage their inbox during the session lifetime. The service is designed for privacy-conscious users who need temporary email addresses for testing, registrations, or avoiding spam.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation schemas

### Backend Architecture  
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL session store using connect-pg-simple
- **Storage Pattern**: Repository pattern with in-memory fallback for development

### Data Models
- **Users**: Basic user authentication with username/password
- **Email Sessions**: Tracks active temporary email sessions with expiration times
- **Database Schema**: Defined in shared/schema.ts using Drizzle and Zod for validation

### Authentication & Session Management
- **Session Storage**: PostgreSQL-based session storage for production
- **Email Session Tracking**: Time-limited email sessions with automatic expiration
- **Memory Storage**: Fallback in-memory storage for development/testing

### Email Integration
- **Third-party Email API**: Integration with external email service providers
- **Real-time Updates**: Polling mechanism for fetching new messages
- **Message Management**: Full CRUD operations for email messages
- **Attachment Support**: File attachment handling and download capabilities

### Monitoring & Analytics  
- **Google Analytics**: Integrated GA4 tracking for user behavior and conversion tracking
- **Custom Event Tracking**: Email generation, session extensions, and user interactions
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages

### Development & Build
- **Development**: Hot module replacement with Vite dev server
- **Production Build**: Static assets served with Express.js
- **TypeScript**: Full type safety across frontend, backend, and shared schemas
- **Code Organization**: Monorepo structure with shared types and utilities

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production data persistence
- **Drizzle Kit**: Database migration and schema management tools

### Email Services
- **Third-party Email API**: External email service provider for temporary email functionality (implementation details in mail-api.ts)

### Analytics & Monitoring
- **Google Analytics 4**: Web analytics and user behavior tracking
- **AdSense Integration**: Advertisement serving (placeholder implementation)

### UI & Styling
- **Radix UI**: Headless UI component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **Inter & JetBrains Mono**: Web fonts from Google Fonts

### Development Tools
- **Replit Plugins**: Development environment integration for Replit platform
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind and autoprefixer

### Runtime Dependencies
- **TanStack Query**: Server state synchronization and caching
- **Wouter**: Lightweight routing library
- **Date-fns**: Date utility library for time formatting and manipulation
- **Class Variance Authority**: Type-safe CSS class composition
- **Zod**: Schema validation for runtime type checking