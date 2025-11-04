# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**DevEvents** is a Next.js 16 application showcasing developer events with a WebGL-powered visual effect background. Built with React 19, TypeScript, and Tailwind CSS v4.

## Commands

### Development
```powershell
npm run dev          # Start development server at http://localhost:3000
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Testing
No test framework is currently configured in this project.

## Architecture & Key Patterns

### App Structure
- **Next.js App Router**: Uses the `app/` directory structure (App Router, not Pages Router)
- **Path Alias**: `@/*` maps to root directory for absolute imports (e.g., `@/components`, `@/lib`)
- **Font Strategy**: Uses Next.js `next/font/google` with Schibsted Grotesk and Martian Mono fonts loaded in root layout

### Component Architecture
- **Layout Component** (`app/layout.tsx`): Root layout with global navbar and WebGL background effect
- **Presentation Components** (`components/`): Reusable UI components like EventCard, Navbar, ExploreBtn
- **WebGL Effects**: `LightRays.tsx` implements a custom WebGL shader using the `ogl` library for animated light ray effects

### Data Management
- **Static Data**: Event data is stored in `lib/constants.ts` as a static array
- **Type Safety**: Event properties (slug, image, title, location, date, time) are typed in EventCard interface

### Styling
- **Tailwind CSS v4**: Uses the latest Tailwind with PostCSS integration
- **shadcn/ui Setup**: Configured with "new-york" style, using Lucide icons
- **Custom Utilities**: `lib/utils.ts` exports `cn()` function (clsx + tailwind-merge) for conditional classNames
- **Global Styles**: `app/globals.css` contains Tailwind directives and custom CSS

### Analytics
- **PostHog Integration**: 
  - Client-side initialization in `instrumentation-client.ts`
  - Proxied through `/ingest` routes (see `next.config.ts` rewrites)
  - Requires `NEXT_PUBLIC_POSTHOG_KEY` environment variable

## Important Implementation Details

### WebGL Component (LightRays)
- Uses intersection observer for performance (only renders when visible)
- Complex shader-based animation with mouse tracking
- Client-side only (`"use client"` directive required)
- Positioned with `z-index` layering for background effect

### Event Data Structure
All events in `lib/constants.ts` follow this shape:
- `slug`: URL-friendly identifier
- `image`: Path to event poster (stored in `/public/images/`)
- `title`, `location`, `date`, `time`: Display metadata

### Routing
- Homepage: `app/page.tsx` displays featured events grid
- Event links currently route to `/events` (may need individual event pages)

## Configuration Files

- **TypeScript**: Configured with strict mode, ES2017 target
- **Next.js**: Custom rewrites for PostHog proxy in `next.config.ts`
- **ESLint**: Uses `eslint-config-next` preset
- **shadcn/ui**: Configured in `components.json` with alias mappings

## Environment Variables

Required:
- `NEXT_PUBLIC_POSTHOG_KEY`: PostHog analytics project key
- `NODE_ENV`: Set automatically by Next.js (development/production)

## Development Notes

- Always use the `@/` alias for imports instead of relative paths
- WebGL effects should remain client-side components
- Event images should be placed in `public/images/` directory
- PostHog analytics will only work with proper environment variable configuration
