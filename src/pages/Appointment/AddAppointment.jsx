import { useState, useEffect } from "react"
import { Typography, Container, Box, Avatar, TextField, Button, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";


export default function AddAppointment({activeBaby, user}) {
    const [appointmentType, setAppointmentType] = useState("");
    const [appointmentRemarks, setAppointmentRemarks] = useState("");
    const [appointmentTime, setAppointmentTime] = useState(dayjs());
    const [isDateValid, setIsDateValid] = useState(true);
    const [sendReminder, setSendReminder] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
    }, [user, navigate]);

    function handleChange(event) {
        setAppointmentRemarks(event.target.value);
        setError('');
    }

    function handleCheckboxChange(event) {
        setSendReminder(event.target.checked);
    }

    function handleDateTimeChange(newValue) {
        if (!newValue || !newValue.isValid()) {
          setIsDateValid(false);
        } else {
          setIsDateValid(true);
          setAppointmentTime(newValue);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!appointmentType) {
            return setError("Please select an appointment type!")
        }
        if (!appointmentTime) {
            return setError("Please select an appointment timing.")
        }
        if (!isDateValid) {
            return setError("Please select a valid timing.")
        }
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("/api/main/appointments/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ baby : activeBaby._id, type: appointmentType, remarks: appointmentRemarks, dateTime: appointmentTime, sendReminder: sendReminder })
            });
            if (response.ok) {
                navigate("/main/appointments");
            } else {
                setError('Add Appointment Log Failed - Try Again');
            }
        } catch (err) {
            console.error(err);
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
                <Box sx={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems:"center" }}>
                  <Typography variant="h5">Add {activeBaby.name}'s Appointment</Typography>
                  <Box sx={{display:"flex", width:"100%", justifyContent:"space-evenly", marginTop:3}}>
                    <Avatar src="/images/vaccinationicon.png" sx={{width:"90px", height:"90px", cursor:"pointer", border: appointmentType === "vaccination" ? "2px solid #3f51b5" : "none" }} onClick={()=> setAppointmentType("vaccination")}/>
                    <Avatar src="/images/medicalicon.png" sx={{width:"90px", height:"90px", cursor:"pointer", border: appointmentType === "medical" ? "2px solid #3f51b5" : "none"}} onClick={()=> setAppointmentType("medical")}/>
                  </Box>
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
                        value={appointmentRemarks}
                        onChange={handleChange}
                        margin="normal"
                        sx={{width:300}}
                    />
                    <MobileDateTimePicker
                        label="Change Appointment Timing"
                        value={appointmentTime}
                        onChange={handleDateTimeChange}
                        textField={
                            <TextField
                            onKeyDown={(e)=>e.preventDefault()}
                            sx={{ marginTop: 2, width: "100%"}}
                            />
                        }
                        sx={{ marginTop: 4}}
                    />
                    <FormGroup sx={{marginTop: 2}}>
                        <FormControlLabel control={<Checkbox onChange={handleCheckboxChange}/>} label={<Typography variant="subtitle2">Receive email reminder on day of appointment</Typography>} />
                    </FormGroup>
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
        </Box>
    </Container>
    )
}