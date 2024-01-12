import { useEffect, useState } from "react";
import ContactList from "./components/ContactList";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [userDetails, setUserDetails] = useState([]);

  const addDetails = () => {
    if (name !== "" && email !== "" && number !== "") {
      const updatedUserDetails = [...userDetails, { name, email, number }];
      setUserDetails(updatedUserDetails);
      localStorage.setItem("user", JSON.stringify(updatedUserDetails));
    }
    setName("");
    setEmail("");
    setNumber("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDetails();
  };

  useEffect(() => {
    const getUserDetails = localStorage.getItem("user");

    if (getUserDetails) {
      setUserDetails(JSON.parse(getUserDetails));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-2xl max-w-md w-full text-center text-gray-700 bg-white p-2 font-semibold mb-4">
        Contact List
      </h1>
      <form
        className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Enter Your Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Enter Your Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="number"
          >
            Enter Your Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </form>
      {userDetails &&
        userDetails.length > 0 &&
        userDetails.map((details, index) => (
          <div
            key={index}
            className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <ContactList
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              details={details}
              index={index}
            />
          </div>
        ))}
    </div>
  );
}

export default App;
