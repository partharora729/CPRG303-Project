import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [passwordArray, setPasswordArray] = useState([]);
  const [form, setForm] = useState({ site: "", name: "", password: "" });
  const ref = useRef();
  const PasswordRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const ShowPassword = (e) => {
    if (PasswordRef.current.type === "password") {
      PasswordRef.current.type = "text";
      ref.current.src = "icons/eye-open.png";
    } else {
      PasswordRef.current.type = "password";
      ref.current.src = "icons/eye-closed.png";
    }
  };

  const DeletePassword = (id) => {
    let c = confirm("Do you want to delete the password?");
    if (c === true) {
      setPasswordArray(passwordArray.filter(item => item.id !== id));
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
      console.log(passwordArray);
    }
  };

  const EditPassword = (id) => {
    const selectedItem = passwordArray.find(item => item.id === id);
    if (selectedItem) {
      setForm(selectedItem);
    }
  };

  const SavePassword = () => {
    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
    console.log(passwordArray);
    setForm({ site: "", name: "", password: "" });
  };

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    } else {
      setPasswordArray([]);
    }
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-600">
  <p className="text-white text-3xl mb-8">Your own Password Manager</p>
  <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
    <input
      value={form.site}
      onChange={handleChange}
      placeholder="Enter website name"
      className="mb-4 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-300"
      type="text"
      name="site"
    />
    <div className="flex mb-4">
      <input
        value={form.name}
        onChange={handleChange}
        placeholder="Enter username"
        name="name"
        type="text"
        className="flex-1 mr-2 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      />
      <input
        ref={PasswordRef}
        value={form.password}
        onChange={handleChange}
        placeholder="Enter password"
        name="password"
        type="password"
        className="flex-1 ml-2 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
    <button onClick={SavePassword} className="bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300">Add Password</button>
  </div>
</div>

<div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-600">
  <div className="passwords bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl w-full">
    <h2 className="text-white text-center mb-4">Your passwords</h2>
    {passwordArray.length === 0 && (
      <div className="text-white text-center mb-4">No passwords to show.</div>
    )}
    {passwordArray.length > 0 && (
      <table className="table-auto w-full">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="w-1/4 text-center px-4 py-2">Site</th>
            <th className="w-1/4 text-center px-4 py-2">Username</th>
            <th className="w-1/4 text-center px-4 py-2">Password</th>
            <th className="w-1/4 text-center px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {passwordArray.filter(item => item.site || item.name || item.password).map((item, index) => (
            <tr key={index}>
              <td className="text-center px-4 py-2 text-slate-50">{item.site}</td>
              <td className="text-center px-4 py-2 text-slate-50">{item.name}</td>
              <td className="text-center px-4 py-2 text-slate-50">{item.password}</td>
              <td className="text-center px-4 py-2">
                <div className="flex justify-center space-x-2">
                  <button onClick={() => copyText(item.site)} className="bg-blue-500 text-white px-3 py-1 rounded-lg focus:outline-none focus:ring focus:border-blue-300">Copy</button>
                  <button onClick={() => EditPassword(item.id)} className="bg-blue-500 text-white px-3 py-1 rounded-lg focus:outline-none focus:ring focus:border-blue-300">Edit</button>
                  <button onClick={() => DeletePassword(item.id)} className="bg-blue-500 text-white px-3 py-1 rounded-lg focus:outline-none focus:ring focus:border-blue-300">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>







    </>
  );
};

export default Manager;

