// import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBarComponent'
import { AuthProvider } from './contexts/AuthContext'
import ShowSheltersComponent from './components/ShowSheltersComponent'
import AddEditShelterPage from './pages/AddEditShelterPage'
import ShowPetsPage from './pages/ShowPetsPage'

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shelters" element={<ShowSheltersComponent />} />
          <Route path="/edit-shelter/:shelterId" element={<AddEditShelterPage />} />
          <Route path="/shelter-pets/:shelterId" element={<ShowPetsPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
