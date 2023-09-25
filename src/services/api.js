import axios  from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '70651bc627e300efa16f8b5be2ca20cc',
        language: 'pt-BR',
        page: 1

    }
})

export default api