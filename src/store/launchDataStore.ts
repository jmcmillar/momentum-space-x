import axios from "axios";
import { Launch, LaunchIndexJson } from "../types";
import { ROUTES } from "../constants";
import { FormProps } from "../components/new_launch/LaunchForm";
import { transformLaunchFormData } from "../utils/transformLaunchFormData";

export class LaunchDataStore {
  public launches: Launch[] = [];
  public launchCount: number = 0;

  constructor() {
    this.getLaunches();
  }

  private setLaunches(launches: Launch[]): void {
    this.launches = launches;
    this.launchCount = launches.length;
  }

  public async getLaunches(): Promise<void> {
    if (localStorage.getItem('data')) {
      const launches = JSON.parse(localStorage.getItem('data') || '');
      this.setLaunches(launches);
      return;
    }

    try {
      const response = await axios.get<LaunchIndexJson>(ROUTES.api);
      localStorage.setItem('data', JSON.stringify(response.data.data.launches));
      this.setLaunches(response.data.data.launches);
    } catch (error) {
      console.error(error);
    }
  }

  public getPaginatedLaunches(pageSize: number, currentPage: number): Launch[] {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.launches.slice(startIndex, endIndex)
  }

  public addLaunch(formData: FormProps): void {
    localStorage.setItem(
      'data',
      JSON.stringify([transformLaunchFormData(formData), ...this.launches])
    )
  }

  public getUniqueRocketNames(): (string | undefined)[] {
    return Array.from(new Set(this.launches.map(launch => launch?.rocket?.rocket_name)));
  }
}
