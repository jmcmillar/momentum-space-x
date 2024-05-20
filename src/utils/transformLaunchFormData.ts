import { FormProps } from "../hooks/useForm";
import { Launch } from "../types/Launch";

export const transformLaunchFormData = ({missionName, launchYear, launchDate, details, rocketName, links}: FormProps) => {
  const transformedData: Launch = {
    id: Math.random().toString(),
    mission_name: missionName,
    launch_year: launchYear,
    launch_date_utc: launchDate,
    rocket: { rocket_name: rocketName },
    links: { article_link: links },
    details: details,
  };

  return transformedData;
}
