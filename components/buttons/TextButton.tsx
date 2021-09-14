import Button from "@material-ui/core/Button";
import { COLORS } from "../../lib/Colors";

interface ButtonProps {
  type?: string;
  color?: string;
  textColor?: string;
  title: string;
  href?: string;
  disabled?: boolean,
  onClick?:
  | ((event: React.SyntheticEvent) => void)
  | ((event: React.SyntheticEvent) => Promise<void>);
  className?: string | undefined;
}

export default function TextButton({
  type = "button",
  color = COLORS.lightGrey,
  textColor = COLORS.black,
  title,
  href = "",
  disabled,
  onClick = () => { },
  className = undefined,
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
        textTransform: "none",
        fontSize: "1rem",
      }}
      href={href}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {title}
    </Button>
  );
}
