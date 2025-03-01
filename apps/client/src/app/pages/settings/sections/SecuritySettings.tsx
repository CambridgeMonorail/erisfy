import { FC, useState } from 'react';
import {
  Button,
  Input,
  Label,
  Separator,
  Switch,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Alert,
  AlertTitle,
  AlertDescription,
} from '@erisfy/shadcnui';
import { AlertCircle as AlertIcon, KeySquare, LogOut, Shield, Smartphone, Copy as CopyIcon } from 'lucide-react';

// Mock session data
const mockSessions = [
  {
    id: '1',
    device: 'Chrome on Windows',
    location: 'New York, US',
    ipAddress: '192.168.1.1',
    lastActive: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    current: true,
  },
  {
    id: '2',
    device: 'Safari on iPhone',
    location: 'Boston, US',
    ipAddress: '192.168.1.2',
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    current: false,
  },
  {
    id: '3',
    device: 'Firefox on MacOS',
    location: 'Seattle, US',
    ipAddress: '192.168.1.3',
    lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    current: false,
  },
];

/**
 * Security Settings component that allows users to manage account security
 */
export const SecuritySettings: FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [setupStep, setSetupStep] = useState<null | 'generate' | 'verify'>(null);
  const [recoveryCode, setRecoveryCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [sessions, setSessions] = useState(mockSessions);

  // Mock function to generate QR code and recovery codes
  const handleInitiate2FA = () => {
    setSetupStep('generate');
    // In a real app, this would call an API to generate a secret and QR code
    setRecoveryCode('ABCD-EFGH-IJKL-MNOP');
  };

  const handleVerify2FA = () => {
    // In a real app, this would verify the code with the backend
    if (verificationCode.length === 6) {
      setTwoFactorEnabled(true);
      setSetupStep(null);
      setVerificationCode('');
    }
  };

  const handlePasswordChange = () => {
    // In a real app, this would send the password update to the backend
    if (newPassword === confirmPassword && currentPassword) {
      // Password change success logic
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      alert('Password updated successfully');
    }
  };

  const handleEndSession = (sessionId: string) => {
    // Remove the session from the list (in a real app, this would call an API)
    setSessions(sessions.filter(session => session.id !== sessionId));
  };

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Account Security</h2>
        <p className="text-muted-foreground">
          Manage your account security settings and active sessions.
        </p>
      </div>

      <Separator />

      {/* Password Change Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Change Password</h3>
          <p className="text-sm text-muted-foreground">
            Update your password to keep your account secure
          </p>
        </div>

        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {newPassword && confirmPassword && newPassword !== confirmPassword && (
              <p className="text-sm text-destructive mt-1">Passwords do not match</p>
            )}
          </div>

          <Button
            onClick={handlePasswordChange}
            disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
          >
            Update Password
          </Button>
        </div>
      </div>

      <Separator />

      {/* Two-Factor Authentication Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Two-Factor Authentication (2FA)</h3>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={(checked) => {
                if (!checked) {
                  setTwoFactorEnabled(false);
                  setSetupStep(null);
                } else if (!setupStep) {
                  handleInitiate2FA();
                }
              }}
            />
            <span>{twoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
          </div>
        </div>

        {setupStep === 'generate' && (
          <Card>
            <CardHeader>
              <CardTitle>Set Up Two-Factor Authentication</CardTitle>
              <CardDescription>
                Scan the QR code with an authenticator app like Google Authenticator or Authy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* This would be a real QR code in a production app */}
              <div className="flex justify-center py-4">
                <div className="border border-border rounded-md w-48 h-48 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">QR Code Placeholder</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="recovery-code">Recovery Code</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 gap-1"
                    onClick={() => {
                      navigator.clipboard.writeText(recoveryCode);
                    }}
                  >
                    <CopyIcon className="h-3 w-3" />
                    Copy
                  </Button>
                </div>
                <Input
                  id="recovery-code"
                  value={recoveryCode}
                  readOnly
                  className="font-mono text-center"
                />
                <p className="text-xs text-muted-foreground">
                  Save this code in a secure place. You'll need it if you lose access to your authenticator app.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="verification-code">Verification Code</Label>
                <Input
                  id="verification-code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit code"
                  className="font-mono text-center text-lg tracking-widest"
                  autoFocus
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSetupStep(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleVerify2FA}
                  disabled={verificationCode.length !== 6}
                >
                  Verify
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {twoFactorEnabled && (
          <Alert variant="default" className="bg-primary/10 border-primary">
            <Shield className="h-4 w-4 text-primary" />
            <AlertTitle>Two-Factor Authentication is Enabled</AlertTitle>
            <AlertDescription>
              Your account is protected with two-factor authentication.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <Separator />

      {/* Session Management */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Active Sessions</h3>
          <p className="text-sm text-muted-foreground">
            Manage devices that are currently logged into your account
          </p>
        </div>

        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 border rounded-md"
            >
              <div className="space-y-1">
                <div className="font-medium flex items-center gap-2">
                  {session.device}
                  {session.current && (
                    <Badge variant="secondary" className="text-xs">Current</Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {session.location} • IP: {session.ipAddress}
                </div>
                <div className="text-xs text-muted-foreground">
                  Last active: {formatLastActive(session.lastActive)}
                </div>
              </div>
              {!session.current && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
                  onClick={() => handleEndSession(session.id)}
                >
                  <LogOut className="h-4 w-4" />
                  End Session
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
