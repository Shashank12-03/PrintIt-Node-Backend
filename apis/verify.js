const axios = require('axios');

async function getUser(token) {
    try {

        const userInfo = await axios.get("http://127.0.0.1:8000/user/verify-user",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        if (userInfo.status!=200) {
            throw new Error('User verification failed.');
        }
        return userInfo.data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

async function getShop(token) {
    try {
        const shopInfo = await axios.get(`http://127.0.0.1:8000/shop/verify-shop`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        if (shopInfo.status!=200) {
            throw new Error('shop verification failed.');
        }
        return shopInfo.data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

module.exports = {getUser,getShop};