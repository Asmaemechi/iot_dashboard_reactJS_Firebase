// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';

const Home = ({ setCurrentPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Background animé
    useEffect(() => {
        const interval = setInterval(() => {
            document.body.style.backgroundPosition = `${(Date.now() / 100) % 100}% 50%`;
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const handleLogin = () => {
        if (email === 'asma.mechi@isimg.tn' && password === 'asma') {
            setCurrentPage('dashboard'); // ouvre dashboard
        } else {
            alert('Email ou mot de passe incorrect !');
        }
    };

    const handleRegister = () => {
        setCurrentPage('register'); // ouvre page register
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
                background: 'linear-gradient(270deg, #a8e6a3, #8fd9a8, #7fd6a3, #8fd9a8, #a8e6a3)',
                backgroundSize: '600% 600%',
                animation: 'gradientAnimation 15s ease infinite',
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    maxWidth: 450,
                    width: '100%',
                    borderRadius: 3,
                    textAlign: 'center',
                    backgroundColor: 'rgba(255,255,255,0.85)',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Bienvenue sur Smart Agriculture
                </Typography>

                <Typography variant="body1" sx={{ mb: 4 }}>
                    Surveillez vos capteurs de Smart Agriculture en temps réel, consultez l’historique et recevez des alertes.
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Mot de passe"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleLogin}
                        >
                            Connexion
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={handleRegister}
                        >
                            Inscription
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            <style>
                {`
                    @keyframes gradientAnimation {
                        0% {background-position: 0% 50%;}
                        50% {background-position: 100% 50%;}
                        100% {background-position: 0% 50%;}
                    }
                `}
            </style>
        </Box>
    );
};

export default Home;
