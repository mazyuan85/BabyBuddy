import { useState } from 'react'
import { Route, Routes } from "react-router-dom";

function App() {
  const [user,setUser] = useState(getUser());

  return (
    <main className="App">
      {/* <NavBar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<HomePage user={user} />}></Route>
        <Route path="/users/login" element={<LoginPage setUser={setUser}/>}></Route>
        <Route path="/users/register" element={<RegisterPage setUser={setUser}/>}></Route>
        <Route path="/users/account" element={<UserAccountPage user={user} />}/>
        <Route path="/users/account/preferences" element={<Preferences user={user} setUser={setUser}/>} />
        <Route path="/users/account/favourites" element={<FavouritesPage user={user}/>} />
        <Route path="/users/account/loans" element={<LoansPage user={user} />} />
        <Route path="/users/account/favourites" element={<FavouritesPage user={user}/>} />
        <Route path="/users/account/history" element={<HistoryPage user={user} />} />
        <Route path="/books/featured" element={<FeaturedPage user={user}/>} />
        <Route path="/books/genres/:genre" element={<GenresPage user={user}/>} />
        <Route path="/books/recommended"  element={<RecommendedPage user={user}  />} />
        <Route path="/books/:id/setreminder" element={<SetReminderPage user={user}/>} />
        <Route path="/books/:id" element={<BookDetails user={user}/>} />
        <Route path="/search" element={<Search />} />
      </Routes> */}
    </main>
  )
}

export default App
