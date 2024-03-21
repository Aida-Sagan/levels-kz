import React, { useEffect, useState } from 'react';

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
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';

import axios from 'axios';

export default function TablePopularCompanies() {
    const [userData, setUserData] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [sortBySalaryAscending, setSortBySalaryAscending] = useState(true);

    const fetchData = async () => {
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY4M2NhMzRlNTUzZWU3ZDcyNzg4M" +
                "jciLCJpYXQiOjE3MTEwMjcyOTksImV4cCI6MTcxMTAzMDg5OX0.V9nNcv9xp_Tegp6bTrNF-9-R69aTXB1p9H6_KULbchw";

            const headers = {
                Authorization: `Bearer ${token}`
            };

            const companiesResponse = await axios.get('https://onelab-levels-api.vercel.app/api/companies', { headers });
            const companies = companiesResponse.data;
            setCompanies(companies);

            const specializationsResponse = await axios.get('https://onelab-levels-api.vercel.app/api/specializations', { headers });
            const locationsResponse = await axios.get('https://onelab-levels-api.vercel.app/api/locations', { headers });
            const salariesResponse = await axios.get('https://onelab-levels-api.vercel.app/api/salaries', { headers });

            const specializations = specializationsResponse.data;
            const locations = locationsResponse.data;
            const salaries = salariesResponse.data;

            const combinedData = salaries.map(salary => {
                const specialization = specializations.find(specialization => specialization._id === salary._id);
                const company = companies.find(company => company._id === salary.company);
                const location = locations.find(location => location._id === salary._id);

                console.log('company ->', company)
                return {
                    specialization: specialization?.name,
                    company: company?.name,
                    location: location?.name,
                    ...salary,
                };
            });

            console.log('combinedData: ', combinedData)
            setUserData(combinedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
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

    const handleSortBySalary = () => {
        setSortBySalaryAscending(!sortBySalaryAscending);
        const sortedData = [...userData].sort((a, b) => {
            const salaryA = parseInt(a.salary?.base || 0);
            const salaryB = parseInt(b.salary?.base || 0);
            return sortBySalaryAscending ? salaryA - salaryB : salaryB - salaryA;
        });
        setUserData(sortedData);
    };

    return (
            <Container>
                <TableContainer component={Paper} sx={{
                    mt: '15px',
                    mb: '50px',
                    borderRadius: '20px',
                }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell sx={{color: '#1565ce', fontWeight: "bold", fontSize: '22px'}} align="center">Компания</TableCell>
                                <TableCell sx={{color: '#1565ce', fontWeight: "bold", fontSize: '22px'}} align="center">Город</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {companies.map((company, index) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell sx={{color: '#358c8f', fontWeight: "bolder", fontSize: '18px'}} align="center">{company.name}</TableCell>
                                    <TableCell sx={{color: '#607c9d', fontWeight: "bolder", fontSize: '18px'}} align="center">{company.location?.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Divider></Divider>

                <TableContainer component={Paper} sx={{ mt: '15px', mb:'50px', borderRadius: '20px', }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{color: '#2a5e88', fontWeight: "bold", fontSize: '22px'}} align="right">Специализация</TableCell>
                                <TableCell sx={{color: '#2a5e88', fontWeight: "bold", fontSize: '22px'}} align="right">Город</TableCell>
                                <TableCell  align="right">
                                    <Button sx={{color: '#2a5e88', fontWeight: "bold", fontSize: '22px'}} onClick={handleSortBySalary}>
                                        Зарплата
                                        {sortBySalaryAscending ? ' ↓' : ' ↑'}
                                    </Button>
                                </TableCell>
                                <TableCell sx={{color: '#2a5e88', fontWeight: "bold", fontSize: '22px'}} align="right">Бонус</TableCell>
                                <TableCell sx={{color: '#2a5e88', fontWeight: "bold", fontSize: '22px'}} align="right">Опыт</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userData.map((row, index) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="right">{row.specialization?.name}</TableCell>
                                    <TableCell align="right">{row.location?.name}</TableCell>
                                    <TableCell align="right">{row.salary?.base}</TableCell>
                                    <TableCell align="right">{row.salary?.bonus}</TableCell>
                                    <TableCell align="right">{row.grade}</TableCell>
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

    )
}