import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import RegisterPage from "./screens/RegisterPage"
import HomePage from "./screens/HomePage"
import LogInPage from "./screens/LogInPage"
import ProfilePage from "./screens/ProfilePage"
import CreateRecipePage from "./screens/CreateRecipePage"
import EditProfile from "./screens/EditProfile"
import RecipeDetails from "./screens/RecipePage/RecipeDetails"
import Footer from "./components/Footer"
import GlobalStyles from "./GlobalStyles"
import ScrollToTop from "./components/ScrollToTop"


const App = () => {
 return (
  <Router>
    <GlobalStyles />
    <ScrollToTop />
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/profile/:_id" element={<ProfilePage />} />
      <Route path="/profile/edit/:_id" element={<EditProfile />} />
      <Route path="/recipe/:_id" element={<RecipeDetails />} />
      <Route path="/recipe/create" element={<CreateRecipePage />} />
    </Routes>
    <Footer />
  </Router>
 )
}

export default App
