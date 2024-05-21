interface Props {
  title: string;
}

export const TitleBar = ({title}: Props) => {
  return (
    <div className="bg-gray-900 p-4">
      <h1 className="text-white text-2xl">{title}</h1>
    </div>
  );
}
