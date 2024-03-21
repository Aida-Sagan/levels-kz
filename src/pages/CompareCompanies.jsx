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
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Company() {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });
    const [userData, setUserData] = useState([]);
    const [specialty, setSpecialty] = React.useState('');
    const [level, setLevel] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [filteredData, setFilteredData] = React.useState([]);

    const handleChangeSpecialty = (event) => {
        setSpecialty(event.target.value);
        filterAndUpdateData(event.target.value, level, location);
    };
    const handleChangeLevel = (event) => {
        setLevel(event.target.value);
        filterAndUpdateData(specialty, event.target.value, location);
    };
    const handleChangeLocation = (event) => {
        setLocation(event.target.value);
        filterAndUpdateData(specialty, level, event.target.value);
    };

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const filterAndUpdateData = (specialtyFilter, levelFilter, locationFilter) => {
        const filteredData = userData.filter(row => {
            return (
                (specialtyFilter === '' || row.specialty === specialtyFilter) &&
                (levelFilter === '' || row.level === levelFilter) &&
                (locationFilter === '' || row.location === locationFilter)
            );
        });
        setFilteredData(filteredData);
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#0d2234' : 'rgba(52,159,121,0.16)',
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

    const options = [
        "Frontend разработчик" ,
        "Backend разработчик",
        "Аналитик данных" ,
        "Тестировщик",
        "Системный аналитик",
        "UI/UX дизайнер",
    ];

    const locations = [
        'Астана',
        'Алматы',
        'Шымкент',
        'Семей',
        'Караганда',
        'Уральск',
        'Атырау',
        'Петропавловск',
        'Костанай',
        'Тараз',
        'Актобе',
        'Кызылорда',
        'Павлодар',
        'Туркестан',
        'Усть-Каменогорск',
        'Экибастуз',
    ]

    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
            <CssBaseline />
            <Container>
                <Header mode={mode} toggleColorMode={toggleColorMode}></Header>
                <Box sx={{
                    flexGrow: 1,
                    mt: '150px'
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4}>
                            <Item>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: 'column'
                                }}>
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

                            <TableContainer
                                component={Paper}
                                sx={{
                                    mt: '30px', mb:'50px', borderRadius: '20px',
                                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#0d2234' : 'rgba(56,185,139,0.16)',
                                }}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Специализация</TableCell>
                                            <TableCell align="center">Уровень</TableCell>
                                            <TableCell align="center">Локация</TableCell>
                                            <TableCell align="center">Зарплата</TableCell>
                                            <TableCell align="center">Опыт</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredData.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">{row.specialty}</TableCell>
                                                <TableCell align="center">{row.level}</TableCell>
                                                <TableCell align="center">{row.location}</TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Box>

            </Container>


        </ThemeProvider>
    )
}
