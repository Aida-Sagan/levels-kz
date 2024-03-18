import React, { useEffect, useState } from 'react';
import { createTheme } from "@mui/material/styles";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function TableCompanies() {
    const [userData, setUserData] = useState([]);


    useEffect(() => {
        const dataFromSessionStorage = JSON.parse(sessionStorage.getItem('userData'));
        if (dataFromSessionStorage) {
            setUserData(dataFromSessionStorage);
        }
    }, []);

    return (

        <TableContainer component={Paper} sx={{ borderRadius: '20px', boxShadow: '7px 5px 8px rgba(0,0,0,0.1)' }}>
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

    )
}
