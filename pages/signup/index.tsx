import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import { createUser } from "../../lib/auth";

import { TextField, Grid, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { COLORS } from '../../src/colors';


const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const useStyles = makeStyles({
  h1: {
    position: "relative",
    left: "56%",
    right: "11.5%"
  },

  btn: {
    backgroundColor: COLORS.primaryBlue,
    '&:hover': {
      backgroundColor: '#EE6C4D'
    },
    maxWidth: 600,  
    height:'50px', 
    margin: "10px auto"
  },

  paper: {
    padding: 28, 
    height: '65vh', 
    maxWidth: 600, 
    margin: "10px auto", 
    position: "absolute",
    left: "50%",
    right: "11.5%",
    bottom: "15%"
  },

  textbox: {
    margin: "10px auto"
  }

});

export default function SignUpPage() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [userState, setUserState] = useState(initialState);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserState({ ...userState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    createUser(
      { firstName: userState.firstName, lastName: userState.lastName },
      userState.email,
      userState.password
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return (
      <CircularProgress />
    );
  }

  return (
    <main>
      <>
        <h1>Sign Up</h1> <br />  
        <Paper className = {classes.paper}>
          <TextField
            onChange={handleInput}
            fullWidth 
            size="small" 
            variant="outlined"
            className={classes.textbox}
            name="firstName"
            type="name"
            placeholder="First Name"
          />
          <TextField
            onChange={handleInput}
            fullWidth 
            size="small" 
            variant="outlined"
            className={classes.textbox}
            name="lastName"
            type="name"
            placeholder="Last Name"
          />
          <TextField
            onChange={handleInput}
            fullWidth 
            size="small" 
            variant="outlined"
            className={classes.textbox}
            name="email"
            type="email"
            placeholder="Email"
          />
          <TextField 
            onChange={handleInput} 
            fullWidth 
            size="small" 
            variant="outlined"
            className={classes.textbox}
            name="password" 
            type="password"
            placeholder="Confirm Password"
          />
          <Button 
            onClick={handleSubmit}
            fullWidth
            variant="contained" 
            className = {classes.btn} 
            style={{ position: "relative", top: "5px", bottom: "5px", textTransform: 'none'}}
          >
            Sign Up
          </Button>
        </Paper>
      </>
    </main>
  );
}

