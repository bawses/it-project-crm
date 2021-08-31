import { MenuItem } from "@material-ui/core";
import { MouseEvent } from "react";

interface DropDownMenuItemProps {
  text: string,
  onClick: (text: string, event: MouseEvent<EventTarget>) => void
}

export default function DropDownMenuItem({ text, onClick }: DropDownMenuItemProps) {
  return (
    <MenuItem onClick={(e) => onClick(text, e)}>{text}</MenuItem>
  )
}