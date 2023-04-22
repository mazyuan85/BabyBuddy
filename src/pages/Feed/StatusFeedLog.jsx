import { useState, useEffect } from "react";
import { useMediaQuery, Container, Box, Avatar, Typography, CircularProgress, List, ListItem, ListItemAvatar, ListItemText, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';




export default function StatusFeedLog ({user, activeBaby}) {
    const [feedLogs, setFeedLogs] = useState([]);
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
                const response = await fetch(`/api/main/feed?baby=${activeBaby._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setFeedLogs(data);
                } else {
                    setError('Retrieving Feed Logs Failed - Try Again');
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
        }}
        fetchData();
      }, [user, navigate]);

    const groupedLogs = feedLogs.reduce((acc, log) => {
        const date = dayjs(log.dateTime).format("L");
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(log);
        return acc;
    }, {});

  
    
    const generateChartData = (logs) => {
            return logs.reduce((acc, log) => {
                const date = dayjs(log.dateTime).format("L");
                if (!acc[date]) {
                    acc[date] = { date, breastDuration: 0, bottleVolume: 0 };
                }
                if (log.type === "breast") {
                acc[date].breastDuration += log.duration;
                } else if (log.type === "bottle") {
                acc[date].bottleVolume += log.volume;
                }
        
                return acc;
        }, {});
      };

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
      
    const breastDurationData = Object.values(generateChartData(feedLogs))
        .slice(visibleDataRange.start, visibleDataRange.end)
        .reverse()
        .map((entry) => ({
            ...entry,
            bottleVolume: undefined,
    }));
  
    const bottleVolumeData = Object.values(generateChartData(feedLogs))
        .slice(visibleDataRange.start, visibleDataRange.end)
        .reverse()
        .map((entry) => ({
            ...entry,
            breastDuration: undefined,
    }));
  
    const formatBritishDate = (tick) => {
        return dayjs(tick).format("DD/MM/YY");
    };

    const handleDelete = async (logId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`/api/main/feed/delete/${logId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.ok) {
                const remainingLogs = feedLogs.filter((log) => log._id !== logId);
                setFeedLogs(remainingLogs);
            } else {
                setError("Failed to delete feed log record");
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
                  <Link to="/main/feed/add">
                    <Avatar src="/images/breastfeedingicon.png" sx={{width:"100px", height:"100px"}} />
                  </Link>
                  <Typography variant="h6" sx={{marginTop: 2}}>{activeBaby.name}'s Feed Logs</Typography>
                  <Typography
                    variant="body2"
                    color="error"
                    align="center"
                    >
                    {error}
                </Typography>
                  <Box sx={{ width: "100%", mt: 3 }}>
                    <Typography variant="subtitle2">Breastfeeding (mins) /day</Typography>
                    <BarChart
                        width={isMobile ? 360 : 600}
                        height={200}
                        data={breastDurationData}
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
                        <Bar dataKey="breastDuration" fill="#82ca9d" />
                    </BarChart>
                    </Box>

                    <Box sx={{ width: "100%", mt: 3 }}>
                    <Typography variant="subtitle2">Bottle Volume (ml) /day</Typography>
                    <BarChart
                        width={isMobile ? 360 : 600}
                        height={200}
                        data={bottleVolumeData}
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
                        <Bar dataKey="bottleVolume" fill="#8884d8" />
                    </BarChart>
                    </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Button
                              disabled={visibleDataRange.end >= Object.values(generateChartData(feedLogs)).length}
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
                        {Object.entries(groupedLogs).map(([date, logs]) => (
                            <Box key={date}>
                            <Typography variant="subtitle1">{dayjs(date).format("DD MMM YYYY")}</Typography>
                            <List dense={true}>
                            {logs.map((log, index) => (
                                <ListItem key={index} secondaryAction={<IconButton edge="end" aria-label="delete" onClick={()=> handleClickOpen(log._id)}><DeleteIcon /></IconButton>}>
                                <Link to={`/main/feed/edit/${log._id}`} style={{ textDecoration: "none", color:"inherit"}}>
                                    <ListItemAvatar><Avatar src={log.type === "breast" ? "/images/breastfeedingicon.png" : log.type === "food" ? "/images/foodicon.png" : log.type === "medicine" ? "/images/medicineicon.png" : "/images/bottleicon.png"}></Avatar></ListItemAvatar>
                                </Link>
                                <Link to={`/main/feed/edit/${log._id}`} style={{ textDecoration: "none", color:"inherit"}}>
                                    <ListItemText primary={dayjs(log.dateTime).format("h:mm A")} secondary={log.type === "breast" ? `${log.duration} mins` : log.type === "bottle" ? `${log.volume} ml` : log.type === "food" ? log.food.join(", ") : log.type === "medicine" ? log.medicine : null}></ListItemText>
                                </Link>
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
            <DialogTitle>Delete Feed Log</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Are you sure you want to delete this feed log?
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