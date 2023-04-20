import { useState, useEffect } from "react";
import { useMediaQuery, Container, Box, Avatar, Typography, CircularProgress, List, ListItem, ListItemAvatar, ListItemText, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';




export default function StatusSleepLog ({user, activeBaby}) {
    const [sleepLogs, setSleepLogs] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedLogId, setSelectedLogId] = useState(null);
    const [visibleDataRange, setVisibleDataRange] = useState({ start: 0, end: 7 });
    const isMobile = useMediaQuery("(max-width:600px)"); 
    const navigate = useNavigate();


    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
        async function fetchData() {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`/api/main/sleep?baby=${activeBaby._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setSleepLogs(data);
                } else {
                    navigate("/");
                    setError('Retrieving Diaper Logs Failed - Try Again');
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
        }}
        fetchData();
      }, [user, navigate]);

    const groupedLogs = sleepLogs.reduce((acc, log) => {
        const key = dayjs(log.startDateTime).format("L");
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push({
            ...log,
            displayTime: log.startDateTime,
            isSleeping: true,
        });

        if (log.endDateTime) {
            const endKey = dayjs(log.endDateTime).format("L");
            if (!acc[endKey]) {
                acc[endKey] = [];
            }
            acc[endKey].push({
                ...log,
                displayTime: log.endDateTime,
                isSleeping: false,
            })
        }
        return acc;
    }, {});

    Object.entries(groupedLogs).forEach(([date, logs]) => {
        logs.sort((a, b) => new Date(b.displayTime) - new Date(a.displayTime));
    });

    const sortedGroupedLogs = Object.fromEntries(
        Object.entries(groupedLogs).sort((a, b) => new Date(b[0]) - new Date(a[0]))
      );

    
    const generateChartData = (logs) => {
        return logs.reduce((acc, log) => {
            const start = dayjs(log.startDateTime);
            const end = dayjs(log.endDateTime || new Date());
        
            let currentDate = start.startOf('day');
            while (currentDate.isBefore(end, 'day') || currentDate.isSame(end, 'day')) {
              const date = currentDate.format("L");
              if (!acc[date]) {
                acc[date] = { date, hoursPerDay: 0 };
              }
        
              let currentStartDate = start.isSame(currentDate, 'day') ? start : currentDate.clone().startOf('day');
              let currentEndDate = currentDate.clone().endOf('day');
              if (end.isBefore(currentEndDate)) {
                currentEndDate = end;
              }
              
              const durationInHours = currentEndDate.diff(currentStartDate, 'hour');
              acc[date].hoursPerDay += durationInHours;
        
              currentDate = currentDate.add(1, 'day').startOf('day');
            }
        
            return acc;
          }, {});
      };

    const sleepDurationData = Object.values(generateChartData(sleepLogs))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(visibleDataRange.start, visibleDataRange.end)
        .reverse();

    const updateVisibleDataRange = (direction) => {
        const newDataRange = { ...visibleDataRange };
        if (direction === "right") {
            newDataRange.start -= 7;
            newDataRange.end -= 7;
        } else {
            newDataRange.start += 7;
            newDataRange.end += 7;
        }
        setVisibleDataRange(newDataRange);
    };
      
 
    const formatBritishDate = (tick) => {
        return dayjs(tick).format("DD/MM/YY");
    };

    const handleDelete = async (logId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`/api/main/sleep/delete/${logId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.ok) {
                const remainingLogs = sleepLogs.filter((log) => log._id !== logId);
                setSleepLogs(remainingLogs);
            } else {
                throw new Error("Failed to delete diaper log record");
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
        <Container maxWidth="sm" disableGutters>
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "flex-start",
            minHeight: '100vh',
            paddingTop: theme => theme.spacing(4),
            }}
        >
            {isLoading ? (
                <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems:"center" }}>
                  <Link to="/main/sleep/add">
                    <Avatar src="/images/sleepicon.png" sx={{width:"100px", height:"100px"}} />
                  </Link>
                  <Typography variant="h6" sx={{marginTop: 2}}>{activeBaby.name}'s Sleep Logs</Typography>
                  <Box sx={{ width: "100%", mt: 3 }}>
                    <Typography variant="subtitle2">Sleep Duration (hours) /day</Typography>
                    <BarChart
                        width={isMobile ? 360 : 600}
                        height={200}
                        data={sleepDurationData}
                        margin={{
                            top: 15,
                            right: 30,
                            left: 5,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={formatBritishDate}/>
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="hoursPerDay" fill="#82ca9d" />
                    </BarChart>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Button
                              disabled={visibleDataRange.end >= Object.values(generateChartData(sleepLogs)).length}
                              onClick={() => updateVisibleDataRange("left")}
                          >
                              &lt; Previous
                          </Button>
                          <Button
                              disabled={visibleDataRange.start === 0}
                              onClick={() => updateVisibleDataRange("right")}
                          >
                              Next &gt;
                          </Button>
                          </Box> 
                  <List  sx={{width:"80%"}}>
                    {Object.entries(sortedGroupedLogs).map(([date, logs]) => (
                    <Box key={date}>
                        <Typography variant="subtitle1">{dayjs(date).format("DD MMM YYYY")}</Typography>
                        <List dense={true}>
                        {logs.map((log, index) => (
                            <ListItem key={index} secondaryAction={<IconButton edge="end" aria-label="delete" onClick={()=> handleClickOpen(log._id)}><DeleteIcon /></IconButton>}>
                            <ListItemAvatar><Avatar src={log.isSleeping ? "/images/sleepicon.png" : "/images/sunicon.png"}></Avatar></ListItemAvatar>
                            <ListItemText primary={dayjs(log.displayTime).format("h:mm A")} secondary={log.remarks ? log.remarks : null}></ListItemText>
                            </ListItem>
                        ))}
                        </List>
                    </Box>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete Sleep Log</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Are you sure you want to delete this sleep log?
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
    )
}