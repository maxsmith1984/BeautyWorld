import { useRef, useState, useEffect } from "react"
import Highlighter from 'react-highlight-words';

import moment from 'moment';
import { Button, Table, Modal, DatePickerProps, Input, Space, InputRef, TableProps } from "antd";
import { EditTwoTone, ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType, FilterConfirmProps, FilterValue, ColumnType, SorterResult } from 'antd/es/table/interface';

import { OrderApi, } from "../../../common/api";
import { OrderDto, UpdateOrderDto, RecordStatusFinish, RecordStatus } from "../../../common/dto";
import CreateOrder from "./CreateOrder";
import EditOrder from "./EditOrder";

const { confirm } = Modal;

interface DataType {
    fullName: string,
    status: string,
    createdDate: string,
    visitDate: string
}

type DataIndex = keyof DataType;

const OrdersTable = () => {
    const ordersListRef = useRef<any>();

    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [editOrder, setEditOrder] = useState(false);
    const [editingOrder, setEditingOrder] = useState<UpdateOrderDto>({
        customerId: 0,
        masterId: 0,
        serviceId: 0,
        visitDate: '',
        status: RecordStatusFinish.Success,
        finishStatus: RecordStatus.Opened,
    });

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});

    useEffect(() => {
        OrderApi.getOrder().then(setOrders);

    }, []);

    const handleEditOrder = (orderId: number,) => {
        const orderToEdit = orders.find((order) => order.id === orderId);

        if (orderToEdit) {
            setEditingOrder({
                customerId: orderToEdit.customer.id,
                masterId: orderToEdit.master.id,
                serviceId: orderToEdit.service.id,
                visitDate: orderToEdit.visitDate,
                status: orderToEdit.status as RecordStatusFinish,
                finishStatus: orderToEdit.finishStatus as RecordStatus,
            });
            setEditOrder(true);
        }
    };

    const addOrder = (order: OrderDto) => {
        setOrders([order, ...orders]);
    };

    const updateOrder = () => {
        const updatedOrder = { ...editingOrder, ...FormData };
        console.log(updatedOrder)
        // OrderApi.updateOrder(updatedOrder)
        setEditOrder(false);
    };

    const removeOrder = (orderId: number) => {
        confirm({
            title: 'Вы уверены, что хотите удалить этот заказ?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Да',
            cancelText: 'Отмена',
            onOk: () => {
                const orderNumber = { id: orderId };

                setOrders(orders.filter(order => order.id !== orderId));
                OrderApi.deleteOrder(orderNumber)
            },
        });
    }

    const formatDate = (createdDate: string): string => {
        const date = new Date(createdDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}-${month}-${year}`;
    }

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Найти
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Очистить
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Фильтр
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Закрыть
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<DataType>);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            width: 60,
        },
        {
            title: 'Имя',
            dataIndex: 'fullName',
            key: 'fullName',
            ...getColumnSearchProps('fullName'),
        },
        {
            title: 'Номер телефона',
            dataIndex: 'phone',
            key: 'phone',
            width: 160
        },
        {
            title: 'Дата создания',
            dataIndex: 'createdDate',
            key: 'createdDate',
            width: 120,
            render: (createdDate: string) => formatDate(createdDate),
            sorter: (a, b) => moment(a.createdDate).unix() - moment(b.createdDate).unix(),
            sortOrder: sortedInfo.columnKey === 'createdDate' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Дата визита',
            dataIndex: 'visitDate',
            key: 'visitDate',
            width: 120,
            render: (visitDate: string) => formatDate(visitDate),
            sorter: (a, b) => moment(a.visitDate).unix() - moment(b.visitDate).unix(),
            sortOrder: sortedInfo.columnKey === 'visitDate' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Мастер',
            dataIndex: 'masterName',
            key: 'masterName',
        },
        {
            title: 'Услуга',
            dataIndex: 'service',
            key: 'service',
            width: 140
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Opened', value: 'Opened' },
                { text: 'Closed', value: 'Closed' },
            ],
            onFilter: (value: any, record) => record.status.includes(value),
        },
        {
            title: 'Заявка',
            dataIndex: 'finishStatus',
            key: 'finishStatus',
        },
        {
            title: 'Действия',
            key: 'actions',
            width: 100,
            render: (order: any) =>
                <div className="action__button">
                    <Button icon={<EditTwoTone />} onClick={() => handleEditOrder(order.id)} />
                    <Button type="link" onClick={() => removeOrder(order.id)}>Удалить</Button>
                </div>
        },
    ];

    const data = orders.map(order => ({
        key: order.id,
        id: order.id,
        fullName: order.customer.fullName,
        phone: order.customer.phone,
        createdDate: order.createdDate,
        visitDate: order.visitDate,
        status: order.status,
        finishStatus: order.finishStatus,
        masterName: order.master.firstName,
        service: order.service.name,
    }));



    const updateVisitDate: DatePickerProps['onChange'] = (date, dateString) => {
        return setEditingOrder({ ...editingOrder, visitDate: dateString })
    };

    return (
        <>
            <CreateOrder addOrder={addOrder} />

            <Table ref={ordersListRef} columns={columns} dataSource={data} onChange={handleChange} />

            <EditOrder
                editOrder={editOrder}
                setEditOrder={setEditOrder}
                updateOrder={updateOrder}
                editingOrder={editingOrder}
                setEditingOrder={setEditingOrder}
                updateVisitDate={updateVisitDate}
            />
        </>)
}

export default OrdersTable