import React from 'react';
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import { LineChart } from '@mui/x-charts/LineChart';


function AllInformationSalary() {

    return(
        <Container sx={{display: 'flex'}}>
            <Box
                 sx={(theme) => ({
                     display: 'flex',
                     p: '30px 30px 0 30px',
                     mr: '50px',
                     height: '200px',
                     width: '510px',
                     fontFamily: ['Josefin Sans','sans-serif'].join(','),
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
                     color: theme.palette.mode === "light"
                        ? '#3f778a'
                         : '#ffffff',
                     boxShadow:
                         theme.palette.mode === 'light'
                             ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                             : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                 })}>

                <Typography variant="h5">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: "10px", fontSize: '18px'}}>
                        <CreditCardIcon/>
                        ИНФОРМАЦИЯ О ЗАРПЛАТАХ КАЗАХСТАНА
                    </Box>
                </Typography>

                <Typography variant="h5" >
                    <Box sx={{
                        fontSize: 55,
                        mt: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#3f778a'
                    }}>
                        2 500
                    </Box>
                </Typography>
                <Typography variant="h6" >
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#717781'}}>
                        15 марта, 2024
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
                 })}>

                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                    ]}
                    width={600}
                    height={300}
                />
            </Box>
        </Container>

    )
}

export default AllInformationSalary;