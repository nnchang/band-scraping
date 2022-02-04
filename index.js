const urlsBox = document.querySelector("#urls-box");
const openButton = document.querySelector("#open-button");

openButton.addEventListener("click", e => {
    const linkString = urlsBox.value;
    const linksArray = linkString.split('\n');
    linksArray
        .filter(link => link)
        .forEach(link => open(link, link));
});
