import { useRouter } from "next/router";
import Link from "next/link";
import { getSession, signIn } from "next-auth/client";
import React,{ useEffect, useState, ChangeEvent, MouseEvent } from "react";

import CircularProgress from '@material-ui/core/CircularProgress';
import theme from '../../src/theme';
import { Hidden, Box, Typography, TextField, Grid, Paper, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { COLORS }  from '../../src/colors';


const useStyles = makeStyles((theme: Theme) =>
  createStyles ({
    root: {
      flexGrow: 1,
    },

    btn: {
      color: COLORS.white,
      backgroundColor: COLORS.primaryBlue,
      '&:hover': {
        backgroundColor: '#EE6C4D'
      },
      maxWidth: 600, 
      paddingTop: theme.spacing(1),
      height:'50px', 
      margin: "15px auto"
    },

    paper: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(1),
      color: COLORS.white,
      minWidth: theme.breakpoints.values.xs,
      maxHeight: 340, 
      maxWidth: 600, 
    },

    logobox: {
      [theme.breakpoints.down('sm')]: {
        // backgroundColor: theme.palette.secondary.main,
        paddingTop: theme.spacing(2.5),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        marginLeft: theme.spacing(1),
        backgroundColor: COLORS.primaryBlue,
        color: COLORS.white
      },
      [theme.breakpoints.up('md')]: {
        backgroundColor: COLORS.white,
        paddingTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
      },
    },
    
    welcomeBack : {
        paddingTop: 10,
        paddingBottom:10,
    },

    form : {
      paddingTop:  theme.spacing(3),
      paddingBottom:  theme.spacing(3),
    }, 

    textbox: {
      margin: "8px auto"
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
    // console.log(result);

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
        <Grid 
            container 
            alignItems="center"
            justify="center"
            spacing={0}
        >
            <Grid item xs={12} sm = {12} md = {6} >
                <div className= {classes.logobox}>
                    <Typography variant="h5" component="h5">Stay connected with</Typography>
                    <Typography variant="h3" component="h3">CataLog</Typography>
                </div>
            </Grid>

            <Grid item xs={12} sm = {12} md = {6} justifyContent="center"> 
              <div className= {classes.form}>
                <Hidden mdUp>
                    <Typography variant="h5" component="h5" className= {classes.welcomeBack}>
                      Welcome back <br/> to your personal CRM
                    </Typography>
                </Hidden>
                <Hidden smDown>
                  <Typography variant="h4" component="h4" className= {classes.welcomeBack}>
                    Welcome back <br/> to your personal CRM
                  </Typography>
                </Hidden>
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
            </Grid>
        </Grid>
    </main>
  );
}

