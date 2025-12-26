// src/components/AlertsPanel.js
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const AlertsPanel = ({ alerts }) => {
    if (!alerts || alerts.length === 0) {
        return (
            <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: '#e0f7fa' }}>
                <Typography>Aucune alerte pour le moment.</Typography>
            </Paper>
        );
    }

    return (
        <Box>
            {alerts.map((alert, index) => (
                <Paper
                    key={index}
                    sx={{
                        p: 2,
                        mb: 2,
                        borderRadius: 3,
                        backgroundColor: alert.type === 'critical' ? '#ffebee' : '#e8f5e9',
                        borderLeft: `5px solid ${alert.type === 'critical' ? '#f44336' : '#4caf50'}`
                    }}
                >
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {alert.sensor} - {alert.type === 'critical' ? 'CRITIQUE' : 'NORMAL'}
                    </Typography>
                    <Typography variant="body2">{alert.message}</Typography>
                    <Typography variant="caption">{alert.timestamp}</Typography>
                </Paper>
            ))}
        </Box>
    );
};

export default AlertsPanel;
