/////////////////////////////////Day 1 Todos////////////////////////////////////////////////////////////////
// TODO: Add event listener for button clicked to search given url api.
// TODO: Add a event listener on button for when it is hovered over to highlight.
// TODO: Create a get request with url to access data.
// TODO: Manipulate the DOM to display search results
// TODO: Add buttons to each search result to allow for user to select for more information.
// TODO: create final result page to display information about selected topic.
/////////////////////////////////Day 2 Todos////////////////////////////////////////////////////////////////
// TODO: Style page.
// TODO: Launch page.

const dndReference = {
    apiUrl: "https://www.dnd5eapi.co/api/", // Web API

    mainProgram: () => {
        dndReference.searchButtonClick();
    },

    searchButtonClick: () => {
        const searchButton = $('#searchButton');
        searchButton.click(dndReference.searchHandler);
    },

    searchHandler: (e) => {
        const searchBar = $('#searchBar');
        const userInput = searchBar.val();
        const category = $('input[name="category"]:checked').val();
        console.log(category);
        if (!userInput) {
            alert('Please enter a search term');
            return;
        }

        const encodedInput = encodeURIComponent(userInput); // Encode user input
        const searchUrl = dndReference.apiUrl + category + '?name=' + encodedInput; // Final URL to search

        $.get(searchUrl, (data) => {
            for (obj of data.results) {
                console.log(obj);
                createResultCard(obj);
            }
        })
    },

    createResultCard: (obj) => {
        const name = obj.name;
        const url = obj.url;

        const $resultCard = $(`<span class="result-card"></span>`)
        const $cardTitle = $(`<h3 class="card-title">${name}</h3>`);
        const $moreInfoButton = $(`<button class="more-button">More info</button>`)
        $moreInfoButton.click(() => {
            createMoreInfoCard;
        })
    },

    createMoreInfoCard: (e) => {

    },
}
dndReference.mainProgram();