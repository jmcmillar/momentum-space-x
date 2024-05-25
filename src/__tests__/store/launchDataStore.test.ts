import { LaunchDataStore } from "../../store/launchDataStore";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LaunchIndexJson } from "../../types";
import { ROUTES } from "../../constants";

jest.mock('axios');

describe("LaunchDataStore", () => {
  let mock: MockAdapter;
  let store: LaunchDataStore;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  beforeEach(() => {
    store = new LaunchDataStore();
  });

  afterEach(() => {
    mock.reset();
  });

    it('should fetch and set launches correctly', async () => {
    const mockLaunches: LaunchIndexJson = {
      data: {
        launches: [
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
        ],
      },
    };

    mock.onGet(ROUTES.api).reply(200, mockLaunches);

    await store.getLaunches();

    expect(store.launches).toEqual(mockLaunches.data.launches);
    expect(store.launchCount).toBe(mockLaunches.data.launches.length);
  });
});
