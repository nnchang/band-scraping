const urlsBox = document.querySelector("#urls-box");
const openButton = document.querySelector("#open-button");

openButton.addEventListener("click", e => {
    const linksString = urlsBox.value;
    const linksArray = linksString.split('\n') 
        .filter(link => link);
    linksArray.slice(0, 10)
        .forEach(link => open(link, link));
    urlsBox.value = linksArray.slice(10).join('\n');
});
