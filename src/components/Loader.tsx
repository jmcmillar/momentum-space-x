import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Loader = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
      <div className="flex justify-center items-center mt-[50vh]">
        <FontAwesomeIcon icon="circle-notch" spin size="5x" className="text-violet-600" />
      </div>
    </div>
  )
};
