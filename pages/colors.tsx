import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { COLORS } from '../src/colors';
import CustomButton from '../components/button';

export default function Colours() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Colours:
        </Typography>
      </Box>

      <CustomButton color={COLORS.primaryBlue} textColor={COLORS.white} title="Nav bar blue" onClick={() => {}}/>
      <CustomButton color={COLORS.actionOrange} textColor={COLORS.white} title="Action orange" onClick={() => {}}/>
      <CustomButton color={COLORS.primaryBlueLight} title="Tag light blue" onClick={() => {}}/>
      <CustomButton color={COLORS.starredYellow} title="Starred yellow" onClick={() => {}}/>
      <CustomButton color={COLORS.primaryBlueDark} textColor={COLORS.white} title="Primary blue dark" onClick={() => {}}/>
      <CustomButton color={COLORS.lightGrey} title="Light grey" onClick={() => {}}/>
      <CustomButton color={COLORS.inactiveGrey} title="Inactive grey" onClick={() => {}}/>
    </Container>
  );
}