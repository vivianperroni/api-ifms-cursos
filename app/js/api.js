export default async function getData(resouce){
    const url =`http://localhost:3000/${resouce}`
    const response = await axios.get(url);
    return response    
}
