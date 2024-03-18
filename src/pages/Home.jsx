import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Typography from "@mui/material/Typography";

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

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };


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