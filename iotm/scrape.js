const _ = require("lodash");
const axios = require("axios");
const fs = require("fs");
const Papa = require('papaparse');

const venueColumns = ['title', 'capacity', 'website', 'facebook', 'yelp', 'twitter', 'phone', 'address', 'city', 'state', 'created_at', 'song_types', 'categories', 'description'];
const bandColumns = ['display_name', 'website', 'songkick', 'soundcloud', 'city', 'state', 'created_at', 'genres', 'bio'];

function processBand(bandOrVenue) {
    const trimmedData = _.pick(bandOrVenue, bandColumns);
    trimmedData.genres = trimmedData.genres?.data.map(genreobj => genreobj.genre);
    trimmedData.songkick = trimmedData.songkick ?? 'https://www.songkick.com/artists/' + trimmedData.songkick;
    trimmedData.soundcloud = trimmedData.soundcloud ?? 'https://soundcloud.com/' + trimmedData.soundcloud;
    const hasWebsite = trimmedData.website && trimmedData.website.toLowerCase().indexOf("myspace.com") === -1;
    if (!hasWebsite && !trimmedData.soundcloud && !trimmedData.songkick) {
        return null;
    }
    return trimmedData;
}

function processVenue(bandOrVenue) {
    const trimmedData = _.pick(bandOrVenue, venueColumns);
    trimmedData.categories = trimmedData.categories?.data.map(categoryObj => categoryObj.name).join(', ');
    const hasWebsite = trimmedData.website && trimmedData.website.toLowerCase().indexOf("myspace.com") === -1;
    if (!hasWebsite && !trimmedData.facebook && !trimmedData.phone) {
        return null;
    }
    return trimmedData;
}

function loadFromIotmUrl(url, isVenue) {
    if (!isVenue && url.indexOf('users') === -1) {
        return Promise.reject('URL was not for band or venue');
    }
    return axios.get(url)
        .then(response => {
            const retrievedData = response.data.data
                .map(bandOrVenue => isVenue ? processVenue(bandOrVenue) : processBand(bandOrVenue))
                .filter(processed => processed != null);
            const maybeNextLink = response.data.meta.pagination.links.next;
            if (maybeNextLink) {
                return loadFromIotmUrl(maybeNextLink, isVenue)
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
const isVenue = url.indexOf('venues') > -1;
const apiUrl = url.slice(0, expectedPrefix.length) + 'api/' + url.slice(expectedPrefix.length);

loadFromIotmUrl(apiUrl, isVenue).then(retrievedData => {
    console.log(retrievedData[0])
    const columns = isVenue ? venueColumns : bandColumns;
    const csvString = Papa.unparse(retrievedData, { columns });
    return fs.promises.writeFile("output.csv", csvString);
});
