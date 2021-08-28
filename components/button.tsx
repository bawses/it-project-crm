import Button from "@material-ui/core/Button";
import { COLORS } from "../src/colors";

interface ButtonProps {
  color?: string;
  textColor?: string;
  title: string;
  onClick?: () => void;
}

export default function CustomButton({
  color = COLORS.lightGrey,
  textColor = COLORS.black,
  title,
  onClick = () => {},
}: ButtonProps) {
  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: color,
        color: textColor,
        fontWeight: "bold",
        margin: "5px",
      }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}
