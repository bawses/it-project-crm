import { useRouter } from "next/router";
import Link from "next/link";
import { getSession } from "next-auth/client";
import React, { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import { createUser } from "../../lib/auth";

import { Typography, TextField, Grid, Paper, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { COLORS } from '../../src/colors';




const useStyles =  makeStyles((theme: Theme) =>
  createStyles({
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
      top: "15%",
    },

    btn: {
      color: COLORS.white,
      backgroundColor: COLORS.primaryBlue,
      '&:hover': {
        backgroundColor: COLORS.actionOrange
      },
      maxWidth: 600,  
      height:'50px', 
      margin: "10px auto"
    },

    paper: {
      padding: 28, 
      minHeight: 380,
      maxHeight: 380,  
      maxWidth: 600, 
      marginTop: "10px", 
      marginBottom: "15px auto",
      backgroundColor: COLORS.lightGrey
    },

    logo : {
      marginTop: "60px", 
      marginBottom: "10px",
      paddingLeft: "80px"
    },

    textbox: {
      margin: "5px auto",
      backgroundColor: COLORS.white
    },

    halfTextbox: {
      margin: "5px auto",
      backgroundColor: COLORS.white
    },

    links : {
      paddingTop: "1rem",
      marginTop: "10px auto",
    }

  }),
);


const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
  confirmPassword: ""
};

export default function SignUpPage() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [userState, setUserState] = useState(initialState);

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		setUserState({ ...userState, [e.target.name]: e.target.value });
	};

	const handleSubmit = (
		e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) => {
		
    // make sure password is the same as confirm password
    if (userState.password !== userState.confirmPassword) {
      alert("Passwords are not identical. Try again.");
      setUserState({
        firstName: userState.firstName,
        lastName: userState.lastName,
        email: userState.email,
        password: "",
        confirmPassword: "",
      });
      return;
    }

    e.preventDefault();

    // make sure all fields on Sign Up form are nonempty
    const fields = Object.values(userState);
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].trim() === "") {
        alert("Please make sure you have filled in all fields.");
        return;
      }
    }

		createUser(
			{ firstName: userState.firstName, lastName: userState.lastName },
			userState.email,
			userState.password
		)
			.then((res) => {
				console.log(res);
				router.replace("/profile");
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
      <div>
        <LinearProgress color="secondary"/>
        <LinearProgress color="secondary"/>
        <LinearProgress color="secondary"/>
        <LinearProgress color="secondary" />
      </div>
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
          <Typography variant="h4" component="h4">Sign Up</Typography>
          <Paper className = {classes.paper}>
            <Grid container spacing = {2} >
              <Grid item xs >
                <TextField
                  onChange={handleInput}
                  size="small" 
                  variant="outlined"
                  className={classes.halfTextbox}
                  name="firstName"
                  type="name"
                  placeholder="First Name"
                />
              </Grid>
              <Grid item xs>
                <TextField
                  onChange={handleInput}
                  size="small" 
                  variant="outlined"
                  className={classes.halfTextbox}
                  name="lastName"
                  type="name"
                  placeholder="Last Name"
                />
              </Grid>
            </Grid>
              <Grid item xs>
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
              </Grid>
              <TextField
                  onChange={handleInput}
                  fullWidth 
                  size="small" 
                  variant="outlined"
                  className={classes.textbox}
                  name="password" 
                  type="password"
                  placeholder="Enter Password"
                />
  
              <Grid item xs>
                <TextField 
                  onChange={handleInput} 
                  fullWidth 
                  size="small" 
                  variant="outlined"
                  className={classes.textbox}
                  name="confirmPassword" 
                  type="password"
                  placeholder="Confirm Password"
                />
              </Grid>
            <Button 
              onClick={handleSubmit}
              fullWidth
              variant="contained" 
              className = {classes.btn} 
              style={{ position: "relative", top: "5px", bottom: "5px", textTransform: 'none'}}
            >
              Sign Up
            </Button>
            <div className={classes.links}>
              <div>
                <Typography component="p"> 
                  Already have an account? &nbsp;&nbsp;
                  <Link href="/login">Log In</Link>
                </Typography>
                
              </div>
              <div>
              <Typography component="p"> 
                <Link href="/login">Sign Up as an Organisation</Link>
              </Typography>
                
              </div>
            </div>
           
          </Paper>
        </div>
        </div>

    </main>
  );
}

