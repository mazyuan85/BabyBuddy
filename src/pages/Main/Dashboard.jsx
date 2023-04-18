import { useState, useEffect } from "react";
import { Container, Typography, Box, Avatar, CircularProgress, MenuItem, Select } from "@mui/material";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function Dashboard({user, setActiveBaby, activeBaby}) {
  const [babies, setBabies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
//   const [activeBaby, setActiveBaby] = useState({})

  useEffect(() => {
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
                  throw new Error("Failed to fetch babies.");
              }
          } catch (error) {
              console.error("Error fetching babies:", error);
          } finally {
              setIsLoading(false);
          }
      };

      fetchBabies();
  }, []);

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
                    <Avatar src={activeBaby?.imageURL} sx={{width:"180px", height:"180px"}} />
                    <Typography variant="h6" sx={{marginTop: 2}}>{activeBaby.name}</Typography>
                    <Typography variant="subtitle1">Date of Birth: {dayjs(activeBaby.dateOfBirth).format("DD MMM YYYY")}</Typography>            
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
                        <Avatar src="/images/bottleicon.png" sx={{width:"90px", height:"90px"}}/>
                      <Link to="/main/diaper/add">
                      <Avatar src="/images/diapericon.png" sx={{width:"90px", height:"90px"}}/>
                      </Link>
                      <Avatar src="/images/sleepicon.png" sx={{width:"90px", height:"90px"}}/>
                    </Box>
                  </Box>
              )}
          </Box>
      </Container>
  );
}