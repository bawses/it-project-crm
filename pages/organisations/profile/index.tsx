import { Container, Typography, makeStyles } from "@material-ui/core";
import Image from "next/image";
import DEFAULT_IMAGE from "../../../assets/building-1062.png";
import { useState, useEffect, useCallback } from "react";
import ProfileOptions from "../../../components/buttons/ProfileOptions";
import TextButton from "../../../components/buttons/TextButton";
import ContactDetails from "../../../components/cards/ContactDetails";
import ContactHeader from "../../../components/cards/ContactHeader";
import Layout from "../../../components/navLayout/Layout";
import { useRouter } from "next/router";
import PageLoadingBar from "../../../components/PageLoadingBar";
import { COLORS } from "../../../lib/Colors";
import { IOrganisation } from "../../../lib/DataTypes";

const useStyles = makeStyles((theme) => ({
  containerStyle: {
    width: "80%",
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
  signOut: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2),
    },
  },
}));

export const dummyOrganisation: IOrganisation = {
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

export default function OrgProfile() {
  const classes = useStyles();
  const [profileData, setProfileData] = useState<IOrganisation>();
  const [profileImage, setProfileImage] = useState(
  	DEFAULT_IMAGE
  );
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleSignOut = (e: React.SyntheticEvent) => {
    // setIsLoading(true);
    // signOut();
    console.log("Sign out of this organisation account");
  };

  const fetchProfileDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedData = dummyOrganisation;
      setProfileData(fetchedData);

      // TODO: add profile pic field to organisation data type
    //   if (fetchedData?.imageUrl) {
    //     setProfileImage(fetchedData?.imageUrl);
    //   }

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
      <Container className={classes.containerStyle}>
        <ProfileOptions
          onPressSettings={() => router.push("profile/settings")}
          onPressEdit={() => router.push("profile/edit")}
          isOrganisation={true}
        />
        <div className={classes.primaryDetailsStyle}>
          <Container className={classes.profilePicDiv}>
            <Image
              className={classes.profilePic}
              src={profileImage}
              alt="Profile picture"
              width={400}
              height={400}
            />
          </Container>
          <ContactHeader
            type="organisation"
            firstName={profileData?.name}
            title={profileData?.industry}
            about={profileData?.about}
            showStar={false}
          />
        </div>

        <ContactDetails fieldValues={profileData} />
        <div className={classes.signOut}>
          <TextButton
            color={COLORS.actionOrange}
            textColor={COLORS.white}
            title="Sign Out"
            onClick={handleSignOut}
          />
        </div>
      </Container>
    </Layout>
  );
}
