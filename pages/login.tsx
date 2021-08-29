import { Card, TextField, Grid, Paper, Typography, Button} from '@material-ui/core';

export default function Login() {
    // const classes = useStyles();
    // const [state, dispatch] = useReducer(reducer, initialState);
    
    // let [inputEmail, setInputEmail] = "";
    const paperStyle = {padding: 30, height: '70vh', maxWidth: 500, margin: "20px auto"}
    const buttonStyle = {maxWidth: paperStyle.maxWidth, 
                        minWidth: 440, 
                        margin: "20px auto"}
    const gridStyle = {margin: "10px auto"}

    return (
        <Paper
            style = {paperStyle}
            // justifyContent="flex-end"
            // alignItems="center"
        >
            <Grid item xs={12}>
                    <TextField 
                    fullWidth label="Email" 
                    name="email" 
                    size="small" 
                    variant="outlined"
                    style= {gridStyle} 
                    />
            </Grid>
            <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        size="small"
                        type="password"
                        variant="outlined"
                        style= {gridStyle} 
                    />
            </Grid>
            <Button variant="contained" color="primary" style={buttonStyle}>
                Login
            </Button>
        </Paper>
    );
}