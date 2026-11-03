/**
 * The order categories are presented in, highest priority first.
 *
 * This is the single place that decides it — move a name up or down here and the sidebar,
 * the category dropdowns, the project wizard and the dashboard all follow. A category that is
 * not listed still works; it just sorts after the ones that are.
 */
export const CATEGORY_TIERS: Array<{ tier: string; names: string[] }> = [
  {
    tier: 'AI',
    names: [
      'AI Voice Agents',
      'Conversational AI & Chatbots',
      'Generative AI Platform',
      'AI / ML Operations',
      'Computer Vision & Document AI',
    ],
  },
  {
    tier: 'Core business platforms',
    names: [
      'CRM',
      'SaaS / Subscription Management',
      'E-commerce',
      'Marketplace',
      'FinTech',
      'ERP',
      'HRM',
      'Project Management',
      'Inventory Management',
      'Document Management',
      'IT Service Management',
    ],
  },
  {
    tier: 'Field & service operations',
    names: [
      'Field Service Management',
      'Roofing Management',
      'Construction & Contracting',
      'Asset & Maintenance Management',
      'Logistics & Transportation',
      'Energy & Utilities',
    ],
  },
  {
    tier: 'Industry verticals',
    names: [
      'Healthcare Management',
      'Learning Management System',
      'Real Estate Management',
      'Booking & Reservation',
      'Hospitality & Hotel Management',
      'Restaurant & Food Service',
      'Retail POS & Loyalty',
      'Insurance Management',
      'Legal Practice Management',
      'Automotive Dealership & Workshop',
      'Travel & Tourism',
      'Event Management',
      'Telecom & ISP',
      'Media & Publishing',
      'Fitness & Wellness',
      'Agriculture & Farm Management',
      'Non-profit & Fundraising',
      'Government & Citizen Services',
    ],
  },
]

const ORDER = new Map<string, { priority: number; tier: string }>()
let rank = 0
for (const group of CATEGORY_TIERS) {
  for (const name of group.names) {
    rank += 1
    ORDER.set(name, { priority: rank, tier: group.tier })
  }
}

/** 1-based rank. Unlisted categories sort last, in their original order. */
export const categoryPriority = (name: string): number => ORDER.get(name)?.priority ?? Number.MAX_SAFE_INTEGER

export const categoryTier = (name: string): string => ORDER.get(name)?.tier ?? 'Other'

/** Tier labels in priority order, for grouping the category list. */
export const TIER_ORDER: string[] = [...CATEGORY_TIERS.map((g) => g.tier), 'Other']
