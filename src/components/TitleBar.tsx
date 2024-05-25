interface Props {
  title: string;
}

export const TitleBar = ({title}: Props) => {
  return (
    <div className="bg-gray-900 p-4 sticky top-20 z-10">
      <h1 className="text-white text-2xl uppercase leading-4 font-semibold">{title}</h1>
    </div>
  );
}
