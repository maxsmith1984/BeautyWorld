import { useEffect } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import './App.css';

import { Layout, Button } from 'antd';
import { useAuth } from './contexts/AuthContext';

const { Header, Content, Footer } = Layout;


function App() {
    const { isLoggedIn, logout, checkAuth } = useAuth();
    const location = useLocation();

    useEffect(() => {
        checkAuth();
    }, []);

    if (!isLoggedIn) {
        return <Navigate to='/login' />
    }

    return (<>
        {isLoggedIn && (
            <Header className='header'>
                <nav className="navigation">
                    <ul className="navigation__list">
                        <li className={location.pathname === '/Orders' ? 'active' : undefined}><Link to="/">Заявки</Link></li>
                        <li className={location.pathname === '/Customers' ? 'active' : undefined}><Link to="/Customers">Клиенты</Link></li>
                        <li className={location.pathname === '/Employee' ? 'active' : undefined}><Link to="/Employee">Сотрудники</Link></li>
                        <li className={location.pathname === '/Services' ? 'active' : undefined}><Link to="/Services">Услуги</Link></li>
                    </ul>
                </nav>


                <div>
                    <Button type="primary" onClick={logout}>Выход</Button>
                </div>
            </Header >
        )}
        <Content>
            <Outlet />
        </Content>

        <Footer>footer</Footer>
    </>
    )
}

export default App;