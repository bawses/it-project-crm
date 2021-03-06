/**
 * Search Result Table row
 */
import {
	Avatar,
	Typography,
	TableRow,
	TableCell,
	useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import DEFAULT_IMAGE from "../../assets/blank-profile-picture-973460_640.png";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { IContact } from "../../lib/UnifiedDataType";
import React from "react";
import { useRouter } from "next/router";

export interface SearchResultRowProps {
	profile: IContact;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		row: {
			"&:hover": {
				cursor: "pointer",
			},
		},
	})
);

export default function SearchResultRow({ profile }: SearchResultRowProps) {
	const classes = useStyles();
	const router = useRouter();

	const image = profile.imageUrl || DEFAULT_IMAGE.src;
	const name = profile.name.firstName + " " + profile.name.lastName;
	const nameComponent = (
		<Typography component="p" style={{ fontWeight: 600 }}>
			{name}
		</Typography>
	);
	const roleComponent = <Typography component="p">{profile.job}</Typography>;

	// Adjust component based on screen size
	const theme = useTheme();
	const bigScreen = useMediaQuery(theme.breakpoints.up("md"));

	const handleClick = () => {
		if (profile.isManualContact) {
			router.push("/contacts/manual/" + profile._id);
		} else {
			router.push("/contacts/" + profile._id);
		}
	};

	return (
		<>
			<TableRow className={classes.row} hover={true} onClick={handleClick}>
				<TableCell>
					<Avatar src={image} />
				</TableCell>
				{bigScreen ? (
					<>
						<TableCell>{nameComponent}</TableCell>
						<TableCell>{roleComponent}</TableCell>
					</>
				) : (
					<TableCell>
						{nameComponent} {roleComponent}
					</TableCell>
				)}
			</TableRow>
		</>
	);
}
