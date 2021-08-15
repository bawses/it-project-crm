import React from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
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
  type?: string;
  style?: string;
  size?: "medium" | "small";
  rows?: number;
  required?: boolean;
  multiline?: boolean;
  inputStyle?: string;
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  autoFocus,
  half = false,
  handleChange,
  type,
  handleShowPassword,
  variant = "outlined",
  size = "medium",
  style,
  rows = 1,
  required = true,
  multiline = false,
  inputStyle = "",
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        multiline={multiline}
        name={name}
        onChange={handleChange}
        variant={variant}
        required={required}
        fullWidth
        label={label}
        className={style}
        autoFocus={autoFocus}
        rows={rows}
        type={type}
        size={size}
        InputProps={
          name === "password" ? (
            {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              classes: {
                input: inputStyle,
              },
            }
          ) : (
            <></>
          )
        }
      />
    </Grid>
  );
};
