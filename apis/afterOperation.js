const axios = require('axios');

async function addInteraction(files, userId, shopId) {
    try {
        const response = axios.post("http://127.0.0.1:8000/interactions/add-interaction",{
            files:files,
            userId:userId,
            shopId:shopId
        });
        if (response.status!=200) {
            throw new Error('Interaction addition failed.');
        }
        return true;

    } catch (error) {
        console.log(error.message);
        return null
    }
}