import Button from "@material-ui/core/Button";

interface ButtonProps {
  title: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  className?: string | undefined;
}

export default function AuthButton({
  title,
  onClick = () => {},
  className = undefined,
}: ButtonProps) {
  return (
    <Button
      onClick={onClick}
      fullWidth
      variant="contained"
      className={className}
      style={{
        position: "relative",
        top: "5px",
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
