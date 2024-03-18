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
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



export default function TableCompanies() {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });
    const [userData, setUserData] = useState([]);

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedData, setEditedData] = useState({});

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    useEffect(() => {
        const dataFromSessionStorage = JSON.parse(sessionStorage.getItem('userData'));
        if (dataFromSessionStorage) {
            setUserData(dataFromSessionStorage);
        }
    }, []);

    const handleDelete = (index) => {
        const newData = [...userData];
        newData.splice(index, 1);
        setUserData(newData);
        sessionStorage.setItem('userData', JSON.stringify(newData));
    };
    const handleEdit = (index) => {
        setSelectedIndex(index);
        setEditedData(userData[index]);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleSaveEdit = () => {
        const newData = [...userData];
        newData[selectedIndex] = editedData;
        setUserData(newData);
        sessionStorage.setItem('userData', JSON.stringify(newData));
        setEditModalOpen(false);
    };


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
                                    <TableCell align="right">
                                        <Button onClick={() => handleEdit(index)}>Редактировать</Button>
                                        <Button onClick={() => handleDelete(index)}>Удалить</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal
                    open={editModalOpen}
                    onClose={handleCloseEditModal}
                    aria-labelledby="edit-modal-title"
                    aria-describedby="edit-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <h2 id="edit-modal-title">Редактирование записи</h2>
                        <TextField
                            label="Специализация"
                            value={editedData.selectedOption}
                            onChange={(e) => setEditedData({ ...editedData, selectedOption: e.target.value })}
                        />
                        <TextField
                            label="Компания"
                            value={editedData.company}
                            onChange={(e) => setEditedData({ ...editedData, company: e.target.value })}
                        />
                        <TextField
                            label="Город"
                            value={editedData.city}
                            onChange={(e) => setEditedData({ ...editedData, city: e.target.value })}
                        />
                        <TextField
                            label="З/п"
                            value={editedData.salary}
                            onChange={(e) => setEditedData({ ...editedData, salary: e.target.value })}
                        />
                        <TextField
                            label="Бонус"
                            value={editedData.bonus}
                            onChange={(e) => setEditedData({ ...editedData, bonus: e.target.value })}
                        />
                        <TextField
                            label="Опыт"
                            value={editedData.experience}
                            onChange={(e) => setEditedData({ ...editedData, experience: e.target.value })}
                        />
                        <Button onClick={handleSaveEdit}>Сохранить</Button>
                        <Button onClick={handleCloseEditModal}>Отмена</Button>
                    </Box>
                </Modal>
            </Container>


        </ThemeProvider>
    )
}
