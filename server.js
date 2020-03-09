const express = require( 'express' );
const orm = require( './orm' );

const PORT = process.env.PORT || 8080;
const app  = express();

app.use( express.static('public'));
app.use( express.urlencoded({ extended: false }));


app.post("/api/burgerChoice", async function(req, res){
    const burgerSaved = await orm.saveBurgerName(req.body);
    console.log(burgerSaved);

    res.send("Success!!")

});


app.get("/api/burgerChoice", async function(req, res){
    const getBurger = await orm.getBurgerName();
    res.send(getBurger);

});


app.listen( PORT, function(){
    console.log( `[burger] RUNNING, http://localhost:${PORT}` );
});

