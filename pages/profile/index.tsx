import { Container, Typography, makeStyles } from "@material-ui/core";
import Image from "next/image";
import DEFAULT_IMAGE from "../../assets/blank-profile-picture-973460_640.png";
import { useState, useEffect, useCallback, useRef } from "react";
import ProfileOptions from "../../components/buttons/ProfileOptions";
import ContactDetails from "../../components/cards/ContactDetails";
import ContactHeader from "../../components/cards/ContactHeader";
import { updateUser } from "../../api_client/UserQueries";
import Layout from "../../components/navLayout/Layout";
import { useRouter } from "next/router";
import PageLoadingBar from "../../components/PageLoadingBar";
import { OnChangeValue } from "react-select";
import { getSession } from "next-auth/client";
import { IUser } from "../../lib/DataTypes";

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
  primaryDetailsStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  profilePicDiv: {
    width: "20%",
    margin: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "30%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "50%",
    },
  },
  profilePic: {
    borderRadius: "50%",
  },
  detailsAndNotes: {
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [fieldValues, setFieldValues] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchProfileDetails = useCallback(async () => {}, []);

  useEffect(() => {
    fetchProfileDetails();
  }, [fetchProfileDetails]);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setIsLoading(false);
      } else {
        router.replace("/login");
      }
    });
  }, [router]);

  if (isLoading) {
    return <PageLoadingBar />;
  }

  return (
    <Layout>
      <Container className={classes.containerStyle}>
        <ProfileOptions
          onPressSettings={() => router.push("/profile/settings")}
        />
        <div className={classes.primaryDetailsStyle}>
          <Container className={classes.profilePicDiv}>
            <Image
              className={classes.profilePic}
              src={DEFAULT_IMAGE}
              alt="Profile picture"
            />
          </Container>
          <ContactHeader
            firstName={fieldValues?.name.firstName}
            lastName={fieldValues?.name.lastName}
            title={fieldValues?.job}
            primaryOrg={
              fieldValues?.organisations &&
              fieldValues?.organisations.length > 0
                ? fieldValues?.organisations[0]
                : ""
            }
            secondaryOrg={
              fieldValues?.organisations &&
              fieldValues?.organisations.length > 1
                ? fieldValues?.organisations[1]
                : ""
            }
            showStar={false}
          />
        </div>

        <div className={classes.detailsAndNotes}>
          <ContactDetails fieldValues={fieldValues} />
        </div>
      </Container>
    </Layout>
  );
}
