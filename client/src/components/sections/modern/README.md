# Modern Landing Page Components

This directory contains modern, modular landing page components for KubeGraf, built with React, TypeScript, and CSS Modules.

## 📁 Directory Structure

```
modern/
├── HeroSection.tsx              # Hero section with headline and CTAs
├── HeroSection.module.css
├── CoreFeatures.tsx              # Core capabilities grid
├── CoreFeatures.module.css
├── UseCases.tsx                 # Real-world use cases
├── UseCases.module.css
├── HowItWorks.tsx               # Four-step process
├── HowItWorks.module.css
├── EvidenceDesign.tsx           # Evidence-driven design principles
├── EvidenceDesign.module.css
├── PlatformsPlugins.tsx         # Supported platforms and plugins
├── PlatformsPlugins.module.css
├── ProductionReady.tsx           # Production-ready features
├── ProductionReady.module.css
├── EnterpriseVC.tsx             # Enterprise/VC-focused section
├── EnterpriseVC.module.css
├── CTASectionModern.tsx         # Call-to-action section
├── CTASectionModern.module.css
├── FooterModern.tsx             # Modern footer
├── FooterModern.module.css
├── index.ts                     # Barrel export file
└── README.md                    # This file
```

## 🚀 Usage

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

### Import All Components

```tsx
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
```

### Example Full Landing Page

See `pages/HomeModern.tsx` for a complete example implementation.

## 🎨 Features

- **Modular Design**: Each section is a separate, reusable component
- **CSS Modules**: Scoped styling with no conflicts
- **Responsive**: Mobile-first design with breakpoints
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation
- **TypeScript**: Full type safety
- **Framer Motion**: Smooth animations and transitions
- **Placeholders**: Ready for images, GIFs, and icons

## 📝 Placeholders to Replace

### Icons
- Replace emoji icons with SVG components from `/assets/icons/`
- Update icon imports in component files
- Example: `import { SearchIcon } from "@/assets/icons";`

### Images
- Replace placeholder divs with actual images
- Update image paths in component files
- Example: `<img src="/assets/screenshots/hero-demo.gif" alt="KubeGraf demo" />`

### Platform/Plugin Logos
- Replace emoji placeholders with actual logos
- Update logo paths in `PlatformsPlugins.tsx`
- Example: `<img src="/assets/platforms/eks.svg" alt="AWS EKS" />`

## 🎯 Component Details

### HeroSection
- Headline with AI-powered messaging
- Two CTA buttons (Get Started, Request Demo)
- Terminal UI demo placeholder
- Trust indicators

### CoreFeatures
- 6 feature cards with hover effects
- Icon placeholders (replace with SVGs)
- Expandable hover descriptions

### UseCases
- 5 real-world Kubernetes problem scenarios
- Visual timeline placeholder
- Impact statements

### HowItWorks
- 4-step process visualization
- Numbered steps with icons
- Interactive visual placeholder

### EvidenceDesign
- Evidence-backed design principles
- Visual timeline of incident → RCA → fix
- CTA button

### PlatformsPlugins
- Supported Kubernetes platforms grid
- Plugin integrations grid
- Hover tooltips ready

### ProductionReady
- 4 key production features
- Apache 2.0 license highlight
- Get Started CTA

### EnterpriseVC
- KPIs/metrics display
- Testimonial section
- Product roadmap (6-month & 12-month)

### CTASectionModern
- Three CTA buttons
- Trust messaging
- Visual placeholder

### FooterModern
- Brand section with disclaimer
- Product, Company, Legal links
- Copyright and license info

## 🔧 Customization

### Colors
All components use CSS custom properties from your theme:
- `var(--color-primary)`
- `var(--color-foreground)`
- `var(--color-muted-foreground)`
- `var(--color-background)`
- `var(--color-card)`
- `var(--color-border)`

### Typography
Uses your existing font variables:
- `var(--font-sans)`
- `var(--font-display)`
- `var(--font-mono)`

### Spacing
Consistent spacing using rem units. Adjust in individual CSS modules.

## 📱 Responsive Breakpoints

- Mobile: `< 640px`
- Tablet: `640px - 1024px`
- Desktop: `> 1024px`

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly
- Reduced motion support

## 🎬 Animations

Uses Framer Motion for:
- Fade-in animations
- Scroll-triggered animations
- Hover effects
- Staggered animations

## 📦 Dependencies

- React
- TypeScript
- Framer Motion
- Lucide React (icons)
- CSS Modules
- Your existing UI components (`@/components/ui/button`)

## 🔄 Migration from Old Components

These components are designed to work alongside existing components. To migrate:

1. Import new components in your page
2. Replace old section components one by one
3. Test each section individually
4. Update routing if needed

## 📄 License

Same as main project (Apache 2.0)
