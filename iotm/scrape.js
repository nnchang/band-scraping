const genresUrl = new URL('https://www.indieonthemove.com/api/genres');
const countriesUrl = new URL('https://www.indieonthemove.com/api/countries?with=users');
const statesUrl = new URL('https://www.indieonthemove.com/api/states?country_id=1');
const citiesUrl = new URL('https://www.indieonthemove.com/api/cities?state_id=237');
const usersUrl = new URL('https://www.indieonthemove.com/api/users?city=543&country=1&genres[]=63&include=genres&radius=100&sort_by=follower_count&sort_order=descending&state=237&type=band');

const genres = {"data":[{"id":212,"genre":"1-step","order":500}]};
const countries = {"data":[{"id":1,"name":"United States","sortname":"US"}]};
const states = {"data":[{"id":232,"name":"Alabama","country_id":1},{"id":231,"name":"Alaska","country_id":1},{"id":236,"name":"Arizona","country_id":1},{"id":234,"name":"Arkansas","country_id":1},{"id":237,"name":"California","country_id":1},{"id":238,"name":"Colorado","country_id":1},{"id":239,"name":"Connecticut","country_id":1},{"id":241,"name":"Delaware","country_id":1},{"id":641,"name":"District of Columbia","country_id":1},{"id":242,"name":"Florida","country_id":1},{"id":244,"name":"Georgia","country_id":1},{"id":246,"name":"Hawaii","country_id":1},{"id":248,"name":"Idaho","country_id":1},{"id":249,"name":"Illinois","country_id":1},{"id":250,"name":"Indiana","country_id":1},{"id":247,"name":"Iowa","country_id":1},{"id":251,"name":"Kansas","country_id":1},{"id":252,"name":"Kentucky","country_id":1},{"id":253,"name":"Louisiana","country_id":1},{"id":256,"name":"Maine","country_id":1},{"id":255,"name":"Maryland","country_id":1},{"id":254,"name":"Massachusetts","country_id":1},{"id":258,"name":"Michigan","country_id":1},{"id":259,"name":"Minnesota","country_id":1},{"id":262,"name":"Mississippi","country_id":1},{"id":260,"name":"Missouri","country_id":1},{"id":263,"name":"Montana","country_id":1},{"id":266,"name":"Nebraska","country_id":1},{"id":270,"name":"Nevada","country_id":1},{"id":267,"name":"New Hampshire","country_id":1},{"id":268,"name":"New Jersey","country_id":1},{"id":269,"name":"New Mexico","country_id":1},{"id":271,"name":"New York","country_id":1},{"id":264,"name":"North Carolina","country_id":1},{"id":265,"name":"North Dakota","country_id":1},{"id":272,"name":"Ohio","country_id":1},{"id":273,"name":"Oklahoma","country_id":1},{"id":274,"name":"Oregon","country_id":1},{"id":275,"name":"Pennsylvania","country_id":1},{"id":278,"name":"Rhode Island","country_id":1},{"id":279,"name":"South Carolina","country_id":1},{"id":280,"name":"South Dakota","country_id":1},{"id":281,"name":"Tennessee","country_id":1},{"id":282,"name":"Texas","country_id":1},{"id":283,"name":"Utah","country_id":1},{"id":286,"name":"Vermont","country_id":1},{"id":284,"name":"Virginia","country_id":1},{"id":287,"name":"Washington","country_id":1},{"id":289,"name":"West Virginia","country_id":1},{"id":288,"name":"Wisconsin","country_id":1},{"id":290,"name":"Wyoming","country_id":1}],"meta":{"pagination":{"total":51,"count":51,"per_page":999,"current_page":1,"total_pages":1,"links":{}}}};
const cities = {"data":[{"id":2463,"name":"Agoura Hills","state_id":237,"selectable":1,"state":{"data":{"id":237,"name":"California","country_id":1}}}],"meta":{"pagination":{"total":353,"count":353,"per_page":999,"current_page":1,"total_pages":1,"links":{}}}};
const users = {"data":[{"uuid":"bb287e62-d840-4231-b55d-9676a7e6fdf1","username":"mparsons48","postal_code":"92110","address":"","longitude":-117.199996,"latitude":32.7657318,"country_id":"1","state_id":"237","city_id":"543","country":"United States","state":"California","city":"San Diego","custom_city":"","display_name":"matt alan","first_name":"Matthew","last_name":"Parsons","bio":"","localclubs":"","type":"band","private":false,"img_url":"\/resize\/images\/users\/bb287e62-d840-4231-b55d-9676a7e6fdf1\/d12649e5-2517-4a35-8bc6-97693eb62094","website":"","songkick":"","soundcloud":"","notify_show_availability":true,"notify_email":true,"notify_follower":true,"notify_message":true,"notify_venue_deleted":true,"notify_venue_offline":true,"notify_venue_media":true,"notify_venue_booker":true,"notify_venue_review_request":true,"notify_user_media":true,"notify_user_calendar":true,"state_code":"CA","created_at":"2022-01-19 00:41:43","distance":4.130999375451064,"follower_count":0,"genres":{"data":[{"id":28,"genre":"Folk","order":500},{"id":17,"genre":"Country","order":500},{"id":63,"genre":"Rock","order":500}]}}],"meta":{"pagination":{"total":511,"count":1,"per_page":15,"current_page":35,"total_pages":35,"links":{"previous":"https:\/\/www.indieonthemove.com\/api\/users?city=543&country=1&genres%5B0%5D=63&include=genres&radius=100&sort_by=follower_count&sort_order=descending&state=237&type=band&page=34"}}}};

/*
1. Get countries and genres
2. Once country is selected, get states
3. Once state is selected, get cities
4. Once city is selected, allow dumping
    a. allow radius selection
*/


/*
take a URL for an input
load the URL
re-run with '.meta.pagination.links.next', if it exists
*/
