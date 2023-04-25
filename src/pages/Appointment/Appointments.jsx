import { useState, useEffect } from "react";
import { Container, Box, Avatar, Typography, CircularProgress, List, ListItem, ListItemAvatar, ListItemText, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";


export default function Appointments ({user, activeBaby}) {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
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
                const response = await fetch(`/api/main/appointments?baby=${activeBaby._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setAppointments(data);
                } else {
                      setError('Retrieving Appointments Failed - Try Again');
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
        }}
        fetchData();
      }, [user, navigate]);

    const handleDelete = async (logId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`/api/main/appointments/delete/${logId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.ok) {
                const remainingAppointments = appointments.filter((log) => log._id !== logId);
                setAppointments(remainingAppointments);
            } else {
                setError("Failed to delete appointment record");
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
                  <Link to="/main/appointments/add">
                    <Avatar src="/images/medicalicon.png" sx={{width:"100px", height:"100px"}} />
                  </Link>
                  <Typography variant="h6" sx={{marginTop: 2}}>{activeBaby.name}'s Appointments</Typography>
                <Typography
                    variant="body2"
                    color="error"
                    align="center"
                    >
                    {error}
                </Typography>
                <List  sx={{width:"80%", marginTop: 2}}>
                    {appointments.map((log) => (
                  <Box key={log._id}>
                  <Typography variant="subtitle1">{dayjs(log.dateTime).format("DD MMM YYYY")}</Typography>
                  <List dense={true}>
                  <ListItem secondaryAction={<IconButton edge="end" aria-label="delete" onClick={()=> handleClickOpen(log._id)}><DeleteIcon /></IconButton>}>
                    <Link to={`/main/appointments/edit/${log._id}`} style={{ textDecoration: "none", color:"inherit"}}>
                       <ListItemAvatar><Avatar src={log.type === "vaccination" ? "/images/vaccinationicon.png" : "/images/medicalicon.png"}></Avatar></ListItemAvatar>
                    </Link>
                    <Link to={`/main/appointments/edit/${log._id}`} style={{ textDecoration: "none", color:"inherit"}}>
                      <ListItemText primary={dayjs(log.dateTime).format("h:mm A")} secondary={log.remarks ? log.remarks : null}></ListItemText>
                    </Link>
                  </ListItem>
      
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
                Are you sure you want to delete this appointment?
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