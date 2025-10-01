# QuickTempMail.live - Temporary Email Service

## Overview

QuickTempMail.live is a temporary email service providing disposable email addresses that expire automatically after 10 minutes. It enables users to generate random temporary email addresses, receive emails in real-time, and manage their inbox for privacy and spam avoidance. The service includes extensive educational content with 27 articles covering disposable email technology, privacy benefits, security, best practices, and use cases. The project aims for high performance with 95+ PageSpeed scores, robust SEO, and a user-friendly experience.

## User Preferences

Preferred communication style: Simple, everyday language.
Design preference: Light mode only (no dark mode toggle).

## System Architecture

### Frontend
- **Framework**: React with TypeScript, using Vite.
- **Routing**: Wouter.
- **UI Components**: shadcn/ui built on Radix UI.
- **Styling**: Tailwind CSS with custom CSS variables.
- **State Management**: TanStack Query for server state.
- **Form Handling**: React Hook Form with Zod validation.
- **Pages**: Home, Articles (27 educational articles), Privacy Policy, Terms & Conditions, About Us, Contact Us, FAQ.
- **UI/UX Decisions**: Light mode only, professional article cards with hover effects, 4-column footer for articles, dynamic meta tags for SEO.
- **Performance**: Optimized for 95+ PageSpeed scores including WebP image conversion, deferred blocking operations, font loading optimization, and immutable caching.
- **Accessibility**: WCAG AA compliance with improved color contrast, increased tap target sizes, and descriptive aria-labels.

### Backend
- **Runtime**: Node.js with Express.js.
- **Database**: PostgreSQL with Drizzle ORM (Neon Database).
- **Session Management**: PostgreSQL session store using `connect-pg-simple`.
- **Storage Pattern**: Repository pattern with in-memory fallback.

### Data Models
- **Users**: Basic authentication.
- **Email Sessions**: Tracks active temporary email sessions with expiration.
- **Schema**: Defined in `shared/schema.ts` using Drizzle and Zod.

### Email Integration
- **Third-party Email API**: Integration with an external email service provider for temporary email functionality.
- **Real-time Updates**: Polling mechanism for new messages.
- **Features**: CRUD operations for messages, attachment support.
- **Robustness**: Automatic retry with exponential backoff for API rate limits (HTTP 429) and silent error handling.

### Educational Content
- **Structure**: 27 articles categorized into Original Core, Use Cases, Security & Privacy, Guides & Comparisons, and Trends & Insights.
- **Features**: High-quality featured images (WebP, lazy-loaded), professional article cards, popular articles section on homepage, and categorized footer navigation.
- **SEO**: Dynamic titles/meta descriptions, Open Graph tags, JSON-LD Article/FAQ schema, internal linking.

### Monitoring & Analytics
- **Google Analytics**: GA4 for user behavior and conversion tracking.
- **Custom Event Tracking**: For key user interactions (email generation, session extensions).

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting.
- **Drizzle Kit**: Database migration and schema management.

### Email Services
- **Third-party Email API**: External provider for temporary email functionality.

### Analytics & Monitoring
- **Google Analytics 4**: Web analytics and user behavior tracking.

### UI & Styling
- **Radix UI**: Headless UI component primitives.
- **Tailwind CSS**: Utility-first CSS framework.
- **Lucide React**: Icon library.
- **Google Fonts**: Inter & JetBrains Mono.

### Development Tools
- **Replit Plugins**: Development environment integration.
- **ESBuild**: JavaScript bundler.
- **PostCSS**: CSS processing.

### Runtime Libraries
- **TanStack Query**: Server state synchronization and caching.
- **Wouter**: Lightweight routing library.
- **Date-fns**: Date utility library.
- **Class Variance Authority**: Type-safe CSS class composition.
- **Zod**: Schema validation.