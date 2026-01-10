# Modern Landing Page Components

This directory contains the modern, production-ready landing page components for KubeGraf, built with React, TypeScript, Tailwind CSS, and CSS Modules. These components are optimized for performance with static rendering and minimal animations.

## 🛠️ Technology Stack

### Core Technologies
- **Node.js** 20+ - Runtime environment
- **React** 19.2.0 - UI framework
- **TypeScript** 5.6.3 - Type safety
- **Vite** 7.3.1 - Build tool and dev server
- **Tailwind CSS** 4.1.14 - Utility-first CSS framework
- **CSS Modules** - Scoped component styling

### Key Libraries
- **Wouter** 3.3.5 - Lightweight routing
- **Lucide React** 0.545.0 - Icon library
- **Radix UI** - Accessible component primitives
- **Class Variance Authority** - Component variant management
- **Tailwind Merge** - Utility class merging

### Development Tools
- **TSX** 4.20.5 - TypeScript execution
- **PostCSS** 8.5.6 - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Directory Structure

```
modern/
├── HeroSection.tsx              # Hero section with headline, CTAs, and terminal demo
├── HeroSection.module.css
├── CoreFeatures.tsx             # Core capabilities grid (6 features)
├── CoreFeatures.module.css
├── UseCases.tsx                 # Real-world Kubernetes use cases (5 scenarios)
├── UseCases.module.css
├── HowItWorks.tsx               # Four-step process visualization
├── HowItWorks.module.css
├── EvidenceDesign.tsx           # Evidence-driven design principles
├── EvidenceDesign.module.css
├── PlatformsPlugins.tsx         # Supported platforms and plugins grid
├── PlatformsPlugins.module.css
├── ProductionReady.tsx           # Production-ready features showcase
├── ProductionReady.module.css
├── EnterpriseVC.tsx             # Enterprise metrics and testimonials
├── EnterpriseVC.module.css
├── CTASectionModern.tsx         # Final call-to-action section
├── CTASectionModern.module.css
├── FooterModern.tsx             # Modern footer with links and theme toggle
├── FooterModern.module.css
├── index.ts                     # Barrel export file
└── README.md                    # This file
```

## 🚀 Usage

### Complete Landing Page Implementation

The modern landing page is implemented in `pages/HomeModern.tsx`:

```tsx
import Navbar from "@/components/layout/Navbar";
import {
  HeroSection,
  CoreFeatures,
  UseCases,
  HowItWorks,
  EvidenceDesign,
  PlatformsPlugins,
  ProductionReady,
  EnterpriseVC,
  CTASectionModern,
  FooterModern,
} from "@/components/sections/modern";

export default function HomeModern() {
  return (
    <div className="bg-background text-foreground scroll-smooth min-h-screen">
      <Navbar disableScrollEffects={true} />
      <main>
        <HeroSection />
        <CoreFeatures id="features" />
        <UseCases />
        <HowItWorks />
        <EvidenceDesign />
        <PlatformsPlugins />
        <ProductionReady />
        <EnterpriseVC />
        <CTASectionModern />
      </main>
      <FooterModern />
    </div>
  );
}
```

### Import Individual Components

```tsx
import { HeroSection, CoreFeatures } from "@/components/sections/modern";

function MyPage() {
  return (
    <>
      <HeroSection />
      <CoreFeatures />
    </>
  );
}
```

## 🎨 Component Details

### Header/Navbar (`components/layout/Navbar.tsx`)

**Features:**
- Fixed position navigation bar
- Responsive mobile menu with hamburger icon
- Dropdown menus for Product, Resources, and Company sections
- Theme toggle (light/dark mode)
- Smooth scroll navigation
- Optional scroll effects (disabled on modern page for performance)
- Progressive background blur and opacity on scroll
- Logo with brand name
- CTA button for installation

**Technologies:**
- Framer Motion for dropdown animations
- Wouter for routing
- LocalStorage for theme persistence
- CSS transitions for smooth effects

**Props:**
- `disableScrollEffects?: boolean` - Disables scroll-based animations for better performance

### HeroSection

**Features:**
- Large headline with gradient text effects
- AI-powered messaging badge
- Two primary CTAs (Start Exploring, Installation)
- Animated terminal demo showing incident detection
- Trust indicators (Local-First, Evidence-Driven, Human-in-Loop)
- Social proof text
- Scroll indicator button

