import React from "react";
import { Grid, TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

interface InputProps {
  name: string;
  label: string;
  autoFocus: boolean;
  half?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleShowPassword?: (event: React.ChangeEvent<{}>) => void;
  variant?: "outlined" | "standard" | "filled";
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  autoFocus,
  half = false,
  handleChange,
  handleShowPassword,
  variant = "outlined",
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant={variant}
        fullWidth
        label={label}
        autoFocus={autoFocus}
        InputProps={
          name === "password" ? (
            {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {name === "password" ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          ) : (
            <></>
          )
        }
      />
    </Grid>
  );
};
