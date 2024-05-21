import { NavLink } from "react-router-dom";
import clsx from 'clsx';

export function Tabs() {
  return (
    <div className="flex space-x-1 my-4" aria-label="Tabs" role="tablist">
      <NavLink
        to="/"
        className={({ isActive }) =>
          clsx(
            "font-sans text-xs font-bold text-center text-gray-900 uppercase px-3 py-2",
            {"bg-gray-900/10": isActive}
        )}
      >
        Home
      </NavLink>
      <NavLink
        to="/new-launch"
        className={({ isActive }) =>
        clsx(
          "font-sans text-xs font-bold text-center text-gray-900 uppercase px-3 py-2",
          {"bg-gray-900/10": isActive}
      )}
      >
        Create Launch
      </NavLink>
    </div>
  )
}
