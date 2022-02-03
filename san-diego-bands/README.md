# San Diego bands

There's this website, the [San Diego Reader](https://www.sandiegoreader.com/bands/) that has an incredible amount of bands listed. Unfortunately the search is not very human-friendly and dumps results out in a single page. At least half of the listed bands' websites are gone. I got fed up with clicking around and getting nothing (not to mention getting lost on the search page), so I made something that would scrape the list of links I casually grabbed off the search page.

To start, create a file called `links.json` which contains a JSON list of links pulled from the `<a>` tags on the search page. Then create the `data` directory and run `node scrape.js`. This will dump out HTML for all the bands in question, running roughly 10 GETs a second. Then `node parse.js` will run through these HTML files and parse them into `output.csv`. You then have a list of band names, inception dates, and links. Much quicker to use, sort by inception date, filter, etc!
