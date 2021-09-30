import os from "os"
export const getNetworkIp=()=>{
    let localhost='';
    try{
        const network=os.networkInterfaces();
        network[Object.keys(network)[0]]?.forEach(datails=>{
            if(localhost==='' && datails.family === 'IPv4' && !datails.internal){
                localhost=datails.address;
            };
        });
    } catch(e){
        localhost='localhost';
    }
    return localhost;
}