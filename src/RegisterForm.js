


import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
export default function UserSignUp() {
    const [user, setUser] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState([]);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };
    const registerUser = async (event) => {
        event.preventDefault();
        console.log("onsubmit");
        console.log(user);
        // window.location.href = '/userLogin';
        const mockURL = `https://7c5df6d5-e40e-40f9-bdd2-4e8319aa7075.mock.pstmn.io`;
        const response = await fetch(`${mockURL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            body: JSON.stringify(user),
        });
        console.log("after fetch");

        const data = await response.json()
        console.log("data");
        console.log(data);
        if (response.status === 404 || !data) {
            console.log("error while pushing data to database");
            alert(data);
        } else {
            alert("Created User Successfully. Please Sign In to continue.");
            window.location.href = '/userLogin';
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };
    const handleConfirmPassword = (e) => {
        if (e.target.value !== user.password) {
            console.log("The passwords do not match");
        } else {
            alert("Passwords Match!");
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                // name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                type="text"
                                name="first_name"
                                value={user.first_name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                // name="lastName"
                                autoComplete="family-name"
                                type="text"
                                name="last_name"
                                value={user.last_name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="userName"
                                label="User Name"
                                // name="email"
                                autoComplete="email"
                                type="text"
                                name="username"
                                value={user.username}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                // name="email"
                                autoComplete="email"
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                // name="password"
                                label="Password"
                                // type="password"
                                id="password"
                                autoComplete="new-password"
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                // name="password"
                                label="Confirm Password"
                                // type="password"
                                id="password"
                                autoComplete="new-password"
                                type="password"
                                name="password"
                                // value={confirmPassword}
                                onKeyUp={(e) => { handleConfirmPassword(e) }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        type='submit'
                        onClick={registerUser}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/UserLogin" variant="body2">
                                Already have an account? Sign in Instead
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
