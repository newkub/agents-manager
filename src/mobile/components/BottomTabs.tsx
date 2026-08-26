import type { MobileTab } from '../types';

const TABS: { id: MobileTab; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: 'i-lucide-house' },
  { id: 'session', label: 'Session', icon: 'i-lucide-message-square' },
  { id: 'skills', label: 'Skills', icon: 'i-lucide-file-code' },
  { id: 'subagents', label: 'Subagents', icon: 'i-lucide-bot' },
  { id: 'customize', label: 'Customize', icon: 'i-lucide-sliders-horizontal' },
  { id: 'notifications', label: 'Noti', icon: 'i-lucide-bell' },
  { id: 'settings', label: 'Settings', icon: 'i-lucide-settings' },
];

interface BottomTabsProps {
  active: MobileTab;
  onChange: (tab: MobileTab) => void;
  unreadCount?: number;
}

export function BottomTabs(props: BottomTabsProps) {
  return (
    <nav class="mobile-bottom-tabs">
      {TABS.map((tab) => {
        const isActive = props.active === tab.id;
        return (
          <button
            type="button"
            class={`mobile-tab ${isActive ? 'active' : ''}`}
            onClick={() => props.onChange(tab.id)}
          >
            <span class={`mobile-tab-icon ${tab.icon}`} />
            <span class="mobile-tab-label">{tab.label}</span>
            {tab.id === 'notifications' && (props.unreadCount ?? 0) > 0 && (
              <span class="mobile-tab-badge">{props.unreadCount}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
