import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import { createUser } from "../../lib/auth";

import { TextField, Grid, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { COLORS } from '../../src/colors';


const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
};

const useStyles = makeStyles({
  h1: {
    position: "relative",
    left: "56%",
    right: "11.5%"
  },

  btn: {
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
    height: '65vh', 
    maxWidth: 600, 
    margin: "10px auto", 
    position: "absolute",
    left: "50%",
    right: "11.5%",
    bottom: "15%"
  },

  textbox: {
    margin: "10px auto"
  }

});

export default function SignUpPage() {
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
		return <p>Loading...</p>;
	}

	return (
		<main>
			<>
				<h1>You are not signed in</h1> <br />
				<input
					name="firstName"
					type="name"
					placeholder="First Name"
					onChange={handleInput}
				/>
				<input
					name="lastName"
					type="name"
					placeholder="Last Name"
					onChange={handleInput}
				/>
				<input
					name="email"
					type="email"
					onChange={handleInput}
					placeholder="example@email.com"
				/>
				<input name="password" type="password" onChange={handleInput} />
				<button onClick={handleSubmit}>Sign Up</button>
			</>
		</main>
	);
}