**Implementation:**
- Static rendering (no scroll-triggered animations)
- Terminal animation using React state and intervals
- CSS Modules for styling
- Responsive two-column layout

### CoreFeatures

**Features:**
- 6 feature cards in responsive grid
- Icons from Lucide React
- Hover descriptions
- Static rendering for fast load times

**Features Displayed:**
1. Detect Incidents
2. Diagnose with Evidence
3. Preview Fix Safely
4. Safe Dev Environment Testing
5. Scalable & Team-Friendly
6. Local-First & Secure

### UseCases

**Features:**
- 5 real-world Kubernetes problem scenarios
- Visual timeline (Incident → RCA → Safe Fix)
- Impact statements for each use case
- Icons for each use case type

**Use Cases:**
1. PreStop / terminationGracePeriod Conflicts
2. Spot Node Preemption Pod Restarts
3. Database Connection Failures During Deployment
4. Missing Environment Variables / Pod Anti-Affinity Misconfigurations
5. Resource Exhaustion and Failed Health Checks

### HowItWorks

**Features:**
- 4-step process visualization
- Numbered steps (01-04)
- Icons for each step
- Detailed descriptions
- Visual placeholder for interactive diagram

**Steps:**
1. Detect - Auto scan clusters and detect incidents
2. Diagnose - Correlate logs, events, metrics, YAML diffs
3. Preview Fix - Dry-run, impact analysis, confidence scores
4. Apply Safely - Human-in-loop approval with rollback

### EvidenceDesign

**Features:**
- 4 evidence-backed design principles
- Visual timeline showing diagnosis flow
- CTA button to see it in action
- Icons from Lucide React

**Evidence Points:**
1. Confidence Scores
2. Reproducible RCA
3. Multi-Source Correlation
4. TUI + Web Dashboard

### PlatformsPlugins

**Features:**
- Static grid layout (optimized for performance)
- Platform compatibility showcase
- Built-in plugin integrations
- Logo images with fallback support
- Badge indicators for plugins

**Platforms:**
- AWS EKS, Google GKE, Azure AKS
- Rancher, OpenShift, K3s

**Plugins:**
- Helm, ArgoCD, Flux
- Istio, Cilium, Nginx

### ProductionReady

**Features:**
- 4 key production features
- Apache 2.0 license highlight
- Get Started CTA button
- Icon-based feature cards

**Features:**
1. Local-First Design
2. Evidence-Backed Recommendations
3. Human-in-Loop
4. Dry-Run & Rollback Support

### EnterpriseVC

**Features:**
- 3 KPI/metrics display cards
- Testimonial section
- Enterprise-focused messaging
- Icons for each metric

**KPIs:**
- 50% Reduction in incident resolution time
- 80% Prevention rate
- 3am Safe for critical incidents

### CTASectionModern

**Features:**
- Three CTA buttons (Get Started, Request Demo, Join Community)
- Terminal/Dashboard view switcher
- Animated terminal demo
- Dashboard screenshot placeholder
- Trust messaging

**CTA Options:**
1. Get Started – Free Install
2. Request Demo / Enterprise
3. Join Early Access / Community

### FooterModern

**Features:**
- Brand section with logo and tagline
- Three-column link layout (Product, Company, Legal)
- Theme toggle button (light/dark mode)
- Copyright and license information
- Responsive design
- External link indicators

**Link Sections:**
- **Product**: GitHub, Docs, Install
- **Company**: Company info, Contact
- **Legal**: Privacy, License

**Theme Management:**
- LocalStorage persistence
- Synchronized with Navbar theme
- SVG icon toggle button
- Accessible ARIA labels

## 🎨 Design Features

### Performance Optimizations

- **Static Rendering**: All components render immediately without scroll triggers
- **No Scroll Animations**: Removed `whileInView` animations for faster load times
- **CSS Modules**: Scoped styling prevents conflicts
- **Optimized Images**: Lazy loading for platform logos
- **Minimal JavaScript**: Reduced runtime overhead

### Responsive Design

- **Mobile-First**: Designed for mobile, enhanced for desktop
- **Breakpoints**:
  - Mobile: `< 640px`
  - Tablet: `640px - 1024px`
  - Desktop: `> 1024px`
