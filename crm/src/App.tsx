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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isLoggedIn) {
        return <Navigate to='/Login' />
    }

    return (<>
        {isLoggedIn && (
            <Header className='header'>
                <nav className="navigation">
                    <ul className="navigation__list">
                        <li className={location.pathname === '/' ? 'active' : undefined}>
                            <Link to="/">Заявки</Link>
                        </li>
                        <li className={location.pathname === '/Customers' ? 'active' : undefined}>
                            <Link to="/Customers">Клиенты</Link>
                        </li>
                        <li className={location.pathname === '/Employee' ? 'active' : undefined}>
                            <Link to="/Employee">Сотрудники</Link>
                        </li>
                        <li className={location.pathname === '/Services' ? 'active' : undefined}>
                            <Link to="/Services">Услуги</Link>
                        </li>
                    </ul>
                </nav>

                <div>
                    <Button type="primary" onClick={logout}>Выход</Button>
                </div>
            </Header >
        )}

        <Content>
            <div className='container'>
                <Outlet />
            </div>
        </Content>

        <Footer>© 2020 «Море красоты»</Footer>
    </>)
}

export default App;