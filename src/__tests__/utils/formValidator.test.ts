import { isRequired } from '../../utils/formValidator'
import { isValidUrl } from '../../utils/formValidator'
import { formValidator } from '../../utils/formValidator'

describe('isRequired', () => {
  it('test isRequired returns error when value is null', () => {
    const result = isRequired("missionName", '');

    expect(result).toEqual({ "missionName": "This field is required" });
  });
  it('test isRequired returns error when value is empty string', () => {
    const result = isRequired("missionName", '');

    expect(result).toEqual({ "missionName": "This field is required" });
  });

  it('test isRequired returns null when value is not null or empty string', () => {
    const result = isRequired("missionName", "Test Mission");

    expect(result).toEqual(null);
  });
});

describe('isValidUrl', () => {
  it('test isValidUrl returns error when value is not a valid URL', () => {
    const result = isValidUrl("links", "example.com");

    expect(result).toEqual({ "links": "This field must be a valid URL" });
  });

  it('test isValidUrl returns null when value is a valid URL', () => {
    const result = isValidUrl("links", "http://example.com");

    expect(result).toEqual(null);
  });
});

describe('formValidator', () => {
  it('test formValidator returns error when required field is empty', () => {
    const formData = { missionName: "", launchDate: "2024-05-19T00:00:00.000Z", links: "http://example.com" };
    const validateMap = { missionName: "required", launchDate: "required", links: "isValidUrl"};

    const result = formValidator(formData, validateMap);

    expect(result).toEqual({ 
      missionName: "This field is required",
    });
  });

  it('test formValidator returns error when URL is invalid', () => {
    const formData = { missionName: "Test Mission", launchDate: "2024-05-19T00:00:00.000Z", links: "example.com" };
    const validateMap = { "missionName": "required", "launchDate": "required", "links": "isValidUrl" };

    const result = formValidator(formData, validateMap);

    expect(result).toEqual({
      links: "This field must be a valid URL"
    });
  });

  it('test formValidator returns null when all fields are valid', () => {
    const formData = { missionName: "Test Mission", launchDate: "2024-05-19T00:00:00.000Z", links: "http://example.com" };
    const validateMap = { missionName: "required", launchDate: "required", links: "isValidUrl" };

    const result = formValidator(formData, validateMap);

    expect(result).toEqual({});
  });
});
