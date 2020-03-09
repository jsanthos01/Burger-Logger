const mysql = require("mysql");

//connection to my sql
class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args=[] ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}

const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "bootcamp2020",
    database: "burgerLog" 
});

async function saveBurgerName(userBurger){
    const burgerSqlSave = await db.query("INSERT INTO burgerNames(name) VALUES(?)", [userBurger.name]);
    console.log(burgerSqlSave[0]);
}

async function getBurgerName(){
    const getBurgerNameSql = await db.query("SELECT * FROM burgerNames wHERE devoured=0");
    console.log(getBurgerNameSql);
    return getBurgerNameSql;
}

module.exports = {
    saveBurgerName,
    getBurgerName
}