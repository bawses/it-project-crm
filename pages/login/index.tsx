import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/client";
import { useEffect, useState, ChangeEvent, MouseEvent } from "react";

import CircularProgress from '@material-ui/core/CircularProgress';
import { TextField, Grid, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { COLORS }  from '../../src/colors';

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
    margin: "20px auto"
  },

  paper: {
    padding: 30, 
    height: '50vh', 
    maxWidth: 600, 
    margin: "20px auto", 
    position: "absolute",
    left: "50%",
    right: "11.5%",
    bottom: "25%"
  },

  textbox: {
    margin: "10px auto"
  }

});

export default function LoginPage() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (result?.error) {
      console.log("Invalid User Credentials Entered");
      console.log(result.error);
    } else {
      router.replace("/profile");
    }
  };

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
    // redirect to profile 
    router.replace("/profile");
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
      <h1 className={classes.h1}>Welcome back <br /> to your personal CRM</h1>
      <h1 className={classes.h1}></h1>

      <Paper className = {classes.paper}>
    <Grid item xs={12}>
    <TextField 
      onChange={handleEmail}
      fullWidth 
      name="email" 
      size="small" 
      variant="outlined"
      className={classes.textbox}
      placeholder="example@email.com"
    />
    </Grid>
    <Grid item xs={12}>
      <TextField
      onChange={handlePassword}
      fullWidth 
      name="password"
      size="small"
      type="password"
      variant="outlined"
      className={classes.textbox}
      placeholder="Enter your password here"
      />
    </Grid>
    <Button 
      fullWidth
      onClick={handleSubmit}
      variant="contained" 
      className = {classes.btn} 
      style={{ position: "relative", top: "5px", bottom: "5px"}}
    >
    Log In
    </Button>
      </Paper>
      </>
    </main>
  );
}

