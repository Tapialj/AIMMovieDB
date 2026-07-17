import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "/routes/ProtectedRoute";

import Footer from "/components/nav/Footer";
import Nav from "/components/nav/Nav";
import Layout from "/layout/Layout";
import PersistLogin from "/layout/PersistLogin";
import ActorDetails from "/pages/actors/ActorDetails";
import Actors from "/pages/actors/Actors";
import AddActor from "/pages/actors/AddActor";
import EditActor from "/pages/actors/EditActor";
import AddDirector from "/pages/directors/AddDirector";
import DirectorDetails from "/pages/directors/DirectorDetails";
import Directors from "/pages/directors/Directors";
import EditDirector from "/pages/directors/EditDirector";
import Home from "/pages/Home";
import AddMovie from "/pages/movies/AddMovie";
import EditMovie from "/pages/movies/EditMovie";
import MovieDetails from "/pages/movies/MovieDetails";
import Movies from "/pages/movies/Movies";
import NotFound from "/pages/NotFound";
import Unauthorized from "/pages/Unauthorized";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import "./scss/main.scss";


function App() {

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthourized" element={<Unauthorized />} />


          <Route element={<PersistLogin />}>
            {/* Public Routes */}
            <Route path="/" exact element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="/actors/:id" element={<ActorDetails />} />
            <Route path="/directors" element={<Directors />} />
            <Route path="/directors/:id" element={<DirectorDetails />} />

            {/* Private Routes */}            
            <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
              <Route path="/movies/new" element={<AddMovie />} />
              <Route path="/directors/new" element={<AddDirector />} />
              <Route path="/actors/new" element={<AddActor />} />
              <Route path="/movies/edit/:id" element={<EditMovie />} />
              <Route path="/directors/edit/:id" element={<EditDirector />} />
              <Route path="/actors/edit/:id" element={<EditActor />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
