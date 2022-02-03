const _ = require("lodash");
const axios = require("axios");
const fs = require("fs");
const Papa = require('papaparse');

/**
 * load the URL
 * re-run with '.meta.pagination.links.next', if it exists
*/
function loadFromIotmUrl(url) {
    return axios.get(url)
        .then(response => {
            // see data type information at the bottom
            const retrievedData = [];
            response.data.data.forEach(bandOrVenue => {
                const trimmedData = _.pick(bandOrVenue, ['display_name', 'website', 'songkick', 'soundcloud', 'city', 'state', 'created_at', 'genres', 'bio']);
                trimmedData.genres = trimmedData.genres.data.map(genreObj => genreObj.genre);
                trimmedData.songkick = trimmedData.songkick ?? 'https://www.songkick.com/artists/' + trimmedData.songkick;
                trimmedData.soundcloud = trimmedData.soundcloud ?? 'https://soundcloud.com/' + trimmedData.soundcloud;
                const hasWebsite = trimmedData.website && trimmedData.website.toLowerCase().indexOf("myspace.com") === -1;
                if (hasWebsite || trimmedData.soundcloud || trimmedData.songkick) {
                    retrievedData.push(trimmedData);
                }
            })
            const maybeNextLink = response.data.meta.pagination.links.next;
            if (maybeNextLink) {
                return loadFromIotmUrl(maybeNextLink)
                    .then(nestedRetrieval => retrievedData.concat(nestedRetrieval));
            } else {
                return retrievedData;
            }
        });
}

if (process.argv.length < 3) {
    console.error("didn't supply a URL");
    return 1;
}

const url = process.argv[2];
const expectedPrefix = "https://www.indieonthemove.com/";
if (!url.startsWith(expectedPrefix)) {
    console.error("didn't know how to handle URL");
    return Promise.reject("didn't know how to handle URL");
}
const apiUrl = url.slice(0, expectedPrefix.length) + 'api/' + url.slice(expectedPrefix.length);

loadFromIotmUrl(apiUrl).then(retrievedData => {
    const csvString = Papa.unparse(retrievedData);
    return fs.promises.writeFile("output.csv", csvString);
});

/*
 * IOTM Users API structure (trimmed to mostly things I'll use):
 * type UsersResponse = {
 *   data: [
 *     {
 *       country: string;
 *       state: string;
 *       city: string;
 *       display_name: string;
 *       bio: string;
 *       localclubs: string;
 *       website: string;
 *       songkick: string;
 *       soundcloud: string;
 *       created_at: string;
 *       genres: {
 *         data: [{
 *             id: number;
 *             genre: string;
 *             order: number;
 *           }];
 *       }
 *     }
 *   ],
 *   meta: {
 *     pagination: {
 *       total: number;
 *       count: number;
 *       per_page: number;
 *       current_page: number;
 *       total_pages: number;
 *       links: {
 *         previous?: string;
 *         next?: string;
 *       }
 *     }
 *   }
 * }
*/

