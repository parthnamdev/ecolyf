const searchInput = document.querySelector(".search-tag");
const suggestionPanel = document.querySelector(".suggestions");
let stands = ['Ashwa','Garud','Sinh','Airawat','Jatayu','Mrigah','Mayura'];
// fetch('/cities.json')
// .then(result => result.json())
// .then((result) => {
//   cities = result;
// })
// .catch(err => {
//   console.log(err);
// })
// .then(() => {
  searchInput.addEventListener("keyup", () => {
    const input = searchInput.value.toLowerCase();
    suggestionPanel.innerHTML = '';
    const suggestions = stands.filter((city) => {
        return city.toLowerCase().startsWith(input);
    });
    suggestions.forEach((suggested) => {
        const div = document.createElement("div");
        div.innerHTML = suggested;
        div.setAttribute("onClick", "selectCity(this.innerHTML)");
        // div.setAttribute("id", suggested.name+"_"+suggested.state);
        suggestionPanel.appendChild(div);
    });
    if(input == "") {
        suggestionPanel.innerHTML = "";
    }
});
// });

function selectCity(city) {
    document.querySelector(".search-tag").value = city;
    suggestionPanel.innerHTML = "";
    
}
function autoFillSuggested(city) {
    selectCity(city);
}