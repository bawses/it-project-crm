/**
 * CataLog Home button that shows on the Navbar
 */
import { Button, Typography } from "@material-ui/core";
import React from "react";
import { COLORS } from "../../lib/Colors";

interface HomeButtonProps {
  color?: string;
  textColor?: string;
  title: string;
  isMobile?: Boolean;
  onClick?:
    | (() => void)
    | ((event: React.SyntheticEvent) => void)
    | ((event: React.SyntheticEvent) => Promise<void>);
  className?: string | undefined;
}

export default function HomeButton({
  textColor = COLORS.white,
  color = COLORS.primaryBlue,
  onClick = () => {},
  isMobile = true,
}: HomeButtonProps) {
  return (
    <Button
      variant="contained"
      style={{
        textTransform: "none",
        backgroundColor: color,
        color: textColor,
        padding: "0px",
      }}
      onClick={onClick}
      disableElevation
    >
      {isMobile ? (
        <Typography variant="h6" component="h6">
          CataLog
        </Typography>
      ) : (
        <Typography variant="h5" component="h5">
          CataLog
        </Typography>
      )}
    </Button>
  );
}
