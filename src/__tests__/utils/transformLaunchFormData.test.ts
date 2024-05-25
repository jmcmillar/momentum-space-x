import { transformLaunchFormData } from '../../utils/transformLaunchFormData'
import { FormProps } from '../../components/new_launch/LaunchForm'

const mockFormData: FormProps = {
  missionName: 'Test Mission',
  launchDate: '2024-05-19T00:00:00.000Z',
  details: 'This is a test mission',
  rocketName: 'Test Rocket',
  links: 'http://example.com'
};

describe('transformLaunchFormData', () => {
  it('should transform form data mission name', () => {
    const result = transformLaunchFormData(mockFormData);

    expect(result.mission_name).toBe("Test Mission");
  });

  it('should transform form data launch year', () => {
    const result = transformLaunchFormData(mockFormData);

    expect(result.launch_year).toEqual("2024");
  });

  it('should transform form data launch date', () => {
    const result = transformLaunchFormData(mockFormData);

    expect(result.launch_date_utc).toEqual("2024-05-19T00:00:00.000Z");
  });

  it('should transform form data details', () => {
    const result = transformLaunchFormData(mockFormData);

    expect(result.details).toEqual("This is a test mission");
  });

  it('should transform form data rocket name', () => {
    const result = transformLaunchFormData(mockFormData);

    expect(result.rocket?.rocket_name).toEqual("Test Rocket");
  });

  it('should transform form data links', () => {
    const result = transformLaunchFormData(mockFormData);

    expect(result.links?.article_link).toEqual("http://example.com");
  });
});
