// Sign Up Page that currently redirects to Login Page but should redirect to Home Page

import { useRouter } from "next/router";
import Link from "next/link";
import { getSession } from "next-auth/client";
import React, { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import { userSignUp } from "../../api_client/UserClient";

// styling imports
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
				backgroundColor: COLORS.actionOrange,
			},
			maxWidth: 600,
			height: "50px",
			margin: "10px auto",
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

		paper: {
			minWidth: theme.breakpoints.values.xs,
			maxHeight: 400,
			maxWidth: 600,
			padding: theme.spacing(4),
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1),
			backgroundColor: COLORS.lightGrey,
			color: COLORS.black,
		},

		form: {
			paddingTop: "5%",
			paddingBottom: "5%",
			[theme.breakpoints.up("md")]: {
				marginLeft: "-10%",
				paddingTop: "5%",
			},
			[theme.breakpoints.up("xl")]: {
				paddingTop: "10%",
			},
		},

		textbox: {
			margin: "6px auto",
			[theme.breakpoints.down("sm")]: {
				margin: "7px auto",
			},
			backgroundColor: COLORS.white,
		},

		links: {
			paddingTop: "1rem",
			marginTop: "10px auto",
			paddingBottom: "1rem",
		},
	})
);

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

export default function SignUpPage() {
	const classes = useStyles();
	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

	const [showError, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const [userState, setUserState] = useState(initialState);

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		setUserState({ ...userState, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (
		e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) => {
		// make sure password is the same as confirm password
		if (userState.password !== userState.confirmPassword) {
			setError("Passwords are not identical. Try again.");
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

		try {
			const result = await userSignUp(
				userState.firstName,
				userState.lastName,
				userState.email,
				userState.password
			);
			console.log("Result is");
			console.log(result);
			router.replace("/login");
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getSession().then((session) => {
			console.log(session);
			if (session) {
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
				<div className={classes.form}>
					{isSmall ? (
						<Typography
							variant="h5"
							component="h5"
							className={classes.formTitle}
						>
							Create your personal account
						</Typography>
					) : (
						<Typography variant="h4" component="h4">
							Create your <br /> personal account
						</Typography>
					)}
					<Paper className={classes.paper}>
						<Grid container spacing={2}>
							<Grid item xs>
								<TextField
									onChange={handleInput}
									size="small"
									variant="outlined"
									className={classes.textbox}
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
									className={classes.textbox}
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
						<AuthButton
							onClick={handleSubmit}
							className={classes.btn}
							title="Sign Up"
						/>
						<h4 style={{ margin: "0%", color: "red" }}>{showError}</h4>
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
			</Grid>
		</main>
	);
}