- **Flexible Grids**: Auto-fit grid layouts
- **Touch-Friendly**: Large tap targets on mobile

### Accessibility

- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard support
- **Focus Indicators**: Visible focus states
- **Color Contrast**: WCAG AA compliant
- **Reduced Motion**: Respects `prefers-reduced-motion`

### Styling

**CSS Variables Used:**
- `--primary` - Primary brand color
- `--foreground` - Text color
- `--background` - Background color
- `--muted-foreground` - Secondary text
- `--border` - Border colors
- `--card` - Card background

**Typography:**
- System font stack with fallbacks
- Responsive font sizes using `clamp()`
- Gradient text effects for highlights
- Monospace font for terminal sections

## 📦 Dependencies

### Core
- `react` ^19.2.0
- `react-dom` ^19.2.0
- `typescript` 5.6.3

### UI & Styling
- `tailwindcss` ^4.1.14
- `@tailwindcss/vite` ^4.1.14
- `lucide-react` ^0.545.0
- `class-variance-authority` ^0.7.1
- `tailwind-merge` ^3.3.1
- `clsx` ^2.1.1

### Routing
- `wouter` ^3.3.5

### UI Components
- `@radix-ui/*` - Various Radix UI primitives
- Custom UI components from `@/components/ui/`

### Build Tools
- `vite` ^7.3.1
- `@vitejs/plugin-react` ^5.0.4
- `postcss` ^8.5.6
- `autoprefixer` ^10.4.21

## 🚀 Development

### Running Development Server

```bash
npm run dev:client
```

Starts Vite dev server on `http://localhost:5005`

### Building for Production

```bash
npm run build
```

Outputs optimized production build to `dist/public/`

### Component Structure

Each component follows this pattern:
- **Component File** (`ComponentName.tsx`): React component with TypeScript
- **Styles File** (`ComponentName.module.css`): Scoped CSS modules
- **Exports**: Barrel export in `index.ts`

## 🔧 Customization

### Colors

All components use CSS custom properties from your theme:
- `hsl(var(--primary))` - Primary brand color
- `hsl(var(--foreground))` - Text color
- `hsl(var(--background))` - Background
- `hsl(var(--muted-foreground))` - Secondary text
- `hsl(var(--border))` - Borders

### Typography

Uses system font stack:
- Sans-serif: System UI fonts
- Monospace: For terminal/code sections

### Spacing

Consistent spacing using rem units:
- Small: `0.5rem` (8px)
- Medium: `1rem` (16px)
- Large: `2rem` (32px)
- Section padding: `5rem` (80px)

## 📱 Responsive Breakpoints

All components are responsive with these breakpoints:

```css
/* Mobile */
@media (max-width: 640px) { }

/* Tablet */
@media (min-width: 640px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of `<section>`, `<nav>`, `<footer>`, etc.
- **ARIA Labels**: Descriptive labels for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant colors
- **Reduced Motion**: Respects user preferences

## 🎬 Performance Notes

### Optimizations Made

1. **Removed Scroll Animations**: Eliminated `framer-motion` `whileInView` animations
2. **Static Rendering**: Components render immediately
3. **No Intersection Observers**: Reduced JavaScript overhead
4. **CSS-Only Animations**: Where animations exist, use CSS transitions
5. **Lazy Loading**: Images load on demand
6. **Code Splitting**: Vite handles automatic code splitting

### Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔄 Migration Notes

### From Old Components

These modern components are designed to replace older landing page sections:

1. Import new components in your page
2. Replace old section components one by one
3. Test each section individually
4. Update routing if needed
5. Remove old component files after migration

### Breaking Changes

- No longer uses `framer-motion` for scroll animations
- Static rendering instead of scroll-triggered
- CSS Modules instead of global styles
- TypeScript strict mode

## 📝 Future Enhancements

Potential improvements:
- [ ] Add more interactive demos
- [ ] Implement video backgrounds
- [ ] Add more animations (CSS-only)
- [ ] Enhanced mobile menu
- [ ] More platform integrations
- [ ] Interactive terminal playground

## 📄 License

Same as main project (Apache 2.0)

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Maintained by**: KubeGraf Team
