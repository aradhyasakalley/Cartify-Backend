const app=require('./app');
require('./dBconnect');
app.listen(3000, async()=>{
    try {
        console.log('Connected to Port 3000');
        } 
    catch (error) {
        console.log('Error Occured' ,error);
        }
});