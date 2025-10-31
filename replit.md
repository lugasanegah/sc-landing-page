# Project Overview

## Purpose
Full-stack JavaScript application migrated from Figma to Replit environment.

## Architecture
- Frontend: React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- Backend: Express + TypeScript
- Database: PostgreSQL with Drizzle ORM
- Authentication: Passport.js with local strategy
- State Management: TanStack Query
- **Structure**: Domain-Driven Design (DDD) approach
  - Domains: landing, pricing, auth, shared
  - Clear separation of concerns by business domain
  - Shared components and utilities in common domain

## Current State
Migration in progress from Figma design to functional Replit application.

## Recent Changes
- 2025-07-20: Started migration from Figma to Replit
- Node.js 20 environment confirmed
- Basic project structure exists with all required dependencies
- **MAJOR**: Restructured project with Domain-Driven Design approach
- Created domains: landing, pricing, auth, shared
- Moved all components to appropriate domain folders
- Added pricing section with 3-tier plans (Solo Creator $19, Marketing Pro $49, Enterprise $99, Agency $199)
- Connected pricing navigation link with smooth scrolling
- Fixed all import paths for new DDD structure
- **UPDATED**: All content now matches socialcrab.id website
- Hero section: "Decentralized Insights, Zero Manual Work" with socialcrab features
- Features section: AI-validated data, Web3 insights, historical trends
- Impact stories: Real metrics from socialcrab (5B+ users, 200M+ revenue unlocked)
- FAQ section: Socialcrab-specific questions and answers
- Footer: Updated with appropriate links and socialcrab branding
- All pricing buttons open in new tabs with proper functionality
- Added comprehensive pricing section with 3-tier plan structure
- Connected pricing navigation with smooth scrolling functionality
- Integrated shadcn/ui components (Card, Badge) for pricing display
- **BACKEND**: Added MongoDB integration with blog management system
- Created admin dashboard with authentication using JWT
- Implemented blog CRUD operations (Create, Read, Update, Delete)
- Added admin models for User and Blog with proper validation
- Built complete admin UI with login, dashboard, blog list, create, edit, detail pages
- Blog section layout optimized for full-width slider display without padding constraints
- **WYSIWYG & AWS S3**: Implemented React Quill editor with AWS S3 image upload
- Added cookie-based JWT authentication system
- **SEO TOOLS**: Export robots.txt and sitemap.xml for Google Search Console
- **CATEGORY FILTER**: Blog filtering by category in admin dashboard
- **GITLAB**: Setup for repository connection to https://gitlab.com/socialcrab/sc-landing-page.git
- **BLOG FRONTEND INTEGRATION**: Created complete blog frontend with list/detail pages using Preline design
- **BLOG API**: Public routes for blog data, categories, and related posts
- **DATABASE SEEDED**: 3 sample blog posts about social media analytics
- **CATEGORIES MANAGEMENT**: Admin page for managing blog categories with CRUD operations
- **LANDING PAGE BLOG SECTION**: Replaced hardcoded blog cards with real database data in DashboardSection
- **NAVIGATION FIXES**: Fixed dropdown menu positioning and styling issues in header navigation
- **FONT STANDARDIZATION**: Complete font system overhaul - removed all Helvetica references and standardized to only Inter and Manrope fonts
  - Updated all CSS variables to use sans-serif fallback instead of Helvetica
  - Replaced all inline [font-family:'Inter',Helvetica] styles with font-inter Tailwind classes
  - Replaced all inline [font-family:'Manrope',Helvetica] styles with font-manrope Tailwind classes
  - Added Inter and Manrope to Tailwind config with proper font families
  - Applied font-inter as default body font
- **NEW PAGES EXPANSION**: Complete implementation of new page structure
  - Created Features page with Preline components and Iconsax icons
  - Created About page with team information and company values
  - Created Get Demo page with comprehensive form (name, email, company, country, etc.)
  - Removed "Customers" menu from navigation header
  - Added demo requests database schema with status tracking (new, contacted, demo_scheduled, demo_completed, follow_up, closed)
  - Implemented admin demo requests management system
  - Added demo requests API routes with CRUD operations
  - Updated admin navigation with "Demo Requests" menu
  - **ICONSAX INTEGRATION**: Replaced all placeholder icons with Iconsax React icons
  - All pages now use consistent Preline design system and Inter/Manrope fonts exclusively

## User Preferences
- Indonesian language communication
- Prefers comprehensive pricing plans with clear feature differentiation
- Wants functional navigation with smooth scrolling behavior
- **GitLab Integration**: Token-based HTTPS connection for private repository
  - Repository: https://gitlab.com/socialcrab/sc-landing-page.git
  - Token: glpat-VDc53fuVH-BxaF2m23 (available for manual git operations)

## Next Steps
1. **GitLab Authentication Issues**: Multiple auth methods failed, recommend manual repository creation
2. **Project Archive Ready**: `/tmp/socialcrab-project.tar.gz` contains complete project (142 files)
3. **Manual GitLab Setup**: Create repository via web interface, download archive, push locally
4. **Create dev branch**: After main branch push successful

## Deployment Status
✅ Complete SocialCrab landing page implementation
✅ DDD architecture with domain separation  
✅ MongoDB backend with blog management
✅ Admin dashboard with JWT authentication
✅ AWS S3 integration for uploads
✅ Iconsax React icons throughout
✅ Preline design system implementation
✅ Features, About, and Demo pages
✅ Demo request management system
✅ Font standardization (Inter/Manrope only)
✅ **Project archived and ready** for manual GitLab push
⚠️ **GitLab push pending** - requires manual setup due to auth issues