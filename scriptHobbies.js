let patternIndex = 0;  
let originalIndex = 0;
let drapingIndex = 0;
let cherryChocIndex = 0;
let cupCakesIndex = 0;
let christmasIndex = 0;    

let patternClothes = document.getElementsByClassName("patternClothes");
let originalClothes = document.getElementsByClassName("originalDesignClothes");
let drapingProcess = document.getElementsByClassName("drapingProcess");
let cherryChocCake = document.getElementsByClassName("cherryChocCake");
let cupCakes = document.getElementsByClassName("cupCakes");
let christmasMadness = document.getElementsByClassName("christmasMadness");

document.getElementById("patternClothesNext").addEventListener("click", getNextPattern );
function getNextPattern() {
    patternIndex += 1;
     
    if (patternIndex >= patternClothes.length)
    {
        patternIndex = 0;
    }
    for (let i = 0; i < patternClothes.length ; i++)
    { 
        patternClothes[i].style.display = "none";
    }
    patternClothes[patternIndex].style.display = "block";
}
document.getElementById("patternClothesPrevious").addEventListener("click", getPreviousPattern);
function getPreviousPattern() {
    patternIndex -= 1;
     
    if (patternIndex < 0)
    {
        patternIndex = (patternClothes.length - 1);
    }
    for (let i = 0; i < patternClothes.length ; i++)
    { 
        patternClothes[i].style.display = "none";
    }
    patternClothes[patternIndex].style.display = "block";
}

document.getElementById("originalClothesNext").addEventListener("click", getNextOriginal);
function getNextOriginal() {

    originalIndex += 1;
     
    if (originalIndex >= originalClothes.length)
    {
        originalIndex = 0;
    }
    for (let i = 0; i < originalClothes.length ; i++)
    { 
        originalClothes[i].style.display = "none";
    }
    originalClothes[originalIndex].style.display = "block";
}
document.getElementById("originalClothesPrevious").addEventListener("click", getPreviousOriginal);
function getPreviousOriginal() {
    originalIndex -= 1;
     
    if (originalIndex < 0)
    {
        originalIndex = (originalClothes.length - 1);
    }
    for (let i = 0; i < originalClothes.length ; i++)
    { 
        originalClothes[i].style.display = "none";
    }
    originalClothes[originalIndex].style.display = "block";
}

document.getElementById("drapingProcessNext").addEventListener("click", drapingProcessNext);
function drapingProcessNext() {

    drapingIndex += 1;
     
    if (drapingIndex >= drapingProcess.length)
    {
        drapingIndex = 0;
    }
    for (let i = 0; i < drapingProcess.length ; i++)
    { 
        drapingProcess[i].style.display = "none";
    }
    drapingProcess[drapingIndex].style.display = "block";
}
document.getElementById("drapingProcessPrevious").addEventListener("click", drapingProcessPrevious);
function drapingProcessPrevious() {
    drapingIndex -= 1;
     
    if (drapingIndex < 0)
    {
        drapingIndex = (drapingProcess.length - 1);
    }
    for (let i = 0; i < drapingProcess.length ; i++)
    { 
        drapingProcess[i].style.display = "none";
    }
    drapingProcess[drapingIndex].style.display = "block";
}

document.getElementById("cherryChocCakeNext").addEventListener("click", cherryChocCakeNext);
function cherryChocCakeNext() {

    cherryChocIndex += 1;
     
    if (cherryChocIndex >= cherryChocCake.length)
    {
        cherryChocIndex = 0;
    }
    for (let i = 0; i < cherryChocCake.length ; i++)
    { 
        cherryChocCake[i].style.display = "none";
    }
    cherryChocCake[cherryChocIndex].style.display = "block";
}
document.getElementById("cherryChocCakePrevious").addEventListener("click", cherryChocCakePrevious);
function cherryChocCakePrevious() {
    cherryChocIndex -= 1;
     
    if (cherryChocIndex < 0)
    {
        cherryChocIndex = (cherryChocCake.length - 1);
    }
    for (let i = 0; i < cherryChocCake.length ; i++)
    { 
        cherryChocCake[i].style.display = "none";
    }
    cherryChocCake[cherryChocIndex].style.display = "block";
}

document.getElementById("cupcakesNext").addEventListener("click", cupcakesNext);
function cupcakesNext() {

    cupCakesIndex += 1;
     
    if (cupCakesIndex >= cupCakes.length)
    {
        cupCakesIndex = 0;
    }
    for (let i = 0; i < cupCakes.length ; i++)
    { 
        cupCakes[i].style.display = "none";
    }
    cupCakes[cupCakesIndex].style.display = "block";
}
document.getElementById("cupcakesPrevious").addEventListener("click", cupcakesPrevious);
function cupcakesPrevious() {
    cupCakesIndex -= 1;
     
    if (cupCakesIndex < 0)
    {
        cupCakesIndex = (cupCakes.length - 1);
    }
    for (let i = 0; i < cupCakes.length ; i++)
    { 
        cupCakes[i].style.display = "none";
    }
    cupCakes[cupCakesIndex].style.display = "block";
}

document.getElementById("christmasMadnessNext").addEventListener("click", christmasMadnessNext);
function christmasMadnessNext() {

    christmasIndex += 1;
     
    if (christmasIndex >= christmasMadness.length)
    {
        christmasIndex = 0;
    }
    for (let i = 0; i < christmasMadness.length ; i++)
    { 
        christmasMadness[i].style.display = "none";
    }
    christmasMadness[christmasIndex].style.display = "block";
}
document.getElementById("christmasMadnessPrevious").addEventListener("click", christmasMadnessPrevious);
function christmasMadnessPrevious() {
    christmasIndex -= 1;
     
    if (christmasIndex < 0)
    {
        christmasIndex = (christmasMadness.length - 1);
    }
    for (let i = 0; i < christmasMadness.length ; i++)
    { 
        christmasMadness[i].style.display = "none";
    }
    christmasMadness[christmasIndex].style.display = "block";
}
