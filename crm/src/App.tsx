import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout } from 'antd';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { OrdersPage } from './pages/Orders';
import { EmployeePage } from './pages/Employee/EmployeePage';
import { ServicesPage } from './pages/Services';
import { CustomersPage } from './pages/Customers';
const { Header, Content } = Layout;

function App() {
    return (
        <>
            <Header>
                <Link to="/">Домашняя Страница</Link>
                <Link to="/Login">Логин</Link>
                <Link to="/Orders">Заказы</Link>
                <Link to="/Employee">Сотрудники</Link>
                <Link to="/Services">Услуги</Link>
                <Link to="/Customers">Клиенты</Link>
            </Header>
            <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/Login' element={<LoginPage />}></Route>
                <Route path='/Orders' element={<OrdersPage />}></Route>
                <Route path='/Employee' element={<EmployeePage />}></Route>
                <Route path='/Services' element={<ServicesPage />}></Route>
                <Route path='/Customers' element={<CustomersPage />}></Route>
            </Routes>
            <Content>
                content
            </Content>
        </>
    )
}

export default App;