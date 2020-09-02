let express = require('express');
let router = express.Router();

/**
 * TODO: Datenbankintegration, um Content aus DB zu bekommen
 * var mysql = require('mysql');
 * var connection = mysql.createConnection({
 *  host: 'localhost',
 *  user: 'dbuser',
 *  password: 's3kreee7'
 *  user: "YOUR USERNAME",
 *  password: "YOUR PASSWORD",
 *  database: "YOUR DATABASE",
 *  // [js]socketPath: ‚/var/run/mysqld/mysqld.sock'[/js]
 *  socketPath: ‚/Applications/MAMP/tmp/mysql/mysql.sock‘});[/js]
 * });
 * 
 * connection.connect();
 * connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
 *  if (err) throw err;
 *  console.log('The solution is: ', rows[0].solution);
 * });
 * connection.end();
 */

// create variable for index 
function siteVar() {
    this.locals = Object.create(null);
    // locals-vars
    this.locals.title = 'The title from index.js';
    this.locals.description = 'The Description from index.js';
    this.locals.featuredImage = '/images/default-image.jpg';
    this.locals.canonical = '/';
}
// check for Property 'locals' as Defined, locals as Object and locals.canonical as String
siteVars = new siteVar;
let t = require('typy').default;
if (t(siteVars, 'locals').isDefined && t(siteVars, 'locals').isObject && t(siteVars, 'locals.canonical').isString) {
    /* GET home page. */
    router.get(siteVars.locals.canonical, function(req, res, next) {
        // transfer template vars 
        $: sitevar = new siteVar;
        if (sitevar.hasOwnProperty('locals')) {
            // Iterate over the property names, transfer value to res.locals
            for (let key of Object.keys(sitevar.locals)) {
                let value = sitevar.locals[key];
                res.locals[key] = value;
            }
        }
        // Display the template
        res.render('index', '');
    });
} else {
    // Fall-Back 
    /**
     * TODO: Better Error-Page-Handling
     */
    let createError = require('http-errors');
    // catch 404 and forward to error handler
    router.use(function(req, res, next) {
        next(createError(404));
    });

    // error handler
    router.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // render the error page
        res.status(err.status || 500);
        console.log(res.status);
        res.render('error');
    });
}

module.exports = router;