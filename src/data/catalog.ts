import { EXTRA_CATALOG } from './catalog2'
import { AI_CATALOG } from './catalog3'
import { categoryPriority } from './categoryPriority'

/**
 * Raw catalog of software categories -> modules -> features.
 * Kept as a compact literal so the master library stays easy to extend.
 */
export interface RawCategory {
  name: string
  icon: string
  description: string
  modules: Array<{ name: string; features: string[] }>
}

const m = (name: string, features: string[]) => ({ name, features })

const DOMAIN_CATALOG: RawCategory[] = [
  {
    name: 'CRM',
    icon: 'Users',
    description: 'Customer relationship management — leads, contacts, pipeline and engagement.',
    modules: [
      m('Lead Management', ['Lead Capture', 'Lead Assignment', 'Lead Scoring', 'Lead Conversion']),
      m('Contacts & Accounts', [
        'Contact Management',
        'Account Management',
        'Contact Import & Export',
        'Activity Timeline',
      ]),
      m('Sales Pipeline', ['Deal Management', 'Pipeline Stages', 'Sales Forecasting', 'Quotation']),
      m('Engagement', ['Email Campaigns', 'Tasks & Reminders', 'Call Logging', 'Notes & Attachments']),
      m('Insights', ['Sales Dashboard', 'Custom Reports']),
    ],
  },
  {
    name: 'SaaS / Subscription Management',
    icon: 'Repeat',
    description: 'Plans, subscriptions, recurring billing, metering and tenant administration.',
    modules: [
      m('Plans & Pricing', ['Plan Management', 'Pricing Tiers', 'Feature Entitlements', 'Coupons & Discounts']),
      m('Subscription Lifecycle', [
        'Subscription Creation',
        'Upgrade & Downgrade',
        'Cancellation & Pause',
        'Trial Management',
      ]),
      m('Billing', ['Recurring Billing', 'Invoice Generation', 'Payment Gateway Integration', 'Dunning & Retry']),
      m('Usage & Metering', ['Usage Tracking', 'Overage Billing', 'Quota Enforcement']),
      m('Tenant Administration', ['Tenant Provisioning', 'Tenant Settings', 'User Seat Management']),
    ],
  },
  {
    name: 'E-commerce',
    icon: 'ShoppingCart',
    description: 'Online storefront — catalog, cart, checkout, orders, payments and fulfilment.',
    modules: [
      m('Catalog', ['Product Management', 'Category Management', 'Product Variants', 'Product Reviews']),
      m('Cart & Checkout', ['Shopping Cart', 'Checkout Flow', 'Coupon Application', 'Guest Checkout']),
      m('Order Management', ['Order Placement', 'Order Tracking', 'Returns & Refunds', 'Order Cancellation']),
      m('Payments & Shipping', ['Payment Processing', 'Shipping Rates', 'Tax Calculation', 'Delivery Tracking']),
      m('Customer Accounts', ['Customer Profile', 'Wishlist', 'Address Book']),
    ],
  },
  {
    name: 'ERP',
    icon: 'Factory',
    description: 'Enterprise resource planning across finance, procurement, manufacturing and supply chain.',
    modules: [
      m('Finance', ['General Ledger', 'Accounts Payable', 'Accounts Receivable', 'Budgeting']),
      m('Procurement', ['Purchase Requisition', 'Purchase Order', 'Vendor Management', 'Goods Receipt']),
      m('Manufacturing', ['Bill of Materials', 'Production Planning', 'Work Center Management', 'Quality Control']),
      m('Supply Chain', ['Warehouse Management', 'Stock Transfer', 'Demand Forecasting']),
      m('Administration', ['Master Data Management', 'Multi-Currency Setup', 'Approval Workflows']),
    ],
  },
  {
    name: 'HRM',
    icon: 'UserCog',
    description: 'Human resource management — hiring, employee lifecycle, attendance and payroll.',
    modules: [
      m('Recruitment', ['Job Requisition', 'Candidate Management', 'Interview Scheduling', 'Offer Management']),
      m('Employee Lifecycle', ['Employee Onboarding', 'Employee Records', 'Transfers & Promotions', 'Offboarding']),
      m('Time & Attendance', ['Attendance Tracking', 'Leave Management', 'Shift Scheduling', 'Timesheets']),
      m('Payroll', ['Salary Structure', 'Payroll Processing', 'Payslip Generation', 'Statutory Deductions']),
      m('Performance', ['Goal Setting', 'Performance Appraisal', 'Training Management']),
    ],
  },
  {
    name: 'Project Management',
    icon: 'KanbanSquare',
    description: 'Plan, execute and track project work across teams.',
    modules: [
      m('Planning', ['Project Setup', 'Milestone Management', 'Gantt Chart', 'Resource Allocation']),
      m('Execution', ['Task Management', 'Subtasks & Checklists', 'Kanban Board', 'Sprint Management']),
      m('Collaboration', ['Comments & Mentions', 'File Attachments', 'Notifications', 'Team Workspace']),
      m('Tracking', ['Time Logging', 'Workload Report', 'Burndown Chart', 'Project Budget']),
    ],
  },
  {
    name: 'Inventory Management',
    icon: 'Boxes',
    description: 'Stock control, warehousing, replenishment and fulfilment.',
    modules: [
      m('Stock Control', ['Item Master', 'Stock Levels', 'Stock Adjustment', 'Batch & Serial Tracking']),
      m('Warehouse', ['Warehouse Setup', 'Bin Location Management', 'Stock Transfer', 'Cycle Count']),
      m('Purchasing', ['Reorder Point', 'Purchase Order', 'Supplier Management', 'Goods Receipt Note']),
      m('Outbound', ['Sales Order Fulfilment', 'Picking & Packing', 'Dispatch & Delivery']),
      m('Reporting', ['Stock Valuation', 'Inventory Aging Report']),
    ],
  },
  {
    name: 'Healthcare Management',
    icon: 'Stethoscope',
    description: 'Clinical and administrative workflows for hospitals and clinics.',
    modules: [
      m('Patient Management', ['Patient Registration', 'Medical Records', 'Patient Portal', 'Insurance Verification']),
      m('Clinical', [
        'Appointment Scheduling',
        'Doctor Consultation',
        'Prescription Management',
        'Lab Orders & Results',
      ]),
      m('Inpatient', ['Admission & Discharge', 'Bed Management', 'Nursing Notes', 'Operation Theatre Scheduling']),
      m('Pharmacy & Billing', ['Pharmacy Inventory', 'Billing & Claims', 'Payment Collection']),
      m('Compliance', ['Audit Trail & Consent', 'Role-Based Clinical Access']),
    ],
  },
  {
    name: 'Learning Management System',
    icon: 'GraduationCap',
    description: 'Course delivery, assessment and learner progress tracking.',
    modules: [
      m('Course Management', ['Course Creation', 'Curriculum & Modules', 'Content Upload', 'Course Catalog']),
      m('Learner Experience', ['Student Enrollment', 'Lesson Player', 'Progress Tracking', 'Certificates']),
      m('Assessment', ['Quiz Builder', 'Assignment Submission', 'Grading & Rubrics', 'Proctoring Rules']),
      m('Engagement', ['Discussion Forum', 'Announcements', 'Live Class Scheduling']),
      m('Administration', ['Instructor Management', 'Reports & Analytics']),
    ],
  },
  {
    name: 'Real Estate Management',
    icon: 'Building2',
    description: 'Listings, leasing, sales pipeline and facility operations.',
    modules: [
      m('Property', [
        'Property Listing',
        'Property Media & Documents',
        'Property Valuation',
        'Availability Calendar',
      ]),
      m('Leasing', ['Lease Agreement', 'Tenant Management', 'Rent Collection', 'Lease Renewal & Termination']),
      m('Sales', ['Buyer Lead Management', 'Site Visit Scheduling', 'Offer & Negotiation', 'Deal Closure']),
      m('Facility', ['Maintenance Requests', 'Vendor Work Orders', 'Utility Billing']),
      m('Reporting', ['Occupancy Report', 'Revenue Dashboard']),
    ],
  },
  {
    name: 'Booking & Reservation',
    icon: 'CalendarCheck',
    description: 'Availability, reservations, rate plans and front-desk operations.',
    modules: [
      m('Inventory & Availability', [
        'Resource Setup',
        'Availability Calendar',
        'Capacity Management',
        'Blackout Dates',
      ]),
      m('Booking Flow', [
        'Search & Filter',
        'Booking Creation',
        'Modification & Rescheduling',
        'Cancellation & Refund',
      ]),
      m('Pricing', ['Rate Plans', 'Seasonal Pricing', 'Promo Codes', 'Deposit & Partial Payment']),
      m('Operations', ['Check-in & Check-out', 'Waitlist Management', 'Notifications & Reminders']),
      m('Reporting', ['Occupancy & Utilisation', 'Revenue Report']),
    ],
  },
  {
    name: 'Document Management',
    icon: 'FolderOpen',
    description: 'Secure document storage, versioning, approval and discovery.',
    modules: [
      m('Storage', ['Document Upload', 'Folder Structure', 'Metadata & Tagging', 'Bulk Import']),
      m('Versioning', ['Version History', 'Check-in & Check-out', 'Document Comparison']),
      m('Access Control', ['Permission Management', 'Sharing & Links', 'Audit Log']),
      m('Workflow', ['Approval Workflow', 'E-Signature', 'Retention & Archival']),
      m('Discovery', ['Full-Text Search', 'Advanced Filters', 'OCR Processing']),
    ],
  },
  {
    name: 'Roofing Management',
    icon: 'Home',
    description: 'End-to-end roofing contractor operations from inspection to payment.',
    modules: [
      m('Inspection & Measurement', [
        'Roof Inspection',
        'Roof Measurement',
        'Damage Assessment',
        'Photo Documentation',
      ]),
      m('Sales & Estimation', ['Roof Estimation', 'Quotation', 'Proposal Approval', 'Material Takeoff']),
      m('Customers & Jobs', ['Customer Management', 'Job Management', 'Work Orders', 'Scheduling']),
      m('Field Operations', ['Contractor Management', 'Material Management', 'Daily Job Log', 'Safety Checklist']),
      m('Billing', ['Invoice Management', 'Payment Management', 'Warranty Management', 'Insurance Claim']),
    ],
  },
  {
    name: 'Marketplace',
    icon: 'Store',
    description: 'Multi-vendor marketplace with seller onboarding, payouts and trust controls.',
    modules: [
      m('Seller Management', ['Seller Onboarding', 'Seller KYC Verification', 'Seller Dashboard', 'Seller Ratings']),
      m('Listings', ['Listing Creation', 'Listing Moderation', 'Category Taxonomy', 'Search & Ranking']),
      m('Transactions', ['Order Splitting', 'Escrow Payment', 'Commission Management', 'Payout Processing']),
      m('Trust & Safety', ['Dispute Resolution', 'Review Moderation', 'Fraud Detection']),
      m('Buyer Experience', ['Buyer Account', 'Buyer-Seller Messaging', 'Order Tracking']),
    ],
  },
  {
    name: 'FinTech',
    icon: 'Landmark',
    description: 'Digital wallets, payments, lending and regulatory compliance.',
    modules: [
      m('Onboarding & KYC', ['Customer Onboarding', 'KYC & AML Verification', 'Document Verification', 'Risk Scoring']),
      m('Accounts & Wallets', ['Wallet Creation', 'Balance Management', 'Account Statements', 'Multi-Currency Wallet']),
      m('Payments', ['Fund Transfer', 'Payment Request', 'Scheduled Payments', 'Transaction Limits']),
      m('Lending', ['Loan Application', 'Credit Assessment', 'Disbursement', 'Repayment Schedule']),
      m('Compliance', ['Fraud Monitoring', 'Audit Trail', 'Regulatory Reporting']),
    ],
  },
]

