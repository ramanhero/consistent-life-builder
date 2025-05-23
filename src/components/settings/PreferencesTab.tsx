
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const preferencesFormSchema = z.object({
  theme: z.string(),
  language: z.string(),
  timezone: z.string(),
});

type PreferencesFormValues = z.infer<typeof preferencesFormSchema>;

const PreferencesTab = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();

  const preferencesForm = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      theme: theme,
      language: language,
      timezone: 'UTC',
    },
  });

  // Update form when theme changes from header
  useEffect(() => {
    preferencesForm.setValue('theme', theme);
  }, [theme, preferencesForm]);

  const onPreferencesSubmit = (data: PreferencesFormValues) => {
    // Update theme
    setTheme(data.theme as 'light' | 'dark' | 'system');
    
    // Update language
    setLanguage(data.language as any);
    
    toast({
      title: t('toast.preferencesSaved'),
      description: t('toast.preferencesSavedDesc'),
    });
  };

  const handleThemeChange = (value: string) => {
    setTheme(value as 'light' | 'dark' | 'system');
    preferencesForm.setValue('theme', value);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value as any);
    preferencesForm.setValue('language', value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.preferences.title')}</CardTitle>
        <CardDescription>
          {t('settings.preferences.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...preferencesForm}>
          <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-6">
            <FormField
              control={preferencesForm.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.preferences.theme')}</FormLabel>
                  <Select 
                    onValueChange={(value) => handleThemeChange(value)} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="light">{t('theme.light')}</SelectItem>
                      <SelectItem value="dark">{t('theme.dark')}</SelectItem>
                      <SelectItem value="system">{t('theme.system')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={preferencesForm.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.preferences.language')}</FormLabel>
                  <Select onValueChange={(value) => handleLanguageChange(value)} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">हिन्दी (Hindi)</SelectItem>
                      <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
                      <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                      <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
                      <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                      <SelectItem value="gujarati">ગુજરાતી (Gujarati)</SelectItem>
                      <SelectItem value="odia">ଓଡିଆ (Odia)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={preferencesForm.control}
              name="timezone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.preferences.timezone')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                      <SelectItem value="CST">Central Time (CST)</SelectItem>
                      <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                      <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                      <SelectItem value="IST">Indian Standard Time (IST)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">{t('settings.preferences.save')}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PreferencesTab;
