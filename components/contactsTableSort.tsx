import { Box, Button, ClickAwayListener, MenuList, Popper, Paper } from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { MouseEvent, useState } from "react";
import { useRef } from "react";
import DropDownMenuItem from "./dropDownMenuItem";

export default function ContactsTableSort() {
  const [open, setOpen] = useState(false)
  const [display, setDisplay] = useState("Select sort option")
  const anchorRef = useRef<HTMLButtonElement>(null)

  // Added to the start of all options when selected
  const initString = "Sort by "

  function handleClose(event: MouseEvent<EventTarget>) {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      // Use did not click away, do nothing
      return
    }

    // User clicked away, close the Popper menu
    setOpen(false)
  }

  function handleMenuClick(text: string, event: MouseEvent<EventTarget>) {
    setDisplay(initString + text)
    handleClose(event)
  }

  return (
    <Box display="flex" flexGrow={1} justifyContent="flex-end">
      <Button variant="outlined" onClick={() => setOpen(!open)} ref={anchorRef}>{display} <ArrowDropDownIcon /></Button>
      <Popper open={open} anchorEl={anchorRef.current}>
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList>
              <DropDownMenuItem text="ABC" onClick={handleMenuClick} />
              <DropDownMenuItem text="DEF" onClick={handleMenuClick} />
              <DropDownMenuItem text="GHI" onClick={handleMenuClick} />
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </Box>
  )
}