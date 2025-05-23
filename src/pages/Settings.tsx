
import React from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileTab from '@/components/settings/ProfileTab';
import PasswordTab from '@/components/settings/PasswordTab';
import PreferencesTab from '@/components/settings/PreferencesTab';
import NotificationsTab from '@/components/settings/NotificationsTab';

const Settings = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{t('settings.title')}</h1>
            <p className="text-muted-foreground mt-1">
              {t('settings.subtitle')}
            </p>
          </div>
          
          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4 mb-4">
              <TabsTrigger value="profile">{t('settings.tabs.profile')}</TabsTrigger>
              <TabsTrigger value="password">{t('settings.tabs.password')}</TabsTrigger>
              <TabsTrigger value="preferences">{t('settings.tabs.preferences')}</TabsTrigger>
              <TabsTrigger value="notifications">{t('settings.tabs.notifications')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <ProfileTab />
            </TabsContent>
            
            <TabsContent value="password">
              <PasswordTab />
            </TabsContent>
            
            <TabsContent value="preferences">
              <PreferencesTab />
            </TabsContent>
            
            <TabsContent value="notifications">
              <NotificationsTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
