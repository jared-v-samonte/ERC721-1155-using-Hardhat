const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https', apiPath: '/api/v0'}) 

var metaData = "{ \n";
metaData +=  "\t\"description\": \"Bold and Brasher but more\",\n";
metaData +=  "\t\"name\": \"Bolder and Brasher\",\n";
metaData +=  "\t\"image\": \"https://ipfs.io/ipfs/QmZci7xKPx8FgqMgGRgXnGvgP37hLJJDUmGzMeCJ9DipXS\",\n" ;
metaData +=  "\t\"attributes\": [ ... ],\n"
metaData += "}";

var jsonObj = JSON.stringify(metaData);

// add the metadata itself as well
await ipfs.add(jsonObj).then(result => {
    console.log('hash ', result.data);
  })
