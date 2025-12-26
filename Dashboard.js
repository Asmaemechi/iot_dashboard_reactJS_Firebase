import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Grid, Button, Dialog, DialogContent,
    DialogTitle, IconButton, AppBar, Toolbar
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SensorCard from './SensorCard';
import AlertsPanel from './AlertsPanel';
import CloseIcon from '@mui/icons-material/Close';

const thresholds = {
    Temperature: { min: 15, max: 35 },
    Humidité: { min: 30, max: 70 },
    Luminosité: { min: 100, max: 1000 },
    Flamme: { min: 0, max: 0 },
    'Humidité de sol': { min: 20, max: 80 },
};

const initialSensorsData = {
    Temperature: 25,
    Humidité: 50,
    Luminosité: 500,
    Flamme: 0,
    'Humidité de sol': 40,
};

const RealTimeMiniChart = ({ sensor, data }) => (
    <Box sx={{ backgroundColor: 'white', borderRadius: 3, boxShadow: '0 3px 10px rgba(0,0,0,0.05)', padding: 1, height: 140 }}>
        <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{sensor}</Typography>

        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <Line type="monotone" dataKey="value" stroke="#2ecc71" strokeWidth={2} dot={false} />
                <YAxis hide />
                <XAxis hide dataKey="timestamp" />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    </Box>
);

const Dashboard = ({ setCurrentPage }) => {
    const [sensors, setSensors] = useState(initialSensorsData);
    const [history, setHistory] = useState({});
    const [alerts, setAlerts] = useState([]);
    const [zoomedChart, setZoomedChart] = useState(null);

    useEffect(() => {
        const h = {};
        Object.keys(initialSensorsData).forEach(sensor => {
            h[sensor] = [{ timestamp: Date.now(), value: initialSensorsData[sensor] }];
        });
        setHistory(h);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            let newHistoryUpdates = {};
            let pendingAlerts = [];

            setSensors(prev => {
                const updated = { ...prev };

                Object.keys(prev).forEach(sensor => {
                    let newValue;

                    if (sensor === "Flamme") {
                        newValue = Math.random() > 0.97 ? 1 : 0;
                    } else {
                        newValue = parseFloat((prev[sensor] + (Math.random() - 0.5) * 5).toFixed(1));
                    }

                    updated[sensor] = newValue;
                    newHistoryUpdates[sensor] = { timestamp: Date.now(), value: newValue };

                    const { min, max } = thresholds[sensor];
                    if (newValue < min || newValue > max) {
                        pendingAlerts.push({
                            sensor,
                            message: `Valeur critique : ${newValue}`,
                            timestamp: new Date().toLocaleTimeString(),
                            type: "critical"
                        });
                    }
                });

                setHistory(prevH => {
                    const h = { ...prevH };
                    Object.keys(newHistoryUpdates).forEach(sensor => {
                        h[sensor] = [...h[sensor], newHistoryUpdates[sensor]];
                        if (h[sensor].length > 100) h[sensor].shift();
                    });
                    return h;
                });

                setAlerts(pendingAlerts);
                return updated;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
            
            {/* 🔥 APPBAR AVEC BOUTON HOME */}
            <AppBar position="static" sx={{ background: "#2ecc71" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Dashboard Serre IoT
                    </Typography>

                    <Button 
                        color="inherit"
                        onClick={() => setCurrentPage("home")}
                        sx={{ fontWeight: "bold" }}
                    >
                        Home
                    </Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ padding: 3 }}>
                {/* Cartes */}
                <Grid container spacing={4}>
                    {Object.keys(sensors).map(sensor => (
                        <Grid item xs={12} sm={6} md={4} key={sensor}>
                            <SensorCard
                                name={sensor}
                                value={sensors[sensor]}
                                min={thresholds[sensor].min}
                                max={thresholds[sensor].max}
                            />
                        </Grid>
                    ))}
                </Grid>

                {/* Mini Graphiques */}
                <Box mt={6}>
                    <Typography variant="h5" fontWeight="bold">Graphiques temps réel</Typography>

                    <Grid container spacing={2}>
                        {Object.keys(history).map(sensor => (
                            <Grid item xs={12} sm={6} md={2} key={sensor}>
                                <RealTimeMiniChart sensor={sensor} data={history[sensor]} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Graphiques détaillés */}
                <Box mt={6}>
                    <Typography variant="h5" fontWeight="bold">Historique détaillé</Typography>

                    {Object.keys(history).map(sensor => (
                        <Box key={sensor} sx={{ mb: 4 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h6">{sensor}</Typography>

                                <Button variant="contained" onClick={() => setZoomedChart(sensor)}>
                                    Zoom
                                </Button>
                            </Box>

                            <Box sx={{
                                width: "100%",
                                height: 350,
                                mt: 2,
                                backgroundColor: "white",
                                borderRadius: 3,
                                boxShadow: "0 6px 25px rgba(0,0,0,0.15)"
                            }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={history[sensor]}>
                                        <CartesianGrid strokeDasharray="5 5" />
                                        <XAxis dataKey="timestamp" tickFormatter={(t) => new Date(t).toLocaleTimeString()} />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="value" stroke="#2ecc71" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Zoom fullscreen */}
                <Dialog open={!!zoomedChart} maxWidth="lg" fullWidth>
                    <DialogTitle>
                        Zoom – {zoomedChart}
                        <IconButton sx={{ position: "absolute", right: 10 }} onClick={() => setZoomedChart(null)}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent>
                        {zoomedChart && (
                            <ResponsiveContainer width="100%" height={500}>
                                <LineChart data={history[zoomedChart]}>
                                    <CartesianGrid strokeDasharray="5 5" />
                                    <XAxis dataKey="timestamp" tickFormatter={(t) => new Date(t).toLocaleTimeString()} />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="value" stroke="#2ecc71" strokeWidth={3} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Alertes */}
                <Box mt={5}>
                    <AlertsPanel alerts={alerts} />
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
