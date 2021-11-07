import {
	Paper,
	Container,
	Typography,
	makeStyles,
	TextField,
	Button,
} from "@material-ui/core";
import { Business } from "@material-ui/icons";
import Image from "next/image";
import DEFAULT_IMAGE from "../../../assets/building-1062.png";
import React, { useCallback, useEffect, useState } from "react";
import { OnChangeValue } from "react-select";
import EditContactOptions from "../../../components/buttons/EditContactOptions";
import ExtraField from "../../../components/input/ExtraField";
import VerticalFieldPair from "../../../components/input/VerticalFieldPair";
import LocationSelector from "../../../components/input/LocationSelector";
import AddFieldSelector from "../../../components/input/AddFieldSelector";
import Layout from "../../../components/navLayout/Layout";
import PageLoadingBar from "../../../components/PageLoadingBar";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import TextButton from "../../../components/buttons/TextButton";
import { COLORS } from "../../../lib/Colors";
import { IOrganisation } from "../../../lib/DataTypes";
import { IOrganisation_Update } from "../../../lib/DataTypes_Update";
import { updateOrganisation, getOrganisationById } from "../../../api_client/OrganisationClient";
import ErrorMessage, { AlertSeverity } from "../../../components/errors/ErrorMessage";
import { DataType } from "../../../lib/EnumTypes";

const DEFAULT_URL: string =
	"https://res.cloudinary.com/it-project-crm/image/upload/v1633002681/zdt7litmbbxfdvg7gdvx.png";

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
		marginBottom: theme.spacing(),
	},
	primaryDetailsStyle: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: theme.spacing(3),
		[theme.breakpoints.down("md")]: {
			flexDirection: "column",
			alignItems: "center",
		},
	},
	profilePicDiv: {
		display: "flex",
		flexDirection: "column",
		width: "25%",
		margin: theme.spacing(1.5),
		[theme.breakpoints.down("sm")]: {
			width: "36%",
		},
		[theme.breakpoints.down("xs")]: {
			width: "64%",
		},
	},
	inputFields: {
		width: "100%",
	},
	topSpacing: {
		marginTop: theme.spacing(),
	},
	profilePic: {
		borderRadius: "50%",
	},
	responsiveRow: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
			alignItems: "center",
		},
	},
	icon: {
		marginRight: theme.spacing(2),
	},
	iconRow: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	otherDetails: {
		borderRadius: 10,
		padding: theme.spacing(4),
		[theme.breakpoints.down("xs")]: {
			padding: theme.spacing(3),
		},
	},
	uploadImageBtn: {
		backgroundColor: COLORS.primaryBlue,
		color: COLORS.white,
		fontWeight: "bold",
		marginTop: "5px",
		textTransform: "none",
		fontSize: "1rem",
		"&:hover": {
			backgroundColor: COLORS.primaryBlue,
		},
	},
}));

type OrgDetailsType = {
	name: string;
	industry: string;
	primaryEmail: string;
	secondaryEmail: string;
	primaryPhone: string;
	secondaryPhone: string;
	address: string;
	about: string;
};

export type ExtraFieldType = {
	fieldType: string;
	fieldValue: string;
};

