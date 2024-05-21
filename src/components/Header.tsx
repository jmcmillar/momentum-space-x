import { ReactComponent as Logo } from '../images/space-x-logo.svg'

export const Header = () => {
  return (
    <header className="bg-gray-300 p-4 sticky top-0 z-20">
      <div className="w-[400px]">
        <Logo title="SpaceX Logo"/>
      </div>
    </header>
  );
};
