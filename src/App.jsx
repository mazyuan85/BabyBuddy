import { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from "./components/NavBar/NavBar"
import Home from './pages/Home/Home';
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from './pages/SignUpPage/SignUpPage';
import Dashboard from './pages/Main/Dashboard';
import MyBabies from './pages/MyBabies/MyBabies';
import AddBaby from './pages/MyBabies/AddBaby';
import EditBaby from './pages/MyBabies/EditBaby';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "dayjs/locale/en-gb";
import AddDiaperLog from './pages/Diaper/AddDiaperLog';
import StatusDiaperLog from './pages/Diaper/StatusDiaperLog';
import EditDiaperLog from './pages/Diaper/EditDiaperLog';
import AddSleepLog from './pages/Sleep/AddSleepLog';
import StatusSleepLog from './pages/Sleep/StatusSleepLog';
import AddFeedLog from './pages/Feed/AddFeedLog';
import StatusFeedLog from './pages/Feed/StatusFeedLog';
import EditFeedLog from './pages/Feed/EditFeedLog';
import MilestoneChecklist from './pages/Milestones/MilestoneChecklist';

const theme = createTheme({
    palette: {
      primary: {
        main: '#97C0D1',
        contrastText: '#303030',
      },
      secondary: {
        main: '#EDC8B5',
        contrastText: '#303030',
      },
      background: {
        default: '#EDE5E6',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#303030',
      },
    },
})

export default function App() {
  const [user,setUser] = useState("")
  const [activeBaby, setActiveBaby] = useState(null)

  function onBabyAdded(newBaby) {
    setUser((prevUser) => {
      return {... prevUser, babies: [...prevUser.babies, newBaby._id]}
    })
  }

  function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <ThemeProvider theme={theme}>
        <main className="App">
          <NavBar user={user} setUser={setUser}></NavBar>
          <ScrollToTop/>
          <Routes>
            <Route path="/" element={<Home user={user}/>}></Route>
            <Route path="/main" element={<Dashboard user={user} setActiveBaby={setActiveBaby} activeBaby={activeBaby}/>}></Route>
            <Route path="/main/mybabies" element={<MyBabies user={user}/>}></Route>
            <Route path="/main/mybabies/add" element={<AddBaby user={user} onBabyAdded={onBabyAdded}/>}></Route>
            <Route path="/main/mybabies/edit/:babyId" element={<EditBaby user={user}/>}></Route>
            <Route path="/main/diaper" element={<StatusDiaperLog user={user} activeBaby={activeBaby}/>}></Route>
            <Route path="/main/diaper/add" element={<AddDiaperLog user={user} activeBaby={activeBaby}/>}></Route>
            <Route path="/main/diaper/edit/:id" element={<EditDiaperLog user={user} activeBaby={activeBaby}/>}></Route>
            <Route path="/main/sleep" element={<StatusSleepLog user={user} activeBaby={activeBaby}/>}></Route>
            <Route path="/main/sleep/add" element={<AddSleepLog user={user} activeBaby={activeBaby}/>}></Route>
            <Route path="/main/feed/edit/:id" element={<EditFeedLog user={user} activeBaby={activeBaby}/>}></Route>
            <Route path="/main/feed/add" element={<AddFeedLog user={user} activeBaby={activeBaby}/>}></Route>
            <Route path="/main/feed" element={<StatusFeedLog user={user} activeBaby={activeBaby}/>}></Route>
            <Route path="/main/milestones" element={<MilestoneChecklist user={user} activeBaby={activeBaby}/>}></Route>
            <Route path="/users/login" element={<LoginPage setUser={setUser}/>}></Route>
            <Route path="/users/signup" element={<SignUpPage setUser={setUser}/>}></Route>
          </Routes>
        </main>
      </ThemeProvider>
    </LocalizationProvider>
  )
}
