const urlsBox = document.querySelector("#urls-box");
const openButton = document.querySelector("#open-button");

openButton.addEventListener("click", e => {
    const linksString = urlsBox.value;
    const linksArray = linksString.split('\n');
    linksArray
        .filter(link => link)
        .forEach(link => open(link, link));
});
