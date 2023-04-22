import React, { useState, useEffect } from 'react';
import { useMediaQuery, Container, Box, Grid, Tab, Tabs, Avatar, Accordion, AccordionSummary, AccordionDetails, Typography, Switch, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import milestones from "./milestones"
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';


export default function MilestoneChecklist({user, activeBaby}) {
  const [tabValue, setTabValue] = useState(0);
  const [completedMilestones, setCompletedMilestones] = useState([])
  const isMobile = useMediaQuery("(max-width:600px)");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  

  useEffect(() => {
    if (!user) {
        navigate("/");
        return;
    }
    async function fetchData() {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`/api/main/milestones?baby=${activeBaby._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                setCompletedMilestones(data);
            } else {
                setError('Retrieving Milestones Failed - Try Again');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
    }}
    fetchData();
  }, [user, navigate]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const calculateAgeInMonths = (birthdate) => {
    const now = dayjs();
    const birth = dayjs(birthdate);
    const months = now.diff(birth, 'month');
    return months;
  };

  const handleToggle = async (milestoneId, checked) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/main/milestones?baby=${activeBaby._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ completedMilestones: milestoneId, checked }),
        });
    
        if (!response.ok) {
          setError('Failed to update milestone status');
        }

        const updatedMilestones = await response.json();
        setCompletedMilestones(updatedMilestones.completedMilestones);
      } catch (error) {
        console.error('Error updating milestone status:', error);
      }
};

  const filteredMilestones = milestones.filter(milestone => milestone.ageTab === tabValue);

  return (
    <Container maxWidth="md" disableGutters>
                 {isLoading ? (
                <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
        <Grid container spacing={4}>
        <Grid item xs={12}>
            <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            >
            <Tab label="1-2 Months" />
            <Tab label="3-5 Months" />
            <Tab label="6-12 Months" />
            <Tab label="15-18 Months" />
            </Tabs>
        </Grid>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems:"center", marginTop: 2 }}>
        <Typography variant="h6">{activeBaby.name}'s Milestones</Typography>
        <Typography
                    variant="body2"
                    color="error"
                    align="center"
                    >
                    {error}
                </Typography>
        <Avatar src={activeBaby?.imageURL} sx={{width: isMobile ? "120px" : "180px", height: isMobile? "120px" : "180px", marginTop: 1}} />
        <Typography variant="body1" sx={{marginTop:2}}>{calculateAgeInMonths(activeBaby.dateOfBirth)} Month(s) Old</Typography>
        </Box>
        <Grid item xs={12}>
            {filteredMilestones.map((milestone) => {
                const isCompleted = completedMilestones.includes(milestone.id)
                
                return (
            <Accordion key={milestone.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography>{milestone.title}</Typography>
                        </Grid>
                        <Grid item>
                            <Switch
                                checked={isCompleted}
                                onChange={(event) => {event.stopPropagation(); handleToggle(milestone.id, event.target.checked)}}
                                onClick={(event) => event.stopPropagation()}
                            />
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
        <Grid container justifyContent="space-between">
            <Grid item>
            <Typography variant="body2">{milestone.description}</Typography>
            </Grid>
        </Grid>
        </AccordionDetails>
    </Accordion>)
})}
</Grid>

        </Grid>)}
    </Container>
  );
}

