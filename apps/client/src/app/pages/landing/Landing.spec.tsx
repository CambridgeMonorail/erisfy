import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LandingPage } from './Landing';

describe('LandingPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(
      getByText(/Erisfy—Find the Right Stocks, Faster./gi)
    ).toBeTruthy();
  });

  it('should have a subtitle', () => {
    const { getByText } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(
      getByText(/Smarter investing starts with the right insights./gi)
    ).toBeTruthy();
  });

  it('should have a CTA', () => {
    const { getByText } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(
      getByText(/Start Screening Smarter Today/gi)
    ).toBeTruthy();
  });

  it('should have a "Why Erisfy?" section title', () => {
    const { getByText } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(
      getByText(/The Smartest Stock Screener for Everyday Investors/gi)
    ).toBeTruthy();
  });

  it('should render the sixth feature', () => {
    const { getByText } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(getByText(/Performance Beyond Reality/gi)).toBeTruthy();
  });

  it('should revise feature titles and descriptions to emphasize user benefits', () => {
    const { getByText } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(getByText(/AI-Powered Stock Discovery/gi)).toBeTruthy();
    expect(getByText(/Effortless Smart Filtering/gi)).toBeTruthy();
    expect(getByText(/Clear, Actionable Insights/gi)).toBeTruthy();
  });
});
