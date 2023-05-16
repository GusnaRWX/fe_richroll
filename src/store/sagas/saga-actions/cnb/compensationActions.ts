import { post, get } from '@/utils/services';

export const getDataTable = (companyId: string) => {
    return get(`https://api.kayaroll.nikici.com/v2/compensation_benefits/${companyId}`)
}