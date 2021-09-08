import { Box, FormControl, InputLabel, Select, MenuItem, makeStyles, createStyles } from "@material-ui/core";
import { ChangeEvent, useState } from "react";

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: "80%"
    }
  })
)

// Different types of sorting available for the table
export enum SortType {
  None = "",
  FirstName = "firstName",
  LastName = "lastName",
  Role = "role"
}

interface ContactsTableSortProps {
  sortValue: SortType,
  handleChange: (event: ChangeEvent<{ value: unknown }>) => void
}

export default function ContactsTableSort({ sortValue, handleChange }: ContactsTableSortProps) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  function handleClose() {
    setOpen(false)
  }

  function handleOpen() {
    setOpen(true)
  }

  return (
    <Box display="flex" flexGrow={1} justifyContent="flex-end">
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="contacts-sort-select">Sort by</InputLabel>
        <Select
          labelId="contacts-sort-select"
          id="contacts-sort-select"
          label="Sort by"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={sortValue}
          onChange={handleChange}
        >
          <MenuItem value={SortType.None}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={SortType.FirstName}>First Name</MenuItem>
          <MenuItem value={SortType.LastName}>Last Name</MenuItem>
          <MenuItem value={SortType.Role}>Role</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}