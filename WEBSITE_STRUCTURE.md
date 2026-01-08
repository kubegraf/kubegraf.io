# KubeGraf Website - Complete Structure Documentation

## Overview

The KubeGraf website (kubegraf.io) is a modern, responsive single-page application built with React, TypeScript, and Vite. It features a dark/light theme system, multiple pages, and comprehensive documentation.

**Repository Structure:**
- `/client/` - Main React SPA application
- `/docs/` - Static HTML documentation pages
- `/client/src/` - Source code for the React app

---

## Routing & Pages

### Main Application Routes (SPA)

All routes are defined in `client/src/App.tsx`:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home.tsx` | Landing page with hero, features, benefits |
| `/kubegraf` | `WhatIsKubeGraf.tsx` | About page explaining what KubeGraf is |
| `/pricing` | `Pricing.tsx` | Pricing page with Free and Pro plans |
| `/compare` | `Compare.tsx` | Comparison table vs Lens, k9s, kubectl, Datadog |
| `/docs-overview` | `Docs.tsx` | Documentation overview page |
| `/faq` | `FAQ.tsx` | Frequently asked questions |
| `/privacy` | `Privacy.tsx` | Privacy policy |
| `/license` | `License.tsx` | Apache 2.0 license information |
| `/support` | `Support.tsx` | Support page |
| `*` (404) | `not-found.tsx` | 404 error page |

### Documentation Routes (Static HTML)

Located in `/docs/` directory:

| Route | File | Description |
|-------|------|-------------|
| `/docs/` | `index.html` | Documentation homepage |
| `/docs/quickstart.html` | `quickstart.html` | Quick start guide |
| `/docs/installation.html` | `installation.html` | Installation instructions |
| `/docs/getting-started/first-cluster.html` | `first-cluster.html` | First cluster setup |
| `/docs/terminal-ui.html` | `terminal-ui.html` | Terminal UI guide |
| `/docs/web-dashboard.html` | `web-dashboard.html` | Web dashboard guide |
| `/docs/commands.html` | `commands.html` | CLI commands reference |
| `/docs/configuration.html` | `configuration.html` | Configuration guide |
| `/docs/resource-map.html` | `resource-map.html` | Resource map feature |
| `/docs/security.html` | `security.html` | Security documentation |
| `/docs/plugins.html` | `plugins.html` | Plugins documentation |
| `/docs/installation-issues.html` | `installation-issues.html` | Troubleshooting installation |
| `/docs/troubleshooting/*.html` | Various | Troubleshooting guides |

---

## Header / Navbar

**Component:** `client/src/components/layout/Navbar.tsx`

### Desktop Navigation

**Logo Section:**
- KubeGraf logo image (theme-aware: `kubegraf-dark-new-bg.svg` or `kubegraf.svg`)
- "KubēGraf" text with hover effect (orange-500 on hover)
- Links to homepage (`/`)

**Navigation Menu (Dropdowns):**

1. **Product Dropdown**
   - Features (`/#features`)
   - Terminal UI (`/docs/terminal-ui.html`)
   - Web Dashboard (`/docs/web-dashboard.html`)
   - Security (`/docs/security.html`)

2. **Resources Dropdown**
   - Documentation (`/docs/`)
   - Quick Start (`/docs/quickstart.html`)
   - Installation (`/docs/installation.html`)
   - FAQ (`/faq`)

3. **Company Dropdown**
   - About KubeGraf (`/kubegraf`)
   - Compare (`/compare`)

**Direct Links:**
- Docs (`/docs/`) - Direct link with BookOpen icon

**CTA Buttons (Right Side):**
- GitHub link (external) - Icon only on mobile, text on desktop
- Install button - Ghost variant, links to `/docs/installation.html`
- Get Started button - Primary variant with Terminal icon, links to `/docs/quickstart.html`

### Mobile Navigation

**Mobile Menu Button:**
- Hamburger icon (Menu/X) - Toggles full-screen overlay menu
- Positioned top-right

**Mobile Menu Overlay:**
- Full-screen overlay with backdrop blur
- Sections: Product, Resources, Company (same items as desktop)
- Mobile CTAs at bottom:
  - Install button (outline variant)
  - Get Started button (primary variant)

**Features:**
- Closes on link click
- Closes on Escape key
- Click outside to close

### Navbar Behavior

- **Scroll Effect:** Changes background opacity and adds border on scroll (after 20px)
- **Theme Aware:** Logo switches based on theme (light/dark)
- **Sticky:** Fixed at top with z-index 50

---

## Footer

**Component:** `client/src/components/layout/Footer.tsx`

### Footer Structure

**Brand Column (2 columns on mobile, 3 on tablet, 2 on desktop):**
- Logo and "KubēGraf" text (theme-aware)
- Description: "Local-first Kubernetes incident detection and diagnosis. No SaaS lock-in."
- Brand clarity notice (disclaimer about independence)
- GitHub link with icon

**Product Column:**
- Features (`/#features`)
- Installation (`/docs/installation.html`)
- Compare (`/compare`)
- Roadmap (GitHub issues link)

**Resources Column:**
- Documentation (`/docs/`)
- Quickstart (`/docs/quickstart.html`)
- Guides (`/docs/terminal-ui.html`)
- Community (GitHub discussions)

**Developers Column:**
- GitHub (repository link)
- CLI Reference (`/docs/commands.html`)
- API Docs (`/docs/configuration.html`)
- Report Bug (GitHub issues)

**Company Column:**
- About (`/kubegraf`)
- Contact (`mailto:contact@kubegraf.io`)
- Privacy (`/privacy`)
- License (`/license`)

**Bottom Bar:**
- Copyright: "© 2025 KubēGraf. All rights reserved."
- License: "Apache 2.0 License"
- Contact email: `contact@kubegraf.io`
- Theme toggle button (sun/moon icon)

### Footer Variants

- **Default:** Full footer with all columns
- **Minimal:** Simplified footer (used on some pages)

---

## Landing Page (Home)

**Component:** `client/src/pages/Home.tsx`

### Page Structure

1. **Navbar** (see Header section above)
2. **Hero Section** (see Hero section below)
3. **Demo Execution Section** (`DemoExecution.tsx`)
4. **Logo Marquee Section** (`LogoMarquee.tsx`)
5. **Benefits Section** (`Benefits.tsx`)
6. **Workflow Section** (`Workflow.tsx`)
7. **Trust Anchors Section** (`TrustAnchors.tsx`)
8. **CTA Section** (`CTASection.tsx`)
9. **Footer** (see Footer section above)

---

## Hero Section

**Component:** `client/src/components/sections/Hero.tsx`

### Hero Content

**Left Column (Text):**

1. **Badge:**
   - "Local-first" badge with pulsing dot indicator
   - Cyan/primary color scheme

2. **Main Heading:**
   - "Intelligent Kubernetes Incident Response"
   - Font: Monospace, bold
   - Color scheme:
     - "Intelligent" - foreground/90
     - "Kubernetes" - primary (cyan)
     - "Incident" - foreground/90
     - "Response" - amber-500

3. **Subheading:**
   - "Detect incidents, understand root causes with evidence analysis, and safely preview fixes—all running locally on your machine."
   - Large, readable text

4. **CTA Buttons:**
   - **Get Started** (Primary) - Links to `/docs/quickstart.html`
     - ArrowRight icon
     - Large size, shadow effect
   - **Download** (Outline) - Links to `/docs/installation.html`
     - Download icon

5. **Social Proof:**
   - TUI + Web Dashboard icon and text
   - Platform support: "macOS • Linux • Windows"
   - License: "Apache 2.0"

**Right Column (Terminal Demo):**

- **Desktop:** Animated terminal with typing effect
  - Shows `kubegraf incidents show` command
  - Displays incident details with color-coded output
  - Glow effect behind terminal
- **Mobile:** Simplified terminal demo (lighter version)

**Background:**
- Interactive dot grid (desktop only)
- Gradient overlays
- Floating orbs (docs pages)

**Scroll Indicator:**
- "Scroll to explore" text
- Animated mouse scroll indicator (desktop only)

---

## Demo Execution Section

**Component:** `client/src/components/sections/DemoExecution.tsx`

**Purpose:** Shows interactive demo of KubeGraf in action

**Content:** (Details to be filled based on actual component)

---

## Logo Marquee Section

**Component:** `client/src/components/sections/LogoMarquee.tsx`

**Purpose:** Displays logos of companies/technologies (if applicable)

**Content:** (Details to be filled based on actual component)

---

## Benefits Section

**Component:** `client/src/components/sections/Benefits.tsx`

### Section Header

- **Title:** "Built for incident response"
- **Subtitle:** "Everything you need to detect, diagnose, and safely fix Kubernetes incidents"

### Benefits Grid (6 items)

1. **Detect Incidents** (Zap icon, cyan)
   - Pattern recognition for CrashLoopBackOff, OOMKilled, deployment failures

2. **Diagnose with Evidence** (Search icon, purple)
   - Correlates logs, events, metrics with confidence scores

3. **Preview Fixes Safely** (Wrench icon, amber)
   - Dry-run by default, one-click rollback

4. **Runs Locally** (Lock icon, green)
   - All data stays on your machine, no cloud dependency

5. **No Lock-In** (Shield icon, indigo)
   - Apache 2.0 license, works with any cluster, no mandatory SaaS

6. **Production-Ready** (GitBranch icon, rose)
   - Built for 3am incidents, evidence-based, requires human approval

**Layout:** 1 column mobile, 2 columns tablet, 3 columns desktop

---

## Workflow Section

**Component:** `client/src/components/sections/Workflow.tsx`

### Section Header

- **Title:** "How it works"
- **Subtitle:** "From incident detection to safe remediation in four steps"

### Workflow Steps (4 steps)

1. **Detect** (Search icon)
   - KubeGraf watches cluster and detects incidents automatically

2. **Diagnose** (Database icon)
   - Evidence collected from logs, events, metrics, recent changes

3. **Preview Fix** (Wrench icon)
   - See exactly what changes will be made, includes impact assessment

4. **Apply Safely** (CheckCircle icon)
   - You approve or reject, one-click rollback, human confirmation required

**Layout:** 1 column mobile, 2 columns tablet, 4 columns desktop

---

## Trust Anchors Section

**Component:** `client/src/components/sections/TrustAnchors.tsx`

### Section Header

- **Title:** "Built for Production Incidents"
- **Subtitle:** "Designed for engineers who need trust, safety, and control during critical moments"

### Trust Anchors (3 items)

1. **Runs on your laptop**
   - No data leaves cluster
   - No SaaS dependency
   - Complete control

2. **Every fix is a preview**
   - You approve or reject
   - One-command rollback
   - Safe by default

3. **Evidence, not magic**
   - System cites its sources
   - Confidence scores shown
   - Reproducible diagnosis

**Footer Statement:**
"No blind automation. No telemetry. No vendor lock-in. Just evidence-driven incident intelligence."

**Layout:** 1 column mobile, 3 columns desktop

---

## CTA Section

**Component:** `client/src/components/sections/CTASection.tsx`

### Section Content

**Header:**
- **Title:** "Start Investigating"
- **Subtitle:** "KubēGraf is available now."

**Install Command Block:**
```
# Install
$ brew install kubegraf
# Analyze
$ kubegraf analyze --cluster prod
```

**CTA Buttons:**
1. **Read Docs** (Primary) - Links to `/docs/quickstart.html`
   - BookOpen icon
2. **View GitHub** (Outline) - Opens GitHub in new tab
   - Github icon
3. **Download** (Outline) - Links to `/docs/quickstart.html`
   - Terminal icon

**Footer Link:**
- "Questions? Get in touch" - Mailto link to `contact@kubegraf.io`

---

## What Is KubeGraf Page

**Component:** `client/src/pages/WhatIsKubeGraf.tsx`

### Page Sections

1. **Hero:**
   - Title: "What is KubeGraf?"
   - Subtitle: "A local-first Kubernetes tool for detecting incidents..."

2. **Quick Stats (4 cards):**
   - 100% Local-first
   - 0 Agents required
   - 3 Interfaces (TUI/Web/SPA)
   - ∞ Clusters supported

3. **How It Works (4 steps):**
   - Detect (AlertCircle icon)
   - Diagnose (FileText icon)
   - Preview Fix (CheckCircle icon)
   - Store Locally (Database icon)

4. **Core Capabilities (4 cards):**
   - Multiple Interfaces (Terminal, Web, SPA)
   - Change Intelligence (deployment tracking, config diffs)
   - Knowledge Bank (local storage, searchable, exportable)
   - Security First (local-first, read-only mode, Apache 2.0)

5. **Common Use Cases (3 cards):**
   - On-call Engineers
   - Platform Teams
   - DevOps Engineers

6. **What KubeGraf is NOT (4 items):**
   - Not a monitoring platform
   - Not a deployment tool
   - Not an auto-healer
   - Not a SaaS

7. **Brand Clarity:**
   - Disclaimer about independence from Kubernetes, CNCF, Grafana Labs

8. **CTA Section:**
   - Install KubeGraf button
   - Quick Start Guide button
   - View on GitHub button

---

## Pricing Page

**Component:** `client/src/pages/Pricing.tsx`

### Page Sections

1. **Hero:**
   - Title: "Pricing"
   - Subtitle: "Start free. Upgrade only if you need deeper incident insight."

2. **Pricing Cards (2 plans):**

   **Free Plan:**
   - Terminal UI, Web UI, and SPA
   - Unlimited cluster connections
   - One-click cluster switching
   - Incident detection and basic diagnostics
   - Local-first operation
   - CTA: "Get started free" → `/docs/installation.html`
   - Note: "No account required."

   **Pro Plan:**
   - Everything in Free, plus:
   - Brain Panel with evidence-backed diagnostics
   - Advanced incident analysis and summaries
   - Knowledge Bank export and sharing
   - Unlimited cluster connections with fast switching
   - Early access to new features
   - CTA: "Start 14-day trial" → `https://app.kubegraf.io/signup`
   - Note: "No credit card required."

3. **Trust & Transparency:**
   - Explains local-first operation
   - Data privacy assurance

4. **FAQ Section:**
   - Do I need an account?
   - Does KubeGraf send data to cloud?
   - Can I downgrade from Pro?

5. **Enterprise Section:**
   - Contact for enterprise support, custom licensing, offline distribution

---

## Compare Page

**Component:** `client/src/pages/Compare.tsx`

### Page Sections

1. **Hero:**
   - Title: "How KubeGraf Compares"
   - Subtitle: "KubeGraf focuses on incident understanding and safe action, not just visibility."

2. **Comparison Table:**

   **Compared Tools:**
   - KubeGraf (highlighted in primary color)
   - Lens Desktop
   - k9s
   - kubectl
   - Datadog

   **Comparison Criteria:**
   - Primary purpose
   - Local-first
   - Mandatory SaaS
   - Automatic incident detection
   - Explains why failures happen
   - Evidence-backed diagnosis
   - Change correlation
   - Safe fix recommendations
   - Dry-run fix preview
   - Human-in-the-loop actions
   - Terminal UI (TUI)
   - Web / SPA interface
   - Unified multi-cluster incidents
   - Incident knowledge retention
   - Runs fully offline
   - Binary footprint

   **Icons:**
   - ✅ (Check) - Green
   - ❌ (X) - Red
   - ⚠️ (AlertTriangle) - Yellow

---

## FAQ Page

**Component:** `client/src/pages/FAQ.tsx`

### Page Sections

1. **Hero:**
   - Title: "Frequently Asked Questions"
   - Subtitle: "Common questions about installing, using, and understanding KubeGraf"

2. **FAQ Items (Accordion):**
   - What is KubeGraf?
   - Do I need an account?
   - Does KubeGraf send data to cloud?
   - What platforms does KubeGraf support?
   - How do I install KubeGraf?
   - How much does KubeGraf cost?
   - Can I use KubeGraf in production?
   - How does KubeGraf compare to kubectl?
   - How does KubeGraf compare to k9s?
   - How does KubeGraf compare to Lens Desktop?
   - Can I run KubeGraf offline?
   - Does KubeGraf work with multiple clusters?
   - What is the Brain Panel?
   - Can I downgrade from Pro to Free?
   - Is KubeGraf open source?
   - How do I get support?
   - Does KubeGraf require cluster admin permissions?
   - Can I use KubeGraf with GitOps?

3. **Still Have Questions Section:**
   - GitHub Discussions button
   - Contact Support button (mailto)

**Features:**
- Accordion-style expandable items
- First item open by default
- Smooth animations
- SEO structured data (FAQPage schema)

---

## Privacy Page

**Component:** `client/src/pages/Privacy.tsx`

### Page Content

**Sections:**
1. What data KubeGraf does NOT collect
2. What data is collected (Free vs Pro)
3. How data is used
4. Data storage and retention
5. Third-party services
6. User choices and control
7. Changes to this policy
8. Contact information

**Key Points:**
- Free version: No data collection
- Pro version: Anonymous license verification only
- All cluster data stays local
- No cookies, trackers, or analytics
- Last updated: December 19, 2025

---

## License Page

**Component:** `client/src/pages/License.tsx`

### Page Content

**Sections:**
1. License type: Apache License 2.0
2. What the license allows
3. What the license requires
4. Patent grant
5. Commercial use
6. Full license text link

**Key Points:**
- Apache 2.0 license
- Commercial use allowed
- Link to full license text
- License file in repository

---

## Support Page

**Component:** `client/src/pages/Support.tsx`

**Content:** (Details to be filled based on actual component)

---

## Documentation Pages

### Documentation Structure

**Location:** `/docs/` directory

**Layout:**
- Fixed navbar at top (64px height)
- Sidebar navigation (280px width, fixed)
- Main content area (margin-left: 280px)
- Footer at bottom

### Documentation Navbar

**Logo:** KubeGraf logo + "KubēGraf" text

**Links:**
- Features (`/#features`)
- About (`/kubegraf`)
- Docs (`/docs/`) - Active
- Pricing (`/pricing`)
- GitHub (external)

**Mobile:**
- Hamburger menu button (left)
- Home button (left, next to menu)

### Documentation Sidebar

**Sections:**

1. **Getting Started**
   - Overview (`/docs/`)
   - Quick Start (`/docs/quickstart.html`)
   - Installation (`/docs/installation.html`)
   - First cluster (`/docs/getting-started/first-cluster.html`)

2. **Introduction**
   - What is KubeGraf (`/docs/introduction/what-is-kubegraf.html`)

3. **User Guide**
   - Terminal UI (`/docs/terminal-ui.html`)
   - Web Dashboard (`/docs/web-dashboard.html`)
   - Commands (`/docs/commands.html`)
   - Configuration (`/docs/configuration.html`)

4. **Features**
   - Resource Map (`/docs/resource-map.html`)
   - Security Analysis (`/docs/security.html`)
   - Plugins (`/docs/plugins.html`)

5. **Troubleshooting**
   - Installation Issues (`/docs/installation-issues.html`)
   - CrashLoopBackOff (`/docs/troubleshooting/crashloopbackoff.html`)
   - Rollout stuck (`/docs/troubleshooting/rollout-stuck.html`)
   - High CPU / memory (`/docs/troubleshooting/high-cpu-memory.html`)
   - Restarts after config change (`/docs/troubleshooting/restarts-after-config-change.html`)

6. **Workflows**
   - Debug CrashLoopBackOff (`/docs/workflows/debug-crashloop.html`)

7. **Resources**
   - GitHub (external)
   - Releases (external)
   - Report Issue (external)

### Documentation Footer

**Same structure as main site footer:**
- Brand column
- Product column
- Resources column
- Developers column
- Company column
- Bottom bar with copyright and theme toggle

---

## Theme System

### Theme Implementation

**Storage:** `localStorage` key: `kubegraf-theme`

**Values:**
- `light` - Light theme
- `dark` - Dark theme

**Default:** Light theme

### Theme Toggle

**Location:** Footer (bottom right)

**Button:**
- Sun/moon icon
- Toggles between light and dark
- Persists to localStorage
- Updates document.documentElement `data-theme` attribute

### Theme-Aware Components

- Logo (switches between `kubegraf.svg` and `kubegraf-dark-new-bg.svg`)
- Background colors
- Text colors
- Border colors
- All UI components adapt to theme

---

## Buttons & CTAs

### Primary Buttons

**Style:**
- Background: Primary color (cyan)
- Text: Primary foreground
- Shadow: Primary with opacity
- Hover: Slightly darker primary

**Examples:**
- "Get Started" (Hero)
- "Read Docs" (CTA Section)
- "Get started free" (Pricing)
- "Start 14-day trial" (Pricing)

### Secondary/Outline Buttons

**Style:**
- Border: Border color
- Background: Transparent
- Text: Foreground
- Hover: Muted background

**Examples:**
- "Download" (Hero)
- "View GitHub" (CTA Section)
- "Install" (Navbar)

### Ghost Buttons

**Style:**
- No border
- Transparent background
- Text: Muted foreground
- Hover: Accent background

**Examples:**
- "Install" (Navbar desktop)
- Menu buttons

---

## Component Structure

### Layout Components

```
components/
  layout/
    Navbar.tsx      - Main navigation header
    Footer.tsx      - Site footer
```

### Section Components

```
components/
  sections/
    Hero.tsx              - Landing page hero
    DemoExecution.tsx    - Demo section
    LogoMarquee.tsx      - Logo carousel
    Benefits.tsx         - Benefits grid
    Workflow.tsx         - How it works steps
    TrustAnchors.tsx     - Trust principles
    CTASection.tsx       - Call-to-action section
    Features.tsx         - Features section
    FeaturesModern.tsx   - Modern features
    TabbedFeatures.tsx   - Tabbed features
    PowerfulFeatures.tsx - Powerful features
    HowItWorks.tsx       - How it works
    IncidentLifecycle.tsx - Incident lifecycle
    EvidencePipeline.tsx  - Evidence pipeline
    BrainPanel.tsx       - Brain panel preview
    BrainPanelDetailed.tsx - Detailed brain panel
```

### UI Components

```
components/
  ui/
    button.tsx           - Button component
    card.tsx             - Card component
    dialog.tsx           - Dialog/modal
    dropdown-menu.tsx    - Dropdown menu
    form.tsx             - Form components
    input.tsx            - Input field
    textarea.tsx         - Textarea
    select.tsx           - Select dropdown
    checkbox.tsx         - Checkbox
    radio-group.tsx      - Radio buttons
    switch.tsx           - Toggle switch
    tabs.tsx             - Tabs component
    accordion.tsx        - Accordion
    alert.tsx            - Alert/notification
    badge.tsx            - Badge
    skeleton.tsx         - Loading skeleton
    spinner.tsx          - Loading spinner
    toast.tsx            - Toast notifications
    tooltip.tsx          - Tooltip
    ... (many more shadcn/ui components)
```

### Utility Components

```
components/
  Background3D.tsx        - 3D background effect
  CursorGlow.tsx         - Cursor glow effect (desktop)
  CyberGrid.tsx          - Cyber grid background
  ForensicGrid.tsx       - Forensic grid background
  InteractiveDotGrid.tsx - Interactive dot grid
  ErrorBoundary.tsx      - Error boundary
  forms/
    WaitlistForm.tsx    - Waitlist form
```

---

## Links Configuration

**File:** `client/src/config/links.ts`

**Defined Links:**
- `DOCS_URL`: `/docs-overview`
- `BUG_URL`: GitHub bug report template
- `FEATURE_URL`: GitHub feature request template
- `ISSUES_URL`: GitHub issues
- `CONTACT_MAILTO`: `mailto:contact@kubegraf.io`
- `CONTACT_EMAIL`: `contact@kubegraf.io`
- `PRIVACY`: `/privacy`
- `LICENSE`: `/license`
- `SUPPORT`: `/support`
- `COMPARE`: `/compare`
- `PRICING`: `/pricing`

---

## SEO & Meta Tags

### Main Landing Page

**Title:** "KubēGraf – Intelligent Insight for Kubernetes Incidents"

**Description:** "A local-first Kubernetes tool that detects incidents, explains why they happen with evidence, and previews safe fixes—without SaaS lock-in."

**Open Graph:**
- og:title
- og:description
- og:type: website
- og:url: https://kubegraf.io/
- og:image: https://kubegraf.io/opengraph-v2.jpg
- og:image:width: 1200
- og:image:height: 630

**Twitter Card:**
- twitter:card: summary_large_image
- twitter:site: @kubegraf
- twitter:title
- twitter:description
- twitter:image

**Structured Data:**
- SoftwareApplication schema
- Organization schema

### Documentation Pages

**Title:** "Documentation - KubeGraf"

**Description:** "KubeGraf documentation - Learn how to install, configure, and use KubeGraf for Kubernetes visualization."

**Open Graph:** Similar structure to main page

---

## Favicons & Icons

### Favicon Files

- `/favicon.ico` - Primary favicon (multiple sizes)
- `/favicon-48x48.png` - 48x48 PNG
- `/favicon-96x96.png` - 96x96 PNG
- `/favicon.svg` - SVG favicon
- `/web-app-manifest-192x192.png` - 192x192 PNG
- `/web-app-manifest-512x512.png` - 512x512 PNG
- `/apple-touch-icon.png` - 180x180 Apple touch icon

### Logo Files

- `/kubegraf.svg` - Light theme logo
- `/kubegraf-dark-new-bg.svg` - Dark theme logo
- `/assets/logos/binary-matrix/logo-transparent-dark.svg` - Documentation logo

---

## Responsive Design

### Breakpoints

- **Mobile:** < 640px (sm)
- **Tablet:** 640px - 1024px (md, lg)
- **Desktop:** > 1024px (xl, 2xl)

### Mobile Features

- Hamburger menu
- Simplified navigation
- Stacked layouts
- Touch-friendly buttons (min 48x48px)
- Responsive typography (clamp functions)
- Mobile-optimized terminal demo

### Desktop Features

- Full navigation with dropdowns
- Interactive dot grid background
- Cursor glow effect
- Hover effects
- Multi-column layouts

---

## Animations

### Framer Motion

Most components use Framer Motion for animations:
- Page transitions
- Scroll-triggered animations
- Hover effects
- Menu transitions

### Animation Patterns

- **Fade in:** opacity 0 → 1
- **Slide up:** y: 20 → 0
- **Scale:** scale: 0.95 → 1
- **Stagger:** Delay based on index

---

## Accessibility

### WCAG Compliance

- Color contrast ratios (AA compliant)
- Keyboard navigation
- ARIA labels
- Semantic HTML
- Focus indicators
- Screen reader support

### Keyboard Shortcuts

- Escape: Close menus/modals
- Tab: Navigate through interactive elements

---

## Performance

### Code Splitting

- Lazy loading for pages
- Lazy loading for heavy components (CursorGlow, InteractiveDotGrid)
- Route-based code splitting

### Optimizations

- Image optimization
- Font loading (preconnect, async)
- Minimal JavaScript bundle
- CSS optimization

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

---

## Deployment

### Build Process

- Vite build system
- TypeScript compilation
- CSS processing (PostCSS)
- Asset optimization

### Hosting

- Static site hosting (Netlify/Vercel)
- Documentation in `/docs/` directory
- SPA routing configured

---

## File Structure Summary

```
kubegraf.io/
├── client/
│   ├── index.html          # Main HTML entry
│   ├── src/
│   │   ├── App.tsx        # Main app component
│   │   ├── main.tsx       # Entry point
│   │   ├── pages/         # Page components
│   │   ├── components/    # React components
│   │   │   ├── layout/   # Layout components
│   │   │   ├── sections/ # Section components
│   │   │   └── ui/       # UI components
│   │   ├── config/       # Configuration
│   │   ├── hooks/        # React hooks
│   │   └── lib/          # Utilities
│   └── public/           # Static assets
├── docs/                  # Documentation HTML files
├── script/               # Build scripts
└── package.json          # Dependencies
```

---

## Key Features Summary

1. **Multi-page SPA** with React Router (wouter)
2. **Theme system** (light/dark) with persistence
3. **Responsive design** for all devices
4. **SEO optimized** with meta tags and structured data
5. **Accessible** with WCAG compliance
6. **Performance optimized** with code splitting
7. **Modern UI** with animations and interactions
8. **Comprehensive documentation** in static HTML
9. **Brand clarity** disclaimers throughout
10. **Local-first messaging** emphasized

---

## Contact Information

- **Email:** contact@kubegraf.io
- **GitHub:** https://github.com/kubegraf/kubegraf
- **Website:** https://kubegraf.io

---

*Last Updated: January 2025*
