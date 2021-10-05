import {
	Avatar,
	Typography,
	TableRow,
	TableCell,
	IconButton,
	useMediaQuery,
	Button,
	CircularProgress,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import DEFAULT_IMAGE from "../../assets/blank-profile-picture-973460_640.png";
import StarsIcon from "@material-ui/icons/Stars";
import { COLORS } from "../../lib/Colors";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import TextButton from "../buttons/TextButton";
import Link from "next/link";
import { IContact } from "../../lib/UnifiedDataType";

export interface ContactsTableRowProps {
	contact: IContact;
	starVariant?: {
		handleStar: (
			target: IContact,
			rowSetter: (isLoading: boolean) => void
		) => Promise<boolean>;
	};
	addVariant?: {
		handleContactAdd: (
			target: IContact,
			rowSetter: (isLoading: boolean) => void
		) => Promise<boolean>;
	};
}

const useStyles = makeStyles({
	row: {
		"&:hover": {
			cursor: "pointer",
		},
	},

	circularProgress: {
		marginLeft: 0,
		marginRight: 4,
	},
});

export default function ContactsTableRow({
	contact,
	starVariant,
	addVariant,
}: ContactsTableRowProps) {
	const [loading, setLoading] = useState<boolean>(false);

	const classes = useStyles();

	// Adjust component based on screen size
	const theme = useTheme();
	const bigScreen = useMediaQuery(theme.breakpoints.up("md"));

	let buttonComponent: JSX.Element;
	if (starVariant) {
		// Star variant row
		// Determine colour for star variant
		let starColor = COLORS.inactiveGrey;
		if (contact.starred) {
			starColor = COLORS.starredYellow;
		}

		buttonComponent = (
			<IconButton
				onClick={(event) => {
					event.stopPropagation();
					starVariant.handleStar(contact, setLoading);
				}}
			>
				<StarsIcon htmlColor={starColor} />
			</IconButton>
		);
	} else if (addVariant) {
		// Search variant row
		if (loading) {
			// Render a loading button
			buttonComponent = (
				<TableCell width="20%" align="center">
					<Button variant="contained" disabled={true}>
						<CircularProgress className={classes.circularProgress} size={20} />
						Loading
					</Button>
				</TableCell>
			);
		} else {
			// Determine text and status for add variant
			let btnTitle = "Add";
			let btnIsDisabled = false;
			if (contact.isManualContact) {
				btnTitle = bigScreen ? "Manual Contact" : "Manual";
				btnIsDisabled = true;
			} else if (contact.isAddedContact) {
				btnTitle = "Added";
				btnIsDisabled = true;
			}

			buttonComponent = (
				<TableCell width="20%" align="center">
					<TextButton
						disabled={btnIsDisabled}
						color={COLORS.actionOrange}
						textColor={COLORS.white}
						onClick={(event) => {
							event.stopPropagation();
							addVariant?.handleContactAdd(contact, setLoading);
						}}
						title={btnTitle}
					/>
				</TableCell>
			);
		}
	} else {
		buttonComponent = <></>
	}

	const name = contact.name.firstName + " " + contact.name.lastName;
	const image = contact.imageUrl || DEFAULT_IMAGE.src;
	const nameComponent = (
		<Typography component="p" style={{ fontWeight: 600 }}>
			{name}
		</Typography>
	);
	const roleComponent = <Typography component="p">{contact.job}</Typography>;

	return (
		<Link
			href={`contacts/${contact.isManualContact ? "manual/" : ""}${contact._id
				}`}
			passHref
		>
			<TableRow className={classes.row} hover={true}>
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
				{buttonComponent}
			</TableRow>
		</Link>
	);
}
