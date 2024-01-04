// When a more info button is pushed, either I get the wrong title appearing at the top for selected topic
// I will get a title/topic placed incorrectly.



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
    category: $('input[name="category"]:checked').val(), // Store the value of category selected.
    // Main program function.
    mainProgram: () => {
        dndReference.searchButtonClick(); // Add event listener to search bar and button.

        // Add event listener to to search form to update categories.
        $('#searchForm').on('click', dndReference.categoryHandler)
    },

    // Function for assigning event listener to search button.
    searchButtonClick: () => {
        $('#searchButton').click(dndReference.searchHandler);
    },

    // Event handler for searchButtonClick that checks the user input and category to fetch data from api.
    searchHandler: () => {
        $('#results').empty();
        const $searchBar = $('#searchBar');
        const userInput = $searchBar.val().toLowerCase();
        const encodedInput = encodeURIComponent(userInput); // Encode user input
        const searchUrl = dndReference.apiUrl + '/api/' + dndReference.category + '?name=' + encodedInput; // Final URL to search

        // Perform get request for main result page.
        $.get(searchUrl, (data) => {
            for (obj of data.results) {
                dndReference.createMainResultCard(obj);
            }
        })
    },

    // Event handler for when category is selected.
    categoryHandler: () => {
        dndReference.category = $('input[name="category"]:checked').val(); // Update category with new selection.
        $('#searchBar').prop('placeholder', dndReference.category); // Replace temp text in search bar with current category.
    },

    createMainResultCard: (obj) => {
        const name = obj.name;
        const url = dndReference.apiUrl + obj.url;
        const $results = $(`<div id="results" class="card-body"></div>`)
        const $resultCard = $(`<div class="card"></div>`)
        const $cardTitle = $(`<h3 class="card-title">${name}</h3>`);
        const $moreInfoButton = $(`<button type="button" class="btn btn-secondary">More Info</button>`);

        if (dndReference.category === 'spells') {
            $moreInfoButton.click(() => {
                dndReference.spellsButtonHandler(url)
            });
        }
        $('#canvas').append($results)
        $results.append($cardTitle).append($resultCard).append($moreInfoButton);
    },

    spellsButtonHandler: (url) => {
        $('#results').empty();
        $.get(url, (data) => {
            const name = data.name;
            const $moreTitle = $(`<h3 class="more-title">${name}</h3>`);
            let valTopicArr = []; // Empty array for data to be filled by following edge case.
            let titleTopicArr = [];
            let descArr = data.desc;
            $('#results').append($moreTitle);

            // Conditional to check for spell damage data.
            if (!data.damage) {
                valTopicArr = [descArr, data.range, data.components, data.material, data.attack_type, data.school.name]
                titleTopicArr = ['Description', 'Range', 'Components', 'Material', 'Attack Type', 'School'];
            }
            else {
                valTopicArr = [descArr, data.range, data.components, data.material, data.attack_type, data.damage.damage_type.name, data.school.name];
                titleTopicArr = ['Description', 'Range', 'Components', 'Material', 'Attack Type', 'Damage Type', 'School'];
            }

            // For every topic, check to see if it exists, if it does, append it to the DOM, otherwise skip it.
            for (let i = 0; i < valTopicArr.length; i++) {
                const $resultCard = $(`<div class="card"></div>`)
                const $cardBody = $('<div class="card-body"></div>')
                const $moreTopic = $(`<h4 class="card-title">${titleTopicArr[i]}</h4>`)
                $('#results').append($resultCard);
                if (i === 0) {
                    for (let desc of valTopicArr[0]) {
                        const $moreDesc = $(`<p class="card-text">${desc}</p>`)
                        $resultCard.append($moreTopic);
                        $resultCard.append($cardBody);
                        $cardBody.append($moreDesc);
                    }
                } else {
                    const $moreDesc = $(`<p class="card-text">${valTopicArr[i]}</p>`)
                    if (!valTopicArr[i]) {
                        console.log(`Could not find ${titleTopicArr[i]}`)
                        continue;
                    }
                    $resultCard.append($moreTopic);
                    $resultCard.append($cardBody);
                    $cardBody.append($moreDesc);
                }
            }
        })
    },
}
dndReference.mainProgram();