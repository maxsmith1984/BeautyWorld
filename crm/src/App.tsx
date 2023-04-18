import { ButtonHTMLAttributes, ReactNode, useRef, FormEvent, useState, useEffect } from 'react';
import './App.css';
import EmployeesApi from './common/api/employeesApi';
import { EmployeeDto } from './common/dto';
import { EmployeeCard } from './components/EmployeeCard';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => {};
}

function Button(props: ButtonProps) {
  const handleClick = () => {

    if (props.onClick)
      props.onClick();
  }

  return (
    <button {...props} onClick={handleClick}>{props.children}</button>
  )
}

interface EmployeeCreateFormData {
  name: string;
  lastName: string;
}

function EmployeeCreateForm({ onCreate }: { onCreate: (data: EmployeeCreateFormData) => void }) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleForm = (event: FormEvent) => {
    event.preventDefault();
    onCreate({ name, lastName });
  }

  return (
    <form onSubmit={handleForm}>
      <input value={name} onChange={e => setName(e.target.value)} name='name' placeholder='Имя' />
      <input value={lastName} onChange={e => setLastName(e.target.value)} name='lastname' placeholder='Фамилия' />
      <Button>Добавить</Button>
    </form>
  )
};

function App() {
  const [employees, setEmployees] = useState<EmployeeDto[]>([]);
  const employeesListRef = useRef<any>();

  useEffect(() => {
    EmployeesApi.getAll().then(setEmployees);
  }, []);

  const removeEmployee = (employeeId: number) => {
    setEmployees(employees.filter(x => x.id !== employeeId))
  }

  const createEmployee = (data: EmployeeCreateFormData) => {
    setEmployees(employees.concat({
      "firstName": data.name,
      "patronymic": "Сергеевна",
      "surName": data.lastName,
      "position": "Мастер ногтевого сервиса",
      "photo": "http://localhost:3005/api/staff/photo/d7be2a0cc36277ba0d5fcb3b325389a5.jpg",
      "startWorkDate": "2023-04-18T10:01:26.865Z",
      "id": employees.length + 1,
      "fullName": "Краснова Ирина Сергеевна"
    }))
  }

  return (
    <>
      <EmployeeCreateForm onCreate={createEmployee} />

      {employees.length === 0 && <p>Нет данных</p>}

      <div ref={employeesListRef} className='employees'>
        {employees.map(employee =>
          <EmployeeCard
            onRemove={() => removeEmployee(employee.id)}
            key={employee.id}
            employee={employee}
          />)}
      </div>


    </>
  )
}

export default App;
