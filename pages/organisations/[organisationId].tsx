import { Container, Typography, makeStyles, Paper } from "@material-ui/core";
import Image from "next/image";
import DEFAULT_IMAGE from "../../assets/building-1062.png";
import { useState, useEffect, useCallback } from "react";
import ContactDetails from "../../components/cards/ContactDetails";
import ContactHeader from "../../components/cards/ContactHeader";
import Layout from "../../components/navLayout/Layout";
import { useRouter } from "next/router";
import PageLoadingBar from "../../components/PageLoadingBar";
import { OnChangeValue } from "react-select";
import { getSession } from "next-auth/client";
import { IOrganisation } from "../../lib/DataTypes";
import { getOrganisationById } from "../../api_client/OrganisationClient";

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
  responsiveSections: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  hiddenDetails: {
    borderRadius: 10,
    padding: 35,
    marginTop: theme.spacing(),
    [theme.breakpoints.down("xs")]: {
      padding: 30,
    },
  },
  detailsAndNotes: {
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  myTags: {
    margin: theme.spacing(),
    marginTop: 0,
    width: "25%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default function ViewOrgContact() {
  const classes = useStyles();
  const [initialContactData, setInitialContactData] = useState<IOrganisation>();
  const [profileImage, setProfileImage] = useState(
  	DEFAULT_IMAGE
  );
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { organisationId } = router.query;

  const fetchOrganisationDetails = useCallback(async () => {
    if (organisationId && typeof organisationId === "string") {
      try {
        setIsLoading(true);
        const fetchedData = await getOrganisationById(organisationId);
        setInitialContactData(fetchedData);
        // if (fetchedData?.imageUrl) {
        // 	setProfileImage(fetchedData?.imageUrl);
        // }
        console.log(fetchedData);
        setIsLoading(false);
      } catch (e) {
        /** TODO: redirect to error page */
        console.log(e);
        setIsLoading(false);
      }
    }
  }, [organisationId]);

  useEffect(() => {
    console.log("first fetch");
    fetchOrganisationDetails();
  }, [fetchOrganisationDetails]);

  // useEffect(() => {
  // 	getSession().then((session) => {
  // 		if (session) {
  // 			setIsLoading(false);
  // 		} else {
  // 			router.replace("/login");
  // 		}
  // 	});
  // }, [router]);

  return (
    <Layout>
      <Container className={classes.containerStyle}>
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
            firstName={initialContactData?.name}
            title={initialContactData?.industry}
            about={initialContactData?.about}
            showStar={false}
          />
        </div>
        <ContactDetails fieldValues={initialContactData} />
      </Container>
    </Layout>
  );
}
