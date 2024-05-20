import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { LaunchesPage } from '../../pages';

describe('LaunchesPage', () => {
  test('renders LaunchesPage with correct heading', () => {
    const { getByText } = render(<LaunchesPage />);
    
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const headingElement = getByText(/Launches/i);
    expect(headingElement).toBeInTheDocument();
  })
})
