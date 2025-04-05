import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3001/api', // Replace with your API base URL
})


export const registerUser = async (data) =>{
    try {
        const response = await API.post('/users', data);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}


export const loginUser = async(email, password) =>{
    try {
        const response = await API.post('/users/login', {email, password});
        console.log('User logged in successfully:', response.data);
        return response.data;
    } catch (error) {
        //console.error('Error logging in user:', error);
        return error.response.data
    }
};


export const addProperty = async (formValues, files) => {
    try {
        const formData = new FormData();
        
        // Append form values
        for (let key in formValues) {
            formData.append(key, formValues[key]);
        }

        // Append files individually
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        // Send the request
        const response = await API.post('/properties', formData);
        return response.data;
    } catch (error) {
        console.error('Error adding property:', error);
        throw error;
    }
};


export const getProperties = async ()=>{
    try {
        const response = await API.get('/properties');
        return response.data;
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw error;
    }
}


export const getPropertyDetials = async (id) => {
    try {
        const response = await API.get(`/properties/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching property details:', error);
        throw error;
    }
}


export const searchProperties = async (searchTerms) => {

    try {
        console.log(searchTerms)
        const response = await API.get('/properties/search-items', { params: searchTerms });
        return response.data;
    } catch (error) {
        console.error('Error searching properties:', error);
        throw error;
    }
}