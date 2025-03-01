import { FC, useState } from 'react';
import {
  Button,
  Separator,
  RadioGroup,
  RadioGroupItem,
  Label,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Alert,
  AlertTitle,
  AlertDescription,
  Input,
} from '@erisfy/shadcnui';
import { AlertCircle, Download, Trash2 } from 'lucide-react';

/**
 * Data & Privacy Settings component that enables users to control their data
 */
export const DataPrivacySettings: FC = () => {
  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('json');
  const [isExporting, setIsExporting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleExportData = () => {
    setIsExporting(true);

    // Mock export process
    setTimeout(() => {
      setIsExporting(false);

      // In a real app, this would generate and download a file
      const mockData = {
        user: { name: 'investor123', email: 'primary@example.com' },
        watchlists: [{ name: 'Tech Stocks', symbols: ['AAPL', 'MSFT', 'GOOGL'] }],
        portfolios: [{ name: 'Main Portfolio', holdings: [{ symbol: 'AAPL', shares: 10 }] }]
      };

      // Create a downloadable file
      const dataStr = exportFormat === 'json'
        ? JSON.stringify(mockData, null, 2)
        : 'name,email\ninvestor123,primary@example.com\n\nwatchlist,symbols\nTech Stocks,"AAPL,MSFT,GOOGL"\n\nportfolio,symbol,shares\nMain Portfolio,AAPL,10';

      const dataBlob = new Blob([dataStr], { type: exportFormat === 'json' ? 'application/json' : 'text/csv' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `erisfy-data.${exportFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert(`Your data has been exported in ${exportFormat.toUpperCase()} format.`);
    }, 1500);
  };

  const handleStartDeleteAccount = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // In a real app, this would send a delete request to the backend
    if (confirmDelete === 'DELETE') {
      // Simulate account deletion process
      setTimeout(() => {
        alert('Your account deletion request has been submitted. We will process your request and send a confirmation email.');
        setIsDeleteDialogOpen(false);
        setConfirmDelete('');
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Data & Privacy</h2>
        <p className="text-muted-foreground">
          Control your personal data and privacy settings.
        </p>
      </div>

      <Separator />

      {/* Data Export Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Export Your Data</h3>
          <p className="text-sm text-muted-foreground">
            Download all your personal data in various formats
          </p>
        </div>

        <div className="space-y-4">
          <RadioGroup
            value={exportFormat}
            onValueChange={(value) => setExportFormat(value as 'json' | 'csv')}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="json" id="json-format" />
              <Label htmlFor="json-format">JSON (recommended for developers)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="csv" id="csv-format" />
              <Label htmlFor="csv-format">CSV (spreadsheet format)</Label>
            </div>
          </RadioGroup>

          <Alert className="bg-primary/10 border-primary">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle>What data will be exported?</AlertTitle>
            <AlertDescription>
              <p className="mt-1">Your export will include:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Account details and profile information</li>
                <li>Saved watchlists and stock filters</li>
                <li>Portfolio holdings and transaction history</li>
                <li>Notification preferences and settings</li>
              </ul>
            </AlertDescription>
          </Alert>

          <Button
            onClick={handleExportData}
            className="gap-2"
            disabled={isExporting}
          >
            <Download className="h-4 w-4" />
            {isExporting ? 'Preparing Download...' : `Export as ${exportFormat.toUpperCase()}`}
          </Button>
        </div>
      </div>

      <Separator />

      {/* Account Deletion */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Delete Your Account</h3>
          <p className="text-sm text-muted-foreground">
            Permanently delete your account and all associated data
          </p>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Warning: This action cannot be undone</AlertTitle>
          <AlertDescription>
            Deleting your account will permanently remove all your data from our systems, including:
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Your profile and account information</li>
              <li>All saved watchlists and portfolios</li>
              <li>Custom stock filters and alerts</li>
              <li>Transaction history and analytics</li>
            </ul>
          </AlertDescription>
        </Alert>

        <Button
          variant="destructive"
          className="gap-2"
          onClick={handleStartDeleteAccount}
        >
          <Trash2 className="h-4 w-4" />
          Delete Account
        </Button>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-destructive">Delete Account Confirmation</DialogTitle>
            <DialogDescription>
              This action is irreversible and will permanently delete all your data.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <p className="text-sm">
              If you're sure you want to delete your account, please type <strong>DELETE</strong> in the box below to confirm:
            </p>

            <Input
              value={confirmDelete}
              onChange={(e) => setConfirmDelete(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="font-mono"
            />

            <p className="text-sm text-muted-foreground">
              After deletion, we will send you a confirmation email. Please note that some data may be retained for legal purposes.
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setConfirmDelete('');
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={confirmDelete !== 'DELETE'}
              onClick={handleConfirmDelete}
            >
              Permanently Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
