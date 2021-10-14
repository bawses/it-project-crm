import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../../components/navLayout/Layout";
import TextButton from "../../../components/buttons/TextButton";
import PageLoadingBar from "../../../components/PageLoadingBar";
import {
  Container,
  makeStyles,
  Typography,
  Grid,
  TextField,
} from "@material-ui/core";
import { COLORS } from "../../../lib/Colors";
import { IOrganisation } from "../../../lib/DataTypes";

const useStyles = makeStyles((theme) => ({
  containerStyle: {
    width: "100%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "90%",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(7),
    },
  },
  pageTitle: {
    marginBottom: theme.spacing(2),
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  accountDetails: {
    margin: theme.spacing(3),
  },
  passwordInput: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
  },
  passwordSection: {
    textAlign: "left",
    maxWidth: 500,
    margin: "0 auto",
  },
  logo: {
    color: COLORS.actionOrange,
    fontWeight: "bold",
  },
  submitNewPassword: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
  },
}));

const dummyOrganisation: IOrganisation = {
    _id: "123",
    passwordHash: "passwordhash",
    name: "Sample Organisation",
    email: ["bigcompany@example.com"],
    phone: ["12345"],
    location: "Melbourne, AU",
    links: {
      facebook: "facebook.com",
      instagram: "instagram.com",
    },
    industry: "Software development",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    contacts: [],
  };

export default function OrgSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<IOrganisation>();
  const classes = useStyles();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fetchProfileDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedData = dummyOrganisation;
      setProfileData(fetchedData);
      console.log(fetchedData);
      setIsLoading(false);
    } catch (e) {
      /** TODO: redirect to error page */
      console.log(e);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfileDetails();
  }, [fetchProfileDetails]);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Error! Passwords don't match");
      return;
    }
    console.log("Changing password");
  };

//   useEffect(() => {
//     getSession().then((session) => {
//       if (session) {
//         setIsLoading(false);
//       } else {
//         router.replace("/login");
//       }
//     });
//   }, [router]);

  if (isLoading) {
    return <PageLoadingBar />;
  }

  return (
    <Layout>
      <Container maxWidth="md" className={classes.containerStyle}>
        <Typography variant="h5" component="h2" className={classes.pageTitle}>
          My Organisation Settings
        </Typography>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <div className={classes.logo}>
            <Typography variant="h3" component="h3">
              CataLog
            </Typography>
          </div>
          <div className={classes.accountDetails}>
            <Typography variant="h4" component="h4">
              {profileData?.name}
            </Typography>
            <Typography
              variant="h6"
              component="h6"
              style={{ color: COLORS.textGrey }}
            >
              {profileData?.email[0]}
            </Typography>
          </div>
          <div className={classes.passwordSection}>
            <Typography variant="h6" component="h5">
              Update password
            </Typography>
          </div>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div className={classes.passwordSection}>
              <TextField
                size="small"
                variant="filled"
                id="currentPassword"
                label={"Enter current password"}
                type="password"
                fullWidth
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                className={classes.passwordInput}
              />
              <TextField
                size="small"
                variant="filled"
                id="newPassword"
                label={"Enter new password"}
                type="password"
                fullWidth
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className={classes.passwordInput}
              />
              <TextField
                size="small"
                variant="filled"
                id="confirmNewPassword"
                label={"Confirm new password"}
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className={classes.passwordInput}
              />
            </div>
            <div className={classes.submitNewPassword}>
              <TextButton
                type="submit"
                color={COLORS.actionOrange}
                textColor={COLORS.white}
                title="Change password"
              />
            </div>
          </form>
        </Grid>
        <br />
      </Container>
    </Layout>
  );
}