import { useState, useEffect } from "react";
import { useMediaQuery, Container, Box, Avatar, Typography, CircularProgress, List, ListItem, ListItemAvatar, ListItemText, IconButton } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';




export default function StatusDiaperLog ({user, activeBaby}) {
    const [diaperLogs, setDiaperLogs] = useState([]);
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
                const response = await fetch(`/api/main/diaper?baby=${activeBaby._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setDiaperLogs(data);
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

    const groupedLogs = diaperLogs.reduce((acc, log) => {
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
                        acc[date] = { date, poo: 0, pee: 0 };
          }

          acc[date][log.type]++;
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
      
    const pooFrequencyData = Object.values(generateChartData(diaperLogs))
        .slice(visibleDataRange.start, visibleDataRange.end)
        .reverse()
        .map((entry) => ({
            ...entry,
            pee: undefined,
    }));
  
    const peeFrequencyData = Object.values(generateChartData(diaperLogs))
        .slice(visibleDataRange.start, visibleDataRange.end)
        .reverse()
        .map((entry) => ({
            ...entry,
            poo: undefined,
    }));
  
    const formatBritishDate = (tick) => {
        return dayjs(tick).format("DD/MM/YY");
    };

    const handleDelete = async (logId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`/api/main/diaper/delete/${logId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.ok) {
                const remainingLogs = diaperLogs.filter((log) => log._id !== logId);
                setDiaperLogs(remainingLogs);
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
                  <Link to="/main/diaper/add">
                    <Avatar src="/images/diapericon.png" sx={{width:"100px", height:"100px"}} />
                  </Link>
                  <Typography variant="h6" sx={{marginTop: 2}}>{activeBaby.name}'s Diaper Logs</Typography>
                  <Box sx={{ width: "100%", mt: 3 }}>
                    <Typography variant="subtitle2">Poo Frequency Per Day</Typography>
                    <BarChart
                        width={isMobile ? 360 : 600}
                        height={200}
                        data={pooFrequencyData}
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
                        <Bar dataKey="poo" fill="#82ca9d" />
                    </BarChart>
                    </Box>

                    <Box sx={{ width: "100%", mt: 3 }}>
                    <Typography variant="subtitle2">Pee Frequency Per Day</Typography>
                    <BarChart
                        width={isMobile ? 360 : 600}
                        height={200}
                        data={peeFrequencyData}
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
                        <Bar dataKey="pee" fill="#8884d8" />
                    </BarChart>
                    </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Button
                              disabled={visibleDataRange.end >= Object.values(generateChartData(diaperLogs)).length}
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
                            <Link to={`/main/diaper/edit/${log._id}`} style={{ textDecoration: "none", color:"inherit"}}>
                                <ListItemAvatar><Avatar src={log.type === "pee" ? "/images/peeicon.png" : "/images/pooicon.png"}></Avatar></ListItemAvatar>
                            </Link>
                            <Link to={`/main/diaper/edit/${log._id}`} style={{ textDecoration: "none", color:"inherit"}}>
                                <ListItemText primary={dayjs(log.dateTime).format("h:mm A")} secondary={log.remarks ? log.remarks : null}></ListItemText>
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
            <DialogTitle>Delete Diaper Log</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Are you sure you want to delete this diaper log?
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