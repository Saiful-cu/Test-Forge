# TestForge — Universal Software Feature & QA Management System

A client-demo MVP for managing a master library of software features and running project-specific
QA cycles against them. Pick the features a project will implement, and its test cases are imported
automatically as independent, executable copies.

## Running it

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # type-check + production bundle into dist/
npm run preview # serve the production build
```

No backend, no login, no API keys. Projects are stored in the browser's **IndexedDB**; the master
library's edits are a small overlay in `localStorage`. Data saved by an earlier version is migrated
out of `localStorage` automatically on first load.

## What's in the box

| Page | What it does |
| --- | --- |
| **Dashboard** | Live counts (projects, master features, test cases, executed / passed / failed / blocked), overall execution %, per-project progress bars, execution donut, recent projects, feature coverage by category. |
| **Projects** | Create, edit, delete and open projects. Search and filter by category; each card shows its live pass/fail/blocked/not-run split. |
| **Create Project** | Five-step wizard: details → category → modules in scope → feature checkboxes (with live selected count) → confirm. Creating the project copies every associated master test case into it. |
| **Project Detail** | Project overview and stats, selected features with per-feature counts and progress, expandable test case lists, and per-case execution (Not Run / Pass / Fail / Blocked). Within each feature you can **add** a test case, **update** any test case in full (title, description, preconditions, steps, expected result, test type, priority, actual result, notes) and **delete** one that isn't suitable, with a confirmation step. Filters for status, priority and test type; features can also be added or removed. |
| **Feature Library** | 35 industries → feature groups → features, searchable across the whole library. Feature groups and features can be **created, renamed and deleted** here, and each feature opens its **own page**. |
| **Feature page** | Overview first — description plus a one-line "how this works in practice". A **View in detail** toggle then expands an SVG **flowchart** (main path left to right, with the validation, permission and security branches that divert it hanging below), the written step-by-step sequence, a state lifecycle where the feature has one, the rules it must enforce, where it usually breaks, and what it connects to. |
| **Feature page (test cases)** | One feature's full master test case list, with search and filters (scope, test type, priority), coverage and test-type breakdowns, add / edit / delete for its master test cases, and edit / delete for the feature itself. |
| **Reports** | Per-project report with totals, execution %, pass %, a status donut, feature-wise execution table, breakdowns by priority and test type, a failed/blocked worklist, and CSV export. A workspace roll-up lists every project. |

The header search is global — it jumps to matching projects, features and master test cases
(press <kbd>/</kbd> to focus it).

## Data model and business rules

- **Master library** (`src/data/`) covers **40 industries → 247 feature groups → 1,275 features → ~30,400
  master test cases**, including five AI categories: AI Voice Agents, Conversational AI & Chatbots,
  Generative AI Platform, AI / ML Operations, and Computer Vision & Document AI. `masterLibraryAdditions.ts` contributes 25 groups, 112 features and 737
  hand-written test cases on top of the catalog in `catalog.ts` / `catalog2.ts`; it is folded into the
  library at build time, so it ships as part of the defaults rather than as per-browser state. Test cases are generated from the catalog on first use and cached, so startup stays fast.
  The library is editable: additions, edits and deletions are persisted as a small overlay in
  `testforge.masterLibrary.v1` rather than by copying the whole library into localStorage. Anything
  already shipped in the library is ignored if an old overlay still holds a copy, so nothing appears twice.
- **Projects** (`src/store/StoreContext.tsx`) hold their own `ProjectFeature` and `ProjectTestCase`
  records. Selecting a feature **copies** its master test cases into the project; editing a project
  test case never touches the master library.
- Every test case carries ID, title, description, preconditions, steps, expected result, test type
  and priority, plus the project-side execution fields (status, actual result, notes, executed-at).
- A project can also hold custom test cases added directly to one of its features.
- Adding, editing and deleting test cases all act on the project copy only. Deleting an imported
  case removes it from that project; the master original stays in the library and is re-imported
  whenever the feature is selected again.
- **Mandatory common checks.** Every feature carries the same 12 common acceptance checks (smoke,
  CRUD, required fields, permissions, injection, persistence, error handling, audit). They are flagged
  `Mandatory`, and a project's **release gate** is met only when all of them have passed. Where a
  hand-written scenario already covers one of these checks, it takes that slot instead of being duplicated.
- **The library is editable.** Feature groups (modules) and features can be added, renamed and
  deleted alongside test cases. A feature you create is registered like a catalog feature: it gets its
  own test case ID prefix and the same plan, so it arrives with the mandatory common checks already
  generated rather than empty. Only the difference from the catalog is persisted, so adding a feature
  costs a few hundred bytes rather than copying its test cases into storage.
- **AI features get AI-specific scenarios.** An `ai-quality` scenario family covers model outage
  fallback, grounding against the supplied source, prompt injection, latency budgets, unclear input,
  content moderation, and per-request model/version/cost attribution. It is exempt from the depth cap,
  so on an AI feature those scenarios are never the ones dropped. AI Voice Agents additionally carries
  hand-written scenarios (`src/data/curatedAiTestCases.ts`) for inbound call handling, barge-in,
  tool calling, PII redaction and speech-to-text.
- **Feature descriptions are layered.** Every feature has a description and a short real-world
  example; opening *View in detail* adds a flowchart, a numbered workflow, and sections read live from
  the feature's own test cases (rules enforced, where it breaks, what it connects to), so the detail
  cannot drift away from the tests. The flowchart's branch counts come from those same test cases.
  Below `md` the chart is replaced by the sequence plus guard chips, since scaling the SVG that far
  down would make its labels unreadable. Descriptions, examples and workflows are hand-written for the
  12 platform features — which appear in all 40 categories, so they cover 480 features — and for the
  AI Voice Agents features (`featureGuides.ts`, `featureWorkflows.ts`). Everything else is derived
  from the same traits that decide its test coverage, which keeps the wording accurate rather than
  inventing detail the library does not model.
- **Test case depth varies by feature.** On top of the common checks, each feature picks up the scenario
  families that match what it actually does — lifecycle, money, roles, files, scheduling, integration,
  compliance and volume. A simple screen ends up with about 12 test cases and a complex one with 40+,
  rather than every feature having an identical count.
- All report figures are derived from current execution statuses — nothing is cached or stored.
- Projects persist to IndexedDB (database `testforge`, key `projects.v2`). A project holds an
  independent copy of every test case it imported — roughly 0.9 KB per case, so a 750-case project is
  about 650 KB. That is why projects are not kept in `localStorage`, whose ~5 MB ceiling throws once
  it is reached. The sidebar shows how much is currently stored.

## Sample data

Three projects are seeded on first load, with realistic execution results already recorded:

- **RoofPro** — Roofing Management; Roof Inspection, Roof Estimation, Customer Management,
  Work Orders and Invoice Management (122 test cases, ~76% executed, release gate not yet met).
- **ShopFlow Commerce** — E-commerce; catalog through payment (~120 test cases, ~40% executed).
- **Nimbus HR** — HRM; onboarding, attendance, leave and payroll (~90 test cases, not yet started).

The core Roofing Management features carry hand-written test cases covering positive, validation,
negative, boundary, permission, security and integration scenarios (`src/data/curatedTestCases.ts`).
Every other feature is generated from the common checks plus the scenario families that fit it
(`src/data/masterLibrary.ts`).

“Reset demo data” at the bottom of the sidebar restores this sample set.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS · React Router · Lucide icons. Charts are hand-rolled
SVG, so there is no charting dependency.

## Layout

```
src/
  components/   layout, UI primitives, donut chart, test case row
  data/         catalog (+ extra industries, + AI), curated and AI test cases, library builder, seed
  pages/        dashboard, projects, create-project wizard, project detail, feature library,
                feature detail, test case library, reports
  store/        localStorage-backed project store and master library overlay
  lib/          stats and formatting helpers
```
