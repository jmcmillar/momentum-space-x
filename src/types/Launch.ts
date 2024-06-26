export type Rocket = {
  rocket_name: string;
};

export type RocketName = Rocket['rocket_name'];

type Link = {
  article_link: string;
}
  
export interface Launch {
  mission_name: string;
  rocket: Rocket;
  id: string;
  launch_date_utc: string;
  launch_year: string;
  details: string;
  links?: Link;
}
