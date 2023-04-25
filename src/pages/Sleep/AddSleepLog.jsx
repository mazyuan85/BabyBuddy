import { useEffect, useState } from "react";
import { Typography, Container, Box, CircularProgress, Avatar, TextField, Button } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";

export default function AddSleepLog({activeBaby, user}) {
    const [isSleeping, setIsSleeping] = useState(false)
    const [sleepStartDateTime, setSleepStartTime] = useState(dayjs());
    const [sleepEndDateTime, setSleepEndDateTime] = useState(dayjs());
    const [sleepRemarks, setSleepRemarks] = useState("");
    const [isDateValid, setIsDateValid] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [sleepStatus, setSleepStatus] = useState(null);
    const location = useLocation();

    useEffect(() => {
    if (!user) {
        navigate("/");
        return;
    }
    const fetchSleepLog = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`/api/main/sleep/add/${activeBaby._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const sleepStatus = await response.json()
                if (!sleepStatus) {
                    setIsSleeping(false)
                } else if (sleepStatus.isSleeping=== false){
                    setIsSleeping(false);
                    setSleepRemarks("");
                    setSleepStatus(sleepStatus);
                } else {
                    setIsSleeping(true);
                    setSleepRemarks(sleepStatus.remarks);
                    setSleepStatus(sleepStatus);
                }
            } else {
                setError('Fetch Sleep Log Failed - Try Again');
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false);
        }
    }
    fetchSleepLog();
    }, [user, navigate, location, activeBaby]);
    
    function handleChange(event) {
    setSleepRemarks(event.target.value);
    setError('');
    }

    async function handleSubmit(event) {
    event.preventDefault();
    if (!isDateValid) {
        return setError("Please select a valid timing.")
    }
    if (!isSleeping) {
        if (!sleepStartDateTime) {
            return setError("Please select a valid timing.")
        }
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("/api/main/sleep/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ baby : activeBaby._id, remarks: sleepRemarks, startDateTime: sleepStartDateTime })
            });
            if (response.ok) {
                setIsSleeping(true)
                navigate("/main");
            } else {
                setError('Add Sleep Log Failed - Try Again');
            }
        } catch (err) {
            console.error(err);
        }  
    }
    if (isSleeping) {
        if (!sleepEndDateTime) {
            return setError("Please select a valid timing.")
        }
        if (sleepEndDateTime.isBefore(sleepStatus.startDateTime)) {
            return setError("Baby cannot wake up in the past!")
        }
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("/api/main/sleep/add", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ baby : activeBaby._id, remarks: sleepRemarks, endDateTime: sleepEndDateTime })
            });
            if (response.ok) {
                setIsSleeping(false);
                setSleepRemarks("");
                navigate("/main");
            } else {
                setError('Add Sleep Log Failed - Try Again');
            }
        } catch (err) {
            console.error(err);
        }  
    }
    }

    function handleStartDateTimeChange(newValue) {
        if (!newValue || !newValue.isValid()) {
          setIsDateValid(false);
        } else {
          setIsDateValid(true);
          setSleepStartTime(newValue);
        }
      }
    
      function handleEndDateTimeChange(newValue) {
        if (!newValue || !newValue.isValid()) {
          setIsDateValid(false);
        } else {
          setIsDateValid(true);
          setSleepEndDateTime(newValue);
        }
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
                  <Typography variant="h5">Add {activeBaby.name}'s Sleep Log</Typography>
                  <Avatar src={isSleeping ? "/images/sunicon.png" : "/images/sleepicon.png"} sx={{width:"90px", height:"90px", marginTop: 3}}/>
                  <Typography variant="subtitle1">{isSleeping ? `Sleeping since: ${dayjs(sleepStatus.startDateTime).format("h:mm A DD/MM/YY")}` : ""}</Typography>
                   <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        marginTop: 2,
                    }}
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    >
                    <TextField
                        label="Remarks:"
                        type="text"
                        name="remarks"
                        value={sleepRemarks}
                        onChange={handleChange}
                        margin="normal"
                        sx={{width:300}}
                    />
                    {!isSleeping ? (<MobileDateTimePicker
                        label="Input Sleep Start Time"
                        disableFuture
                        value={sleepStartDateTime}
                        onChange={handleStartDateTimeChange}
                        textField={
                            <TextField
                            onKeyDown={(e) => e.preventDefault()}
                            sx={{ marginTop: 2, width: "100%" }}
                            />
                        }
                        sx={{ marginTop: 4 }}
                    />
                    ) : (
                    <MobileDateTimePicker
                        label="Input Sleep End Time"
                        disableFuture
                        value={sleepEndDateTime}
                        onChange={handleEndDateTimeChange}
                        textField={
                            <TextField
                            onKeyDown={(e) => e.preventDefault()}
                            sx={{ marginTop: 2, width: "100%" }}
                            />
                        }
                        sx={{ marginTop: 4 }}
                    />)}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                    >
                        Add
                    </Button>
                    <Typography
                        variant="body2"
                        color="error"
                        align="center"
                        sx={{ marginTop: 5 }}
                    >
                        {error}
                    </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    </Container>
    )
}