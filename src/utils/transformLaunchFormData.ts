import { format } from "date-fns";
import { FormProps } from "../hooks/useForm";
import { Launch } from "../types/Launch";

export const transformLaunchFormData = ({missionName, launchDate, details, rocketName, links}: FormProps) => {
  const formattedlaunchDate = new Date(launchDate);
  const isoLaunchDate = formattedlaunchDate.toISOString();
  const launchYear = format(formattedlaunchDate, 'yyyy');

  const transformedData: Launch = {
    id: Math.random().toString(),
    mission_name: missionName,
    launch_year: launchYear,
    launch_date_utc: isoLaunchDate,
    rocket: { rocket_name: rocketName },
    links: { article_link: links },
    details: details,
  };

  return transformedData;
}
