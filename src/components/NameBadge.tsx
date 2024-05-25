import clsx from "clsx";

export interface Props {
  name: string;
  className?: string;
}

export const NameBadge = ({ name, className }: Props ) => {
  return (
    <span className={
      clsx(
        "text-xs font-medium me-2 px-2.5 py-0.5 rounded self-center text-gray-600 border-gray-500",
        className
      )
    }>{name}</span>
  );
}
