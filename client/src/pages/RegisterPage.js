import { useState } from "react";
import { registerUser } from "../services/authService";

export default function RegisterPage() {
  const [form, setForm] = useState({ name:"", email:"", password:"" });

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser(form);
    window.location.href = "/tasks";
  };

  return (
    <form onSubmit={submitHandler}>
      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
      <button>Register</button>
    </form>
  );
}
