import { useState } from "react";

interface Props {
  showModal: Boolean;
  setShowModal: () => void;
}

// @ts-ignore
const ExamModal = ({ showModal, setShowModal }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = () => {
    // Handle form submission here
    // For example, you can send the form data to the server
    // and then close the modal
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="relative mx-auto my-6 w-auto max-w-3xl">
            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
              <div className="border-gray-300 flex items-start justify-between rounded-t border-b border-solid p-5 ">
                <h3 className="font=semibold text-3xl">General Info</h3>
                <button
                  className="float-right border-0 bg-transparent text-black"
                  onClick={() => setShowModal(false)}
                >
                  <span className="opacity-7 bg-gray-400 block h-6 w-6 rounded-full py-0 text-xl text-black">
                    x
                  </span>
                </button>
              </div>
              <div className="relative flex-auto p-6">
                <form className="bg-gray-200 w-full rounded px-8 pb-8 pt-6 shadow-md">
                  <label className="mb-1 block text-sm font-bold text-black">
                    First Name
                  </label>
                  <input
                    className="w-full appearance-none rounded border px-1 py-2 text-black shadow"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label className="mb-1 block text-sm font-bold text-black">
                    Last Name
                  </label>
                  <input
                    className="w-full appearance-none rounded border px-1 py-2 text-black shadow"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <label className="mb-1 block text-sm font-bold text-black">
                    Address
                  </label>
                  <input
                    className="w-full appearance-none rounded border px-1 py-2 text-black shadow"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <label className="mb-1 block text-sm font-bold text-black">
                    City
                  </label>
                  <input
                    className="w-full appearance-none rounded border px-1 py-2 text-black shadow"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </form>
              </div>
              <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                <button
                  className="text-red-500 background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase outline-none focus:outline-none"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="mb-1 mr-1 rounded bg-yellow-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none hover:shadow-lg focus:outline-none active:bg-yellow-700"
                  type="button"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExamModal;
