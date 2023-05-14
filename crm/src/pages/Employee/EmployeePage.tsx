import { useEffect, useRef, useState } from "react";
import { EmployeesApi } from "../../common/api";
import { EmployeeDto } from "../../common/dto";
import { EmployeeCard } from "./components/EmployeeCard";
import { EmployeeCreateForm, EmployeeCreateFormData } from "./components/EmployeeCreateForm";

export function EmployeePage() {
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