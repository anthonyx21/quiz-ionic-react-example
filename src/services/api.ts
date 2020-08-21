import axios from 'axios';

const api = axios.create({
    baseURL: 'https://opentdb.com/api.php',
    headers: {
        'Content-Type': 'application/json'
    }
});
api.interceptors.response.use((response) => {
    if (response.status === 200) {
        return response.data;
    }
    return null;
});
function getQuiz(amount: Number): Promise<any> {
    return api.get('/', {
        params: {
            amount
        }
    });
}

export { getQuiz };
