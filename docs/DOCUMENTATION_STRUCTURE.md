# Documentation Structure

This document explains how the KubeGraf documentation is organized and follows industry best practices for technical documentation.

## Organization Principles

The documentation follows a **user journey** approach, similar to how major projects like Kubernetes, Docker, and Terraform organize their docs:

1. **Start with basics** - Introduction and getting started
2. **Build understanding** - Core concepts and principles
3. **Learn by doing** - User guides and workflows
4. **Solve problems** - Troubleshooting guides
5. **Make decisions** - Comparisons and reference
6. **Go deep** - Architecture and internals (for developers)

## Documentation Sections

### 1. Introduction
**Audience:** New users, evaluators  
**Purpose:** Understand what KubeGraf is and why it exists

- What is KubeGraf?
- Why KubeGraf?
- How KubeGraf works

### 2. Getting Started
**Audience:** New users  
**Purpose:** Get up and running quickly

- Installation
- Quick Start
- Connect your first cluster
- UI overview

### 3. Core Concepts
**Audience:** All users  
**Purpose:** Understand how KubeGraf thinks and works

- Clusters & contexts
- **Incident Intelligence** - How incident detection works
- **Deterministic Diagnosis** - Why rules > guessing
- **Evidence & Confidence** - How conclusions are justified
- **Safety Model** - Why fixes are safe by default
- Topology graph
- Event timeline
- Local-first architecture

### 4. User Guide
**Audience:** Active users  
**Purpose:** Learn how to use KubeGraf effectively

- Terminal UI
- Web Dashboard
- **Incidents Overview** - Using the incidents page
- **Incident Detail View** - Understanding incident details
- **Fix Preview and Apply** - Safely applying fixes
- **Knowledge Bank** - Learning from past incidents

### 5. Troubleshooting
**Audience:** Users solving problems  
**Purpose:** Step-by-step guides for common issues

- CrashLoopBackOff
- Rollout stuck
- High CPU / memory
- Restarts after config change
- It was working yesterday

### 6. Workflows
**Audience:** Users learning best practices  
**Purpose:** Complete workflows for common tasks

- Debug CrashLoopBackOff
- Rollout & rollback
- Capacity analysis
- Security insights
- Incident review

### 7. Integrations
**Audience:** Users setting up integrations  
**Purpose:** Connect KubeGraf with other tools

- Prometheus
- Grafana
- ArgoCD
- Slack
- CI/CD

### 8. Compare
**Audience:** Decision makers, evaluators  
**Purpose:** Understand how KubeGraf compares to alternatives

- **KubeGraf vs Kubernetes IDEs** - Fair comparison with Lens

### 9. Reference
**Audience:** All users  
**Purpose:** Quick lookup for commands, config, APIs

- CLI commands
- Configuration options
- Plugins
- API schema
- FAQ

### 10. Architecture & Internals
**Audience:** Developers, contributors, advanced users  
**Purpose:** Deep technical details for extending KubeGraf

- **System Overview** - High-level architecture
- **Intelligence Pipeline** - How signals become incidents
- **Snapshot Architecture** - Performance optimization
- **Runbooks & Remediation** - Fix engine details
- **Learning Engine** - How the system learns

## File Organization

```
docs/
├── index.md                    # Landing page
├── introduction/               # Introduction docs
├── getting-started/            # Getting started guides
├── core-concepts/              # Conceptual documentation
│   ├── incident-intelligence.md
│   ├── deterministic-diagnosis.md
│   ├── evidence-and-confidence.md
│   └── safety-model.md
├── user-guide/                 # Usage guides
│   ├── incidents-overview.md
│   ├── incident-detail-view.md
│   ├── fix-preview-and-apply.md
│   └── knowledge-bank.md
├── troubleshooting/            # Troubleshooting guides
├── workflows/                  # Workflow guides
├── integrations/               # Integration guides
├── compare/                    # Comparison docs
│   └── kubegraf-vs-lens.md
├── reference/                  # Reference documentation
└── architecture/               # Architecture & internals
    ├── system-overview.md
    ├── intelligence-pipeline.md
    ├── snapshot-architecture.md
    ├── runbooks-and-remediation.md
    └── learning-engine.md
```

## Navigation Structure

The sidebar navigation (`sidebar.json`) reflects this organization:

1. **Introduction** - Start here
2. **Getting Started** - Quick setup
3. **Core Concepts** - Understand the fundamentals
4. **User Guide** - Learn to use features
5. **Troubleshooting** - Solve problems (highlighted)
6. **Workflows** - Best practices
7. **Integrations** - Connect tools
8. **Compare** - Make decisions
9. **Reference** - Look up details
10. **Architecture & Internals** - Go deep

## Best Practices Followed

### 1. Progressive Disclosure
- Start simple, go deeper
- Concepts before usage
- Usage before architecture

### 2. User-Centric Organization
- Organized by user needs, not features
- Clear audience for each section
- Workflows over feature lists

### 3. Multiple Entry Points
- New users: Introduction → Getting Started
- Active users: User Guide → Workflows
- Problem solvers: Troubleshooting (highlighted)
- Evaluators: Compare
- Developers: Architecture & Internals

### 4. Consistent Structure
- Each section has clear purpose
- Related content grouped together
- Cross-references between sections

### 5. Accessibility
- Clear headings and navigation
- Search-friendly structure
- Mobile-responsive layout

## Industry Examples

This structure follows patterns from:

- **Kubernetes** - Concepts → Tasks → Reference → Architecture
- **Docker** - Get started → Guides → Reference → Architecture
- **Terraform** - Intro → Getting started → Language → Cloud → Reference
- **GitLab** - Overview → Use cases → User guide → Admin → Reference

## Maintenance Guidelines

### Adding New Documentation

1. **Identify the audience** - Who is this for?
2. **Choose the right section** - Where does it fit?
3. **Follow existing patterns** - Match style and structure
4. **Update sidebar.json** - Add to navigation
5. **Cross-reference** - Link to related docs

### Updating Existing Documentation

1. **Maintain structure** - Keep organization consistent
2. **Update cross-references** - Fix broken links
3. **Review navigation** - Ensure sidebar reflects content
4. **Test links** - Verify all internal links work

---

This structure ensures users can find what they need quickly, whether they're just starting out or diving deep into the internals.

