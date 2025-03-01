import { FC, useState } from 'react';
import {
  Card,
  CardContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Separator,
} from '@erisfy/shadcnui';
import {
  User,
  Shield,
  Palette,
  Bell,
  Database,
  KeyRound,
} from 'lucide-react';

import { ProfileSettings } from './sections/ProfileSettings';
import { SecuritySettings } from './sections/SecuritySettings';
import { AppearanceSettings } from './sections/AppearanceSettings';
import { NotificationSettings } from './sections/NotificationSettings';
import { DataPrivacySettings } from './sections/DataPrivacySettings';
import { ApiIntegrationSettings } from './sections/ApiIntegrationSettings';

/**
 * Tab configuration type for settings navigation
 */
type SettingsTab = {
  id: string;
  label: string;
  icon: FC;
  component: FC;
};

/**
 * Settings page component that displays various user configuration options
 * Organized into tabs for different settings categories
 */
export const SettingsPage: FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Settings tabs configuration
  const settingsTabs: SettingsTab[] = [
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      component: ProfileSettings,
    },
    {
      id: 'security',
      label: 'Account Security',
      icon: Shield,
      component: SecuritySettings,
    },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: Palette,
      component: AppearanceSettings,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      component: NotificationSettings,
    },
    {
      id: 'data-privacy',
      label: 'Data & Privacy',
      icon: Database,
      component: DataPrivacySettings,
    },
    {
      id: 'api-integrations',
      label: 'API & Integrations',
      icon: KeyRound,
      component: ApiIntegrationSettings,
    },
  ];

  return (
    <div className="container p-6 mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Sidebar Navigation - Visible only on mobile as tabs */}
        <div className="md:hidden w-full">
          <Tabs defaultValue="profile" onValueChange={setActiveTab} orientation="horizontal">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              {settingsTabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {settingsTabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                <Card>
                  <CardContent className="py-6">
                    <tab.component />
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Desktop Layout with Sidebar and Content */}
        <div className="hidden md:flex w-full gap-6">
          {/* Settings Sidebar */}
          <Card className="w-64 h-fit sticky top-6">
            <CardContent className="p-0">
              <nav className="flex flex-col">
                {settingsTabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex items-center gap-2 p-3 text-sm hover:bg-accent rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-accent text-accent-foreground font-medium'
                        : 'text-muted-foreground'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>

          {/* Settings Content */}
          <Card className="flex-1">
            <CardContent className="py-6">
              {settingsTabs.find(tab => tab.id === activeTab)?.component({}) || null}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
