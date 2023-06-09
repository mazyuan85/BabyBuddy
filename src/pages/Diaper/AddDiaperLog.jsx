import { useEffect, useState } from "react";
import { Typography, Container, Box, Avatar, TextField, Button } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function AddDiaperLog({activeBaby, user}) {
      const [diaperType, setDiaperType] = useState("");
      const [diaperRemarks, setDiaperRemarks] = useState("");
      const [diaperTime, setDiaperTime] = useState(dayjs());
      const [isDateValid, setIsDateValid] = useState(true);
      const [error, setError] = useState('');
      const navigate = useNavigate();

      useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
      }, [user, navigate]);
      
      function handleChange(event) {
        setDiaperRemarks(event.target.value);
        setError('');
      }
    
      async function handleSubmit(event) {
        event.preventDefault();
        if (!diaperType) {
            return setError("Please select pee or poo!")
        }
        if (!diaperTime) {
            return setError("Please select a timing.")
        }
        if (!isDateValid) {
            return setError("Please select a valid timing.")
        }
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("/api/main/diaper/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ baby : activeBaby._id, type: diaperType, remarks: diaperRemarks, dateTime: diaperTime })
            });
            if (response.ok) {
                navigate("/main");
            } else {
                setError('Add Diaper Log Failed - Try Again');
            }
        } catch (err) {
            console.error(err);
        }
      }

      function handleDateTimeChange(newValue) {
        if (!newValue || !newValue.isValid()) {
          setIsDateValid(false);
        } else {
          setIsDateValid(true);
          setDiaperTime(newValue);
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
                  <Typography variant="h5">Add {activeBaby.name}'s Diaper Log</Typography>
                  <Box sx={{display:"flex", width:"100%", justifyContent:"space-evenly", marginTop:3}}>
                    <Avatar src="/images/peeicon.png" sx={{width:"90px", height:"90px", cursor:"pointer", border: diaperType === "pee" ? "2px solid #3f51b5" : "none" }} onClick={()=> setDiaperType("pee")}/>
                    <Avatar src="/images/pooicon.png" sx={{width:"90px", height:"90px", cursor:"pointer", border: diaperType === "poo" ? "2px solid #3f51b5" : "none"}} onClick={()=> setDiaperType("poo")}/>
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
                        value={diaperRemarks}
                        onChange={handleChange}
                        margin="normal"
                        sx={{width:300}}
                    />
                    <MobileDateTimePicker
                        label="Change Diaper Timing"
                        disableFuture
                        value={diaperTime}
                        onChange={handleDateTimeChange}
                        textField={
                            <TextField
                            onKeyDown={(e)=>e.preventDefault()}
                            sx={{ marginTop: 2, width: "100%"}}
                            />
                        }
                        sx={{ marginTop: 4}}
                    />
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