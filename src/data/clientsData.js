// Client data for admin and partner management
export const clients = [
  {
    id: 'client-001',
    name: 'Johnson Family Trust',
    type: 'Individual',
    status: 'Active',
    joinDate: '2024-01-15',
    totalSpent: '$45,250',
    servicesUsed: ['Mortgage Auditing', 'Compliance Review'],
    contact: {
      email: 'sarah.johnson@email.com',
      phone: '(555) 234-5678',
      address: '123 Oak Street, San Diego, CA 92101'
    },
    recentActivity: 'Mortgage audit completed - 2 days ago'
  },
  {
    id: 'client-002',
    name: 'Greenfield Agriculture LLC',
    type: 'Business',
    status: 'Active',
    joinDate: '2023-08-22',
    totalSpent: '$128,900',
    servicesUsed: ['USDA Pricing', 'Agricultural Factoring', 'Marketplace'],
    contact: {
      email: 'operations@greenfieldllc.com',
      phone: '(555) 567-8901',
      address: '456 Farm Road, Fresno, CA 93650'
    },
    recentActivity: 'Factoring application approved - 1 week ago'
  },
  {
    id: 'client-003',
    name: 'Pacific Coastal Ventures',
    type: 'Business',
    status: 'Pending',
    joinDate: '2024-06-10',
    totalSpent: '$12,500',
    servicesUsed: ['Cross-Border Lending'],
    contact: {
      email: 'info@pacificcoastal.com',
      phone: '(555) 789-0123',
      address: '789 Beach Blvd, Ensenada, Baja California'
    },
    recentActivity: 'Mexico real estate loan application - 3 days ago'
  },
  {
    id: 'client-004',
    name: 'TechStart Innovations',
    type: 'Business',
    status: 'Active',
    joinDate: '2023-12-05',
    totalSpent: '$78,320',
    servicesUsed: ['Compliance Management', 'Privacy Auditing'],
    contact: {
      email: 'legal@techstart.io',
      phone: '(555) 345-6789',
      address: '321 Innovation Way, Austin, TX 78701'
    },
    recentActivity: 'GDPR compliance review - 5 days ago'
  }
];

export const partners = [
  {
    id: 'partner-001',
    name: 'Mexican Development Bank',
    type: 'Financial Institution',
    status: 'Active',
    partnerSince: '2023-01-15',
    servicesOffered: ['Cross-Border Lending', 'Currency Exchange'],
    commission: '2.5%',
    totalReferrals: 156,
    revenue: '$245,000',
    contact: {
      primaryContact: 'Carlos Rodriguez',
      email: 'carlos.rodriguez@bancomex.com',
      phone: '+52 664 123 4567'
    }
  },
  {
    id: 'partner-002',
    name: 'AgriFinance Solutions',
    type: 'Specialty Lender',
    status: 'Active',
    partnerSince: '2022-06-20',
    servicesOffered: ['Agricultural Factoring', 'Equipment Finance'],
    commission: '3.0%',
    totalReferrals: 89,
    revenue: '$167,800',
    contact: {
      primaryContact: 'Jennifer Martinez',
      email: 'j.martinez@agrifinance.com',
      phone: '(559) 555-0198'
    }
  },
  {
    id: 'partner-003',
    name: 'DocuSign Enterprise',
    type: 'Technology Partner',
    status: 'Active',
    partnerSince: '2023-03-10',
    servicesOffered: ['Document Management', 'E-Signatures'],
    commission: 'Fixed Fee',
    totalReferrals: 234,
    revenue: '$89,500',
    contact: {
      primaryContact: 'Michael Chen',
      email: 'm.chen@docusign.com',
      phone: '(800) 555-3045'
    }
  },
  {
    id: 'partner-004',
    name: 'Compliance Pro Networks',
    type: 'Consulting Firm',
    status: 'Active',
    partnerSince: '2023-09-15',
    servicesOffered: ['GDPR Compliance', 'Privacy Auditing'],
    commission: '15%',
    totalReferrals: 67,
    revenue: '$134,200',
    contact: {
      primaryContact: 'Sarah Williams',
      email: 's.williams@compliancepro.eu',
      phone: '+44 20 7123 4567'
    }
  }
];

export const adminUsers = [
  {
    id: 'admin-001',
    name: 'Alex Rodriguez',
    role: 'Super Admin',
    email: 'alex.rodriguez@auditdna.com',
    department: 'Operations',
    permissions: ['Full Access'],
    lastLogin: '2024-06-15 09:30:00',
    status: 'Active'
  },
  {
    id: 'admin-002',
    name: 'Sarah Martinez',
    role: 'Audit Manager',
    email: 'sarah.martinez@auditdna.com',
    department: 'Auditing',
    permissions: ['Audit Management', 'Client Access'],
    lastLogin: '2024-06-15 08:45:00',
    status: 'Active'
  },
  {
    id: 'admin-003',
    name: 'Michael Chen',
    role: 'Partner Relations',
    email: 'michael.chen@auditdna.com',
    department: 'Business Development',
    permissions: ['Partner Management', 'Reports'],
    lastLogin: '2024-06-14 16:20:00',
    status: 'Active'
  },
  {
    id: 'admin-004',
    name: 'Jennifer Lopez',
    role: 'Compliance Officer',
    email: 'jennifer.lopez@auditdna.com',
    department: 'Compliance',
    permissions: ['Compliance Management', 'Audit Review'],
    lastLogin: '2024-06-15 07:15:00',
    status: 'Active'
  }
];