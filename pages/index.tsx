import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextButton from "../components/buttons/TextButton";
import { COLORS } from "../lib/Colors";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
      </Box>

      <TextButton color={COLORS.primaryBlue} textColor={COLORS.white} title="Nav bar blue" onClick={() => {}} />
    </Container>
  );
}
