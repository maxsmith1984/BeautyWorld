import { Button, Card, Image } from 'antd';
import { EmployeeDto } from "../../../common/dto";

interface EmployeeCardProps {
    employee: EmployeeDto
    onRemove: () => void;
}
const { Meta } = Card;

export function EmployeeCard({ employee, onRemove }: EmployeeCardProps) {
    const year = new Date(employee.startWorkDate).getFullYear();

    return (
        <Card
            style={{ width: 250, marginTop: 16, marginBottom: 16 }}>
            {employee.photo && <Image src={employee.photo} alt={employee.fullName} />}
            <Meta title={`${employee.firstName} ${employee.surName}`} description={employee.position} />
            <Meta title={`Стаж работы с ${year}`} />
            <Button style={{ marginTop: 15 }} onClick={onRemove}>Удалить</Button>
        </Card >
    );
}