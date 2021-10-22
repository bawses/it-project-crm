/*
 * Login Page that redirects to Home/Contacts Page
 */
import { useRouter } from "next/router";
import Link from "next/link";
import { getSession, signIn } from "next-auth/client";
import React, { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { Typography, TextField, Grid, Paper, Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { COLORS } from "../../lib/Colors";
import PageLoadingBar from "../../components/PageLoadingBar";
import AuthButton from "../../components/buttons/AuthButton";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},

		btn: {
			color: COLORS.white,
			backgroundColor: COLORS.primaryBlue,
			"&:hover": {
				backgroundColor: "#EE6C4D",
			},
			maxWidth: 600,
			paddingTop: theme.spacing(1),
			height: "50px",
			marginTop: theme.spacing(1.5),
		},

		googleBtn: {
			color: COLORS.black,
			backgroundColor: COLORS.white,
			maxWidth: 600,
			paddingTop: theme.spacing(1),
			height: "50px",
			marginTop: theme.spacing(1.5),
		},

		logobox: {
			[theme.breakpoints.down("sm")]: {
				paddingTop: theme.spacing(2),
				marginTop: theme.spacing(3),
			},
			[theme.breakpoints.up("md")]: {
				marginLeft: theme.spacing(3),
			},
		},

		logo: {
			color: COLORS.actionOrange,
			fontWeight: "bold",
		},

		formTitle: {
			[theme.breakpoints.down("sm")]: {
				paddingTop: 20,
				marginLeft: "2%",
			},
			[theme.breakpoints.between("md", "lg")]: {
				paddingTop: "5%",
			},
			[theme.breakpoints.up("xl")]: {
				paddingTop: "40%",
			},
		},

		formSubheading: {
			color: COLORS.primaryBlueDark,
			paddingBottom: 10,
			[theme.breakpoints.down("sm")]: {
				marginLeft: "2%",
			},
		},

		paper: {
			[theme.breakpoints.down("sm")]: {
				minHeight: 380,
			},
			minHeight: 340,
			minWidth: theme.breakpoints.values.xs,
			maxWidth: 500,
			padding: theme.spacing(4),
			marginBottom: theme.spacing(1),
			color: COLORS.black,
		},

		form: {
			paddingTop: "5%",
			paddingBottom: "5%",
			[theme.breakpoints.up("md")]: {
				marginLeft: "-10%",
				paddingTop: "5%",
			},
		},

		textbox: {
			[theme.breakpoints.down("sm")]: {
				margin: "6px auto",
			},
			[theme.breakpoints.up("md")]: {
				margin: "8px auto",
			},
			backgroundColor: COLORS.white,
		},

		links: {
			paddingTop: "1rem",
			marginTop: "10px auto",
		},
	})
);

export default function LoginPage() {
	const classes = useStyles();
	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

	const [showError, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (
		e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) => {
		e.preventDefault();

		const result = await signIn("credentials", {
			redirect: false,
			email: email,
			password: password,
			userType: "User",
		});

		if (result?.error) {
			console.log(result.error);
			setError("Invalid User Credentials Entered");
		} else {
			router.replace("/contacts");
		}
	};

	useEffect(() => {
		getSession().then((session) => {
			if (session) {
				// redirect to home page (contacts list)
				router.replace("/profile");
			} else {
				setIsLoading(false);
			}
		});
	}, [router]);

	if (isLoading) {
		return <PageLoadingBar />;
	}

	return (
		<main>
			<Grid
				container
				direction={isSmall ? "column" : "row"}
				justifyContent="center"
				alignItems="center"
			>
				<Grid
					item
					xs={12}
					sm={12}
					md={6}
					style={isSmall ? { textAlign: "center" } : { textAlign: "left" }}
				>
					<div className={classes.logobox}>
						<Typography variant="h5" component="h5">
							Stay connected with
						</Typography>
						<div className={classes.logo}>
							<Typography variant="h3" component="h3">
								CataLog
							</Typography>
						</div>
					</div>
				</Grid>

				{/* <Grid item xs={12} sm = {12} md = {6}>  */}
				<div className={classes.form}>
					{isSmall ? (
						<Typography
							variant="h5"
							component="h5"
							className={classes.formTitle}
						>
							Log in to your personal CRM
						</Typography>
					) : (
						<Typography
							variant="h4"
							component="h4"
							className={classes.formTitle}
						>
							Welcome back to your CRM
						</Typography>
					)}
					<Typography className={classes.formSubheading}>
						Personal and Organisation Login
					</Typography>
					<Paper className={classes.paper}>
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
						<AuthButton
							onClick={handleSubmit}
							className={classes.btn}
							title="Log In"
						/>
						<AuthButton
							onClick={() => signIn("google", { callbackUrl: "/profile" })}
							className={classes.googleBtn}
							authMethod="google"
							title="Sign In With Google"
						/>
						<h4 style={{ margin: "0%", color: "red" }}>{showError}</h4>
						<div className={classes.links}>
							<Typography component="p">
								Don&apos;t have an account yet?
							</Typography>
							<Typography component="p">
								<Link href="/signup">Sign Up as an Individual</Link> |{" "}
								<Link href="/signup">Sign Up as an Organisation</Link>
							</Typography>
						</div>
					</Paper>
				</div>
			</Grid>
		</main>
	);
}
