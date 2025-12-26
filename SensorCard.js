// src/components/SensorCard.js
import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';

const SensorCard = ({ name, value, min, max }) => {
  const getUnit = () => {
    switch (name) {
      case "Temperature": return "°C";
      case "Humidite":
      case "Humidite de sol": return "%";
      case "Luminosite": return "lux";
      default: return "";
    }
  };

  const progress = max > min ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {value}{getUnit()}
        </Typography>

        {name !== "Flamme" ? (
          <>
            <LinearProgress
              variant="determinate"
              value={Math.min(Math.max(progress, 0), 100)}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </>
        ) : (
          <Typography color={value === 1 ? "error" : "success"}>
            {value === 1 ? "🔥 Flamme détectée" : "✔ Pas de flamme"}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};


export default SensorCard;
