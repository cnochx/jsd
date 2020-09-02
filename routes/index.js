// call .env
let dotenv = require('dotenv').config();
// Teste dotenv nach Fehler
if (dotenv.error) {
    throw dotenv.error;
}
// call express
let express = require('express');
// call router
let router = express.Router();
//call mysql2
let mysql = require('mysql2');
// create the pool
let pool = mysql.createPool({
    socketPath: process.env.MYSQL_SOCKET,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// call util
let util = require('util');
// call typy
let t = require('typy').default;
// Creat Vars in an Object and define properties.

let SiteVar = Object.create(null, {});
Object.defineProperty(SiteVar, 'locals', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: {},
});
Object.defineProperty(SiteVar.locals, 'title', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: 'Javascript Developer',
});
Object.defineProperty(SiteVar.locals, 'description', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: 'Javescript Developer - Umsetzung von Projekt',
});
Object.defineProperty(SiteVar.locals, 'featuredImage', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: '/images/default-image.jpg',
});
Object.defineProperty(SiteVar.locals, 'canonical', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: '/',
});
Object.defineProperty(SiteVar.locals, 'siteName', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: 'jsdapp',
});
Object.defineProperty(SiteVar.locals, 'siteSlogan', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: 'Responsive & Dynamische Website',
});
Object.defineProperty(SiteVar.locals, 'siteLogo', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: '/logo/trischula.png',
});
Object.defineProperty(SiteVar.locals, 'siteLogoOneX', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: '/logo/trischula_1x.png 1x',
});
Object.defineProperty(SiteVar.locals, 'siteLogoOneX', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: '/logo/trischula_1x.png 1x',
});
Object.defineProperty(SiteVar.locals, 'siteLogoTwoX', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: '/logo/trischula_2x.png 2x',
});
Object.defineProperty(SiteVar.locals, 'siteLogoThreeX', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: '/logo/trischula_3x.png 3x',
});


// Establish a Pool-connection to the Database
pool.getConnection(async(err, connection) => {
    // Vererbe SiteVar 
    let SiteVarExt = Object.create(SiteVar);
    try {
        if (connection) {
            //* connection is possible, extend Sitevar, transfer it to rs.locals
            if (process.env.NODE_ENV == 'Dev') console.log('Database connected');
            // establish Promise 
            pool.query = util.promisify(pool.query);
            //query for Designation for Article in index.htm 
            let designationQuery = "select Section, contentxml_id from getKey";
            ResultsDesignation = await pool.query(designationQuery);
            //* Got the Desgination from Database
            // loop with the length of ResultsDesignation
            if (ResultsDesignation.length) {
                for (let i = 0; i < ResultsDesignation.length; i++) {
                    // Define the index of Enumeration for the query, the index of DB has no zero
                    iQ = i;
                    iQ++;
                    // use ResultsDesignation as Designation for the lists
                    let asDesignation = {
                        'tsr': ResultsDesignation[i].Section + '_tsr',
                        'hdr': ResultsDesignation[i].Section + '_hdr',
                        'cntnt': ResultsDesignation[i].Section + '_cntnt',
                        'brdcrmpKey': ResultsDesignation[i].Section,
                        'brdcrmpVar': ResultsDesignation[i].Section + '_brdcrmp'
                    };
                    // Check if AsDesignation is a String 
                    if (t(asDesignation, 'tsr').isString && t(asDesignation, 'hdr').isString && t(asDesignation, 'cntnt').isString) {
                        // Query for the values from Database
                        try {
                            // Add Property SectionId
                            SiteVarExt.locals[ResultsDesignation[i].Section + '_id'] = ResultsDesignation[i].Section;
                            // Get Vars for Slideshow
                            let slideQuery = 'SELECT teaser AS ' + asDesignation.tsr + ', ueberschrift as ' + asDesignation.hdr + ', absatz as ' + asDesignation.cntnt + ' from contentxml WHERE' + pool.escape(iQ);
                            let SlideResults = await pool.query(slideQuery);
                            // Add Properties to SiteVar.locals 
                            SiteVarExt.locals[asDesignation.tsr] = SlideResults[i][asDesignation.tsr];
                            SiteVarExt.locals[asDesignation.hdr] = SlideResults[i][asDesignation.hdr];
                            SiteVarExt.locals[asDesignation.cntnt] = SlideResults[i][asDesignation.cntnt];
                            //* Transfered all Queries to Properties

                        } catch {
                            if (process.env.NODE_ENV == 'Dev') console.log('pool.getConnection: can not got the Queries & transfer to SiteVars');
                        }
                        try {
                            // Get Vars for Breadcrump
                            let brdcrmpQuery = 'SELECT bc_text AS ' + asDesignation.brdcrmpVar + ' from breadcrump WHERE' + pool.escape(iQ);
                            let BrdcrmpResults = await pool.query(brdcrmpQuery);

                            // Add Properties to SiteVar.locals 
                            SiteVarExt.locals[asDesignation.brdcrmpVar] = BrdcrmpResults[i][asDesignation.brdcrmpVar];

                            //* Transfer Queries to Properties
                        } catch {
                            if (process.env.NODE_ENV == 'Dev') console.log('pool.getConnection: can not got the Queries for Breadcrump');
                        }
                    } else {
                        if (process.env.NODE_ENV == 'Dev') console.log('pool.getConnection: asDesignation are not Strings');
                    }
                }
            } else {
                if (process.env.NODE_ENV == 'Dev') console.log('pool.getConnection: no Designation for the lists');
            }

            //* Enabling Router and use it the Database-Connection-Callout 
            // transfer the SiteVar to the Callout from router.get
            renderSite(SiteVarExt);
        }
    } catch {
        if (err) throw err;
    }
})

// Conatain the Callout for the Router
// Parameter
// @SiteVarToDo: The with Databasequeries extended SiteVar
function renderSite(SiteVarToDo) {
    // get Callout from Router
    router.get('/', function(req, res, next) {
        transferVars(Object.create(SiteVarToDo), res)
            // Render the template
        res.render('index', '');
    });
}

// Transfer SiteVar to res.locals
function transferVars(SiteVarTodo, res) {
    // Iterate over the property names, transfer value to res.locals
    for (let key of Object.keys(SiteVarTodo.locals)) {
        let value = SiteVarTodo.locals[key];
        res.locals[key] = String(value);
    }
    console.log('Vars already dispatched')

}
module.exports = router;