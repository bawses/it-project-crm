import { Box, FormControl, InputLabel, Select, MenuItem, makeStyles, createStyles } from "@material-ui/core";
import { ChangeEvent, useState } from "react";

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: "80%"
    }
  })
)

export default function ContactsTableSort() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [sortValue, setSortValue] = useState<string>("")

  function handleClose() {
    setOpen(false)
  }

  function handleOpen() {
    setOpen(true)
  }

  function handleChange(event: ChangeEvent<{ value: unknown }>) {
    setSortValue(event.target.value as string)
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
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="ABC">ABC</MenuItem>
          <MenuItem value="DEF">DEF</MenuItem>
          <MenuItem value="GHI">GHI</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}