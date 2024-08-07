import { Icon } from "@iconify/react/dist/iconify.js";

export const features = [
    {
      name: 'Manage tasks seamlessly',
      description:
        'Easily add, edit, and track your tasks with an intuitive interface.',
      icon: <Icon icon="lucide:list-todo" className="w-8 h-8" />,
    },
    {
      name: 'Sync with Notion',
      description:
        'Log in with your Notion account to keep your tasks updated across platforms.',
      icon: <Icon icon="ri:notion-fill" className="w-8 h-8" />,
    },
    {
      name: 'Real-time updates',
      description:
        'Receive instant notifications on task changes and deadlines.',
      icon: <Icon icon="iconamoon:cloud-clock" className="w-8 h-8" />,
    },
    {
      name: 'Quick access from menubar',
      description:
        'Manage your tasks swiftly directly from the menubar for maximum efficiency.',
      icon: <Icon icon="ci:bar-top" className="w-8 h-8" />,
    },
    {
      name: 'Secure and private',
      description:
        'Your data is encrypted to ensure your tasks remain private and secure.',
      icon: <Icon icon="iconamoon:lock-bold" className="w-8 h-8" />,
    },
    {
    name: 'Track your progress',
    description: 'Monitor your task completion and productivity over time.',
    icon: <Icon icon="mdi:progress-check" className="w-8 h-8" />,
    }
]