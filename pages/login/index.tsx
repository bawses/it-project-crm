import { useRouter } from "next/router";
import Link from "next/link";
import { getSession, signIn } from "next-auth/client";
import React,{ useEffect, useState, ChangeEvent, MouseEvent } from "react";

import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography, TextField, Grid, Paper, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { COLORS }  from '../../src/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles ({
    root: {
      flexGrow: 1,
    },

    pageLeft: {
      position: "absolute",
      left: "11.5%",
      right: "50%",
      top: "30%",
      bottom: "50%",
    },

    pageRight: {
      position: "absolute",
      left: "50%",
      right: "11.5%",
      top: "15%"
    },

    btn: {
      color: COLORS.white,
      backgroundColor: COLORS.primaryBlue,
      '&:hover': {
        backgroundColor: '#EE6C4D'
      },
      maxWidth: 600,  
      height:'50px', 
      margin: "5px auto"
    },

    paper: {
      padding: 28,
      minHeight: 340,
      maxHeight: 340, 
      maxWidth: 600, 
      marginTop: "10px", 
      marginBottom: "15px auto"
      // position: "absolute",
      // left: "50%",
      // right: "11.5%",
      // bottom: "25%"
    },

    logo : {
      marginTop: "60px", 
      marginBottom: "10px",
      paddingLeft: "80px"
    },

    textbox: {
      margin: "10px auto"
    },

    links: {
      paddingTop: "1rem",
      marginTop: "10px auto",
    }

  }),
);


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
      <div className={classes.root}>
        <div className= {classes.pageLeft}>
            <div className= {classes.logo} >
              <Typography variant="h5" component="h5">Stay connected with</Typography>
              <Typography variant="h3" component="h3">CataLog</Typography>
            </div>
          </div>

          <div className= {classes.pageRight}>
            <Typography variant="h4" component="h4">Welcome back
            <br /> to your personal CRM</Typography>
            <Paper className = {classes.paper}>
              <Grid item xs={12}>
                Email
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
                Password
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
              

              <div className={classes.links}>
                <div>
                  <Typography component="p"> 
                    Don&apos;t have an account yet?
                  </Typography>
                </div>
                <div>
                <Typography component="p"> 
                    <Link href="/signup">Sign Up as an Individual</Link> |  <Link href="/signup">Sign Up as an Organisation</Link>
                </Typography>

                </div>
              </div>

            </Paper>
            </div>
      </div>
    </main>
  );
}

