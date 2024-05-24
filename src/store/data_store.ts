import axios from "axios";
import { Launch, LaunchIndexJson } from "../types";
import { ROUTES } from "../constants";

export class LaunchDataStore {
  private launches: Launch[] = [];
  public loading: boolean = false;

  constructor() {
    this.fetchLaunches();
    this.launches = JSON.parse(localStorage.getItem('data') || '[]');
  }

  public async fetchLaunches(): Promise<void> {
    if (!!localStorage.getItem('data')) return;
    try {
      this.loading = true;
      const response = await axios.get<LaunchIndexJson>(ROUTES.api);
      localStorage.setItem('data', JSON.stringify(response.data.data.launches));
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  public getPaginatedLaunches(pageSize: number, currentPage: number): Launch[] {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.launches.slice(startIndex, endIndex)
  }

  public getLaunch(id: string | undefined): Launch | undefined {
    if (!id) return;
    return this.launches.find((launch) => launch.id === id);
  }

  public prependLaunch(launch: Launch): void {
    this.launches.unshift(launch);
  }
}
