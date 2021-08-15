import axios from "axios";

export const loginUser  = async (email, password) => {
    const {data} = await axios.post('/api/login', {email, password});
    console.log(data);
}                                                               