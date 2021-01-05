import React, { useState } from 'react';
import Logo from "../../Images/Logo.png";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LoadingScreen from "../../Containers/LoadingScreen/LoadingScreen";
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Axios from 'axios';



function Copyright() {
    return (
        <Typography style={{ color: "white" }} variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
                Hackatons, South Africa {" "}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFormLabel-root": {
          color: "white"
        }
      },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function RecoverPassword() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [errorIsShowing, setErrorIsShowing] = useState(false);
    const [successIsShowing,setSuccessIsShowing] = useState(false);

    const attemtSignIn = () => {
        setLoading(true);
        Axios.post("https://localhost:44318/api/Users/reset-password/?email=" + email)
        .then(response => {
            if(response.status === "404")
            {
                setErrorIsShowing(true);
            }
            else if(response.status === "200")
            {
                setSuccessIsShowing(true);
                //setTimeout(() => window.location.href = "/", 4200);
            }
        });

        setLoading(false);
    }

    return (
        <div onKeyPress={e => {
            if (e.key === "Enter") {
                attemtSignIn();
            }
        }}>
            <div style={{ textAlign: "center" }}>
                <img src={Logo} alt="RTC_Logo" style={{ width: 200, height: 200, marginTop: 30, marginBottom: 10 }} />
            </div>
            {loading ? <LoadingScreen/> :
                <div>
                    <div>
                        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4000} open={errorIsShowing} onClose={() => setErrorIsShowing(false)}>
                            <MuiAlert elevation={6} variant="filled" severity="error">Failed to sign in</MuiAlert>
                        </Snackbar>
                    </div>
                    <div>
                        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4000} open={successIsShowing} onClose={() => setSuccessIsShowing(false)}>
                            <MuiAlert elevation={6} variant="filled" severity="error">Password reset email was sent!</MuiAlert>
                        </Snackbar>
                    </div>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography style={{ color: "white", fontSize: "90%" }} component="h1" variant="h5">
                                Enter email of a password that you want to recover
                            </Typography>
                            <form className={classes.form} noValidate>
                                <TextField
                                    className={classes.root}
                                    style={{ color: "white" }}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="EmailField"
                                    label="Email"
                                    autoComplete="Email"
                                    autoFocus
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    style={{ backgroundColor: "#DAA1A0", color: "#F2F5F9" }}
                                    className={classes.submit}
                                    onClick={() => attemtSignIn()}
                                >
                                    Reset password
                                </Button>
                            </form>
                        </div>
                        <Box mt={8}>
                            <Copyright />
                        </Box>
                    </Container>
                </div>}
        </div>
    );
}
