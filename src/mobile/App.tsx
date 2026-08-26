import { createSignal } from 'solid-js';
import './styles.css';
import { BottomTabs } from './components/BottomTabs';
import { CustomizeTab } from './components/CustomizeTab';
import { HomeTab } from './components/HomeTab';
import { NotificationsTab } from './components/NotificationsTab';
import { SessionTab } from './components/SessionTab';
import { SettingsTab } from './components/SettingsTab';
import { SkillsTab } from './components/SkillsTab';
import { SubagentsTab } from './components/SubagentsTab';
import { Notifications } from './stores/notifications';
import type { MobileTab } from './types';

export function MobileApp() {
  const [active, setActive] = createSignal<MobileTab>('home');
  const notifications = new Notifications();

  const renderTab = () => {
    switch (active()) {
      case 'home':
        return <HomeTab />;
      case 'session':
        return <SessionTab />;
      case 'skills':
        return <SkillsTab />;
      case 'subagents':
        return <SubagentsTab />;
      case 'customize':
        return <CustomizeTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'settings':
        return <SettingsTab />;
    }
  };

  return (
    <div class="mobile-app">
      <main class="mobile-main">{renderTab()}</main>
      <BottomTabs
        active={active()}
        onChange={setActive}
        unreadCount={notifications.unreadCount()}
      />
    </div>
  );
}
