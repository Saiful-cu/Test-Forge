// TestForge master library additions — exported 2026-11-03
// 25 feature groups, 112 features, 737 hand-written test cases.
// Merge into src/data/masterLibrary.ts, or restore in the browser with:
//   localStorage.setItem("testforge.masterLibrary.v1", JSON.stringify(MASTER_LIBRARY_ADDITIONS)); location.reload();

export const ADDED_MODULES = [
  {
    "id": "crm__customer-service__tekeh",
    "categoryId": "crm",
    "name": "Customer Service"
  },
  {
    "id": "crm__automation__okxfs",
    "categoryId": "crm",
    "name": "Automation"
  },
  {
    "id": "saas-subscription-management__revenue-analytics__i6ksf",
    "categoryId": "saas-subscription-management",
    "name": "Revenue Analytics"
  },
  {
    "id": "e-commerce__marketing-and-growth__tmaln",
    "categoryId": "e-commerce",
    "name": "Marketing & Growth"
  },
  {
    "id": "erp__sales-and-distribution__pv4ad",
    "categoryId": "erp",
    "name": "Sales & Distribution"
  },
  {
    "id": "hrm__employee-self-service__ndq47",
    "categoryId": "hrm",
    "name": "Employee Self-Service"
  },
  {
    "id": "project-management__portfolio-and-clients__apq3y",
    "categoryId": "project-management",
    "name": "Portfolio & Clients"
  },
  {
    "id": "healthcare-management__emergency-and-telehealth__salk9",
    "categoryId": "healthcare-management",
    "name": "Emergency & Telehealth"
  },
  {
    "id": "learning-management-system__commerce__3bcy2",
    "categoryId": "learning-management-system",
    "name": "Commerce"
  },
  {
    "id": "real-estate-management__owners-and-accounting__dnb0x",
    "categoryId": "real-estate-management",
    "name": "Owners & Accounting"
  },
  {
    "id": "booking-and-reservation__channels__o0s5b",
    "categoryId": "booking-and-reservation",
    "name": "Channels"
  },
  {
    "id": "fintech__cards-and-security__lugnn",
    "categoryId": "fintech",
    "name": "Cards & Security"
  },
  {
    "id": "hospitality-and-hotel-management__food-and-beverage__z8uco",
    "categoryId": "hospitality-and-hotel-management",
    "name": "Food & Beverage"
  },
  {
    "id": "restaurant-and-food-service__customers-and-loyalty__b7tw2",
    "categoryId": "restaurant-and-food-service",
    "name": "Customers & Loyalty"
  },
  {
    "id": "field-service-management__billing__mnskq",
    "categoryId": "field-service-management",
    "name": "Billing"
  },
  {
    "id": "legal-practice-management__client-portal__wmaqj",
    "categoryId": "legal-practice-management",
    "name": "Client Portal"
  },
  {
    "id": "construction-and-contracting__quality-and-handover__poly3",
    "categoryId": "construction-and-contracting",
    "name": "Quality & Handover"
  },
  {
    "id": "fitness-and-wellness__billing__8jzir",
    "categoryId": "fitness-and-wellness",
    "name": "Billing"
  },
  {
    "id": "event-management__virtual-and-hybrid__4flsc",
    "categoryId": "event-management",
    "name": "Virtual & Hybrid"
  },
  {
    "id": "agriculture-and-farm-management__farm-finance-and-labour__bbua3",
    "categoryId": "agriculture-and-farm-management",
    "name": "Farm Finance & Labour"
  },
  {
    "id": "energy-and-utilities__prepaid-and-payments__9ylns",
    "categoryId": "energy-and-utilities",
    "name": "Prepaid & Payments"
  },
  {
    "id": "travel-and-tourism__payments-and-agents__qfkbs",
    "categoryId": "travel-and-tourism",
    "name": "Payments & Agents"
  },
  {
    "id": "it-service-management__self-service__au7h2",
    "categoryId": "it-service-management",
    "name": "Self-Service"
  },
  {
    "id": "government-and-citizen-services__transparency-and-accessibility__5zq80",
    "categoryId": "government-and-citizen-services",
    "name": "Transparency & Accessibility"
  },
  {
    "id": "retail-pos-and-loyalty__store-inventory__ilm75",
    "categoryId": "retail-pos-and-loyalty",
    "name": "Store Inventory"
  }
] as const;

export const ADDED_FEATURES = [
  {
    "id": "crm__contacts-and-accounts__duplicate-detection-and-merge__l738v",
    "categoryId": "crm",
    "moduleId": "crm__contacts-and-accounts",
    "name": "Duplicate Detection & Merge",
    "description": "Detects duplicate leads, contacts and accounts using matching rules and merges them while preserving related records and history."
  },
  {
    "id": "crm__sales-pipeline__products-and-price-books__ny3a0",
    "categoryId": "crm",
    "moduleId": "crm__sales-pipeline",
    "name": "Products & Price Books",
    "description": "Product catalogue with price books, currencies and discounts used as line items on deals and quotations."
  },
  {
    "id": "crm__engagement__email-and-calendar-sync__t7gge",
    "categoryId": "crm",
    "moduleId": "crm__engagement",
    "name": "Email & Calendar Sync",
    "description": "Two-way sync of mailbox and calendar (Google / Microsoft) so emails and meetings are logged against CRM records automatically."
  },
  {
    "id": "crm__customer-service__tekeh__case-management__gcull",
    "categoryId": "crm",
    "moduleId": "crm__customer-service__tekeh",
    "name": "Case Management",
    "description": "Support cases (tickets) raised by customers via email, web form or agent, with status, priority, assignment and resolution linked to the account and contact."
  },
  {
    "id": "crm__customer-service__tekeh__sla-and-escalations__ewebz",
    "categoryId": "crm",
    "moduleId": "crm__customer-service__tekeh",
    "name": "SLA & Escalations",
    "description": "Service-level targets for first response and resolution with business hours, breach warnings and automatic escalation."
  },
  {
    "id": "crm__automation__okxfs__workflow-automation__p62fv",
    "categoryId": "crm",
    "moduleId": "crm__automation__okxfs",
    "name": "Workflow Automation",
    "description": "Rule-based workflows that run actions (field updates, tasks, emails, webhooks) when records are created, updated or meet time-based conditions."
  },
  {
    "id": "crm__automation__okxfs__approval-processes__ovq1b",
    "categoryId": "crm",
    "moduleId": "crm__automation__okxfs",
    "name": "Approval Processes",
    "description": "Multi-step approvals for discounts, quotations and deals with approver routing, approve/reject with comments and record locking."
  },
  {
    "id": "saas-subscription-management__billing__proration-and-credit-notes__czioi",
    "categoryId": "saas-subscription-management",
    "moduleId": "saas-subscription-management__billing",
    "name": "Proration & Credit Notes",
    "description": "Prorated charges and credits when plans, seats or billing dates change mid-cycle, and credit notes for refunds and adjustments."
  },
  {
    "id": "saas-subscription-management__billing__tax-and-vat-calculation__u9uqi",
    "categoryId": "saas-subscription-management",
    "moduleId": "saas-subscription-management__billing",
    "name": "Tax & VAT Calculation",
    "description": "Tax rules by country/region, VAT/GST IDs, reverse charge and tax lines on invoices."
  },
  {
    "id": "saas-subscription-management__subscription-lifecycle__customer-billing-portal__3zwio",
    "categoryId": "saas-subscription-management",
    "moduleId": "saas-subscription-management__subscription-lifecycle",
    "name": "Customer Billing Portal",
    "description": "Self-service portal where customers change plan, update payment method, download invoices and cancel."
  },
  {
    "id": "saas-subscription-management__revenue-analytics__i6ksf__mrr-and-churn-metrics__b5tgl",
    "categoryId": "saas-subscription-management",
    "moduleId": "saas-subscription-management__revenue-analytics__i6ksf",
    "name": "MRR & Churn Metrics",
    "description": "MRR, ARR, new/expansion/contraction/churned MRR, logo churn and LTV reporting."
  },
  {
    "id": "saas-subscription-management__revenue-analytics__i6ksf__revenue-recognition__vrohr",
    "categoryId": "saas-subscription-management",
    "moduleId": "saas-subscription-management__revenue-analytics__i6ksf",
    "name": "Revenue Recognition",
    "description": "Deferred and recognised revenue schedules for annual and multi-period subscriptions."
  },
  {
    "id": "e-commerce__catalog__product-search-and-filters__bw6p1",
    "categoryId": "e-commerce",
    "moduleId": "e-commerce__catalog",
    "name": "Product Search & Filters",
    "description": "Storefront search with typo tolerance, facets (price, brand, size), sorting and no-results handling."
  },
  {
    "id": "e-commerce__catalog__stock-levels-and-reservation__l0a3x",
    "categoryId": "e-commerce",
    "moduleId": "e-commerce__catalog",
    "name": "Stock Levels & Reservation",
    "description": "Per-variant stock, low-stock alerts, reservation during checkout and out-of-stock / backorder rules."
  },
  {
    "id": "e-commerce__payments-and-shipping__cash-on-delivery__q0shp",
    "categoryId": "e-commerce",
    "moduleId": "e-commerce__payments-and-shipping",
    "name": "Cash on Delivery",
    "description": "COD payment option with eligibility rules, COD fee, OTP/phone confirmation and collection reconciliation."
  },
  {
    "id": "e-commerce__marketing-and-growth__tmaln__abandoned-cart-recovery__c7u9n",
    "categoryId": "e-commerce",
    "moduleId": "e-commerce__marketing-and-growth__tmaln",
    "name": "Abandoned Cart Recovery",
    "description": "Detects abandoned carts and sends timed reminder emails/SMS with a restore-cart link."
  },
  {
    "id": "e-commerce__marketing-and-growth__tmaln__promotions-and-flash-sales__gu4jr",
    "categoryId": "e-commerce",
    "moduleId": "e-commerce__marketing-and-growth__tmaln",
    "name": "Promotions & Flash Sales",
    "description": "Scheduled sale prices, BOGO and bundle offers, countdowns and per-customer limits."
  },
  {
    "id": "erp__finance__bank-reconciliation__n0lmx",
    "categoryId": "erp",
    "moduleId": "erp__finance",
    "name": "Bank Reconciliation",
    "description": "Import bank statements and match them to ledger transactions, with rules and unreconciled-item reporting."
  },
  {
    "id": "erp__finance__fixed-assets__k4kd2",
    "categoryId": "erp",
    "moduleId": "erp__finance",
    "name": "Fixed Assets",
    "description": "Asset register, capitalisation, depreciation schedules and disposals posted to the ledger."
  },
  {
    "id": "erp__finance__period-close-and-multi-currency__5967r",
    "categoryId": "erp",
    "moduleId": "erp__finance",
    "name": "Period Close & Multi-Currency",
    "description": "Month/year-end close, period locking, FX revaluation and currency conversion."
  },
  {
    "id": "erp__sales-and-distribution__pv4ad__sales-order__b7682",
    "categoryId": "erp",
    "moduleId": "erp__sales-and-distribution__pv4ad",
    "name": "Sales Order",
    "description": "Order-to-cash: quotation to sales order, credit check, delivery and invoicing."
  },
  {
    "id": "erp__sales-and-distribution__pv4ad__customer-credit-control__w9w7v",
    "categoryId": "erp",
    "moduleId": "erp__sales-and-distribution__pv4ad",
    "name": "Customer Credit Control",
    "description": "Credit limits, credit holds and approvals for customers."
  },
  {
    "id": "hrm__payroll__loans-and-advances__c0gf4",
    "categoryId": "hrm",
    "moduleId": "hrm__payroll",
    "name": "Loans & Advances",
    "description": "Salary advances and employee loans with instalment deductions through payroll."
  },
  {
    "id": "hrm__payroll__expense-claims-and-reimbursement__h1s5f",
    "categoryId": "hrm",
    "moduleId": "hrm__payroll",
    "name": "Expense Claims & Reimbursement",
    "description": "Employees submit expense claims with receipts; approved claims are reimbursed via payroll or payment."
  },
  {
    "id": "hrm__time-and-attendance__overtime-and-holiday-calendar__3t1wj",
    "categoryId": "hrm",
    "moduleId": "hrm__time-and-attendance",
    "name": "Overtime & Holiday Calendar",
    "description": "Overtime rules and rates, public holiday calendars by location and weekend configuration."
  },
  {
    "id": "hrm__employee-self-service__ndq47__employee-self-service-portal__d0moh",
    "categoryId": "hrm",
    "moduleId": "hrm__employee-self-service__ndq47",
    "name": "Employee Self-Service Portal",
    "description": "Employees view payslips, apply leave, update personal details and download letters."
  },
  {
    "id": "hrm__employee-self-service__ndq47__org-chart-and-directory__d2e9a",
    "categoryId": "hrm",
    "moduleId": "hrm__employee-self-service__ndq47",
    "name": "Org Chart & Directory",
    "description": "Searchable employee directory and reporting-line org chart."
  },
  {
    "id": "project-management__planning__task-dependencies__fh9ep",
    "categoryId": "project-management",
    "moduleId": "project-management__planning",
    "name": "Task Dependencies",
    "description": "Finish-to-start and other dependency types, lag, and automatic date shifting with circular-dependency checks."
  },
  {
    "id": "project-management__execution__recurring-tasks-and-templates__as759",
    "categoryId": "project-management",
    "moduleId": "project-management__execution",
    "name": "Recurring Tasks & Templates",
    "description": "Recurring tasks and project/task templates."
  },
  {
    "id": "project-management__portfolio-and-clients__apq3y__portfolio-overview__gki9u",
    "categoryId": "project-management",
    "moduleId": "project-management__portfolio-and-clients__apq3y",
    "name": "Portfolio Overview",
    "description": "Cross-project health, status and RAG reporting."
  },
  {
    "id": "project-management__portfolio-and-clients__apq3y__client-portal-and-guest-access__37vet",
    "categoryId": "project-management",
    "moduleId": "project-management__portfolio-and-clients__apq3y",
    "name": "Client Portal & Guest Access",
    "description": "Limited guest access for clients to view progress, approve deliverables and comment."
  },
  {
    "id": "inventory-management__stock-control__units-of-measure-and-conversion__q2rfi",
    "categoryId": "inventory-management",
    "moduleId": "inventory-management__stock-control",
    "name": "Units of Measure & Conversion",
    "description": "Base and alternate units (box, pack, piece) with conversion factors used in purchasing, stock and sales."
  },
  {
    "id": "inventory-management__stock-control__expiry-and-fefo-management__xtkrh",
    "categoryId": "inventory-management",
    "moduleId": "inventory-management__stock-control",
    "name": "Expiry & FEFO Management",
    "description": "Expiry dates, first-expired-first-out picking, near-expiry alerts and blocking expired stock."
  },
  {
    "id": "inventory-management__outbound__sales-returns-and-rma__obeja",
    "categoryId": "inventory-management",
    "moduleId": "inventory-management__outbound",
    "name": "Sales Returns & RMA",
    "description": "Customer returns with RMA numbers, inspection, restock or scrap decisions."
  },
  {
    "id": "inventory-management__reporting__stock-movement-ledger__a5eqp",
    "categoryId": "inventory-management",
    "moduleId": "inventory-management__reporting",
    "name": "Stock Movement Ledger",
    "description": "Item-wise movement history (in, out, transfer, adjustment) with running balance."
  },
  {
    "id": "healthcare-management__clinical__vitals-and-clinical-charting__3fzvb",
    "categoryId": "healthcare-management",
    "moduleId": "healthcare-management__clinical",
    "name": "Vitals & Clinical Charting",
    "description": "Recording vitals, allergies, diagnoses (ICD codes) and clinical notes per encounter."
  },
  {
    "id": "healthcare-management__emergency-and-telehealth__salk9__emergency-triage__2j7fw",
    "categoryId": "healthcare-management",
    "moduleId": "healthcare-management__emergency-and-telehealth__salk9",
    "name": "Emergency Triage",
    "description": "ER registration with triage level and priority queue."
  },
  {
    "id": "healthcare-management__emergency-and-telehealth__salk9__telemedicine-consultation__bj8pd",
    "categoryId": "healthcare-management",
    "moduleId": "healthcare-management__emergency-and-telehealth__salk9",
    "name": "Telemedicine Consultation",
    "description": "Video consultations with secure links, e-prescription and visit notes."
  },
  {
    "id": "learning-management-system__learner-experience__drip-content-and-prerequisites__s29gp",
    "categoryId": "learning-management-system",
    "moduleId": "learning-management-system__learner-experience",
    "name": "Drip Content & Prerequisites",
    "description": "Release lessons on a schedule or after prerequisites are completed."
  },
  {
    "id": "learning-management-system__learner-experience__mobile-and-offline-learning__ik4gp",
    "categoryId": "learning-management-system",
    "moduleId": "learning-management-system__learner-experience",
    "name": "Mobile & Offline Learning",
    "description": "Mobile-responsive lessons and offline download of content with progress sync."
  },
  {
    "id": "learning-management-system__commerce__3bcy2__course-payments-and-coupons__qx6r7",
    "categoryId": "learning-management-system",
    "moduleId": "learning-management-system__commerce__3bcy2",
    "name": "Course Payments & Coupons",
    "description": "Paid courses, bundles, coupons, refunds and payment gateway checkout."
  },
  {
    "id": "learning-management-system__administration__scorm-xapi-compliance__ppjkk",
    "categoryId": "learning-management-system",
    "moduleId": "learning-management-system__administration",
    "name": "SCORM / xAPI Compliance",
    "description": "Import SCORM 1.2/2004 and xAPI packages and track completion and scores."
  },
  {
    "id": "real-estate-management__leasing__security-deposit-management__l8uo3",
    "categoryId": "real-estate-management",
    "moduleId": "real-estate-management__leasing",
    "name": "Security Deposit Management",
    "description": "Collect, hold and refund security deposits with deductions."
  },
  {
    "id": "real-estate-management__owners-and-accounting__dnb0x__owner-statements-and-payouts__a57dx",
    "categoryId": "real-estate-management",
    "moduleId": "real-estate-management__owners-and-accounting__dnb0x",
    "name": "Owner Statements & Payouts",
    "description": "Owner ledgers, management fees and periodic statements/payouts."
  },
  {
    "id": "real-estate-management__sales__payment-schedule-and-instalments__9h27p",
    "categoryId": "real-estate-management",
    "moduleId": "real-estate-management__sales",
    "name": "Payment Schedule & Instalments",
    "description": "Booking money and instalment plans for property sales with due reminders and penalties."
  },
  {
    "id": "booking-and-reservation__booking-flow__overbooking-prevention__sancy",
    "categoryId": "booking-and-reservation",
    "moduleId": "booking-and-reservation__booking-flow",
    "name": "Overbooking Prevention",
    "description": "Concurrency control and holds so the same slot/room cannot be sold twice."
  },
  {
    "id": "booking-and-reservation__booking-flow__no-show-and-cancellation-policy__ekwt0",
    "categoryId": "booking-and-reservation",
    "moduleId": "booking-and-reservation__booking-flow",
    "name": "No-show & Cancellation Policy",
    "description": "Policy windows, no-show marking and automatic fees."
  },
  {
    "id": "booking-and-reservation__channels__o0s5b__channel-manager-sync__jxc5g",
    "categoryId": "booking-and-reservation",
    "moduleId": "booking-and-reservation__channels__o0s5b",
    "name": "Channel Manager Sync",
    "description": "Two-way availability and rate sync with OTAs/marketplaces (e.g. Booking.com, Airbnb)."
  },
  {
    "id": "booking-and-reservation__channels__o0s5b__group-and-recurring-bookings__ebgfm",
    "categoryId": "booking-and-reservation",
    "moduleId": "booking-and-reservation__channels__o0s5b",
    "name": "Group & Recurring Bookings",
    "description": "Block bookings for groups and recurring weekly/monthly reservations."
  },
  {
    "id": "document-management__storage__storage-quotas__cvard",
    "categoryId": "document-management",
    "moduleId": "document-management__storage",
    "name": "Storage Quotas",
    "description": "Per-user and per-workspace storage limits with usage display."
  },
  {
    "id": "document-management__access-control__document-encryption-and-dlp__vrnv3",
    "categoryId": "document-management",
    "moduleId": "document-management__access-control",
    "name": "Document Encryption & DLP",
    "description": "Encryption at rest, watermarking, download/print restrictions and sensitive-data detection."
  },
  {
    "id": "document-management__workflow__document-templates-and-generation__ruuwh",
    "categoryId": "document-management",
    "moduleId": "document-management__workflow",
    "name": "Document Templates & Generation",
    "description": "Generate documents from templates with merge fields."
  },
  {
    "id": "roofing-management__customers-and-jobs__permit-management__hln1y",
    "categoryId": "roofing-management",
    "moduleId": "roofing-management__customers-and-jobs",
    "name": "Permit Management",
    "description": "Building permits per job: application, fees, status, inspection dates and permit documents."
  },
  {
    "id": "roofing-management__field-operations__crew-time-tracking__owpsn",
    "categoryId": "roofing-management",
    "moduleId": "roofing-management__field-operations",
    "name": "Crew Time Tracking",
    "description": "Crew clock-in/out on job sites with GPS, labour hours per job and payroll export."
  },
  {
    "id": "roofing-management__sales-and-estimation__financing-options__zx2t0",
    "categoryId": "roofing-management",
    "moduleId": "roofing-management__sales-and-estimation",
    "name": "Financing Options",
    "description": "Homeowner financing offers on proposals with lender application status."
  },
  {
    "id": "marketplace__seller-management__seller-subscription-and-fees__s6jax",
    "categoryId": "marketplace",
    "moduleId": "marketplace__seller-management",
    "name": "Seller Subscription & Fees",
    "description": "Seller plans, listing fees and fee invoices."
  },
  {
    "id": "marketplace__transactions__refunds-and-chargebacks__c548v",
    "categoryId": "marketplace",
    "moduleId": "marketplace__transactions",
    "name": "Refunds & Chargebacks",
    "description": "Refunds split between seller and platform, chargeback handling and seller debit."
  },
  {
    "id": "marketplace__listings__inventory-sync-and-bulk-upload__cm6qz",
    "categoryId": "marketplace",
    "moduleId": "marketplace__listings",
    "name": "Inventory Sync & Bulk Upload",
    "description": "Bulk listing via CSV/API and stock sync from seller systems."
  },
  {
    "id": "fintech__payments__bill-payments-and-top-up__2rxfn",
    "categoryId": "fintech",
    "moduleId": "fintech__payments",
    "name": "Bill Payments & Top-up",
    "description": "Utility bill payment, mobile recharge and merchant QR payments."
  },
  {
    "id": "fintech__accounts-and-wallets__transaction-reversal-and-reconciliation__8xd3b",
    "categoryId": "fintech",
    "moduleId": "fintech__accounts-and-wallets",
    "name": "Transaction Reversal & Reconciliation",
    "description": "Reversals, failed-transaction refunds and daily ledger/bank reconciliation."
  },
  {
    "id": "fintech__cards-and-security__lugnn__card-management__6wur2",
    "categoryId": "fintech",
    "moduleId": "fintech__cards-and-security__lugnn",
    "name": "Card Management",
    "description": "Virtual/physical card issuing, freeze/unfreeze, PIN and spending controls."
  },
  {
    "id": "fintech__cards-and-security__lugnn__transaction-pin-and-2fa__rny60",
    "categoryId": "fintech",
    "moduleId": "fintech__cards-and-security__lugnn",
    "name": "Transaction PIN & 2FA",
    "description": "Transaction PIN, OTP/biometric step-up for sensitive actions and device binding."
  },
  {
    "id": "hospitality-and-hotel-management__front-desk__night-audit__8oshr",
    "categoryId": "hospitality-and-hotel-management",
    "moduleId": "hospitality-and-hotel-management__front-desk",
    "name": "Night Audit",
    "description": "End-of-day audit posting room charges, rolling the business date and producing audit reports."
  },
  {
    "id": "hospitality-and-hotel-management__food-and-beverage__z8uco__room-service-and-pos-posting__ey55a",
    "categoryId": "hospitality-and-hotel-management",
    "moduleId": "hospitality-and-hotel-management__food-and-beverage__z8uco",
    "name": "Room Service & POS Posting",
    "description": "Room-service orders and restaurant charges posted to guest folio."
  },
  {
    "id": "hospitality-and-hotel-management__reservations__deposits-and-cancellation-policy__35pmk",
    "categoryId": "hospitality-and-hotel-management",
    "moduleId": "hospitality-and-hotel-management__reservations",
    "name": "Deposits & Cancellation Policy",
    "description": "Booking guarantees, deposits, cancellation and no-show charges."
  },
  {
    "id": "restaurant-and-food-service__service-and-billing__payments-and-vat-receipts__22o8g",
    "categoryId": "restaurant-and-food-service",
    "moduleId": "restaurant-and-food-service__service-and-billing",
    "name": "Payments & VAT Receipts",
    "description": "Cash, card and mobile-wallet payments with VAT receipts and void/refund controls."
  },
  {
    "id": "restaurant-and-food-service__kitchen__inventory-and-purchasing__usbf6",
    "categoryId": "restaurant-and-food-service",
    "moduleId": "restaurant-and-food-service__kitchen",
    "name": "Inventory & Purchasing",
    "description": "Ingredient stock, par levels and supplier purchase orders."
  },
  {
    "id": "restaurant-and-food-service__customers-and-loyalty__b7tw2__table-reservations__hb364",
    "categoryId": "restaurant-and-food-service",
    "moduleId": "restaurant-and-food-service__customers-and-loyalty__b7tw2",
    "name": "Table Reservations",
    "description": "Advance table booking with deposits, reminders and walk-in waitlist."
  },
  {
    "id": "restaurant-and-food-service__customers-and-loyalty__b7tw2__loyalty-and-gift-cards__010mb",
    "categoryId": "restaurant-and-food-service",
    "moduleId": "restaurant-and-food-service__customers-and-loyalty__b7tw2",
    "name": "Loyalty & Gift Cards",
    "description": "Points, rewards and gift-card balances."
  },
  {
    "id": "logistics-and-transportation__shipments__cash-on-delivery-remittance__ri5ts",
    "categoryId": "logistics-and-transportation",
    "moduleId": "logistics-and-transportation__shipments",
    "name": "Cash on Delivery Remittance",
    "description": "COD collection by riders, hub deposit and merchant remittance reconciliation."
  },
  {
    "id": "logistics-and-transportation__shipments__customs-and-documentation__4a5p2",
    "categoryId": "logistics-and-transportation",
    "moduleId": "logistics-and-transportation__shipments",
    "name": "Customs & Documentation",
    "description": "Commercial invoice, airway bill and customs clearance documents for cross-border shipments."
  },
  {
    "id": "logistics-and-transportation__fleet__driver-hours-and-compliance__3lfd8",
    "categoryId": "logistics-and-transportation",
    "moduleId": "logistics-and-transportation__fleet",
    "name": "Driver Hours & Compliance",
    "description": "Driving hours, licence expiry and vehicle document compliance."
  },
  {
    "id": "field-service-management__billing__mnskq__job-invoicing__kjb55",
    "categoryId": "field-service-management",
    "moduleId": "field-service-management__billing__mnskq",
    "name": "Job Invoicing",
    "description": "Invoices from labour, parts and contract terms created on job completion, with on-site payment."
  },
  {
    "id": "field-service-management__billing__mnskq__quotes-and-upsell__qnurj",
    "categoryId": "field-service-management",
    "moduleId": "field-service-management__billing__mnskq",
    "name": "Quotes & Upsell",
    "description": "On-site quotes for additional work approved by the customer in the mobile app."
  },
  {
    "id": "field-service-management__job-execution__offline-mode__p7r1x",
    "categoryId": "field-service-management",
    "moduleId": "field-service-management__job-execution",
    "name": "Offline Mode",
    "description": "Technician app works without connectivity and syncs safely later."
  },
  {
    "id": "insurance-management__policy__premium-collection-and-grace-period__g93hg",
    "categoryId": "insurance-management",
    "moduleId": "insurance-management__policy",
    "name": "Premium Collection & Grace Period",
    "description": "Premium instalments, grace periods, lapse and reinstatement."
  },
  {
    "id": "insurance-management__claims__claim-document-and-survey-management__cbk1f",
    "categoryId": "insurance-management",
    "moduleId": "insurance-management__claims",
    "name": "Claim Document & Survey Management",
    "description": "Surveyor appointment, claim document checklist and survey reports."
  },
  {
    "id": "legal-practice-management__matters__deadlines-and-limitation-periods__6t1sy",
    "categoryId": "legal-practice-management",
    "moduleId": "legal-practice-management__matters",
    "name": "Deadlines & Limitation Periods",
    "description": "Statutory/limitation deadline calculation with escalating reminders."
  },
  {
    "id": "legal-practice-management__client-portal__wmaqj__secure-client-portal__519ms",
    "categoryId": "legal-practice-management",
    "moduleId": "legal-practice-management__client-portal__wmaqj",
    "name": "Secure Client Portal",
    "description": "Clients view matter status, share documents securely and pay invoices."
  },
  {
    "id": "construction-and-contracting__commercial__job-costing-and-budget-control__p3cne",
    "categoryId": "construction-and-contracting",
    "moduleId": "construction-and-contracting__commercial",
    "name": "Job Costing & Budget Control",
    "description": "Budget vs committed vs actual cost per cost code with overrun alerts."
  },
  {
    "id": "construction-and-contracting__quality-and-handover__poly3__inspections-and-quality-checks__uos92",
    "categoryId": "construction-and-contracting",
    "moduleId": "construction-and-contracting__quality-and-handover__poly3",
    "name": "Inspections & Quality Checks",
    "description": "Inspection and test plans, hold points and NCRs."
  },
  {
    "id": "construction-and-contracting__quality-and-handover__poly3__project-handover-and-as-builts__hnkbu",
    "categoryId": "construction-and-contracting",
    "moduleId": "construction-and-contracting__quality-and-handover__poly3",
    "name": "Project Handover & As-builts",
    "description": "Completion certificates, as-built drawings and O&M documentation."
  },
  {
    "id": "automotive-dealership-and-workshop__workshop__workshop-invoicing-and-payment__qm9av",
    "categoryId": "automotive-dealership-and-workshop",
    "moduleId": "automotive-dealership-and-workshop__workshop",
    "name": "Workshop Invoicing & Payment",
    "description": "Final invoice from job card labour and parts, insurance split and payment."
  },
  {
    "id": "automotive-dealership-and-workshop__sales__vehicle-registration-and-delivery__5o0ao",
    "categoryId": "automotive-dealership-and-workshop",
    "moduleId": "automotive-dealership-and-workshop__sales",
    "name": "Vehicle Registration & Delivery",
    "description": "Registration paperwork, PDI checklist and handover to customer."
  },
  {
    "id": "fitness-and-wellness__billing__8jzir__recurring-membership-billing__6u493",
    "categoryId": "fitness-and-wellness",
    "moduleId": "fitness-and-wellness__billing__8jzir",
    "name": "Recurring Membership Billing",
    "description": "Auto-debit of membership fees, failed payments and arrears handling."
  },
  {
    "id": "fitness-and-wellness__membership__referrals-and-guest-passes__u8h3g",
    "categoryId": "fitness-and-wellness",
    "moduleId": "fitness-and-wellness__membership",
    "name": "Referrals & Guest Passes",
    "description": "Day passes, guest visits and member referral rewards."
  },
  {
    "id": "event-management__virtual-and-hybrid__4flsc__live-streaming-and-virtual-sessions__c453m",
    "categoryId": "event-management",
    "moduleId": "event-management__virtual-and-hybrid__4flsc",
    "name": "Live Streaming & Virtual Sessions",
    "description": "Streaming sessions to registered online attendees with access control and recordings."
  },
  {
    "id": "event-management__virtual-and-hybrid__4flsc__networking-and-matchmaking__hm8kd",
    "categoryId": "event-management",
    "moduleId": "event-management__virtual-and-hybrid__4flsc",
    "name": "Networking & Matchmaking",
    "description": "Attendee profiles, meeting requests and 1:1 scheduling."
  },
  {
    "id": "event-management__ticketing__seating-and-allocation__qtkgd",
    "categoryId": "event-management",
    "moduleId": "event-management__ticketing",
    "name": "Seating & Allocation",
    "description": "Reserved seating charts and seat selection."
  },
  {
    "id": "non-profit-and-fundraising__donors__gift-aid-and-matching-gifts__ubbth",
    "categoryId": "non-profit-and-fundraising",
    "moduleId": "non-profit-and-fundraising__donors",
    "name": "Gift Aid & Matching Gifts",
    "description": "Tax-relief claims and corporate matching gift tracking."
  },
  {
    "id": "non-profit-and-fundraising__campaigns__fund-allocation-and-restricted-funds__15ey8",
    "categoryId": "non-profit-and-fundraising",
    "moduleId": "non-profit-and-fundraising__campaigns",
    "name": "Fund Allocation & Restricted Funds",
    "description": "Restricted vs unrestricted funds and allocation of donations to programmes."
  },
  {
    "id": "agriculture-and-farm-management__land-and-crops__weather-and-pest-alerts__mmbrh",
    "categoryId": "agriculture-and-farm-management",
    "moduleId": "agriculture-and-farm-management__land-and-crops",
    "name": "Weather & Pest Alerts",
    "description": "Weather forecasts, pest/disease risk alerts by field and crop stage."
  },
  {
    "id": "agriculture-and-farm-management__farm-finance-and-labour__bbua3__farm-labour-and-payroll__3g419",
    "categoryId": "agriculture-and-farm-management",
    "moduleId": "agriculture-and-farm-management__farm-finance-and-labour__bbua3",
    "name": "Farm Labour & Payroll",
    "description": "Casual and permanent worker attendance, piece-rate and wage payments."
  },
  {
    "id": "agriculture-and-farm-management__farm-finance-and-labour__bbua3__crop-profitability__73zsa",
    "categoryId": "agriculture-and-farm-management",
    "moduleId": "agriculture-and-farm-management__farm-finance-and-labour__bbua3",
    "name": "Crop Profitability",
    "description": "Revenue vs input and labour cost per field/crop/season."
  },
  {
    "id": "energy-and-utilities__prepaid-and-payments__9ylns__prepaid-token-vending__lratj",
    "categoryId": "energy-and-utilities",
    "moduleId": "energy-and-utilities__prepaid-and-payments__9ylns",
    "name": "Prepaid Token Vending",
    "description": "Prepaid meter recharge, token generation and emergency credit."
  },
  {
    "id": "energy-and-utilities__billing__estimated-billing-and-adjustments__8397z",
    "categoryId": "energy-and-utilities",
    "moduleId": "energy-and-utilities__billing",
    "name": "Estimated Billing & Adjustments",
    "description": "Estimated reads, true-up on actual read and bill adjustments."
  },
  {
    "id": "energy-and-utilities__network__theft-and-loss-detection__psfk7",
    "categoryId": "energy-and-utilities",
    "moduleId": "energy-and-utilities__network",
    "name": "Theft & Loss Detection",
    "description": "Non-technical loss analysis and tamper alerts."
  },
  {
    "id": "travel-and-tourism__payments-and-agents__qfkbs__booking-payments-and-instalments__i8n4d",
    "categoryId": "travel-and-tourism",
    "moduleId": "travel-and-tourism__payments-and-agents__qfkbs",
    "name": "Booking Payments & Instalments",
    "description": "Deposits, balance due dates, multi-currency payments and refunds."
  },
  {
    "id": "travel-and-tourism__payments-and-agents__qfkbs__b2b-agent-portal__izh3m",
    "categoryId": "travel-and-tourism",
    "moduleId": "travel-and-tourism__payments-and-agents__qfkbs",
    "name": "B2B Agent Portal",
    "description": "Sub-agent bookings with credit limits and commissions."
  },
  {
    "id": "it-service-management__self-service__au7h2__service-catalogue-and-requests__w6u5h",
    "categoryId": "it-service-management",
    "moduleId": "it-service-management__self-service__au7h2",
    "name": "Service Catalogue & Requests",
    "description": "Catalogue of request items with forms, approvals and fulfilment tasks."
  },
  {
    "id": "it-service-management__self-service__au7h2__customer-satisfaction-surveys__znna5",
    "categoryId": "it-service-management",
    "moduleId": "it-service-management__self-service__au7h2",
    "name": "Customer Satisfaction Surveys",
    "description": "CSAT surveys on ticket resolution."
  },
  {
    "id": "asset-and-maintenance-management__maintenance__condition-monitoring-and-meter-based-pm__8ackr",
    "categoryId": "asset-and-maintenance-management",
    "moduleId": "asset-and-maintenance-management__maintenance",
    "name": "Condition Monitoring & Meter-based PM",
    "description": "Runtime/meter readings and IoT condition thresholds that trigger maintenance."
  },
  {
    "id": "asset-and-maintenance-management__asset-register__asset-tagging-and-barcode-qr-audit__8k4lm",
    "categoryId": "asset-and-maintenance-management",
    "moduleId": "asset-and-maintenance-management__asset-register",
    "name": "Asset Tagging & Barcode/QR Audit",
    "description": "Asset tags and physical verification audits with mobile scanning."
  },
  {
    "id": "government-and-citizen-services__transparency-and-accessibility__5zq80__application-status-tracking__103c5",
    "categoryId": "government-and-citizen-services",
    "moduleId": "government-and-citizen-services__transparency-and-accessibility__5zq80",
    "name": "Application Status Tracking",
    "description": "Public tracking of application status by reference number with SMS updates."
  },
  {
    "id": "government-and-citizen-services__transparency-and-accessibility__5zq80__accessibility-and-multilingual-support__nf5n4",
    "categoryId": "government-and-citizen-services",
    "moduleId": "government-and-citizen-services__transparency-and-accessibility__5zq80",
    "name": "Accessibility & Multilingual Support",
    "description": "WCAG-compliant UI and multiple languages (e.g. Bangla/English)."
  },
  {
    "id": "media-and-publishing__publishing__seo-and-metadata__l07p5",
    "categoryId": "media-and-publishing",
    "moduleId": "media-and-publishing__publishing",
    "name": "SEO & Metadata",
    "description": "SEO titles, slugs, canonical URLs, structured data and social cards."
  },
  {
    "id": "media-and-publishing__monetisation__comments-and-community-moderation__skjih",
    "categoryId": "media-and-publishing",
    "moduleId": "media-and-publishing__monetisation",
    "name": "Comments & Community Moderation",
    "description": "Reader comments with moderation, spam filtering and reporting."
  },
  {
    "id": "telecom-and-isp__rating-and-billing__prepaid-balance-and-recharge__0ubb7",
    "categoryId": "telecom-and-isp",
    "moduleId": "telecom-and-isp__rating-and-billing",
    "name": "Prepaid Balance & Recharge",
    "description": "Prepaid balance, recharge, validity and low-balance notifications."
  },
  {
    "id": "telecom-and-isp__subscribers__fair-usage-and-speed-throttling__0m8nu",
    "categoryId": "telecom-and-isp",
    "moduleId": "telecom-and-isp__subscribers",
    "name": "Fair Usage & Speed Throttling",
    "description": "FUP data caps and speed throttling after quota."
  },
  {
    "id": "retail-pos-and-loyalty__store-inventory__ilm75__store-stock-and-receiving__wff0x",
    "categoryId": "retail-pos-and-loyalty",
    "moduleId": "retail-pos-and-loyalty__store-inventory__ilm75",
    "name": "Store Stock & Receiving",
    "description": "Store-level stock, receiving deliveries and inter-store transfers."
  },
  {
    "id": "retail-pos-and-loyalty__point-of-sale__receipts-and-fiscal-compliance__n9ot8",
    "categoryId": "retail-pos-and-loyalty",
    "moduleId": "retail-pos-and-loyalty__point-of-sale",
    "name": "Receipts & Fiscal Compliance",
    "description": "Printed/e-receipts with VAT, sequential numbering and fiscal device integration."
  },
  {
    "id": "retail-pos-and-loyalty__point-of-sale__gift-cards-and-store-credit__bm8nw",
    "categoryId": "retail-pos-and-loyalty",
    "moduleId": "retail-pos-and-loyalty__point-of-sale",
    "name": "Gift Cards & Store Credit",
    "description": "Gift card sale, balance, redemption and store credit from returns."
  }
] as const;

