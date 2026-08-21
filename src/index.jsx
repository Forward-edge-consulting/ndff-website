import { Routes, Route } from 'react-router-dom';

import {ROUTES} from './route.js';
// import './index.css';
import Home from './pages/home.jsx';
import Registration from './pages/Registration.jsx';

function AppRoute(){
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Home/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path={ROUTES.REGISTRATION} element={<Registration/>}/>
        </Routes>
    )
}

export default AppRoute;