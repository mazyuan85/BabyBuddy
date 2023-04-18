import { useState, useEffect } from "react";
import { useMediaQuery, Container, Typography, Box, Avatar, CircularProgress, MenuItem, Select, Card, CardContent, CardMedia } from "@mui/material";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function Dashboard({user, setActiveBaby, activeBaby}) {
  const [babies, setBabies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastDiaperLog, setLastDiaperLog] = useState("");
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
                        <Avatar src="/images/bottleicon.png" sx={{width:"80px", height:"80px"}}/>
                      <Link to="/main/diaper/add">
                      <Avatar src="/images/diapericon.png" sx={{width:"80px", height:"80px"}}/>
                      </Link>
                      <Avatar src="/images/sleepicon.png" sx={{width:"80px", height:"80px"}}/>
                    </Box>
                    <Box sx={{display:"flex", width:"100%", flexDirection:"column", marginTop:2}}>
                    <Box component={Link} to="/main/feed" sx={{ textDecoration: "none", color: "inherit", padding: 0.5 }}>
                        <Card sx={{display:"flex", flexDirection:"row"}}>
                          <Avatar src="/images/bottleicon.png" sx={{width:"60px", height:"60px", alignSelf:"center", marginLeft:1}}/>
                          <CardContent >
                            <Typography variant="h6">
                              Last Feed ??
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    <Box component={Link} to="/main/diaper" sx={{ textDecoration: "none", color: "inherit", padding:0.5}}>
                        <Card sx={{display:"flex", flexDirection:"row"}}>
                          <Avatar src={(lastDiaperLog.type === "pee") ? "/images/peeicon.png" : "/images/pooicon.png"} sx={{width:"60px", height:"60px", alignSelf:"center", marginLeft:1}}/>
                          <CardContent >
                            <Typography variant="h6">
                              {dayjs(lastDiaperLog.dateTime).format("h:MM A")}
                            </Typography>
                            <Typography variant="body2">
                              {dayjs(lastDiaperLog.dateTime).format("DD/MM/YY")}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                      <Box component={Link} to="/main/sleep" sx={{ textDecoration: "none", color: "inherit", padding: 0.5 }}>
                        <Card sx={{display:"flex", flexDirection:"row"}}>
                          <Avatar src="/images/sleepicon.png" sx={{width:"60px", height:"60px", alignSelf:"center", marginLeft:1}}/>
                          <CardContent >
                            <Typography variant="h6">
                              Last Sleep ??
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