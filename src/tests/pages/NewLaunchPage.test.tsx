import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { NewLaunchPage } from '../../pages';

describe('NewLaunchPage', () => {
  test('renders NewLaunchPage with correct heading', () => {
    const { getByText } = render(<NewLaunchPage />);
    
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const headingElement = getByText(/New Launch/i);
    expect(headingElement).toBeInTheDocument();
  })
})
