import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router";

const Auth = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const navigateTo = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://onelab-levels-api.vercel.app/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                console.log('Вход выполнен успешно');
                alert('Вход выполнен успешно!!!!!!!!!!!!!')
                navigateTo('/');
            } else {
                console.error('Ошибка входа:', response.statusText);
                alert('Ошибка входа :(((((((')
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={10} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h5" gutterBottom align="center">
                        Вход в систему
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
                                    Войти
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
