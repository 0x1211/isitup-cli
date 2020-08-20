#!/usr/bin/env node
const fetch = require("node-fetch");

// console.log(process.argv);
const website = process.argv[2];

function isItUp(name) {
    const info = fetch(`https://isitup.org/${name}.json`).then(response => response.json());

    info.then(function(result) {
        if (result.response_code == 200) {
            console.log('\x1b[32m%s\x1b[0m', 'website is up and running');
        } else if (result.response_code == 301) {
            console.log('\x1b[34m%s\x1b[0m', 'website has been moved permanently but is up');
        } else if (result.response_code == 302){
            console.log('\x1b[34m%s\x1b[0m', 'temporary redirect, website is up');
        } else if (result.response_code == 403) {
            console.log('\x1b[33m%s\x1b[0m', 'information not found');
        } else {
            console.log('\x1b[31m%s\x1b[0m', 'website is down');
        }
    });
}

isItUp(website);
