import axios from 'axios'

export const getApiEmployee = async () => {
    try {
        const response = await axios.get('https://pkl-api-pendataan-karyawan.stagingapps.net/external/api/employees');
        return response.data.data.employees;
    } catch (error) {
        console.error(error);
    }
}