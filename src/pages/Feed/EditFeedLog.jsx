import { useEffect, useState } from "react";
import { Typography, Container, Box, CircularProgress, Avatar, TextField, Button, Select, MenuItem, InputLabel, Grid, Chip } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

export default function EditFeedLog({activeBaby, user}) {
      const [feedType, setFeedType] = useState("");
      const [feedRemarks, setFeedRemarks] = useState("");
      const [feedTime, setFeedTime] = useState(dayjs());
      const [feedDuration, setFeedDuration] = useState("");
      const [feedVolume, setFeedVolume] = useState("");
      const [feedFood, setFeedFood] = useState([]);
      const [feedMedicine, setFeedMedicine] = useState("");
      const [isDateValid, setIsDateValid] = useState(true);
      const [error, setError] = useState('');
      const [isLoading, setIsLoading] = useState(true);
      const navigate = useNavigate();
      const { id } = useParams();

      useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
        const fetchFeedLog = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`/api/main/feed/edit/${id}`,{
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                })
                if (response.ok) {
                    const responseBody = await response.json();
                    setFeedRemarks(responseBody.remarks);
                    setFeedTime(dayjs(responseBody.dateTime));
                    setFeedType(responseBody.type);
                    setFeedDuration(responseBody.duration ?? "");
                    setFeedVolume(responseBody.volume ?? "");
                    setFeedFood(responseBody.food ?? [])
                    setFeedMedicine(responseBody.medicine ?? "");
                    
                }
                else {
                    setError('Retrieving Feed Log Failed - Try Again');
                }
            } catch (err) {
                console.log(err)
            } finally {
              setIsLoading(false);
            }
        }
        fetchFeedLog();
      }, [id, user, navigate]);

     
      function handleChange(event) {
        setFeedRemarks(event.target.value);
        setError('');
      }
    
      async function handleSubmit(event) {
        event.preventDefault();
        if (!feedType) {
            return setError("Please select a feed type!")
        }
        if (!feedTime) {
            return setError("Please select a timing.")
        }
        if (!isDateValid) {
            return setError("Please select a valid timing.")
        }
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`/api/main/feed/edit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ type: feedType, remarks: feedRemarks, dateTime: feedTime, duration: feedType === "breast" ? feedDuration : "", volume: feedType === "bottle" ? feedVolume : "", food: feedType === "food" ? feedFood : [], medicine: feedType === "medicine" ? feedMedicine : ""})
            });
            if (response.ok) {
                navigate("/main/feed");
            } else {
                setError('Edit Feed Log Failed - Try Again');
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
          setFeedTime(newValue);
        }
      }

      function handleDurationChange(event) {
        setFeedDuration(event.target.value);
      }
      
      // create an Array for duration options with first element _ is ignored as current value isn't important, i starts at 0
      const durationOptions = Array.from({length: 60}, (_, i) => i + 1);

      function handleVolumeChange(event) {
        setFeedVolume(event.target.value);
      }

      const volumeOptions = Array.from({length: 30}, (_, i) => (i+1) * 10);

      const foodOptions = ["fruit", "meat", "veg", "porridge", "cereal", "milk", "juice", "egg", "fish", "soup", "others"];

      const handleFoodChange = (food) => {
        if (feedFood.includes(food)) {
            setFeedFood(feedFood.filter(f => f !== food));
        } else {
            setFeedFood([...feedFood, food]);
        }
      };

      const medicineOptions = ["paracetamol", "vitamins", "others"];

      const handleMedicineChange = (medicine) => {
        setFeedMedicine(medicine);
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
                  <Typography variant="h5">Edit {activeBaby.name}'s Feed Log</Typography>
                  <Typography
                    variant="body2"
                    color="error"
                    align="center"
                    >
                    {error}
                </Typography>
                  <Box sx={{display:"flex", width:"100%", justifyContent:"space-evenly", marginTop:3}}>
                    <Avatar src="/images/breastfeedingicon.png" sx={{width:"60px", height:"60px", cursor:"pointer", border: feedType === "breast" ? "2px solid #3f51b5" : "none" }} onClick={()=> setFeedType("breast")}/>
                    <Avatar src="/images/bottleicon.png" sx={{width:"60px", height:"60px", cursor:"pointer", border: feedType === "bottle" ? "2px solid #3f51b5" : "none"}} onClick={()=> setFeedType("bottle")}/>
                    <Avatar src="/images/foodicon.png" sx={{width:"60px", height:"60px", cursor:"pointer", border: feedType === "food" ? "2px solid #3f51b5" : "none"}} onClick={()=> setFeedType("food")}/>
                    <Avatar src="/images/medicineicon.png" sx={{width:"60px", height:"60px", cursor:"pointer", border: feedType === "medicine" ? "2px solid #3f51b5" : "none"}} onClick={()=> setFeedType("medicine")}/>
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
                    { feedType === "breast" ? 
                    <>
                    <Typography variant="h6">Breast Feed</Typography>
                    <Box sx={{ display:"flex", flexDirection:"row", alignItems:"center", marginTop:3}}>
                    <InputLabel id="duration-select-label">Duration in Mins:</InputLabel>
                    <Select
                    value={feedDuration}
                    sx={{width:80, marginLeft:3}}
                    onChange={handleDurationChange}
                    labelId="duration-select-label"
                    inputProps={{
                      name: "duration",
                      id: "duration-select",
                    }}
                    >
                    {durationOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                    </Select>
                    </Box> 
                    </>
                    : feedType === "bottle" ?
                    <>
                    <Typography variant="h6">Bottle Feed</Typography>
                    <Box sx={{ display:"flex", flexDirection:"row", alignItems:"center", marginTop:3}}>
                    <InputLabel id="volume-select-label">Volume in ml:</InputLabel>
                    <Select
                    value={feedVolume}
                    sx={{width:80, marginLeft:3}}
                    onChange={handleVolumeChange}
                    labelId="volume-select-label"
                    inputProps={{
                      name: "volume",
                      id: "volume-select",
                    }}
                    >
                    {volumeOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                    </Select>
                    </Box> 
                    </> 
                    : feedType == "food" ? 
                    <>
                    <Typography variant="h6">Food</Typography>
                    <Container maxWidth="xs" disableGutters>
                    <Box sx={{ display:"flex", flexDirection:"row", alignItems:"center"}}>
                    <Grid container spacing={2} sx={{marginTop: 1, margin: 1}}>
                    {foodOptions.map((foodOption, index) => (
                      <Grid item key={index}>
                        <Chip
                          label={foodOption}
                          clickable
                          color={feedFood.includes(foodOption) ? "primary" : "default"}
                          onClick={() => handleFoodChange(foodOption)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  </Box>
                  </Container>
                  </>
                    : feedType === "medicine" ? 
                    <>
                    <Typography variant="h6">Medicine</Typography> 
                    <Box sx={{ display:"flex", flexDirection:"row", alignItems:"center"}}>
                    <Grid container spacing={2} sx={{marginTop: 1, margin: 1}}>
                    {medicineOptions.map((medicineOption, index) => (
                      <Grid item key={index}>
                        <Chip
                          label={medicineOption}
                          clickable
                          color={feedMedicine.includes(medicineOption) ? "primary" : "default"}
                          onClick={() => handleMedicineChange(medicineOption)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  </Box>
                    </>
                    : <></>
                    }
                    <TextField
                        label="Remarks:"
                        type="text"
                        name="remarks"
                        value={feedRemarks}
                        onChange={handleChange}
                        margin="normal"
                        sx={{width:300}}
                    />
                    <MobileDateTimePicker
                        label="Add Food Timing"
                        disableFuture
                        value={feedTime}
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
            )}
        </Box>
    </Container>
    )
}