import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { COLORS } from "../lib/Colors";
import TextButton from "../components/buttons/TextButton";

export default function Colours() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h1" component="h1" gutterBottom>
          Colours:
        </Typography>
      </Box>
      <Typography variant="h2" component="h2">
        Header 2
      </Typography>
      <Typography variant="h3" component="h3">
        Header 3
      </Typography>
      <Typography variant="h4" component="h4">
        Header 4
      </Typography>
      <Typography component="p">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <TextButton
        color={COLORS.primaryBlue}
        textColor={COLORS.white}
        title="Nav bar blue"
        onClick={() => {}}
      />
      <TextButton
        color={COLORS.actionOrange}
        textColor={COLORS.white}
        title="Action orange"
        onClick={() => {}}
      />
      <TextButton
        color={COLORS.primaryBlueLight}
        title="Tag light blue"
        onClick={() => {}}
      />
      <TextButton
        color={COLORS.starredYellow}
        title="Starred yellow"
        onClick={() => {}}
      />
      <TextButton
        color={COLORS.primaryBlueDark}
        textColor={COLORS.white}
        title="Primary blue dark"
        onClick={() => {}}
      />
      <TextButton
        color={COLORS.lightGrey}
        title="Light grey"
        onClick={() => {}}
      />
      <TextButton
        color={COLORS.inactiveGrey}
        title="Inactive grey"
        onClick={() => {}}
      />
    </Container>
  );
}
