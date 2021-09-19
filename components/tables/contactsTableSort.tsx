import { Box, FormControl, InputLabel, Select, Menu, MenuItem, makeStyles, createStyles, useMediaQuery, IconButton } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import SortIcon from '@material-ui/icons/Sort';
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
  handleChange: (newSortVal: SortType) => void
}

export default function ContactsTableSort({ sortValue, handleChange }: ContactsTableSortProps) {
  const classes = useStyles()
  const [selectOpen, setSelectOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dropDownOpen = Boolean(anchorEl)

  function handleClose() {
    setSelectOpen(false)
  }

  function handleSelectOpen() {
    setSelectOpen(true)
  }

  function handleDropdownButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
  }

  function handleDropDownMenuClick(sortVal: SortType) {
    setAnchorEl(null)
    handleChange(sortVal)
  }

  let dropDownMenu = (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="contacts-sort-select">Sort by</InputLabel>
      <Select
        labelId="contacts-sort-select"
        id="contacts-sort-select"
        label="Sort by"
        open={selectOpen}
        onClose={handleClose}
        onOpen={handleSelectOpen}
        value={sortValue}
        onChange={(event) => handleChange(event.target.value as SortType)}
      >
        <MenuItem value={SortType.None}>
          <em>None</em>
        </MenuItem>
        <MenuItem value={SortType.FirstName}>First Name</MenuItem>
        <MenuItem value={SortType.LastName}>Last Name</MenuItem>
        <MenuItem value={SortType.Role}>Role</MenuItem>
      </Select>
    </FormControl>
  )

  const theme = useTheme()
  const bigScreen = useMediaQuery(theme.breakpoints.up("md"))

  if (!bigScreen) {
    dropDownMenu = (
      <>
        <IconButton
          id="mobile-dropdown-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={dropDownOpen ? 'true' : undefined}
          onClick={handleDropdownButtonClick}
        >
          <SortIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={dropDownOpen}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'mobile-dropdown-button',
          }}
        >
          <MenuItem onClick={() => handleDropDownMenuClick(SortType.None)}>
            <em>None</em>
          </MenuItem>
          <MenuItem onClick={() => handleDropDownMenuClick(SortType.FirstName)}>First Name</MenuItem>
          <MenuItem onClick={() => handleDropDownMenuClick(SortType.LastName)}>Last Name</MenuItem>
          <MenuItem onClick={() => handleDropDownMenuClick(SortType.Role)}>Role</MenuItem>
        </Menu>
      </>
    )
  }

  return (
    <Box display="flex" flexGrow={1} justifyContent="flex-end">
      {dropDownMenu}
    </Box>
  )
}