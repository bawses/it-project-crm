interface ButtonProps {
  color: string
  onClick: () => void
}

export default function Button({ color, onClick }: ButtonProps) {
  return <div style={{ backgroundColor: color }} onClick={onClick}>
    hello lol
  </div>
}