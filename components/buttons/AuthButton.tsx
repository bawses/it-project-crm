/*
 * Login Page that redirects to Home/Contacts Page
 */
import Button from "@material-ui/core/Button";
import { BsGoogle } from "react-icons/bs";

interface ButtonProps {
  title: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  className?: string | undefined;
  authMethod?: string | undefined;
}

export default function AuthButton({
  title,
  onClick = () => {},
  className = undefined,
  authMethod = undefined,
}: ButtonProps) {
  return authMethod == "google" ? (
    <Button
      onClick={onClick}
      fullWidth
      variant="contained"
      className={className}
      style={{
        position: "relative",
        top: "2px",
        bottom: "5px",
        textTransform: "none",
        fontWeight: "bold",
        fontSize: "1rem",
      }}
    >
      {/* Google Login Button styling */}
      <BsGoogle />
      &nbsp;&nbsp;
      {title}
    </Button>
  ) : (
    <Button
      onClick={onClick}
      fullWidth
      variant="contained"
      className={className}
      style={{
        position: "relative",
        top: "2px",
        bottom: "5px",
        textTransform: "none",
        fontWeight: "bold",
        fontSize: "1rem",
      }}
    >
      {title}
    </Button>
  );
}
