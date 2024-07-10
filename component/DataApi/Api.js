import axios from 'axios';

export const ProductData = async () => {
    return axios.get('https://fakestoreapi.com/products')
        .then(response => response.data);
}