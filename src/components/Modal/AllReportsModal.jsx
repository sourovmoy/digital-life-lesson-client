import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React from "react";

const AllReportsModal = ({ report, isOpen, closeModal, handleDelete }) => {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-black"
              >
                All Reports Reasons
              </DialogTitle>
              <div className="my-5 flex flex-col gap-3">
                {report?.reports ? (
                  report?.reports.map((r, idx) => (
                    <strong
                      className="shadow-2xl rounded-xl bg-base-200 w-full p-3"
                      key={idx}
                    >
                      {r?.reason}
                    </strong>
                  ))
                ) : (
                  <p>No reasons available</p>
                )}
              </div>
              <form>
                <div className="flex mt-2 justify-around">
                  <button
                    onClick={handleDelete}
                    type="button"
                    className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AllReportsModal;
