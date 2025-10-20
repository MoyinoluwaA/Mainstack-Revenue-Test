import { Bell, MessageSquareText } from "lucide-react";
import { Analytics, Home, Payments, Profile, Widgets } from "../../assets";

export const headerItems = [
  {
    icon: Bell,
  },
  {
    icon: MessageSquareText,
  },
];

export const navItems = [
    {
      name: 'Home',
      icon: Home,
    },
    {
      name: 'Analytics',
      icon: Analytics,
    },
    {
      name: 'Revenue',
      icon: Payments,
      link: '/dashboard/revenue'
    },
    {
      name: 'CRM',
      icon: Profile,
    },
    {
      name: 'Apps',
      icon: Widgets,
      link: '#'
    }
  ]
