import { FC, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Input,
  Label,
  Textarea,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Badge,
  Alert,
  AlertDescription,
} from '@erisfy/shadcnui';
import { AlertCircle, Check, PlusCircle } from 'lucide-react';

// Mock data for initial state
const mockUserData = {
  username: 'investor123',
  bio: 'Experienced value investor focused on dividend growth and long-term wealth building.',
  website: 'https://example.com',
  twitter: 'investor123',
  linkedin: 'investor-profile',
  emails: [
    { address: 'primary@example.com', verified: true, isPrimary: true },
    { address: 'secondary@example.com', verified: true, isPrimary: false },
    { address: 'work@company.com', verified: false, isPrimary: false },
  ],
  lastUsernameChange: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
};

/**
 * Profile Settings component that allows users to edit their profile information
 */
export const ProfileSettings: FC = () => {
  const [userData, setUserData] = useState(mockUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [showAddEmail, setShowAddEmail] = useState(false);

  // Calculate if username can be changed (30 days rule)
  const daysSinceLastUsernameChange = Math.floor(
    (Date.now() - userData.lastUsernameChange.getTime()) / (1000 * 60 * 60 * 24)
  );
  const canChangeUsername = daysSinceLastUsernameChange >= 30;

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would normally send the data to the backend
    console.log('Profile saved:', userData);
  };

  const handleAddEmail = () => {
    if (newEmail && !userData.emails.some(email => email.address === newEmail)) {
      const newEmails = [
        ...userData.emails,
        { address: newEmail, verified: false, isPrimary: false }
      ];
      setUserData(prev => ({ ...prev, emails: newEmails }));
      setNewEmail('');
      setShowAddEmail(false);
    }
  };

  const handleSetPrimaryEmail = (emailAddress: string) => {
    const updatedEmails = userData.emails.map(email => ({
      ...email,
      isPrimary: email.address === emailAddress
    }));
    setUserData(prev => ({ ...prev, emails: updatedEmails }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Profile Settings</h2>
        <p className="text-muted-foreground">
          Manage your profile information visible to other users.
        </p>
      </div>

      <Separator />

      {/* Username Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Username</h3>
            <p className="text-sm text-muted-foreground">
              Your unique username on Erisfy
            </p>
          </div>
          {!canChangeUsername && (
            <Badge variant="outline" className="text-amber-500 bg-amber-500/10">
              {`Changeable in ${30 - daysSinceLastUsernameChange} days`}
            </Badge>
          )}
        </div>

        <div className="flex gap-3 items-center">
          <Input
            value={userData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            disabled={!isEditing || !canChangeUsername}
            className="max-w-sm"
          />
          {isEditing ? (
            <Button onClick={handleSaveProfile} className="gap-2">
              <Check className="h-4 w-4" />
              Save
            </Button>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              disabled={!canChangeUsername}
            >
              Edit
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Bio & Links Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Bio & Links</h3>
          <p className="text-sm text-muted-foreground">Tell others about yourself</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={userData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              disabled={!isEditing}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={userData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              disabled={!isEditing}
              placeholder="https://"
              type="url"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                  @
                </span>
                <Input
                  id="twitter"
                  value={userData.twitter}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  disabled={!isEditing}
                  className="rounded-l-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                  linkedin.com/in/
                </span>
                <Input
                  id="linkedin"
                  value={userData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  disabled={!isEditing}
                  className="rounded-l-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Email Management Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Email Addresses</h3>
          <p className="text-sm text-muted-foreground">
            Manage your email addresses and set your primary contact
          </p>
        </div>

        <RadioGroup
          value={userData.emails.find(e => e.isPrimary)?.address}
          onValueChange={handleSetPrimaryEmail}
        >
          {userData.emails.map((email) => (
            <div key={email.address} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value={email.address}
                  id={email.address}
                  disabled={!email.verified}
                />
                <Label htmlFor={email.address} className="flex items-center gap-2">
                  {email.address}
                  {email.isPrimary && (
                    <Badge variant="outline" className="ml-2 text-green-500 bg-green-500/10">
                      Primary
                    </Badge>
                  )}
                  {!email.verified && (
                    <Badge variant="outline" className="ml-2 text-amber-500 bg-amber-500/10">
                      Unverified
                    </Badge>
                  )}
                </Label>
              </div>
              {!email.verified && (
                <Button variant="ghost" size="sm">
                  Resend Verification
                </Button>
              )}
            </div>
          ))}
        </RadioGroup>

        {showAddEmail ? (
          <div className="space-y-2">
            <Label htmlFor="new-email">New Email Address</Label>
            <div className="flex gap-2">
              <Input
                id="new-email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="new@example.com"
                type="email"
                autoFocus
              />
              <Button onClick={handleAddEmail}>Add</Button>
              <Button variant="ghost" onClick={() => {
                setShowAddEmail(false);
                setNewEmail('');
              }}>
                Cancel
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              A verification email will be sent to this address
            </p>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddEmail(true)}
            className="gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Email
          </Button>
        )}
      </div>

      {/* Save Button (only shown when editing) */}
      {isEditing && (
        <div className="pt-4 flex justify-end">
          <div className="space-x-2">
            <Button variant="ghost" onClick={() => {
              setIsEditing(false);
              setUserData(mockUserData); // Reset changes
            }}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </div>
        </div>
      )}
    </div>
  );
};
