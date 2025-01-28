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
      getByText(/Erisfy: The Fintech Solution So Good It Doesn’t Even Exist/gi)
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
    expect(getByText(/Instant Chaos Management/gi)).toBeTruthy();
    expect(getByText(/Effortless UI Magic/gi)).toBeTruthy();
    expect(getByText(/Scalability Without Bounds/gi)).toBeTruthy();
  });
});
