import Button from "@material-ui/core/Button";
import { COLORS } from "../../lib/Colors";

interface ButtonProps {
  title: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  className?: string | undefined;
  color?: string; 
  textColor?: string;
}

export default function AuthButton({
  title,
  onClick = () => {},
  className = undefined,
  color = COLORS.primaryBlue,
  textColor = COLORS.white,
}: ButtonProps) {
  return (
    <Button
      onClick={onClick}
      fullWidth
      
      variant="contained"
      className={className}
      style={{
        position: "relative",
        // top: "2px",
        // bottom: "2px",
        textTransform: "none",
        fontWeight: "bold",
        fontSize: "1rem",
        backgroundColor: color,
        color:  textColor,
      }}
    >
      {title}
    </Button>
  );
}
