import React from "react";
import { Container, Box, Typography, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomeContents() {
  return (
    <Container maxWidth="xl" disableGutters>
      <Box my={4}>
        <Box my={4}>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Why Choose BabyBuddy
          </Typography>
          <Typography variant="subtitle1" align="center">
            Discover the best features of BabyBuddy
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{height:"280px"}}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/feature1.png"
                  alt="Feeding Log"
                />
                <CardContent>
                  <Typography variant="h5">Feeding Log</Typography>
                  <Typography>
                    Keep track of your baby's feeding schedule and ensure they receive the right nutrition with our user-friendly Feeding Log.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{height:"280px"}}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/feature2.png"
                  alt="Sleep Tracker"
                />
                <CardContent>
                  <Typography variant="h5">Sleep Tracker</Typography>
                  <Typography>
                    Monitor your child's sleep patterns and duration to help maintain a healthy sleep schedule with our intuitive Sleep Tracker.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{height:"280px"}}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/feature3.png"
                  alt="Growth Tracking"
                />
                <CardContent>
                  <Typography variant="h5">Growth Tracking</Typography>
                  <Typography>
                    Stay updated on your baby's growth and development using our comprehensive charts and visualisations.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{height:"280px"}}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/feature4.png"
                  alt="Vaccination/Appointment Reminders"
                />
                <CardContent>
                  <Typography variant="h5">Vaccination/Appointment Reminders</Typography>
                  <Typography>
                    Never miss another one of your baby's appointments with timely notifications.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{height:"280px"}}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/feature5.png"
                  alt="Milestone Checklist"
                />
                <CardContent>
                  <Typography variant="h5">Milestone Checklist</Typography>
                  <Typography>
                    Celebrate and record every precious milestone in your baby's life with our interactive Milestone Checklist.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box my={4} textAlign="center" sx={{backgroundColor:"#ffe6b8", padding:"2rem"}}>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to give BabyBuddy a try?
          </Typography>
          <Typography variant="subtitle1">
            Register for free!
          </Typography>
          <Box mt={2}>
            <Button component={Link} to="/users/signup" variant="contained" color="primary" size="large">
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
