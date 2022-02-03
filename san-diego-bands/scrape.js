const _ = require('lodash');
const axios = require('axios').default;
const fs = require('fs');

let links;
try {
    const data = fs.readFileSync('./links.json', 'utf8');
    links = JSON.parse(data);
} catch (err) {
    console.error(err);
    return;
}

console.log(links.length);

let globalChunkedLinks = _.chunk(links, 10);

async function step(chunkedLinks) {
    const chunk = chunkedLinks[0];
    await Promise.all(chunk.map(async link => {
        const bandName = link.split('/')[4];
        const data = await axios.get(link, { headers: { accept: "text/html" } }).then(response => response.data);
        return fs.promises.writeFile('data/' + bandName + '.html', data);
    }).concat(new Promise(res => setTimeout(res, 1000))));
    return step(chunkedLinks.slice(1));
}

step(globalChunkedLinks);
