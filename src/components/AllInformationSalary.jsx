import React, { useState, useEffect } from 'react';
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { LineChart } from '@mui/x-charts/LineChart';

function AllInformationSalary() {
    const [salaries, setSalaries] = useState([]);
    const [averageSalary, setAverageSalary] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://onelab-levels-api.vercel.app/api/salaries');
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                const responseData = await response.json();
                setSalaries(responseData);
                calculateAverageSalary(responseData);
            } catch (error) {
                console.error('Произошла ошибка:', error);
            }
        };

        fetchData();
    }, []);

    const calculateAverageSalary = (data) => {
        const totalSalaries = data.reduce((acc, curr) => {
            if (curr.salary) {
                return acc + curr.salary.base + curr.salary.bonus;
            } else {
                return acc;
            }
        }, 0);
        const average = totalSalaries / data.length;
        setAverageSalary(average.toFixed(2));
    };

    const chartData = {
        xAxis: [{ data: salaries.map((item, index) => index + 1) }],
        series: [{ data: salaries.map((item) => (item.salary ? item.salary.base + item.salary.bonus : 0)) }],
    };

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <Container sx={{ display: 'flex' }}>
            <Box
                sx={(theme) => ({
                    display: 'flex',
                    p: '30px 30px 0 30px',
                    mr: '50px',
                    height: '200px',
                    width: '510px',
                    fontFamily: ['Josefin Sans', 'sans-serif'].join(','),
                    flexDirection: 'column',
                    flexShrink: 0,
                    borderRadius: '20px',
                    bgcolor:
                        theme.palette.mode === 'light'
                            ? 'rgba(178,227,243,0.24)'
                            : 'rgba(4,31,49,0.4)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid',
                    borderColor: 'divider',
                    color: theme.palette.mode === "light" ? '#3f778a' : '#ffffff',
                    boxShadow:
                        theme.palette.mode === 'light'
                            ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                            : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                })}
            >
                <Typography variant="h5">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: "10px", fontSize: '18px' }}>
                        <CreditCardIcon />
                        ИНФОРМАЦИЯ О ЗАРПЛАТАХ КАЗАХСТАНА
                    </Box>
                </Typography>

                <Typography variant="h5" >
                    <Box sx={{
                        fontSize: 40,
                        mt: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#3f778a'
                    }}>
                        {averageSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} KZT
                    </Box>
                </Typography>
                <Typography variant="h6" >
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#717781' }}>
                        {formattedDate}
                    </Box>
                </Typography>
            </Box>

            <Box component="section"
                 sx={(theme) => ({
                     display: 'flex',
                     width: '510px',
                     height: '200px',
                     flexDirection: 'column',
                     flexShrink: 0,
                     borderRadius: '20px',
                     bgcolor:
                         theme.palette.mode === 'light'
                             ? 'rgba(178,227,243,0.24)'
                             : 'rgba(4,31,49,0.4)',
                     backdropFilter: 'blur(24px)',
                     border: '1px solid',
                     borderColor: 'divider',
                     boxShadow:
                         theme.palette.mode === 'light'
                             ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                             : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                 })}
            >

                <LineChart
                    xAxis={chartData.xAxis}
                    series={chartData.series}
                    width={600}
                    height={300}
                />
            </Box>
        </Container>
    );
}

export default AllInformationSalary;
