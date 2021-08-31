import React from "react";
import { Input } from "./Input";
import { Button } from "@material-ui/core";
//import { loginUser } from "../util/mongodb";
import { useState } from "react";

interface Props {}

const initialState = { email: "", password: "" };

export const LoginForm: React.FC<Props> = ({}) => {
  const [formState, setFormState] = useState(initialState);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    //const response = loginUser(formState.email, formState.password);

    //console.log(response);
  };

  return (
    <div>
      <input id="email" onChange={handleInput} type="email" />
      <input id="password" onChange={handleInput} type="password" />
      <Button onClick={handleSubmit}>Log In</Button>
    </div>
  );
};
