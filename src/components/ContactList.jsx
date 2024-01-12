import { useState } from "react";

const ContactList = ({ userDetails, setUserDetails, details, index }) => {
  const [editable, setEditable] = useState(false);

  const editDetails = (index, name, email, number) => {
    setUserDetails(
      userDetails.map((user, userIndex) =>
        userIndex === index ? { ...user, name, email, number } : user
      )
    );

    localStorage.setItem("user", JSON.stringify(userDetails));
  };

  const deleteDetails = (index) => {
    const updatedUserDetails = userDetails.filter((_, i) => i !== index);
    setUserDetails(updatedUserDetails);
    localStorage.setItem("user", JSON.stringify(updatedUserDetails));
  };

  return (
    <div>
      {editable ? (
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={details.name}
            onChange={(e) =>
              editDetails(index, e.target.value, details.email, details.number)
            }
          />
          <input
            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            value={details.email}
            onChange={(e) =>
              editDetails(index, details.name, e.target.value, details.number)
            }
          />
          <input
            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={details.number}
            onChange={(e) =>
              editDetails(index, details.name, details.email, e.target.value)
            }
          />
        </div>
      ) : (
        <div className="mb-4">
          <div className="text-xl font-bold mb-3">{details.name}</div>
          <div className="text-gray-700 mb-3">{details.email}</div>
          <div className="text-gray-700">{details.number}</div>
        </div>
      )}
      <div className="flex justify-between items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setEditable((prev) => !prev)}
        >
          {editable ? "Save" : "Edit"}
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => deleteDetails(index)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactList;
