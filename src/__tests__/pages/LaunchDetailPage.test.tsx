import React from 'react';
import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LaunchDetailPage } from '../../pages/LaunchDetailPage';
import { Launch } from '../../types';
import { cleanup } from '@testing-library/react';


jest.mock('axios', () => {});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' })
}));

const mockData: Launch[] = [
  {
    id: '1',
    mission_name: 'Eagle Fang',
    launch_date_utc: '2021-01-01T00:00:00Z',
    launch_year: '2021',
    rocket: { rocket_name: 'Falcon 9' },
    details: 'A test launch.',
    links: { article_link: 'https://example.com' }
  },
  {
    id: '2',
    mission_name: 'Cobra Kai',
    launch_date_utc: '2021-02-01T00:00:00Z',
    launch_year: '2021',
    rocket: { rocket_name: 'Falcon Heavy' },
    details: 'Another test launch.',
    links: { article_link: 'https://example.com' }
  }
];

describe('LaunchDetailPage', () => {
  beforeEach(() => {
    localStorage.setItem('data', JSON.stringify(mockData));
  });

  afterEach(() => {
    localStorage.clear();
    cleanup();
  });

  test('renders Loader when launchDetails is not available', () => {
    localStorage.setItem('data', JSON.stringify([]));
    render(
      <MemoryRouter initialEntries={['/launch/1']}>
        <Routes>
          <Route path="/launch/:id" element={<LaunchDetailPage/>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('displays launch details when data is available', async () => {
    render(
      <MemoryRouter initialEntries={['/launch/1']}>
        <Routes>
          <Route path="/launch/:id" element={<LaunchDetailPage/>} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText(/Launched:/i);

    expect(screen.getByText(/2021-01-01T00:00:00Z/i)).toBeInTheDocument();
    expect(screen.getByText(/Falcon 9/i)).toBeInTheDocument();
    expect(screen.getByText(/A test launch./i)).toBeInTheDocument();
  });
});
