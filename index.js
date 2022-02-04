const urlsBox = document.querySelector("#urls-box");
const openButton = document.querySelector("#open-button");

openButton.addEventListener("click", e => {
    const linkString = e.target.value;
    const linksArray = linkString.split('\n');
    linksArray.forEach(link => open(link, link));
});
