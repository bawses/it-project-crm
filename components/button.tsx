import Button from "@material-ui/core/Button";
import { COLORS } from "../lib/Colors";

interface ButtonProps {
  type?: string;
  color?: string;
  textColor?: string;
  title: string;
  href?: string;
  onClick?: (event: React.SyntheticEvent) => void;
}

export default function CustomButton({
  type = "button",
  color = COLORS.lightGrey,
  textColor = COLORS.black,
  title,
  href = "",
  onClick = () => {},
}: ButtonProps) {
  return (
    <Button
      variant="contained"
      type={type}
      style={{
        backgroundColor: color,
        color: textColor,
        fontWeight: "bold",
        margin: "5px",
      }}
      href={href}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}
