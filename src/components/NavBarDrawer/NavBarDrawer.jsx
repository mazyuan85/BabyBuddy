import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import GrowthIcon from '@mui/icons-material/ShowChart';
import MilestonesIcon from '@mui/icons-material/EmojiEvents';
import AppointmentsIcon from '@mui/icons-material/Event';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";

export default function NavBarDrawer({drawerOpen, setDrawerOpen}) {

    const toggleDrawer = (isOpen) => (event) => {
        setDrawerOpen(isOpen);
    };

    const drawerItems = () => (
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem key="Dashboard" component={Link} to="/main" sx={{textDecoration:"none", color: "inherit"}}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem key="Feed" component={Link} to="/main/feed/" sx={{textDecoration:"none", color: "inherit"}}>
              <ListItemIcon>
                <WaterDropIcon />
              </ListItemIcon>
              <ListItemText primary="Feed Log" />
            </ListItem>
            <ListItem component={Link} to="/main/feed/add" sx={{ pl: 3, textDecoration: 'none', color: 'inherit' }}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Feed Log" />
            </ListItem>
            <ListItem key="Diaper" component={Link} to="/main/diaper/" sx={{textDecoration:"none", color:"inherit"}}>
              <ListItemIcon>
                <BabyChangingStationIcon />
              </ListItemIcon>
              <ListItemText primary="Diaper Log" />
            </ListItem>
            <ListItem component={Link} to="/main/diaper/add" sx={{ pl: 3, textDecoration: 'none', color: 'inherit' }}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Diaper Log" />
            </ListItem>
            <ListItem key="Sleep" component={Link} to="/main/sleep/" sx={{textDecoration:"none", color:"inherit"}}>
              <ListItemIcon>
                <BedtimeIcon />
              </ListItemIcon>
              <ListItemText primary="Sleeping Log" />
            </ListItem>
            <ListItem component={Link} to="/main/sleep/add" sx={{ pl: 3, textDecoration: 'none', color: 'inherit' }}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Sleep Log" />
            </ListItem>
            <Divider key="divider5"/>
            <ListItem key="Growth" component={Link} to="/main/growthtracker/" sx={{textDecoration:"none", color:"inherit"}}>
              <ListItemIcon>
                <GrowthIcon />
              </ListItemIcon>
              <ListItemText primary="Growth Tracker" />
            </ListItem>
            <ListItem component={Link} to="/main/growthtracker/add" sx={{ pl: 3, textDecoration: 'none', color: 'inherit' }}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Growth Log" />
            </ListItem>
            <ListItem key="Milestones" component={Link} to="/main/milestones/" sx={{textDecoration:"none", color:"inherit"}}>
              <ListItemIcon>
                <MilestonesIcon />
              </ListItemIcon>
              <ListItemText primary="Milestones" />
            </ListItem>
            <ListItem key="Appointments">
              <ListItemIcon>
                <AppointmentsIcon />
              </ListItemIcon>
              <ListItemText primary="Appointments" />
            </ListItem>
          </List>
        </div>
      );
      
    return (
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            {drawerItems()}
        </Drawer>
    )
}
