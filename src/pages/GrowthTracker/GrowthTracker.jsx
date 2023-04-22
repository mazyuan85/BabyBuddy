import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Container, useMediaQuery, Grid, Tabs, Tab, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, CircularProgress, Typography, List, ListItem, ListItemAvatar, ListItemText, IconButton } from "@mui/material";
import referenceDataHeightFemale from "./referenceDataHeightFemale";
import referenceDataHeightMale from "./referenceDataHeightMale";
import referenceDataWeightFemale from "./referenceDataWeightFemale";
import referenceDataWeightMale from "./referenceDataWeightMale";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import DeleteIcon from '@mui/icons-material/Delete';

dayjs.extend(duration);

export default function GrowthTracker({user, activeBaby}) {
    const isMobile = useMediaQuery("(max-width:600px)");
    const [tabValue, setTabValue] = useState(0);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [babyData, setBabyData] = useState([]);
    const [selectedLogId, setSelectedLogId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      if (!user) {
        navigate("/");
        return;
      }
      async function fetchData() {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`/api/main/growthtracker?baby=${activeBaby._id}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
              },
          });
          if (response.ok) {
              const data = await response.json();
              setBabyData(data);
            } else {
              setError('Retrieving Growth Logs Failed - Try Again');
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

    const handleDelete = async (logId) => {
      try {
          const token = localStorage.getItem("token");
          const response = await fetch(`/api/main/growthtracker/delete/${logId}`, {
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
              },
          });

          if (response.ok) {
              const remainingLogs = babyData.filter((log) => log._id !== logId);
              setBabyData(remainingLogs);
          } else {
              setError("Failed to delete growth log record");
          }
      } catch (err) {
          console.error(err);
      }
    }

    const handleClickOpen = (logId) => {
        setSelectedLogId(logId);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleConfirm = () => {
        if (selectedLogId) {
            handleDelete(selectedLogId);
            setSelectedLogId(null);
        }
        handleClose();
    }
      
    return (
        <Container maxWidth="md" disableGutters>
            {isLoading ? (
              <Box sx={{ marginTop: 4, display: 'flex', flexDirection: "column", justifyContent: 'flex-start', alignItems:"center" }}>
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
              <Tab label="Height Graph" />
              <Tab label="Weight Graph" />
              </Tabs>
          </Grid>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems:"center", marginTop: 2 }}>
              <Typography variant="subtitle2">{activeBaby.name}'s {tabValue===0 ? "height" : "weight"} logs - {activeBaby.gender}</Typography>
              <Typography
                  variant="body2"
                  color="error"
                  align="center"
                  >
                  {error}
              </Typography>
            <LineChart
              width={isMobile? 360 : 900}
              height={isMobile? 500 : 900}
              data={(activeBaby.gender === "male" && tabValue === 0) ? referenceDataHeightMale : (activeBaby.gender === "female" && tabValue === 0) ? referenceDataHeightFemale : (activeBaby.gender === "male" && tabValue === 1) ? referenceDataWeightMale : referenceDataWeightFemale}
              margin={{
                top: 5,
                right: 15,
                left: isMobile? 10: 50,
                bottom: 5,
              }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" domain={[0, 24]} type="number" allowDataOverflow={true} />
            <YAxis domain={(tabValue === 0) ? [42,96] : [0,16]} />
            <Tooltip />
            <Legend />
            <Line type="monotoneX" dataKey="p3" stroke="#4d4dff" activeDot={false} dot={false} />
            <Line type="monotoneX" dataKey="p10" stroke="#1f9dff" activeDot={false} dot={false} />
            <Line type="monotoneX" dataKey="p25" stroke="#23db9a" activeDot={false} dot={false} />
            <Line type="monotoneX" dataKey="p50" stroke="#ffbc42" activeDot={false} dot={false} />
            <Line type="monotoneX" dataKey="p75" stroke="#f76b8a" activeDot={false} dot={false} />
            <Line type="monotoneX" dataKey="p90" stroke="#d147a3" activeDot={false} dot={false} />
            <Line type="monotoneX" dataKey="p97" stroke="#844dff" activeDot={false} dot={false} />
            <Line
            type="monotoneX"
            data={babyData.map((dataPoint) => ({
              age: dayjs.duration(dayjs(dataPoint.date).diff(dayjs(activeBaby.dateOfBirth))).asMonths().toFixed(2), // Convert date difference to months
              value: tabValue === 0 ? dataPoint.height : dataPoint.weight,
            }))}
            dataKey="value"
            stroke="#000"
            dot={true}
            isAnimationActive={false}
          />
          </LineChart>
          <List  sx={{width:"80%", paddingLeft: 5}}>
              {babyData.slice().reverse().map((log) => (
                  <Box key={log._id}>
                  <Typography variant="subtitle1">{dayjs(log.date).format("DD MMM YYYY")}</Typography>
                  <List dense={true}>
                  <ListItem secondaryAction={<IconButton edge="end" aria-label="delete" onClick={()=> handleClickOpen(log._id)}><DeleteIcon /></IconButton>}>
                        <ListItemText primary={`Height: ${log.height}cm, Weight: ${log.weight}kg`}></ListItemText>
                  </ListItem>
      
              </List>
              </Box>
                        ))}
            </List>
          </Box>
        </Grid>
            )}
          <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Delete Growth Log</DialogTitle>
              <DialogContent>
                  <DialogContentText>
                  Are you sure you want to delete this growth log?
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose} color="primary">
                  Cancel
                  </Button>
                  <Button onClick={handleConfirm} color="secondary">
                  Delete
                  </Button>
              </DialogActions>
          </Dialog>
        </Container>
      );
}