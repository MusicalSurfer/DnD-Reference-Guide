const apiUrl = "https://www.dnd5eapi.co/api";
const fetchData = () => {
    // Use jQuery to make the AJAX request using jQuery
    $.get('https://www.dnd5eapi.co/api', (data) => {
        // Display the data on the page
        console.log(data);
    })
        .fail(() => {
            // Display an error message if the request fails.
            console.log('Error with fetching data');
        });
}
console.log(fetchData());