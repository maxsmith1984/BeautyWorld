export interface UpdateOrderDto {
    customerId: number,
    masterId: number,
    serviceId: number,
    visitDate: string,
    status: string[] | string,
    finishStatus: string[] | string
}