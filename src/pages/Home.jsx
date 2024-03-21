import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Typography from "@mui/material/Typography";
import { useEffect, useState } from 'react';

import getLPTheme from './getLPTheme';
import Header from "../components/Header";
import AllInformationSalary from "../components/AllInformationSalary";
import TablePopularCompanies from "../components/TablePopularCompanies";
import Company from './Company';

export default function Home() {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });
    const [authenticated, setAuthenticated] = useState(false);

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY4M2NhMzRlNTUzZWU3ZDcyNzg4MjciLCJp' +
        'YXQiOjE3MTEwMjcyOTksImV4cCI6MTcxMTAzMDg5OX0.V9nNcv9xp_Tegp6bTrNF-9-R69aTXB1p9H6_KULbchw'

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch('https://onelab-levels-api.vercel.app/api/auth/signin', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }
            } catch (error) {
                console.error('Error during authentication check:', error);
            }
        };

        checkAuthentication();
    }, []);


    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
            <CssBaseline />
            <Header mode={mode} toggleColorMode={toggleColorMode} ></Header>
            <Box sx={{mt: '150px'}}>
                <Container>
                    <Box component="section"
                         sx={(theme) => ({
                             display: 'flex',
                             justifyContent: 'end',
                             p: '40px',
                             mb: '50px',
                             borderRadius: '20px',
                             flexWrap: 'wrap',
                             fontFamily: ['Josefin Sans','sans-serif'].join(','),

                             bgcolor:
                                 theme.palette.mode === 'light'
                                     ? 'rgba(255,255,255,0.4)'
                                     : 'rgba(12,19,24,0.4)',
                             backdropFilter: 'blur(24px)',
                             border: '1px solid',
                             borderColor: 'divider',
                             boxShadow:
                                 theme.palette.mode === 'light'
                                     ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                     : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                         })}
                    >
                        <AllInformationSalary/>

                        {authenticated && (
                            <Typography variant="h6" sx={{mt: '40px', fontWeight: 'bolder', color: 'red'}}>
                                Пожалуйста, войдите в свой кабинет, чтобы добавить свою зарплату.
                            </Typography>
                        )}

                        {!authenticated && (
                            <Button variant="contained"
                                    href="/user-input-salary"
                                    sx={{mt: '40px',
                                        height: '50px',
                                        border: '0px',
                                        color: '#ffffff',
                                        background: 'linear-gradient(to right bottom, #30cfd0,  #330867)',
                                        fontFamily: ['Josefin Sans','sans-serif'].join(','),}} >
                                <PersonAddIcon sx={{mr: '10px'}}/> Добавить свою зарплату
                            </Button>
                        )}

                        <Box sx={{mt: '15px', width: '100%', }}>
                            <Typography sx={{
                                display: 'flex',
                                justifyContent:"center",
                                fontSize: '25px',
                                mb: '20px'


                            }}>ПОПУЛЯРНЫЕ КОМПАНИИ</Typography>
                            <TablePopularCompanies  />
                        </Box>

                    </Box>

                </Container>
            </Box>

        </ThemeProvider>
    );
}