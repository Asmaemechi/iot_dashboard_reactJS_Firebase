// src/components/Register.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';

const Register = ({ setCurrentPage }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  // Après inscription réussie
    const handleRegisterSuccess = () => {
        setCurrentPage('dashboard');
    }
    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }
        alert(`Inscription réussie !\nNom: ${name}\nEmail: ${email}`);
        setCurrentPage('home'); // Retour Home après inscription
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0f2f5',
                padding: 2
            }}
        >
            <Paper elevation={6} sx={{ p: 4, maxWidth: 450, width: '100%', borderRadius: 3, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Créer un compte
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <TextField
                        label="Nom complet"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
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
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Confirmer mot de passe"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Box>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleRegister}
                        >
                            S’inscrire
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="text"
                            fullWidth
                            onClick={() => setCurrentPage('home')}
                        >
                            Retour Home
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Register;