export default function EditOrgProfile() {
	const classes = useStyles();
	const [location, setLocation] = useState<OnChangeValue<
		{ value: string; label: string },
		false
	> | null>(null);
	const [fieldValues, setFieldValues] = useState<OrgDetailsType>({
		name: "",
		industry: "",
		primaryEmail: "",
		secondaryEmail: "",
		primaryPhone: "",
		secondaryPhone: "",
		address: "",
		about: "",
	});
	const [extraFields, setExtraFields] = useState<ExtraFieldType[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [profileImage, setProfileImage] = useState("");
	const [imageFile, setImageFile] = useState();
	const [displayError, setDisplayError] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string>()
	const [errorTitle, setErrorTitle] = useState<string>()
	const [errorSeverity, setErrorSeverity] = useState<AlertSeverity>()
	const router = useRouter();

	// On file select (from the pop up)
	const onUploadImage = (event: any) => {
		console.log(event.target.files[0]);
		//console.log(URL.createObjectURL(event.target.files[0]));
		setImageFile(event.target.files[0]);
	};

	const removeProfileImage = () => {
		setProfileImage("");
		setImageFile(undefined);
	};

	const imageUploadForm = () => {
		return (
			<Button
				variant="contained"
				component="label"
				className={classes.uploadImageBtn}
			>
				Upload image
				<input type="file" onChange={onUploadImage} hidden />
			</Button>
		);
	};

	const imageUploadContent = () => {
		let image;
		if (profileImage || imageFile) {
			image = profileImage;
			if (imageFile) {
				image = URL.createObjectURL(imageFile);
			}
			return (
				<>
					<Image
						className={classes.profilePic}
						src={image}
						alt="Uploaded image"
						width={300}
						height={300}
					/>
					<TextButton
						title="Remove"
						onClick={removeProfileImage}
						color={COLORS.actionOrange}
						textColor={COLORS.white}
					/>
				</>
			);
		} else {
			return (
				<>
					<Image
						className={classes.profilePic}
						src={DEFAULT_IMAGE}
						alt="Profile picture"
						width={300}
						height={300}
					/>
					{imageUploadForm()}
				</>
			);
		}
	};

	const fieldCreator = (
		index: number,
		fieldType: string,
		fieldValue: string
	) => {
		return (
			<ExtraField
				key={index.toString()}
				index={index}
				fieldType={fieldType}
				fieldValue={fieldValue}
				handleChange={(event) =>
					handleExtraField(fieldType, event.target.value, index)
				}
				onPressDelete={() => {
					deleteField(index, fieldType);
				}}
			/>
		);
	};

	const extractFieldValues = (fetchedData: IOrganisation) => {
		return {
			name: fetchedData.name ?? "",
			industry: fetchedData.industry ?? "",
			primaryEmail:
				fetchedData.email &&
				fetchedData.email.length > 0 &&
				fetchedData.email[0]
					? fetchedData.email[0]
					: "",
			secondaryEmail:
				fetchedData.email &&
				fetchedData.email.length > 1 &&
				fetchedData.email[1]
					? fetchedData.email[1]
					: "",
			primaryPhone:
				fetchedData.phone &&
				fetchedData.phone.length > 0 &&
				fetchedData.phone[0]
					? fetchedData.phone[0]
					: "",
			secondaryPhone:
				fetchedData.phone &&
				fetchedData.phone.length > 1 &&
				fetchedData.phone[1]
					? fetchedData.phone[1]
					: "",
			address: "",
			about: fetchedData.about ?? "",
		};
	};

	const extractExtraFields = (fetchedData: IOrganisation) => {
		let extraLinks = [];
		if (fetchedData.links?.facebook) {
			extraLinks.push({
				fieldType: "Facebook",
				fieldValue: fetchedData.links?.facebook,
			});
		}
		if (fetchedData.links?.instagram) {
			extraLinks.push({
				fieldType: "Instagram",
				fieldValue: fetchedData.links?.instagram,
			});
		}
		if (fetchedData.links?.linkedIn) {
			extraLinks.push({
				fieldType: "LinkedIn",
				fieldValue: fetchedData.links?.linkedIn,
			});
		}
		if (fetchedData.links?.twitter) {
			extraLinks.push({
				fieldType: "Twitter",
				fieldValue: fetchedData.links?.twitter,
			});
		}
		if (fetchedData.links?.website) {
			extraLinks.push({
				fieldType: "Website",
				fieldValue: fetchedData.links?.website,
			});
		}
		if (fetchedData.links?.other) {
			const otherLinks = fetchedData.links?.other.map((link) => ({
				fieldType: "Other",
				fieldValue: link,
			}));
			extraLinks = [...extraLinks, ...otherLinks];
		}
		return extraLinks;
	};

	const loadProfileData = useCallback(async () => {
		try {
			setIsLoading(true);
			let session = await getSession();
			console.log(session?.user);
			if (session) {
				const fetchedData = await getOrganisationById(session.user.sub);

				console.log(fetchedData);

				if (fetchedData?.imageUrl) {
					setProfileImage(fetchedData?.imageUrl);
				}

				setLocation(
				fetchedData.location
					? { value: fetchedData.location, label: fetchedData.location }
					: null
				);
				const initialFieldValues = extractFieldValues(fetchedData);
				setFieldValues(initialFieldValues);
				const extraLinks = extractExtraFields(fetchedData);
				setExtraFields(extraLinks);
				setIsLoading(false);
			} else {
				throw new Error("Can't get valid session!");
			}
		} catch (e) {
			console.log(e);
			// Display error message
			setErrorMessage("Failed to load organisation profile details - Please try again")
			setErrorTitle(undefined)
			setErrorSeverity(undefined)
			setDisplayError(true)
			setIsLoading(false);
		}
	}, []);

	const formatHyperlink = (link?: string) => {
		if (link) {
			const formattedLink = link.replace(/\s+/g, "");
			if (formattedLink.startsWith("https://")) {
				return formattedLink;
			} else if (formattedLink.startsWith("http://")) {
				return formattedLink.replace("http://", "https://");
			} else {
				return "https://" + formattedLink;
			}
		}
	};

	const formatPairedData = (data: string[]) => {
		if (data.length === 2 && data[0] === "") {
			data[0] = data[1];
			data[1] = "";
		}
		return data;
	};

	const updateProfileDetails = async () => {
		/** TODO: make alert or pop up if missing required fields */
		if (!!fieldValues.name === false) {
			// Display error message
			setErrorMessage("Please enter an organisation name")
			setErrorTitle(undefined)
			setErrorSeverity(undefined)
			setDisplayError(true)
			return;
		}
		/** Remove any extra fields that are empty */
		const finalExtraFields = extraFields.filter(
			(field) => field.fieldValue !== ""
		);
		const detailsToUpdate: IOrganisation_Update = {
			name: fieldValues.name,
			email: formatPairedData([
				fieldValues.primaryEmail,
				fieldValues.secondaryEmail,
			]),
			phone: formatPairedData([
				fieldValues.primaryPhone,
				fieldValues.secondaryPhone,
			]),
			industry: fieldValues.industry,
			location: location ? location.value : "",
			links: {
				facebook: formatHyperlink(
					finalExtraFields.find((field) => field.fieldType === "Facebook")
						?.fieldValue
				),
				linkedIn: formatHyperlink(
					finalExtraFields.find((field) => field.fieldType === "LinkedIn")
						?.fieldValue
				),
				instagram: formatHyperlink(
					finalExtraFields.find((field) => field.fieldType === "Instagram")
						?.fieldValue
				),
				twitter: formatHyperlink(
					finalExtraFields.find((field) => field.fieldType === "Twitter")
						?.fieldValue
				),
				website: formatHyperlink(
					finalExtraFields.find((field) => field.fieldType === "Website")
						?.fieldValue
				),
				other: finalExtraFields
					.filter((field) => field.fieldType === "Other")
					.map((other) => formatHyperlink(other.fieldValue) ?? ""),
			},
			about: fieldValues.about,
		};
		try {
			setIsLoading(true);
			console.log("Updating org details");
			console.log(detailsToUpdate);

			const session = await getSession();
			if (session) {
				console.log(session);
				const updatedOrg = await updateOrganisation(
					session.user.sub,
					detailsToUpdate
				);
				router.replace("/organisations/profile");
				setIsLoading(false);
			} else {
				throw new Error("Can't get valid session!");
			}
		} catch (e: any) {
			console.log(e);
			// Display error message
			setErrorMessage("Failed to update organisation profile - Please try again")
			setErrorTitle(undefined)
			setErrorSeverity(undefined)
			setDisplayError(true)
			setIsLoading(false);
		}
	};

	const deleteField = (index: number, fieldType: string) => {
		const newExtraFields = extraFields.filter((field, i) => i !== index);
		setExtraFields(newExtraFields);
	};

	const handleChange = (fieldType: string, fieldValue: string) => {
		setFieldValues({ ...fieldValues, [fieldType]: fieldValue });
	};

	const handleExtraField = (
		fieldType: string,
		fieldValue: string,
		index: number
	) => {
		const newExtraFields = extraFields.map((field, i) =>
			field.fieldType === fieldType && i === index
				? { fieldType: field.fieldType, fieldValue: fieldValue }
				: field
		);
		setExtraFields(newExtraFields);
	};

	const handleAddedField = (
		value: OnChangeValue<{ value: string; label: string }, false> | null
	) => {
		if (value) {
			// New field selected, so add this text field to page
			setExtraFields([
				...extraFields,
				{ fieldType: value.label, fieldValue: "" },
			]);
		}
	};

	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		updateProfileDetails();
	};

	useEffect(() => {
		getSession().then((session) => {
			if (session && session.user.type == DataType.Organisation) {
				setIsLoading(false);
				loadProfileData();
			} else if (session) {
				router.replace("/profile");
			} else {
				router.replace("/login");
			}
		});
	}, [router,loadProfileData]);

	if (isLoading) {
		return <PageLoadingBar />;
	}

	return (
		<Layout pageType="organisation">
			<Container maxWidth="md" className={classes.containerStyle}>
				<Typography variant="h5" component="h5" className={classes.pageTitle}>
					Edit organisation profile:
				</Typography>
				<form noValidate autoComplete="off" onSubmit={handleSubmit}>
					<div className={classes.primaryDetailsStyle}>
						<Container className={classes.profilePicDiv}>
							{imageUploadContent()}
						</Container>
						<div className={classes.inputFields}>
							<TextField
								size="small"
								variant="filled"
								id="name"
								label="Name"
								fullWidth
								value={fieldValues.name || ""}
								onChange={(event) => handleChange("name", event.target.value)}
								className={classes.topSpacing}
								required={true}
							/>
							<TextField
								size="small"
								variant="filled"
								id="industry"
								label="Industry"
								fullWidth
								value={fieldValues.industry || ""}
								onChange={(event) =>
									handleChange("industry", event.target.value)
								}
								className={classes.topSpacing}
							/>
							<LocationSelector
								selectedLocation={location}
								onChange={(value) => setLocation(value)}
							/>
							<TextField
								multiline={true}
								variant="filled"
								id="about"
								label="About"
								fullWidth
								value={fieldValues.about || ""}
								onChange={(event) => handleChange("about", event.target.value)}
								className={classes.topSpacing}
							/>
						</div>
					</div>
					<Paper
						elevation={3}
						className={`${classes.otherDetails} ${classes.topSpacing}`}
					>
						<div className={classes.responsiveRow}>
							<VerticalFieldPair
								iconType="email"
								topId="primaryEmail"
								topLabel="Primary email"
								topValue={fieldValues.primaryEmail || ""}
								bottomId="secondaryEmail"
								bottomLabel="Secondary email"
								bottomValue={fieldValues.secondaryEmail || ""}
								topOnChange={(event: any) =>
									handleChange("primaryEmail", event.target.value)
								}
								bottomOnChange={(event: any) =>
									handleChange("secondaryEmail", event.target.value)
								}
								topDisabled={true}
							/>
							<VerticalFieldPair
								iconType="phone"
								topId="primaryPhone"
								topLabel="Primary phone"
								topValue={fieldValues.primaryPhone || ""}
								bottomId="secondaryPhone"
								bottomLabel="Secondary phone"
								bottomValue={fieldValues.secondaryPhone || ""}
								topOnChange={(event: any) =>
									handleChange("primaryPhone", event.target.value)
								}
								bottomOnChange={(event: any) =>
									handleChange("secondaryPhone", event.target.value)
								}
							/>
						</div>
						<div className={classes.iconRow}>
							<Business className={classes.icon} />
							<TextField
								size="small"
								variant="filled"
								id="workAddress"
								label="Work address"
								fullWidth
								value={fieldValues.address || ""}
								onChange={(event) =>
									handleChange("address", event.target.value)
								}
								className={classes.topSpacing}
							/>
						</div>
						{extraFields.map((field, index) =>
							fieldCreator(index, field.fieldType, field.fieldValue)
						)}
					</Paper>
					<AddFieldSelector
						onChange={handleAddedField}
						addedFields={extraFields}
					/>
					<EditContactOptions
						onCancel={() => router.back()}
						submitLabel={"Save changes"}
					/>
				</form>
			</Container>
			<ErrorMessage
        		open={displayError}
       			alertMessage={errorMessage}
        		alertTitle={errorTitle}
        		severity={errorSeverity}
				handleClose={() => setDisplayError(false)}
      		/>
		</Layout>
	);
}