export const ADDED_TEST_CASES = [
  {
    "title": "Capture a lead from a public web form",
    "description": "A submission on the embedded web-to-lead form creates a lead record.",
    "preconditions": "A web form is published and mapped to lead fields.",
    "steps": [
      "Open the page hosting the web form.",
      "Fill all mapped fields and submit.",
      "Open Leads in the CRM and search for the new lead."
    ],
    "expectedResult": "A new lead is created with every mapped field populated, Lead Source = Web Form and the form name recorded.",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CRM-LECA-024",
    "featureId": "crm__lead-management__lead-capture"
  },
  {
    "title": "Record lead source and UTM campaign data",
    "description": "Source, medium and campaign parameters are stored on captured leads.",
    "preconditions": "Web form accepts UTM parameters.",
    "steps": [
      "Open the form URL with utm_source, utm_medium and utm_campaign set.",
      "Submit the form.",
      "Open the created lead."
    ],
    "expectedResult": "Lead Source, medium and campaign fields match the URL parameters exactly.",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-LECA-025",
    "featureId": "crm__lead-management__lead-capture"
  },
  {
    "title": "Block spam submissions on the web form",
    "description": "Bots and repeated junk submissions are not turned into leads.",
    "preconditions": "Spam protection (honeypot / rate limit) is enabled.",
    "steps": [
      "Submit the form with the hidden honeypot field filled.",
      "Submit the same form 20 times within a minute from one IP."
    ],
    "expectedResult": "Honeypot submissions are discarded and rate-limited requests are rejected; no junk leads are created.",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-LECA-026",
    "featureId": "crm__lead-management__lead-capture"
  },
  {
    "title": "Capture a lead from an inbound email",
    "description": "Emails sent to the lead-capture mailbox create leads.",
    "preconditions": "Email-to-lead address is configured.",
    "steps": [
      "Send an email from a new address to the capture mailbox.",
      "Wait for the mailbox poll interval.",
      "Search Leads for the sender address."
    ],
    "expectedResult": "A lead is created with name and email parsed from the sender and the email body attached to its timeline.",
    "testType": "Integration",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-LECA-027",
    "featureId": "crm__lead-management__lead-capture"
  },
  {
    "title": "Flag a captured lead that matches an existing contact",
    "description": "Capturing a lead whose email already exists warns about the duplicate.",
    "preconditions": "A contact with email jane@example.com exists.",
    "steps": [
      "Create a lead with email jane@example.com.",
      "Save the lead."
    ],
    "expectedResult": "The user is warned of the possible duplicate with a link to the existing record, and the duplicate rule (block/allow) is applied.",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-LECA-028",
    "featureId": "crm__lead-management__lead-capture"
  },
  {
    "title": "Default lead status and owner on capture",
    "description": "New leads get the configured default status and owner.",
    "preconditions": "Default status = New and a default owner are configured.",
    "steps": [
      "Capture a lead via web form without status or owner.",
      "Open the lead."
    ],
    "expectedResult": "Status is New and owner is the default owner (or the assignment-rule result).",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-LECA-029",
    "featureId": "crm__lead-management__lead-capture"
  },
  {
    "title": "Assign leads round-robin across a sales team",
    "description": "Incoming leads are distributed evenly across active team members.",
    "preconditions": "A round-robin rule with 3 active reps exists.",
    "steps": [
      "Create 6 leads that match the rule.",
      "Check the owner of each lead."
    ],
    "expectedResult": "Each rep receives 2 leads in rotation order.",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CRM-LEAS-023",
    "featureId": "crm__lead-management__lead-assignment"
  },
  {
    "title": "Assign leads by territory or region rule",
    "description": "Leads are routed by country/region field.",
    "preconditions": "Rule: Country = Bangladesh → Dhaka team.",
    "steps": [
      "Create a lead with Country = Bangladesh.",
      "Create a lead with Country = USA."
    ],
    "expectedResult": "The first lead goes to the Dhaka team; the second falls through to the next rule or the default owner.",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-CRM-LEAS-024",
    "featureId": "crm__lead-management__lead-assignment"
  },
  {
    "title": "Skip inactive or on-leave users in assignment",
    "description": "Deactivated or unavailable reps do not receive leads.",
    "preconditions": "One rep in the rotation is deactivated.",
    "steps": [
      "Create several leads matching the rule."
    ],
    "expectedResult": "No lead is assigned to the deactivated rep; rotation continues with the remaining reps.",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-LEAS-025",
    "featureId": "crm__lead-management__lead-assignment"
  },
  {
    "title": "Manually reassign a lead and notify the new owner",
    "description": "A manager can change a lead owner and the new owner is told.",
    "preconditions": "User is a sales manager.",
    "steps": [
      "Open a lead and change the owner.",
      "Save.",
      "Sign in as the new owner."
    ],
    "expectedResult": "Owner is updated, the change appears in the timeline/audit log, and the new owner receives a notification.",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-LEAS-026",
    "featureId": "crm__lead-management__lead-assignment"
  },
  {
    "title": "Fallback to default owner when no rule matches",
    "description": "Leads matching no assignment rule still get an owner.",
    "preconditions": "Default owner configured.",
    "steps": [
      "Create a lead that matches no rule."
    ],
    "expectedResult": "The lead is assigned to the default owner or queue, never left unassigned.",
    "testType": "Boundary",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-LEAS-027",
    "featureId": "crm__lead-management__lead-assignment"
  },
  {
    "title": "Rep cannot reassign leads they do not own",
    "description": "Standard users cannot take or give away other users leads.",
    "preconditions": "Signed in as standard rep.",
    "steps": [
      "Open a lead owned by another rep.",
      "Try to change the owner via UI and API."
    ],
    "expectedResult": "The owner field is read-only and the API returns 403.",
    "testType": "Permission",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-LEAS-028",
    "featureId": "crm__lead-management__lead-assignment"
  },
  {
    "title": "Calculate score from demographic rules",
    "description": "Profile attributes add the configured points.",
    "preconditions": "Rules: Job title contains Director +20, Industry = Finance +10.",
    "steps": [
      "Create a lead with title Finance Director, industry Finance."
    ],
    "expectedResult": "Lead score = 30 and the score breakdown shows both rules.",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CRM-LESC-023",
    "featureId": "crm__lead-management__lead-scoring"
  },
  {
    "title": "Add points for engagement activities",
    "description": "Email opens, link clicks and page visits increase the score.",
    "preconditions": "Rules: email open +5, click +10.",
    "steps": [
      "Send a campaign email to the lead.",
      "Open it and click a link."
    ],
    "expectedResult": "Score increases by 15 and the activities are listed in the score history.",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-CRM-LESC-024",
    "featureId": "crm__lead-management__lead-scoring"
  },
  {
    "title": "Subtract points and apply score decay",
    "description": "Negative rules and inactivity decay reduce the score.",
    "preconditions": "Rule: unsubscribe -20; decay -10 after 30 days of inactivity.",
    "steps": [
      "Unsubscribe the lead.",
      "Advance time 30 days with no activity (or run the decay job)."
    ],
    "expectedResult": "Score drops by 20 then 10, and never goes below the configured minimum (e.g. 0).",
    "testType": "Boundary",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-LESC-025",
    "featureId": "crm__lead-management__lead-scoring"
  },
  {
    "title": "Recalculate scores after a rule change",
    "description": "Editing a rule updates existing lead scores.",
    "preconditions": "Leads have scores from the current rules.",
    "steps": [
      "Change Industry = Finance from +10 to +25.",
      "Run or wait for recalculation."
    ],
    "expectedResult": "Affected leads are rescored correctly; unaffected leads are unchanged.",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-LESC-026",
    "featureId": "crm__lead-management__lead-scoring"
  },
  {
    "title": "Mark lead as hot / MQL at threshold",
    "description": "Crossing the threshold changes grade and notifies the owner.",
    "preconditions": "MQL threshold = 50.",
    "steps": [
      "Raise a lead score from 45 to 55."
    ],
    "expectedResult": "Lead grade changes to MQL/Hot, owner is notified and the lead shows in the Hot leads view.",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-LESC-027",
    "featureId": "crm__lead-management__lead-scoring"
  },
  {
    "title": "Prevent manual edit of system score",
    "description": "Only permitted roles can override a score.",
    "preconditions": "Signed in as standard rep.",
    "steps": [
      "Try to edit the score field on a lead."
    ],
    "expectedResult": "Field is read-only for the rep; an admin override is logged with reason in the audit log.",
    "testType": "Permission",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-LESC-028",
    "featureId": "crm__lead-management__lead-scoring"
  },
  {
    "title": "Convert a qualified lead to contact, account and deal",
    "description": "Conversion creates the three linked records.",
    "preconditions": "A qualified lead with company name exists.",
    "steps": [
      "Open the lead and click Convert.",
      "Choose to create account, contact and deal.",
      "Confirm."
    ],
    "expectedResult": "Account, contact and deal are created and linked; the lead is marked Converted and read-only.",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CRM-LECO-021",
    "featureId": "crm__lead-management__lead-conversion"
  },
  {
    "title": "Convert a lead into an existing account",
    "description": "The user can attach the converted contact to an existing account.",
    "preconditions": "Account Acme Ltd exists.",
    "steps": [
      "Convert a lead from Acme Ltd.",
      "Select existing account Acme Ltd."
    ],
    "expectedResult": "No duplicate account is created; the new contact and deal are linked to Acme Ltd.",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-CRM-LECO-022",
    "featureId": "crm__lead-management__lead-conversion"
  },
  {
    "title": "Carry mapped lead fields to converted records",
    "description": "Custom and standard fields map to contact/account/deal.",
    "preconditions": "Lead field mapping configured incl. custom fields.",
    "steps": [
      "Fill all mapped fields on a lead.",
      "Convert it."
    ],
    "expectedResult": "Every mapped value appears on the target record; unmapped fields are not lost (kept on converted lead).",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-LECO-023",
    "featureId": "crm__lead-management__lead-conversion"
  },
  {
    "title": "Move activities, notes and attachments on conversion",
    "description": "Lead history follows the contact.",
    "preconditions": "Lead has tasks, notes and files.",
    "steps": [
      "Convert the lead.",
      "Open the new contact timeline."
    ],
    "expectedResult": "All activities, notes and attachments appear on the contact (and deal where configured).",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-LECO-024",
    "featureId": "crm__lead-management__lead-conversion"
  },
  {
    "title": "Block conversion of a disqualified lead",
    "description": "Leads with status Disqualified/Junk cannot be converted.",
    "preconditions": "Lead status = Disqualified.",
    "steps": [
      "Try to convert the lead."
    ],
    "expectedResult": "Convert is disabled or rejected with a clear message.",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-LECO-025",
    "featureId": "crm__lead-management__lead-conversion"
  },
  {
    "title": "Prevent double conversion",
    "description": "A lead can only be converted once.",
    "preconditions": "Lead already converted.",
    "steps": [
      "Open the converted lead.",
      "Try Convert again via UI and API."
    ],
    "expectedResult": "Action is unavailable / rejected; no duplicate records are created.",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-LECO-026",
    "featureId": "crm__lead-management__lead-conversion"
  },
  {
    "title": "Report lead-to-deal conversion rate",
    "description": "Converted leads are counted in conversion metrics.",
    "preconditions": "Some leads converted this month.",
    "steps": [
      "Open the lead conversion report for this month."
    ],
    "expectedResult": "Converted count and rate match the number of leads converted in the period.",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-LECO-027",
    "featureId": "crm__lead-management__lead-conversion"
  },
  {
    "title": "Link a contact to an account and role",
    "description": "Contacts are associated with an account and a job role.",
    "preconditions": "Account exists.",
    "steps": [
      "Create a contact and select the account.",
      "Set role = Decision Maker."
    ],
    "expectedResult": "Contact appears under the account contacts list with the role shown.",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CRM-COMA-020",
    "featureId": "crm__contacts-and-accounts__contact-management"
  },
  {
    "title": "Store multiple emails and phone numbers",
    "description": "A contact can hold several labelled emails/phones with one primary.",
    "preconditions": "",
    "steps": [
      "Add work and personal email and two phone numbers.",
      "Mark one of each as primary."
    ],
    "expectedResult": "All values are saved; primary values are used in lists, emails and calls.",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-COMA-021",
    "featureId": "crm__contacts-and-accounts__contact-management"
  },
  {
    "title": "Validate email and phone formats on contacts",
    "description": "Invalid formats are rejected.",
    "preconditions": "",
    "steps": [
      "Enter email \"jane@\" and phone \"abc\".",
      "Save."
    ],
    "expectedResult": "Save is blocked with field-level messages; valid international numbers (e.g. +8801…) are accepted.",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-COMA-022",
    "featureId": "crm__contacts-and-accounts__contact-management"
  },
  {
    "title": "Respect email opt-out and do-not-call flags",
    "description": "Opted-out contacts are excluded from campaigns and calls.",
    "preconditions": "Contact has Email Opt-Out and Do Not Call set.",
    "steps": [
      "Add the contact to a campaign list.",
      "Try to click-to-call."
    ],
    "expectedResult": "Contact is excluded from sends with reason shown; the call action is blocked or warned.",
    "testType": "Integration",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CRM-COMA-023",
    "featureId": "crm__contacts-and-accounts__contact-management"
  },
  {
    "title": "Show contact 360 view",
    "description": "The contact page shows related deals, cases, activities and emails.",
    "preconditions": "Contact has deals, activities and emails.",
    "steps": [
      "Open the contact."
    ],
    "expectedResult": "Related lists show correct counts and newest-first items, each linking to the record.",
    "testType": "Usability",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-COMA-024",
    "featureId": "crm__contacts-and-accounts__contact-management"
  },
  {
    "title": "Erase contact personal data on request (GDPR)",
    "description": "An admin can anonymise a contact.",
    "preconditions": "Signed in as admin.",
    "steps": [
      "Run Erase personal data on a contact."
    ],
    "expectedResult": "Personal fields are anonymised, the action is audit-logged and related deal totals stay intact.",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-COMA-025",
    "featureId": "crm__contacts-and-accounts__contact-management"
  },
  {
    "title": "Build a parent-child account hierarchy",
    "description": "Accounts can have a parent account.",
    "preconditions": "Two accounts exist.",
    "steps": [
      "Set Account B parent = Account A.",
      "Open Account A."
    ],
    "expectedResult": "Account B shows under A child accounts and the hierarchy view renders both.",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-CRM-ACMA-024",
    "featureId": "crm__contacts-and-accounts__account-management"
  },
  {
    "title": "Prevent circular account hierarchy",
    "description": "An account cannot be its own ancestor.",
    "preconditions": "A is parent of B.",
    "steps": [
      "Set A parent = B."
    ],
    "expectedResult": "Save is rejected with a clear message.",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-ACMA-025",
    "featureId": "crm__contacts-and-accounts__account-management"
  },
  {
    "title": "Roll up open deal value to the account",
    "description": "Account shows total open pipeline from its deals.",
    "preconditions": "Account has 2 open deals (1000, 2500) and one Lost.",
    "steps": [
      "Open the account."
    ],
    "expectedResult": "Open pipeline = 3500; lost deal is excluded.",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-ACMA-026",
    "featureId": "crm__contacts-and-accounts__account-management"
  },
  {
    "title": "Change account owner and cascade to related records",
    "description": "Reassigning an account optionally moves its contacts and open deals.",
    "preconditions": "",
    "steps": [
      "Change account owner and tick \"also transfer open deals and contacts\"."
    ],
    "expectedResult": "Owner changes on the account, its contacts and open deals; closed deals keep their owner.",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-ACMA-027",
    "featureId": "crm__contacts-and-accounts__account-management"
  },
  {
    "title": "Map CSV columns to contact fields on import",
    "description": "Users map file columns before import.",
    "preconditions": "CSV with headers First, Last, E-mail, Company.",
    "steps": [
      "Upload the CSV.",
      "Map columns to fields.",
      "Run import."
    ],
    "expectedResult": "Contacts are created with values in the mapped fields; the mapping can be saved as a template.",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CRM-COIMEX-023",
    "featureId": "crm__contacts-and-accounts__contact-import-and-export"
  },
  {
    "title": "Handle duplicates during import",
    "description": "Import offers skip / update / create for duplicates.",
    "preconditions": "CSV contains an email that already exists.",
    "steps": [
      "Import with \"Update existing\" selected."
    ],
    "expectedResult": "Existing contact is updated, not duplicated; the summary shows counts of created, updated and skipped rows.",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-CRM-COIMEX-024",
    "featureId": "crm__contacts-and-accounts__contact-import-and-export"
  },
  {
    "title": "Report row-level errors on partial import",
    "description": "Invalid rows are skipped and reported.",
    "preconditions": "CSV with 10 rows, 2 with invalid emails.",
    "steps": [
      "Import the file."
    ],
    "expectedResult": "8 contacts are imported and a downloadable error file lists the 2 failed rows with reasons.",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-COIMEX-025",
    "featureId": "crm__contacts-and-accounts__contact-import-and-export"
  },
  {
    "title": "Export only filtered contacts with visible fields",
    "description": "Export respects current filters and the user field permissions.",
    "preconditions": "User lacks access to a restricted field.",
    "steps": [
      "Filter contacts by owner = me.",
      "Export to CSV."
    ],
    "expectedResult": "File contains only filtered rows and excludes restricted fields.",
    "testType": "Permission",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-COIMEX-026",
    "featureId": "crm__contacts-and-accounts__contact-import-and-export"
  },
  {
    "title": "Create a deal linked to account and contact",
    "description": "A deal stores amount, close date, stage and links.",
    "preconditions": "Account and contact exist.",
    "steps": [
      "Create a deal with amount, expected close date, stage and links.",
      "Save."
    ],
    "expectedResult": "Deal appears in the pipeline under the chosen stage and on the account and contact.",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CRM-DEMA-022",
    "featureId": "crm__sales-pipeline__deal-management"
  },
  {
    "title": "Mark a deal as Won",
    "description": "Winning a deal closes it and records the result.",
    "preconditions": "Open deal exists.",
    "steps": [
      "Move the deal to Closed Won."
    ],
    "expectedResult": "Status = Won, actual close date = today, probability 100%, and the won amount appears in revenue reports.",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CRM-DEMA-023",
    "featureId": "crm__sales-pipeline__deal-management"
  },
  {
    "title": "Mark a deal as Lost with a reason",
    "description": "Lost deals require a loss reason.",
    "preconditions": "Open deal exists.",
    "steps": [
      "Move the deal to Closed Lost without a reason.",
      "Add a reason and save."
    ],
    "expectedResult": "Save is blocked until a reason is chosen; the deal is then excluded from open pipeline.",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-DEMA-024",
    "featureId": "crm__sales-pipeline__deal-management"
  },
  {
    "title": "Update probability from stage",
    "description": "Stage changes set the default probability.",
    "preconditions": "Stages have probabilities (Proposal 50%).",
    "steps": [
      "Move a deal to Proposal."
    ],
    "expectedResult": "Probability becomes 50% and weighted amount = amount x 50%.",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-DEMA-025",
    "featureId": "crm__sales-pipeline__deal-management"
  },
  {
    "title": "Reject past close date on open deals",
    "description": "Expected close date cannot be in the past for open deals.",
    "preconditions": "",
    "steps": [
      "Set expected close date to yesterday on an open deal."
    ],
    "expectedResult": "Validation message shown (or warning per config); the value is not saved.",
    "testType": "Boundary",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-DEMA-026",
    "featureId": "crm__sales-pipeline__deal-management"
  },
  {
    "title": "Add product line items to a deal",
    "description": "Deal amount is calculated from products.",
    "preconditions": "Products with price book exist.",
    "steps": [
      "Add 2 products with quantity and discount."
    ],
    "expectedResult": "Line totals and deal amount are calculated correctly incl. discount and tax.",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-DEMA-027",
    "featureId": "crm__sales-pipeline__deal-management"
  },
  {
    "title": "Reopen a closed deal",
    "description": "Only authorised users can reopen Won/Lost deals.",
    "preconditions": "Deal is Won.",
    "steps": [
      "Reopen as rep, then as manager."
    ],
    "expectedResult": "Rep is blocked; manager can reopen and the change is audit-logged and removed from won revenue.",
    "testType": "Permission",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-DEMA-028",
    "featureId": "crm__sales-pipeline__deal-management"
  },
  {
    "title": "Detect duplicates using matching rules",
    "description": "Records matching on email, phone or fuzzy name+company are flagged.",
    "preconditions": "Matching rule: exact email OR fuzzy name + company.",
    "steps": [
      "Create \"Jon Smith, Acme\" when \"John Smith, Acme\" exists."
    ],
    "expectedResult": "A possible-duplicate warning is shown with the match score and a link to the existing record.",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CRM-DUDEME-018",
    "featureId": "crm__contacts-and-accounts__duplicate-detection-and-merge__l738v"
  },
  {
    "title": "Merge two contacts and pick surviving values",
    "description": "Users choose the master record and field values.",
    "preconditions": "Two duplicate contacts exist.",
    "steps": [
      "Select both and click Merge.",
      "Pick values per field.",
      "Confirm."
    ],
    "expectedResult": "One contact remains with the chosen values; the other is removed/archived.",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CRM-DUDEME-019",
    "featureId": "crm__contacts-and-accounts__duplicate-detection-and-merge__l738v"
  },
  {
    "title": "Keep related records after merge",
    "description": "Deals, activities, notes and files move to the surviving record.",
    "preconditions": "Both duplicates have activities and deals.",
    "steps": [
      "Merge the duplicates."
    ],
    "expectedResult": "All related records are on the surviving contact; nothing is orphaned.",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-CRM-DUDEME-020",
    "featureId": "crm__contacts-and-accounts__duplicate-detection-and-merge__l738v"
  },
  {
    "title": "Merge accounts with child contacts and deals",
    "description": "Account merge moves contacts and deals.",
    "preconditions": "Two duplicate accounts with contacts.",
    "steps": [
      "Merge the accounts."
    ],
    "expectedResult": "All contacts and deals are under the surviving account; hierarchy is kept.",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-DUDEME-021",
    "featureId": "crm__contacts-and-accounts__duplicate-detection-and-merge__l738v"
  },
  {
    "title": "Restrict merge to authorised roles",
    "description": "Only permitted users can merge.",
    "preconditions": "Signed in as standard rep.",
    "steps": [
      "Try to merge two contacts."
    ],
    "expectedResult": "Merge is unavailable or rejected with 403.",
    "testType": "Permission",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-DUDEME-022",
    "featureId": "crm__contacts-and-accounts__duplicate-detection-and-merge__l738v"
  },
  {
    "title": "Audit and log merged records",
    "description": "Merges are traceable.",
    "preconditions": "",
    "steps": [
      "Merge two records.",
      "Open the audit log."
    ],
    "expectedResult": "Entry shows who merged, when, both record IDs and the field values chosen.",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-DUDEME-023",
    "featureId": "crm__contacts-and-accounts__duplicate-detection-and-merge__l738v"
  },
  {
    "title": "Create a product with SKU and unit price",
    "description": "Products are added to the catalogue.",
    "preconditions": "",
    "steps": [
      "Create a product with name, SKU, unit price and tax."
    ],
    "expectedResult": "Product is saved and selectable on deals and quotations.",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CRM-PRPRBO-025",
    "featureId": "crm__sales-pipeline__products-and-price-books__ny3a0"
  },
  {
    "title": "Enforce unique SKU",
    "description": "Two active products cannot share a SKU.",
    "preconditions": "Product SKU-100 exists.",
    "steps": [
      "Create another product with SKU-100."
    ],
    "expectedResult": "Save is blocked with a duplicate SKU message.",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-PRPRBO-026",
    "featureId": "crm__sales-pipeline__products-and-price-books__ny3a0"
  },
  {
    "title": "Use price book pricing on a deal",
    "description": "Deal line items use the price from the selected price book.",
    "preconditions": "Wholesale price book with a lower price.",
    "steps": [
      "Set the deal price book = Wholesale.",
      "Add the product."
    ],
    "expectedResult": "Line item uses the wholesale price, not the standard price.",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-CRM-PRPRBO-027",
    "featureId": "crm__sales-pipeline__products-and-price-books__ny3a0"
  },
  {
    "title": "Apply discount limits per role",
    "description": "Discounts above the allowed % need approval or are blocked.",
    "preconditions": "Rep max discount = 10%.",
    "steps": [
      "Apply 15% discount as a rep."
    ],
    "expectedResult": "The rep is blocked or the deal is sent for approval.",
    "testType": "Permission",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-PRPRBO-028",
    "featureId": "crm__sales-pipeline__products-and-price-books__ny3a0"
  },
  {
    "title": "Handle multiple currencies",
    "description": "Prices in different currencies convert correctly.",
    "preconditions": "Price book in USD and BDT, exchange rate set.",
    "steps": [
      "Create a BDT deal with a USD product."
    ],
    "expectedResult": "Amount is converted at the configured rate and the rate used is stored.",
    "testType": "Boundary",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-PRPRBO-029",
    "featureId": "crm__sales-pipeline__products-and-price-books__ny3a0"
  },
  {
    "title": "Deactivate a product used on open deals",
    "description": "Inactive products cannot be added but existing lines stay.",
    "preconditions": "Product used on an open deal.",
    "steps": [
      "Deactivate the product.",
      "Try adding it to a new deal."
    ],
    "expectedResult": "Existing deal lines remain; product is not offered for new lines.",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-PRPRBO-030",
    "featureId": "crm__sales-pipeline__products-and-price-books__ny3a0"
  },
  {
    "title": "Connect a Google or Microsoft mailbox via OAuth",
    "description": "Users connect their mailbox securely.",
    "preconditions": "",
    "steps": [
      "Go to Settings > Email sync.",
      "Connect with Google/Microsoft and grant access."
    ],
    "expectedResult": "Mailbox shows Connected; no password is stored in the CRM.",
    "testType": "Integration",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CRM-EMCASY-021",
    "featureId": "crm__engagement__email-and-calendar-sync__t7gge"
  },
  {
    "title": "Log emails to matching contacts automatically",
    "description": "Synced emails attach to contacts/deals by address.",
    "preconditions": "Mailbox connected; contact jane@example.com exists.",
    "steps": [
      "Exchange emails with jane@example.com."
    ],
    "expectedResult": "Emails appear on the contact timeline within the sync interval; emails to unknown addresses are not logged (per setting).",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-CRM-EMCASY-022",
    "featureId": "crm__engagement__email-and-calendar-sync__t7gge"
  },
  {
    "title": "Send an email from the CRM and track opens",
    "description": "Emails sent from a record use the connected mailbox.",
    "preconditions": "",
    "steps": [
      "Send an email from a contact.",
      "Open it as the recipient."
    ],
    "expectedResult": "Email appears in the user Sent folder and CRM records the open.",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-EMCASY-023",
    "featureId": "crm__engagement__email-and-calendar-sync__t7gge"
  },
  {
    "title": "Two-way sync of meetings",
    "description": "Meetings created in CRM or calendar appear in both.",
    "preconditions": "Calendar connected.",
    "steps": [
      "Create a meeting in the CRM.",
      "Create another in Google/Outlook with a contact invited."
    ],
    "expectedResult": "Both meetings exist in both places and are linked to the contact.",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-EMCASY-024",
    "featureId": "crm__engagement__email-and-calendar-sync__t7gge"
  },
  {
    "title": "Exclude private / personal emails from sync",
    "description": "Users can mark domains or labels as private.",
    "preconditions": "Private domain list configured.",
    "steps": [
      "Send an email to a private domain address."
    ],
    "expectedResult": "The email is not synced to the CRM.",
    "testType": "Security",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-EMCASY-025",
    "featureId": "crm__engagement__email-and-calendar-sync__t7gge"
  },
  {
    "title": "Handle revoked token or disconnected mailbox",
    "description": "Sync failure is surfaced, not silent.",
    "preconditions": "Revoke CRM access from the Google account.",
    "steps": [
      "Wait for next sync."
    ],
    "expectedResult": "User sees a reconnect warning and no data is lost or duplicated after reconnecting.",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-EMCASY-026",
    "featureId": "crm__engagement__email-and-calendar-sync__t7gge"
  },
  {
    "title": "Create a case from an inbound support email",
    "description": "Email-to-case creates a ticket linked to the contact.",
    "preconditions": "Support mailbox configured.",
    "steps": [
      "Send an email from a known contact to support."
    ],
    "expectedResult": "A case is created with subject, description, contact and account linked, status New.",
    "testType": "Integration",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CRM-CAMA-022",
    "featureId": "crm__customer-service__tekeh__case-management__gcull"
  },
  {
    "title": "Assign cases to support queue or agent",
    "description": "Cases route by rules (product, priority).",
    "preconditions": "Routing rule: Priority High → Tier 2 queue.",
    "steps": [
      "Create a High priority case."
    ],
    "expectedResult": "Case is placed in the Tier 2 queue and team members are notified.",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-CRM-CAMA-023",
    "featureId": "crm__customer-service__tekeh__case-management__gcull"
  },
  {
    "title": "Reply to the customer from the case",
    "description": "Agent replies thread with the customer email.",
    "preconditions": "Open case from email.",
    "steps": [
      "Reply from the case.",
      "Customer replies to that email."
    ],
    "expectedResult": "Both messages appear on the case thread; the customer reply reopens/updates the case.",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-CAMA-024",
    "featureId": "crm__customer-service__tekeh__case-management__gcull"
  },
  {
    "title": "Resolve case and send satisfaction survey",
    "description": "Closing a case triggers CSAT.",
    "preconditions": "",
    "steps": [
      "Set status = Resolved with resolution notes."
    ],
    "expectedResult": "Resolution is required, the customer gets a survey and the rating is saved on the case.",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-CAMA-025",
    "featureId": "crm__customer-service__tekeh__case-management__gcull"
  },
  {
    "title": "Merge duplicate cases",
    "description": "Two tickets for the same issue can be merged.",
    "preconditions": "Two cases from the same contact.",
    "steps": [
      "Merge them."
    ],
    "expectedResult": "One case remains with both threads and the other is closed as merged.",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-CAMA-026",
    "featureId": "crm__customer-service__tekeh__case-management__gcull"
  },
  {
    "title": "Internal notes are hidden from customers",
    "description": "Private comments never go to the customer.",
    "preconditions": "",
    "steps": [
      "Add an internal note on a case."
    ],
    "expectedResult": "Note is visible to agents only and not included in any customer email or portal view.",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-CAMA-027",
    "featureId": "crm__customer-service__tekeh__case-management__gcull"
  },
  {
    "title": "Start SLA timers when a case is created",
    "description": "First response and resolution targets are applied.",
    "preconditions": "SLA: High priority = 1h response, 8h resolution.",
    "steps": [
      "Create a High priority case."
    ],
    "expectedResult": "Case shows correct due times for response and resolution.",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CRM-SLES-022",
    "featureId": "crm__customer-service__tekeh__sla-and-escalations__ewebz"
  },
  {
    "title": "Respect business hours and holidays",
    "description": "SLA clocks only run in business hours.",
    "preconditions": "Business hours 9–6 Sun–Thu, holiday configured.",
    "steps": [
      "Create a case at 5:30 pm Thursday."
    ],
    "expectedResult": "Response due time is calculated in business hours, skipping weekend and holidays.",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-CRM-SLES-023",
    "featureId": "crm__customer-service__tekeh__sla-and-escalations__ewebz"
  },
  {
    "title": "Pause SLA while waiting on customer",
    "description": "Status Waiting on Customer pauses the clock.",
    "preconditions": "",
    "steps": [
      "Set case to Waiting on Customer for 2h.",
      "Set back to Open."
    ],
    "expectedResult": "Resolution due time is extended by the paused duration.",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-SLES-024",
    "featureId": "crm__customer-service__tekeh__sla-and-escalations__ewebz"
  },
  {
    "title": "Warn before SLA breach",
    "description": "Agent and lead are warned before the due time.",
    "preconditions": "Warning at 80% of time.",
    "steps": [
      "Leave a case untouched until 80% of the target."
    ],
    "expectedResult": "Assignee and team lead receive a warning notification.",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-SLES-025",
    "featureId": "crm__customer-service__tekeh__sla-and-escalations__ewebz"
  },
  {
    "title": "Escalate breached cases automatically",
    "description": "Breach reassigns or notifies the manager.",
    "preconditions": "Escalation rule on breach.",
    "steps": [
      "Let response target pass."
    ],
    "expectedResult": "Case is flagged Breached, escalated per rule and the event logged.",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CRM-SLES-026",
    "featureId": "crm__customer-service__tekeh__sla-and-escalations__ewebz"
  },
  {
    "title": "Report SLA compliance",
    "description": "Dashboard shows met vs breached.",
    "preconditions": "Cases with met and breached SLAs.",
    "steps": [
      "Open the SLA report."
    ],
    "expectedResult": "Met/breached counts and % match the underlying cases.",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-SLES-027",
    "featureId": "crm__customer-service__tekeh__sla-and-escalations__ewebz"
  },
  {
    "title": "Trigger a workflow on record create",
    "description": "A rule runs when a matching record is created.",
    "preconditions": "Rule: new deal > 10000 → create task for manager.",
    "steps": [
      "Create a deal of 15000."
    ],
    "expectedResult": "Task is created for the manager once; a deal of 5000 triggers nothing.",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CRM-WOAU-014",
    "featureId": "crm__automation__okxfs__workflow-automation__p62fv"
  },
  {
    "title": "Trigger on field change only",
    "description": "Workflow fires when a specific field changes.",
    "preconditions": "Rule: when stage changes to Proposal → send email.",
    "steps": [
      "Edit another field.",
      "Change stage to Proposal."
    ],
    "expectedResult": "Only the stage change sends the email.",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-CRM-WOAU-015",
    "featureId": "crm__automation__okxfs__workflow-automation__p62fv"
  },
  {
    "title": "Run a time-based action",
    "description": "Scheduled actions run relative to a date.",
    "preconditions": "Rule: 3 days before close date → reminder.",
    "steps": [
      "Create a deal closing in 4 days.",
      "Advance time or run the scheduler."
    ],
    "expectedResult": "Reminder is created exactly once on the right day; it is cancelled if the deal closes earlier.",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-WOAU-016",
    "featureId": "crm__automation__okxfs__workflow-automation__p62fv"
  },
  {
    "title": "Call a webhook action",
    "description": "Workflow posts the record to an external URL.",
    "preconditions": "Webhook endpoint configured.",
    "steps": [
      "Trigger the workflow."
    ],
    "expectedResult": "Endpoint receives the payload; failures are retried and logged.",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-WOAU-017",
    "featureId": "crm__automation__okxfs__workflow-automation__p62fv"
  },
  {
    "title": "Prevent infinite workflow loops",
    "description": "Workflows updating each other do not loop forever.",
    "preconditions": "Two rules that update each other fields.",
    "steps": [
      "Trigger the first rule."
    ],
    "expectedResult": "Execution stops at the recursion limit and an error is logged.",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-WOAU-018",
    "featureId": "crm__automation__okxfs__workflow-automation__p62fv"
  },
  {
    "title": "Only admins can create or edit workflows",
    "description": "Workflow builder is permission-protected.",
    "preconditions": "Signed in as rep.",
    "steps": [
      "Open Automation settings."
    ],
    "expectedResult": "Builder is hidden/read-only and API create returns 403.",
    "testType": "Permission",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-WOAU-019",
    "featureId": "crm__automation__okxfs__workflow-automation__p62fv"
  },
  {
    "title": "View workflow execution history",
    "description": "Each run is recorded for troubleshooting.",
    "preconditions": "",
    "steps": [
      "Trigger a workflow.",
      "Open its history."
    ],
    "expectedResult": "Run shows time, record, actions performed and success/failure.",
    "testType": "Usability",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-WOAU-020",
    "featureId": "crm__automation__okxfs__workflow-automation__p62fv"
  },
  {
    "title": "Submit a deal discount for approval",
    "description": "A discount above threshold goes to the approver.",
    "preconditions": "Rule: discount > 10% needs manager approval.",
    "steps": [
      "Set 15% discount and submit for approval."
    ],
    "expectedResult": "Approval request is created, the manager is notified and the deal is locked for editing.",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CRM-APPR-025",
    "featureId": "crm__automation__okxfs__approval-processes__ovq1b"
  },
  {
    "title": "Approve a request with comments",
    "description": "Approver approves and the record moves on.",
    "preconditions": "Pending request.",
    "steps": [
      "Approve as manager with a comment."
    ],
    "expectedResult": "Status = Approved, record unlocked, submitter notified, comment stored.",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CRM-APPR-026",
    "featureId": "crm__automation__okxfs__approval-processes__ovq1b"
  },
  {
    "title": "Reject a request with reason",
    "description": "Rejection returns the record to the submitter.",
    "preconditions": "Pending request.",
    "steps": [
      "Reject without a reason.",
      "Reject with a reason."
    ],
    "expectedResult": "Reason is required; record is unlocked and status = Rejected.",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CRM-APPR-027",
    "featureId": "crm__automation__okxfs__approval-processes__ovq1b"
  },
  {
    "title": "Route multi-step approvals in order",
    "description": "Step 2 starts only after step 1 approves.",
    "preconditions": "Steps: Manager then Finance.",
    "steps": [
      "Submit.",
      "Approve as Manager."
    ],
    "expectedResult": "Finance gets the request only after Manager approves; history shows both steps.",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-CRM-APPR-028",
    "featureId": "crm__automation__okxfs__approval-processes__ovq1b"
  },
  {
    "title": "Only the assigned approver can act",
    "description": "Other users cannot approve.",
    "preconditions": "Pending request assigned to Manager A.",
    "steps": [
      "Try to approve as Manager B and as submitter."
    ],
    "expectedResult": "Both are blocked; only Manager A (or delegate) can approve.",
    "testType": "Permission",
    "priority": "Critical",
    "isMandatory": false,
    "id": "TC-CRM-APPR-029",
    "featureId": "crm__automation__okxfs__approval-processes__ovq1b"
  },
  {
    "title": "Recall a pending request",
    "description": "Submitter can withdraw before decision.",
    "preconditions": "Pending request.",
    "steps": [
      "Recall it."
    ],
    "expectedResult": "Request is cancelled, approver notified and record unlocked.",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CRM-APPR-030",
    "featureId": "crm__automation__okxfs__approval-processes__ovq1b"
  },
  {
    "title": "Create a plan with monthly and annual prices",
    "description": "Create a plan with monthly and annual prices.",
    "preconditions": "Admin signed in",
    "steps": [
      "Create plan with monthly 20 and annual 200",
      "Publish"
    ],
    "expectedResult": "Both intervals appear on pricing page and checkout",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-PLMA-023",
    "featureId": "saas-subscription-management__plans-and-pricing__plan-management"
  },
  {
    "title": "Archive a plan with active subscribers",
    "description": "Archive a plan with active subscribers.",
    "preconditions": "Plan has active subscribers",
    "steps": [
      "Archive the plan"
    ],
    "expectedResult": "Plan hidden from new signups; existing subscribers keep billing on it",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-SUB-PLMA-024",
    "featureId": "saas-subscription-management__plans-and-pricing__plan-management"
  },
  {
    "title": "Edit price only affects new subscriptions",
    "description": "Edit price only affects new subscriptions.",
    "preconditions": "Plan has subscribers",
    "steps": [
      "Change price from 20 to 25"
    ],
    "expectedResult": "New subscribers pay 25; existing stay on 20 unless migrated",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-SUB-PLMA-025",
    "featureId": "saas-subscription-management__plans-and-pricing__plan-management"
  },
  {
    "title": "Calculate tiered (graduated) pricing",
    "description": "Calculate tiered (graduated) pricing.",
    "preconditions": "Tiers: 1-10 @5, 11+ @4",
    "steps": [
      "Bill 15 units"
    ],
    "expectedResult": "Charge = 10x5 + 5x4 = 70",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-PRTI-025",
    "featureId": "saas-subscription-management__plans-and-pricing__pricing-tiers"
  },
  {
    "title": "Calculate volume pricing",
    "description": "Calculate volume pricing.",
    "preconditions": "Volume: 1-10 @5, 11+ @4",
    "steps": [
      "Bill 15 units"
    ],
    "expectedResult": "All 15 units at 4 = 60",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-SUB-PRTI-026",
    "featureId": "saas-subscription-management__plans-and-pricing__pricing-tiers"
  },
  {
    "title": "Boundary at tier edges",
    "description": "Boundary at tier edges.",
    "preconditions": "Tiers as above",
    "steps": [
      "Bill exactly 10 and 11 units"
    ],
    "expectedResult": "10 → 50; 11 → correct tier price applied",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-SUB-PRTI-027",
    "featureId": "saas-subscription-management__plans-and-pricing__pricing-tiers"
  },
  {
    "title": "Grant features by plan",
    "description": "Grant features by plan.",
    "preconditions": "Pro includes API access, Basic does not",
    "steps": [
      "Sign in as Basic tenant",
      "Open API settings"
    ],
    "expectedResult": "Feature locked with upgrade prompt; Pro tenant has access",
    "testType": "Permission",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-FEEN-031",
    "featureId": "saas-subscription-management__plans-and-pricing__feature-entitlements"
  },
  {
    "title": "Entitlement updates instantly on upgrade",
    "description": "Entitlement updates instantly on upgrade.",
    "preconditions": "Basic tenant",
    "steps": [
      "Upgrade to Pro"
    ],
    "expectedResult": "Pro features unlocked without re-login",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-SUB-FEEN-032",
    "featureId": "saas-subscription-management__plans-and-pricing__feature-entitlements"
  },
  {
    "title": "Block entitled features via API when not on plan",
    "description": "Block entitled features via API when not on plan.",
    "preconditions": "Basic tenant token",
    "steps": [
      "Call a Pro-only endpoint"
    ],
    "expectedResult": "403 with entitlement error",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-SUB-FEEN-033",
    "featureId": "saas-subscription-management__plans-and-pricing__feature-entitlements"
  },
  {
    "title": "Apply percentage coupon for N months",
    "description": "Apply percentage coupon for N months.",
    "preconditions": "Coupon 20% for 3 months",
    "steps": [
      "Subscribe with coupon"
    ],
    "expectedResult": "First 3 invoices discounted; 4th full price",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-CODI-030",
    "featureId": "saas-subscription-management__plans-and-pricing__coupons-and-discounts"
  },
  {
    "title": "Reject expired or max-redeemed coupon",
    "description": "Reject expired or max-redeemed coupon.",
    "preconditions": "Coupon expired",
    "steps": [
      "Apply coupon at checkout"
    ],
    "expectedResult": "Clear error; no discount applied",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-SUB-CODI-031",
    "featureId": "saas-subscription-management__plans-and-pricing__coupons-and-discounts"
  },
  {
    "title": "Coupon restricted to specific plans",
    "description": "Coupon restricted to specific plans.",
    "preconditions": "Coupon valid only on Pro",
    "steps": [
      "Apply on Basic"
    ],
    "expectedResult": "Rejected with message",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-SUB-CODI-032",
    "featureId": "saas-subscription-management__plans-and-pricing__coupons-and-discounts"
  },
  {
    "title": "Subscribe with card and activate",
    "description": "Subscribe with card and activate.",
    "preconditions": "Valid test card",
    "steps": [
      "Choose plan",
      "Enter card",
      "Confirm"
    ],
    "expectedResult": "Subscription Active, first invoice paid, entitlements granted",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-SUCR-025",
    "featureId": "saas-subscription-management__subscription-lifecycle__subscription-creation"
  },
  {
    "title": "Handle 3-D Secure authentication",
    "description": "Handle 3-D Secure authentication.",
    "preconditions": "Card requiring SCA",
    "steps": [
      "Subscribe"
    ],
    "expectedResult": "SCA challenge shown; subscription active only after success",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-SUB-SUCR-026",
    "featureId": "saas-subscription-management__subscription-lifecycle__subscription-creation"
  },
  {
    "title": "Failed first payment does not activate",
    "description": "Failed first payment does not activate.",
    "preconditions": "Declined card",
    "steps": [
      "Subscribe"
    ],
    "expectedResult": "Subscription not active; clear decline message",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-SUB-SUCR-027",
    "featureId": "saas-subscription-management__subscription-lifecycle__subscription-creation"
  },
  {
    "title": "Upgrade mid-cycle with proration",
    "description": "Upgrade mid-cycle with proration.",
    "preconditions": "Monthly 20 plan, day 15 of 30",
    "steps": [
      "Upgrade to 40 plan"
    ],
    "expectedResult": "Immediate prorated charge ≈ 10; new plan active now",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-UPDO-023",
    "featureId": "saas-subscription-management__subscription-lifecycle__upgrade-and-downgrade"
  },
  {
    "title": "Downgrade at period end",
    "description": "Downgrade at period end.",
    "preconditions": "Pro subscriber",
    "steps": [
      "Downgrade to Basic"
    ],
    "expectedResult": "Change scheduled for renewal date; Pro kept until then",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-SUB-UPDO-024",
    "featureId": "saas-subscription-management__subscription-lifecycle__upgrade-and-downgrade"
  },
  {
    "title": "Block downgrade that exceeds new plan limits",
    "description": "Block downgrade that exceeds new plan limits.",
    "preconditions": "10 seats used, Basic allows 5",
    "steps": [
      "Downgrade to Basic"
    ],
    "expectedResult": "Blocked or asked to reduce seats first",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-SUB-UPDO-025",
    "featureId": "saas-subscription-management__subscription-lifecycle__upgrade-and-downgrade"
  },
  {
    "title": "Cancel at end of period",
    "description": "Cancel at end of period.",
    "preconditions": "Active subscription",
    "steps": [
      "Cancel"
    ],
    "expectedResult": "Status Cancelling; access until period end; no renewal invoice",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-CAPA-021",
    "featureId": "saas-subscription-management__subscription-lifecycle__cancellation-and-pause"
  },
  {
    "title": "Cancel immediately with refund policy",
    "description": "Cancel immediately with refund policy.",
    "preconditions": "Admin",
    "steps": [
      "Cancel immediately with prorated refund"
    ],
    "expectedResult": "Access removed; credit note/refund issued for unused time",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-SUB-CAPA-022",
    "featureId": "saas-subscription-management__subscription-lifecycle__cancellation-and-pause"
  },
  {
    "title": "Pause and resume subscription",
    "description": "Pause and resume subscription.",
    "preconditions": "Pause allowed",
    "steps": [
      "Pause 1 month",
      "Resume"
    ],
    "expectedResult": "No invoice during pause; billing date shifted on resume",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-SUB-CAPA-023",
    "featureId": "saas-subscription-management__subscription-lifecycle__cancellation-and-pause"
  },
  {
    "title": "Start free trial without card",
    "description": "Start free trial without card.",
    "preconditions": "Trial 14 days, no card",
    "steps": [
      "Sign up"
    ],
    "expectedResult": "Trial active, ends in 14 days, reminder before end",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-TRMA-025",
    "featureId": "saas-subscription-management__subscription-lifecycle__trial-management"
  },
  {
    "title": "Convert trial to paid at end",
    "description": "Convert trial to paid at end.",
    "preconditions": "Card on file",
    "steps": [
      "Let trial end"
    ],
    "expectedResult": "Subscription Active and first invoice charged on trial end",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-TRMA-026",
    "featureId": "saas-subscription-management__subscription-lifecycle__trial-management"
  },
  {
    "title": "Expire trial without payment method",
    "description": "Expire trial without payment method.",
    "preconditions": "No card",
    "steps": [
      "Let trial end"
    ],
    "expectedResult": "Access restricted/read-only; no charge attempted",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-SUB-TRMA-027",
    "featureId": "saas-subscription-management__subscription-lifecycle__trial-management"
  },
  {
    "title": "Prevent repeated trials for same customer",
    "description": "Prevent repeated trials for same customer.",
    "preconditions": "Customer already used a trial",
    "steps": [
      "Sign up again with same email/card"
    ],
    "expectedResult": "No second trial granted",
    "testType": "Security",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-SUB-TRMA-028",
    "featureId": "saas-subscription-management__subscription-lifecycle__trial-management"
  },
  {
    "title": "Retry failed renewal on schedule",
    "description": "Retry failed renewal on schedule.",
    "preconditions": "Retry schedule day 1,3,7",
    "steps": [
      "Fail renewal payment"
    ],
    "expectedResult": "Retries on days 1,3,7 with emails to customer",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-DURE-021",
    "featureId": "saas-subscription-management__billing__dunning-and-retry"
  },
  {
    "title": "Recover after card update",
    "description": "Recover after card update.",
    "preconditions": "Past-due subscription",
    "steps": [
      "Update card in portal"
    ],
    "expectedResult": "Outstanding invoice charged; status Active",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-SUB-DURE-022",
    "featureId": "saas-subscription-management__billing__dunning-and-retry"
  },
  {
    "title": "Cancel or suspend after final failed retry",
    "description": "Cancel or suspend after final failed retry.",
    "preconditions": "All retries fail",
    "steps": [
      "Wait for final retry"
    ],
    "expectedResult": "Subscription suspended/cancelled per setting; access removed",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-SUB-DURE-023",
    "featureId": "saas-subscription-management__billing__dunning-and-retry"
  },
  {
    "title": "Ingest usage events idempotently",
    "description": "Ingest usage events idempotently.",
    "preconditions": "API key",
    "steps": [
      "Send same usage event twice with same idempotency key"
    ],
    "expectedResult": "Usage counted once",
    "testType": "Integration",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-USTR-029",
    "featureId": "saas-subscription-management__usage-and-metering__usage-tracking"
  },
  {
    "title": "Show current period usage to customer",
    "description": "Show current period usage to customer.",
    "preconditions": "Usage recorded",
    "steps": [
      "Open usage page"
    ],
    "expectedResult": "Totals match recorded events for the period",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-SUB-USTR-030",
    "featureId": "saas-subscription-management__usage-and-metering__usage-tracking"
  },
  {
    "title": "Bill overage above included quota",
    "description": "Bill overage above included quota.",
    "preconditions": "Plan includes 1000 calls, 0.01 per extra",
    "steps": [
      "Use 1500 calls",
      "Close period"
    ],
    "expectedResult": "Invoice includes 500 x 0.01 = 5 overage",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-OVBI-033",
    "featureId": "saas-subscription-management__usage-and-metering__overage-billing"
  },
  {
    "title": "No overage when under quota",
    "description": "No overage when under quota.",
    "preconditions": "Usage 800",
    "steps": [
      "Close period"
    ],
    "expectedResult": "No overage line",
    "testType": "Boundary",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-SUB-OVBI-034",
    "featureId": "saas-subscription-management__usage-and-metering__overage-billing"
  },
  {
    "title": "Hard limit blocks further usage",
    "description": "Hard limit blocks further usage.",
    "preconditions": "Hard quota 1000",
    "steps": [
      "Make call 1001"
    ],
    "expectedResult": "Request rejected with quota-exceeded error",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-QUEN-027",
    "featureId": "saas-subscription-management__usage-and-metering__quota-enforcement"
  },
  {
    "title": "Soft limit warns at 80% and 100%",
    "description": "Soft limit warns at 80% and 100%.",
    "preconditions": "Soft quota",
    "steps": [
      "Reach 80% then 100%"
    ],
    "expectedResult": "Customer and admin notified at each threshold",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-SUB-QUEN-028",
    "featureId": "saas-subscription-management__usage-and-metering__quota-enforcement"
  },
  {
    "title": "Provision tenant on signup",
    "description": "Provision tenant on signup.",
    "preconditions": "New signup",
    "steps": [
      "Complete signup"
    ],
    "expectedResult": "Tenant created with isolated data, default settings and admin user",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-TEPR-030",
    "featureId": "saas-subscription-management__tenant-administration__tenant-provisioning"
  },
  {
    "title": "Tenant data isolation",
    "description": "Tenant data isolation.",
    "preconditions": "Two tenants",
    "steps": [
      "As tenant A request tenant B record IDs via API"
    ],
    "expectedResult": "404/403; no data leak",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-TEPR-031",
    "featureId": "saas-subscription-management__tenant-administration__tenant-provisioning"
  },
  {
    "title": "Deprovision tenant after cancellation retention period",
    "description": "Deprovision tenant after cancellation retention period.",
    "preconditions": "Cancelled tenant past retention",
    "steps": [
      "Run cleanup"
    ],
    "expectedResult": "Tenant data deleted/archived per policy and logged",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-SUB-TEPR-032",
    "featureId": "saas-subscription-management__tenant-administration__tenant-provisioning"
  },
  {
    "title": "Add seat with prorated charge",
    "description": "Add seat with prorated charge.",
    "preconditions": "5 seats, mid-cycle",
    "steps": [
      "Invite 6th user"
    ],
    "expectedResult": "Seat added with prorated charge or blocked if limit",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-USSEMA-025",
    "featureId": "saas-subscription-management__tenant-administration__user-seat-management"
  },
  {
    "title": "Block invites beyond seat limit",
    "description": "Block invites beyond seat limit.",
    "preconditions": "Seat cap reached, auto-add off",
    "steps": [
      "Invite user"
    ],
    "expectedResult": "Invite blocked with buy-more-seats prompt",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-SUB-USSEMA-026",
    "featureId": "saas-subscription-management__tenant-administration__user-seat-management"
  },
  {
    "title": "Removing a user frees a seat",
    "description": "Removing a user frees a seat.",
    "preconditions": "Full seats",
    "steps": [
      "Deactivate a user"
    ],
    "expectedResult": "Seat available; credit at next renewal per policy",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-SUB-USSEMA-027",
    "featureId": "saas-subscription-management__tenant-administration__user-seat-management"
  },
  {
    "title": "Prorate seat increase mid-cycle",
    "description": "Prorate seat increase mid-cycle.",
    "preconditions": "Day 10 of 30",
    "steps": [
      "Add 2 seats"
    ],
    "expectedResult": "Charge = 2 x price x 20/30",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-PRCRNO-036",
    "featureId": "saas-subscription-management__billing__proration-and-credit-notes__czioi"
  },
  {
    "title": "Issue credit note for refund",
    "description": "Issue credit note for refund.",
    "preconditions": "Paid invoice",
    "steps": [
      "Refund partially"
    ],
    "expectedResult": "Credit note created, linked to invoice, totals correct",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-SUB-PRCRNO-037",
    "featureId": "saas-subscription-management__billing__proration-and-credit-notes__czioi"
  },
  {
    "title": "Apply customer credit balance to next invoice",
    "description": "Apply customer credit balance to next invoice.",
    "preconditions": "Credit balance 10",
    "steps": [
      "Generate next invoice"
    ],
    "expectedResult": "Credit applied before charging card",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-SUB-PRCRNO-038",
    "featureId": "saas-subscription-management__billing__proration-and-credit-notes__czioi"
  },
  {
    "title": "Apply tax by customer location",
    "description": "Apply tax by customer location.",
    "preconditions": "Tax rule for country",
    "steps": [
      "Create invoice for customer in that country"
    ],
    "expectedResult": "Correct tax rate and tax line on invoice",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-TAVACA-020",
    "featureId": "saas-subscription-management__billing__tax-and-vat-calculation__u9uqi"
  },
  {
    "title": "Reverse charge for valid B2B VAT ID",
    "description": "Reverse charge for valid B2B VAT ID.",
    "preconditions": "EU business with valid VAT ID",
    "steps": [
      "Invoice customer"
    ],
    "expectedResult": "0% VAT with reverse-charge note",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-SUB-TAVACA-021",
    "featureId": "saas-subscription-management__billing__tax-and-vat-calculation__u9uqi"
  },
  {
    "title": "Reject invalid VAT ID",
    "description": "Reject invalid VAT ID.",
    "preconditions": "Invalid VAT ID",
    "steps": [
      "Save billing details"
    ],
    "expectedResult": "Validation error; tax charged normally",
    "testType": "Validation",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-SUB-TAVACA-022",
    "featureId": "saas-subscription-management__billing__tax-and-vat-calculation__u9uqi"
  },
  {
    "title": "Customer updates payment method",
    "description": "Customer updates payment method.",
    "preconditions": "Signed in customer",
    "steps": [
      "Replace card in portal"
    ],
    "expectedResult": "New card saved and used for next renewal; old card removed",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-CUBIPO-034",
    "featureId": "saas-subscription-management__subscription-lifecycle__customer-billing-portal__3zwio"
  },
  {
    "title": "Download past invoices",
    "description": "Download past invoices.",
    "preconditions": "Customer with invoices",
    "steps": [
      "Open invoices tab",
      "Download PDF"
    ],
    "expectedResult": "All invoices listed and downloadable",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-SUB-CUBIPO-035",
    "featureId": "saas-subscription-management__subscription-lifecycle__customer-billing-portal__3zwio"
  },
  {
    "title": "Portal session cannot access another customer",
    "description": "Portal session cannot access another customer.",
    "preconditions": "Portal link for customer A",
    "steps": [
      "Change customer id in URL/API"
    ],
    "expectedResult": "Access denied",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-CUBIPO-036",
    "featureId": "saas-subscription-management__subscription-lifecycle__customer-billing-portal__3zwio"
  },
  {
    "title": "Calculate MRR including annual plans",
    "description": "Calculate MRR including annual plans.",
    "preconditions": "Monthly 20 and annual 240 subscribers",
    "steps": [
      "Open MRR report"
    ],
    "expectedResult": "MRR = 20 + 20 = 40",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-MRCHME-029",
    "featureId": "saas-subscription-management__revenue-analytics__i6ksf__mrr-and-churn-metrics__b5tgl"
  },
  {
    "title": "Classify expansion, contraction and churn MRR",
    "description": "Classify expansion, contraction and churn MRR.",
    "preconditions": "Upgrades, downgrades and cancels this month",
    "steps": [
      "Open MRR movement"
    ],
    "expectedResult": "Each change in correct bucket; totals reconcile with start/end MRR",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-SUB-MRCHME-030",
    "featureId": "saas-subscription-management__revenue-analytics__i6ksf__mrr-and-churn-metrics__b5tgl"
  },
  {
    "title": "Exclude trials and coupons correctly",
    "description": "Exclude trials and coupons correctly.",
    "preconditions": "Trial and discounted subs",
    "steps": [
      "Open MRR"
    ],
    "expectedResult": "Trials excluded; MRR uses discounted amount",
    "testType": "Boundary",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-SUB-MRCHME-031",
    "featureId": "saas-subscription-management__revenue-analytics__i6ksf__mrr-and-churn-metrics__b5tgl"
  },
  {
    "title": "Recognise annual plan monthly",
    "description": "Recognise annual plan monthly.",
    "preconditions": "Annual 1200 paid upfront",
    "steps": [
      "Run revenue schedule"
    ],
    "expectedResult": "100 recognised per month; remainder deferred",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-SUB-RERE-027",
    "featureId": "saas-subscription-management__revenue-analytics__i6ksf__revenue-recognition__vrohr"
  },
  {
    "title": "Adjust schedule on mid-term cancellation with refund",
    "description": "Adjust schedule on mid-term cancellation with refund.",
    "preconditions": "Annual plan refunded month 4",
    "steps": [
      "Process refund"
    ],
    "expectedResult": "Remaining deferred revenue reversed",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-SUB-RERE-028",
    "featureId": "saas-subscription-management__revenue-analytics__i6ksf__revenue-recognition__vrohr"
  },
  {
    "title": "Publish product with price, SKU, images and stock",
    "description": "Publish product with price, SKU, images and stock.",
    "preconditions": "Admin",
    "steps": [
      "Create product",
      "Publish"
    ],
    "expectedResult": "Product visible on storefront with correct price, images and Add to cart",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ECM-PRMA-022",
    "featureId": "e-commerce__catalog__product-management"
  },
  {
    "title": "Unpublished or scheduled product hidden",
    "description": "Unpublished or scheduled product hidden.",
    "preconditions": "Product draft / scheduled",
    "steps": [
      "Open product URL as shopper"
    ],
    "expectedResult": "404 or not visible until publish time",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ECM-PRMA-023",
    "featureId": "e-commerce__catalog__product-management"
  },
  {
    "title": "Sale price must be lower than regular price",
    "description": "Sale price must be lower than regular price.",
    "preconditions": "",
    "steps": [
      "Set sale 120 regular 100"
    ],
    "expectedResult": "Validation error",
    "testType": "Validation",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-ECM-PRMA-024",
    "featureId": "e-commerce__catalog__product-management"
  },
  {
    "title": "Select variant updates price, image and stock",
    "description": "Select variant updates price, image and stock.",
    "preconditions": "Product with size/colour variants",
    "steps": [
      "Pick each variant"
    ],
    "expectedResult": "Price, SKU, image and availability update per variant",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ECM-PRVA-017",
    "featureId": "e-commerce__catalog__product-variants"
  },
  {
    "title": "Block add-to-cart for out-of-stock variant",
    "description": "Block add-to-cart for out-of-stock variant.",
    "preconditions": "One variant stock 0",
    "steps": [
      "Select it"
    ],
    "expectedResult": "Add to cart disabled with Out of stock label",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-ECM-PRVA-018",
    "featureId": "e-commerce__catalog__product-variants"
  },
  {
    "title": "Only verified buyers can review (if configured)",
    "description": "Only verified buyers can review (if configured).",
    "preconditions": "Shopper without order",
    "steps": [
      "Try to submit review"
    ],
    "expectedResult": "Blocked with message; verified buyer can review",
    "testType": "Permission",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-ECM-PRRE-016",
    "featureId": "e-commerce__catalog__product-reviews"
  },
  {
    "title": "Moderate review before publishing",
    "description": "Moderate review before publishing.",
    "preconditions": "Moderation on",
    "steps": [
      "Submit review"
    ],
    "expectedResult": "Pending until approved; average rating updates after approval",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-ECM-PRRE-017",
    "featureId": "e-commerce__catalog__product-reviews"
  },
  {
    "title": "Sanitise HTML in review text",
    "description": "Sanitise HTML in review text.",
    "preconditions": "",
    "steps": [
      "Submit review with script tag"
    ],
    "expectedResult": "Rendered as text; no script execution",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ECM-PRRE-018",
    "featureId": "e-commerce__catalog__product-reviews"
  },
  {
    "title": "Cart persists across sessions for logged-in user",
    "description": "Cart persists across sessions for logged-in user.",
    "preconditions": "Logged in with items",
    "steps": [
      "Log out",
      "Log in on another device"
    ],
    "expectedResult": "Cart items restored",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-ECM-SHCA-020",
    "featureId": "e-commerce__cart-and-checkout__shopping-cart"
  },
  {
    "title": "Merge guest cart on login",
    "description": "Merge guest cart on login.",
    "preconditions": "Guest cart with items, account cart with items",
    "steps": [
      "Log in"
    ],
    "expectedResult": "Carts merged without duplicates",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-ECM-SHCA-021",
    "featureId": "e-commerce__cart-and-checkout__shopping-cart"
  },
  {
    "title": "Quantity cannot exceed stock",
    "description": "Quantity cannot exceed stock.",
    "preconditions": "Stock 3",
    "steps": [
      "Set qty 5"
    ],
    "expectedResult": "Limited to 3 with message",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ECM-SHCA-022",
    "featureId": "e-commerce__cart-and-checkout__shopping-cart"
  },
  {
    "title": "Complete checkout end to end",
    "description": "Complete checkout end to end.",
    "preconditions": "Items in cart",
    "steps": [
      "Address",
      "Shipping",
      "Payment",
      "Place order"
    ],
    "expectedResult": "Order created, confirmation page and email, stock reduced",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ECM-CHFL-018",
    "featureId": "e-commerce__cart-and-checkout__checkout-flow"
  },
  {
    "title": "Re-validate price and stock at place order",
    "description": "Re-validate price and stock at place order.",
    "preconditions": "Price changed after cart",
    "steps": [
      "Place order"
    ],
    "expectedResult": "User informed of change before charging",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-ECM-CHFL-019",
    "featureId": "e-commerce__cart-and-checkout__checkout-flow"
  },
  {
    "title": "Prevent double submit of order",
    "description": "Prevent double submit of order.",
    "preconditions": "",
    "steps": [
      "Double-click Place order"
    ],
    "expectedResult": "Only one order and one charge",
    "testType": "Negative",
    "priority": "Critical",
    "isMandatory": false,
    "id": "TC-ECM-CHFL-020",
    "featureId": "e-commerce__cart-and-checkout__checkout-flow"
  },
  {
    "title": "Apply valid coupon to cart",
    "description": "Apply valid coupon to cart.",
    "preconditions": "Coupon 10% min spend 1000",
    "steps": [
      "Cart 1200",
      "Apply coupon"
    ],
    "expectedResult": "Discount 120 shown in totals",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ECM-COAP-020",
    "featureId": "e-commerce__cart-and-checkout__coupon-application"
  },
  {
    "title": "Reject coupon below minimum spend",
    "description": "Reject coupon below minimum spend.",
    "preconditions": "Cart 800",
    "steps": [
      "Apply coupon"
    ],
    "expectedResult": "Error states minimum spend",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ECM-COAP-021",
    "featureId": "e-commerce__cart-and-checkout__coupon-application"
  },
  {
    "title": "Enforce one-use-per-customer",
    "description": "Enforce one-use-per-customer.",
    "preconditions": "Customer already used coupon",
    "steps": [
      "Apply again"
    ],
    "expectedResult": "Rejected",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-ECM-COAP-022",
    "featureId": "e-commerce__cart-and-checkout__coupon-application"
  },
  {
    "title": "Place order as guest",
    "description": "Place order as guest.",
    "preconditions": "Guest checkout enabled",
    "steps": [
      "Checkout with email and address only"
    ],
    "expectedResult": "Order placed; confirmation emailed; tracking link works",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ECM-GUCH-015",
    "featureId": "e-commerce__cart-and-checkout__guest-checkout"
  },
  {
    "title": "Offer account creation after guest order",
    "description": "Offer account creation after guest order.",
    "preconditions": "",
    "steps": [
      "Finish guest order"
    ],
    "expectedResult": "Option to create account linking the order",
    "testType": "Usability",
    "priority": "Low",
    "isMandatory": false,
    "id": "TC-ECM-GUCH-016",
    "featureId": "e-commerce__cart-and-checkout__guest-checkout"
  },
  {
    "title": "Order number unique and sequential",
    "description": "Order number unique and sequential.",
    "preconditions": "",
    "steps": [
      "Place two orders"
    ],
    "expectedResult": "Unique order numbers; both in admin list",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-ECM-ORPL-020",
    "featureId": "e-commerce__order-management__order-placement"
  },
  {
    "title": "Order totals reconcile",
    "description": "Order totals reconcile.",
    "preconditions": "Cart with discount, shipping, tax",
    "steps": [
      "Place order"
    ],
    "expectedResult": "Subtotal - discount + shipping + tax = total on order, invoice and email",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ECM-ORPL-021",
    "featureId": "e-commerce__order-management__order-placement"
  },
  {
    "title": "Customer sees status timeline",
    "description": "Customer sees status timeline.",
    "preconditions": "Order shipped",
    "steps": [
      "Open My orders"
    ],
    "expectedResult": "Statuses Placed → Packed → Shipped with dates",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-ECM-ORTR-022",
    "featureId": "e-commerce__order-management__order-tracking"
  },
  {
    "title": "Guest tracks order by number and email",
    "description": "Guest tracks order by number and email.",
    "preconditions": "Guest order",
    "steps": [
      "Enter order no + email"
    ],
    "expectedResult": "Status shown; wrong email rejected",
    "testType": "Security",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-ECM-ORTR-023",
    "featureId": "e-commerce__order-management__order-tracking"
  },
  {
    "title": "Apply VAT by region",
    "description": "Apply VAT by region.",
    "preconditions": "VAT rule configured",
    "steps": [
      "Checkout to taxable address"
    ],
    "expectedResult": "Correct VAT line; prices shown incl/excl per setting",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ECM-TACA-021",
    "featureId": "e-commerce__payments-and-shipping__tax-calculation"
  },
  {
    "title": "Tax-exempt product",
    "description": "Tax-exempt product.",
    "preconditions": "Exempt product",
    "steps": [
      "Checkout"
    ],
    "expectedResult": "No tax on exempt line",
    "testType": "Boundary",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-ECM-TACA-022",
    "featureId": "e-commerce__payments-and-shipping__tax-calculation"
  },
  {
    "title": "Move wishlist item to cart",
    "description": "Move wishlist item to cart.",
    "preconditions": "Item in wishlist",
    "steps": [
      "Click Add to cart"
    ],
    "expectedResult": "Item in cart, removed from wishlist per setting",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-ECM-WI-017",
    "featureId": "e-commerce__customer-accounts__wishlist"
  },
  {
    "title": "Notify when wishlist item back in stock",
    "description": "Notify when wishlist item back in stock.",
    "preconditions": "Wishlist item out of stock",
    "steps": [
      "Restock item"
    ],
    "expectedResult": "Customer notified",
    "testType": "Integration",
    "priority": "Low",
    "isMandatory": false,
    "id": "TC-ECM-WI-018",
    "featureId": "e-commerce__customer-accounts__wishlist"
  },
  {
    "title": "Save multiple addresses with default",
    "description": "Save multiple addresses with default.",
    "preconditions": "Logged in",
    "steps": [
      "Add 2 addresses",
      "Set default"
    ],
    "expectedResult": "Default prefilled at checkout",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-ECM-ADBO-019",
    "featureId": "e-commerce__customer-accounts__address-book"
  },
  {
    "title": "Validate required address fields and phone",
    "description": "Validate required address fields and phone.",
    "preconditions": "",
    "steps": [
      "Save address without city / bad phone"
    ],
    "expectedResult": "Field errors shown",
    "testType": "Validation",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-ECM-ADBO-020",
    "featureId": "e-commerce__customer-accounts__address-book"
  },
  {
    "title": "Search returns relevant products",
    "description": "Search returns relevant products.",
    "preconditions": "Catalog seeded",
    "steps": [
      "Search \"shoe clener\""
    ],
    "expectedResult": "Typo tolerated; shoe cleaner products shown",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ECM-PRSEFI-019",
    "featureId": "e-commerce__catalog__product-search-and-filters__bw6p1"
  },
  {
    "title": "Combine filters and sorting",
    "description": "Combine filters and sorting.",
    "preconditions": "",
    "steps": [
      "Filter brand + price range",
      "Sort price low-high"
    ],
    "expectedResult": "Only matching products, correctly sorted; counts accurate",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ECM-PRSEFI-020",
    "featureId": "e-commerce__catalog__product-search-and-filters__bw6p1"
  },
  {
    "title": "No results state",
    "description": "No results state.",
    "preconditions": "",
    "steps": [
      "Search gibberish"
    ],
    "expectedResult": "Friendly empty state with suggestions",
    "testType": "Usability",
    "priority": "Low",
    "isMandatory": false,
    "id": "TC-ECM-PRSEFI-021",
    "featureId": "e-commerce__catalog__product-search-and-filters__bw6p1"
  },
  {
    "title": "Reserve stock during checkout",
    "description": "Reserve stock during checkout.",
    "preconditions": "Stock 1, two shoppers",
    "steps": [
      "Both reach payment"
    ],
    "expectedResult": "Only one order succeeds; other told out of stock",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ECM-STLERE-020",
    "featureId": "e-commerce__catalog__stock-levels-and-reservation__l0a3x"
  },
  {
    "title": "Release reservation on timeout or failed payment",
    "description": "Release reservation on timeout or failed payment.",
    "preconditions": "Reservation 15 min",
    "steps": [
      "Abandon payment"
    ],
    "expectedResult": "Stock released after timeout",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ECM-STLERE-021",
    "featureId": "e-commerce__catalog__stock-levels-and-reservation__l0a3x"
  },
  {
    "title": "Low-stock alert",
    "description": "Low-stock alert.",
    "preconditions": "Threshold 5",
    "steps": [
      "Sell down to 4"
    ],
    "expectedResult": "Admin alerted",
    "testType": "Integration",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-ECM-STLERE-022",
    "featureId": "e-commerce__catalog__stock-levels-and-reservation__l0a3x"
  },
  {
    "title": "Place COD order",
    "description": "Place COD order.",
    "preconditions": "COD enabled",
    "steps": [
      "Choose COD",
      "Place order"
    ],
    "expectedResult": "Order status Pending COD; COD fee added if configured",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ECM-CAONDE-022",
    "featureId": "e-commerce__payments-and-shipping__cash-on-delivery__q0shp"
  },
  {
    "title": "COD unavailable above limit or in area",
    "description": "COD unavailable above limit or in area.",
    "preconditions": "COD max 10000 / excluded area",
    "steps": [
      "Checkout 12000"
    ],
    "expectedResult": "COD option hidden with reason",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ECM-CAONDE-023",
    "featureId": "e-commerce__payments-and-shipping__cash-on-delivery__q0shp"
  },
  {
    "title": "Mark COD collected and reconcile",
    "description": "Mark COD collected and reconcile.",
    "preconditions": "Delivered COD order",
    "steps": [
      "Courier marks collected"
    ],
    "expectedResult": "Payment status Paid; appears in COD reconciliation",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ECM-CAONDE-024",
    "featureId": "e-commerce__payments-and-shipping__cash-on-delivery__q0shp"
  },
  {
    "title": "Send reminder after inactivity",
    "description": "Send reminder after inactivity.",
    "preconditions": "Reminder after 1h",
    "steps": [
      "Add items with email and leave"
    ],
    "expectedResult": "Reminder sent once at 1h with restore link",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ECM-ABCARE-015",
    "featureId": "e-commerce__marketing-and-growth__tmaln__abandoned-cart-recovery__c7u9n"
  },
  {
    "title": "Restore link rebuilds cart",
    "description": "Restore link rebuilds cart.",
    "preconditions": "Reminder email",
    "steps": [
      "Open link"
    ],
    "expectedResult": "Same items and quantities restored",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ECM-ABCARE-016",
    "featureId": "e-commerce__marketing-and-growth__tmaln__abandoned-cart-recovery__c7u9n"
  },
  {
    "title": "Stop reminders after purchase or unsubscribe",
    "description": "Stop reminders after purchase or unsubscribe.",
    "preconditions": "",
    "steps": [
      "Complete order"
    ],
    "expectedResult": "No further reminders",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-ECM-ABCARE-017",
    "featureId": "e-commerce__marketing-and-growth__tmaln__abandoned-cart-recovery__c7u9n"
  },
  {
    "title": "Flash sale price starts and ends on schedule",
    "description": "Flash sale price starts and ends on schedule.",
    "preconditions": "Sale 10:00-12:00",
    "steps": [
      "Check price before, during, after"
    ],
    "expectedResult": "Sale price only during window",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ECM-PRFLSA-026",
    "featureId": "e-commerce__marketing-and-growth__tmaln__promotions-and-flash-sales__gu4jr"
  },
  {
    "title": "Buy one get one applies correctly",
    "description": "Buy one get one applies correctly.",
    "preconditions": "BOGO rule",
    "steps": [
      "Add 2 eligible items"
    ],
    "expectedResult": "Cheaper item free",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ECM-PRFLSA-027",
    "featureId": "e-commerce__marketing-and-growth__tmaln__promotions-and-flash-sales__gu4jr"
  },
  {
    "title": "Per-customer limit on sale item",
    "description": "Per-customer limit on sale item.",
    "preconditions": "Limit 2",
    "steps": [
      "Add 3"
    ],
    "expectedResult": "Limited to 2 with message",
    "testType": "Boundary",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-ECM-PRFLSA-028",
    "featureId": "e-commerce__marketing-and-growth__tmaln__promotions-and-flash-sales__gu4jr"
  },
  {
    "title": "Journal entry must balance",
    "description": "Journal entry must balance.",
    "preconditions": "Accountant",
    "steps": [
      "Post entry Dr 100 Cr 90"
    ],
    "expectedResult": "Rejected: debits must equal credits",
    "testType": "Validation",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ERP-GELE-025",
    "featureId": "erp__finance__general-ledger"
  },
  {
    "title": "Post journal and update trial balance",
    "description": "Post journal and update trial balance.",
    "preconditions": "",
    "steps": [
      "Post balanced entry"
    ],
    "expectedResult": "Account balances and trial balance updated; TB still balances",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ERP-GELE-026",
    "featureId": "erp__finance__general-ledger"
  },
  {
    "title": "Reverse a posted journal",
    "description": "Reverse a posted journal.",
    "preconditions": "Posted entry",
    "steps": [
      "Reverse"
    ],
    "expectedResult": "Reversal entry created with link; original not deleted",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ERP-GELE-027",
    "featureId": "erp__finance__general-ledger"
  },
  {
    "title": "Three-way match PO, receipt and bill",
    "description": "Three-way match PO, receipt and bill.",
    "preconditions": "PO 10 units, received 8",
    "steps": [
      "Enter bill for 10"
    ],
    "expectedResult": "Mismatch flagged; bill held for approval",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ERP-ACPA-025",
    "featureId": "erp__finance__accounts-payable"
  },
  {
    "title": "Prevent duplicate vendor bill",
    "description": "Prevent duplicate vendor bill.",
    "preconditions": "Bill no INV-1 for vendor",
    "steps": [
      "Enter INV-1 again"
    ],
    "expectedResult": "Duplicate warning/block",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ERP-ACPA-026",
    "featureId": "erp__finance__accounts-payable"
  },
  {
    "title": "Pay bill and update vendor balance",
    "description": "Pay bill and update vendor balance.",
    "preconditions": "Approved bill",
    "steps": [
      "Record payment"
    ],
    "expectedResult": "Bill paid, vendor balance reduced, GL posted",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ERP-ACPA-027",
    "featureId": "erp__finance__accounts-payable"
  },
  {
    "title": "Invoice posts receivable",
    "description": "Invoice posts receivable.",
    "preconditions": "Customer",
    "steps": [
      "Create and post invoice"
    ],
    "expectedResult": "AR and revenue posted; customer balance increased",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ERP-ACRE-025",
    "featureId": "erp__finance__accounts-receivable"
  },
  {
    "title": "Apply partial payment",
    "description": "Apply partial payment.",
    "preconditions": "Invoice 1000",
    "steps": [
      "Receive 400"
    ],
    "expectedResult": "Invoice partially paid, balance 600",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-ERP-ACRE-026",
    "featureId": "erp__finance__accounts-receivable"
  },
  {
    "title": "AR ageing buckets correct",
    "description": "AR ageing buckets correct.",
    "preconditions": "Invoices of various ages",
    "steps": [
      "Run ageing report"
    ],
    "expectedResult": "Each invoice in correct 0-30/31-60/61-90/90+ bucket",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-ERP-ACRE-027",
    "featureId": "erp__finance__accounts-receivable"
  },
  {
    "title": "Requisition routed for approval by amount",
    "description": "Requisition routed for approval by amount.",
    "preconditions": "Approval > 50000 needs director",
    "steps": [
      "Submit 60000 requisition"
    ],
    "expectedResult": "Routed to director; cannot convert until approved",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ERP-PURE-022",
    "featureId": "erp__procurement__purchase-requisition"
  },
  {
    "title": "Convert approved requisition to PO",
    "description": "Convert approved requisition to PO.",
    "preconditions": "Approved requisition",
    "steps": [
      "Convert"
    ],
    "expectedResult": "PO created with lines; requisition marked converted",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ERP-PURE-023",
    "featureId": "erp__procurement__purchase-requisition"
  },
  {
    "title": "Create and send PO",
    "description": "Create and send PO.",
    "preconditions": "Vendor exists",
    "steps": [
      "Create PO",
      "Approve",
      "Send"
    ],
    "expectedResult": "PO status Sent, vendor emailed PDF",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ERP-PUOR-024",
    "featureId": "erp__procurement__purchase-order"
  },
  {
    "title": "Cannot edit PO after receipt",
    "description": "Cannot edit PO after receipt.",
    "preconditions": "Partially received PO",
    "steps": [
      "Edit quantity below received"
    ],
    "expectedResult": "Blocked",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ERP-PUOR-025",
    "featureId": "erp__procurement__purchase-order"
  },
  {
    "title": "Close PO short",
    "description": "Close PO short.",
    "preconditions": "Partially received",
    "steps": [
      "Close remaining"
    ],
    "expectedResult": "Open qty cancelled; PO Closed",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-ERP-PUOR-026",
    "featureId": "erp__procurement__purchase-order"
  },
  {
    "title": "Capacity calculation per work center",
    "description": "Capacity calculation per work center.",
    "preconditions": "Work center 8h/day x 2 shifts",
    "steps": [
      "View capacity"
    ],
    "expectedResult": "Capacity 16h/day minus downtime",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-ERP-WOCEMA-017",
    "featureId": "erp__manufacturing__work-center-management"
  },
  {
    "title": "Prevent scheduling on a down work center",
    "description": "Prevent scheduling on a down work center.",
    "preconditions": "Center under maintenance",
    "steps": [
      "Schedule operation"
    ],
    "expectedResult": "Blocked or rescheduled",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-ERP-WOCEMA-018",
    "featureId": "erp__manufacturing__work-center-management"
  },
  {
    "title": "Transfer stock between warehouses",
    "description": "Transfer stock between warehouses.",
    "preconditions": "Stock 50 in WH-A",
    "steps": [
      "Transfer 20 to WH-B",
      "Receive"
    ],
    "expectedResult": "WH-A 30, WH-B 20; in-transit cleared",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ERP-STTR-020",
    "featureId": "erp__supply-chain__stock-transfer"
  },
  {
    "title": "Cannot transfer more than available",
    "description": "Cannot transfer more than available.",
    "preconditions": "Stock 10",
    "steps": [
      "Transfer 15"
    ],
    "expectedResult": "Rejected",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ERP-STTR-021",
    "featureId": "erp__supply-chain__stock-transfer"
  },
  {
    "title": "Forecast from sales history",
    "description": "Forecast from sales history.",
    "preconditions": "12 months history",
    "steps": [
      "Run forecast"
    ],
    "expectedResult": "Forecast per item generated; method and period shown",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-ERP-DEFO-018",
    "featureId": "erp__supply-chain__demand-forecasting"
  },
  {
    "title": "Forecast drives purchase suggestions",
    "description": "Forecast drives purchase suggestions.",
    "preconditions": "Forecast > stock",
    "steps": [
      "Run MRP/reorder"
    ],
    "expectedResult": "Purchase suggestions created",
    "testType": "Integration",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-ERP-DEFO-019",
    "featureId": "erp__supply-chain__demand-forecasting"
  },
  {
    "title": "Auto-match statement lines",
    "description": "Auto-match statement lines.",
    "preconditions": "Imported statement",
    "steps": [
      "Run auto-match"
    ],
    "expectedResult": "Exact amount/date/reference matches reconciled",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ERP-BARE-023",
    "featureId": "erp__finance__bank-reconciliation__n0lmx"
  },
  {
    "title": "Manually reconcile remaining items",
    "description": "Manually reconcile remaining items.",
    "preconditions": "Unmatched lines",
    "steps": [
      "Match manually"
    ],
    "expectedResult": "Reconciled balance equals statement balance",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ERP-BARE-024",
    "featureId": "erp__finance__bank-reconciliation__n0lmx"
  },
  {
    "title": "Prevent editing reconciled transactions",
    "description": "Prevent editing reconciled transactions.",
    "preconditions": "Reconciled entry",
    "steps": [
      "Edit amount"
    ],
    "expectedResult": "Blocked unless un-reconciled",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ERP-BARE-025",
    "featureId": "erp__finance__bank-reconciliation__n0lmx"
  },
  {
    "title": "Straight-line depreciation schedule",
    "description": "Straight-line depreciation schedule.",
    "preconditions": "Asset 12000, 5 years, no salvage",
    "steps": [
      "Capitalise",
      "Run depreciation"
    ],
    "expectedResult": "200 per month posted",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ERP-FIAS-020",
    "featureId": "erp__finance__fixed-assets__k4kd2"
  },
  {
    "title": "Dispose asset with gain/loss",
    "description": "Dispose asset with gain/loss.",
    "preconditions": "Asset partly depreciated",
    "steps": [
      "Dispose for sale price"
    ],
    "expectedResult": "Gain/loss posted, asset removed from register",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ERP-FIAS-021",
    "featureId": "erp__finance__fixed-assets__k4kd2"
  },
  {
    "title": "Lock closed period",
    "description": "Lock closed period.",
    "preconditions": "Period closed",
    "steps": [
      "Post entry dated in closed period"
    ],
    "expectedResult": "Rejected",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ERP-PECLMU-023",
    "featureId": "erp__finance__period-close-and-multi-currency__5967r"
  },
  {
    "title": "FX revaluation at period end",
    "description": "FX revaluation at period end.",
    "preconditions": "Open USD invoices",
    "steps": [
      "Run revaluation"
    ],
    "expectedResult": "Unrealised gain/loss posted at closing rate",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ERP-PECLMU-024",
    "featureId": "erp__finance__period-close-and-multi-currency__5967r"
  },
  {
    "title": "Foreign-currency invoice converts at transaction rate",
    "description": "Foreign-currency invoice converts at transaction rate.",
    "preconditions": "Rate set",
    "steps": [
      "Create USD invoice"
    ],
    "expectedResult": "Base-currency amount stored at that day rate",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-ERP-PECLMU-025",
    "featureId": "erp__finance__period-close-and-multi-currency__5967r"
  },
  {
    "title": "Convert quotation to sales order",
    "description": "Convert quotation to sales order.",
    "preconditions": "Accepted quote",
    "steps": [
      "Convert"
    ],
    "expectedResult": "Sales order with same lines/prices",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ERP-SAOR-026",
    "featureId": "erp__sales-and-distribution__pv4ad__sales-order__b7682"
  },
  {
    "title": "Reserve stock on confirmed order",
    "description": "Reserve stock on confirmed order.",
    "preconditions": "Stock 10",
    "steps": [
      "Confirm order of 4"
    ],
    "expectedResult": "Available stock 6, reserved 4",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ERP-SAOR-027",
    "featureId": "erp__sales-and-distribution__pv4ad__sales-order__b7682"
  },
  {
    "title": "Deliver and invoice order",
    "description": "Deliver and invoice order.",
    "preconditions": "Confirmed order",
    "steps": [
      "Deliver",
      "Invoice"
    ],
    "expectedResult": "Stock issued, invoice posted, order Completed",
    "testType": "Integration",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ERP-SAOR-028",
    "featureId": "erp__sales-and-distribution__pv4ad__sales-order__b7682"
  },
  {
    "title": "Hold order over credit limit",
    "description": "Hold order over credit limit.",
    "preconditions": "Limit 10000, balance 8000",
    "steps": [
      "Create order 5000"
    ],
    "expectedResult": "Order on credit hold pending approval",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ERP-CUCRCO-027",
    "featureId": "erp__sales-and-distribution__pv4ad__customer-credit-control__w9w7v"
  },
  {
    "title": "Only finance can release credit hold",
    "description": "Only finance can release credit hold.",
    "preconditions": "Order on hold",
    "steps": [
      "Release as sales user"
    ],
    "expectedResult": "Blocked; finance can release with log",
    "testType": "Permission",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ERP-CUCRCO-028",
    "featureId": "erp__sales-and-distribution__pv4ad__customer-credit-control__w9w7v"
  },
  {
    "title": "Onboarding checklist created on hire",
    "description": "Onboarding checklist created on hire.",
    "preconditions": "Template with tasks for IT, HR, manager",
    "steps": [
      "Mark candidate hired"
    ],
    "expectedResult": "Checklist assigned with owners and due dates",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HRM-EMON-021",
    "featureId": "hrm__employee-lifecycle__employee-onboarding"
  },
  {
    "title": "Employee account and ID generated",
    "description": "Employee account and ID generated.",
    "preconditions": "",
    "steps": [
      "Complete onboarding"
    ],
    "expectedResult": "Unique employee ID, login and email created",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HRM-EMON-022",
    "featureId": "hrm__employee-lifecycle__employee-onboarding"
  },
  {
    "title": "Block activation without mandatory documents",
    "description": "Block activation without mandatory documents.",
    "preconditions": "Documents required",
    "steps": [
      "Activate without NID/contract"
    ],
    "expectedResult": "Blocked with missing list",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HRM-EMON-023",
    "featureId": "hrm__employee-lifecycle__employee-onboarding"
  },
  {
    "title": "Promotion updates designation and salary effective date",
    "description": "Promotion updates designation and salary effective date.",
    "preconditions": "Employee",
    "steps": [
      "Promote effective next month"
    ],
    "expectedResult": "Designation/salary change applies from effective date; history kept",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HRM-TRPR-027",
    "featureId": "hrm__employee-lifecycle__transfers-and-promotions"
  },
  {
    "title": "Transfer changes department and manager",
    "description": "Transfer changes department and manager.",
    "preconditions": "",
    "steps": [
      "Transfer employee"
    ],
    "expectedResult": "New manager gets approvals; old manager loses access",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HRM-TRPR-028",
    "featureId": "hrm__employee-lifecycle__transfers-and-promotions"
  },
  {
    "title": "Check-in and check-out records hours",
    "description": "Check-in and check-out records hours.",
    "preconditions": "Shift 9-6",
    "steps": [
      "Check in 9:05, out 18:00"
    ],
    "expectedResult": "Worked hours calculated; marked late per grace rule",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HRM-ATTR-017",
    "featureId": "hrm__time-and-attendance__attendance-tracking"
  },
  {
    "title": "Late and absent marking",
    "description": "Late and absent marking.",
    "preconditions": "Grace 10 min",
    "steps": [
      "No check-in for day"
    ],
    "expectedResult": "Marked Absent unless leave/holiday",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-HRM-ATTR-018",
    "featureId": "hrm__time-and-attendance__attendance-tracking"
  },
  {
    "title": "Geo-fenced mobile check-in",
    "description": "Geo-fenced mobile check-in.",
    "preconditions": "Geo-fence on",
    "steps": [
      "Check in outside fence"
    ],
    "expectedResult": "Rejected or flagged",
    "testType": "Security",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-HRM-ATTR-019",
    "featureId": "hrm__time-and-attendance__attendance-tracking"
  },
  {
    "title": "Leave balance deducted on approval",
    "description": "Leave balance deducted on approval.",
    "preconditions": "Balance 10",
    "steps": [
      "Apply 3 days",
      "Approve"
    ],
    "expectedResult": "Balance 7; calendar shows leave",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HRM-LEMA-023",
    "featureId": "hrm__time-and-attendance__leave-management"
  },
  {
    "title": "Cannot apply more than balance",
    "description": "Cannot apply more than balance.",
    "preconditions": "Balance 2",
    "steps": [
      "Apply 3 days"
    ],
    "expectedResult": "Blocked or unpaid per policy",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-HRM-LEMA-024",
    "featureId": "hrm__time-and-attendance__leave-management"
  },
  {
    "title": "Exclude weekends and holidays from leave days",
    "description": "Exclude weekends and holidays from leave days.",
    "preconditions": "Leave across weekend",
    "steps": [
      "Apply Thu-Sun"
    ],
    "expectedResult": "Only working days counted",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HRM-LEMA-025",
    "featureId": "hrm__time-and-attendance__leave-management"
  },
  {
    "title": "Submit weekly timesheet for approval",
    "description": "Submit weekly timesheet for approval.",
    "preconditions": "Employee",
    "steps": [
      "Log hours",
      "Submit"
    ],
    "expectedResult": "Locked, sent to manager; approved hours feed payroll/billing",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HRM-TI-016",
    "featureId": "hrm__time-and-attendance__timesheets"
  },
  {
    "title": "Reject timesheet above daily max",
    "description": "Reject timesheet above daily max.",
    "preconditions": "Max 16h",
    "steps": [
      "Log 20h a day"
    ],
    "expectedResult": "Validation error",
    "testType": "Boundary",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-HRM-TI-017",
    "featureId": "hrm__time-and-attendance__timesheets"
  },
  {
    "title": "Gross salary from components",
    "description": "Gross salary from components.",
    "preconditions": "Basic 50%, HRA 25%, medical 10%, conveyance 15%",
    "steps": [
      "Set gross 50000"
    ],
    "expectedResult": "Components computed and total = gross",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HRM-SAST-021",
    "featureId": "hrm__payroll__salary-structure"
  },
  {
    "title": "Salary revision with arrears",
    "description": "Salary revision with arrears.",
    "preconditions": "Revision effective last month",
    "steps": [
      "Run payroll"
    ],
    "expectedResult": "Arrears for last month included",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HRM-SAST-022",
    "featureId": "hrm__payroll__salary-structure"
  },
  {
    "title": "Income tax deduction per slab",
    "description": "Income tax deduction per slab.",
    "preconditions": "Tax slabs configured",
    "steps": [
      "Run payroll for taxable employee"
    ],
    "expectedResult": "Monthly tax deducted per slab and declarations",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HRM-STDE-027",
    "featureId": "hrm__payroll__statutory-deductions"
  },
  {
    "title": "Provident fund employee and employer share",
    "description": "Provident fund employee and employer share.",
    "preconditions": "PF 10%",
    "steps": [
      "Run payroll"
    ],
    "expectedResult": "Employee and employer PF calculated and posted",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HRM-STDE-028",
    "featureId": "hrm__payroll__statutory-deductions"
  },
  {
    "title": "Set goals with weights totalling 100%",
    "description": "Set goals with weights totalling 100%.",
    "preconditions": "Appraisal cycle open",
    "steps": [
      "Add goals weights 50+30+10"
    ],
    "expectedResult": "Submit blocked until weights = 100%",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-HRM-GOSE-013",
    "featureId": "hrm__performance__goal-setting"
  },
  {
    "title": "Manager approves employee goals",
    "description": "Manager approves employee goals.",
    "preconditions": "Goals submitted",
    "steps": [
      "Approve"
    ],
    "expectedResult": "Goals locked for cycle",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-HRM-GOSE-014",
    "featureId": "hrm__performance__goal-setting"
  },
  {
    "title": "Self and manager review flow",
    "description": "Self and manager review flow.",
    "preconditions": "Cycle open",
    "steps": [
      "Employee self-rates",
      "Manager rates"
    ],
    "expectedResult": "Final score calculated from weighted ratings",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HRM-PEAP-020",
    "featureId": "hrm__performance__performance-appraisal"
  },
  {
    "title": "Employees cannot see others reviews",
    "description": "Employees cannot see others reviews.",
    "preconditions": "",
    "steps": [
      "Open another employee appraisal URL"
    ],
    "expectedResult": "Access denied",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HRM-PEAP-021",
    "featureId": "hrm__performance__performance-appraisal"
  },
  {
    "title": "Enrol employees and record completion",
    "description": "Enrol employees and record completion.",
    "preconditions": "Training scheduled",
    "steps": [
      "Enrol",
      "Mark attendance"
    ],
    "expectedResult": "Completion on employee record; certificate available",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-HRM-TRMA-020",
    "featureId": "hrm__performance__training-management"
  },
  {
    "title": "Seat limit on training session",
    "description": "Seat limit on training session.",
    "preconditions": "Seats 20",
    "steps": [
      "Enrol 21st"
    ],
    "expectedResult": "Waitlisted",
    "testType": "Boundary",
    "priority": "Low",
    "isMandatory": false,
    "id": "TC-HRM-TRMA-021",
    "featureId": "hrm__performance__training-management"
  },
  {
    "title": "Deduct loan instalments in payroll",
    "description": "Deduct loan instalments in payroll.",
    "preconditions": "Loan 12000 over 12 months",
    "steps": [
      "Run payroll"
    ],
    "expectedResult": "1000 deducted monthly; balance reduces",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HRM-LOAD-021",
    "featureId": "hrm__payroll__loans-and-advances__c0gf4"
  },
  {
    "title": "Close loan on final instalment",
    "description": "Close loan on final instalment.",
    "preconditions": "Last instalment",
    "steps": [
      "Run payroll"
    ],
    "expectedResult": "Loan closed; no further deductions",
    "testType": "Boundary",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-HRM-LOAD-022",
    "featureId": "hrm__payroll__loans-and-advances__c0gf4"
  },
  {
    "title": "Submit claim with receipt",
    "description": "Submit claim with receipt.",
    "preconditions": "Employee",
    "steps": [
      "Add expenses + receipts",
      "Submit"
    ],
    "expectedResult": "Sent to manager; total correct",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HRM-EXCLRE-021",
    "featureId": "hrm__payroll__expense-claims-and-reimbursement__h1s5f"
  },
  {
    "title": "Reject claim above policy limit",
    "description": "Reject claim above policy limit.",
    "preconditions": "Meal limit 500",
    "steps": [
      "Claim 800 meal"
    ],
    "expectedResult": "Flagged/blocked by policy",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HRM-EXCLRE-022",
    "featureId": "hrm__payroll__expense-claims-and-reimbursement__h1s5f"
  },
  {
    "title": "Approved claim paid in payroll",
    "description": "Approved claim paid in payroll.",
    "preconditions": "Approved claim",
    "steps": [
      "Run payroll"
    ],
    "expectedResult": "Reimbursement line on payslip",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HRM-EXCLRE-023",
    "featureId": "hrm__payroll__expense-claims-and-reimbursement__h1s5f"
  },
  {
    "title": "Overtime at configured rate",
    "description": "Overtime at configured rate.",
    "preconditions": "OT 1.5x after 8h",
    "steps": [
      "Work 10h"
    ],
    "expectedResult": "2h OT at 1.5x in payroll",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HRM-OVHOCA-022",
    "featureId": "hrm__time-and-attendance__overtime-and-holiday-calendar__3t1wj"
  },
  {
    "title": "Holiday calendar by location",
    "description": "Holiday calendar by location.",
    "preconditions": "Different holidays per branch",
    "steps": [
      "View attendance on holiday"
    ],
    "expectedResult": "Holiday applies only to that branch",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-HRM-OVHOCA-023",
    "featureId": "hrm__time-and-attendance__overtime-and-holiday-calendar__3t1wj"
  },
  {
    "title": "Employee downloads own payslip",
    "description": "Employee downloads own payslip.",
    "preconditions": "Payroll processed",
    "steps": [
      "Open payslips"
    ],
    "expectedResult": "Own payslips only; PDF matches payroll",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HRM-EMSESE-019",
    "featureId": "hrm__employee-self-service__ndq47__employee-self-service-portal__d0moh"
  },
  {
    "title": "Update personal details with HR approval",
    "description": "Update personal details with HR approval.",
    "preconditions": "",
    "steps": [
      "Change bank account"
    ],
    "expectedResult": "Change pending HR approval before payroll uses it",
    "testType": "Security",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-HRM-EMSESE-020",
    "featureId": "hrm__employee-self-service__ndq47__employee-self-service-portal__d0moh"
  },
  {
    "title": "Org chart reflects reporting lines",
    "description": "Org chart reflects reporting lines.",
    "preconditions": "Managers set",
    "steps": [
      "Open org chart"
    ],
    "expectedResult": "Correct hierarchy; changes reflect immediately",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-HRM-ORCHDI-020",
    "featureId": "hrm__employee-self-service__ndq47__org-chart-and-directory__d2e9a"
  },
  {
    "title": "Hide sensitive fields in directory",
    "description": "Hide sensitive fields in directory.",
    "preconditions": "",
    "steps": [
      "View colleague profile"
    ],
    "expectedResult": "Salary/personal data hidden",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HRM-ORCHDI-021",
    "featureId": "hrm__employee-self-service__ndq47__org-chart-and-directory__d2e9a"
  },
  {
    "title": "Create project from template",
    "description": "Create project from template.",
    "preconditions": "Template exists",
    "steps": [
      "Create project from template"
    ],
    "expectedResult": "Tasks, milestones and roles copied; dates shifted to start date",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-PRJ-PRSE-020",
    "featureId": "project-management__planning__project-setup"
  },
  {
    "title": "Archive project hides it but keeps data",
    "description": "Archive project hides it but keeps data.",
    "preconditions": "Project done",
    "steps": [
      "Archive"
    ],
    "expectedResult": "Hidden from active lists; read-only; restorable",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-PRJ-PRSE-021",
    "featureId": "project-management__planning__project-setup"
  },
  {
    "title": "Milestone completion follows its tasks",
    "description": "Milestone completion follows its tasks.",
    "preconditions": "Milestone with 3 tasks",
    "steps": [
      "Complete all tasks"
    ],
    "expectedResult": "Milestone marked complete / ready",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-PRJ-MIMA-024",
    "featureId": "project-management__planning__milestone-management"
  },
  {
    "title": "Overdue milestone flagged",
    "description": "Overdue milestone flagged.",
    "preconditions": "Due date passed",
    "steps": [
      "View project"
    ],
    "expectedResult": "Milestone shown overdue; owner notified",
    "testType": "Integration",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-PRJ-MIMA-025",
    "featureId": "project-management__planning__milestone-management"
  },
  {
    "title": "Warn on over-allocation",
    "description": "Warn on over-allocation.",
    "preconditions": "Member 40h/week",
    "steps": [
      "Assign 50h"
    ],
    "expectedResult": "Over-allocation warning",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-PRJ-REAL-020",
    "featureId": "project-management__planning__resource-allocation"
  },
  {
    "title": "Allocation respects leave",
    "description": "Allocation respects leave.",
    "preconditions": "Member on leave",
    "steps": [
      "Assign during leave"
    ],
    "expectedResult": "Warning shown",
    "testType": "Integration",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-PRJ-REAL-021",
    "featureId": "project-management__planning__resource-allocation"
  },
  {
    "title": "Create, assign and complete task",
    "description": "Create, assign and complete task.",
    "preconditions": "Project member",
    "steps": [
      "Create task with assignee and due date",
      "Complete"
    ],
    "expectedResult": "Assignee notified; status Done; progress updated",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-PRJ-TAMA-021",
    "featureId": "project-management__execution__task-management"
  },
  {
    "title": "Non-member cannot be assigned",
    "description": "Non-member cannot be assigned.",
    "preconditions": "",
    "steps": [
      "Assign task to user outside project"
    ],
    "expectedResult": "Blocked",
    "testType": "Permission",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-PRJ-TAMA-022",
    "featureId": "project-management__execution__task-management"
  },
  {
    "title": "Parent progress from subtasks",
    "description": "Parent progress from subtasks.",
    "preconditions": "Task with 4 subtasks",
    "steps": [
      "Complete 2"
    ],
    "expectedResult": "Parent shows 50%",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-PRJ-SUCH-021",
    "featureId": "project-management__execution__subtasks-and-checklists"
  },
  {
    "title": "Cannot close parent with open subtasks (if rule on)",
    "description": "Cannot close parent with open subtasks (if rule on).",
    "preconditions": "Rule on",
    "steps": [
      "Close parent"
    ],
    "expectedResult": "Blocked with message",
    "testType": "Validation",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-PRJ-SUCH-022",
    "featureId": "project-management__execution__subtasks-and-checklists"
  },
  {
    "title": "Drag card changes status",
    "description": "Drag card changes status.",
    "preconditions": "Board columns",
    "steps": [
      "Drag to In Progress"
    ],
    "expectedResult": "Status updated and saved; visible to others in real time",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-PRJ-KABO-023",
    "featureId": "project-management__execution__kanban-board"
  },
  {
    "title": "WIP limit warning",
    "description": "WIP limit warning.",
    "preconditions": "WIP 3",
    "steps": [
      "Move 4th card"
    ],
    "expectedResult": "Warning or block",
    "testType": "Boundary",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-PRJ-KABO-024",
    "featureId": "project-management__execution__kanban-board"
  },
  {
    "title": "@mention notifies user",
    "description": "@mention notifies user.",
    "preconditions": "",
    "steps": [
      "Comment with @user"
    ],
    "expectedResult": "User notified with link to task",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-PRJ-COME-016",
    "featureId": "project-management__collaboration__comments-and-mentions"
  },
  {
    "title": "Edit/delete only own comments",
    "description": "Edit/delete only own comments.",
    "preconditions": "",
    "steps": [
      "Edit another user comment"
    ],
    "expectedResult": "Not allowed",
    "testType": "Permission",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-PRJ-COME-017",
    "featureId": "project-management__collaboration__comments-and-mentions"
  },
  {
    "title": "Private workspace not visible to non-members",
    "description": "Private workspace not visible to non-members.",
    "preconditions": "Private workspace",
    "steps": [
      "Open as non-member"
    ],
    "expectedResult": "Access denied; not in search",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-PRJ-TEWO-018",
    "featureId": "project-management__collaboration__team-workspace"
  },
  {
    "title": "Workload per member matches assigned estimates",
    "description": "Workload per member matches assigned estimates.",
    "preconditions": "Tasks with estimates",
    "steps": [
      "Open workload"
    ],
    "expectedResult": "Hours per member per week correct",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-PRJ-WORE-017",
    "featureId": "project-management__tracking__workload-report"
  },
  {
    "title": "Burndown reflects completed points",
    "description": "Burndown reflects completed points.",
    "preconditions": "Sprint 30 points",
    "steps": [
      "Complete 10 points"
    ],
    "expectedResult": "Remaining line drops to 20 that day",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-PRJ-BUCH-016",
    "featureId": "project-management__tracking__burndown-chart"
  },
  {
    "title": "Scope change shown on burndown",
    "description": "Scope change shown on burndown.",
    "preconditions": "",
    "steps": [
      "Add task mid-sprint"
    ],
    "expectedResult": "Scope increase visible",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-PRJ-BUCH-017",
    "featureId": "project-management__tracking__burndown-chart"
  },
  {
    "title": "Finish-to-start shifts successor dates",
    "description": "Finish-to-start shifts successor dates.",
    "preconditions": "A→B dependency",
    "steps": [
      "Delay A by 2 days"
    ],
    "expectedResult": "B moves 2 days",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-PRJ-TADE-024",
    "featureId": "project-management__planning__task-dependencies__fh9ep"
  },
  {
    "title": "Prevent circular dependency",
    "description": "Prevent circular dependency.",
    "preconditions": "A→B",
    "steps": [
      "Add B→A"
    ],
    "expectedResult": "Rejected",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-PRJ-TADE-025",
    "featureId": "project-management__planning__task-dependencies__fh9ep"
  },
  {
    "title": "Cannot start blocked task",
    "description": "Cannot start blocked task.",
    "preconditions": "Predecessor open",
    "steps": [
      "Start successor"
    ],
    "expectedResult": "Warning/block",
    "testType": "Validation",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-PRJ-TADE-026",
    "featureId": "project-management__planning__task-dependencies__fh9ep"
  },
  {
    "title": "Weekly recurring task generates next occurrence",
    "description": "Weekly recurring task generates next occurrence.",
    "preconditions": "Recurs weekly",
    "steps": [
      "Complete this week"
    ],
    "expectedResult": "Next week task created once",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-PRJ-RETATE-025",
    "featureId": "project-management__execution__recurring-tasks-and-templates__as759"
  },
  {
    "title": "Stop recurrence",
    "description": "Stop recurrence.",
    "preconditions": "",
    "steps": [
      "End recurrence"
    ],
    "expectedResult": "No new tasks generated",
    "testType": "Functional",
    "priority": "Low",
    "isMandatory": false,
    "id": "TC-PRJ-RETATE-026",
    "featureId": "project-management__execution__recurring-tasks-and-templates__as759"
  },
  {
    "title": "Portfolio shows project RAG status",
    "description": "Portfolio shows project RAG status.",
    "preconditions": "Projects with health set",
    "steps": [
      "Open portfolio"
    ],
    "expectedResult": "Status, progress, budget per project correct",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-PRJ-POOV-021",
    "featureId": "project-management__portfolio-and-clients__apq3y__portfolio-overview__gki9u"
  },
  {
    "title": "Guest sees only shared project",
    "description": "Guest sees only shared project.",
    "preconditions": "Guest invited to project A",
    "steps": [
      "Sign in as guest"
    ],
    "expectedResult": "Only project A visible; internal tasks hidden",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-PRJ-CLPOGU-032",
    "featureId": "project-management__portfolio-and-clients__apq3y__client-portal-and-guest-access__37vet"
  },
  {
    "title": "Client approves deliverable",
    "description": "Client approves deliverable.",
    "preconditions": "Deliverable awaiting approval",
    "steps": [
      "Approve as client"
    ],
    "expectedResult": "Status Approved with timestamp",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-PRJ-CLPOGU-033",
    "featureId": "project-management__portfolio-and-clients__apq3y__client-portal-and-guest-access__37vet"
  },
  {
    "title": "Create item with unique SKU and barcode",
    "description": "Create item with unique SKU and barcode.",
    "preconditions": "",
    "steps": [
      "Create item with SKU and barcode"
    ],
    "expectedResult": "Saved; duplicate SKU/barcode rejected",
    "testType": "Validation",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-INV-ITMA-017",
    "featureId": "inventory-management__stock-control__item-master"
  },
  {
    "title": "Scan barcode finds item",
    "description": "Scan barcode finds item.",
    "preconditions": "Item with barcode",
    "steps": [
      "Scan in search"
    ],
    "expectedResult": "Correct item opened",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-INV-ITMA-018",
    "featureId": "inventory-management__stock-control__item-master"
  },
  {
    "title": "On-hand, reserved and available calculated",
    "description": "On-hand, reserved and available calculated.",
    "preconditions": "On hand 10, reserved 3",
    "steps": [
      "View item"
    ],
    "expectedResult": "Available = 7 in all views",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-INV-STLE-019",
    "featureId": "inventory-management__stock-control__stock-levels"
  },
  {
    "title": "Negative stock prevented (if disabled)",
    "description": "Negative stock prevented (if disabled).",
    "preconditions": "Stock 2",
    "steps": [
      "Issue 3"
    ],
    "expectedResult": "Blocked",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-INV-STLE-020",
    "featureId": "inventory-management__stock-control__stock-levels"
  },
  {
    "title": "Receive serialised items with unique serials",
    "description": "Receive serialised items with unique serials.",
    "preconditions": "Serial-tracked item",
    "steps": [
      "Receive 3 with serials"
    ],
    "expectedResult": "3 unique serials; duplicate serial rejected",
    "testType": "Validation",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-INV-BASETR-021",
    "featureId": "inventory-management__stock-control__batch-and-serial-tracking"
  },
  {
    "title": "Trace batch from receipt to customer",
    "description": "Trace batch from receipt to customer.",
    "preconditions": "Batch received and sold",
    "steps": [
      "Search batch"
    ],
    "expectedResult": "Shows supplier receipt and all sales/customers",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-INV-BASETR-022",
    "featureId": "inventory-management__stock-control__batch-and-serial-tracking"
  },
  {
    "title": "Create warehouse with zones",
    "description": "Create warehouse with zones.",
    "preconditions": "Admin",
    "steps": [
      "Create warehouse and zones"
    ],
    "expectedResult": "Available for receipts/transfers",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-INV-WASE-022",
    "featureId": "inventory-management__warehouse__warehouse-setup"
  },
  {
    "title": "Cannot delete warehouse with stock",
    "description": "Cannot delete warehouse with stock.",
    "preconditions": "Warehouse has stock",
    "steps": [
      "Delete"
    ],
    "expectedResult": "Blocked",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-INV-WASE-023",
    "featureId": "inventory-management__warehouse__warehouse-setup"
  },
  {
    "title": "Put-away to suggested bin",
    "description": "Put-away to suggested bin.",
    "preconditions": "Bin rules",
    "steps": [
      "Receive goods"
    ],
    "expectedResult": "Bin suggested; stock recorded in that bin",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-INV-BILOMA-020",
    "featureId": "inventory-management__warehouse__bin-location-management"
  },
  {
    "title": "Bin capacity limit",
    "description": "Bin capacity limit.",
    "preconditions": "Bin capacity 100",
    "steps": [
      "Put away 120"
    ],
    "expectedResult": "Warning/block",
    "testType": "Boundary",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-INV-BILOMA-021",
    "featureId": "inventory-management__warehouse__bin-location-management"
  },
  {
    "title": "Transfer with in-transit status",
    "description": "Transfer with in-transit status.",
    "preconditions": "Stock in WH-A",
    "steps": [
      "Ship to WH-B",
      "Receive"
    ],
    "expectedResult": "In-transit while shipped; balances correct after receipt",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-INV-STTR-022",
    "featureId": "inventory-management__warehouse__stock-transfer"
  },
  {
    "title": "Partial receipt of transfer",
    "description": "Partial receipt of transfer.",
    "preconditions": "Shipped 10",
    "steps": [
      "Receive 8"
    ],
    "expectedResult": "Discrepancy of 2 recorded",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-INV-STTR-023",
    "featureId": "inventory-management__warehouse__stock-transfer"
  },
  {
    "title": "Count variance posts adjustment",
    "description": "Count variance posts adjustment.",
    "preconditions": "System 50",
    "steps": [
      "Count 48",
      "Approve"
    ],
    "expectedResult": "Adjustment -2 posted with reason; valuation updated",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-INV-CYCO-014",
    "featureId": "inventory-management__warehouse__cycle-count"
  },
  {
    "title": "Freeze bin during count",
    "description": "Freeze bin during count.",
    "preconditions": "Count in progress",
    "steps": [
      "Pick from counted bin"
    ],
    "expectedResult": "Blocked or warned",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-INV-CYCO-015",
    "featureId": "inventory-management__warehouse__cycle-count"
  },
  {
    "title": "Reorder suggestion at min level",
    "description": "Reorder suggestion at min level.",
    "preconditions": "Min 10, reorder qty 50",
    "steps": [
      "Stock drops to 9"
    ],
    "expectedResult": "Purchase suggestion for 50 created",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-INV-REPO-024",
    "featureId": "inventory-management__purchasing__reorder-point"
  },
  {
    "title": "Lead time considered",
    "description": "Lead time considered.",
    "preconditions": "Lead time 7 days",
    "steps": [
      "View suggestions"
    ],
    "expectedResult": "Reorder point uses daily usage x lead time",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-INV-REPO-025",
    "featureId": "inventory-management__purchasing__reorder-point"
  },
  {
    "title": "PO received increases stock",
    "description": "PO received increases stock.",
    "preconditions": "Approved PO",
    "steps": [
      "Receive full"
    ],
    "expectedResult": "Stock increased; PO Closed",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-INV-PUOR-019",
    "featureId": "inventory-management__purchasing__purchase-order"
  },
  {
    "title": "Over-receipt tolerance",
    "description": "Over-receipt tolerance.",
    "preconditions": "Tolerance 5%",
    "steps": [
      "Receive 110 of 100"
    ],
    "expectedResult": "Blocked beyond tolerance",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-INV-PUOR-020",
    "featureId": "inventory-management__purchasing__purchase-order"
  },
  {
    "title": "Supplier price list used on PO",
    "description": "Supplier price list used on PO.",
    "preconditions": "Supplier price set",
    "steps": [
      "Create PO"
    ],
    "expectedResult": "Supplier price defaults on line",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-INV-SUMA-016",
    "featureId": "inventory-management__purchasing__supplier-management"
  },
  {
    "title": "Inactive supplier cannot be used",
    "description": "Inactive supplier cannot be used.",
    "preconditions": "Supplier inactive",
    "steps": [
      "Create PO"
    ],
    "expectedResult": "Not selectable",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-INV-SUMA-017",
    "featureId": "inventory-management__purchasing__supplier-management"
  },
  {
    "title": "Allocate stock to order",
    "description": "Allocate stock to order.",
    "preconditions": "Stock available",
    "steps": [
      "Confirm order"
    ],
    "expectedResult": "Stock reserved; fulfilment status Allocated",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-INV-SAORFU-022",
    "featureId": "inventory-management__outbound__sales-order-fulfilment"
  },
  {
    "title": "Backorder when short",
    "description": "Backorder when short.",
    "preconditions": "Stock 3, order 5",
    "steps": [
      "Confirm"
    ],
    "expectedResult": "3 allocated, 2 backordered",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-INV-SAORFU-023",
    "featureId": "inventory-management__outbound__sales-order-fulfilment"
  },
  {
    "title": "Pick list by bin route",
    "description": "Pick list by bin route.",
    "preconditions": "Allocated orders",
    "steps": [
      "Generate pick list"
    ],
    "expectedResult": "Lines grouped by bin in walk order",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-INV-PIPA-017",
    "featureId": "inventory-management__outbound__picking-and-packing"
  },
  {
    "title": "Scan-to-pack validates items",
    "description": "Scan-to-pack validates items.",
    "preconditions": "Pick done",
    "steps": [
      "Scan wrong item"
    ],
    "expectedResult": "Error; cannot pack",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-INV-PIPA-018",
    "featureId": "inventory-management__outbound__picking-and-packing"
  },
  {
    "title": "Purchase in boxes, stock in pieces",
    "description": "Purchase in boxes, stock in pieces.",
    "preconditions": "1 box = 12 pcs",
    "steps": [
      "Receive 2 boxes"
    ],
    "expectedResult": "Stock +24 pcs",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-INV-UNOFME-020",
    "featureId": "inventory-management__stock-control__units-of-measure-and-conversion__q2rfi"
  },
  {
    "title": "Cost per unit converts correctly",
    "description": "Cost per unit converts correctly.",
    "preconditions": "Box cost 120",
    "steps": [
      "Receive box"
    ],
    "expectedResult": "Unit cost 10",
    "testType": "Boundary",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-INV-UNOFME-021",
    "featureId": "inventory-management__stock-control__units-of-measure-and-conversion__q2rfi"
  },
  {
    "title": "FEFO picks earliest expiry",
    "description": "FEFO picks earliest expiry.",
    "preconditions": "Batches exp Jan and Mar",
    "steps": [
      "Pick order"
    ],
    "expectedResult": "Jan batch picked first",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-INV-EXFEMA-018",
    "featureId": "inventory-management__stock-control__expiry-and-fefo-management__xtkrh"
  },
  {
    "title": "Block expired stock",
    "description": "Block expired stock.",
    "preconditions": "Batch expired",
    "steps": [
      "Allocate to order"
    ],
    "expectedResult": "Not allocatable; shown in expired report",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-INV-EXFEMA-019",
    "featureId": "inventory-management__stock-control__expiry-and-fefo-management__xtkrh"
  },
  {
    "title": "Near-expiry alert",
    "description": "Near-expiry alert.",
    "preconditions": "Alert 30 days",
    "steps": [
      "Batch expires in 25 days"
    ],
    "expectedResult": "Alert raised",
    "testType": "Integration",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-INV-EXFEMA-020",
    "featureId": "inventory-management__stock-control__expiry-and-fefo-management__xtkrh"
  },
  {
    "title": "Return restocks good items",
    "description": "Return restocks good items.",
    "preconditions": "Delivered order",
    "steps": [
      "Create RMA",
      "Inspect Good",
      "Restock"
    ],
    "expectedResult": "Stock increased; credit note raised",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-INV-SARERM-023",
    "featureId": "inventory-management__outbound__sales-returns-and-rma__obeja"
  },
  {
    "title": "Damaged return to scrap",
    "description": "Damaged return to scrap.",
    "preconditions": "RMA",
    "steps": [
      "Inspect Damaged"
    ],
    "expectedResult": "Moved to scrap/quarantine, not available",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-INV-SARERM-024",
    "featureId": "inventory-management__outbound__sales-returns-and-rma__obeja"
  },
  {
    "title": "Ledger balances to on-hand",
    "description": "Ledger balances to on-hand.",
    "preconditions": "Movements recorded",
    "steps": [
      "Open ledger for item"
    ],
    "expectedResult": "Running balance equals current on-hand",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-INV-STMOLE-031",
    "featureId": "inventory-management__reporting__stock-movement-ledger__a5eqp"
  },
  {
    "title": "Register patient with unique MRN",
    "description": "Register patient with unique MRN.",
    "preconditions": "",
    "steps": [
      "Register new patient"
    ],
    "expectedResult": "Unique MRN generated",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HLT-PARE-022",
    "featureId": "healthcare-management__patient-management__patient-registration"
  },
  {
    "title": "Detect duplicate patient by name, DOB and phone",
    "description": "Detect duplicate patient by name, DOB and phone.",
    "preconditions": "Patient exists",
    "steps": [
      "Register same details"
    ],
    "expectedResult": "Duplicate warning with match",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-HLT-PARE-023",
    "featureId": "healthcare-management__patient-management__patient-registration"
  },
  {
    "title": "Mandatory demographics validation",
    "description": "Mandatory demographics validation.",
    "preconditions": "",
    "steps": [
      "Save without DOB/phone"
    ],
    "expectedResult": "Field errors",
    "testType": "Validation",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-HLT-PARE-024",
    "featureId": "healthcare-management__patient-management__patient-registration"
  },
  {
    "title": "Patient sees only own records",
    "description": "Patient sees only own records.",
    "preconditions": "Two patients",
    "steps": [
      "Change record ID in URL"
    ],
    "expectedResult": "Access denied",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HLT-PAPO-022",
    "featureId": "healthcare-management__patient-management__patient-portal"
  },
  {
    "title": "Book appointment from portal",
    "description": "Book appointment from portal.",
    "preconditions": "Slots available",
    "steps": [
      "Book"
    ],
    "expectedResult": "Appointment confirmed and in doctor schedule",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HLT-PAPO-023",
    "featureId": "healthcare-management__patient-management__patient-portal"
  },
  {
    "title": "Verify active coverage before visit",
    "description": "Verify active coverage before visit.",
    "preconditions": "Insurance details",
    "steps": [
      "Run eligibility check"
    ],
    "expectedResult": "Coverage, co-pay and validity returned and saved",
    "testType": "Integration",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HLT-INVE-026",
    "featureId": "healthcare-management__patient-management__insurance-verification"
  },
  {
    "title": "Expired policy flagged",
    "description": "Expired policy flagged.",
    "preconditions": "Expired policy",
    "steps": [
      "Check in"
    ],
    "expectedResult": "Warning; self-pay option",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HLT-INVE-027",
    "featureId": "healthcare-management__patient-management__insurance-verification"
  },
  {
    "title": "Complete consultation with diagnosis and notes",
    "description": "Complete consultation with diagnosis and notes.",
    "preconditions": "Checked-in patient",
    "steps": [
      "Open visit",
      "Add diagnosis, notes",
      "Close"
    ],
    "expectedResult": "Encounter saved and on patient history",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HLT-DOCO-030",
    "featureId": "healthcare-management__clinical__doctor-consultation"
  },
  {
    "title": "Only assigned/authorised doctor can edit notes",
    "description": "Only assigned/authorised doctor can edit notes.",
    "preconditions": "",
    "steps": [
      "Edit as other doctor"
    ],
    "expectedResult": "Read-only or blocked; edits audited",
    "testType": "Permission",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HLT-DOCO-031",
    "featureId": "healthcare-management__clinical__doctor-consultation"
  },
  {
    "title": "Drug allergy interaction alert",
    "description": "Drug allergy interaction alert.",
    "preconditions": "Patient allergic to penicillin",
    "steps": [
      "Prescribe amoxicillin"
    ],
    "expectedResult": "Hard alert shown; override needs reason",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HLT-PRMA-020",
    "featureId": "healthcare-management__clinical__prescription-management"
  },
  {
    "title": "Prescription dosage validation",
    "description": "Prescription dosage validation.",
    "preconditions": "",
    "steps": [
      "Enter dose above max"
    ],
    "expectedResult": "Warning shown",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HLT-PRMA-021",
    "featureId": "healthcare-management__clinical__prescription-management"
  },
  {
    "title": "Printed / e-prescription matches order",
    "description": "Printed / e-prescription matches order.",
    "preconditions": "",
    "steps": [
      "Finalise prescription"
    ],
    "expectedResult": "PDF shows drug, dose, frequency, duration, doctor",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-HLT-PRMA-022",
    "featureId": "healthcare-management__clinical__prescription-management"
  },
  {
    "title": "Admit patient to bed",
    "description": "Admit patient to bed.",
    "preconditions": "Bed available",
    "steps": [
      "Admit"
    ],
    "expectedResult": "Bed occupied; inpatient record created",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HLT-ADDI-029",
    "featureId": "healthcare-management__inpatient__admission-and-discharge"
  },
  {
    "title": "Discharge requires cleared bill or approval",
    "description": "Discharge requires cleared bill or approval.",
    "preconditions": "Unpaid bill",
    "steps": [
      "Discharge"
    ],
    "expectedResult": "Blocked or needs approval; discharge summary generated",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HLT-ADDI-030",
    "featureId": "healthcare-management__inpatient__admission-and-discharge"
  },
  {
    "title": "Bed status board accurate",
    "description": "Bed status board accurate.",
    "preconditions": "Beds in use",
    "steps": [
      "View board"
    ],
    "expectedResult": "Occupied, free, cleaning counts correct",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-HLT-BEMA-021",
    "featureId": "healthcare-management__inpatient__bed-management"
  },
  {
    "title": "Cannot assign occupied bed",
    "description": "Cannot assign occupied bed.",
    "preconditions": "Bed occupied",
    "steps": [
      "Assign another patient"
    ],
    "expectedResult": "Blocked",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HLT-BEMA-022",
    "featureId": "healthcare-management__inpatient__bed-management"
  },
  {
    "title": "Bill charges from services and pharmacy",
    "description": "Bill charges from services and pharmacy.",
    "preconditions": "Visit with services",
    "steps": [
      "Generate bill"
    ],
    "expectedResult": "All charges itemised; totals correct",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HLT-BICL-019",
    "featureId": "healthcare-management__pharmacy-and-billing__billing-and-claims"
  },
  {
    "title": "Insurance split between payer and patient",
    "description": "Insurance split between payer and patient.",
    "preconditions": "Co-pay 20%",
    "steps": [
      "Bill 1000"
    ],
    "expectedResult": "Payer 800, patient 200; claim created",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-HLT-BICL-020",
    "featureId": "healthcare-management__pharmacy-and-billing__billing-and-claims"
  },
  {
    "title": "Rejected claim workflow",
    "description": "Rejected claim workflow.",
    "preconditions": "Claim rejected",
    "steps": [
      "Record rejection"
    ],
    "expectedResult": "Reason stored; resubmission possible",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-HLT-BICL-021",
    "featureId": "healthcare-management__pharmacy-and-billing__billing-and-claims"
  },
  {
    "title": "Record vitals with abnormal flags",
    "description": "Record vitals with abnormal flags.",
    "preconditions": "",
    "steps": [
      "Enter BP 190/120"
    ],
    "expectedResult": "Value flagged abnormal; trend chart updated",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HLT-VICLCH-019",
    "featureId": "healthcare-management__clinical__vitals-and-clinical-charting__3fzvb"
  },
  {
    "title": "Allergies visible on every clinical screen",
    "description": "Allergies visible on every clinical screen.",
    "preconditions": "Allergy recorded",
    "steps": [
      "Open orders/prescription"
    ],
    "expectedResult": "Allergy banner shown",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HLT-VICLCH-020",
    "featureId": "healthcare-management__clinical__vitals-and-clinical-charting__3fzvb"
  },
  {
    "title": "Triage level sets queue priority",
    "description": "Triage level sets queue priority.",
    "preconditions": "Triage levels 1-5",
    "steps": [
      "Register level 1 and level 4"
    ],
    "expectedResult": "Level 1 at top of queue",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HLT-EMTR-017",
    "featureId": "healthcare-management__emergency-and-telehealth__salk9__emergency-triage__2j7fw"
  },
  {
    "title": "Register unknown patient",
    "description": "Register unknown patient.",
    "preconditions": "",
    "steps": [
      "Register without ID"
    ],
    "expectedResult": "Temporary ID; merge later",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HLT-EMTR-018",
    "featureId": "healthcare-management__emergency-and-telehealth__salk9__emergency-triage__2j7fw"
  },
  {
    "title": "Join secure video visit",
    "description": "Join secure video visit.",
    "preconditions": "Booked telehealth",
    "steps": [
      "Patient and doctor join link"
    ],
    "expectedResult": "Video connects; link expires after visit",
    "testType": "Integration",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HLT-TECO-018",
    "featureId": "healthcare-management__emergency-and-telehealth__salk9__telemedicine-consultation__bj8pd"
  },
  {
    "title": "Unauthorised user cannot join",
    "description": "Unauthorised user cannot join.",
    "preconditions": "Visit link",
    "steps": [
      "Open as other user"
    ],
    "expectedResult": "Denied",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HLT-TECO-019",
    "featureId": "healthcare-management__emergency-and-telehealth__salk9__telemedicine-consultation__bj8pd"
  },
  {
    "title": "Create and publish course",
    "description": "Create and publish course.",
    "preconditions": "Instructor",
    "steps": [
      "Create course",
      "Add lessons",
      "Publish"
    ],
    "expectedResult": "Visible in catalog; draft content hidden",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-LMS-COCR-021",
    "featureId": "learning-management-system__course-management__course-creation"
  },
  {
    "title": "Cannot publish empty course",
    "description": "Cannot publish empty course.",
    "preconditions": "No lessons",
    "steps": [
      "Publish"
    ],
    "expectedResult": "Blocked with message",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-LMS-COCR-022",
    "featureId": "learning-management-system__course-management__course-creation"
  },
  {
    "title": "Upload video and stream with resume",
    "description": "Upload video and stream with resume.",
    "preconditions": "MP4 file",
    "steps": [
      "Upload",
      "Play",
      "Leave at 2:00",
      "Return"
    ],
    "expectedResult": "Plays; resumes at 2:00",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-LMS-COUP-025",
    "featureId": "learning-management-system__course-management__content-upload"
  },
  {
    "title": "Protect content from direct download",
    "description": "Protect content from direct download.",
    "preconditions": "",
    "steps": [
      "Open video URL outside course"
    ],
    "expectedResult": "Signed/expiring URL; no access",
    "testType": "Security",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-LMS-COUP-026",
    "featureId": "learning-management-system__course-management__content-upload"
  },
  {
    "title": "Search and filter courses",
    "description": "Search and filter courses.",
    "preconditions": "Courses with categories",
    "steps": [
      "Search + filter level"
    ],
    "expectedResult": "Only matching published courses",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-LMS-COCA-017",
    "featureId": "learning-management-system__course-management__course-catalog"
  },
  {
    "title": "Issue certificate on completion",
    "description": "Issue certificate on completion.",
    "preconditions": "Course with pass mark 70%",
    "steps": [
      "Complete with 80%"
    ],
    "expectedResult": "Certificate with unique ID generated and downloadable",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-LMS-CE-021",
    "featureId": "learning-management-system__learner-experience__certificates"
  },
  {
    "title": "Verify certificate by ID",
    "description": "Verify certificate by ID.",
    "preconditions": "Certificate issued",
    "steps": [
      "Open public verify URL"
    ],
    "expectedResult": "Shows learner, course, date; fake ID not found",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-LMS-CE-022",
    "featureId": "learning-management-system__learner-experience__certificates"
  },
  {
    "title": "No certificate below pass mark",
    "description": "No certificate below pass mark.",
    "preconditions": "",
    "steps": [
      "Finish with 60%"
    ],
    "expectedResult": "No certificate",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-LMS-CE-023",
    "featureId": "learning-management-system__learner-experience__certificates"
  },
  {
    "title": "Submit assignment before deadline",
    "description": "Submit assignment before deadline.",
    "preconditions": "Assignment open",
    "steps": [
      "Upload file",
      "Submit"
    ],
    "expectedResult": "Submitted with timestamp; instructor notified",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-LMS-ASSU-018",
    "featureId": "learning-management-system__assessment__assignment-submission"
  },
  {
    "title": "Late submission handling",
    "description": "Late submission handling.",
    "preconditions": "Deadline passed",
    "steps": [
      "Submit"
    ],
    "expectedResult": "Marked late or blocked per setting",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-LMS-ASSU-019",
    "featureId": "learning-management-system__assessment__assignment-submission"
  },
  {
    "title": "Grade with rubric",
    "description": "Grade with rubric.",
    "preconditions": "Rubric 3 criteria",
    "steps": [
      "Score each criterion"
    ],
    "expectedResult": "Total calculated; learner sees feedback",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-LMS-GRRU-017",
    "featureId": "learning-management-system__assessment__grading-and-rubrics"
  },
  {
    "title": "Grades hidden until released",
    "description": "Grades hidden until released.",
    "preconditions": "Release later",
    "steps": [
      "View as learner"
    ],
    "expectedResult": "Grade not visible until released",
    "testType": "Permission",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-LMS-GRRU-018",
    "featureId": "learning-management-system__assessment__grading-and-rubrics"
  },
  {
    "title": "Quiz time limit auto-submits",
    "description": "Quiz time limit auto-submits.",
    "preconditions": "Limit 30 min",
    "steps": [
      "Let time run out"
    ],
    "expectedResult": "Auto-submitted with answers so far",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-LMS-PRRU-016",
    "featureId": "learning-management-system__assessment__proctoring-rules"
  },
  {
    "title": "Detect tab switch / limit attempts",
    "description": "Detect tab switch / limit attempts.",
    "preconditions": "Max 1 attempt",
    "steps": [
      "Retake quiz"
    ],
    "expectedResult": "Blocked; tab switches logged",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-LMS-PRRU-017",
    "featureId": "learning-management-system__assessment__proctoring-rules"
  },
  {
    "title": "Post and reply in course forum",
    "description": "Post and reply in course forum.",
    "preconditions": "Enrolled learner",
    "steps": [
      "Post",
      "Reply"
    ],
    "expectedResult": "Visible to course members only",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-LMS-DIFO-016",
    "featureId": "learning-management-system__engagement__discussion-forum"
  },
  {
    "title": "Moderator removes post",
    "description": "Moderator removes post.",
    "preconditions": "",
    "steps": [
      "Delete abusive post"
    ],
    "expectedResult": "Removed and logged",
    "testType": "Permission",
    "priority": "Low",
    "isMandatory": false,
    "id": "TC-LMS-DIFO-017",
    "featureId": "learning-management-system__engagement__discussion-forum"
  },
  {
    "title": "Announcement notifies enrolled learners",
    "description": "Announcement notifies enrolled learners.",
    "preconditions": "Course with learners",
    "steps": [
      "Post announcement"
    ],
    "expectedResult": "All enrolled notified by email/in-app",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-LMS-AN-022",
    "featureId": "learning-management-system__engagement__announcements"
  },
  {
    "title": "Instructor sees only own courses",
    "description": "Instructor sees only own courses.",
    "preconditions": "Two instructors",
    "steps": [
      "Open other course edit"
    ],
    "expectedResult": "Denied",
    "testType": "Permission",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-LMS-INMA-021",
    "featureId": "learning-management-system__administration__instructor-management"
  },
  {
    "title": "Completion report accurate",
    "description": "Completion report accurate.",
    "preconditions": "Learners progressed",
    "steps": [
      "Run report"
    ],
    "expectedResult": "Completion % per learner matches progress",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-LMS-REAN-025",
    "featureId": "learning-management-system__administration__reports-and-analytics"
  },
  {
    "title": "Lesson locked until prerequisite done",
    "description": "Lesson locked until prerequisite done.",
    "preconditions": "Lesson 2 requires lesson 1",
    "steps": [
      "Open lesson 2"
    ],
    "expectedResult": "Locked with message",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-LMS-DRCOPR-025",
    "featureId": "learning-management-system__learner-experience__drip-content-and-prerequisites__s29gp"
  },
  {
    "title": "Drip unlock after N days",
    "description": "Drip unlock after N days.",
    "preconditions": "Unlock day 7",
    "steps": [
      "Check day 6 and 7"
    ],
    "expectedResult": "Unlocked on day 7 only",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-LMS-DRCOPR-026",
    "featureId": "learning-management-system__learner-experience__drip-content-and-prerequisites__s29gp"
  },
  {
    "title": "Offline progress syncs",
    "description": "Offline progress syncs.",
    "preconditions": "Downloaded lesson",
    "steps": [
      "Complete offline",
      "Reconnect"
    ],
    "expectedResult": "Progress synced",
    "testType": "Integration",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-LMS-MOOFLE-021",
    "featureId": "learning-management-system__learner-experience__mobile-and-offline-learning__ik4gp"
  },
  {
    "title": "Purchase grants enrolment",
    "description": "Purchase grants enrolment.",
    "preconditions": "Paid course",
    "steps": [
      "Pay with test card"
    ],
    "expectedResult": "Enrolled immediately; receipt emailed",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-LMS-COPACO-023",
    "featureId": "learning-management-system__commerce__3bcy2__course-payments-and-coupons__qx6r7"
  },
  {
    "title": "Refund removes access",
    "description": "Refund removes access.",
    "preconditions": "Purchased course",
    "steps": [
      "Refund"
    ],
    "expectedResult": "Access removed",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-LMS-COPACO-024",
    "featureId": "learning-management-system__commerce__3bcy2__course-payments-and-coupons__qx6r7"
  },
  {
    "title": "Import SCORM package and track score",
    "description": "Import SCORM package and track score.",
    "preconditions": "SCORM 1.2 zip",
    "steps": [
      "Upload",
      "Complete"
    ],
    "expectedResult": "Completion and score recorded",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-LMS-SCXACO-018",
    "featureId": "learning-management-system__administration__scorm-xapi-compliance__ppjkk"
  },
  {
    "title": "Reject invalid package",
    "description": "Reject invalid package.",
    "preconditions": "Zip without manifest",
    "steps": [
      "Upload"
    ],
    "expectedResult": "Clear error",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-LMS-SCXACO-019",
    "featureId": "learning-management-system__administration__scorm-xapi-compliance__ppjkk"
  },
  {
    "title": "Publish listing with price, area and location",
    "description": "Publish listing with price, area and location.",
    "preconditions": "Agent",
    "steps": [
      "Create listing",
      "Publish"
    ],
    "expectedResult": "Visible on portal with correct details/map",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-RES-PRLI-017",
    "featureId": "real-estate-management__property__property-listing"
  },
  {
    "title": "Hide sold/rented listing",
    "description": "Hide sold/rented listing.",
    "preconditions": "Listing sold",
    "steps": [
      "Mark Sold"
    ],
    "expectedResult": "Removed from active search",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-RES-PRLI-018",
    "featureId": "real-estate-management__property__property-listing"
  },
  {
    "title": "Tenant profile with KYC documents",
    "description": "Tenant profile with KYC documents.",
    "preconditions": "",
    "steps": [
      "Create tenant with NID"
    ],
    "expectedResult": "Saved; required documents enforced",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-RES-TEMA-021",
    "featureId": "real-estate-management__leasing__tenant-management"
  },
  {
    "title": "Tenant portal shows own lease and dues",
    "description": "Tenant portal shows own lease and dues.",
    "preconditions": "Two tenants",
    "steps": [
      "Open other tenant dues"
    ],
    "expectedResult": "Denied",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-RES-TEMA-022",
    "featureId": "real-estate-management__leasing__tenant-management"
  },
  {
    "title": "Capture buyer lead with requirements",
    "description": "Capture buyer lead with requirements.",
    "preconditions": "",
    "steps": [
      "Create lead with budget/location"
    ],
    "expectedResult": "Matching listings suggested",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-RES-BULEMA-019",
    "featureId": "real-estate-management__sales__buyer-lead-management"
  },
  {
    "title": "Assign lead to agent",
    "description": "Assign lead to agent.",
    "preconditions": "",
    "steps": [
      "Assign"
    ],
    "expectedResult": "Agent notified",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-RES-BULEMA-020",
    "featureId": "real-estate-management__sales__buyer-lead-management"
  },
  {
    "title": "Close deal marks property sold and commission",
    "description": "Close deal marks property sold and commission.",
    "preconditions": "Accepted offer",
    "steps": [
      "Close deal"
    ],
    "expectedResult": "Property Sold; commission calculated for agent",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-RES-DECL-021",
    "featureId": "real-estate-management__sales__deal-closure"
  },
  {
    "title": "Cannot close without signed documents",
    "description": "Cannot close without signed documents.",
    "preconditions": "Docs missing",
    "steps": [
      "Close"
    ],
    "expectedResult": "Blocked",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-RES-DECL-022",
    "featureId": "real-estate-management__sales__deal-closure"
  },
  {
    "title": "Occupancy % correct",
    "description": "Occupancy % correct.",
    "preconditions": "10 units, 7 leased",
    "steps": [
      "Run report"
    ],
    "expectedResult": "70% occupancy",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-RES-OCRE-016",
    "featureId": "real-estate-management__reporting__occupancy-report"
  },
  {
    "title": "Refund deposit with deductions",
    "description": "Refund deposit with deductions.",
    "preconditions": "Deposit 20000, damage 3000",
    "steps": [
      "Process move-out refund"
    ],
    "expectedResult": "Refund 17000 with itemised deductions",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-RES-SEDEMA-018",
    "featureId": "real-estate-management__leasing__security-deposit-management__l8uo3"
  },
  {
    "title": "Deposit cannot be refunded twice",
    "description": "Deposit cannot be refunded twice.",
    "preconditions": "Refunded",
    "steps": [
      "Refund again"
    ],
    "expectedResult": "Blocked",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-RES-SEDEMA-019",
    "featureId": "real-estate-management__leasing__security-deposit-management__l8uo3"
  },
  {
    "title": "Owner statement nets fees and expenses",
    "description": "Owner statement nets fees and expenses.",
    "preconditions": "Rent 50000, fee 10%, repair 2000",
    "steps": [
      "Generate statement"
    ],
    "expectedResult": "Payout 43000",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-RES-OWSTPA-019",
    "featureId": "real-estate-management__owners-and-accounting__dnb0x__owner-statements-and-payouts__a57dx"
  },
  {
    "title": "Owner sees only own properties",
    "description": "Owner sees only own properties.",
    "preconditions": "Two owners",
    "steps": [
      "Open other owner statement"
    ],
    "expectedResult": "Denied",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-RES-OWSTPA-020",
    "featureId": "real-estate-management__owners-and-accounting__dnb0x__owner-statements-and-payouts__a57dx"
  },
  {
    "title": "Generate instalment schedule",
    "description": "Generate instalment schedule.",
    "preconditions": "Price 100 lakh, 10% booking, 12 instalments",
    "steps": [
      "Create schedule"
    ],
    "expectedResult": "Amounts and due dates correct; total = price",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-RES-PASCIN-030",
    "featureId": "real-estate-management__sales__payment-schedule-and-instalments__9h27p"
  },
  {
    "title": "Late payment penalty",
    "description": "Late payment penalty.",
    "preconditions": "Instalment overdue",
    "steps": [
      "Run daily job"
    ],
    "expectedResult": "Penalty added per rule; reminder sent",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-RES-PASCIN-031",
    "featureId": "real-estate-management__sales__payment-schedule-and-instalments__9h27p"
  },
  {
    "title": "Calendar shows booked and free slots",
    "description": "Calendar shows booked and free slots.",
    "preconditions": "Bookings exist",
    "steps": [
      "Open calendar"
    ],
    "expectedResult": "Booked slots blocked; free slots bookable",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-BKG-AVCA-030",
    "featureId": "booking-and-reservation__inventory-and-availability__availability-calendar"
  },
  {
    "title": "Time zone displayed correctly",
    "description": "Time zone displayed correctly.",
    "preconditions": "Customer in other TZ",
    "steps": [
      "View slots"
    ],
    "expectedResult": "Times shown in customer TZ, stored in UTC",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-BKG-AVCA-031",
    "featureId": "booking-and-reservation__inventory-and-availability__availability-calendar"
  },
  {
    "title": "Blackout date not bookable",
    "description": "Blackout date not bookable.",
    "preconditions": "Blackout 25 Dec",
    "steps": [
      "Try booking 25 Dec"
    ],
    "expectedResult": "Unavailable with reason",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-BKG-BLDA-030",
    "featureId": "booking-and-reservation__inventory-and-availability__blackout-dates"
  },
  {
    "title": "Existing bookings flagged when blackout added",
    "description": "Existing bookings flagged when blackout added.",
    "preconditions": "Booking on date",
    "steps": [
      "Add blackout"
    ],
    "expectedResult": "Admin warned of conflicts",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-BKG-BLDA-031",
    "featureId": "booking-and-reservation__inventory-and-availability__blackout-dates"
  },
  {
    "title": "Book available slot and get confirmation",
    "description": "Book available slot and get confirmation.",
    "preconditions": "Slot free",
    "steps": [
      "Select",
      "Enter details",
      "Pay"
    ],
    "expectedResult": "Booking confirmed with code; email/SMS sent",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-BKG-BOCR-026",
    "featureId": "booking-and-reservation__booking-flow__booking-creation"
  },
  {
    "title": "Minimum notice and max advance rules",
    "description": "Minimum notice and max advance rules.",
    "preconditions": "Min 2h notice",
    "steps": [
      "Book slot in 1h"
    ],
    "expectedResult": "Blocked",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-BKG-BOCR-027",
    "featureId": "booking-and-reservation__booking-flow__booking-creation"
  },
  {
    "title": "Reschedule to free slot",
    "description": "Reschedule to free slot.",
    "preconditions": "Confirmed booking",
    "steps": [
      "Change to another free slot"
    ],
    "expectedResult": "Old slot released; new slot held; price difference handled",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-BKG-MORE-028",
    "featureId": "booking-and-reservation__booking-flow__modification-and-rescheduling"
  },
  {
    "title": "Reschedule blocked inside cut-off",
    "description": "Reschedule blocked inside cut-off.",
    "preconditions": "Cut-off 24h",
    "steps": [
      "Reschedule 12h before"
    ],
    "expectedResult": "Blocked per policy",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-BKG-MORE-029",
    "featureId": "booking-and-reservation__booking-flow__modification-and-rescheduling"
  },
  {
    "title": "Full refund before free-cancellation window",
    "description": "Full refund before free-cancellation window.",
    "preconditions": "Free cancel 48h",
    "steps": [
      "Cancel 72h before"
    ],
    "expectedResult": "Full refund; slot released",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-BKG-CARE-031",
    "featureId": "booking-and-reservation__booking-flow__cancellation-and-refund"
  },
  {
    "title": "Partial refund inside window",
    "description": "Partial refund inside window.",
    "preconditions": "50% after 48h",
    "steps": [
      "Cancel 24h before"
    ],
    "expectedResult": "50% refunded",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-BKG-CARE-032",
    "featureId": "booking-and-reservation__booking-flow__cancellation-and-refund"
  },
  {
    "title": "Different rates per plan",
    "description": "Different rates per plan.",
    "preconditions": "Flexible vs non-refundable",
    "steps": [
      "Select each"
    ],
    "expectedResult": "Correct price and policy shown",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-BKG-RAPL-021",
    "featureId": "booking-and-reservation__pricing__rate-plans"
  },
  {
    "title": "Season price applies on dates",
    "description": "Season price applies on dates.",
    "preconditions": "Peak Dec 20-31",
    "steps": [
      "Book Dec 22 and Nov 22"
    ],
    "expectedResult": "Peak vs normal price applied; stays spanning seasons priced per night",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-BKG-SEPR-025",
    "featureId": "booking-and-reservation__pricing__seasonal-pricing"
  },
  {
    "title": "Valid promo reduces total",
    "description": "Valid promo reduces total.",
    "preconditions": "Code 10%",
    "steps": [
      "Apply"
    ],
    "expectedResult": "Total reduced 10%",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-BKG-PRCO-026",
    "featureId": "booking-and-reservation__pricing__promo-codes"
  },
  {
    "title": "Expired code rejected",
    "description": "Expired code rejected.",
    "preconditions": "",
    "steps": [
      "Apply expired code"
    ],
    "expectedResult": "Error",
    "testType": "Validation",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-BKG-PRCO-027",
    "featureId": "booking-and-reservation__pricing__promo-codes"
  },
  {
    "title": "Check-in marks booking arrived",
    "description": "Check-in marks booking arrived.",
    "preconditions": "Confirmed booking",
    "steps": [
      "Check in by code/QR"
    ],
    "expectedResult": "Status Checked-in with time",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-BKG-CHINCH-027",
    "featureId": "booking-and-reservation__operations__check-in-and-check-out"
  },
  {
    "title": "Late check-out charge",
    "description": "Late check-out charge.",
    "preconditions": "Late fee rule",
    "steps": [
      "Check out late"
    ],
    "expectedResult": "Fee added",
    "testType": "Boundary",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-BKG-CHINCH-028",
    "featureId": "booking-and-reservation__operations__check-in-and-check-out"
  },
  {
    "title": "Reminder sent before booking",
    "description": "Reminder sent before booking.",
    "preconditions": "Reminder 24h",
    "steps": [
      "Wait to T-24h"
    ],
    "expectedResult": "Reminder email/SMS sent once",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-BKG-NORE-022",
    "featureId": "booking-and-reservation__operations__notifications-and-reminders"
  },
  {
    "title": "Utilisation % correct",
    "description": "Utilisation % correct.",
    "preconditions": "8 of 10 slots booked",
    "steps": [
      "Run report"
    ],
    "expectedResult": "80%",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-BKG-OCUT-019",
    "featureId": "booking-and-reservation__reporting__occupancy-and-utilisation"
  },
  {
    "title": "Revenue excludes refunds",
    "description": "Revenue excludes refunds.",
    "preconditions": "Bookings and refunds",
    "steps": [
      "Run report"
    ],
    "expectedResult": "Net revenue = paid - refunds",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-BKG-RERE-039",
    "featureId": "booking-and-reservation__reporting__revenue-report"
  },
  {
    "title": "Concurrent booking of last slot",
    "description": "Concurrent booking of last slot.",
    "preconditions": "1 slot, 2 users",
    "steps": [
      "Both pay simultaneously"
    ],
    "expectedResult": "Only one confirmed; other told unavailable, not charged",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-BKG-OVPR-028",
    "featureId": "booking-and-reservation__booking-flow__overbooking-prevention__sancy"
  },
  {
    "title": "Hold expires and releases slot",
    "description": "Hold expires and releases slot.",
    "preconditions": "Hold 10 min",
    "steps": [
      "Abandon checkout"
    ],
    "expectedResult": "Slot free after 10 min",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-BKG-OVPR-029",
    "featureId": "booking-and-reservation__booking-flow__overbooking-prevention__sancy"
  },
  {
    "title": "Mark no-show charges fee",
    "description": "Mark no-show charges fee.",
    "preconditions": "No-show fee 20%",
    "steps": [
      "Mark no-show"
    ],
    "expectedResult": "Fee charged to saved card per policy",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-BKG-NOSHCA-020",
    "featureId": "booking-and-reservation__booking-flow__no-show-and-cancellation-policy__ekwt0"
  },
  {
    "title": "Booking on OTA blocks availability",
    "description": "Booking on OTA blocks availability.",
    "preconditions": "Channel connected",
    "steps": [
      "Create booking on OTA"
    ],
    "expectedResult": "Availability reduced in system and other channels",
    "testType": "Integration",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-BKG-CHMASY-020",
    "featureId": "booking-and-reservation__channels__o0s5b__channel-manager-sync__jxc5g"
  },
  {
    "title": "Rate change pushed to channels",
    "description": "Rate change pushed to channels.",
    "preconditions": "",
    "steps": [
      "Change rate"
    ],
    "expectedResult": "Channels updated; sync log success",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-BKG-CHMASY-021",
    "featureId": "booking-and-reservation__channels__o0s5b__channel-manager-sync__jxc5g"
  },
  {
    "title": "Weekly recurring booking with conflict check",
    "description": "Weekly recurring booking with conflict check.",
    "preconditions": "One week conflicting",
    "steps": [
      "Create 8 weekly bookings"
    ],
    "expectedResult": "Conflict reported; others created",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-BKG-GRREBO-025",
    "featureId": "booking-and-reservation__channels__o0s5b__group-and-recurring-bookings__ebgfm"
  },
  {
    "title": "Upload supported files with drag and drop",
    "description": "Upload supported files with drag and drop.",
    "preconditions": "",
    "steps": [
      "Drag PDF and DOCX"
    ],
    "expectedResult": "Uploaded with preview and correct size/type",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-DMS-DOUP-027",
    "featureId": "document-management__storage__document-upload"
  },
  {
    "title": "Virus-infected file rejected",
    "description": "Virus-infected file rejected.",
    "preconditions": "EICAR test file",
    "steps": [
      "Upload"
    ],
    "expectedResult": "Blocked and logged",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-DMS-DOUP-028",
    "featureId": "document-management__storage__document-upload"
  },
  {
    "title": "Create nested folders and move documents",
    "description": "Create nested folders and move documents.",
    "preconditions": "",
    "steps": [
      "Create folder tree",
      "Move doc"
    ],
    "expectedResult": "Doc in new folder; permissions inherited",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-DMS-FOST-025",
    "featureId": "document-management__storage__folder-structure"
  },
  {
    "title": "Duplicate name in same folder",
    "description": "Duplicate name in same folder.",
    "preconditions": "File exists",
    "steps": [
      "Upload same name"
    ],
    "expectedResult": "Prompt to version/rename",
    "testType": "Validation",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-DMS-FOST-026",
    "featureId": "document-management__storage__folder-structure"
  },
  {
    "title": "Required metadata by document type",
    "description": "Required metadata by document type.",
    "preconditions": "Invoice type needs vendor, date",
    "steps": [
      "Upload without metadata"
    ],
    "expectedResult": "Blocked until required fields filled",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-DMS-META-027",
    "featureId": "document-management__storage__metadata-and-tagging"
  },
  {
    "title": "Filter by tag",
    "description": "Filter by tag.",
    "preconditions": "Tagged docs",
    "steps": [
      "Filter tag"
    ],
    "expectedResult": "Only tagged docs",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-DMS-META-028",
    "featureId": "document-management__storage__metadata-and-tagging"
  },
  {
    "title": "Checked-out doc locked for others",
    "description": "Checked-out doc locked for others.",
    "preconditions": "User A checks out",
    "steps": [
      "User B edits"
    ],
    "expectedResult": "Read-only for B",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-DMS-CHINCH-025",
    "featureId": "document-management__versioning__check-in-and-check-out"
  },
  {
    "title": "Check-in creates new version",
    "description": "Check-in creates new version.",
    "preconditions": "Checked-out",
    "steps": [
      "Upload and check in"
    ],
    "expectedResult": "Version incremented; lock released",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-DMS-CHINCH-026",
    "featureId": "document-management__versioning__check-in-and-check-out"
  },
  {
    "title": "Compare two versions highlights changes",
    "description": "Compare two versions highlights changes.",
    "preconditions": "v1, v2",
    "steps": [
      "Compare"
    ],
    "expectedResult": "Additions and deletions highlighted",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-DMS-DOCO-023",
    "featureId": "document-management__versioning__document-comparison"
  },
  {
    "title": "Folder permission inherited by children",
    "description": "Folder permission inherited by children.",
    "preconditions": "View-only on folder",
    "steps": [
      "Open child doc"
    ],
    "expectedResult": "View only",
    "testType": "Permission",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-DMS-PEMA-023",
    "featureId": "document-management__access-control__permission-management"
  },
  {
    "title": "Explicit deny overrides inherited allow",
    "description": "Explicit deny overrides inherited allow.",
    "preconditions": "",
    "steps": [
      "Deny user on doc"
    ],
    "expectedResult": "User cannot open doc",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-DMS-PEMA-024",
    "featureId": "document-management__access-control__permission-management"
  },
  {
    "title": "Expiring share link",
    "description": "Expiring share link.",
    "preconditions": "Link expires in 1 day",
    "steps": [
      "Open after expiry"
    ],
    "expectedResult": "Link invalid",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-DMS-SHLI-022",
    "featureId": "document-management__access-control__sharing-and-links"
  },
  {
    "title": "Password-protected link",
    "description": "Password-protected link.",
    "preconditions": "Password set",
    "steps": [
      "Open link"
    ],
    "expectedResult": "Password required",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-DMS-SHLI-023",
    "featureId": "document-management__access-control__sharing-and-links"
  },
  {
    "title": "Archive after retention period",
    "description": "Archive after retention period.",
    "preconditions": "Retention 7 years",
    "steps": [
      "Run job on expired doc"
    ],
    "expectedResult": "Moved to archive / deletion queue",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-DMS-REAR-025",
    "featureId": "document-management__workflow__retention-and-archival"
  },
  {
    "title": "Legal hold blocks deletion",
    "description": "Legal hold blocks deletion.",
    "preconditions": "Legal hold on",
    "steps": [
      "Delete doc"
    ],
    "expectedResult": "Blocked",
    "testType": "Negative",
    "priority": "Critical",
    "isMandatory": false,
    "id": "TC-DMS-REAR-026",
    "featureId": "document-management__workflow__retention-and-archival"
  },
  {
    "title": "Upload blocked when quota exceeded",
    "description": "Upload blocked when quota exceeded.",
    "preconditions": "Quota full",
    "steps": [
      "Upload"
    ],
    "expectedResult": "Blocked with quota message",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-DMS-STQU-023",
    "featureId": "document-management__storage__storage-quotas__cvard"
  },
  {
    "title": "Watermark on view/download",
    "description": "Watermark on view/download.",
    "preconditions": "Watermark policy",
    "steps": [
      "Download"
    ],
    "expectedResult": "User name and time watermark applied",
    "testType": "Security",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-DMS-DOENDL-022",
    "featureId": "document-management__access-control__document-encryption-and-dlp__vrnv3"
  },
  {
    "title": "Download disabled for view-only",
    "description": "Download disabled for view-only.",
    "preconditions": "",
    "steps": [
      "Try download"
    ],
    "expectedResult": "Blocked",
    "testType": "Permission",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-DMS-DOENDL-023",
    "featureId": "document-management__access-control__document-encryption-and-dlp__vrnv3"
  },
  {
    "title": "Generate document from template",
    "description": "Generate document from template.",
    "preconditions": "Template with merge fields",
    "steps": [
      "Generate for record"
    ],
    "expectedResult": "All fields merged; no placeholders left",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-DMS-DOTEGE-025",
    "featureId": "document-management__workflow__document-templates-and-generation__ruuwh"
  },
  {
    "title": "Capture geotagged, timestamped photos",
    "description": "Capture geotagged, timestamped photos.",
    "preconditions": "Mobile app on site",
    "steps": [
      "Take photos on job"
    ],
    "expectedResult": "Photos saved with GPS/time to the job",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ROF-PHDO-019",
    "featureId": "roofing-management__inspection-and-measurement__photo-documentation"
  },
  {
    "title": "Annotate photo and tag roof slope",
    "description": "Annotate photo and tag roof slope.",
    "preconditions": "Photo uploaded",
    "steps": [
      "Add arrow/label and slope tag"
    ],
    "expectedResult": "Annotation saved; appears in report",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ROF-PHDO-020",
    "featureId": "roofing-management__inspection-and-measurement__photo-documentation"
  },
  {
    "title": "Upload offline photos when back online",
    "description": "Upload offline photos when back online.",
    "preconditions": "No signal",
    "steps": [
      "Take photos",
      "Reconnect"
    ],
    "expectedResult": "All photos uploaded without duplicates",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ROF-PHDO-021",
    "featureId": "roofing-management__inspection-and-measurement__photo-documentation"
  },
  {
    "title": "Block job start without completed safety checklist",
    "description": "Block job start without completed safety checklist.",
    "preconditions": "Checklist mandatory",
    "steps": [
      "Start job"
    ],
    "expectedResult": "Blocked until checklist signed",
    "testType": "Validation",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ROF-SACH-022",
    "featureId": "roofing-management__field-operations__safety-checklist"
  },
  {
    "title": "Record fall-protection checks with photo",
    "description": "Record fall-protection checks with photo.",
    "preconditions": "",
    "steps": [
      "Complete checklist"
    ],
    "expectedResult": "Each item with pass/fail and photo saved",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ROF-SACH-023",
    "featureId": "roofing-management__field-operations__safety-checklist"
  },
  {
    "title": "Job cannot be scheduled before permit approved (where required)",
    "description": "Job cannot be scheduled before permit approved (where required).",
    "preconditions": "Permit required, pending",
    "steps": [
      "Schedule install"
    ],
    "expectedResult": "Warning/block",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-ROF-PEMA-027",
    "featureId": "roofing-management__customers-and-jobs__permit-management__hln1y"
  },
  {
    "title": "Track permit expiry",
    "description": "Track permit expiry.",
    "preconditions": "Permit with expiry",
    "steps": [
      "Approach expiry"
    ],
    "expectedResult": "Alert to PM",
    "testType": "Integration",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-ROF-PEMA-028",
    "featureId": "roofing-management__customers-and-jobs__permit-management__hln1y"
  },
  {
    "title": "Clock in only at job site",
    "description": "Clock in only at job site.",
    "preconditions": "Geo-fence on",
    "steps": [
      "Clock in away from site"
    ],
    "expectedResult": "Rejected or flagged",
    "testType": "Security",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-ROF-CRTITR-018",
    "featureId": "roofing-management__field-operations__crew-time-tracking__owpsn"
  },
  {
    "title": "Labour hours roll up to job cost",
    "description": "Labour hours roll up to job cost.",
    "preconditions": "Crew hours logged",
    "steps": [
      "Open job costing"
    ],
    "expectedResult": "Labour cost = hours x rate",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ROF-CRTITR-019",
    "featureId": "roofing-management__field-operations__crew-time-tracking__owpsn"
  },
  {
    "title": "Show monthly payment on proposal",
    "description": "Show monthly payment on proposal.",
    "preconditions": "Financing plan 12% 60 months",
    "steps": [
      "Open proposal"
    ],
    "expectedResult": "Correct monthly estimate shown",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-ROF-FIOP-023",
    "featureId": "roofing-management__sales-and-estimation__financing-options__zx2t0"
  },
  {
    "title": "Seller registers and awaits approval",
    "description": "Seller registers and awaits approval.",
    "preconditions": "",
    "steps": [
      "Register as seller"
    ],
    "expectedResult": "Status Pending; cannot list until approved",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-MKT-SEON-022",
    "featureId": "marketplace__seller-management__seller-onboarding"
  },
  {
    "title": "Collect bank/payout details securely",
    "description": "Collect bank/payout details securely.",
    "preconditions": "",
    "steps": [
      "Add payout account"
    ],
    "expectedResult": "Masked display; stored encrypted",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-MKT-SEON-023",
    "featureId": "marketplace__seller-management__seller-onboarding"
  },
  {
    "title": "Dashboard shows own sales only",
    "description": "Dashboard shows own sales only.",
    "preconditions": "Two sellers",
    "steps": [
      "Open dashboard"
    ],
    "expectedResult": "Only own orders/revenue",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-MKT-SEDA-021",
    "featureId": "marketplace__seller-management__seller-dashboard"
  },
  {
    "title": "Seller rating averages buyer ratings",
    "description": "Seller rating averages buyer ratings.",
    "preconditions": "Ratings 5,4,3",
    "steps": [
      "View seller"
    ],
    "expectedResult": "Average 4.0 with count",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-MKT-SERA-025",
    "featureId": "marketplace__seller-management__seller-ratings"
  },
  {
    "title": "Create listing in category with required attributes",
    "description": "Create listing in category with required attributes.",
    "preconditions": "Approved seller",
    "steps": [
      "Create listing"
    ],
    "expectedResult": "Required attributes enforced; listing pending moderation",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-MKT-LICR-016",
    "featureId": "marketplace__listings__listing-creation"
  },
  {
    "title": "Prohibited item keywords blocked",
    "description": "Prohibited item keywords blocked.",
    "preconditions": "Blocklist",
    "steps": [
      "Create listing with banned keyword"
    ],
    "expectedResult": "Rejected",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-MKT-LICR-017",
    "featureId": "marketplace__listings__listing-creation"
  },
  {
    "title": "Approve or reject listing with reason",
    "description": "Approve or reject listing with reason.",
    "preconditions": "Pending listing",
    "steps": [
      "Reject with reason"
    ],
    "expectedResult": "Seller notified; listing hidden",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-MKT-LIMO-022",
    "featureId": "marketplace__listings__listing-moderation"
  },
  {
    "title": "Cart with two sellers splits orders",
    "description": "Cart with two sellers splits orders.",
    "preconditions": "Items from sellers A and B",
    "steps": [
      "Checkout"
    ],
    "expectedResult": "Two sub-orders, each seller sees own part; one payment",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-MKT-ORSP-026",
    "featureId": "marketplace__transactions__order-splitting"
  },
  {
    "title": "Shipping calculated per seller",
    "description": "Shipping calculated per seller.",
    "preconditions": "",
    "steps": [
      "Checkout"
    ],
    "expectedResult": "Shipping per sub-order",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-MKT-ORSP-027",
    "featureId": "marketplace__transactions__order-splitting"
  },
  {
    "title": "Payout = sales - commission - refunds",
    "description": "Payout = sales - commission - refunds.",
    "preconditions": "Settlement period ended",
    "steps": [
      "Run payouts"
    ],
    "expectedResult": "Correct net per seller; statement generated",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-MKT-PAPR-019",
    "featureId": "marketplace__transactions__payout-processing"
  },
  {
    "title": "Hold payout for sellers under review",
    "description": "Hold payout for sellers under review.",
    "preconditions": "Seller flagged",
    "steps": [
      "Run payouts"
    ],
    "expectedResult": "Payout held",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-MKT-PAPR-020",
    "featureId": "marketplace__transactions__payout-processing"
  },
  {
    "title": "Buyer opens dispute; escrow frozen",
    "description": "Buyer opens dispute; escrow frozen.",
    "preconditions": "Delivered order",
    "steps": [
      "Open dispute"
    ],
    "expectedResult": "Funds frozen; seller notified with deadline",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-MKT-DIRE-024",
    "featureId": "marketplace__trust-and-safety__dispute-resolution"
  },
  {
    "title": "Admin resolves dispute with refund",
    "description": "Admin resolves dispute with refund.",
    "preconditions": "Dispute",
    "steps": [
      "Resolve for buyer"
    ],
    "expectedResult": "Refund issued, seller debited, case closed",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-MKT-DIRE-025",
    "featureId": "marketplace__trust-and-safety__dispute-resolution"
  },
  {
    "title": "Buyer order history across sellers",
    "description": "Buyer order history across sellers.",
    "preconditions": "Orders",
    "steps": [
      "Open account"
    ],
    "expectedResult": "All orders listed",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-MKT-BUAC-020",
    "featureId": "marketplace__buyer-experience__buyer-account"
  },
  {
    "title": "Messages hide contact details",
    "description": "Messages hide contact details.",
    "preconditions": "Policy on",
    "steps": [
      "Send phone/email in chat"
    ],
    "expectedResult": "Masked/blocked",
    "testType": "Security",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-MKT-BUSEME-019",
    "featureId": "marketplace__buyer-experience__buyer-seller-messaging"
  },
  {
    "title": "Message thread linked to order",
    "description": "Message thread linked to order.",
    "preconditions": "",
    "steps": [
      "Message seller from order"
    ],
    "expectedResult": "Thread shows order reference",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-MKT-BUSEME-020",
    "featureId": "marketplace__buyer-experience__buyer-seller-messaging"
  },
  {
    "title": "Each sub-order tracked separately",
    "description": "Each sub-order tracked separately.",
    "preconditions": "Split order",
    "steps": [
      "Open tracking"
    ],
    "expectedResult": "Separate status per seller",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-MKT-ORTR-022",
    "featureId": "marketplace__buyer-experience__order-tracking"
  },
  {
    "title": "Listing limit per seller plan",
    "description": "Listing limit per seller plan.",
    "preconditions": "Plan 50 listings",
    "steps": [
      "Create 51st"
    ],
    "expectedResult": "Blocked with upgrade prompt",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-MKT-SESUFE-039",
    "featureId": "marketplace__seller-management__seller-subscription-and-fees__s6jax"
  },
  {
    "title": "Refund deducts seller balance and commission reversal",
    "description": "Refund deducts seller balance and commission reversal.",
    "preconditions": "Paid order",
    "steps": [
      "Refund"
    ],
    "expectedResult": "Seller debited, commission refunded per policy",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-MKT-RECH-024",
    "featureId": "marketplace__transactions__refunds-and-chargebacks__c548v"
  },
  {
    "title": "Bulk CSV upload with error report",
    "description": "Bulk CSV upload with error report.",
    "preconditions": "CSV 100 rows, 3 invalid",
    "steps": [
      "Upload"
    ],
    "expectedResult": "97 created; error file for 3",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-MKT-INSYBU-030",
    "featureId": "marketplace__listings__inventory-sync-and-bulk-upload__cm6qz"
  },
  {
    "title": "Sign up with phone OTP",
    "description": "Sign up with phone OTP.",
    "preconditions": "",
    "steps": [
      "Enter phone",
      "Verify OTP"
    ],
    "expectedResult": "Account created in pending-KYC state",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FIN-CUON-024",
    "featureId": "fintech__onboarding-and-kyc__customer-onboarding"
  },
  {
    "title": "OTP expiry and retry limit",
    "description": "OTP expiry and retry limit.",
    "preconditions": "OTP 5 min, 3 tries",
    "steps": [
      "Enter wrong OTP 3 times"
    ],
    "expectedResult": "Locked for cool-down",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-FIN-CUON-025",
    "featureId": "fintech__onboarding-and-kyc__customer-onboarding"
  },
  {
    "title": "KYC approval unlocks limits",
    "description": "KYC approval unlocks limits.",
    "preconditions": "Pending KYC",
    "steps": [
      "Submit ID + selfie",
      "Approve"
    ],
    "expectedResult": "Tier upgraded; limits raised",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FIN-KYAMVE-025",
    "featureId": "fintech__onboarding-and-kyc__kyc-and-aml-verification"
  },
  {
    "title": "Sanctions/PEP screening hit",
    "description": "Sanctions/PEP screening hit.",
    "preconditions": "Name on watchlist",
    "steps": [
      "Submit KYC"
    ],
    "expectedResult": "Flagged for manual review; account restricted",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FIN-KYAMVE-026",
    "featureId": "fintech__onboarding-and-kyc__kyc-and-aml-verification"
  },
  {
    "title": "One wallet per currency per user",
    "description": "One wallet per currency per user.",
    "preconditions": "",
    "steps": [
      "Create BDT wallet twice"
    ],
    "expectedResult": "Second blocked",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-FIN-WACR-027",
    "featureId": "fintech__accounts-and-wallets__wallet-creation"
  },
  {
    "title": "Balance consistent under concurrent debits",
    "description": "Balance consistent under concurrent debits.",
    "preconditions": "Balance 100",
    "steps": [
      "Two 80 debits at once"
    ],
    "expectedResult": "Only one succeeds; no negative balance",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FIN-BAMA-020",
    "featureId": "fintech__accounts-and-wallets__balance-management"
  },
  {
    "title": "Available vs ledger balance with holds",
    "description": "Available vs ledger balance with holds.",
    "preconditions": "Hold 30",
    "steps": [
      "View balance"
    ],
    "expectedResult": "Available = ledger - hold",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-FIN-BAMA-021",
    "featureId": "fintech__accounts-and-wallets__balance-management"
  },
  {
    "title": "Statement opening + credits - debits = closing",
    "description": "Statement opening + credits - debits = closing.",
    "preconditions": "Transactions in month",
    "steps": [
      "Generate statement"
    ],
    "expectedResult": "Balances reconcile; PDF downloadable",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FIN-ACST-028",
    "featureId": "fintech__accounts-and-wallets__account-statements"
  },
  {
    "title": "Currency exchange at quoted rate",
    "description": "Currency exchange at quoted rate.",
    "preconditions": "USD and BDT wallets",
    "steps": [
      "Convert 100 USD"
    ],
    "expectedResult": "Rate locked for quote period; both balances updated",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-FIN-MUCUWA-027",
    "featureId": "fintech__accounts-and-wallets__multi-currency-wallet"
  },
  {
    "title": "Transfer to another user",
    "description": "Transfer to another user.",
    "preconditions": "Sufficient balance",
    "steps": [
      "Send 500 with PIN"
    ],
    "expectedResult": "Sender -500 (+fee), receiver +500; both notified",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FIN-FUTR-023",
    "featureId": "fintech__payments__fund-transfer"
  },
  {
    "title": "Idempotent transfer on retry",
    "description": "Idempotent transfer on retry.",
    "preconditions": "Network timeout",
    "steps": [
      "Retry same request"
    ],
    "expectedResult": "Executed once",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FIN-FUTR-024",
    "featureId": "fintech__payments__fund-transfer"
  },
  {
    "title": "Insufficient balance",
    "description": "Insufficient balance.",
    "preconditions": "Balance 100",
    "steps": [
      "Send 200"
    ],
    "expectedResult": "Rejected; no partial debit",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-FIN-FUTR-025",
    "featureId": "fintech__payments__fund-transfer"
  },
  {
    "title": "Scheduled payment executes on date",
    "description": "Scheduled payment executes on date.",
    "preconditions": "Monthly schedule",
    "steps": [
      "Reach date"
    ],
    "expectedResult": "Payment made once; notification sent",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-FIN-SCPA-021",
    "featureId": "fintech__payments__scheduled-payments"
  },
  {
    "title": "Skip and notify when insufficient funds",
    "description": "Skip and notify when insufficient funds.",
    "preconditions": "Low balance",
    "steps": [
      "Run schedule"
    ],
    "expectedResult": "Failed with notice; retried per policy",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-FIN-SCPA-022",
    "featureId": "fintech__payments__scheduled-payments"
  },
  {
    "title": "Score decides approve/decline",
    "description": "Score decides approve/decline.",
    "preconditions": "Rules configured",
    "steps": [
      "Assess applicant"
    ],
    "expectedResult": "Decision and reasons recorded",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FIN-CRAS-028",
    "featureId": "fintech__lending__credit-assessment"
  },
  {
    "title": "EMI schedule calculation",
    "description": "EMI schedule calculation.",
    "preconditions": "10000, 12%, 12 months",
    "steps": [
      "Generate"
    ],
    "expectedResult": "EMI ≈ 888.49; principal+interest totals correct",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FIN-RESC-024",
    "featureId": "fintech__lending__repayment-schedule"
  },
  {
    "title": "Late payment fee and penalty interest",
    "description": "Late payment fee and penalty interest.",
    "preconditions": "EMI overdue",
    "steps": [
      "Run daily job"
    ],
    "expectedResult": "Penalty applied per rule",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-FIN-RESC-025",
    "featureId": "fintech__lending__repayment-schedule"
  },
  {
    "title": "Velocity rule flags rapid transfers",
    "description": "Velocity rule flags rapid transfers.",
    "preconditions": "Rule 5 transfers/10min",
    "steps": [
      "Make 6"
    ],
    "expectedResult": "6th held for review; alert raised",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FIN-FRMO-020",
    "featureId": "fintech__compliance__fraud-monitoring"
  },
  {
    "title": "New device high-value transfer requires step-up",
    "description": "New device high-value transfer requires step-up.",
    "preconditions": "New device",
    "steps": [
      "Send large amount"
    ],
    "expectedResult": "Extra verification required",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-FIN-FRMO-021",
    "featureId": "fintech__compliance__fraud-monitoring"
  },
  {
    "title": "Mobile top-up success",
    "description": "Mobile top-up success.",
    "preconditions": "Balance",
    "steps": [
      "Recharge 100"
    ],
    "expectedResult": "Operator confirms; wallet debited once",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-FIN-BIPATO-027",
    "featureId": "fintech__payments__bill-payments-and-top-up__2rxfn"
  },
  {
    "title": "Failed biller payment auto-refunds",
    "description": "Failed biller payment auto-refunds.",
    "preconditions": "Biller fails",
    "steps": [
      "Pay bill"
    ],
    "expectedResult": "Wallet refunded; status Failed",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-FIN-BIPATO-028",
    "featureId": "fintech__payments__bill-payments-and-top-up__2rxfn"
  },
  {
    "title": "Daily reconciliation matches ledger to bank",
    "description": "Daily reconciliation matches ledger to bank.",
    "preconditions": "Day transactions",
    "steps": [
      "Run reconciliation"
    ],
    "expectedResult": "Mismatches reported; totals match",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FIN-TRRERE-020",
    "featureId": "fintech__accounts-and-wallets__transaction-reversal-and-reconciliation__8xd3b"
  },
  {
    "title": "Freeze card blocks transactions",
    "description": "Freeze card blocks transactions.",
    "preconditions": "Active card",
    "steps": [
      "Freeze",
      "Attempt payment"
    ],
    "expectedResult": "Declined; unfreeze restores",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FIN-CAMA-029",
    "featureId": "fintech__cards-and-security__lugnn__card-management__6wur2"
  },
  {
    "title": "Card number masked everywhere",
    "description": "Card number masked everywhere.",
    "preconditions": "",
    "steps": [
      "View card in app/logs"
    ],
    "expectedResult": "Only last 4 shown",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": false,
    "id": "TC-FIN-CAMA-030",
    "featureId": "fintech__cards-and-security__lugnn__card-management__6wur2"
  },
  {
    "title": "Lock after wrong PIN attempts",
    "description": "Lock after wrong PIN attempts.",
    "preconditions": "PIN set",
    "steps": [
      "Enter wrong PIN 3 times"
    ],
    "expectedResult": "Transactions locked; reset via verified flow",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FIN-TRPI2F-027",
    "featureId": "fintech__cards-and-security__lugnn__transaction-pin-and-2fa__rny60"
  },
  {
    "title": "Book room and receive confirmation",
    "description": "Book room and receive confirmation.",
    "preconditions": "Room type available",
    "steps": [
      "Book 2 nights"
    ],
    "expectedResult": "Confirmation number; inventory reduced",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HOS-ROBO-030",
    "featureId": "hospitality-and-hotel-management__reservations__room-booking"
  },
  {
    "title": "Prevent overbooking",
    "description": "Prevent overbooking.",
    "preconditions": "Last room",
    "steps": [
      "Two bookings at once"
    ],
    "expectedResult": "Only one confirmed",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HOS-ROBO-031",
    "featureId": "hospitality-and-hotel-management__reservations__room-booking"
  },
  {
    "title": "OTA booking imported and inventory synced",
    "description": "OTA booking imported and inventory synced.",
    "preconditions": "Channel connected",
    "steps": [
      "Book on OTA"
    ],
    "expectedResult": "Reservation appears; availability updated everywhere",
    "testType": "Integration",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HOS-CHMA-022",
    "featureId": "hospitality-and-hotel-management__reservations__channel-manager"
  },
  {
    "title": "Check-in with ID and key issuance",
    "description": "Check-in with ID and key issuance.",
    "preconditions": "Arriving reservation, room clean",
    "steps": [
      "Check in"
    ],
    "expectedResult": "Status In-house; room Occupied; ID captured",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HOS-GUCHIN-024",
    "featureId": "hospitality-and-hotel-management__front-desk__guest-check-in"
  },
  {
    "title": "Cannot check in to dirty room",
    "description": "Cannot check in to dirty room.",
    "preconditions": "Room dirty",
    "steps": [
      "Assign and check in"
    ],
    "expectedResult": "Blocked or warned",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HOS-GUCHIN-025",
    "featureId": "hospitality-and-hotel-management__front-desk__guest-check-in"
  },
  {
    "title": "Check-out settles folio",
    "description": "Check-out settles folio.",
    "preconditions": "In-house guest with charges",
    "steps": [
      "Check out",
      "Pay"
    ],
    "expectedResult": "Balance 0; invoice issued; room Dirty",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HOS-GUCHOU-016",
    "featureId": "hospitality-and-hotel-management__front-desk__guest-check-out"
  },
  {
    "title": "Cannot check out with balance unpaid (unless city ledger)",
    "description": "Cannot check out with balance unpaid (unless city ledger).",
    "preconditions": "Balance due",
    "steps": [
      "Check out"
    ],
    "expectedResult": "Blocked",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HOS-GUCHOU-017",
    "featureId": "hospitality-and-hotel-management__front-desk__guest-check-out"
  },
  {
    "title": "Post and void charge with reason",
    "description": "Post and void charge with reason.",
    "preconditions": "In-house",
    "steps": [
      "Post minibar",
      "Void"
    ],
    "expectedResult": "Void needs reason and permission; audited",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-HOS-FOCH-027",
    "featureId": "hospitality-and-hotel-management__front-desk__folio-and-charges"
  },
  {
    "title": "Split folio between company and guest",
    "description": "Split folio between company and guest.",
    "preconditions": "",
    "steps": [
      "Route room to company"
    ],
    "expectedResult": "Room charges on company folio",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-HOS-FOCH-028",
    "featureId": "hospitality-and-hotel-management__front-desk__folio-and-charges"
  },
  {
    "title": "Housekeeping updates room status",
    "description": "Housekeeping updates room status.",
    "preconditions": "Room dirty",
    "steps": [
      "Mark clean",
      "Inspected"
    ],
    "expectedResult": "Front desk sees Vacant Clean",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HOS-ROST-016",
    "featureId": "hospitality-and-hotel-management__housekeeping__room-status"
  },
  {
    "title": "Log found item and return to guest",
    "description": "Log found item and return to guest.",
    "preconditions": "",
    "steps": [
      "Log item",
      "Match guest",
      "Return"
    ],
    "expectedResult": "Item record closed with signature",
    "testType": "Functional",
    "priority": "Low",
    "isMandatory": true,
    "id": "TC-HOS-LOFO-021",
    "featureId": "hospitality-and-hotel-management__housekeeping__lost-and-found"
  },
  {
    "title": "Out-of-order room removed from inventory",
    "description": "Out-of-order room removed from inventory.",
    "preconditions": "Room OOO",
    "steps": [
      "Check availability"
    ],
    "expectedResult": "Room not sellable",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-HOS-MARE-023",
    "featureId": "hospitality-and-hotel-management__housekeeping__maintenance-requests"
  },
  {
    "title": "Points earned on stay",
    "description": "Points earned on stay.",
    "preconditions": "Member",
    "steps": [
      "Check out 10000"
    ],
    "expectedResult": "Points per rule credited",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-HOS-LOPR-016",
    "featureId": "hospitality-and-hotel-management__guest-services__loyalty-programme"
  },
  {
    "title": "Track guest request to completion",
    "description": "Track guest request to completion.",
    "preconditions": "",
    "steps": [
      "Create request",
      "Complete"
    ],
    "expectedResult": "Guest notified; SLA tracked",
    "testType": "Functional",
    "priority": "Low",
    "isMandatory": true,
    "id": "TC-HOS-CORE-027",
    "featureId": "hospitality-and-hotel-management__guest-services__concierge-requests"
  },
  {
    "title": "Post-stay survey sent",
    "description": "Post-stay survey sent.",
    "preconditions": "Checked out",
    "steps": [
      "Wait"
    ],
    "expectedResult": "Survey sent once; responses linked to stay",
    "testType": "Functional",
    "priority": "Low",
    "isMandatory": true,
    "id": "TC-HOS-FERE-031",
    "featureId": "hospitality-and-hotel-management__guest-services__feedback-and-reviews"
  },
  {
    "title": "Night audit posts room charges and rolls date",
    "description": "Night audit posts room charges and rolls date.",
    "preconditions": "In-house guests",
    "steps": [
      "Run night audit"
    ],
    "expectedResult": "Room+tax posted to each folio; business date +1",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-HOS-NIAU-022",
    "featureId": "hospitality-and-hotel-management__front-desk__night-audit__8oshr"
  },
  {
    "title": "Night audit blocked with pending check-ins/outs",
    "description": "Night audit blocked with pending check-ins/outs.",
    "preconditions": "Due-out not checked out",
    "steps": [
      "Run audit"
    ],
    "expectedResult": "Warning list shown",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-HOS-NIAU-023",
    "featureId": "hospitality-and-hotel-management__front-desk__night-audit__8oshr"
  },
  {
    "title": "Room charge from restaurant posts to folio",
    "description": "Room charge from restaurant posts to folio.",
    "preconditions": "In-house guest",
    "steps": [
      "Charge order to room"
    ],
    "expectedResult": "Charge on folio with outlet",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-HOS-ROSEPO-024",
    "featureId": "hospitality-and-hotel-management__food-and-beverage__z8uco__room-service-and-pos-posting__ey55a"
  },
  {
    "title": "Cannot charge to checked-out room",
    "description": "Cannot charge to checked-out room.",
    "preconditions": "",
    "steps": [
      "Charge to room"
    ],
    "expectedResult": "Rejected",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-HOS-ROSEPO-025",
    "featureId": "hospitality-and-hotel-management__food-and-beverage__z8uco__room-service-and-pos-posting__ey55a"
  },
  {
    "title": "No-show charge per policy",
    "description": "No-show charge per policy.",
    "preconditions": "Guaranteed booking",
    "steps": [
      "Mark no-show"
    ],
    "expectedResult": "First night charged",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-HOS-DECAPO-022",
    "featureId": "hospitality-and-hotel-management__reservations__deposits-and-cancellation-policy__35pmk"
  },
  {
    "title": "Dish cost from recipe ingredients",
    "description": "Dish cost from recipe ingredients.",
    "preconditions": "Recipe with quantities and costs",
    "steps": [
      "View dish cost"
    ],
    "expectedResult": "Cost and food-cost % calculated",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-RST-RECO-020",
    "featureId": "restaurant-and-food-service__menu__recipe-and-costing"
  },
  {
    "title": "Ingredient price change updates cost",
    "description": "Ingredient price change updates cost.",
    "preconditions": "",
    "steps": [
      "Change ingredient price"
    ],
    "expectedResult": "Dish costs recalculated",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-RST-RECO-021",
    "featureId": "restaurant-and-food-service__menu__recipe-and-costing"
  },
  {
    "title": "Allergens shown on menu and ticket",
    "description": "Allergens shown on menu and ticket.",
    "preconditions": "Dish contains nuts",
    "steps": [
      "Order dish"
    ],
    "expectedResult": "Allergen shown to guest and on kitchen ticket",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-RST-ALIN-019",
    "featureId": "restaurant-and-food-service__menu__allergen-information"
  },
  {
    "title": "Open table order and send to kitchen",
    "description": "Open table order and send to kitchen.",
    "preconditions": "Table free",
    "steps": [
      "Open table",
      "Add items",
      "Send"
    ],
    "expectedResult": "Ticket on KDS; table Occupied",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-RST-DIINOR-018",
    "featureId": "restaurant-and-food-service__order-taking__dine-in-orders"
  },
  {
    "title": "Add items to running order",
    "description": "Add items to running order.",
    "preconditions": "Open order",
    "steps": [
      "Add item"
    ],
    "expectedResult": "Only new item sent to kitchen",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-RST-DIINOR-019",
    "featureId": "restaurant-and-food-service__order-taking__dine-in-orders"
  },
  {
    "title": "Tickets routed to correct station",
    "description": "Tickets routed to correct station.",
    "preconditions": "Grill and bar stations",
    "steps": [
      "Order steak and drink"
    ],
    "expectedResult": "Steak on grill KDS; drink on bar KDS",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-RST-KIDI-017",
    "featureId": "restaurant-and-food-service__kitchen__kitchen-display"
  },
  {
    "title": "Bump ticket marks ready",
    "description": "Bump ticket marks ready.",
    "preconditions": "",
    "steps": [
      "Bump"
    ],
    "expectedResult": "Server notified; timer stops",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-RST-KIDI-018",
    "featureId": "restaurant-and-food-service__kitchen__kitchen-display"
  },
  {
    "title": "Orders queued by time and priority",
    "description": "Orders queued by time and priority.",
    "preconditions": "Several orders",
    "steps": [
      "View queue"
    ],
    "expectedResult": "Oldest first; rush flagged",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-RST-PRQU-016",
    "featureId": "restaurant-and-food-service__kitchen__preparation-queue"
  },
  {
    "title": "Sale deducts ingredients",
    "description": "Sale deducts ingredients.",
    "preconditions": "Recipe defined",
    "steps": [
      "Sell dish"
    ],
    "expectedResult": "Ingredient stock reduced by recipe qty",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-RST-STDE-021",
    "featureId": "restaurant-and-food-service__kitchen__stock-deduction"
  },
  {
    "title": "86 item when stock out",
    "description": "86 item when stock out.",
    "preconditions": "Ingredient 0",
    "steps": [
      "Try order"
    ],
    "expectedResult": "Item unavailable on POS/online",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-RST-STDE-022",
    "featureId": "restaurant-and-food-service__kitchen__stock-deduction"
  },
  {
    "title": "Record wastage with reason",
    "description": "Record wastage with reason.",
    "preconditions": "",
    "steps": [
      "Log waste"
    ],
    "expectedResult": "Stock reduced; wastage report updated",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-RST-WARE-018",
    "featureId": "restaurant-and-food-service__kitchen__wastage-recording"
  },
  {
    "title": "Split bill by item and equally",
    "description": "Split bill by item and equally.",
    "preconditions": "Bill 3 people",
    "steps": [
      "Split by item",
      "Split equally"
    ],
    "expectedResult": "Totals sum to original incl tax/service",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-RST-SPBI-022",
    "featureId": "restaurant-and-food-service__service-and-billing__split-bill"
  },
  {
    "title": "VAT receipt printed with correct VAT",
    "description": "VAT receipt printed with correct VAT.",
    "preconditions": "VAT 7.5%",
    "steps": [
      "Pay bill"
    ],
    "expectedResult": "Receipt shows VAT and totals; sequential receipt no",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-RST-PAVARE-030",
    "featureId": "restaurant-and-food-service__service-and-billing__payments-and-vat-receipts__22o8g"
  },
  {
    "title": "Void after payment needs manager",
    "description": "Void after payment needs manager.",
    "preconditions": "Paid bill",
    "steps": [
      "Void as cashier"
    ],
    "expectedResult": "Manager PIN required; audited",
    "testType": "Permission",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-RST-PAVARE-031",
    "featureId": "restaurant-and-food-service__service-and-billing__payments-and-vat-receipts__22o8g"
  },
  {
    "title": "Purchase suggestion below par",
    "description": "Purchase suggestion below par.",
    "preconditions": "Par 10, stock 4",
    "steps": [
      "Run suggestions"
    ],
    "expectedResult": "Order 6 suggested",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-RST-INPU-019",
    "featureId": "restaurant-and-food-service__kitchen__inventory-and-purchasing__usbf6"
  },
  {
    "title": "Reservation blocks table at time",
    "description": "Reservation blocks table at time.",
    "preconditions": "Table 4 free",
    "steps": [
      "Reserve 8pm"
    ],
    "expectedResult": "Table held 7:45-9:45; double booking blocked",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-RST-TARE-020",
    "featureId": "restaurant-and-food-service__customers-and-loyalty__b7tw2__table-reservations__hb364"
  },
  {
    "title": "Gift card balance redeemed",
    "description": "Gift card balance redeemed.",
    "preconditions": "Card 1000",
    "steps": [
      "Pay 600"
    ],
    "expectedResult": "Balance 400",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-RST-LOGICA-024",
    "featureId": "restaurant-and-food-service__customers-and-loyalty__b7tw2__loyalty-and-gift-cards__010mb"
  },
  {
    "title": "Book shipment and generate tracking ID / label",
    "description": "Book shipment and generate tracking ID / label.",
    "preconditions": "Merchant",
    "steps": [
      "Book shipment"
    ],
    "expectedResult": "Unique tracking ID and printable label",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-LOG-SHBO-030",
    "featureId": "logistics-and-transportation__shipments__shipment-booking"
  },
  {
    "title": "Weight/dimension validation",
    "description": "Weight/dimension validation.",
    "preconditions": "",
    "steps": [
      "Enter 0 kg"
    ],
    "expectedResult": "Rejected",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-LOG-SHBO-031",
    "featureId": "logistics-and-transportation__shipments__shipment-booking"
  },
  {
    "title": "Rate by zone, weight and volumetric weight",
    "description": "Rate by zone, weight and volumetric weight.",
    "preconditions": "Rate card",
    "steps": [
      "Quote 2kg actual, 5kg volumetric"
    ],
    "expectedResult": "Charged on 5kg",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-LOG-FRRA-024",
    "featureId": "logistics-and-transportation__shipments__freight-rating"
  },
  {
    "title": "Assign only drivers with valid licence",
    "description": "Assign only drivers with valid licence.",
    "preconditions": "Expired licence",
    "steps": [
      "Assign trip"
    ],
    "expectedResult": "Blocked",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-LOG-DRMA-022",
    "featureId": "logistics-and-transportation__fleet__driver-management"
  },
  {
    "title": "Fuel log calculates km/litre",
    "description": "Fuel log calculates km/litre.",
    "preconditions": "Logs",
    "steps": [
      "Add fuel entry"
    ],
    "expectedResult": "Efficiency calculated; anomaly flagged",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-LOG-FUTR-020",
    "featureId": "logistics-and-transportation__fleet__fuel-tracking"
  },
  {
    "title": "Service due alert by km/date",
    "description": "Service due alert by km/date.",
    "preconditions": "Service every 5000 km",
    "steps": [
      "Reach 5000"
    ],
    "expectedResult": "Alert; vehicle flagged",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-LOG-VEMA2-022",
    "featureId": "logistics-and-transportation__fleet__vehicle-maintenance"
  },
  {
    "title": "Optimise multi-stop route",
    "description": "Optimise multi-stop route.",
    "preconditions": "10 stops",
    "steps": [
      "Optimise"
    ],
    "expectedResult": "Ordered route with distance/time; respects time windows",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-LOG-ROPL-015",
    "featureId": "logistics-and-transportation__routing__route-planning"
  },
  {
    "title": "Assign shipments to driver",
    "description": "Assign shipments to driver.",
    "preconditions": "Unassigned shipments",
    "steps": [
      "Drag to driver"
    ],
    "expectedResult": "Driver app receives run sheet",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-LOG-DIBO-025",
    "featureId": "logistics-and-transportation__routing__dispatch-board"
  },
  {
    "title": "Customer tracking shows live location",
    "description": "Customer tracking shows live location.",
    "preconditions": "Out for delivery",
    "steps": [
      "Open tracking link"
    ],
    "expectedResult": "Location and ETA updated",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-LOG-LIGPTR-023",
    "featureId": "logistics-and-transportation__routing__live-gps-tracking"
  },
  {
    "title": "Location only shared during active delivery",
    "description": "Location only shared during active delivery.",
    "preconditions": "Delivered",
    "steps": [
      "Open link"
    ],
    "expectedResult": "No live location",
    "testType": "Security",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-LOG-LIGPTR-024",
    "featureId": "logistics-and-transportation__routing__live-gps-tracking"
  },
  {
    "title": "Scan to load verifies manifest",
    "description": "Scan to load verifies manifest.",
    "preconditions": "Manifest of 20",
    "steps": [
      "Scan 19",
      "Close"
    ],
    "expectedResult": "Missing parcel reported",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-LOG-LOUN-022",
    "featureId": "logistics-and-transportation__warehouse-interface__loading-and-unloading"
  },
  {
    "title": "No double booking of dock slot",
    "description": "No double booking of dock slot.",
    "preconditions": "Slot taken",
    "steps": [
      "Book same slot"
    ],
    "expectedResult": "Blocked",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-LOG-DOSC-024",
    "featureId": "logistics-and-transportation__warehouse-interface__dock-scheduling"
  },
  {
    "title": "Failed delivery returns to merchant",
    "description": "Failed delivery returns to merchant.",
    "preconditions": "Attempts exhausted",
    "steps": [
      "Mark RTO"
    ],
    "expectedResult": "Return shipment created; merchant notified",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-LOG-RELO-021",
    "featureId": "logistics-and-transportation__warehouse-interface__returns-logistics"
  },
  {
    "title": "Rider COD collection reconciled",
    "description": "Rider COD collection reconciled.",
    "preconditions": "Rider delivered 5 COD",
    "steps": [
      "Deposit at hub"
    ],
    "expectedResult": "Collected = expected; shortfall flagged",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-LOG-CAONDE-027",
    "featureId": "logistics-and-transportation__shipments__cash-on-delivery-remittance__ri5ts"
  },
  {
    "title": "Merchant remittance excludes fees",
    "description": "Merchant remittance excludes fees.",
    "preconditions": "",
    "steps": [
      "Run remittance"
    ],
    "expectedResult": "Net = COD - delivery fee - COD charge",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-LOG-CAONDE-028",
    "featureId": "logistics-and-transportation__shipments__cash-on-delivery-remittance__ri5ts"
  },
  {
    "title": "Generate commercial invoice",
    "description": "Generate commercial invoice.",
    "preconditions": "International shipment",
    "steps": [
      "Generate docs"
    ],
    "expectedResult": "Invoice with HS codes, values",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-LOG-CUDO-031",
    "featureId": "logistics-and-transportation__shipments__customs-and-documentation__4a5p2"
  },
  {
    "title": "Max driving hours enforced",
    "description": "Max driving hours enforced.",
    "preconditions": "Limit 10h",
    "steps": [
      "Assign trip exceeding"
    ],
    "expectedResult": "Warning/block",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-LOG-DRHOCO-027",
    "featureId": "logistics-and-transportation__fleet__driver-hours-and-compliance__3lfd8"
  },
  {
    "title": "Create request from portal, phone and email",
    "description": "Create request from portal, phone and email.",
    "preconditions": "",
    "steps": [
      "Raise via each channel"
    ],
    "expectedResult": "Request created with customer, asset and channel",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FSM-REIN-023",
    "featureId": "field-service-management__service-requests__request-intake"
  },
  {
    "title": "Duplicate open request warning",
    "description": "Duplicate open request warning.",
    "preconditions": "Open request on asset",
    "steps": [
      "Raise again"
    ],
    "expectedResult": "Warning with link",
    "testType": "Validation",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-FSM-REIN-024",
    "featureId": "field-service-management__service-requests__request-intake"
  },
  {
    "title": "Priority from impact and urgency matrix",
    "description": "Priority from impact and urgency matrix.",
    "preconditions": "Matrix configured",
    "steps": [
      "Set high impact + urgent"
    ],
    "expectedResult": "Priority P1 and SLA applied",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FSM-TRPR-022",
    "featureId": "field-service-management__service-requests__triage-and-prioritisation"
  },
  {
    "title": "Schedule technician with no overlap",
    "description": "Schedule technician with no overlap.",
    "preconditions": "Tech booked 10-12",
    "steps": [
      "Book 11-13"
    ],
    "expectedResult": "Conflict warning",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FSM-TESC-025",
    "featureId": "field-service-management__dispatch__technician-scheduling"
  },
  {
    "title": "Respect technician leave",
    "description": "Respect technician leave.",
    "preconditions": "Tech on leave",
    "steps": [
      "Schedule"
    ],
    "expectedResult": "Not available",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-FSM-TESC-026",
    "featureId": "field-service-management__dispatch__technician-scheduling"
  },
  {
    "title": "Mandatory checklist before completion",
    "description": "Mandatory checklist before completion.",
    "preconditions": "Checklist required",
    "steps": [
      "Complete job"
    ],
    "expectedResult": "Blocked until filled",
    "testType": "Validation",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FSM-CHFO-023",
    "featureId": "field-service-management__job-execution__checklists-and-forms"
  },
  {
    "title": "Parts used deduct van stock",
    "description": "Parts used deduct van stock.",
    "preconditions": "Van stock 5",
    "steps": [
      "Use 2 on job"
    ],
    "expectedResult": "Van stock 3; parts on invoice",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FSM-PACO-023",
    "featureId": "field-service-management__job-execution__parts-consumption"
  },
  {
    "title": "Travel and work time captured by status",
    "description": "Travel and work time captured by status.",
    "preconditions": "",
    "steps": [
      "Start travel",
      "Arrive",
      "Complete"
    ],
    "expectedResult": "Travel and on-site time recorded separately",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-FSM-TITRLO-026",
    "featureId": "field-service-management__job-execution__time-and-travel-logging"
  },
  {
    "title": "Capture signature to close job",
    "description": "Capture signature to close job.",
    "preconditions": "Job done",
    "steps": [
      "Customer signs"
    ],
    "expectedResult": "Signature and name stored on job report PDF",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FSM-CUSI-024",
    "featureId": "field-service-management__job-execution__customer-signature"
  },
  {
    "title": "Contract covers labour; no charge on invoice",
    "description": "Contract covers labour; no charge on invoice.",
    "preconditions": "Active contract",
    "steps": [
      "Complete covered job"
    ],
    "expectedResult": "Covered items zero-priced",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FSM-SECO-016",
    "featureId": "field-service-management__contracts__service-contracts"
  },
  {
    "title": "Expired contract not applied",
    "description": "Expired contract not applied.",
    "preconditions": "Expired",
    "steps": [
      "Complete job"
    ],
    "expectedResult": "Billed normally; renewal alert",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-FSM-SECO-017",
    "featureId": "field-service-management__contracts__service-contracts"
  },
  {
    "title": "Invoice from completed job",
    "description": "Invoice from completed job.",
    "preconditions": "Labour 2h + parts",
    "steps": [
      "Complete",
      "Invoice"
    ],
    "expectedResult": "Correct totals incl tax",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FSM-JOIN-033",
    "featureId": "field-service-management__billing__mnskq__job-invoicing__kjb55"
  },
  {
    "title": "Customer approves on-site quote",
    "description": "Customer approves on-site quote.",
    "preconditions": "",
    "steps": [
      "Create quote",
      "Customer approves"
    ],
    "expectedResult": "New job/line created",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-FSM-QUUP-028",
    "featureId": "field-service-management__billing__mnskq__quotes-and-upsell__qnurj"
  },
  {
    "title": "Complete job offline and sync",
    "description": "Complete job offline and sync.",
    "preconditions": "No network",
    "steps": [
      "Complete job",
      "Reconnect"
    ],
    "expectedResult": "Synced once; no data loss or duplicate",
    "testType": "Integration",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FSM-OFMO-027",
    "featureId": "field-service-management__job-execution__offline-mode__p7r1x"
  },
  {
    "title": "Issue policy after payment",
    "description": "Issue policy after payment.",
    "preconditions": "Accepted quote",
    "steps": [
      "Pay premium",
      "Issue"
    ],
    "expectedResult": "Policy number, schedule PDF and effective dates",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-INS-POIS-027",
    "featureId": "insurance-management__policy__policy-issuance"
  },
  {
    "title": "Cannot issue without required documents",
    "description": "Cannot issue without required documents.",
    "preconditions": "Docs missing",
    "steps": [
      "Issue"
    ],
    "expectedResult": "Blocked",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-INS-POIS-028",
    "featureId": "insurance-management__policy__policy-issuance"
  },
  {
    "title": "Risk score from questionnaire",
    "description": "Risk score from questionnaire.",
    "preconditions": "Rules",
    "steps": [
      "Answer questionnaire"
    ],
    "expectedResult": "Score and risk class assigned",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-INS-RIAS-023",
    "featureId": "insurance-management__underwriting__risk-assessment"
  },
  {
    "title": "FNOL against active policy",
    "description": "FNOL against active policy.",
    "preconditions": "Active policy",
    "steps": [
      "Register claim"
    ],
    "expectedResult": "Claim number; coverage check passed",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-INS-CLIN-023",
    "featureId": "insurance-management__claims__claim-intake"
  },
  {
    "title": "Claim on lapsed policy or outside period",
    "description": "Claim on lapsed policy or outside period.",
    "preconditions": "Lapsed",
    "steps": [
      "Register"
    ],
    "expectedResult": "Rejected/flagged",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-INS-CLIN-024",
    "featureId": "insurance-management__claims__claim-intake"
  },
  {
    "title": "Settle claim with deductible",
    "description": "Settle claim with deductible.",
    "preconditions": "Approved 10000, deductible 1000",
    "steps": [
      "Settle"
    ],
    "expectedResult": "Payout 9000; claim Closed",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-INS-CLSE-032",
    "featureId": "insurance-management__claims__claim-settlement"
  },
  {
    "title": "Settlement over authority needs approval",
    "description": "Settlement over authority needs approval.",
    "preconditions": "Limit 50000",
    "steps": [
      "Settle 60000"
    ],
    "expectedResult": "Routed for approval",
    "testType": "Permission",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-INS-CLSE-033",
    "featureId": "insurance-management__claims__claim-settlement"
  },
  {
    "title": "Fraud indicators flag claim",
    "description": "Fraud indicators flag claim.",
    "preconditions": "Multiple claims in 30 days",
    "steps": [
      "Register claim"
    ],
    "expectedResult": "Flagged for investigation; payout held",
    "testType": "Security",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-INS-FRIN-027",
    "featureId": "insurance-management__claims__fraud-investigation"
  },
  {
    "title": "Policyholder views only own policies",
    "description": "Policyholder views only own policies.",
    "preconditions": "Two customers",
    "steps": [
      "Open other policy"
    ],
    "expectedResult": "Denied",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-INS-CUPO-015",
    "featureId": "insurance-management__distribution__customer-portal"
  },
  {
    "title": "Download policy documents",
    "description": "Download policy documents.",
    "preconditions": "",
    "steps": [
      "Download"
    ],
    "expectedResult": "Correct PDF",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-INS-CUPO-016",
    "featureId": "insurance-management__distribution__customer-portal"
  },
  {
    "title": "Policy lapses after grace period",
    "description": "Policy lapses after grace period.",
    "preconditions": "Grace 30 days",
    "steps": [
      "Miss payment 31 days"
    ],
    "expectedResult": "Status Lapsed; notices sent",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-INS-PRCOGR-039",
    "featureId": "insurance-management__policy__premium-collection-and-grace-period__g93hg"
  },
  {
    "title": "Reinstate lapsed policy",
    "description": "Reinstate lapsed policy.",
    "preconditions": "Lapsed",
    "steps": [
      "Pay arrears"
    ],
    "expectedResult": "Reinstated per rules",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-INS-PRCOGR-040",
    "featureId": "insurance-management__policy__premium-collection-and-grace-period__g93hg"
  },
  {
    "title": "Assign surveyor and upload report",
    "description": "Assign surveyor and upload report.",
    "preconditions": "Claim",
    "steps": [
      "Assign",
      "Upload report"
    ],
    "expectedResult": "Report linked; assessment unlocked",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-INS-CLDOSU-028",
    "featureId": "insurance-management__claims__claim-document-and-survey-management__cbk1f"
  },
  {
    "title": "Open matter with client, type and responsible lawyer",
    "description": "Open matter with client, type and responsible lawyer.",
    "preconditions": "",
    "steps": [
      "Create matter"
    ],
    "expectedResult": "Unique matter number; team assigned",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-LEG-MAIN-026",
    "featureId": "legal-practice-management__matters__matter-intake"
  },
  {
    "title": "Matter cannot open before conflict check clears",
    "description": "Matter cannot open before conflict check clears.",
    "preconditions": "Check pending",
    "steps": [
      "Open matter"
    ],
    "expectedResult": "Blocked",
    "testType": "Validation",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-LEG-MAIN-027",
    "featureId": "legal-practice-management__matters__matter-intake"
  },
  {
    "title": "Conflict search across clients and opposing parties",
    "description": "Conflict search across clients and opposing parties.",
    "preconditions": "Opposing party exists as client",
    "steps": [
      "Run check"
    ],
    "expectedResult": "Potential conflict flagged with matches",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-LEG-COCH-030",
    "featureId": "legal-practice-management__matters__conflict-check"
  },
  {
    "title": "Record conflict waiver",
    "description": "Record conflict waiver.",
    "preconditions": "Conflict found",
    "steps": [
      "Approve waiver"
    ],
    "expectedResult": "Waiver with approver stored",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-LEG-COCH-031",
    "featureId": "legal-practice-management__matters__conflict-check"
  },
  {
    "title": "Generate engagement letter from template",
    "description": "Generate engagement letter from template.",
    "preconditions": "Matter",
    "steps": [
      "Generate"
    ],
    "expectedResult": "Letter with fee terms; e-sign sent",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-LEG-ENLE-020",
    "featureId": "legal-practice-management__clients__engagement-letters"
  },
  {
    "title": "Merge matter data into draft",
    "description": "Merge matter data into draft.",
    "preconditions": "Template",
    "steps": [
      "Draft"
    ],
    "expectedResult": "Fields filled; saved to matter",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-LEG-DODR-019",
    "featureId": "legal-practice-management__documents__document-drafting"
  },
  {
    "title": "Ethical wall hides matter documents",
    "description": "Ethical wall hides matter documents.",
    "preconditions": "Wall on matter",
    "steps": [
      "Open as walled user"
    ],
    "expectedResult": "Access denied",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-LEG-DORE-032",
    "featureId": "legal-practice-management__documents__document-review"
  },
  {
    "title": "Calculate limitation date",
    "description": "Calculate limitation date.",
    "preconditions": "Event date, 3-year limit",
    "steps": [
      "Add deadline"
    ],
    "expectedResult": "Correct date; reminders at 90/30/7 days",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-LEG-DELIPE-032",
    "featureId": "legal-practice-management__matters__deadlines-and-limitation-periods__6t1sy"
  },
  {
    "title": "Court holiday adjustment",
    "description": "Court holiday adjustment.",
    "preconditions": "Due on holiday",
    "steps": [
      "Calculate"
    ],
    "expectedResult": "Moved to next working day",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-LEG-DELIPE-033",
    "featureId": "legal-practice-management__matters__deadlines-and-limitation-periods__6t1sy"
  },
  {
    "title": "Client sees only own matters",
    "description": "Client sees only own matters.",
    "preconditions": "Two clients",
    "steps": [
      "Open other matter"
    ],
    "expectedResult": "Denied",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-LEG-SECLPO-022",
    "featureId": "legal-practice-management__client-portal__wmaqj__secure-client-portal__519ms"
  },
  {
    "title": "Pay invoice from portal",
    "description": "Pay invoice from portal.",
    "preconditions": "Open invoice",
    "steps": [
      "Pay"
    ],
    "expectedResult": "Invoice paid; trust/office account posted correctly",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-LEG-SECLPO-023",
    "featureId": "legal-practice-management__client-portal__wmaqj__secure-client-portal__519ms"
  },
  {
    "title": "Award tender creates contract and budget",
    "description": "Award tender creates contract and budget.",
    "preconditions": "Evaluated tender",
    "steps": [
      "Award"
    ],
    "expectedResult": "Contract with value; budget baseline created",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CON-COAW-016",
    "featureId": "construction-and-contracting__pre-construction__contract-award"
  },
  {
    "title": "Losing bidders notified",
    "description": "Losing bidders notified.",
    "preconditions": "",
    "steps": [
      "Award"
    ],
    "expectedResult": "Other bidders notified",
    "testType": "Functional",
    "priority": "Low",
    "isMandatory": false,
    "id": "TC-CON-COAW-017",
    "featureId": "construction-and-contracting__pre-construction__contract-award"
  },
  {
    "title": "Submit daily report with weather, labour, photos",
    "description": "Submit daily report with weather, labour, photos.",
    "preconditions": "Site engineer",
    "steps": [
      "Submit"
    ],
    "expectedResult": "Locked after approval; visible to PM",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-CON-DASIRE-021",
    "featureId": "construction-and-contracting__site-operations__daily-site-report"
  },
  {
    "title": "Labour hours by cost code",
    "description": "Labour hours by cost code.",
    "preconditions": "Attendance",
    "steps": [
      "Log hours"
    ],
    "expectedResult": "Cost posted to cost code",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CON-LAPLTR-021",
    "featureId": "construction-and-contracting__site-operations__labour-and-plant-tracking"
  },
  {
    "title": "Plant idle time recorded",
    "description": "Plant idle time recorded.",
    "preconditions": "",
    "steps": [
      "Log idle"
    ],
    "expectedResult": "Idle cost shown in report",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-CON-LAPLTR-022",
    "featureId": "construction-and-contracting__site-operations__labour-and-plant-tracking"
  },
  {
    "title": "Snag closed only with photo evidence",
    "description": "Snag closed only with photo evidence.",
    "preconditions": "Open snag",
    "steps": [
      "Close without photo"
    ],
    "expectedResult": "Blocked",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-CON-SNLI-022",
    "featureId": "construction-and-contracting__site-operations__snag-list"
  },
  {
    "title": "Overrun alert when actual > budget",
    "description": "Overrun alert when actual > budget.",
    "preconditions": "Budget 100000",
    "steps": [
      "Post costs 105000"
    ],
    "expectedResult": "Alert to PM",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-CON-JOCOBU-019",
    "featureId": "construction-and-contracting__commercial__job-costing-and-budget-control__p3cne"
  },
  {
    "title": "Committed cost from POs",
    "description": "Committed cost from POs.",
    "preconditions": "PO raised",
    "steps": [
      "View budget"
    ],
    "expectedResult": "Committed updated",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-CON-JOCOBU-020",
    "featureId": "construction-and-contracting__commercial__job-costing-and-budget-control__p3cne"
  },
  {
    "title": "Hold point blocks next activity",
    "description": "Hold point blocks next activity.",
    "preconditions": "Hold point pending",
    "steps": [
      "Start next activity"
    ],
    "expectedResult": "Blocked until inspection passed",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-CON-INQUCH-019",
    "featureId": "construction-and-contracting__quality-and-handover__poly3__inspections-and-quality-checks__uos92"
  },
  {
    "title": "Handover checklist complete before certificate",
    "description": "Handover checklist complete before certificate.",
    "preconditions": "Items missing",
    "steps": [
      "Issue certificate"
    ],
    "expectedResult": "Blocked",
    "testType": "Validation",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-CON-PRHAAS-017",
    "featureId": "construction-and-contracting__quality-and-handover__poly3__project-handover-and-as-builts__hnkbu"
  },
  {
    "title": "Open job card from vehicle plate/VIN",
    "description": "Open job card from vehicle plate/VIN.",
    "preconditions": "Customer vehicle",
    "steps": [
      "Open job card"
    ],
    "expectedResult": "Card with customer, vehicle, mileage and complaints",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-AUT-JOCA-027",
    "featureId": "automotive-dealership-and-workshop__workshop__job-card"
  },
  {
    "title": "Cannot close job card with open tasks",
    "description": "Cannot close job card with open tasks.",
    "preconditions": "Open task",
    "steps": [
      "Close"
    ],
    "expectedResult": "Blocked",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-AUT-JOCA-028",
    "featureId": "automotive-dealership-and-workshop__workshop__job-card"
  },
  {
    "title": "Digital inspection with photos shared to customer",
    "description": "Digital inspection with photos shared to customer.",
    "preconditions": "Job card",
    "steps": [
      "Complete inspection"
    ],
    "expectedResult": "Red/amber/green items with photos sent to customer",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-AUT-VEIN2-014",
    "featureId": "automotive-dealership-and-workshop__workshop__vehicle-inspection"
  },
  {
    "title": "Customer approves estimate before work",
    "description": "Customer approves estimate before work.",
    "preconditions": "Estimate sent",
    "steps": [
      "Approve via link"
    ],
    "expectedResult": "Approved items added to job; unapproved deferred",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-AUT-REES-023",
    "featureId": "automotive-dealership-and-workshop__workshop__repair-estimate"
  },
  {
    "title": "Extra work requires re-approval",
    "description": "Extra work requires re-approval.",
    "preconditions": "",
    "steps": [
      "Add item after approval"
    ],
    "expectedResult": "Customer approval required",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-AUT-REES-024",
    "featureId": "automotive-dealership-and-workshop__workshop__repair-estimate"
  },
  {
    "title": "Technician efficiency from clocked vs billed hours",
    "description": "Technician efficiency from clocked vs billed hours.",
    "preconditions": "Clock on/off",
    "steps": [
      "View report"
    ],
    "expectedResult": "Efficiency % correct",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-AUT-TEAL-025",
    "featureId": "automotive-dealership-and-workshop__workshop__technician-allocation"
  },
  {
    "title": "Find part by vehicle model and part number",
    "description": "Find part by vehicle model and part number.",
    "preconditions": "Catalogue",
    "steps": [
      "Search"
    ],
    "expectedResult": "Compatible parts shown",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-AUT-PACA-020",
    "featureId": "automotive-dealership-and-workshop__parts__parts-catalogue"
  },
  {
    "title": "Issuing parts to job reduces stock",
    "description": "Issuing parts to job reduces stock.",
    "preconditions": "Stock 4",
    "steps": [
      "Issue 2"
    ],
    "expectedResult": "Stock 2; part on job card",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-AUT-PAST-018",
    "featureId": "automotive-dealership-and-workshop__parts__parts-stock"
  },
  {
    "title": "Auto order for job backorder",
    "description": "Auto order for job backorder.",
    "preconditions": "Part out of stock",
    "steps": [
      "Add to job"
    ],
    "expectedResult": "Supplier order suggested; job waits for parts",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-AUT-PAOR-030",
    "featureId": "automotive-dealership-and-workshop__parts__parts-ordering"
  },
  {
    "title": "Return unused part to supplier",
    "description": "Return unused part to supplier.",
    "preconditions": "Unused part",
    "steps": [
      "Return"
    ],
    "expectedResult": "Stock and supplier credit updated",
    "testType": "Functional",
    "priority": "Low",
    "isMandatory": true,
    "id": "TC-AUT-PARE-026",
    "featureId": "automotive-dealership-and-workshop__parts__parts-returns"
  },
  {
    "title": "Invoice from job card",
    "description": "Invoice from job card.",
    "preconditions": "Completed job",
    "steps": [
      "Invoice"
    ],
    "expectedResult": "Labour + parts + tax correct; vehicle released after payment",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-AUT-WOINPA-024",
    "featureId": "automotive-dealership-and-workshop__workshop__workshop-invoicing-and-payment__qm9av"
  },
  {
    "title": "PDI must pass before delivery",
    "description": "PDI must pass before delivery.",
    "preconditions": "PDI incomplete",
    "steps": [
      "Deliver vehicle"
    ],
    "expectedResult": "Blocked",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-AUT-VEREDE-018",
    "featureId": "automotive-dealership-and-workshop__sales__vehicle-registration-and-delivery__5o0ao"
  },
  {
    "title": "Register member with waiver and photo",
    "description": "Register member with waiver and photo.",
    "preconditions": "",
    "steps": [
      "Register",
      "Sign waiver"
    ],
    "expectedResult": "Member ID/QR issued",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FIT-MERE-019",
    "featureId": "fitness-and-wellness__membership__member-registration"
  },
  {
    "title": "Duplicate member by phone/email",
    "description": "Duplicate member by phone/email.",
    "preconditions": "Exists",
    "steps": [
      "Register again"
    ],
    "expectedResult": "Warning",
    "testType": "Validation",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-FIT-MERE-020",
    "featureId": "fitness-and-wellness__membership__member-registration"
  },
  {
    "title": "Check-in with QR validates membership",
    "description": "Check-in with QR validates membership.",
    "preconditions": "Active member",
    "steps": [
      "Scan QR"
    ],
    "expectedResult": "Allowed; visit logged",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FIT-MECHIN-020",
    "featureId": "fitness-and-wellness__membership__member-check-in"
  },
  {
    "title": "Expired or frozen member denied",
    "description": "Expired or frozen member denied.",
    "preconditions": "Expired",
    "steps": [
      "Scan"
    ],
    "expectedResult": "Denied with reason",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-FIT-MECHIN-021",
    "featureId": "fitness-and-wellness__membership__member-check-in"
  },
  {
    "title": "Session deducted on attendance",
    "description": "Session deducted on attendance.",
    "preconditions": "10-session pack",
    "steps": [
      "Attend session"
    ],
    "expectedResult": "9 remaining",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FIT-PETRPA-015",
    "featureId": "fitness-and-wellness__training__personal-training-packages"
  },
  {
    "title": "Package expiry",
    "description": "Package expiry.",
    "preconditions": "Expired pack",
    "steps": [
      "Book session"
    ],
    "expectedResult": "Blocked",
    "testType": "Boundary",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-FIT-PETRPA-016",
    "featureId": "fitness-and-wellness__training__personal-training-packages"
  },
  {
    "title": "Assign programme to member",
    "description": "Assign programme to member.",
    "preconditions": "Trainer",
    "steps": [
      "Assign"
    ],
    "expectedResult": "Member sees programme in app",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-FIT-WOPR-017",
    "featureId": "fitness-and-wellness__training__workout-programmes"
  },
  {
    "title": "Out-of-order equipment flagged",
    "description": "Out-of-order equipment flagged.",
    "preconditions": "",
    "steps": [
      "Report fault"
    ],
    "expectedResult": "Equipment marked OOO; ticket created",
    "testType": "Functional",
    "priority": "Low",
    "isMandatory": true,
    "id": "TC-FIT-EQMA-016",
    "featureId": "fitness-and-wellness__facility__equipment-maintenance"
  },
  {
    "title": "Monthly auto-debit",
    "description": "Monthly auto-debit.",
    "preconditions": "Active plan",
    "steps": [
      "Billing date"
    ],
    "expectedResult": "Charged; receipt sent",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-FIT-REMEBI-036",
    "featureId": "fitness-and-wellness__billing__8jzir__recurring-membership-billing__6u493"
  },
  {
    "title": "Failed payment restricts access after grace",
    "description": "Failed payment restricts access after grace.",
    "preconditions": "Failed charge, grace 5 days",
    "steps": [
      "Day 6 check-in"
    ],
    "expectedResult": "Denied until paid",
    "testType": "Negative",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-FIT-REMEBI-037",
    "featureId": "fitness-and-wellness__billing__8jzir__recurring-membership-billing__6u493"
  },
  {
    "title": "Guest pass limit per month",
    "description": "Guest pass limit per month.",
    "preconditions": "2 per month",
    "steps": [
      "Use 3rd"
    ],
    "expectedResult": "Blocked",
    "testType": "Boundary",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-FIT-REGUPA-023",
    "featureId": "fitness-and-wellness__membership__referrals-and-guest-passes__u8h3g"
  },
  {
    "title": "Create and publish event page",
    "description": "Create and publish event page.",
    "preconditions": "Organiser",
    "steps": [
      "Create event",
      "Publish"
    ],
    "expectedResult": "Public page with date, venue, tickets",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-EVT-EVCR-021",
    "featureId": "event-management__event-setup__event-creation"
  },
  {
    "title": "End date before start date rejected",
    "description": "End date before start date rejected.",
    "preconditions": "",
    "steps": [
      "Save"
    ],
    "expectedResult": "Validation error",
    "testType": "Validation",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-EVT-EVCR-022",
    "featureId": "event-management__event-setup__event-creation"
  },
  {
    "title": "Speaker profile linked to sessions",
    "description": "Speaker profile linked to sessions.",
    "preconditions": "Speaker",
    "steps": [
      "Assign to session"
    ],
    "expectedResult": "Shown on agenda",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-EVT-SPMA-023",
    "featureId": "event-management__event-setup__speaker-management"
  },
  {
    "title": "Register and receive QR ticket",
    "description": "Register and receive QR ticket.",
    "preconditions": "Tickets available",
    "steps": [
      "Register",
      "Pay"
    ],
    "expectedResult": "QR ticket emailed; capacity reduced",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-EVT-ONRE-023",
    "featureId": "event-management__ticketing__online-registration"
  },
  {
    "title": "Sold-out ticket type blocked",
    "description": "Sold-out ticket type blocked.",
    "preconditions": "Capacity reached",
    "steps": [
      "Register"
    ],
    "expectedResult": "Sold out / waitlist",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-EVT-ONRE-024",
    "featureId": "event-management__ticketing__online-registration"
  },
  {
    "title": "Custom registration questions required",
    "description": "Custom registration questions required.",
    "preconditions": "Required question",
    "steps": [
      "Submit blank"
    ],
    "expectedResult": "Blocked",
    "testType": "Validation",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-EVT-ONRE-025",
    "featureId": "event-management__ticketing__online-registration"
  },
  {
    "title": "Promo code limited uses",
    "description": "Promo code limited uses.",
    "preconditions": "Limit 10",
    "steps": [
      "Use 11th time"
    ],
    "expectedResult": "Rejected",
    "testType": "Boundary",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-EVT-PRCO-030",
    "featureId": "event-management__ticketing__promo-codes"
  },
  {
    "title": "QR scan check-in once",
    "description": "QR scan check-in once.",
    "preconditions": "Valid ticket",
    "steps": [
      "Scan twice"
    ],
    "expectedResult": "First accepted; second flagged already checked in",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-EVT-ATCHIN-020",
    "featureId": "event-management__on-site__attendee-check-in"
  },
  {
    "title": "Offline scanning syncs",
    "description": "Offline scanning syncs.",
    "preconditions": "No network",
    "steps": [
      "Scan tickets",
      "Reconnect"
    ],
    "expectedResult": "Synced without duplicates",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-EVT-ATCHIN-021",
    "featureId": "event-management__on-site__attendee-check-in"
  },
  {
    "title": "Booth cannot be double-sold",
    "description": "Booth cannot be double-sold.",
    "preconditions": "Booth sold",
    "steps": [
      "Sell again"
    ],
    "expectedResult": "Blocked",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-EVT-EXBO-019",
    "featureId": "event-management__commercial__exhibitor-booths"
  },
  {
    "title": "Budget vs actual",
    "description": "Budget vs actual.",
    "preconditions": "Budget and expenses",
    "steps": [
      "View"
    ],
    "expectedResult": "Variance correct",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-EVT-EVBU-021",
    "featureId": "event-management__commercial__event-budget"
  },
  {
    "title": "Only registered attendees can join stream",
    "description": "Only registered attendees can join stream.",
    "preconditions": "Stream link",
    "steps": [
      "Open without ticket"
    ],
    "expectedResult": "Denied",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-EVT-LISTVI-024",
    "featureId": "event-management__virtual-and-hybrid__4flsc__live-streaming-and-virtual-sessions__c453m"
  },
  {
    "title": "Meeting request accepted adds to both agendas",
    "description": "Meeting request accepted adds to both agendas.",
    "preconditions": "",
    "steps": [
      "Request",
      "Accept"
    ],
    "expectedResult": "Meeting in both agendas; no overlap",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-EVT-NEMA-017",
    "featureId": "event-management__virtual-and-hybrid__4flsc__networking-and-matchmaking__hm8kd"
  },
  {
    "title": "Seat held during checkout",
    "description": "Seat held during checkout.",
    "preconditions": "Seat map",
    "steps": [
      "Two users pick same seat"
    ],
    "expectedResult": "Only one gets it",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-EVT-SEAL-026",
    "featureId": "event-management__ticketing__seating-and-allocation__qtkgd"
  },
  {
    "title": "Donor profile with giving history",
    "description": "Donor profile with giving history.",
    "preconditions": "Donations",
    "steps": [
      "Open donor"
    ],
    "expectedResult": "Lifetime and yearly totals correct",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-NPO-DOMA-024",
    "featureId": "non-profit-and-fundraising__donors__donor-management"
  },
  {
    "title": "Respect communication preferences",
    "description": "Respect communication preferences.",
    "preconditions": "Opted out of email",
    "steps": [
      "Send appeal"
    ],
    "expectedResult": "Excluded",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-NPO-DOMA-025",
    "featureId": "non-profit-and-fundraising__donors__donor-management"
  },
  {
    "title": "Campaign goal progress",
    "description": "Campaign goal progress.",
    "preconditions": "Goal 100000",
    "steps": [
      "Receive donations"
    ],
    "expectedResult": "Progress bar and totals correct",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-NPO-CAMA-020",
    "featureId": "non-profit-and-fundraising__campaigns__campaign-management"
  },
  {
    "title": "Supporter creates fundraising page",
    "description": "Supporter creates fundraising page.",
    "preconditions": "Campaign live",
    "steps": [
      "Create page",
      "Receive donation"
    ],
    "expectedResult": "Donation credited to page and campaign",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-NPO-PETOPE-013",
    "featureId": "non-profit-and-fundraising__campaigns__peer-to-peer-fundraising"
  },
  {
    "title": "Pledge instalments and outstanding",
    "description": "Pledge instalments and outstanding.",
    "preconditions": "Pledge 12000/12",
    "steps": [
      "Pay 3"
    ],
    "expectedResult": "Outstanding 9000; reminders scheduled",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-NPO-PLTR-023",
    "featureId": "non-profit-and-fundraising__campaigns__pledge-tracking"
  },
  {
    "title": "Thank-you email after donation",
    "description": "Thank-you email after donation.",
    "preconditions": "",
    "steps": [
      "Donate"
    ],
    "expectedResult": "Personalised thank-you sent once",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-NPO-DOCO-018",
    "featureId": "non-profit-and-fundraising__campaigns__donor-communications"
  },
  {
    "title": "Award with payment tranches",
    "description": "Award with payment tranches.",
    "preconditions": "Approved grant",
    "steps": [
      "Create award"
    ],
    "expectedResult": "Tranches scheduled; total = award",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-NPO-GRAW-015",
    "featureId": "non-profit-and-fundraising__grants__grant-awards"
  },
  {
    "title": "Report due reminder",
    "description": "Report due reminder.",
    "preconditions": "Report due date",
    "steps": [
      "Approach date"
    ],
    "expectedResult": "Reminder; overdue flagged",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-NPO-GRRE-016",
    "featureId": "non-profit-and-fundraising__grants__grant-reporting"
  },
  {
    "title": "Volunteer shift sign-up with capacity",
    "description": "Volunteer shift sign-up with capacity.",
    "preconditions": "Shift 5 slots",
    "steps": [
      "6th signs up"
    ],
    "expectedResult": "Waitlisted",
    "testType": "Boundary",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-NPO-VOMA-017",
    "featureId": "non-profit-and-fundraising__programmes__volunteer-management"
  },
  {
    "title": "Log volunteer hours",
    "description": "Log volunteer hours.",
    "preconditions": "",
    "steps": [
      "Log hours"
    ],
    "expectedResult": "Totals updated",
    "testType": "Functional",
    "priority": "Low",
    "isMandatory": false,
    "id": "TC-NPO-VOMA-018",
    "featureId": "non-profit-and-fundraising__programmes__volunteer-management"
  },
  {
    "title": "Indicators against targets",
    "description": "Indicators against targets.",
    "preconditions": "Targets set",
    "steps": [
      "Enter results"
    ],
    "expectedResult": "Progress % shown",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-NPO-IMME-019",
    "featureId": "non-profit-and-fundraising__programmes__impact-measurement"
  },
  {
    "title": "Restricted donation cannot fund other programme",
    "description": "Restricted donation cannot fund other programme.",
    "preconditions": "Restricted to education",
    "steps": [
      "Allocate to health"
    ],
    "expectedResult": "Blocked",
    "testType": "Validation",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-NPO-FUALRE-018",
    "featureId": "non-profit-and-fundraising__campaigns__fund-allocation-and-restricted-funds__15ey8"
  },
  {
    "title": "Gift Aid only with declaration",
    "description": "Gift Aid only with declaration.",
    "preconditions": "No declaration",
    "steps": [
      "Run claim"
    ],
    "expectedResult": "Excluded",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-NPO-GIAIMA-019",
    "featureId": "non-profit-and-fundraising__donors__gift-aid-and-matching-gifts__ubbth"
  },
  {
    "title": "Record planting with variety, area and date",
    "description": "Record planting with variety, area and date.",
    "preconditions": "Field",
    "steps": [
      "Record planting"
    ],
    "expectedResult": "Linked to field and season; expected harvest date set",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-AGR-PLRE-023",
    "featureId": "agriculture-and-farm-management__land-and-crops__planting-records"
  },
  {
    "title": "Vaccination schedule reminder",
    "description": "Vaccination schedule reminder.",
    "preconditions": "Schedule",
    "steps": [
      "Approach due date"
    ],
    "expectedResult": "Reminder; overdue animals flagged",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-AGR-HEVA-020",
    "featureId": "agriculture-and-farm-management__livestock__health-and-vaccination"
  },
  {
    "title": "Withdrawal period blocks milk/meat sale",
    "description": "Withdrawal period blocks milk/meat sale.",
    "preconditions": "Treated animal",
    "steps": [
      "Sell produce"
    ],
    "expectedResult": "Blocked until withdrawal ends",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-AGR-HEVA-021",
    "featureId": "agriculture-and-farm-management__livestock__health-and-vaccination"
  },
  {
    "title": "Expected calving date from service date",
    "description": "Expected calving date from service date.",
    "preconditions": "Service date",
    "steps": [
      "Record"
    ],
    "expectedResult": "Expected date calculated",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-AGR-BRRE-022",
    "featureId": "agriculture-and-farm-management__livestock__breeding-records"
  },
  {
    "title": "Record harvest quantity and grade per field",
    "description": "Record harvest quantity and grade per field.",
    "preconditions": "Planted field",
    "steps": [
      "Record harvest"
    ],
    "expectedResult": "Stock added; field status updated",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-AGR-HARE-024",
    "featureId": "agriculture-and-farm-management__harvest-and-sales__harvest-recording"
  },
  {
    "title": "Yield per hectare",
    "description": "Yield per hectare.",
    "preconditions": "Harvest 5000kg on 2ha",
    "steps": [
      "View"
    ],
    "expectedResult": "2500 kg/ha",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-AGR-YIAN-016",
    "featureId": "agriculture-and-farm-management__harvest-and-sales__yield-analysis"
  },
  {
    "title": "Deliveries against contract quantity",
    "description": "Deliveries against contract quantity.",
    "preconditions": "Contract 10t",
    "steps": [
      "Deliver 4t"
    ],
    "expectedResult": "6t outstanding",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-AGR-BUCO-017",
    "featureId": "agriculture-and-farm-management__harvest-and-sales__buyer-contracts"
  },
  {
    "title": "Alert farmers in affected area",
    "description": "Alert farmers in affected area.",
    "preconditions": "Pest risk high",
    "steps": [
      "Trigger alert"
    ],
    "expectedResult": "Notified for matching crops/fields",
    "testType": "Integration",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-AGR-WEPEAL-018",
    "featureId": "agriculture-and-farm-management__land-and-crops__weather-and-pest-alerts__mmbrh"
  },
  {
    "title": "Piece-rate wage calculation",
    "description": "Piece-rate wage calculation.",
    "preconditions": "Rate 5/kg",
    "steps": [
      "Picker 100kg"
    ],
    "expectedResult": "Wage 500",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-AGR-FALAPA-028",
    "featureId": "agriculture-and-farm-management__farm-finance-and-labour__bbua3__farm-labour-and-payroll__3g419"
  },
  {
    "title": "Profit = revenue - costs per field",
    "description": "Profit = revenue - costs per field.",
    "preconditions": "Costs and sales",
    "steps": [
      "View report"
    ],
    "expectedResult": "Correct profit per field",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-AGR-CRPR-024",
    "featureId": "agriculture-and-farm-management__farm-finance-and-labour__bbua3__crop-profitability__73zsa"
  },
  {
    "title": "Reading lower than previous flagged",
    "description": "Reading lower than previous flagged.",
    "preconditions": "Previous 1500",
    "steps": [
      "Enter 1400"
    ],
    "expectedResult": "Validation flag / rollover check",
    "testType": "Validation",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-UTL-MERE2-015",
    "featureId": "energy-and-utilities__metering__meter-reading"
  },
  {
    "title": "Photo reading with GPS",
    "description": "Photo reading with GPS.",
    "preconditions": "Mobile app",
    "steps": [
      "Capture"
    ],
    "expectedResult": "Photo and location attached",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-UTL-MERE2-016",
    "featureId": "energy-and-utilities__metering__meter-reading"
  },
  {
    "title": "Replacement closes old and opens new meter reads",
    "description": "Replacement closes old and opens new meter reads.",
    "preconditions": "Old meter",
    "steps": [
      "Replace"
    ],
    "expectedResult": "Final read on old; initial read on new; billing continuous",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-UTL-MERE3-013",
    "featureId": "energy-and-utilities__metering__meter-replacement"
  },
  {
    "title": "Partial payment reduces arrears oldest first",
    "description": "Partial payment reduces arrears oldest first.",
    "preconditions": "Arrears 3 months",
    "steps": [
      "Pay 1 month"
    ],
    "expectedResult": "Oldest bill cleared",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-UTL-PAAR-017",
    "featureId": "energy-and-utilities__billing__payment-and-arrears"
  },
  {
    "title": "Late payment surcharge",
    "description": "Late payment surcharge.",
    "preconditions": "Due passed",
    "steps": [
      "Run billing"
    ],
    "expectedResult": "Surcharge per rule",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-UTL-PAAR-018",
    "featureId": "energy-and-utilities__billing__payment-and-arrears"
  },
  {
    "title": "Customers notified of planned outage",
    "description": "Customers notified of planned outage.",
    "preconditions": "Planned work",
    "steps": [
      "Schedule"
    ],
    "expectedResult": "Affected customers notified in advance",
    "testType": "Integration",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-UTL-PLMA-014",
    "featureId": "energy-and-utilities__network__planned-maintenance"
  },
  {
    "title": "Customer views consumption and bills",
    "description": "Customer views consumption and bills.",
    "preconditions": "",
    "steps": [
      "Open portal"
    ],
    "expectedResult": "Own bills/usage only",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-UTL-CUPO-021",
    "featureId": "energy-and-utilities__customer__customer-portal"
  },
  {
    "title": "Recharge generates valid token",
    "description": "Recharge generates valid token.",
    "preconditions": "Prepaid meter",
    "steps": [
      "Recharge 500"
    ],
    "expectedResult": "Token generated; units per tariff",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-UTL-PRTOVE-021",
    "featureId": "energy-and-utilities__prepaid-and-payments__9ylns__prepaid-token-vending__lratj"
  },
  {
    "title": "Duplicate recharge prevented",
    "description": "Duplicate recharge prevented.",
    "preconditions": "",
    "steps": [
      "Retry same transaction"
    ],
    "expectedResult": "No second token",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-UTL-PRTOVE-022",
    "featureId": "energy-and-utilities__prepaid-and-payments__9ylns__prepaid-token-vending__lratj"
  },
  {
    "title": "True-up after actual read",
    "description": "True-up after actual read.",
    "preconditions": "2 estimated bills",
    "steps": [
      "Enter actual"
    ],
    "expectedResult": "Adjustment credit/debit correct",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-UTL-ESBIAD-028",
    "featureId": "energy-and-utilities__billing__estimated-billing-and-adjustments__8397z"
  },
  {
    "title": "Tamper event creates inspection ticket",
    "description": "Tamper event creates inspection ticket.",
    "preconditions": "Smart meter tamper",
    "steps": [
      "Receive event"
    ],
    "expectedResult": "Ticket and alert",
    "testType": "Security",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-UTL-THLODE-017",
    "featureId": "energy-and-utilities__network__theft-and-loss-detection__psfk7"
  },
  {
    "title": "Build package from components",
    "description": "Build package from components.",
    "preconditions": "Hotels, transfers, tours",
    "steps": [
      "Assemble package"
    ],
    "expectedResult": "Cost and sell price computed; publishable",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-TRV-TOPABU-018",
    "featureId": "travel-and-tourism__packages__tour-package-builder"
  },
  {
    "title": "Fixed departure seat inventory",
    "description": "Fixed departure seat inventory.",
    "preconditions": "30 seats",
    "steps": [
      "Book 31st"
    ],
    "expectedResult": "Sold out / waitlist",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-TRV-SEDE-025",
    "featureId": "travel-and-tourism__packages__seasonal-departures"
  },
  {
    "title": "Book package with traveller details",
    "description": "Book package with traveller details.",
    "preconditions": "Package available",
    "steps": [
      "Book 2 adults"
    ],
    "expectedResult": "Booking reference; passenger names as passport",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-TRV-TRBO-025",
    "featureId": "travel-and-tourism__bookings__traveller-booking"
  },
  {
    "title": "Passport expiry within 6 months warned",
    "description": "Passport expiry within 6 months warned.",
    "preconditions": "Passport expires soon",
    "steps": [
      "Book international trip"
    ],
    "expectedResult": "Warning",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-TRV-TRBO-026",
    "featureId": "travel-and-tourism__bookings__traveller-booking"
  },
  {
    "title": "Cancellation charges per supplier policy",
    "description": "Cancellation charges per supplier policy.",
    "preconditions": "Booking",
    "steps": [
      "Cancel 10 days before"
    ],
    "expectedResult": "Charges and refund calculated",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-TRV-AMCA-031",
    "featureId": "travel-and-tourism__bookings__amendment-and-cancellation"
  },
  {
    "title": "Name change fee",
    "description": "Name change fee.",
    "preconditions": "",
    "steps": [
      "Change traveller name"
    ],
    "expectedResult": "Fee per policy; supplier updated",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-TRV-AMCA-032",
    "featureId": "travel-and-tourism__bookings__amendment-and-cancellation"
  },
  {
    "title": "Group rooming list",
    "description": "Group rooming list.",
    "preconditions": "Group of 20",
    "steps": [
      "Upload rooming list"
    ],
    "expectedResult": "Rooms allocated; mismatch flagged",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-TRV-GRBO-031",
    "featureId": "travel-and-tourism__bookings__group-bookings"
  },
  {
    "title": "Contracted rate applies within validity",
    "description": "Contracted rate applies within validity.",
    "preconditions": "Contract valid Jan-Jun",
    "steps": [
      "Price July date"
    ],
    "expectedResult": "Contract rate not applied",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-TRV-SUCO-015",
    "featureId": "travel-and-tourism__suppliers__supplier-contracts"
  },
  {
    "title": "Guide not double-booked",
    "description": "Guide not double-booked.",
    "preconditions": "Guide assigned",
    "steps": [
      "Assign overlapping tour"
    ],
    "expectedResult": "Blocked",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-TRV-TOGUAL-018",
    "featureId": "travel-and-tourism__operations__tour-guide-allocation"
  },
  {
    "title": "Auto-cancel if balance unpaid by due date (per rule)",
    "description": "Auto-cancel if balance unpaid by due date (per rule).",
    "preconditions": "Balance due passed",
    "steps": [
      "Run job"
    ],
    "expectedResult": "Reminder then cancel per rule",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-TRV-BOPAIN-028",
    "featureId": "travel-and-tourism__payments-and-agents__qfkbs__booking-payments-and-instalments__i8n4d"
  },
  {
    "title": "Agent booking blocked beyond credit limit",
    "description": "Agent booking blocked beyond credit limit.",
    "preconditions": "Limit 100000 used 95000",
    "steps": [
      "Book 10000"
    ],
    "expectedResult": "Blocked or needs payment",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-TRV-B2AGPO-026",
    "featureId": "travel-and-tourism__payments-and-agents__qfkbs__b2b-agent-portal__izh3m"
  },
  {
    "title": "Ticket created from email, portal and chat",
    "description": "Ticket created from email, portal and chat.",
    "preconditions": "",
    "steps": [
      "Raise via each channel"
    ],
    "expectedResult": "Ticket with requester and channel",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ITS-TIIN-021",
    "featureId": "it-service-management__service-desk__ticket-intake"
  },
  {
    "title": "Auto-assign by category to group",
    "description": "Auto-assign by category to group.",
    "preconditions": "Rule",
    "steps": [
      "Create Network ticket"
    ],
    "expectedResult": "Assigned to Network group",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ITS-TIAS-023",
    "featureId": "it-service-management__service-desk__ticket-assignment"
  },
  {
    "title": "SLA by priority with business hours",
    "description": "SLA by priority with business hours.",
    "preconditions": "P1 4h",
    "steps": [
      "Create P1"
    ],
    "expectedResult": "Due time correct; breach escalates",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ITS-SLES-019",
    "featureId": "it-service-management__service-desk__sla-and-escalation"
  },
  {
    "title": "Pause SLA on pending user",
    "description": "Pause SLA on pending user.",
    "preconditions": "",
    "steps": [
      "Set Pending User"
    ],
    "expectedResult": "Clock paused",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ITS-SLES-020",
    "featureId": "it-service-management__service-desk__sla-and-escalation"
  },
  {
    "title": "Suggest articles during ticket creation",
    "description": "Suggest articles during ticket creation.",
    "preconditions": "Article exists",
    "steps": [
      "Type subject"
    ],
    "expectedResult": "Relevant articles suggested",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-ITS-KNBA-016",
    "featureId": "it-service-management__service-desk__knowledge-base"
  },
  {
    "title": "Internal articles hidden from end users",
    "description": "Internal articles hidden from end users.",
    "preconditions": "",
    "steps": [
      "Search as end user"
    ],
    "expectedResult": "Not shown",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-ITS-KNBA-017",
    "featureId": "it-service-management__service-desk__knowledge-base"
  },
  {
    "title": "Incident lifecycle New → Resolved → Closed",
    "description": "Incident lifecycle New → Resolved → Closed.",
    "preconditions": "",
    "steps": [
      "Progress incident"
    ],
    "expectedResult": "Statuses and timestamps recorded; resolution required",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ITS-INMA-026",
    "featureId": "it-service-management__incident-and-problem__incident-management"
  },
  {
    "title": "Auto-close resolved after N days",
    "description": "Auto-close resolved after N days.",
    "preconditions": "3 days",
    "steps": [
      "Wait"
    ],
    "expectedResult": "Closed",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-ITS-INMA-027",
    "featureId": "it-service-management__incident-and-problem__incident-management"
  },
  {
    "title": "RCA linked to problem with actions",
    "description": "RCA linked to problem with actions.",
    "preconditions": "Problem",
    "steps": [
      "Add RCA"
    ],
    "expectedResult": "Actions tracked to closure",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-ITS-ROCAAN-023",
    "featureId": "it-service-management__incident-and-problem__root-cause-analysis"
  },
  {
    "title": "CI relationships impact view",
    "description": "CI relationships impact view.",
    "preconditions": "CI dependencies",
    "steps": [
      "Open impact"
    ],
    "expectedResult": "Upstream/downstream services shown",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-ITS-COIT-023",
    "featureId": "it-service-management__assets__configuration-items"
  },
  {
    "title": "Assign laptop to user and track warranty",
    "description": "Assign laptop to user and track warranty.",
    "preconditions": "Asset",
    "steps": [
      "Assign"
    ],
    "expectedResult": "Assignment history; warranty alert",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-ITS-HALI-021",
    "featureId": "it-service-management__assets__hardware-lifecycle"
  },
  {
    "title": "Request with manager approval",
    "description": "Request with manager approval.",
    "preconditions": "Item needs approval",
    "steps": [
      "Submit"
    ],
    "expectedResult": "Manager approves; fulfilment tasks created",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-ITS-SECARE-020",
    "featureId": "it-service-management__self-service__au7h2__service-catalogue-and-requests__w6u5h"
  },
  {
    "title": "Survey sent on resolution",
    "description": "Survey sent on resolution.",
    "preconditions": "",
    "steps": [
      "Resolve ticket"
    ],
    "expectedResult": "Survey once; rating stored",
    "testType": "Functional",
    "priority": "Low",
    "isMandatory": true,
    "id": "TC-ITS-CUSASU-020",
    "featureId": "it-service-management__self-service__au7h2__customer-satisfaction-surveys__znna5"
  },
  {
    "title": "Monthly depreciation schedule",
    "description": "Monthly depreciation schedule.",
    "preconditions": "Cost 60000, 5 years SL",
    "steps": [
      "Run"
    ],
    "expectedResult": "1000/month; NBV correct",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-AMM-ASDE-023",
    "featureId": "asset-and-maintenance-management__asset-register__asset-depreciation"
  },
  {
    "title": "PM work order generated on schedule",
    "description": "PM work order generated on schedule.",
    "preconditions": "Monthly PM",
    "steps": [
      "Reach date"
    ],
    "expectedResult": "WO created once with checklist",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-AMM-PRMAPL-022",
    "featureId": "asset-and-maintenance-management__maintenance__preventive-maintenance-plan"
  },
  {
    "title": "Skip PM when asset inactive",
    "description": "Skip PM when asset inactive.",
    "preconditions": "Asset retired",
    "steps": [
      "Reach date"
    ],
    "expectedResult": "No WO",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-AMM-PRMAPL-023",
    "featureId": "asset-and-maintenance-management__maintenance__preventive-maintenance-plan"
  },
  {
    "title": "Breakdown WO starts downtime",
    "description": "Breakdown WO starts downtime.",
    "preconditions": "Running asset",
    "steps": [
      "Report breakdown"
    ],
    "expectedResult": "WO P1; downtime clock started",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-AMM-BRMA-026",
    "featureId": "asset-and-maintenance-management__maintenance__breakdown-maintenance"
  },
  {
    "title": "Purchase spare from approved vendor",
    "description": "Purchase spare from approved vendor.",
    "preconditions": "Low stock",
    "steps": [
      "Raise PO"
    ],
    "expectedResult": "Approved vendors only",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-AMM-VEPU-025",
    "featureId": "asset-and-maintenance-management__spares__vendor-and-purchase"
  },
  {
    "title": "MTBF and MTTR calculated",
    "description": "MTBF and MTTR calculated.",
    "preconditions": "Failures logged",
    "steps": [
      "View"
    ],
    "expectedResult": "MTBF/MTTR correct",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-AMM-ASPE-026",
    "featureId": "asset-and-maintenance-management__analytics__asset-performance"
  },
  {
    "title": "Meter threshold triggers WO",
    "description": "Meter threshold triggers WO.",
    "preconditions": "PM every 500 hours",
    "steps": [
      "Reading 500"
    ],
    "expectedResult": "WO created",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-AMM-COMOME-024",
    "featureId": "asset-and-maintenance-management__maintenance__condition-monitoring-and-meter-based-pm__8ackr"
  },
  {
    "title": "Sensor over threshold alert",
    "description": "Sensor over threshold alert.",
    "preconditions": "Temp limit 80",
    "steps": [
      "Reading 85"
    ],
    "expectedResult": "Alert and WO",
    "testType": "Integration",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-AMM-COMOME-025",
    "featureId": "asset-and-maintenance-management__maintenance__condition-monitoring-and-meter-based-pm__8ackr"
  },
  {
    "title": "Audit finds missing assets",
    "description": "Audit finds missing assets.",
    "preconditions": "Location list",
    "steps": [
      "Scan assets"
    ],
    "expectedResult": "Unscanned shown as missing",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-AMM-ASTABA-028",
    "featureId": "asset-and-maintenance-management__asset-register__asset-tagging-and-barcode-qr-audit__8k4lm"
  },
  {
    "title": "Register with national ID verification",
    "description": "Register with national ID verification.",
    "preconditions": "Valid NID",
    "steps": [
      "Register"
    ],
    "expectedResult": "Identity verified; account active",
    "testType": "Integration",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-GOV-CIRE-020",
    "featureId": "government-and-citizen-services__citizen-services__citizen-registration"
  },
  {
    "title": "One account per national ID",
    "description": "One account per national ID.",
    "preconditions": "NID used",
    "steps": [
      "Register again"
    ],
    "expectedResult": "Blocked",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-GOV-CIRE-021",
    "featureId": "government-and-citizen-services__citizen-services__citizen-registration"
  },
  {
    "title": "Citizen data masked in logs and UI",
    "description": "Citizen data masked in logs and UI.",
    "preconditions": "",
    "steps": [
      "View profile/logs"
    ],
    "expectedResult": "NID partially masked",
    "testType": "Security",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-GOV-CIRE-022",
    "featureId": "government-and-citizen-services__citizen-services__citizen-registration"
  },
  {
    "title": "Grievance routed to department with SLA",
    "description": "Grievance routed to department with SLA.",
    "preconditions": "",
    "steps": [
      "Submit grievance"
    ],
    "expectedResult": "Ticket number; routed; due date set",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-GOV-GRRE-023",
    "featureId": "government-and-citizen-services__citizen-services__grievance-redressal"
  },
  {
    "title": "Escalate unresolved grievance",
    "description": "Escalate unresolved grievance.",
    "preconditions": "SLA passed",
    "steps": [
      "Run job"
    ],
    "expectedResult": "Escalated to higher officer",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-GOV-GRRE-024",
    "featureId": "government-and-citizen-services__citizen-services__grievance-redressal"
  },
  {
    "title": "Submit application with required documents",
    "description": "Submit application with required documents.",
    "preconditions": "",
    "steps": [
      "Apply"
    ],
    "expectedResult": "Reference number; missing docs block submit",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-GOV-PEAP-019",
    "featureId": "government-and-citizen-services__permits-and-licences__permit-application"
  },
  {
    "title": "Case moves through officer approvals in order",
    "description": "Case moves through officer approvals in order.",
    "preconditions": "3-level workflow",
    "steps": [
      "Approve each"
    ],
    "expectedResult": "Correct order; cannot skip level",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-GOV-CAWO-023",
    "featureId": "government-and-citizen-services__case-handling__case-workflow"
  },
  {
    "title": "Officer cannot approve own application",
    "description": "Officer cannot approve own application.",
    "preconditions": "",
    "steps": [
      "Approve own"
    ],
    "expectedResult": "Blocked",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": false,
    "id": "TC-GOV-CAWO-024",
    "featureId": "government-and-citizen-services__case-handling__case-workflow"
  },
  {
    "title": "Refer case and receive response",
    "description": "Refer case and receive response.",
    "preconditions": "",
    "steps": [
      "Refer to other dept"
    ],
    "expectedResult": "Dept sees case; response returns to owner",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-GOV-INRE-024",
    "featureId": "government-and-citizen-services__case-handling__interdepartmental-referral"
  },
  {
    "title": "Fee by service and category",
    "description": "Fee by service and category.",
    "preconditions": "Fee schedule",
    "steps": [
      "Apply"
    ],
    "expectedResult": "Correct fee incl. late fee",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-GOV-FECA-020",
    "featureId": "government-and-citizen-services__revenue__fee-calculation"
  },
  {
    "title": "Official receipt with unique number",
    "description": "Official receipt with unique number.",
    "preconditions": "Payment done",
    "steps": [
      "Download receipt"
    ],
    "expectedResult": "Unique number; verifiable",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-GOV-RERE-020",
    "featureId": "government-and-citizen-services__revenue__receipts-and-refunds"
  },
  {
    "title": "Track by reference without login",
    "description": "Track by reference without login.",
    "preconditions": "Reference",
    "steps": [
      "Enter reference + phone"
    ],
    "expectedResult": "Status only; no personal data exposed",
    "testType": "Security",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-GOV-APSTTR-022",
    "featureId": "government-and-citizen-services__transparency-and-accessibility__5zq80__application-status-tracking__103c5"
  },
  {
    "title": "Switch language",
    "description": "Switch language.",
    "preconditions": "Bangla/English",
    "steps": [
      "Toggle"
    ],
    "expectedResult": "All labels translated; data unchanged",
    "testType": "Usability",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-GOV-ACMUSU-028",
    "featureId": "government-and-citizen-services__transparency-and-accessibility__5zq80__accessibility-and-multilingual-support__nf5n4"
  },
  {
    "title": "Keyboard and screen-reader access",
    "description": "Keyboard and screen-reader access.",
    "preconditions": "",
    "steps": [
      "Navigate with keyboard"
    ],
    "expectedResult": "All forms operable; labels announced",
    "testType": "Usability",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-GOV-ACMUSU-029",
    "featureId": "government-and-citizen-services__transparency-and-accessibility__5zq80__accessibility-and-multilingual-support__nf5n4"
  },
  {
    "title": "Calendar shows planned stories by date and desk",
    "description": "Calendar shows planned stories by date and desk.",
    "preconditions": "Stories scheduled",
    "steps": [
      "Open calendar"
    ],
    "expectedResult": "Correct dates; drag reschedules",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-MED-EDCA-023",
    "featureId": "media-and-publishing__editorial__editorial-calendar"
  },
  {
    "title": "Cannot publish until fact-check passed",
    "description": "Cannot publish until fact-check passed.",
    "preconditions": "Required",
    "steps": [
      "Publish"
    ],
    "expectedResult": "Blocked",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-MED-FACH-020",
    "featureId": "media-and-publishing__editorial__fact-checking"
  },
  {
    "title": "Publish article live",
    "description": "Publish article live.",
    "preconditions": "Approved article",
    "steps": [
      "Publish"
    ],
    "expectedResult": "Live URL; appears on homepage/section",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-MED-COPU-024",
    "featureId": "media-and-publishing__publishing__content-publishing"
  },
  {
    "title": "Unpublish removes public access",
    "description": "Unpublish removes public access.",
    "preconditions": "Live",
    "steps": [
      "Unpublish"
    ],
    "expectedResult": "404/removed; cache purged",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-MED-COPU-025",
    "featureId": "media-and-publishing__publishing__content-publishing"
  },
  {
    "title": "Expired licence image cannot be used",
    "description": "Expired licence image cannot be used.",
    "preconditions": "Licence expired",
    "steps": [
      "Insert image"
    ],
    "expectedResult": "Blocked/warned",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-MED-RILI-025",
    "featureId": "media-and-publishing__rights-and-assets__rights-and-licensing"
  },
  {
    "title": "Metered paywall after N free articles",
    "description": "Metered paywall after N free articles.",
    "preconditions": "3 free",
    "steps": [
      "Read 4th"
    ],
    "expectedResult": "Paywall shown",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-MED-SUPA-024",
    "featureId": "media-and-publishing__monetisation__subscriber-paywall"
  },
  {
    "title": "Subscriber reads without paywall",
    "description": "Subscriber reads without paywall.",
    "preconditions": "Active sub",
    "steps": [
      "Read"
    ],
    "expectedResult": "Full article",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-MED-SUPA-025",
    "featureId": "media-and-publishing__monetisation__subscriber-paywall"
  },
  {
    "title": "Paywall cannot be bypassed via API/source",
    "description": "Paywall cannot be bypassed via API/source.",
    "preconditions": "",
    "steps": [
      "Fetch article HTML as anon"
    ],
    "expectedResult": "Premium body not delivered",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": false,
    "id": "TC-MED-SUPA-026",
    "featureId": "media-and-publishing__monetisation__subscriber-paywall"
  },
  {
    "title": "Page views and unique readers per article",
    "description": "Page views and unique readers per article.",
    "preconditions": "Traffic",
    "steps": [
      "Open analytics"
    ],
    "expectedResult": "Counts match tracking data",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-MED-AUAN-022",
    "featureId": "media-and-publishing__monetisation__audience-analytics"
  },
  {
    "title": "Unique slug enforced",
    "description": "Unique slug enforced.",
    "preconditions": "Slug exists",
    "steps": [
      "Save same slug"
    ],
    "expectedResult": "Suffix added or error",
    "testType": "Validation",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-MED-SEME-018",
    "featureId": "media-and-publishing__publishing__seo-and-metadata__l07p5"
  },
  {
    "title": "Social card metadata present",
    "description": "Social card metadata present.",
    "preconditions": "",
    "steps": [
      "Share URL"
    ],
    "expectedResult": "Title, image, description shown",
    "testType": "Functional",
    "priority": "Low",
    "isMandatory": false,
    "id": "TC-MED-SEME-019",
    "featureId": "media-and-publishing__publishing__seo-and-metadata__l07p5"
  },
  {
    "title": "Report and hide abusive comment",
    "description": "Report and hide abusive comment.",
    "preconditions": "",
    "steps": [
      "Report",
      "Moderate"
    ],
    "expectedResult": "Hidden; author notified",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-MED-COCOMO-019",
    "featureId": "media-and-publishing__monetisation__comments-and-community-moderation__skjih"
  },
  {
    "title": "SIM swap with identity verification",
    "description": "SIM swap with identity verification.",
    "preconditions": "Active SIM",
    "steps": [
      "Request swap"
    ],
    "expectedResult": "Verified; old SIM deactivated",
    "testType": "Security",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-TEL-SIDEMA-028",
    "featureId": "telecom-and-isp__subscribers__sim-and-device-management"
  },
  {
    "title": "Deactivate releases number after quarantine",
    "description": "Deactivate releases number after quarantine.",
    "preconditions": "Active",
    "steps": [
      "Deactivate"
    ],
    "expectedResult": "Services stop; number quarantined N days",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-TEL-CHDE-018",
    "featureId": "telecom-and-isp__subscribers__churn-and-deactivation"
  },
  {
    "title": "Activation provisions network services",
    "description": "Activation provisions network services.",
    "preconditions": "Order",
    "steps": [
      "Activate"
    ],
    "expectedResult": "Services live; status Active; welcome SMS",
    "testType": "Integration",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-TEL-SEAC-024",
    "featureId": "telecom-and-isp__provisioning__service-activation"
  },
  {
    "title": "Router serial assigned to customer",
    "description": "Router serial assigned to customer.",
    "preconditions": "Stock",
    "steps": [
      "Allocate"
    ],
    "expectedResult": "Serial linked; stock reduced",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-TEL-EQAL-021",
    "featureId": "telecom-and-isp__provisioning__equipment-allocation"
  },
  {
    "title": "Rate usage by plan",
    "description": "Rate usage by plan.",
    "preconditions": "Plan 1/min",
    "steps": [
      "Rate 10 min call"
    ],
    "expectedResult": "10 charged; included minutes first",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-TEL-USRA-020",
    "featureId": "telecom-and-isp__rating-and-billing__usage-rating"
  },
  {
    "title": "Add-on activates and expires",
    "description": "Add-on activates and expires.",
    "preconditions": "Add-on 7 days",
    "steps": [
      "Buy"
    ],
    "expectedResult": "Active 7 days then expires",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-TEL-BUADON-030",
    "featureId": "telecom-and-isp__rating-and-billing__bundle-and-add-on-management"
  },
  {
    "title": "Payment clears outstanding and restores service",
    "description": "Payment clears outstanding and restores service.",
    "preconditions": "Suspended for dues",
    "steps": [
      "Pay"
    ],
    "expectedResult": "Service restored automatically",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-TEL-PACO-020",
    "featureId": "telecom-and-isp__rating-and-billing__payment-and-collections"
  },
  {
    "title": "Recharge adds balance and validity",
    "description": "Recharge adds balance and validity.",
    "preconditions": "",
    "steps": [
      "Recharge"
    ],
    "expectedResult": "Balance and validity updated; SMS",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-TEL-PRBARE-024",
    "featureId": "telecom-and-isp__rating-and-billing__prepaid-balance-and-recharge__0ubb7"
  },
  {
    "title": "Throttle after FUP",
    "description": "Throttle after FUP.",
    "preconditions": "FUP 100GB",
    "steps": [
      "Use 101GB"
    ],
    "expectedResult": "Speed reduced; customer notified",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-TEL-FAUSSP-024",
    "featureId": "telecom-and-isp__subscribers__fair-usage-and-speed-throttling__0m8nu"
  },
  {
    "title": "Complete sale with tax",
    "description": "Complete sale with tax.",
    "preconditions": "Items",
    "steps": [
      "Scan",
      "Pay"
    ],
    "expectedResult": "Totals with tax; stock reduced; receipt",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-POS-SATR-017",
    "featureId": "retail-pos-and-loyalty__point-of-sale__sales-transaction"
  },
  {
    "title": "Void line needs permission",
    "description": "Void line needs permission.",
    "preconditions": "",
    "steps": [
      "Void line as cashier"
    ],
    "expectedResult": "Supervisor approval; audited",
    "testType": "Permission",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-POS-SATR-018",
    "featureId": "retail-pos-and-loyalty__point-of-sale__sales-transaction"
  },
  {
    "title": "Unknown barcode handled",
    "description": "Unknown barcode handled.",
    "preconditions": "",
    "steps": [
      "Scan unknown"
    ],
    "expectedResult": "Not-found message; no crash",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-POS-BASC-013",
    "featureId": "retail-pos-and-loyalty__point-of-sale__barcode-and-scanning"
  },
  {
    "title": "Weighted barcode price",
    "description": "Weighted barcode price.",
    "preconditions": "Embedded price barcode",
    "steps": [
      "Scan"
    ],
    "expectedResult": "Correct price/weight",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-POS-BASC-014",
    "featureId": "retail-pos-and-loyalty__point-of-sale__barcode-and-scanning"
  },
  {
    "title": "Return with receipt refunds original tender",
    "description": "Return with receipt refunds original tender.",
    "preconditions": "Receipt",
    "steps": [
      "Return item"
    ],
    "expectedResult": "Refund to original method; stock back",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-POS-REEX-025",
    "featureId": "retail-pos-and-loyalty__point-of-sale__returns-and-exchange"
  },
  {
    "title": "Return window enforced",
    "description": "Return window enforced.",
    "preconditions": "30 days",
    "steps": [
      "Return day 40"
    ],
    "expectedResult": "Blocked or store credit only",
    "testType": "Boundary",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-POS-REEX-026",
    "featureId": "retail-pos-and-loyalty__point-of-sale__returns-and-exchange"
  },
  {
    "title": "Sell offline and sync",
    "description": "Sell offline and sync.",
    "preconditions": "No network",
    "steps": [
      "Make sales",
      "Reconnect"
    ],
    "expectedResult": "All sales synced once; stock correct",
    "testType": "Integration",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-POS-OFMOSY-019",
    "featureId": "retail-pos-and-loyalty__point-of-sale__offline-mode-sync"
  },
  {
    "title": "Expected vs counted cash variance",
    "description": "Expected vs counted cash variance.",
    "preconditions": "Shift sales",
    "steps": [
      "Count cash"
    ],
    "expectedResult": "Variance recorded; manager sign-off",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-POS-SHRE-025",
    "featureId": "retail-pos-and-loyalty__cash-and-shift__shift-reconciliation"
  },
  {
    "title": "Bundle price applied",
    "description": "Bundle price applied.",
    "preconditions": "3 for 100",
    "steps": [
      "Scan 3"
    ],
    "expectedResult": "Total 100",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-POS-BUOF-032",
    "featureId": "retail-pos-and-loyalty__promotions__bundle-offers"
  },
  {
    "title": "Coupon single use",
    "description": "Coupon single use.",
    "preconditions": "Used coupon",
    "steps": [
      "Redeem again"
    ],
    "expectedResult": "Rejected",
    "testType": "Validation",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-POS-CORE-020",
    "featureId": "retail-pos-and-loyalty__promotions__coupon-redemption"
  },
  {
    "title": "Override below cost needs manager",
    "description": "Override below cost needs manager.",
    "preconditions": "",
    "steps": [
      "Override price"
    ],
    "expectedResult": "Approval required; logged",
    "testType": "Permission",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-POS-PROV-020",
    "featureId": "retail-pos-and-loyalty__promotions__price-overrides"
  },
  {
    "title": "Enroll by phone at POS",
    "description": "Enroll by phone at POS.",
    "preconditions": "",
    "steps": [
      "Enroll"
    ],
    "expectedResult": "Member created; OTP verified",
    "testType": "Functional",
    "priority": "Medium",
    "isMandatory": true,
    "id": "TC-POS-LOEN-020",
    "featureId": "retail-pos-and-loyalty__loyalty__loyalty-enrollment"
  },
  {
    "title": "Earn points on net amount",
    "description": "Earn points on net amount.",
    "preconditions": "1 pt per 100",
    "steps": [
      "Buy 1000 after discount"
    ],
    "expectedResult": "10 points",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-POS-POACRE-016",
    "featureId": "retail-pos-and-loyalty__loyalty__points-accrual-and-redemption"
  },
  {
    "title": "Redeem points as tender",
    "description": "Redeem points as tender.",
    "preconditions": "500 points",
    "steps": [
      "Redeem"
    ],
    "expectedResult": "Balance reduced; value applied",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": false,
    "id": "TC-POS-POACRE-017",
    "featureId": "retail-pos-and-loyalty__loyalty__points-accrual-and-redemption"
  },
  {
    "title": "Points reversed on return",
    "description": "Points reversed on return.",
    "preconditions": "",
    "steps": [
      "Return"
    ],
    "expectedResult": "Points deducted",
    "testType": "Negative",
    "priority": "Medium",
    "isMandatory": false,
    "id": "TC-POS-POACRE-018",
    "featureId": "retail-pos-and-loyalty__loyalty__points-accrual-and-redemption"
  },
  {
    "title": "Purchase history per member",
    "description": "Purchase history per member.",
    "preconditions": "Sales",
    "steps": [
      "Open member"
    ],
    "expectedResult": "History and spend correct",
    "testType": "Functional",
    "priority": "Low",
    "isMandatory": true,
    "id": "TC-POS-CUIN-022",
    "featureId": "retail-pos-and-loyalty__loyalty__customer-insights"
  },
  {
    "title": "Receive delivery increases store stock",
    "description": "Receive delivery increases store stock.",
    "preconditions": "PO",
    "steps": [
      "Receive"
    ],
    "expectedResult": "Stock up; discrepancies noted",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-POS-STSTRE-024",
    "featureId": "retail-pos-and-loyalty__store-inventory__ilm75__store-stock-and-receiving__wff0x"
  },
  {
    "title": "Sequential receipt numbers without gaps",
    "description": "Sequential receipt numbers without gaps.",
    "preconditions": "",
    "steps": [
      "Make sales"
    ],
    "expectedResult": "Numbers sequential per register",
    "testType": "Functional",
    "priority": "Critical",
    "isMandatory": true,
    "id": "TC-POS-REFICO-025",
    "featureId": "retail-pos-and-loyalty__point-of-sale__receipts-and-fiscal-compliance__n9ot8"
  },
  {
    "title": "Gift card balance redemption",
    "description": "Gift card balance redemption.",
    "preconditions": "Card 500",
    "steps": [
      "Pay 300"
    ],
    "expectedResult": "Balance 200",
    "testType": "Functional",
    "priority": "High",
    "isMandatory": true,
    "id": "TC-POS-GICAST-027",
    "featureId": "retail-pos-and-loyalty__point-of-sale__gift-cards-and-store-credit__bm8nw"
  }
];

export const MASTER_LIBRARY_ADDITIONS = {
  added: ADDED_TEST_CASES, edits: {}, deleted: [],
  modulesAdded: ADDED_MODULES, modulesEdited: {}, modulesDeleted: [],
  featuresAdded: ADDED_FEATURES, featuresEdited: {}, featuresDeleted: [],
};
