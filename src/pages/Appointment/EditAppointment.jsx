import { useEffect, useState } from "react";
import { Typography, Container, Box, CircularProgress, Avatar, TextField, Button, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

export default function EditAppointment({activeBaby, user}) {
      const [appointmentType, setAppointmentType] = useState("");
      const [appointmentRemarks, setAppointmentRemarks] = useState("");
      const [appointmentTime, setAppointmentTime] = useState(dayjs());
      const [sendReminder, setSendReminder] = useState(false);
      const [isDateValid, setIsDateValid] = useState(true);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState('');
      const navigate = useNavigate();
      const { id } = useParams();

      useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
        const fetchAppointment = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`/api/main/appointments/edit/${id}`,{
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                })
                if (response.ok) {
                    const responseBody = await response.json();
                    setAppointmentRemarks(responseBody.remarks);
                    setAppointmentTime(dayjs(responseBody.dateTime));
                    setAppointmentType(responseBody.type);
                    setSendReminder(responseBody.sendReminder);
                }
                else {
                    setError('Retrieving Appointment Failed - Try Again');
                }
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false);
            }
        }
        fetchAppointment();
      }, [id, user, navigate]);
      
      function handleChange(event) {
        setAppointmentRemarks(event.target.value);
        setError('');
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
            const response = await fetch(`/api/main/appointments/edit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ type: appointmentType, remarks: appointmentRemarks, dateTime: appointmentTime, sendReminder: sendReminder })
            });
            if (response.ok) {
                navigate("/main/appointments");
            } else {
                setError('Edit Appointment Failed - Try Again');
            }
        } catch (err) {
            console.error(err);
        }
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
                  <Typography variant="h5">Edit {activeBaby.name}'s Appointment</Typography>
                  <Typography
                    variant="body2"
                    color="error"
                    align="center"
                    >
                    {error}
                </Typography>
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
                        <FormControlLabel control={<Checkbox checked={sendReminder} onChange={handleCheckboxChange}/>} label={<Typography variant="subtitle2">Receive email reminder on day of appointment</Typography>} />
                    </FormGroup>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                    >
                        Save
                    </Button>
                    </Box>
                </Box>
            )}
        </Box>
    </Container>
    )
}