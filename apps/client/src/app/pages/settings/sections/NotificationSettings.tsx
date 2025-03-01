import { FC, useState } from 'react';
import {
  Button,
  Input,
  Label,
  Separator,
  Switch,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Slider,
  Card,
  CardContent,
} from '@erisfy/shadcnui';
import { Save } from 'lucide-react';

// Mock notification settings data
const mockNotificationSettings = {
  marketAlerts: {
    enabled: true,
    priceChangeThreshold: 5, // Percentage
    volumeSpikes: true,
    earningsAnnouncements: true,
    dividendAlerts: true,
  },
  aiInsights: {
    enabled: true,
    stockSuggestions: true,
    marketAnalysis: true,
    portfolioRecommendations: true,
    tradingPatterns: false,
  },
  emailPreferences: {
    weeklyNewsletter: true,
    monthlySummary: true,
    specialOffers: false,
    weeklyDigestDay: 'monday',
  }
};

/**
 * Notification Settings component that allows users to manage their notification preferences
 */
export const NotificationSettings: FC = () => {
  const [settings, setSettings] = useState(mockNotificationSettings);
  const [isDirty, setIsDirty] = useState(false);

  const handleMarketAlertsToggle = (checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      marketAlerts: {
        ...prev.marketAlerts,
        enabled: checked
      }
    }));
    setIsDirty(true);
  };

  const handlePriceChangeThreshold = (value: number[]) => {
    setSettings(prev => ({
      ...prev,
      marketAlerts: {
        ...prev.marketAlerts,
        priceChangeThreshold: value[0]
      }
    }));
    setIsDirty(true);
  };

  const handleMarketAlertToggle = (key: keyof typeof settings.marketAlerts, checked: boolean) => {
    if (key === 'enabled' || key === 'priceChangeThreshold') return;

    setSettings(prev => ({
      ...prev,
      marketAlerts: {
        ...prev.marketAlerts,
        [key]: checked
      }
    }));
    setIsDirty(true);
  };

  const handleAIInsightsToggle = (key: keyof typeof settings.aiInsights, checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      aiInsights: {
        ...prev.aiInsights,
        [key]: checked
      }
    }));
    setIsDirty(true);
  };

  const handleEmailPrefToggle = (key: keyof typeof settings.emailPreferences, checked: boolean) => {
    if (key === 'weeklyDigestDay') return;

    setSettings(prev => ({
      ...prev,
      emailPreferences: {
        ...prev.emailPreferences,
        [key]: checked
      }
    }));
    setIsDirty(true);
  };

  const handleDigestDayChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      emailPreferences: {
        ...prev.emailPreferences,
        weeklyDigestDay: value
      }
    }));
    setIsDirty(true);
  };

  const saveSettings = () => {
    // In a real application, this would save to an API
    console.log('Saving notification settings:', settings);
    alert('Notification preferences saved successfully!');
    setIsDirty(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Notifications</h2>
        <p className="text-muted-foreground">
          Configure how and when you want to receive updates from Erisfy.
        </p>
      </div>

      <Separator />

      {/* Market Alerts Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Market Alerts</h3>
            <p className="text-sm text-muted-foreground">
              Get notified about important market events and stock price changes
            </p>
          </div>
          <Switch
            checked={settings.marketAlerts.enabled}
            onCheckedChange={handleMarketAlertsToggle}
          />
        </div>

        {settings.marketAlerts.enabled && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="price-change-threshold">
                      Price change threshold ({settings.marketAlerts.priceChangeThreshold}%)
                    </Label>
                  </div>
                  <Slider
                    id="price-change-threshold"
                    min={1}
                    max={20}
                    step={0.5}
                    value={[settings.marketAlerts.priceChangeThreshold]}
                    onValueChange={handlePriceChangeThreshold}
                  />
                  <p className="text-xs text-muted-foreground">
                    Get alerted when stocks in your watchlist change by this percentage or more in a single day
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="volume-spikes">Volume spikes</Label>
                    <Switch
                      id="volume-spikes"
                      checked={settings.marketAlerts.volumeSpikes}
                      onCheckedChange={(checked) => handleMarketAlertToggle('volumeSpikes', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Get alerted about unusual trading volume
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="earnings-announcements">Earnings announcements</Label>
                    <Switch
                      id="earnings-announcements"
                      checked={settings.marketAlerts.earningsAnnouncements}
                      onCheckedChange={(checked) => handleMarketAlertToggle('earningsAnnouncements', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Get reminded about upcoming earnings reports
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dividend-alerts">Dividend alerts</Label>
                    <Switch
                      id="dividend-alerts"
                      checked={settings.marketAlerts.dividendAlerts}
                      onCheckedChange={(checked) => handleMarketAlertToggle('dividendAlerts', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Get notified about dividend announcements and ex-dividend dates
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Separator />

      {/* AI Insights Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">AI Insights</h3>
            <p className="text-sm text-muted-foreground">
              Receive AI-powered stock suggestions and analysis
            </p>
          </div>
          <Switch
            checked={settings.aiInsights.enabled}
            onCheckedChange={(checked) => handleAIInsightsToggle('enabled', checked)}
          />
        </div>

        {settings.aiInsights.enabled && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="stock-suggestions">Stock suggestions</Label>
                    <Switch
                      id="stock-suggestions"
                      checked={settings.aiInsights.stockSuggestions}
                      onCheckedChange={(checked) => handleAIInsightsToggle('stockSuggestions', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Get personalized stock recommendations based on your investment style
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="market-analysis">Market analysis</Label>
                    <Switch
                      id="market-analysis"
                      checked={settings.aiInsights.marketAnalysis}
                      onCheckedChange={(checked) => handleAIInsightsToggle('marketAnalysis', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Receive AI analysis of market trends and conditions
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="portfolio-recommendations">Portfolio recommendations</Label>
                    <Switch
                      id="portfolio-recommendations"
                      checked={settings.aiInsights.portfolioRecommendations}
                      onCheckedChange={(checked) => handleAIInsightsToggle('portfolioRecommendations', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Get suggestions for rebalancing and optimizing your portfolio
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="trading-patterns">Trading pattern insights</Label>
                    <Switch
                      id="trading-patterns"
                      checked={settings.aiInsights.tradingPatterns}
                      onCheckedChange={(checked) => handleAIInsightsToggle('tradingPatterns', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Get advanced technical analysis and pattern recognition
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Separator />

      {/* Email Preferences */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Email Preferences</h3>
          <p className="text-sm text-muted-foreground">
            Control which emails you receive from us
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="weekly-newsletter">Weekly newsletter</Label>
              <Switch
                id="weekly-newsletter"
                checked={settings.emailPreferences.weeklyNewsletter}
                onCheckedChange={(checked) => handleEmailPrefToggle('weeklyNewsletter', checked)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              A summary of market news and featured stock analyses
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="monthly-summary">Monthly portfolio summary</Label>
              <Switch
                id="monthly-summary"
                checked={settings.emailPreferences.monthlySummary}
                onCheckedChange={(checked) => handleEmailPrefToggle('monthlySummary', checked)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              A detailed analysis of your portfolio performance
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="special-offers">Special offers</Label>
              <Switch
                id="special-offers"
                checked={settings.emailPreferences.specialOffers}
                onCheckedChange={(checked) => handleEmailPrefToggle('specialOffers', checked)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Promotional emails about premium features and special offers
            </p>
          </div>

          {settings.emailPreferences.weeklyNewsletter && (
            <div className="space-y-2 pt-2">
              <Label htmlFor="digest-day">Weekly digest day</Label>
              <Select
                value={settings.emailPreferences.weeklyDigestDay}
                onValueChange={handleDigestDayChange}
              >
                <SelectTrigger id="digest-day">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunday">Sunday</SelectItem>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="tuesday">Tuesday</SelectItem>
                  <SelectItem value="wednesday">Wednesday</SelectItem>
                  <SelectItem value="thursday">Thursday</SelectItem>
                  <SelectItem value="friday">Friday</SelectItem>
                  <SelectItem value="saturday">Saturday</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose which day of the week you'd like to receive our newsletter
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      {isDirty && (
        <div className="flex justify-end">
          <Button onClick={saveSettings} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};
