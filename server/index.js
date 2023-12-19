import app from './app.js';
import { sequelize } from './src/db/db.js';

async function main(){
    await sequelize.sync({force: false})
    app.listen(5000)
    console.log('server on port 5000')
}

main()