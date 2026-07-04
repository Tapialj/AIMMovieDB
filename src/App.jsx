import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "/routes/ProtectedRoute";

import Nav from "/components/nav/Nav";
import Layout from "/layout/Layout";
import PersistLogin from "/layout/PersistLogin";
import ActorDetails from "/pages/actors/ActorDetails";
import Actors from "/pages/actors/Actors";
import DirectorDetails from "/pages/directors/DirectorDetails";
import Directors from "/pages/directors/Directors";
import Home from "/pages/Home";
import MovieDetails from "/pages/movies/MovieDetails";
import Movies from "/pages/movies/Movies";
import NotFound from "/pages/NotFound";
import "./scss/main.scss";


function App() {

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Layout />}>

          {/* Public Routes */}
          <Route path="/" exact element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie-details/:id" element={<MovieDetails />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/actor-details/:id" element={<ActorDetails />} />
          <Route path="/directors" element={<Directors />} />
          <Route path="/director-details/:id" element={<DirectorDetails />} />

          {/* Private Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
              <Route path="/edit-movie/:id" element="" />
              <Route path="/edit-actor/:id" element="" />
              <Route path="/edit-director/:id" element="" />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
