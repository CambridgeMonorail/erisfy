import { FC, useState } from 'react';
import {
  Button,
  Input,
  Label,
  Separator,
  Switch,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Alert,
  AlertDescription,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@erisfy/shadcnui';
import { AlertCircle, Copy, Eye, EyeOff, Link, Plus, RefreshCw, Unlink, KeyRound } from 'lucide-react';

// Mock API keys
const mockApiKeys = [
  {
    id: 'api-key-1',
    name: 'Trading Bot',
    key: 'sk_1234567890abcdef',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: 'api-key-2',
    name: 'Research Dashboard',
    key: 'sk_abcdefghijklmno',
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
    lastUsed: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
  },
];

// Mock connected platforms
const mockConnectedPlatforms = [
  {
    id: 'conn-1',
    name: 'Interactive Brokers',
    icon: '🌐',
    status: 'connected',
    connectedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
  },
  {
    id: 'conn-2',
    name: 'TradingView',
    icon: '📊',
    status: 'connected',
    connectedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
  },
];

// Available platforms for connection
const availablePlatforms = [
  { id: 'ib', name: 'Interactive Brokers' },
  { id: 'tv', name: 'TradingView' },
  { id: 'td', name: 'TD Ameritrade' },
  { id: 'rh', name: 'Robinhood' },
  { id: 'etrade', name: 'E*TRADE' },
];

/**
 * API & Integration Settings component that allows users to manage API keys and platform connections
 */
export const ApiIntegrationSettings: FC = () => {
  const [apiKeys, setApiKeys] = useState(mockApiKeys);
  const [connectedPlatforms, setConnectedPlatforms] = useState(mockConnectedPlatforms);
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);
  const [showAddIntegrationDialog, setShowAddIntegrationDialog] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [newKeyName, setNewKeyName] = useState('');
  const [newKey, setNewKey] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});

  const handleCreateKey = () => {
    if (!newKeyName) return;

    // Generate a mock API key
    const mockKey = `sk_${Math.random().toString(36).substring(2, 15)}`;
    setNewKey(mockKey);

    // In a real app, this would call an API to generate a key
    const newApiKey = {
      id: `api-key-${Date.now()}`,
      name: newKeyName,
      key: mockKey,
      createdAt: new Date(),
      lastUsed: new Date(),
    };

    setApiKeys([...apiKeys, newApiKey]);
    setNewKeyName('');
  };

  const handleDeleteKey = (keyId: string) => {
    // In a real app, this would call an API to revoke the key
    setApiKeys(apiKeys.filter(key => key.id !== keyId));
  };

  const handleAddIntegration = () => {
    if (!selectedPlatform) return;

    // Find the platform from available list
    const platformToAdd = availablePlatforms.find(p => p.id === selectedPlatform);

    if (platformToAdd) {
      // Check if already connected
      const isAlreadyConnected = connectedPlatforms.some(p =>
        p.name.toLowerCase() === platformToAdd.name.toLowerCase());

      if (!isAlreadyConnected) {
        const newPlatform = {
          id: `conn-${Date.now()}`,
          name: platformToAdd.name,
          icon: '🔌', // Default icon
          status: 'connected',
          connectedAt: new Date(),
        };

        setConnectedPlatforms([...connectedPlatforms, newPlatform]);
      }
    }

    setSelectedPlatform('');
    setShowAddIntegrationDialog(false);
  };

  const handleDisconnectPlatform = (platformId: string) => {
    // In a real app, this would call an API to disconnect the platform
    setConnectedPlatforms(connectedPlatforms.filter(p => p.id !== platformId));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">API & Integrations</h2>
        <p className="text-muted-foreground">
          Manage API keys and connect external trading platforms.
        </p>
      </div>

      <Separator />

      {/* API Keys Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">API Keys</h3>
            <p className="text-sm text-muted-foreground">
              Create and manage API keys for external applications
            </p>
          </div>
          <Button
            onClick={() => setShowNewKeyDialog(true)}
            className="gap-2"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
            New API Key
          </Button>
        </div>

        <Alert className="bg-primary/10 border-primary">
          <AlertCircle className="h-4 w-4 text-primary" />
          <AlertDescription>
            API keys provide full access to your account. Keep them secure and never share them.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <Card key={apiKey.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex justify-between">
                  <span>{apiKey.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    Created {formatDate(apiKey.createdAt)}
                  </span>
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <div className="flex-1 font-mono">
                    {visibleKeys[apiKey.id]
                      ? apiKey.key
                      : apiKey.key.slice(0, 3) + '•'.repeat(apiKey.key.length - 6) + apiKey.key.slice(-3)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                  >
                    {visibleKeys[apiKey.id] ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {visibleKeys[apiKey.id] ? 'Hide' : 'Show'} API key
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => {
                      navigator.clipboard.writeText(apiKey.key);
                      alert('API key copied to clipboard');
                    }}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy API key</span>
                  </Button>
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-1 text-xs text-muted-foreground justify-between items-center">
                <div>Last used: {formatDate(apiKey.lastUsed)}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDeleteKey(apiKey.id)}
                >
                  Revoke
                </Button>
              </CardFooter>
            </Card>
          ))}

          {apiKeys.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              You haven't created any API keys yet.
            </p>
          )}
        </div>
      </div>

      <Separator />

      {/* Trading Platform Integrations */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Trading Platform Connections</h3>
            <p className="text-sm text-muted-foreground">
              Connect external trading platforms to sync your portfolio data
            </p>
          </div>
          <Button
            onClick={() => setShowAddIntegrationDialog(true)}
            className="gap-2"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
            Add Connection
          </Button>
        </div>

        <div className="space-y-4">
          {connectedPlatforms.map((platform) => (
            <div
              key={platform.id}
              className="flex items-center justify-between p-4 border rounded-md bg-background"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <span className="text-lg">{platform.icon}</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium">{platform.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    Connected since {formatDate(platform.connectedAt)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-xs"
                  onClick={() => {
                    // In a real app, this would refresh the connection
                    alert(`Refreshed connection to ${platform.name}`);
                  }}
                >
                  <RefreshCw className="h-3 w-3" />
                  Refresh
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDisconnectPlatform(platform.id)}
                >
                  <Unlink className="h-3 w-3" />
                  Disconnect
                </Button>
              </div>
            </div>
          ))}

          {connectedPlatforms.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              You haven't connected any trading platforms yet.
            </p>
          )}
        </div>
      </div>

      {/* New API Key Dialog */}
      <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New API Key</DialogTitle>
            <DialogDescription>
              This will generate a new API key for external applications to access your Erisfy data.
            </DialogDescription>
          </DialogHeader>

          {newKey ? (
            <div className="space-y-4 py-4">
              <Alert className="bg-primary/10 border-primary">
                <KeyRound className="h-4 w-4 text-primary" />
                <AlertDescription>
                  This key will only be shown once. Save it in a secure location.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="new-api-key">Your New API Key</Label>
                <div className="flex">
                  <Input
                    id="new-api-key"
                    value={newKey}
                    readOnly
                    className="font-mono flex-1"
                  />
                  <Button
                    className="ml-2"
                    onClick={() => {
                      navigator.clipboard.writeText(newKey);
                      alert('API key copied to clipboard');
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="key-name">API Key Name</Label>
                <Input
                  id="key-name"
                  placeholder="e.g., Trading Bot"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Give this key a descriptive name to remember what it's used for.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            {newKey ? (
              <Button
                onClick={() => {
                  setShowNewKeyDialog(false);
                  setNewKey(null);
                }}
              >
                Done
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowNewKeyDialog(false);
                    setNewKeyName('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateKey}
                  disabled={!newKeyName}
                >
                  Create Key
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Integration Dialog */}
      <Dialog open={showAddIntegrationDialog} onOpenChange={setShowAddIntegrationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Trading Platform</DialogTitle>
            <DialogDescription>
              Sync your portfolio data with external trading platforms.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="platform-select">Select Platform</Label>
              <Select
                value={selectedPlatform}
                onValueChange={setSelectedPlatform}
              >
                <SelectTrigger id="platform-select">
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent>
                  {availablePlatforms
                    .filter(p => !connectedPlatforms.some(cp =>
                      cp.name.toLowerCase() === p.name.toLowerCase()))
                    .map((platform) => (
                      <SelectItem key={platform.id} value={platform.id}>
                        {platform.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You will be redirected to the platform to authorize the connection.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddIntegrationDialog(false);
                setSelectedPlatform('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddIntegration}
              disabled={!selectedPlatform}
              className="gap-2"
            >
              <Link className="h-4 w-4" />
              Connect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
