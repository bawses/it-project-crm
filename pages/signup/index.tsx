import { useRouter } from "next/router";
import Link from "next/link";
import { getSession } from "next-auth/client";
import React, { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import { createUser } from "../../lib/auth";

import { Typography, TextField, Grid, Paper, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { COLORS } from '../../src/colors';


const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
};


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
      // bottom: "20%"
    },

    btn: {
      color: COLORS.white,
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
      minHeight: 380,
      maxHeight: 380,  
      maxWidth: 600, 
      marginTop: "10px", 
      marginBottom: "15px",
    },

    logo : {
      marginTop: "10px", 
      marginBottom: "15px",
      paddingLeft: "100px"
    },

    textbox: {
      margin: "10px auto",
    },

    halfTextbox: {
      margin: "10px auto",
      // paddingLeft: "5px auto",
      // paddingRight: "5px auto",
    },

    links : {
      paddingTop: "1rem",
      marginTop: "10px auto",
    }

  }),
);

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
		e.preventDefault();
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
      <CircularProgress />
    );
  }

  return (
    <main>
      <div className={classes.root}>
        <div className= {classes.pageLeft}>
          <div className= {classes.logo} >
            <Typography variant="h6" component="h6">Stay connected with</Typography>
            <Typography variant="h4" component="h4">CataLog</Typography>
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
              <Grid item xs>
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

