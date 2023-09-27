/* add paragraph */
const newParagraph = document.createElement("p");
newParagraph.innerText = "Added with Javascript!";
document.body.appendChild(newParagraph);

/* add image */
const newImage = document.createElement("img");
newImage.setAttribute("src", "https://picsum.photos/200");
newImage.setAttribute("alt", "randomly selected small image");
document.body.appendChild(newImage);

/* add list */
const newDiv = document.createElement("div");
newDiv.innerHTML = "<ul><li>One</li><li>Two</li><li>Three</li></ul>";
document.body.appendChild(newDiv);

/* add section with h2 and paragraph */
const newSection = document.createElement("section");

const newH2 = document.createElement("h2");
newH2.innerText = "CSE 121b";
newSection.appendChild(newH2);

const newP = document.createElement("p");
newP.innerText = "Welcome to Javascript Language";
newSection.appendChild(newP);

document.body.appendChild(newSection);