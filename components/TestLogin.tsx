import React from "react";
import { Input } from "./Input";
import { Button } from "@material-ui/core";
import { loginUser } from "../lib/auth";
import { useState } from "react";

interface Props {}

const initialState = { email: "", password: "" };

export const LoginForm: React.FC<Props> = ({}) => {
  const [formState, setFormState] = useState(initialState);

  const handleInput = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const response = loginUser(formState.email, formState.password);
    setFormState({ email: "", password: "" });
  };

  return (
    <div>
      <Input
        name="email"
        label="Email Address"
        handleChange={handleInput}
        autoFocus
        half
      />
      <Input
        name="password"
        label="Password"
        handleChange={handleInput}
        autoFocus
        half
      />
      <Button onClick={handleSubmit}>Log In</Button>
    </div>
  );
};
