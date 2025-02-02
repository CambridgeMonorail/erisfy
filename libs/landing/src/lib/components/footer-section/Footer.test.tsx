import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Github, Twitter } from 'lucide-react';
import { Footer } from './index';


describe('Footer', () => {
  const defaultProps = {
    navigationLinks: [
      { text: 'Home', url: '/' },
      { text: 'About', url: '/about' },
    ],
    socialMediaIcons: [
      {
        icon: Github,
        url: 'https://github.com/example',
        'aria-label': 'GitHub',
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    ],
    copyrightText: '© 2025 Test Company',
  };

  it('renders successfully with default props', () => {
    render(<Footer {...defaultProps} />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Footer {...defaultProps} />);
    defaultProps.navigationLinks.forEach((link) => {
      const linkElement = screen.getByText(link.text);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', link.url);
    });
  });

  it('renders all social media icons with correct attributes', () => {
    render(<Footer {...defaultProps} />);
    defaultProps.socialMediaIcons.forEach((icon) => {
      const linkElement = screen.getByLabelText(icon['aria-label'] as string);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', icon.url);
      expect(linkElement).toHaveAttribute('target', icon.target);
      expect(linkElement).toHaveAttribute('rel', icon.rel);
    });
  });

  it('renders copyright text', () => {
    render(<Footer {...defaultProps} />);
    expect(screen.getByText(defaultProps.copyrightText)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-footer-class';
    render(<Footer {...defaultProps} className={customClass} />);
    expect(screen.getByRole('contentinfo')).toHaveClass(customClass);
  });

  it('handles empty navigation links', () => {
    render(
      <Footer
        {...defaultProps}
        navigationLinks={[]}
        socialMediaIcons={defaultProps.socialMediaIcons}
      />
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('handles empty social media icons', () => {
    render(
      <Footer
        {...defaultProps}
        navigationLinks={defaultProps.navigationLinks}
        socialMediaIcons={[]}
      />
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('applies custom background and text colors', () => {
    const backgroundColor = 'bg-secondary';
    const textColor = 'text-secondary-foreground';
    render(
      <Footer
        {...defaultProps}
        backgroundColor={backgroundColor}
        textColor={textColor}
      />
    );
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass(backgroundColor);
    expect(footer).toHaveClass(textColor);
  });

  it('renders navigation with correct accessibility attributes', () => {
    render(<Footer {...defaultProps} />);
    expect(screen.getByLabelText('Footer navigation')).toBeInTheDocument();
  });

  it('renders multiple social media icons', () => {
    const props = {
      ...defaultProps,
      socialMediaIcons: [
        {
          icon: Github,
          url: 'https://github.com/example',
          'aria-label': 'GitHub',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        {
          icon: Twitter,
          url: 'https://twitter.com/example',
          'aria-label': 'Twitter',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      ],
    };
    render(<Footer {...props} />);
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
  });

  it('calls onLinkClick when navigation link is clicked', () => {
    const onLinkClick = vi.fn();
    render(<Footer {...defaultProps} onLinkClick={onLinkClick} />);
    
    const link = screen.getByText(defaultProps.navigationLinks[0].text);
    link.click();
    
    expect(onLinkClick).toHaveBeenCalledWith(defaultProps.navigationLinks[0].url);
  });

  it('handles malformed props gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <Footer
        {...defaultProps}
        navigationLinks={[{ text: '', url: '' }]}
        socialMediaIcons={[{ icon: () => null, url: '', 'aria-label': '' }]}
      />
    );
    
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    consoleSpy.mockRestore();
  });

  it('renders with responsive design classes', () => {
    render(<Footer {...defaultProps} />);
    const container = screen.getByTestId('footer');
    expect(container).toHaveClass('sm:px-6', 'lg:px-8');
  });
});
