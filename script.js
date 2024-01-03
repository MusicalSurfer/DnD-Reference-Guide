/////////////////////////////////Day 1 Todos////////////////////////////////////////////////////////////////
// TODO: Add a event listener on button for when it is hovered over to highlight.
// TODO: Create a get request with url to access data.
// TODO: Manipulate the DOM to display search results
// TODO: Add buttons to each search result to allow for user to select for more information.
// TODO: create final result page to display information about selected topic.
/////////////////////////////////Day 2 Todos////////////////////////////////////////////////////////////////
// TODO: Style page.
// TODO: Launch page.

const dndReference = {
    apiUrl: "https://www.dnd5eapi.co", // Web API

    // Main program function.
    mainProgram: () => {
        dndReference.searchButtonClick();
        $('#searchBar').prop('placeholder', $('input[name="category"]:checked').val());
        $('#searchForm').on('click', (e) => {
            let category = $('input[name="category"]:checked').val(); // Store the value of category selected.
            $('#searchBar').prop('placeholder', category);
        })
    },

    // Function for assigning event listener to search button.
    searchButtonClick: () => {
        $('#searchButton').click(dndReference.searchHandler);
    },

    // Event handler for searchButtonClick that checks the user input and category to fetch data from api.
    searchHandler: (e) => {
        const $searchBar = $('#searchBar');
        const category = $('input[name="category"]:checked').val(); // Store the value of category selected.
        const userInput = $searchBar.val().toLowerCase();
        const encodedInput = encodeURIComponent(userInput); // Encode user input
        const searchUrl = dndReference.apiUrl + '/api/' + category + '?name=' + encodedInput; // Final URL to search

        $('#results').empty();
        $('#searchBar').prop('placeholder', category);

        $.get(searchUrl, (data) => {
            for (obj of data.results) {
                console.log(obj);
                dndReference.createObjResultCard(obj);
            }
        })
    },

    createObjResultCard: (obj) => {
        const name = obj.name;
        const url = dndReference.apiUrl + obj.url;
        const $results = $('#results');
        const $resultCard = $(`<span class="result-card"></span>`)
        const $cardTitle = $(`<h3 class="card-title">${name}</h3>`);
        const $moreInfoButton = $(`<button class="more-button">More info</button>`)

        if (!obj.url) {

            return;
        }
        else {
            $moreInfoButton.click(() => {
                dndReference.buttonHandler(obj, url)
            });

            $results.append($resultCard).append($cardTitle).append($moreInfoButton);
        }
    },

    buttonHandler: (obj, url) => {
        $('#results').empty();
        const name = obj.name;
        const $resultCard = $(`<span class="result-card"></span>`)
        const $moreTitle = $(`<h3 class="more-title">${name}</h3>`);

        $.get(url, (data) => {
            console.log(data);
            for (dataObj in data) {
                const topic = dataObj;
                const description = data[dataObj];
                const $moreTopic = $(`<h5 class="more-title">${topic}:</h5>`);
                let $moreDescription = $(`<p class="more-description">${description}</p>`)

                if (Array.isArray(description) && typeof description[0] === 'object') {
                    for (obj of description) {
                        if (!obj.url) {
                            for (key in obj) {
                                const $extraTopic = $(`<p class="extra-topic">${key}: ${obj[key]}</p>`)
                                $('#results').append($moreTopic).append($extraTopic);
                            }
                        }
                        else {
                            const $descriptionButton = $(`<button>${obj.name}</button>`)
                            $descriptionButton.click(() => {
                                dndReference.createMoreInfoCard(obj, obj.url);
                            })

                            $('#results').append($moreTopic).append($descriptionButton);
                        }
                    }
                }
                else if (!Array.isArray(description) && typeof description === 'object') {
                    for (key in description) {
                        if (!Array.isArray(key) && typeof key === 'object') {
                            for (key in description) {
                                const $descriptionButton = $(`<button>${key.name}</button>`)
                                $descriptionButton.click(() => {
                                    dndReference.createMoreInfoCard(obj, key.url);
                                })

                                $('#results').append($moreTopic).append($descriptionButton);
                            }
                        }
                    }
                }
                else {
                    $('#results').append($moreTopic).append($moreDescription);
                }
            }
        })

        $('#results').append($resultCard).append($moreTitle);
    },
}
dndReference.mainProgram();