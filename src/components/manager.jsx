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
    let c = confirm("Do you want to delete the password?")
    if (c == true) {
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id: uuidv4()}]));
    console.log(passwordArray);
    }
  };
  const EditPassword = (id) => {
    setForm(passwordArray.filter(i=>i.id==id[0]))
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
  };
  const SavePassword = () => {
    setPasswordArray([...passwordArray, {...form,id: uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id: uuidv4()}]));
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
    toast('Copied To Clipboard', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <div>
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <p>Your own password Manager</p>
        <div className="container bg-slate-50 mycontainer">
          <div className="text-white flex flex-col p-4">
            <input
              value={form.site}
              onChange={handleChange}
              placeholder="enter website name"
              className="rounded-full"
              type="text"
              name="site"
              id=""
            />
            <div className="flex">
              <input
                value={form.name}
                onChange={handleChange}
                placeholder="enter username"
                name="name"
                type="text"
              />
              <input
                ref={PasswordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="enter password"
                name="password"
                type="password"
              />
            </div>
          </div>
        </div>
        <button onClick={SavePassword}>Add Password</button>
      </div>
      <lord-icon
        src="https://cdn.lordicon.com/gjlgchju.json"
        trigger="hover"
      ></lord-icon>
      <div className="passwords">
        <h2>Your passwords</h2>
        {passwordArray.length === 0 && <div>Now Passwords to show.</div>}
        <table className="table-auto w-full">
          <thead className=" bg-green-800 text-white">
            <tr>
              <th>Site</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {passwordArray.map((item, index) => (
              <tr key={index}>
                <td className="text-center">
                  <a href={item.site} target="_blank" rel="noopener noreferrer">
                    {item.site}
                  </a>
                  <div
                    onClick={() => {
                      copyText(item.site);
                    }}
                  >
                    copy
                  </div>
                </td>
                <td className="text-center">{item.name}</td>
                <td className="text-center">{item.password}</td>
                <span onClick={()=>{DeletePassword(item.id)}}>delete</span>
                <span onClick={()=>{EditPassword(item.id)}}>Edit</span>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Manager;
