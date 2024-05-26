import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { LaunchDataStore } from '../../store/launchDataStore';
import { ROUTES } from '../../constants';
import { Launch, LaunchIndexJson } from '../../types';
import { FormProps } from '../../components/new_launch/LaunchForm';

describe('LaunchDataStore', () => {
  let axiosMock: AxiosMockAdapter;
  let launchDataStore: LaunchDataStore;
  const mockLaunches: Launch[] = [
    { id: "1", rocket: { rocket_name: 'Falcon 1' }, mission_name: "Cobra Kai", launch_date_utc: "", launch_year: "2007", details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    { id: "2", rocket: { rocket_name: 'Falcon 9' }, mission_name: "Eagle Fang", launch_date_utc: "", launch_year: "2008", details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
  ];

  beforeAll(() => {
    axiosMock = new AxiosMockAdapter(axios);
  });

  beforeEach(() => {
    localStorage.clear();
    launchDataStore = new LaunchDataStore();
  });

  afterEach(() => {
    axiosMock.reset();
    localStorage.clear();
  });

  afterAll(() => {
    axiosMock.restore();
  });

  it('should fetch and set launches from API', async () => {
    const responseData: LaunchIndexJson = {
      data: { launches: mockLaunches }
    };

    axiosMock.onGet(ROUTES.api).reply(200, responseData);

    await launchDataStore.getLaunches();

    expect(localStorage.getItem('data')).toBe(JSON.stringify(mockLaunches));
    expect(launchDataStore.launches).toEqual(mockLaunches);
    expect(launchDataStore.launchCount).toBe(mockLaunches.length);
  });

  it('should set launches from localStorage if available', async () => {
    localStorage.setItem('data', JSON.stringify(mockLaunches));

    await launchDataStore.getLaunches();

    expect(launchDataStore.launches).toEqual(mockLaunches);
    expect(launchDataStore.launchCount).toBe(mockLaunches.length);
  });

  it('should return paginated launches', () => {
    launchDataStore.launches = mockLaunches;

    const paginatedLaunches = launchDataStore.getPaginatedLaunches(1, 2);
    expect(paginatedLaunches).toEqual([mockLaunches[1]]);
  });

  it('should add a launch and update localStorage', () => {
    const formData: FormProps = { missionName: 'Test Mission', launchDate: '2024-05-19T00:00:00.000Z', details: 'This is a test mission', rocketName: 'Falcon Heavy', links: 'http://example.com'};
    launchDataStore.launches = mockLaunches;
    launchDataStore.addLaunch(formData);
    const launches = JSON.parse(localStorage.getItem('data') || '')
    expect(launches.length).toBe(3)  
  });

  it('should get unique rocket names', () => {
    launchDataStore.launches = mockLaunches;

    const uniqueRocketNames = launchDataStore.getUniqueRocketNames();
    expect(uniqueRocketNames).toEqual(['Falcon 1', 'Falcon 9']);
  });
});

