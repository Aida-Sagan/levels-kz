import React, { useEffect, useState } from 'react';
import { createTheme } from "@mui/material/styles";
import getLPTheme from "./getLPTheme";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../components/Header";
import { ThemeProvider } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";

export default function TableCompanies() {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });
    const [userData, setUserData] = useState([]);

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

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

                <TableContainer component={Paper} sx={{ mt: '150px', mb:'50px', borderRadius: '20px', }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Специализация</TableCell>
                                <TableCell align="right">Компания</TableCell>
                                <TableCell align="right">Город</TableCell>
                                <TableCell align="right">З/п</TableCell>
                                <TableCell align="right">Бонус</TableCell>
                                <TableCell align="right">Опыт</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userData.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.selectedOption}
                                    </TableCell>
                                    <TableCell align="right">{row.company}</TableCell>
                                    <TableCell align="right">{row.city}</TableCell>
                                    <TableCell align="right">{row.salary}</TableCell>
                                    <TableCell align="right">{row.bonus}</TableCell>
                                    <TableCell align="right">{row.experience}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>


        </ThemeProvider>
    )
}
