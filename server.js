const app=require('./app');
require('./dBconnect');
app.listen(8000, async()=>{
    try {
        console.log('Connected to Port 8000');
        } 
    catch (error) {
        console.log('Error Occured' ,error);
        }
});