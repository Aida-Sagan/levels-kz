import React, { useEffect, useState } from 'react';
import { createTheme } from "@mui/material/styles";
import getLPTheme from "./getLPTheme";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../components/Header";


import { ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Divider} from "@mui/material";
import Button from '@mui/material/Button';

export default function Company() {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });
    const [userData, setUserData] = useState([]);

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#0d2234' : 'rgba(80,114,11,0.16)',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    useEffect(() => {
        const dataFromSessionStorage = JSON.parse(sessionStorage.getItem('userData'));
        if (dataFromSessionStorage) {
            setUserData(dataFromSessionStorage);
        }
    }, []);

    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
            <CssBaseline />
            <Container>
                <Header mode={mode} toggleColorMode={toggleColorMode}></Header>
                <Box sx={{ flexGrow: 1, mt: '150px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4}>
                            <Item>
                                <Box sx={{display: "flex", flexDirection: 'column'}}>
                                    <Typography sx={{ fontSize: '25px'}} > Название компании</Typography>
                                    <Divider></Divider>
                                    <Divider></Divider>
                                    <Typography>Локации компании: {}</Typography>
                                    <Typography>Средний возраст опыта сотрудников: {}</Typography>
                                    <Typography>Количество людей работающих здесь: {}</Typography>
                                </Box>
                            </Item>

                        </Grid>
                        <Grid item xs={6} md={8}>
                            <Typography variant="h6">Фильтры:</Typography>

                        </Grid>
                    </Grid>
                </Box>

            </Container>


        </ThemeProvider>
    )
}
