import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFormLabel-root": {
            color: "#F2F5F9"
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

export default function CredentialForm(props) {
    const classes = useStyles();
    const [Firstname, setFirstname] = useState(props.Credentials.Firstname);
    const [Lastname, setLastname] = useState(props.Credentials.Lastname);
    const [Email, setEmail] = useState(props.Credentials.Email);
    const [Password, setPassword] = useState(props.Credentials.Password);
    const [errorIsShowing, setErrorIsShowing] = useState(false);

    return (
        <div>
            <div>
                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4000} open={errorIsShowing} onClose={() => setErrorIsShowing(false)}>
                    <MuiAlert elevation={6} variant="filled" severity="error">Credentials updated successfully!</MuiAlert>
                </Snackbar>
            </div>
            <div>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography style={{ color: "#F2F5F9" }} component="h1" variant="h5">
                            Change Credentials
                            </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                className={classes.root}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Firstname"
                                autoComplete="firstname"
                                autoFocus
                                value={Firstname}
                                onChange={e => setFirstname(e.target.value)}
                                inputProps={{
                                    style: {
                                        color: "white"
                                    }
                                }}
                            />

                            <TextField
                                className={classes.root}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Lastname"
                                autoComplete="lastname"
                                autoFocus
                                value={Lastname}
                                onChange={e => setLastname(e.target.value)}
                                inputProps={{
                                    style: {
                                        color: "white"
                                    }
                                }}
                            />

                            <TextField
                                className={classes.root}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Email"
                                autoComplete="email"
                                autoFocus
                                value={Email}
                                onChange={e => setEmail(e.target.value)}
                                inputProps={{
                                    style: {
                                        color: "white"
                                    }
                                }}
                            />

                            <TextField
                                className={classes.root}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="field"
                                autoComplete="current-password"
                                value={Password}
                                onChange={e => setPassword(e.target.value)}
                                inputProps={{
                                    style: {
                                        color: "white"
                                    }
                                }}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                style={{ backgroundColor: "#DAA1A0", color: "#F2F5F9" }}
                                disabled={Firstname.length < 4 ||
                                    Lastname.length < 4 ||
                                    Email.length < 7 ||
                                    Password.length < 6}
                                className={classes.submit}
                                onClick={() => {
                                    let data = {
                                        Firstname: Firstname,
                                        Lastname: Lastname,
                                        Email: Email,
                                        Password: Password
                                    };
                                    props.updateCredentials(data);
                                    setErrorIsShowing(true);
                                    setTimeout(() => {
                                        window.localStorage.clear();
                                        window.location.href = "/";
                                    }, 2000)
                                }}
                            >
                                Update credentials
                                </Button>
                        </form>
                    </div>
                </Container>
            </div>
        </div>
    )
}

