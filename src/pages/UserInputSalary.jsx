import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function UserInputSalary() {
    const [selectedOption, setSelectedOption] = useState('');
    const [company, setCompany] = useState('');
    const [city, setCity] = useState('');
    const [salary, setSalary] = useState('');
    const [bonus, setBonus] = useState('');
    const [experience, setExperience] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const navigateTo = useNavigate();

    const options = [
        "Frontend разработчик" ,
        "Backend разработчик",
        "Аналитик данных" ,
        "Тестировщик",
        "Системный аналитик",
        "UI/UX дизайнер",
    ];

    const saveToSessionStorage = () => {
        if (!selectedOption || !company || !city || !salary || !bonus || !experience){
            alert('Пожалуйста, заполните все поля.');
            return;

        }

        const userData = JSON.parse(sessionStorage.getItem('userData')) || [];
        const newData = {
            selectedOption,
            company,
            city,
            salary,
            bonus,
            experience
        };
        userData.push(newData);
        sessionStorage.setItem('userData', JSON.stringify(userData));
        setShowAlert(true);
        navigateTo('/table-companies');
    };


    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <FormControl sx={{ width: "400px",
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                bgcolor: 'background.paper'
            }}>

                <InputLabel id="demo-simple-select-filled-label" required>Выбрать профессию</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    label='Выбрать профессию'
                >
                    {options.map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                    ))}
                </Select>

                <TextField
                    id="outlined-basic"
                    label="Компания"
                    variant="outlined"
                    sx={{ mt: '20px' }}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    error={!company}
                    helperText={!company ? 'Это поле обязательно' : ''}
                />
                <TextField
                    id="outlined-basic"
                    label="Город"
                    variant="outlined"
                    sx={{ mt: '20px' }}
                    onChange={(e) => setCity(e.target.value)}
                />
                <TextField
                    id="outlined-number"
                    label="Ваша зарплата в Тенге"
                    type="number"
                    sx={{ mt: '20px' }}
                    onChange={(e) => setSalary(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="outlined-number"
                    label="Ваши бонусы в Тенге"
                    type="number"
                    sx={{ mt: '20px' }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => setBonus(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    label="Опыт работы"
                    variant="outlined"
                    sx={{ mt: '20px' }}
                    onChange={(e) => setExperience(e.target.value)}
                />

                {showAlert && (
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                        Отправлено успешно
                    </Alert>
                )}
                <Button variant="contained"
                        onClick={saveToSessionStorage}
                        sx={{
                            mt: '40px', background: 'linear-gradient(to right bottom, #30cfd0,  #330867)',
                            fontFamily: ['Josefin Sans', 'sans-serif'].join(','),}} >
                    Отправить
                </Button>
            </FormControl>
        </Box>

    );
}