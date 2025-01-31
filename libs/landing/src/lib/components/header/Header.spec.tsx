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
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('applies additional class names', () => {
    render(
      <BrowserRouter>
        <Header logoIcon={<Home />} actionButtonsProps={actionButtonsProps} className="custom-class" />
      </BrowserRouter>
    );
    expect(screen.getByTestId('header')).toHaveClass('custom-class');
  });

  it('is responsive', () => {
    render(
      <BrowserRouter>
        <Header logoIcon={<Home />} actionButtonsProps={actionButtonsProps} />
      </BrowserRouter>
    );
    const header = screen.getByTestId('header');
    expect(header).toHaveClass('bg-primary', 'text-primary-foreground');
    expect(header).toHaveClass('flex', 'justify-between', 'p-4', 'items-center');
  });

  it('wraps logo and title in a link to the root of the site when linkToRoot is true', () => {
    render(
      <BrowserRouter>
        <Header logoIcon={<Home />} actionButtonsProps={actionButtonsProps} title="MY APPLICATION" linkToRoot />
      </BrowserRouter>
    );
    const linkElement = screen.getByRole('link', { name: /home/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
