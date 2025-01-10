// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons-react';

const icons = {
  IconDashboard,
  IconDeviceAnalytics
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'dashboard',
  // title: <FormattedMessage id="dashboard" />,
  icon: icons.IconDashboard,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'my-wallet',
      title: <FormattedMessage id="my-wallet" />,
      type: 'item',
      url: '/dashboard/defaults',
      icon: icons.IconDeviceAnalytics,
      breadcrumbs: false
    },
    {
      id: 'transactions',
      title: <FormattedMessage id="transactions" />,
      type: 'item',
      url: '/dashboard/defaults',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'trading',
      title: <FormattedMessage id="trading" />,
      type: 'item',
      url: '/dashboard/defaults',
      icon: icons.IconDeviceAnalytics,
      breadcrumbs: false
    },
    {
      id: 'exchange',
      title: <FormattedMessage id="exchange" />,
      type: 'item',
      url: '/dashboard/defaults',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'market-capital',
      title: <FormattedMessage id="market-capital" />,
      type: 'item',
      url: '/dashboard/defaults',
      icon: icons.IconDeviceAnalytics,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
