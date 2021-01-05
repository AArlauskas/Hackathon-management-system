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
import request from "request";
import { Link } from 'react-router-dom';



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
        margin: theme.spacing(1, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorIsShowing, setErrorIsShowing] = useState(false);

    const attemtSignIn = () => {
        setLoading(true);
        request.post({
            url: "https://localhost:44318/token",
            form: {
                grant_type: "password",
                username: email,
                password: password
            },
        },
            (err, resp, body) => {
                if (JSON.parse(body).error !== undefined) {
                    setErrorIsShowing(true);
                }
                else {
                    request.get({
                        url: "https://localhost:44318/api/Users/Personal",
                        headers: {
                            Authorization: "Bearer " + JSON.parse(body).access_token
                        }
                    },
                        (err2, resp2, body2) => {
                            if (resp2.statusCode === 200) {
                                let receivedUser = JSON.parse(body2);
                                window.localStorage.setItem("name", receivedUser.Name);
                                window.localStorage.setItem("email", receivedUser.Email);
                                window.localStorage.setItem("role", receivedUser.Role);
                                window.localStorage.setItem("token", JSON.parse(body).access_token);
                                window.location.reload(false);
                            }
                            else {
                                window.localStorage.clear();
                                setErrorIsShowing(true);
                            }
                        });
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
                <img src={Logo} alt="RTC_Logo" style={{ width: 150, height: 150, marginTop: 20, marginBottom: 10 }} />
            </div>
            {loading ? <LoadingScreen /> :
                <div>
                    <div>
                        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4000} open={errorIsShowing} onClose={() => setErrorIsShowing(false)}>
                            <MuiAlert elevation={6} variant="filled" severity="error">Failed to sign in</MuiAlert>
                        </Snackbar>
                    </div>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography style={{ color: "white" }} component="h1" variant="h5">
                                Sign in
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
                                    inputProps={{
                                        style: {
                                            color: "white"
                                        }
                                    }}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <TextField
                                    className={classes.root}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="PasswordField"
                                    autoComplete="current-password"
                                    inputProps={{
                                        style: {
                                            color: "white"
                                        }
                                    }}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    style={{ backgroundColor: "#DAA1A0", color: "#000" }}
                                    disabled={email.length < 4 || password.length < 4}
                                    className={classes.submit}
                                    onClick={() => attemtSignIn()}
                                >
                                    Sign In
                                </Button>
                                <div style={{textAlign: "center"}}>
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: "#C2B280", color: "#000", width: "75%" }}
                                    className={classes.submit}
                                    onClick={() => window.location.href = "/Register"}
                                >
                                    Register
                                </Button>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-around" }}>
                                    <Link onClick={() => window.location.href = "/forgot-password"}>
                                        Forgot password
                                    </Link>
                                    <Link onClick={() => window.location.href = "/previous/hackathons"}>
                                        Previous Hackathons
                                    </Link>
                                </div>
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
