const button = document.querySelector("#start-button");
const url = document.querySelector("#starting-url");
url.addEventListener("change", e => button.disabled = e.target.textContent.length === 0);

/**
 * load the URL
 * re-run with '.meta.pagination.links.next', if it exists
*/
function loadFromIotmUrl(url) {
    return fetch(e.target.textContent)
        .then(response => response.json())
        .then(data => {
            // see data type information at the bottom
            const retrievedData = [];
            data.data.forEach(bandOrVenue => {
                retrievedData.push(_.pick(bandOrVenue, ['display_name', 'website', 'city', 'state', 'songkick', 'soundcloud', 'created_at', 'genres', 'bio']));
            })
            const maybeNextLink = data.meta.pagination.links.next;
            if (maybeNextLink) {
                return loadFromIotmUrl(maybeNextLink);
            } else {
                return retrievedData;
            }
        });
}

button.addEventListener("click", e => {
    if (e.target.disabled) {
        return;
    }
    loadFromIotmUrl(e.target.textContent).then(retrievedData => {
        const csvString = Papa.unparse(retrievedData);
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csvString));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    });
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