/**
 * Cross-cutting capabilities every business system needs. Appended to every category so the
 * library covers the platform features a project has to test, not only its domain features.
 */
export const PLATFORM_MODULE = {
  name: 'Platform & Administration',
  features: [
    'User Management',
    'Roles & Permissions',
    'Authentication & Login',
    'Password & Account Recovery',
    'Notifications & Alerts',
    'Audit Log',
    'Settings & Configuration',
    'Global Search',
    'Data Import & Export',
    'Reporting & Dashboards',
    'Integrations & API Access',
    'Backup & Data Retention',
  ],
}

export const RAW_CATALOG: RawCategory[] = [...DOMAIN_CATALOG, ...EXTRA_CATALOG, ...AI_CATALOG]
  .map((c) => ({
    ...c,
    modules: [...c.modules, { name: PLATFORM_MODULE.name, features: [...PLATFORM_MODULE.features] }],
  }))
  // Presented in priority order, so the highest-priority categories lead everywhere.
  .sort((a, b) => categoryPriority(a.name) - categoryPriority(b.name))

/** Hand-written descriptions for features that need more than the generated default. */
export const FEATURE_DESCRIPTIONS: Record<string, string> = {
  'Roof Inspection':
    'Field inspection of a roof: condition checklist, pitch and layer notes, leak points, photo evidence and a signed inspection report.',
  'Roof Measurement':
    'Capture roof dimensions by facet — length, width, pitch, ridge, valley and eave lengths — and derive total squares with a waste factor.',
  'Roof Estimation':
    'Build a priced estimate from measurements and material selections, including labour, tear-off, disposal, margin and tax.',
  'Customer Management':
    'Central record for homeowners and property managers: contact details, service address, properties, communication log and job history.',
  'Work Orders':
    'Dispatchable work instruction for a crew: scope, site address, schedule window, assigned contractor, materials and completion sign-off.',
  'Invoice Management':
    'Generate, send and track roofing invoices from approved estimates or completed work orders, including retainage and change orders.',
  'Payment Management':
    'Record deposits, progress payments and final settlements against invoices, with payment methods, receipts and outstanding balance.',
  'Job Management':
    'Master job record linking customer, estimate, work orders, crew, materials, milestones and job financials.',
  Scheduling:
    'Calendar and dispatch board for inspections, installations and repairs with crew availability and weather-aware rescheduling.',
  Quotation:
    'Customer-facing quote generated from an estimate with options, validity period, terms and electronic acceptance.',
  'Contractor Management':
    'Subcontractor roster with trade, licence and insurance expiry, crew assignment, rates and performance history.',
  'Material Management':
    'Shingles, underlayment and accessory inventory with per-job allocation, supplier orders, delivery to site and returns.',
  'Damage Assessment':
    'Classify storm, hail and wind damage by slope with severity scoring to support repair-versus-replace decisions and insurance claims.',
  'Insurance Claim':
    'Track claim numbers, adjuster meetings, scope agreements, supplements and claim payouts against a job.',
}
