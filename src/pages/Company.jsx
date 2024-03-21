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
import { Divider } from "@mui/material";
import Button from '@mui/material/Button';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import axios from "axios";
import { useLocation, useParams  } from 'react-router-dom';

export default function Company() {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });

    const [companyData, setCompanyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [locationData, setLocationData] = useState(null);
    const [salariesData, setSalariesData] = useState([]);

    const location = useLocation();
    const { id } = useParams();

    const fetchData = async () => {
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY4M2NhMzRlNTUzZWU3ZDcyNzg4Mj" +
                "ciLCJpYXQiOjE3MTEwMjcyOTksImV4cCI6MTcxMTAzMDg5OX0.V9nNcv9xp_Tegp6bTrNF-9-R69aTXB1p9H6_KULbchw";

            const headers = {
                Authorization: `Bearer ${token}`
            };

            // Получение данных о компании
            const companyResponse = await axios.get(`https://onelab-levels-api.vercel.app/api/companies/${id}`, { headers });
            const company = companyResponse.data;
            setCompanyData(company);

            // Получение данных о локации компании
            const locationResponse = await axios.get(`https://onelab-levels-api.vercel.app/api/locations/${company.location._id}`, { headers });
            const location = locationResponse.data;
            setLocationData(location);

            // Получение данных о зарплате компании
            const response = await axios.get(`https://onelab-levels-api.vercel.app/api/salaries/`, { headers });
            console.log("response", response)
            setSalariesData(response.data);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#0d2234' : 'rgba(52,159,121,0.16)',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

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
                            {loading ? (
                                <Typography>Loading...</Typography>
                            ) : (
                                <Item>
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: 'column'
                                    }}>
                                        <Typography sx={{ fontSize: '25px', fontWeight: 'bold' }}>{companyData ? companyData.name : 'Название компании'}</Typography>
                                        <Divider></Divider>
                                        <Divider></Divider>
                                        <Typography>Локация компании: {companyData && companyData.location ? companyData.location.name : 'Нет данных о локации'}</Typography>
                                    </Box>
                                </Item>
                            )}
                        </Grid>


                        <Grid item xs={6} md={4}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Зарплата</TableCell>
                                            <TableCell>Бонусы</TableCell>
                                            <TableCell>Специализация</TableCell>
                                            <TableCell>Уровень</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell colSpan={4}>Loading...</TableCell>
                                            </TableRow>
                                        ) : (
                                            salariesData.map((salary) => (
                                                <TableRow key={salary._id}>
                                                    <TableCell>{salary.salary.base}</TableCell>
                                                    <TableCell>{salary.salary.bonus}</TableCell>
                                                    <TableCell>{salary.specialization.name}</TableCell>
                                                    <TableCell>{salary.grade}</TableCell>
                                                </TableRow>
                                            ))
                                        )}
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
