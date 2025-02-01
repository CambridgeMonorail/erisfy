import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom for custom matchers
import { Header } from './index';
import { Home, User, Settings } from 'lucide-react';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
  const actionButtonsProps = [
    { icon: <Home />, label: 'Home' },
    { icon: <User />, label: 'User' },
    { icon: <Settings />, label: 'Settings' },
  ];

  it('renders the logo and action buttons', () => {
    render(
      <BrowserRouter>
        <Header logoIcon={<Home />} actionButtonsProps={actionButtonsProps} />
      </BrowserRouter>
    );
    // Check for the header element itself
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    // Check for action buttons
    expect(screen.getAllByRole('button')).toHaveLength(3);
    
    // Verify button labels are present
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /user/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
  });

  it('applies additional class names', () => {
    render(
      <BrowserRouter>
        <Header logoIcon={<Home />} actionButtonsProps={actionButtonsProps} className="custom-class" />
      </BrowserRouter>
    );
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('custom-class');
  });

  it('is responsive', () => {
    render(
      <BrowserRouter>
        <Header logoIcon={<Home />} actionButtonsProps={actionButtonsProps} />
      </BrowserRouter>
    );
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-primary', 'text-primary-foreground');
    expect(header).toHaveClass('flex', 'justify-between', 'p-4', 'items-center');
  });

  it('wraps logo and title in a link to the root of the site when linkToRoot is true', () => {
    render(
      <BrowserRouter>
        <Header logoIcon={<Home />} actionButtonsProps={actionButtonsProps} title="MY APPLICATION" linkToRoot />
      </BrowserRouter>
    );
    const linkElement = screen.getByRole('link', { name: /my application/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
