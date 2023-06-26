import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/slices/AuthSlice";

export const SignOut: React.FC = () => {
  const dispatch = useDispatch();

  function handleLogOut() {
    dispatch(signOut());
  }

  return <section className="sign-container">
    <h1>Sign out</h1>
    <p>Are you sure, that you want to sign out?</p>
    <div className="buttons-block">
      <button onClick={handleLogOut}>Yes</button>
    </div>
  </section>;
};
