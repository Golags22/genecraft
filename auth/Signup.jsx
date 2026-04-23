import React from "react";
import { useNavigate } from "react-router-dom";
import { useSignupForm } from "../../hooks/useSignupForm";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();
  const { formData, handleChange, handleSignup, loading } = useSignupForm("customer");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSignup();
      toast.success("Customer account created!");
      navigate("/users/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" type="password" />
      <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" type="password" />
      <button type="submit" disabled={loading}>Signup</button>
    </form>
  );
}