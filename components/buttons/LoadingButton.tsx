import { Button, CircularProgress } from "@material-ui/core";

interface LoadingButtonProps {
  maxWidth?: number,
  paddingTop?: number,
  paddingBottom?: number,
  marginTop?: number,
  marginBottom?: number,
  marginLeft?: number,
  marginRight?: number,
  height?: number,
  width?: number,
  indicatorSize?: number,
  loadingMessage?: string,
  indicatorMarginLeft?: number,
  indicatorMarginRight?: number,
  fullWidth?: boolean
}

export default function LoadingButton({
  maxWidth,
  paddingTop,
  paddingBottom,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  height,
  width,
  indicatorSize = 20,
  loadingMessage = "Loading",
  indicatorMarginLeft = 0,
  indicatorMarginRight = 4,
  fullWidth = undefined
}: LoadingButtonProps) {
  return (
    <Button
      variant="contained"
      disabled={true}
      fullWidth={fullWidth}
      style={{
        ...(maxWidth ? { maxWidth: maxWidth } : {}),
        ...(paddingTop ? { paddingTop: paddingTop } : {}),
        ...(paddingBottom ? { paddingBottom: paddingBottom } : {}),
        ...(marginTop ? { marginTop: marginTop } : {}),
        ...(marginBottom ? { marginBottom: marginBottom } : {}),
        ...(marginLeft ? { marginLeft: marginLeft } : {}),
        ...(marginRight ? { marginRight: marginRight } : {}),
        ...(height ? { height: height } : {}),
        ...(width ? { width: width } : {})
      }}
    >
      <CircularProgress
        size={indicatorSize}
        style={{ marginLeft: indicatorMarginLeft, marginRight: indicatorMarginRight }}
      />
      {loadingMessage}
    </Button>
  )
}