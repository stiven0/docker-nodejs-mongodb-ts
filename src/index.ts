import app from './app';
import { connect, ConnectionOptions } from 'mongoose';

const PORT = process.env.PORT || 3000;
const ENV = process.env.ENVIRONMENT || 'dev';

/**
 * es necesario pasar la cadena de conexion como mongo en vez de localhost 
 * para correrlo en el contenedor
*/
const DB = process.env.DB || 'mongodb://mongo:27017/docker-nodejs-ts';

const opts: ConnectionOptions = { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
};

const main = async () => {

    try {

        const db = await connect( DB, opts );
    
        if ( db ) {
            console.log('Conexion a la base de datos establecida');
            app.listen( PORT, () => console.log('Server on port', PORT) );
            
        } else {
            console.log('Error conection invalid');
        }
        
    } catch (err) {

        console.log('Error conection database', err);
        
    }

 

};

main();


