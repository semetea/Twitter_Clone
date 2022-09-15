import { authService } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React from "react";
import { useState } from "react";

const AuthForm = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <form onSubmit={onSubmit} className="container flex flex-col">
        <div>
          <input
            name="email"
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
            className="authInput"
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChange}
            className="authInput"
          />
        </div>
        <div>
          <input
            type="submit"
            className="authSubmit"
            value={newAccount ? "Create Account" : "Sign In"}
          />
        </div>
        {error && <span className="authError">{error}</span>}
        <span onClick={toggleAccount} className="authSwitch">
          {newAccount ? "Sign In" : "Create Account"}
        </span>
      </form>
    </>
  );
};

export default AuthForm;
