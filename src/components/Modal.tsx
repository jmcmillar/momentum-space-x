import { PropsWithChildren } from 'react';

export interface Props {
  open: boolean;
  toggleOpen: (arg0: any) => void;
}

export const Modal = ({
  children,
  open,
  toggleOpen
}: PropsWithChildren<Props>) => {

  return (
  <>
    {open && (
      <div
        className="modal-wrapper z-[60] fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center"
        onClick={toggleOpen}
      >
          <div
            className="modal bg-white p-6 rounded-lg shadow-lg w-3/4 h-1/2 overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {children}
          </div>
      </div>
    )}
  </>
)}
