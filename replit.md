# QuickTempMail.live - Temporary Email Service

## Overview

QuickTempMail.live is a temporary email service that provides users with disposable email addresses that automatically expire after 10 minutes. The application allows users to generate random temporary email addresses, receive emails in real-time, and manage their inbox during the session lifetime. The service is designed for privacy-conscious users who need temporary email addresses for testing, registrations, or avoiding spam.

The site features comprehensive educational content with 7 in-depth articles (400-800 words each) covering disposable email technology, privacy benefits, security considerations, and best practices.

## Recent Changes

**September 30, 2025:**
- Added Educational Articles section with 7 comprehensive articles about disposable email technology
- Integrated high-quality featured images for all articles with performance optimizations (lazy loading, async decoding)
- Implemented professional article cards with hover effects and gradient overlays
- Added Popular Articles section to home page displaying 4 featured articles with images in a 2x2 grid layout
- Removed dark mode toggle from all pages (light mode only by user preference)
- Updated contact information to single email: contact@quicktempmail.live
- Made header "QuickTempMail.live" text clickable for home navigation
- Added custom SVG favicon matching the header Mail icon design
- Fixed HTML structure issues and nested anchor tag warnings throughout the site
- **Critical Production Fix**: Implemented automatic retry with exponential backoff (2s, 4s, 8s, 16s, 32s) for Mail.tm API rate limits (HTTP 429)
- **Silent Error Handling**: Users never see "Service busy" errors; retries happen automatically in background for smooth long-term operation
- **Memory Leak Prevention**: Added proper timeout cleanup on unmount for both retry and initialization timeouts
- **Loading State Optimization**: Maintained loading spinner during retries for better UX
- **Concurrency Protection**: Tightened entry guards to prevent overlapping API attempts during scheduled retries

## User Preferences

Preferred communication style: Simple, everyday language.
Design preference: Light mode only (no dark mode toggle).

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation schemas
- **Pages**: Home, Articles (with 7 educational articles), Privacy Policy, Terms & Conditions, About Us, Contact Us, FAQ

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

### Educational Content
- **Articles Section**: 7 comprehensive articles (400-800 words each) covering:
  - What is Disposable Temporary Email?
  - The Tech Behind Disposable Email Addresses
  - Privacy Benefits of Using Temporary Email Services
  - When to Use (and Not Use) Temporary Email Addresses
  - Temporary Email vs Email Aliases: Which Is Right for You?
  - Security Considerations When Using Temporary Email
  - The Future of Disposable Email Services
- **Featured Images**: High-quality stock photos for each article with:
  - Lazy loading and async decoding for performance
  - Motion-safe hover animations
  - Descriptive alt text for accessibility
- **Article Cards**: Professional card design with image overlays, gradient effects, and hover scale animations
- **Popular Articles Section**: Home page feature displaying 4 featured articles:
  - 2x2 grid layout on desktop, single column on mobile
  - Each card shows title, description, and image
  - Images positioned on the right (desktop) or top (mobile)
  - Hover effects with visual feedback
  - Direct navigation to individual articles via hash links
  - "View All Articles" link for full collection access
- **SEO Optimization**: Dynamic page titles and meta descriptions for each article
- **Navigation**: Accessible from home page popular articles section and footer

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