import { useEffect, useState } from "react";
import { Typography, Container, Box, CircularProgress, Avatar, TextField, Button, useMediaQuery, FormControl } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function AddGrowthLog({activeBaby, user}) {
      const [growthWeight, setGrowthWeight] = useState(0);
      const [growthHeight, setGrowthHeight] = useState(0);
      const [growthDate, setGrowthDate] = useState(dayjs());
      const [isDateValid, setIsDateValid] = useState(true);
      const [error, setError] = useState('');
      const navigate = useNavigate();
      const isMobile = useMediaQuery("(max-width:600px)");

      useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
      }, [user, navigate]);
      
    
      async function handleSubmit(event) {
        event.preventDefault();
        if (growthDate.isBefore(activeBaby.dateOfBirth)) {
            return setError("Please enter a date after baby's birthday!")
        }
        if (!growthDate || !growthHeight || !growthWeight) {
            return setError("Please check all inputs.")
        }
        if (!isDateValid) {
            return setError("Please select a valid timing.")
        }
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("/api/main/growthtracker/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ baby : activeBaby._id, weight: growthWeight, height: growthHeight, date: growthDate })
            });
            if (response.ok) {
                navigate("/main/growthtracker");
            } else {
                setError('Add Growth Log Failed - Try Again');
            }
        } catch (err) {
            console.error(err);
        }
      }

      function handleDateChange(newValue) {
        if (!newValue || !newValue.isValid()) {
          setIsDateValid(false);
        } else {
          setIsDateValid(true);
          setGrowthDate(newValue);
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
                  <Typography variant="h5">Add {activeBaby.name}'s Growth Log</Typography>
                  <Avatar src="/images/growthicon.png" sx={{width: isMobile ? "120px" : "180px", height: isMobile? "120px" : "180px", marginTop: 1}} />
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
                    <FormControl sx={{marginTop:2, width:"130px"}}>
                    <TextField
                        label="Height (cm)"
                        type="number"
                        variant="outlined"
                        value={growthHeight}
                        onChange={(e) => setGrowthHeight(e.target.value)}
                        InputProps={{ inputProps: { min: 0, max: 120, step: "any" } }}
                        />
                    </FormControl>
                    <FormControl sx={{marginTop:2, width:"130px"}}>
                        <TextField
                        label="Weight (kg)"
                        type="number"
                        variant="outlined"
                        value={growthWeight}
                        onChange={(e) => setGrowthWeight(e.target.value)}
                        InputProps={{ inputProps: { min: 0, max: 20, step: "any"} }}
                        />
                     </FormControl>
                    <MobileDatePicker
                        label="Date of measurement"
                        disableFuture
                        value={growthDate}
                        onChange={handleDateChange}
                        textField={
                            <TextField
                            onKeyDown={(e)=>e.preventDefault()}
                            sx={{ marginTop: 2, width: "100%"}}
                            />
                        }
                        sx={{ marginTop: 4, width:"50%"}}
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