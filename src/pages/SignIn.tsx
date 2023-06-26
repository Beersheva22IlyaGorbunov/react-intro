import React from "react";
import { useDispatch } from "react-redux";
import Input from "../components/common/Input";
import { InputResult } from "../components/common/types";
import { signIn } from "../redux/slices/AuthSlice";
import { AuthRole } from "../redux/types";

export const SignIn: React.FC = () => {
  const dispatch = useDispatch();

  function submitFn(inputText: string):InputResult {
    const role: AuthRole = inputText.toLowerCase().startsWith("admin") ? "admin" : "user"
    dispatch(signIn(role));
    return {
      status: "success",
      message: "Logged in successfully"
    }
  }
  return (
    <section className="sign-container">
      <h1>Sign in</h1>
      <Input placeholder={"Enter username"} submitFn={submitFn} />
    </section>
  )
};
