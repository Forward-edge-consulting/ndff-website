import { Routes, Route } from 'react-router-dom';

import {ROUTES} from './route.js';
// import './index.css';
import Home from './pages/home.jsx';
import New from './pages/new.jsx';

function AppRoute(){
    return (
        <Routes>
            <Route path={ROUTES.NEW} element={<New/>}/>
            <Route path={ROUTES.HOME} element={<Home/>}/>
            <Route path='/' element={<Home/>}/>
        </Routes>
    )
}

export default AppRoute;