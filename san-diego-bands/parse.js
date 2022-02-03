const _ = require('lodash');
const fs = require('fs');
const jsdom = require('jsdom');

const files = fs.readdirSync("data");
let globalChunkedFiles = _.chunk(files, 10);
fs.rmSync("output.csv", { force: true });
const outFile = fs.openSync("output.csv", "w");

fs.writeSync(outFile, "Band Name,Inception,Website\n");

async function step(chunkedFiles) {
    if (chunkedFiles.length === 0) {
        return;
    }
    const chunk = chunkedFiles[0];
    const data = [];
    await Promise.all(chunk.map(async filename => {
        const fileData = await fs.promises.readFile('data/' + filename);
        const document = new jsdom.JSDOM(fileData).window.document;
        const website = document.querySelector('.main-content-column a.button.button-outlined.w-inline-block')?.href;
        const bandName = document.querySelector('.article-inner-wrapper h1')?.textContent;
        const inception = Array.from(document.querySelectorAll('.additional-info__container div'))
            .filter(item => item.textContent.indexOf("Inception") > 0)[0]?.textContent
            .replace(/\W/gs, "")
            .slice(-4);
        if (website && bandName && inception) {
            data.push(`${bandName},${inception},${website}`);
        }
    }));
    fs.writeFileSync(outFile, data.join('\n') + '\n');
    return step(chunkedFiles.slice(1));
}

step(globalChunkedFiles).then(() => fs.writeFileSync('output.csv', data.join('\n')));
