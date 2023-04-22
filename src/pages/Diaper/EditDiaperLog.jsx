import { useEffect, useState } from "react";
import { Typography, Container, Box, CircularProgress, Avatar, TextField, Button } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

export default function EditDiaperLog({activeBaby, user}) {
      const [diaperType, setDiaperType] = useState("");
      const [diaperRemarks, setDiaperRemarks] = useState("");
      const [diaperTime, setDiaperTime] = useState(dayjs());
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
        const fetchDiaperLog = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`/api/main/diaper/edit/${id}`,{
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                })
                if (response.ok) {
                    const responseBody = await response.json();
                    setDiaperRemarks(responseBody.remarks);
                    setDiaperTime(dayjs(responseBody.dateTime));
                    setDiaperType(responseBody.type)
                }
                else {
                    setError('Retrieving Diaper Log Failed - Try Again');
                }
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false);
            }
        }
        fetchDiaperLog();
      }, [id, user, navigate]);
      
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
            const response = await fetch(`/api/main/diaper/edit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ type: diaperType, remarks: diaperRemarks, dateTime: diaperTime })
            });
            if (response.ok) {
                navigate("/main/diaper");
            } else {
                setError('Edit Diaper Log Failed - Try Again');
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
            {isLoading ? (
                <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems:"center" }}>
                  <Typography variant="h5">Edit {activeBaby.name}'s Diaper Log</Typography>
                  <Typography
                    variant="body2"
                    color="error"
                    align="center"
                    >
                    {error}
                </Typography>
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
                        Save
                    </Button>
                    </Box>
                </Box>
            )}
        </Box>
    </Container>
    )
}