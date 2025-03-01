import { FC, useState, useEffect } from 'react';
import {
  Button,
  Label,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Slider,
  Card,
  CardContent,
} from '@erisfy/shadcnui';
import { Moon, Sun, SunMoon } from 'lucide-react';

// Mock initial appearance settings
const initialSettings = {
  theme: 'system', // 'light', 'dark', or 'system'
  fontSize: 16, // Base font size in pixels
};

/**
 * Appearance Settings component that allows users to adjust visual preferences
 */
export const AppearanceSettings: FC = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [previewFontSize, setPreviewFontSize] = useState(settings.fontSize);

  // Function to apply theme changes in a real app
  // This is a simplified mock implementation
  useEffect(() => {
    // In a real app, this would persist to localStorage/backend and apply changes
    console.log('Theme settings updated:', settings);

    // Apply font size to preview text
    setPreviewFontSize(settings.fontSize);

    // Apply theme changes to document for preview purposes
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (settings.theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // Handle system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [settings]);

  const handleThemeChange = (value: string) => {
    setSettings(prev => ({ ...prev, theme: value as 'light' | 'dark' | 'system' }));
  };

  const handleFontSizeChange = (value: number[]) => {
    setSettings(prev => ({ ...prev, fontSize: value[0] }));
  };

  const handleApplyChanges = () => {
    // In a real app, this would persist settings to the user's account
    alert('Appearance settings saved successfully!');
  };

  const handleResetToDefaults = () => {
    setSettings(initialSettings);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Appearance</h2>
        <p className="text-muted-foreground">
          Customize how Erisfy looks and feels for you.
        </p>
      </div>

      <Separator />

      {/* Theme Selection */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Theme</h3>
          <p className="text-sm text-muted-foreground">
            Choose the color scheme for the application
          </p>
        </div>

        <RadioGroup
          value={settings.theme}
          onValueChange={handleThemeChange}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div>
            <RadioGroupItem
              value="light"
              id="theme-light"
              className="peer sr-only"
            />
            <Label
              htmlFor="theme-light"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <Sun className="h-6 w-6 mb-3" />
              <div className="font-medium">Light</div>
            </Label>
          </div>

          <div>
            <RadioGroupItem
              value="dark"
              id="theme-dark"
              className="peer sr-only"
            />
            <Label
              htmlFor="theme-dark"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <Moon className="h-6 w-6 mb-3" />
              <div className="font-medium">Dark</div>
            </Label>
          </div>

          <div>
            <RadioGroupItem
              value="system"
              id="theme-system"
              className="peer sr-only"
            />
            <Label
              htmlFor="theme-system"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <SunMoon className="h-6 w-6 mb-3" />
              <div className="font-medium">System</div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Font Size Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Font Size</h3>
          <p className="text-sm text-muted-foreground">
            Adjust the base font size for better readability
          </p>
        </div>

        <div className="space-y-6 max-w-md">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="font-size">Text Size ({settings.fontSize}px)</Label>
            </div>
            <Slider
              id="font-size"
              min={12}
              max={24}
              step={1}
              value={[settings.fontSize]}
              onValueChange={handleFontSizeChange}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Small</span>
              <span>Default</span>
              <span>Large</span>
            </div>
          </div>

          {/* Preview Text */}
          <Card>
            <CardContent className="py-4">
              <h4 className="font-semibold mb-2">Preview</h4>
              <p style={{ fontSize: `${previewFontSize}px` }} className="mb-2">
                This is how your text will appear throughout Erisfy.
              </p>
              <p style={{ fontSize: `${previewFontSize * 0.875}px` }} className="text-muted-foreground">
                This is smaller text used for descriptions and supplementary information.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={handleResetToDefaults}
        >
          Reset to Defaults
        </Button>
        <Button onClick={handleApplyChanges}>
          Apply Changes
        </Button>
      </div>
    </div>
  );
};
