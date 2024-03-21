import * as React from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

import Link from '@mui/material/Link';

import ToggleColorMode from "./ToggleColorMode";
import AutocompleteSearch from './Search';

const logoStyle = {
    width: '90px',
    height: '60px',
    margin: '0 32px',
    color: "#375a86",
}

export default function Header({mode, toggleColorMode}){
    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth',
            });
        }
    };

    return (

        <AppBar
            position='fixed'
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 2,
            }}
        >
            <Container >
                <Toolbar
                    variant='regular'
                    sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexShrink: 0,
                        borderRadius: '999px',
                        bgcolor:
                            theme.palette.mode === 'light'
                                ? 'linear-gradient(to top, #a8edea 0%, #fed6e3 100%)'
                                : 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(24px)',
                        maxHeight: 40,
                        fontFamily: ['Josefin Sans',
                            'sans-serif',].join(','),
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow:
                            theme.palette.mode === 'light'
                                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                    })}>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            ml: '-18px',
                            px: 0,
                        }}>
                        <CreditScoreIcon
                            src={'https://previews.123rf.com/images/urfandadashov/urfandadashov1808/urfandadashov180820685/108637121-money-vector-icon-isolated-on-transparent-background-money-logo-concept.jpg'}
                            style={logoStyle}
                        />

                        <Box sx={{ alignItems: 'center', display: { xs: 'none', md: 'flex' } }}>
                            <MenuItem
                                onClick={() => scrollToSection('salaries')}
                                sx={{ py: '6px', px: '12px' }}>

                                <Typography variant="body2" color="text.primary" sx={{fontFamily: ['Josefin Sans',
                                        'sans-serif',].join(','),}}>
                                    <Link href="/">Главная</Link>
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => scrollToSection('popular-company')}
                                sx={{ py: '6px', px: '12px', mr: '50px' }}>

                                <Typography variant="body2" color="text.primary"  sx={{fontFamily: ['Josefin Sans',
                                        'sans-serif',].join(','),}}>
                                   Популярные компании
                                </Typography>
                            </MenuItem>

                            <AutocompleteSearch />

                            <Typography
                                variant="body2"
                                color="text.primary" sx={{fontFamily: ['Josefin Sans',
                                    'sans-serif',].join(','), ml: '150px', mr: '20px'}}>
                                <Link href="/signin">Авторизация</Link>
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.primary" sx={{fontFamily: ['Josefin Sans',
                                    'sans-serif',].join(',')}}>
                                <Link href="/signup">Регистрация</Link>
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 0.5,
                            alignItems: 'center',
                        }}>

                        <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                    </Box>


                </Toolbar>
            </Container>

        </AppBar>

    )
}