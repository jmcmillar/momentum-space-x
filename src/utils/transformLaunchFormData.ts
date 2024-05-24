import { format } from "date-fns";
import { FormProps } from "../hooks/useForm";
import { Launch } from "../types/Launch";
import { v4 as uuidv4 } from 'uuid';

export const transformLaunchFormData = ({missionName, launchDate, details, rocketName, links}: FormProps) => {
  const isoLaunchDate = (new Date(launchDate)).toISOString();
  const launchYear = format(isoLaunchDate, 'yyyy');

  const transformedData: Launch = {
    id: uuidv4(),
    mission_name: missionName,
    launch_year: launchYear,
    launch_date_utc: isoLaunchDate,
    rocket: { rocket_name: rocketName },
    links: { article_link: links },
    details: details,
  };

  return transformedData;
}
