import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import axios from 'axios';
import {useNavigate} from "react-router";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY4M2NhMzRlNTUzZWU3ZDcyNzg' +
    '4MjciLCJpYXQiOjE3MTEwMjcyOTksImV4cCI6MTcxMTAzMDg5OX0.V9nNcv9xp_Tegp6bTrNF-9-R69aTXB1p9H6_KULbchw'

const headers = {
    Authorization: `Bearer ${token}`
};


export default function UserInputSalary() {
    const [data, setData] = useState(null);
    const [specialization, setSpecialization] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [bonus, setBonus] = useState('');
    const [experience, setExperience] = useState('');

    const navigateTo = useNavigate();
    function fetchDataFromAPI() {
        return Promise.all([
            axios.get('https://onelab-levels-api.vercel.app/api/companies', { headers }),
            axios.get('https://onelab-levels-api.vercel.app/api/specializations', { headers }),
            axios.get('https://onelab-levels-api.vercel.app/api/locations', { headers })
        ]).then(responses => {
            const companies = responses[0].data;
            const specializations = responses[1].data.map(spec => spec.name);
            const locations = responses[2].data.map(loc => loc.name);

            return {
                companies,
                specializations,
                locations
            };
        }).catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
    }

    useEffect(() => {
        fetchDataFromAPI()
            .then(data => setData(data))
            .catch(error => console.error('Error:', error));
    }, []);


    const saveToBackend = () => {
        if (!specialization || !company || !location || !salary || !bonus || !experience) {
            alert('заполните все поля!')
            return;
        }
        const formData = {
            specialization: { name: specialization },
            location: { name: location },
            salary: { base: parseInt(salary), bonus: parseInt(bonus) },
            grade: experience
        };

        axios.post('https://onelab-levels-api.vercel.app/api/salaries', formData, { headers })
            .then(response => {
                console.log('Data sent successfully:', response.data);
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });

        navigateTo('/');
    };

    if (!data) {
        return <div>
            <h1>ПОЖАЛУЙСТА, ПОДОЖДИТЕ.</h1>
            <h2>Данные подгружаются ...</h2>
        </div>;
    }


    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <FormControl sx={{ width: "400px", p: 3 }}>
                <Select
                    labelId="select-specialization-label"
                    id="select-specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    sx={{ mb: 2 }}
                >
                    {data.specializations.map((job, id) => (
                        <MenuItem key={id} value={job}>
                            {job}
                        </MenuItem>
                    ))}
                </Select>

                <Select
                    labelId="select-company-label"
                    id="select-company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    sx={{ mb: 2 }}
                >
                    {data.companies.map((company, index) => (
                        <MenuItem key={index} value={company.name}>
                            {company.name}
                        </MenuItem>
                    ))}
                </Select>

                <Select
                    labelId="select-city-label"
                    id="select-city"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    sx={{ mb: 2 }}
                >
                    {data.locations.map((city, id) => (
                        <MenuItem key={id} value={city}>
                            {city}
                        </MenuItem>
                    ))}
                </Select>

                <TextField
                    id="input-salary"
                    label="Зарплата в Тенге"
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <TextField
                    id="input-bonus"
                    label="Бонусы в Тенге"
                    type="number"
                    value={bonus}
                    onChange={(e) => setBonus(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <TextField
                    id="input-experience"
                    label="Опыт работы (grade)"
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <Button variant="contained" sx={{ background: 'linear-gradient(to right bottom, #30cfd0, #330867)' }} onClick={saveToBackend}>Отправить</Button>
            </FormControl>

        </Box>
    );
}
