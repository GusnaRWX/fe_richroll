import { post, get } from '@/utils/services';

export const getDataTable = (companyId: string) => {
    return get(`compensation_benefits/${companyId}`)
}