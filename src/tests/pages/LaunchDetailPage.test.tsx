import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { LaunchDetailPage } from '../../pages';

describe('LaunchDetailPage', () => {
  test('renders LaunchDetailPage with correct heading', () => {
    const { getByText } = render(<LaunchDetailPage />);
    
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const headingElement = getByText(/Launch Detail/i);
    expect(headingElement).toBeInTheDocument();
  })
})
