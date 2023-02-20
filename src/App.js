import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './components/Home';
import Layout from './components/Layout';
import Login from './components/Login';
import Missing from './components/Missing';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;