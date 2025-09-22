// Dashboard metrics and widgets data
export const dashboardMetrics = [
  {
    id: 'total-clients',
    title: 'Total Clients',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: 'Users',
    color: 'bg-gradient-to-r from-blue-500 to-blue-600'
  },
  {
    id: 'active-audits',
    title: 'Active Audits',
    value: '156',
    change: '+8.2%',
    trend: 'up',
    icon: 'FileCheck',
    color: 'bg-gradient-to-r from-green-500 to-green-600'
  },
  {
    id: 'pending-uploads',
    title: 'Pending Uploads',
    value: '42',
    change: '-15.3%',
    trend: 'down',
    icon: 'Upload',
    color: 'bg-gradient-to-r from-yellow-500 to-orange-500'
  },
  {
    id: 'agreements-signed',
    title: 'Agreements Signed',
    value: '89',
    change: '+23.1%',
    trend: 'up',
    icon: 'FileSignature',
    color: 'bg-gradient-to-r from-purple-500 to-purple-600'
  }
];

export const recentActivities = [
  {
    id: 1,
    type: 'audit_completed',
    title: 'Mortgage audit completed for Johnson Family Trust',
    timestamp: '2 hours ago',
    status: 'completed',
    user: 'Sarah Martinez'
  },
  {
    id: 2,
    type: 'client_onboarded',
    title: 'New client onboarded: Greenfield Agriculture LLC',
    timestamp: '4 hours ago',
    status: 'success',
    user: 'Michael Chen'
  },
  {
    id: 3,
    type: 'agreement_pending',
    title: 'Partnership agreement pending review',
    timestamp: '6 hours ago',
    status: 'pending',
    user: 'Alex Rodriguez'
  },
  {
    id: 4,
    type: 'mexico_inquiry',
    title: 'Cross-border loan inquiry from Estero Beach project',
    timestamp: '8 hours ago',
    status: 'new',
    user: 'System'
  },
  {
    id: 5,
    type: 'ticker_alert',
    title: 'Commodity price alert: Corn futures up 5.2%',
    timestamp: '1 day ago',
    status: 'info',
    user: 'AI Engine'
  }
];

export const topServices = [
  {
    id: 'mortgage-audit',
    name: 'Mortgage Auditing',
    usage: 85,
    clients: 234,
    revenue: '$125,400'
  },
  {
    id: 'ag-marketplace',
    name: 'Agriculture Marketplace',
    usage: 72,
    clients: 189,
    revenue: '$98,750'
  },
  {
    id: 'cross-border',
    name: 'Cross-Border Lending',
    usage: 68,
    clients: 156,
    revenue: '$87,320'
  },
  {
    id: 'compliance',
    name: 'Compliance Management',
    usage: 91,
    clients: 198,
    revenue: '$112,500'
  }
];

export const chartData = {
  monthlyRevenue: [
    { month: 'Jan', revenue: 45000, clients: 180 },
    { month: 'Feb', revenue: 52000, clients: 195 },
    { month: 'Mar', revenue: 48000, clients: 210 },
    { month: 'Apr', revenue: 61000, clients: 225 },
    { month: 'May', revenue: 67000, clients: 240 },
    { month: 'Jun', revenue: 71000, clients: 255 }
  ],
  serviceDistribution: [
    { name: 'Mortgage Services', value: 35, color: '#22c55e' },
    { name: 'Agriculture', value: 25, color: '#38bdf8' },
    { name: 'Compliance', value: 20, color: '#fef08a' },
    { name: 'Cross-Border', value: 15, color: '#f97316' },
    { name: 'Other', value: 5, color: '#e5e7eb' }
  ]
};