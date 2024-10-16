import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders welcome message', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const welcomeElement = screen.getByText(/welcome to the family tree/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('renders tree component', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const treeLink = screen.getByText(/tree/i);
  treeLink.click();
  const treeElement = screen.getByText(/family tree/i); // Adjust this based on the actual content of the Tree component
  expect(treeElement).toBeInTheDocument();
});