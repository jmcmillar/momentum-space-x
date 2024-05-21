import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
library.add(faCircleNotch);


export const Loader = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
      <div className="flex justify-center items-center mt-[50vh]">
        <FontAwesomeIcon icon={["fas", "circle-notch"]} spin size="5x" className="text-gray-900/30" />
      </div>
    </div>
  )
};
