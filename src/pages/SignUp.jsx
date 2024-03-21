import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

const Auth = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const navigateTo = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const signupUser = async (userData) => {
        try {
            const response = await fetch('https://onelab-levels-api.vercel.app/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Signup successful:', data);
                alert('Signup successful')
                navigateTo('/signin');
            } else {
                console.error('Signup failed:', response.statusText);
                alert('Signup failed')
                navigateTo('/signin');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login data:', loginData);

        signupUser(loginData);
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={10} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h5" gutterBottom align="center">
                        Регистрация
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Электронная почта"
                                    name="email"
                                    type="email"
                                    value={loginData.email}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Пароль"
                                    name="password"
                                    type="password"
                                    value={loginData.password}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    sx={{
                                        mt: '40px',
                                        height: '50px',
                                        border: '0px',
                                        color: '#ffffff',
                                        background: 'linear-gradient(to right bottom, #30cfd0,  #330867)',
                                        fontFamily: ['Josefin Sans','sans-serif'].join(','),
                                    }}
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                >
                                    Регистрация
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Auth;
