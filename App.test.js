import { render, screen } from '@testing-library/react';
import App from './App';

test('renders top products header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Top 3 Products/i);
  expect(headerElement).toBeInTheDocument();
});
