import { LaunchDataStore } from "../store/launchDataStore";
import { RocketName } from "../types";


export const setRocketNameBadgeProps = (name: RocketName) => {
  const colors = ['bg-purple-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-red-200']
  const store = new LaunchDataStore();
  const rocketNames = store.getUniqueRocketNames();

  return {
    name,
    className: colors[rocketNames.indexOf(name) % colors.length]
  }
}
