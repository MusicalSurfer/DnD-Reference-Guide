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

    // Event handler for when category is selected.
    categoryHandler: () => {
        dndReference.category = $('input[name="category"]:checked').val(); // Update category with new selection.
        $('#searchBar').prop('placeholder', dndReference.category); // Replace temp text in search bar with current category.
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
                dndReference.createMainResultCard(obj);
            }
        })
    },

    createMainResultCard: (obj) => {
        const name = obj.name;
        const url = dndReference.apiUrl + obj.url;
        const $results = $('#results');
        const $resultCard = $(`<span class="result-card"></span>`)
        const $cardTitle = $(`<h3 class="card-title">${name}</h3>`);
        const $moreInfoButton = $(`<button type="button" class="btn btn-secondary">More Info</button>`);
        // if ()
        $moreInfoButton.click(() => {
            dndReference.spellsButtonHandler(url)
        });

        $results.append($resultCard).append($cardTitle).append($moreInfoButton);
    },

    spellsButtonHandler: (url) => {
        $('#results').empty();
        $.get(url, (data) => {
            const name = data.name;
            const $resultCard = $(`<span class="result-card"></span>`)
            const $moreTitle = $(`<h3 class="more-title">${name}</h3>`);

            for (dataObj in data) {

                const $moreTopic = $(`<h5 class="more-topic">${dataObj}</h5>`);

                let $moreDescription = $(`<p class="more-description">${data[dataObj]}</p>`)

                $('#results').append($resultCard);
                $resultCard.append($moreTitle);
                $moreTitle.append($moreTopic);
                $moreTopic.append($moreDescription);
                // if (Array.isArray($moreDescription) && typeof $moreDescription[0] === 'object') {
                //     for (newObj of $moreDescription) {
                //         let newUrl = dndReference.apiUrl + obj.url;
                //         console.log(newObj);
                //         if (!obj.url) {
                //             for (key in newObj) {
                //                 const $extraTopic = $(`<p class="extra-topic">${key}: ${newObj[key]}</p>`)
                //                 $('#results').append($moreTopic).append($extraTopic);
                //             }
                //         }
                //         else {
                //             let $descriptionButton = $(`<button type="button" class="btn btn-secondary">${newObj.name}</button>`);
                //             $descriptionButton.click(() => {
                //                 console.log(newUrl);
                //                 dndReference.buttonHandler(newObj, newUrl);
                //             })

                //             $('#results').append($moreTopic).append($descriptionButton);
                //         }
                //     }
                // }
                // else if (!Array.isArray($moreDescription) && typeof $moreDescription === 'object') {
                //     for (key in $moreDescription) {
                //         if (!Array.isArray(key) && typeof key === 'object') {
                //             for (key in $moreDescription) {
                //                 let $descriptionButton = $(`<button type="button" class="btn btn-secondary">${key.name}</button>`);
                //                 $descriptionButton.click(() => {
                //                     dndReference.buttonHandler(obj, key.url);
                //                 })

                //                 $('#results').append($moreTopic).append($descriptionButton);
                //             }
                //         }
                //     }
                // }
                // else {
                //     $('#results').append($moreTopic).append($moreDescription);
                // }
            }
            $('#results').append($resultCard).append($moreTitle);
        })
    },
}
dndReference.mainProgram();