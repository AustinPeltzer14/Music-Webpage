// active tab functionality

// Get all the lists and list items
const mainSection = document.querySelector('.main-section');
const list = document.querySelector('.listings-section');
const listItems = document.querySelectorAll('.tab-item');

// Add click event listener to each list item
listItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove 'active' class from all list items
        listItems.forEach(li => {
            li.classList.remove('active');
            list.removeAttribute('class');
            mainSection.removeAttribute('class');
        });
        // Add 'active' class to the clicked list item
        item.classList.add('active');
        list.classList.add("listings-section");
        mainSection.classList.add("main-section");
        if(item.innerHTML == "film/series") {
            list.classList.add("film");
            mainSection.classList.add("film");
        } else {
            list.classList.add(item.innerHTML);
            mainSection.classList.add(item.innerHTML);
        }
    });
});