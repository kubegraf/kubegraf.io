# Incidents Overview

The Incidents page is your starting point for understanding what's happening in your cluster. It shows all detected incidents in one place, with filters to help you focus on what matters.

## Accessing the Incidents Page

Navigate to **Incident Intelligence** in the sidebar. The page loads automatically and shows all active incidents in your cluster.

## What You'll See

### Summary Statistics

At the top of the page, you'll see compact colored chips showing incident counts:

- **Critical** — Incidents that require immediate attention (red)
- **High** — Significant issues that should be addressed soon (orange)
- **Medium/Warning** — Issues that may need attention (yellow)
- **With Diagnosis** — Incidents where KubeGraf has identified a root cause (green)
- **Fixable** — Incidents that have recommended fixes available (cyan)

These counts update automatically as incidents are detected or resolved.

### Incident Intelligence Roadmap Banner

Below the summary, you'll see a compact banner indicating future features:

- **Security Incidents** — Coming after launch
- **Reliability Incidents (5xx RCA)** — Coming after launch
- **No runtime traffic analysis in v1** — Current scope limitation

This banner is informational only and doesn't affect current functionality.

### Filter Bar

The filter bar lets you narrow down the incident list:

**Pattern Filter** — Filter by incident type:
- All Patterns
- 💀 App Crash
- 🔄 CrashLoop
- 💥 OOM Pressure
- 🌪️ Restart Storm
- 🔌 No Ready Endpoints
- 🐛 Internal Errors
- ⬆️ Upstream Failure
- ⏱️ Timeouts
- 📦 Image Pull Failure
- ⚙️ Config Error
- 🌐 DNS Failure
- 🔒 Permission Denied

**Severity Filter** — Filter by severity level:
- All Severities
- 🔴 Critical
- 🟠 High
- 🟡 Medium
- 🔵 Low
- ⚪ Info

**Namespace Filter** — Filter by namespace:
- All Namespaces
- Individual namespace names

**Status Filter** — Filter by incident status:
- All Status
- 🟢 Active
- ✅ Resolved
- 🔍 Investigating
- 🔧 Remediating
- 🔇 Suppressed

Filters work together. For example, you can show only "Critical" incidents in the "production" namespace that are "Active."

### Incident Table

The main table shows all incidents matching your filters. Each row displays:

**Pattern** — The type of incident (emoji + name)

**Resource** — The affected Kubernetes resource (e.g., `Pod/my-app-abc123`)

**Severity** — Color-coded severity badge

**Diagnosis** — A brief summary of what KubeGraf found

**Fixes** — Number of recommended fixes available

**Risk** — Risk level of the recommended fixes (low, medium, high)

**Last Seen** — When the incident was last observed

**Actions** — Menu with options:
- View Details — Opens the incident detail view
- View Pod — Navigate to the pod (if applicable)
- View Logs — Open pod logs
- View Events — Show related Kubernetes events

## Understanding Incident Status

Incidents can be in different states:

- **Active** — Currently happening in your cluster
- **Resolved** — The underlying issue has been fixed
- **Investigating** — You're actively working on this incident
- **Remediating** — A fix is being applied
- **Suppressed** — Temporarily ignored (won't appear in default views)

## Refreshing the List

Click the **Refresh** button in the header to manually refresh the incident list. The list also auto-refreshes periodically to show new incidents and status changes.

## What Happens When You Click an Incident

Clicking anywhere on an incident row opens the **Incident Detail View**. This shows:

- Complete diagnosis with evidence
- Root cause analysis
- Recommended fixes
- Related resources and events
- Timeline of the incident

From the detail view, you can preview and apply fixes, view related resources, and understand exactly what's happening.

## Tips for Using the Overview

**Start with severity** — Filter by "Critical" first to see the most urgent issues.

**Use pattern filters** — If you're seeing a specific type of problem (e.g., CrashLoop), filter by pattern to see all instances.

**Check diagnosis status** — Filter by "With Diagnosis" to see incidents where KubeGraf has identified a root cause and can suggest fixes.

**Focus on fixable** — Filter by "Fixable" to see incidents where you can take immediate action.

**Combine filters** — Use multiple filters together to create focused views. For example: "Critical" + "production" + "Active" shows only critical active incidents in production.

---

**Next:** Learn how to use the [Incident Detail View](incident-detail-view.md) to understand and fix incidents.

