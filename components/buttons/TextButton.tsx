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
  | (() => void)
  | ((event: React.SyntheticEvent) => void)
  | ((event: React.SyntheticEvent) => Promise<void>);
  className?: string | undefined;
  fontSize?: string;
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
  fontSize = '1rem',
}: ButtonProps) {
  return (
    <Button
      variant="contained"
      type={type}
      style={{
        backgroundColor: disabled ? COLORS.lightGrey : color,
        color: disabled ? COLORS.black : textColor,
        fontWeight: "bold",
        margin: "5px",
        textTransform: "none",
        fontSize: fontSize,
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
