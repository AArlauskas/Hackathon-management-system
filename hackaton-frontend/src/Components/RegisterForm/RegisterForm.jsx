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
import { RegisterUser } from '../../API/PublicAPI';
import LoadingScreen from '../../Containers/LoadingScreen/LoadingScreen';

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

export default function RegisterForm(props) {

    const Register = (data) => {
        setLoading(true);
        RegisterUser(data).then(response => {
            window.location.href = "/";
        }).catch(error => {
            setLoading(false);
            setErrorIsShowing(true);
        });
    }

    const classes = useStyles();
    const [Firstname, setFirstname] = useState("");
    const [Lastname, setLastname] = useState("");
    const [Email, setEmail] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [School, setSchool] = useState("");
    const [Programme, setProgramme] = useState("");
    const [errorIsShowing, setErrorIsShowing] = useState(false);
    const [loading, setLoading] = useState(false);

    if(loading)
    {
        return <LoadingScreen/>
    }
    else
    {
        return (
            <div>
                <div>
                    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4000} open={errorIsShowing} onClose={() => setErrorIsShowing(false)}>
                        <MuiAlert elevation={6} variant="filled" severity="error">Email is already taken</MuiAlert>
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
                                Register
                                </Typography>
                            <form className={classes.form} noValidate>
                                <TextField
                                    type="text"
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
                                    type="text"
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
                                    type="email"
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
                                    label="Phone number"
                                    type="tel"
                                    id="field"
                                    autoComplete="current-password"
                                    value={PhoneNumber}
                                    onChange={e => setPhoneNumber(e.target.value)}
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
                                    label="School/University"
                                    type="text"
                                    id="field"
                                    autoComplete="current-password"
                                    value={School}
                                    onChange={e => setSchool(e.target.value)}
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
                                    label="Study programme"
                                    type="text"
                                    id="field"
                                    autoComplete="current-password"
                                    value={Programme}
                                    onChange={e => setProgramme(e.target.value)}
                                    inputProps={{
                                        style: {
                                            color: "white"
                                        }
                                    }}
                                />
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    style={{ backgroundColor: "#DAA1A0", color: "#F2F5F9" }}
                                    disabled={Firstname.length < 4 ||
                                        Lastname.length < 4 ||
                                        Email.length < 7 ||
                                        PhoneNumber.length < 7}
                                    className={classes.submit}
                                    onClick={() => {
                                        let data = {
                                            Firstname: Firstname,
                                            Lastname: Lastname,
                                            Email: Email,
                                            PhoneNumber: PhoneNumber,
                                            School: School,
                                            Programme: Programme
                                        };
                                        Register(data);
                                    }}
                                >
                                    Register
                                    </Button>
                            </form>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

