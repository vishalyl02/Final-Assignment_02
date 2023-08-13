// import React, { useEffect, useState } from 'react';
// import axios from "axios";

// const UserLogin = () => {
//     const [user, setUser] = useState({
//         email: '',
//         password: '',
//     });

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setUser({ ...user, [name]: value });
//     };

//     const loginUser = async (event) => {
//         event.preventDefault()
//         console.log("onsubmit")
//         window.location.href = '/userProfile'
//         // const response = await fetch(`/login`, {
//         //     method: 'POST',
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //     },
//         //     withCredentials: true,
//         //     body: JSON.stringify(user),
//         // })
//         // const data = await response.json()
//         // console.log(data.message)
//         // if (response.status === 200) {
//         //     localStorage.setItem('token', data.access_token)
//         //     alert(data.message)
//         //     window.location.href = '/userProfile'
//         // } else {
//         //     alert(data.message)
//         // }
//     };

//     useEffect(async () => {
//         console.log("LOADED");
//         // if (localStorage.getItem('token')) {
//         //     const givingToken = localStorage.getItem('token');
//         //     console.log('token found')
//         //     console.log(givingToken)
//         //     const response = await fetch(`/auth`, {
//         //         method: 'POST',
//         //         headers: {
//         //             'Content-Type': 'application/json',
//         //         },
//         //         body: JSON.stringify({
//         //             token: givingToken,
//         //         })
//         //     })
//         //     if (response.status === 200) {
//         //         window.location.href = '/userProfile'
//         //     }
//         // }
//     }, [])

//     return (
//         <div>
//             <h2>User Login</h2>
//             <form>
//                 <div>
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={user.email}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={user.password}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <div className='signInButton'>
//                     <button type="submit" onClick={loginUser}>Login</button>
//                 </div>
//             </form>
//         </div>

//     );
// };

// export default UserLogin;













import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function UserLogin() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
        console.log(name + " " + value);
    };

    const loginUser = async (event) => {
        event.preventDefault()
        console.log("onsubmit")
        // window.location.href = '/userProfile'
        const mockURL = `https://7c5df6d5-e40e-40f9-bdd2-4e8319aa7075.mock.pstmn.io`;
        const response = await fetch(`${mockURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            body: JSON.stringify(user),
        })
        const data = await response.json();
        console.log(data);
        if (response.status === 200) {
            localStorage.setItem('token', data.access_token);
            // alert(data.message);
            console.log(data.message);
            window.location.href = '/userProfile';
        } else {
            alert(data.message)
        }
    };

    // useEffect(async () => {
    // console.log("LOADED");
    // if (localStorage.getItem('token')) {
    //     const givingToken = localStorage.getItem('token');
    //     console.log('token found')
    //     console.log(givingToken)
    //     const response = await fetch(`/auth`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             token: givingToken,
    //         })
    //     })
    //     if (response.status === 200) {
    //         window.location.href = '/userProfile'
    //     }
    // }
    // }, [])
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
                    Sign in
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        //   name="email"
                        autoComplete="email"
                        autoFocus
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        // name="password"
                        label="Password"
                        // type="password"
                        id="password"
                        autoComplete="current-password"
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                    />
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        type="submit"
                        onClick={loginUser}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                            <Link href="/UserSignUp" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
