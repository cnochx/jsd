const express = require("express");
const router = express.Router();

const js2xmlparser = require("js2xmlparser");
const moment = require("moment");

/**
 * It generates an standard sitemal.xml for SEO purposes
 */
router.get("/", function(req, res, next) {
    try {
        //our records to index
        const records = getRecordsFromDataSource();
        const collection = [];
        let today = moment();
        today = today.format("YYYY-MM-DD");
        //add site root url
        const rootUrl = {};
        rootUrl.loc = "http://jsd.grellmann.eu/";
        rootUrl.lastmod = today;
        // The value "always" is used to describe documents that change with each access. 
        rootUrl.changefreq = "always";
        // The default priority of a page is 0.5.
        rootUrl.priority = "0.5";
        rootUrl["image:image"] = {
            "image:loc": "public/default-image.jpg",
            "image:caption": "Jungle Kali",
        };
        collection.push(rootUrl);

        //add recipes urls
        for (let i = 0; i < records.length; i++) {
            const url = {};
            url.loc = records[i].url;
            url.lastmod = records[i].updated_at;
            url["image:image"] = {
                "image:loc": records[i].featured_image_url,
                "image:caption": records[i].description,
            };

            collection.push(url);
        }
        const col = {
            "@": {
                xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
                "xmlns:image": "http://www.google.com/schemas/sitemap-image/1.1",
            },
            url: collection,
        };
        const xml = js2xmlparser.parse("urlset", col);
        res.set("Content-Type", "text/xml");
        res.status(200);
        res.send(xml);
    } catch (e) {
        next(e);
    }
});

/**
 * @return a collections to index (typically we'll get these records from our database)
 */
function getRecordsFromDataSource() {
    //these records will have our own structure, we return as they are and later we convert them to the xml standard format
    //so let's just define two records hard-coded

    const record1 = {
        url: "http://jsd.grellmann.eu/",
        description: "Homepage",
        featured_image_url: "http://jsd.grellmann.eu/public/default-image.jpg",
        updated_at: "2020-08-06",
    };
    return [record1];
}

module.exports = router;