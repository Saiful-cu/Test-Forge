import type { RawCategory } from './catalog'

const m = (name: string, features: string[]) => ({ name, features })

/** Additional industries, kept in their own file so the first catalog stays readable. */
export const EXTRA_CATALOG: RawCategory[] = [
  {
    name: 'Hospitality & Hotel Management',
    icon: 'BedDouble',
    description: 'Front desk, housekeeping, rates and guest services for hotels and resorts.',
    modules: [
      m('Reservations', ['Room Booking', 'Rate & Availability', 'Group Reservations', 'Channel Manager']),
      m('Front Desk', ['Guest Check-in', 'Guest Check-out', 'Room Assignment', 'Folio & Charges']),
      m('Housekeeping', ['Room Status', 'Cleaning Schedule', 'Lost & Found', 'Maintenance Requests']),
      m('Guest Services', ['Guest Profile', 'Loyalty Programme', 'Concierge Requests', 'Feedback & Reviews']),
    ],
  },
  {
    name: 'Restaurant & Food Service',
    icon: 'UtensilsCrossed',
    description: 'Menus, orders, kitchen operations and table service for restaurants and cafés.',
    modules: [
      m('Menu', ['Menu Management', 'Recipe & Costing', 'Modifiers & Combos', 'Allergen Information']),
      m('Order Taking', ['Dine-in Orders', 'Takeaway Orders', 'Online Delivery Orders', 'Order Modification']),
      m('Kitchen', ['Kitchen Display', 'Preparation Queue', 'Stock Deduction', 'Wastage Recording']),
      m('Service & Billing', ['Table Management', 'Split Bill', 'Tips & Service Charge', 'Shift Cash-up']),
    ],
  },
  {
    name: 'Logistics & Transportation',
    icon: 'Truck',
    description: 'Freight, fleet, route planning and delivery tracking.',
    modules: [
      m('Shipments', ['Shipment Booking', 'Consignment Tracking', 'Proof of Delivery', 'Freight Rating']),
      m('Fleet', ['Vehicle Management', 'Driver Management', 'Fuel Tracking', 'Vehicle Maintenance']),
      m('Routing', ['Route Planning', 'Dispatch Board', 'Live GPS Tracking', 'Delivery Exceptions']),
      m('Warehouse Interface', ['Loading & Unloading', 'Dock Scheduling', 'Returns Logistics']),
    ],
  },
  {
    name: 'Field Service Management',
    icon: 'Wrench',
    description: 'Mobile workforce scheduling, job execution and service contracts.',
    modules: [
      m('Service Requests', ['Request Intake', 'Triage & Prioritisation', 'SLA Management', 'Customer Assets']),
      m('Dispatch', ['Technician Scheduling', 'Skill-based Assignment', 'Route Optimisation', 'Mobile Job App']),
      m('Job Execution', ['Checklists & Forms', 'Parts Consumption', 'Time & Travel Logging', 'Customer Signature']),
      m('Contracts', ['Service Contracts', 'Preventive Maintenance Plans', 'Warranty Claims']),
    ],
  },
  {
    name: 'Insurance Management',
    icon: 'ShieldCheck',
    description: 'Policy administration, underwriting, claims and renewals.',
    modules: [
      m('Policy', ['Quotation & Rating', 'Policy Issuance', 'Endorsements', 'Policy Renewal']),
      m('Underwriting', ['Risk Assessment', 'Underwriting Rules', 'Reinsurance', 'Premium Calculation']),
      m('Claims', ['Claim Intake', 'Claim Assessment', 'Claim Settlement', 'Fraud Investigation']),
      m('Distribution', ['Agent & Broker Management', 'Commission Management', 'Customer Portal']),
    ],
  },
  {
    name: 'Legal Practice Management',
    icon: 'Scale',
    description: 'Matters, clients, time recording and legal document workflow.',
    modules: [
      m('Matters', ['Matter Intake', 'Matter Management', 'Conflict Check', 'Court Diary']),
      m('Clients', ['Client Onboarding', 'Client Trust Accounting', 'Engagement Letters']),
      m('Documents', ['Document Drafting', 'Precedent Library', 'E-Filing', 'Document Review']),
      m('Billing', ['Time Recording', 'Disbursements', 'Fee Notes & Invoicing', 'Write-offs']),
    ],
  },
  {
    name: 'Construction & Contracting',
    icon: 'HardHat',
    description: 'Projects, subcontractors, site progress and construction cost control.',
    modules: [
      m('Pre-construction', ['Tender Management', 'Bill of Quantities', 'Cost Estimation', 'Contract Award']),
      m('Site Operations', ['Daily Site Report', 'Labour & Plant Tracking', 'Snag List', 'Site Safety & Incidents']),
      m('Commercial', ['Variation Orders', 'Progress Valuation', 'Subcontractor Payments', 'Retention Management']),
      m('Planning', ['Work Breakdown Structure', 'Programme Schedule', 'Material Requisition']),
    ],
  },
  {
    name: 'Automotive Dealership & Workshop',
    icon: 'Car',
    description: 'Vehicle sales, service workshop, parts and warranty.',
    modules: [
      m('Sales', ['Vehicle Inventory', 'Test Drive Booking', 'Deal & Financing', 'Trade-in Valuation']),
      m('Workshop', ['Job Card', 'Vehicle Inspection', 'Repair Estimate', 'Technician Allocation']),
      m('Parts', ['Parts Catalogue', 'Parts Stock', 'Parts Ordering', 'Parts Returns']),
      m('Aftersales', ['Service Reminders', 'Warranty Claims', 'Customer Vehicle History']),
    ],
  },
  {
    name: 'Fitness & Wellness',
    icon: 'Dumbbell',
    description: 'Memberships, classes, trainers and facility access.',
    modules: [
      m('Membership', ['Member Registration', 'Membership Plans', 'Freeze & Cancellation', 'Member Check-in']),
      m('Classes', ['Class Scheduling', 'Class Booking', 'Waitlist Management', 'Trainer Allocation']),
      m('Training', ['Personal Training Packages', 'Workout Programmes', 'Progress Tracking']),
      m('Facility', ['Access Control', 'Locker Management', 'Equipment Maintenance', 'Point of Sale']),
    ],
  },
  {
    name: 'Event Management',
    icon: 'Ticket',
    description: 'Event setup, ticketing, attendees, venues and sponsors.',
    modules: [
      m('Event Setup', ['Event Creation', 'Agenda & Sessions', 'Venue & Room Booking', 'Speaker Management']),
      m('Ticketing', ['Ticket Types & Pricing', 'Online Registration', 'Promo Codes', 'Refunds & Transfers']),
      m('On-site', ['Attendee Check-in', 'Badge Printing', 'Session Capacity', 'Live Polls & Q&A']),
      m('Commercial', ['Sponsor Management', 'Exhibitor Booths', 'Event Budget']),
    ],
  },
  {
    name: 'Non-profit & Fundraising',
    icon: 'HeartHandshake',
    description: 'Donors, campaigns, grants, volunteers and programme delivery.',
    modules: [
      m('Donors', ['Donor Management', 'Donation Processing', 'Recurring Giving', 'Tax Receipts']),
      m('Campaigns', ['Campaign Management', 'Peer-to-peer Fundraising', 'Pledge Tracking', 'Donor Communications']),
      m('Grants', ['Grant Application', 'Grant Awards', 'Grant Reporting']),
      m('Programmes', ['Volunteer Management', 'Beneficiary Records', 'Impact Measurement']),
    ],
  },
  {
    name: 'Agriculture & Farm Management',
    icon: 'Sprout',
    description: 'Fields, crops, livestock, inputs and harvest traceability.',
    modules: [
      m('Land & Crops', ['Field Management', 'Crop Planning', 'Planting Records', 'Irrigation Scheduling']),
      m('Inputs', ['Seed & Fertiliser Stock', 'Spray & Treatment Log', 'Input Costing']),
      m('Livestock', ['Animal Registry', 'Health & Vaccination', 'Breeding Records', 'Feed Management']),
      m('Harvest & Sales', ['Harvest Recording', 'Yield Analysis', 'Produce Traceability', 'Buyer Contracts']),
    ],
  },
  {
    name: 'Energy & Utilities',
    icon: 'Zap',
    description: 'Meters, consumption billing, outages and field metering operations.',
    modules: [
      m('Metering', ['Meter Registry', 'Meter Reading', 'Smart Meter Integration', 'Meter Replacement']),
      m('Billing', ['Tariff Management', 'Consumption Billing', 'Payment & Arrears', 'Disconnection & Reconnection']),
      m('Network', ['Outage Management', 'Fault Reporting', 'Planned Maintenance', 'Asset Register']),
      m('Customer', ['Connection Requests', 'Customer Portal', 'Complaints & Disputes']),
    ],
  },
  {
    name: 'Travel & Tourism',
    icon: 'Plane',
    description: 'Itineraries, bookings, suppliers and traveller documentation.',
    modules: [
      m('Packages', ['Tour Package Builder', 'Itinerary Management', 'Pricing & Markup', 'Seasonal Departures']),
      m('Bookings', ['Traveller Booking', 'Flight & Hotel Reservation', 'Amendment & Cancellation', 'Group Bookings']),
      m('Suppliers', ['Supplier Contracts', 'Allotment Management', 'Supplier Payments']),
      m('Operations', ['Traveller Documents', 'Visa & Insurance Tracking', 'Tour Guide Allocation']),
    ],
  },
  {
    name: 'IT Service Management',
    icon: 'LifeBuoy',
    description: 'Service desk, incidents, changes and the configuration database.',
    modules: [
      m('Service Desk', ['Ticket Intake', 'Ticket Assignment', 'SLA & Escalation', 'Knowledge Base']),
      m('Incident & Problem', ['Incident Management', 'Major Incident Handling', 'Problem Management', 'Root Cause Analysis']),
      m('Change & Release', ['Change Request', 'Change Approval Board', 'Release Management', 'Rollback Planning']),
      m('Assets', ['Configuration Items', 'Software Licence Tracking', 'Hardware Lifecycle']),
    ],
  },
  {
    name: 'Asset & Maintenance Management',
    icon: 'Cog',
    description: 'Asset register, preventive maintenance, work orders and spare parts.',
    modules: [
      m('Asset Register', ['Asset Onboarding', 'Asset Hierarchy', 'Asset Depreciation', 'Asset Transfer & Disposal']),
      m('Maintenance', ['Preventive Maintenance Plan', 'Breakdown Maintenance', 'Maintenance Work Orders', 'Downtime Tracking']),
      m('Spares', ['Spare Parts Inventory', 'Parts Reservation', 'Vendor & Purchase']),
      m('Analytics', ['Asset Performance', 'Maintenance Cost Analysis', 'Compliance Inspections']),
    ],
  },
  {
    name: 'Government & Citizen Services',
    icon: 'Landmark',
    description: 'Citizen applications, permits, licences, fees and case handling.',
    modules: [
      m('Citizen Services', ['Citizen Registration', 'Service Request Portal', 'Appointment Booking', 'Grievance Redressal']),
      m('Permits & Licences', ['Permit Application', 'Document Verification', 'Inspection Scheduling', 'Licence Issuance & Renewal']),
      m('Case Handling', ['Case Assignment', 'Case Workflow', 'Interdepartmental Referral', 'Case Closure']),
      m('Revenue', ['Fee Calculation', 'Online Payment', 'Receipts & Refunds']),
    ],
  },
  {
    name: 'Media & Publishing',
    icon: 'Newspaper',
    description: 'Editorial workflow, content publishing, rights and advertising.',
    modules: [
      m('Editorial', ['Story Pitch', 'Editorial Calendar', 'Draft & Review Workflow', 'Fact-checking']),
      m('Publishing', ['Content Publishing', 'Multi-channel Distribution', 'Scheduling & Embargo', 'Content Archive']),
      m('Rights & Assets', ['Media Asset Library', 'Rights & Licensing', 'Contributor Payments']),
      m('Monetisation', ['Advertising Slots', 'Subscriber Paywall', 'Audience Analytics']),
    ],
  },
  {
    name: 'Telecom & ISP',
    icon: 'Signal',
    description: 'Subscriber plans, provisioning, usage rating and network support.',
    modules: [
      m('Subscribers', ['Subscriber Onboarding', 'SIM & Device Management', 'Plan Change', 'Churn & Deactivation']),
      m('Provisioning', ['Service Activation', 'Number Portability', 'Installation Scheduling', 'Equipment Allocation']),
      m('Rating & Billing', ['Usage Rating', 'Bundle & Add-on Management', 'Invoice Generation', 'Payment & Collections']),
      m('Support', ['Fault Ticketing', 'Network Outage Notices', 'Field Engineer Dispatch']),
    ],
  },
  {
    name: 'Retail POS & Loyalty',
    icon: 'Store',
    description: 'In-store selling, cash management, promotions and customer loyalty.',
    modules: [
      m('Point of Sale', ['Sales Transaction', 'Barcode & Scanning', 'Returns & Exchange', 'Offline Mode Sync']),
      m('Cash & Shift', ['Till Opening & Closing', 'Cash Drops', 'Shift Reconciliation', 'Multi-payment Tender']),
      m('Promotions', ['Discount Rules', 'Bundle Offers', 'Coupon Redemption', 'Price Overrides']),
      m('Loyalty', ['Loyalty Enrollment', 'Points Accrual & Redemption', 'Tier Management', 'Customer Insights']),
    ],
  },
]
