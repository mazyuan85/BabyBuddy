import { useState, useEffect } from "react";
import { useMediaQuery, Container, Typography, Box, Avatar, CircularProgress, MenuItem, Select, Card, CardContent, CardMedia } from "@mui/material";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function Dashboard({user, setActiveBaby, activeBaby}) {
  const [babies, setBabies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastDiaperLog, setLastDiaperLog] = useState({});
  const [lastSleepLog, setLastSleepLog] = useState({});
  const [lastFeedLog, setLastFeedLog] = useState({});
  const isMobile = useMediaQuery("(max-width:600px)");
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
      if (!user) {
        navigate("/");
        return;
    }
      const fetchBabies = async () => {
          try {
              const response = await fetch("/api/main/mybabies", {
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${localStorage.getItem("token")}`,
                  },
              });

              if (response.ok) {
                  const fetchedBabies = await response.json();
                  setBabies(fetchedBabies);
                  if (!activeBaby){
                  setActiveBaby(fetchedBabies[0]);
                  }
              } else {
                  navigate("/");
                  throw new Error("Failed to fetch babies.");
              }
          } catch (error) {
              console.error("Error fetching babies:", error);
          } finally {
              setIsLoading(false);
          }
      };

      fetchBabies();
  }, [user, navigate]);

  useEffect(() => {
    const fetchLastDiaperLogs = async () => {
      try {
        const response = await fetch(`/api/main/diaper/lastdiaperlog/${activeBaby._id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (response.ok) {
          const lastDiaperLogs = await response.json();
          setLastDiaperLog(lastDiaperLogs)
        } else {
          throw new Error("Failed to fetch last diaper logs.");
        }
      } catch (error) {
        console.error("Error fetching last diaper logs:", error);
      }
    };
  
    if (activeBaby) {
      fetchLastDiaperLogs();
    }
  }, [activeBaby, location]);

  useEffect(() => {
    const fetchLastSleepLogs = async () => {
      try {
        const response = await fetch(`/api/main/sleep/lastsleeplog/${activeBaby._id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (response.ok) {
          const lastSleepLogs = await response.json();
          setLastSleepLog(lastSleepLogs)
        } else {
          throw new Error("Failed to fetch last sleep log.");
        }
      } catch (error) {
        console.error("Error fetching last sleep log:", error);
      }
    };
  
    if (activeBaby) {
      fetchLastSleepLogs();
    }
  }, [activeBaby, location]);

  useEffect(() => {
    const fetchLastFeedLogs = async () => {
      try {
        const response = await fetch(`/api/main/feed/lastfeedlog/${activeBaby._id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (response.ok) {
          const lastFeedLogs = await response.json();
          setLastFeedLog(lastFeedLogs)
        } else {
          throw new Error("Failed to fetch last feed log.");
        }
      } catch (error) {
        console.error("Error fetching last feed log:", error);
      }
    };
  
    if (activeBaby) {
      fetchLastFeedLogs();
    }
  }, [activeBaby, location]);

  const handleChange = (event) => {
    const selectedBaby = babies.find((baby) => baby.name === event.target.value);
    setActiveBaby(selectedBaby);
  };

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
                    <Avatar src={activeBaby?.imageURL} sx={{width: isMobile ? "120px" : "180px", height: isMobile? "120px" : "180px"}} />
                   
                    {isMobile ? <></> :  <><Typography variant="h6" sx={{marginTop: 2}}>{activeBaby.name}</Typography><Typography variant="subtitle1">Date of Birth: {dayjs(activeBaby.dateOfBirth).format("DD MMM YYYY")}</Typography></>}
                    <Select
                      labelId="baby-select-label"
                      value={activeBaby.name}
                      onChange={handleChange}
                      sx={{ minWidth: "200px", marginTop: 1 }}
                    >
                      {babies.map((baby) => (
                        <MenuItem key={baby._id} value={baby.name}>
                          {baby.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <Box sx={{display:"flex", width:"100%", justifyContent:"space-evenly", marginTop:3}}>
                      <Link to="/main/feed/add">
                        <Avatar src="/images/bottleicon.png" sx={{width:"80px", height:"80px"}}/>
                      </Link>
                      <Link to="/main/diaper/add">
                      <Avatar src="/images/diapericon.png" sx={{width:"80px", height:"80px"}}/>
                      </Link>
                      <Link to="/main/sleep/add">
                      <Avatar src={lastSleepLog?.isSleeping ? "/images/sunicon.png" : "/images/sleepicon.png"} sx={{width:"80px", height:"80px"}}/>
                      </Link>
                    </Box>
                    <Box sx={{display:"flex", width:"100%", flexDirection:"column", marginTop:2}}>
                    <Box component={Link} to="/main/feed" sx={{ textDecoration: "none", color: "inherit", padding: 0.5 }}>
                        <Card sx={{display:"flex", flexDirection:"row"}}>
                          <Avatar src={(lastFeedLog?.type === "bottle") ? "/images/bottleicon.png" : (lastFeedLog?.type === "breast") ? "/images/breastfeedingicon.png" : (lastFeedLog?.type === "food") ? "/images/foodicon.png" : (lastFeedLog?.type === "medicine") ? "/images/medicineicon.png" : "/images/bottleicon.png"} sx={{width:"60px", height:"60px", alignSelf:"center", marginLeft:1}}/>
                          <CardContent >
                            <Typography variant="h6">
                            {lastFeedLog?.dateTime ? dayjs(lastFeedLog.dateTime).format("h:mm A") : "No data yet"}
                            </Typography>
                            <Typography variant="body2">
                            {lastFeedLog?.dateTime ? dayjs(lastFeedLog.dateTime).format("DD/MM/YY") : "No data yet"}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    <Box component={Link} to="/main/diaper" sx={{ textDecoration: "none", color: "inherit", padding:0.5}}>
                        <Card sx={{display:"flex", flexDirection:"row"}}>
                          <Avatar src={(lastDiaperLog?.type === "pee") ? "/images/peeicon.png" : (lastDiaperLog?.type === "poo") ? "/images/pooicon.png" : "images/diapericon.png"} sx={{width:"60px", height:"60px", alignSelf:"center", marginLeft:1}}/>
                          <CardContent >
                            <Typography variant="h6">
                              {lastDiaperLog?.dateTime ? dayjs(lastDiaperLog.dateTime).format("h:mm A") : "No data yet"}
                            </Typography>
                            <Typography variant="body2">
                              {lastDiaperLog?.dateTime ? dayjs(lastDiaperLog.dateTime).format("DD/MM/YY") : "No data yet"}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                      <Box component={Link} to="/main/sleep" sx={{ textDecoration: "none", color: "inherit", padding: 0.5 }}>
                        <Card sx={{display:"flex", flexDirection:"row"}}>
                          <Avatar src={(lastSleepLog?.isSleeping) ? "/images/sleepicon.png" : "/images/sunicon.png"} sx={{width:"60px", height:"60px", alignSelf:"center", marginLeft:1}}/>
                          <CardContent >
                          <Typography variant="h6">
                              {lastSleepLog ? lastSleepLog.isSleeping ? dayjs(lastSleepLog.startDateTime).format("h:mm A"): dayjs(lastSleepLog.endDateTime).format("h:mm A") : "No data yet"}
                            </Typography>
                            <Typography variant="body2">
                              {lastSleepLog ? lastSleepLog.isSleeping ? dayjs(lastSleepLog.startDateTime).format("DD/MM/YY") : dayjs(lastSleepLog.endDateTime).format("DD/MM/YY") : "No data yet"}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>

                     </Box>
                  </Box>
              )}
          </Box>
      </Container>
  );
}