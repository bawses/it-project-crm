import { Container, Typography, makeStyles } from "@material-ui/core";
import Image from "next/image";
import DEFAULT_IMAGE from "../../assets/blank-profile-picture-973460_640.png";
import { useState, useEffect, useCallback, useRef } from "react";
import MyTags from "../../components/cards/MyTags";
import MyNotes from "../../components/cards/MyNotes";
import ContactDetails from "../../components/cards/ContactDetails";
import ContactOptions from "../../components/buttons/ContactOptions";
import ContactHeader from "../../components/cards/ContactHeader";
import { IContact } from "../../lib/UnifiedDataType";
import { getAllTags } from "../../api_client/UserClient";
import Layout from "../../components/navLayout/Layout";
import { useRouter } from "next/router";
import PageLoadingBar from "../../components/PageLoadingBar";
import { OnChangeValue } from "react-select";
import { getSession } from "next-auth/client";
import {
	getContact,
	deleteContact,
	updateContact,
	removeTagFromContact,
	addTagToContact,
	toggleStarContact,
} from "../../api_client/ContactClient";

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

export default function ViewContact() {
	const classes = useStyles();
	const [initialContactData, setInitialContactData] = useState<IContact>();
	const [profileImage, setProfileImage] = useState(
		"https://res.cloudinary.com/it-project-crm/image/upload/v1633002681/zdt7litmbbxfdvg7gdvx.png"
	);
	const [isLoading, setIsLoading] = useState(true);
	const [notes, setNotes] = useState("");
	const [isEditingNotes, setIsEditingNotes] = useState(false);
	const [editedNotes, setEditedNotes] = useState("");
	const [tags, setTags] = useState<string[]>([]);
	const [tagOptions, setTagOptions] = useState<string[]>([]);
	const [isStarred, setIsStarred] = useState(false);

	const firstUpdate = useRef(true);
	const router = useRouter();
	const { contactId } = router.query;

	const fetchContactDetails = useCallback(async () => {
		if (contactId && typeof contactId === "string") {
			try {
				setIsLoading(true);
				const fetchedData = await getContact(contactId, false);
				setInitialContactData(fetchedData);

				if (fetchedData?.imageUrl) {
					setProfileImage(fetchedData?.imageUrl);
				}

				console.log(fetchedData);
				setNotes(fetchedData.notes ?? "");
				setEditedNotes(fetchedData.notes ?? "");
				setTags(fetchedData.tags ?? []);
				const fetchedTagOptions = await getAllTags();
				setTagOptions(fetchedTagOptions);
				setIsStarred(fetchedData.starred ?? false);
				setIsLoading(false);
			} catch (e) {
				/** TODO: redirect to error page */
				console.log(e);
				setIsLoading(false);
			} finally {
				firstUpdate.current = false;
			}
		}
	}, [contactId]);

	useEffect(() => {
		console.log("first fetch");
		fetchContactDetails();
	}, [fetchContactDetails]);

	const toggleEditingMode = () => {
		setIsEditingNotes(!isEditingNotes);
	};

	const updateContactNotes = useCallback(async () => {
		if (initialContactData) {
			try {
				const updateObject = {
					notes: editedNotes,
				};
				const updatedContact = await updateContact(
					initialContactData,
					updateObject
				);
				console.log(updatedContact);
				setNotes(updatedContact.notes ?? "");
				setEditedNotes(updatedContact.notes ?? "");
			} catch (e) {
				console.log(e);
			}
		}
	}, [initialContactData, editedNotes]);

	const saveEditedNotes = () => {
		if (isEditingNotes) {
			updateContactNotes();
			toggleEditingMode();
		}
	};

	const cancelEditedNotes = () => {
		setEditedNotes(notes);
		if (isEditingNotes) {
			toggleEditingMode();
		}
	};

	const deleteTag = async (toDelete: string) => {
		if (initialContactData) {
			try {
				const updatedContact = await removeTagFromContact(
					initialContactData,
					toDelete
				);
				setTags(updatedContact.tags ?? []);
				console.log("After deleting tag");
				console.log(updatedContact);
				const updatedTagOptions = await getAllTags();
				setTagOptions(updatedTagOptions);
			} catch (e) {
				console.log(e);
			}
		}
	};

	const addTag = async (toAdd: string) => {
		if (initialContactData) {
			try {
				const updatedContact = await addTagToContact(initialContactData, toAdd);
				setTags(updatedContact.tags ?? []);
				console.log("After adding tag");
				console.log(updatedContact);
				const updatedTagOptions = await getAllTags();
				setTagOptions(updatedTagOptions);
			} catch (e) {
				console.log(e);
			}
		}
	};

	const updateStarred = useCallback(async () => {
		if (initialContactData) {
			try {
				const updatedContact = await toggleStarContact(initialContactData);
				console.log(updatedContact);
			} catch (e) {
				console.log(e);
			}
		}
	}, [initialContactData]);

	const removeThisContact = useCallback(async () => {
		if (initialContactData) {
			try {
				setIsLoading(true);
				const updatedContact = await deleteContact(initialContactData);
				console.log(updatedContact);
				setIsLoading(false);
				router.replace("/contacts");
			} catch (e) {
				console.log(e);
				setIsLoading(false);
			}
		}
	}, [initialContactData, router]);

	useEffect(() => {
		if (!firstUpdate.current) {
			console.log("update starred");
			updateStarred();
		}
	}, [isStarred, updateStarred]);

	const handleContactOption = (
		value: OnChangeValue<{ value: string; label: string }, false> | null
	) => {
		if (value && value.value === "remove") {
			removeThisContact();
		}
	};

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
				<ContactOptions
					isAdded={initialContactData?.isAddedContact}
					isManual={false}
					onChange={handleContactOption}
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
						firstName={initialContactData?.name.firstName}
						lastName={initialContactData?.name.lastName}
						title={initialContactData?.job}
						primaryOrg={
							initialContactData?.organisations &&
							initialContactData?.organisations.length > 0
								? initialContactData?.organisations[0]
								: ""
						}
						secondaryOrg={
							initialContactData?.organisations &&
							initialContactData?.organisations.length > 1
								? initialContactData?.organisations[1]
								: ""
						}
						starred={isStarred}
						onStar={() => setIsStarred(!isStarred)}
					/>
				</div>
				{initialContactData?.isAddedContact && (
					<div className={classes.responsiveSections}>
						<div className={classes.detailsAndNotes}>
							<ContactDetails fieldValues={initialContactData} />
							<MyNotes
								isEditingNotes={isEditingNotes}
								toggleEditingMode={toggleEditingMode}
								onChangeEdited={(event: any) =>
									setEditedNotes(event.target.value)
								}
								notes={notes}
								editedNotes={editedNotes}
								saveEditedNotes={saveEditedNotes}
								cancelEditedNotes={cancelEditedNotes}
							/>
						</div>
						<div className={classes.myTags}>
							<MyTags
								tags={tags}
								tagOptions={tagOptions}
								deleteTag={deleteTag}
								addTag={addTag}
							/>
						</div>
					</div>
				)}
			</Container>
		</Layout>
	);
}
