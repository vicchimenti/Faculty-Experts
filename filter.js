{/* <script> */}


/***
*   @author Victor Chimenti, MSCS
*   @file filter.js
*   @see https://www.seattleu.edu/newsroom/experts/
*        Seattle University Newsroom Experts Application
*
*   @version 5.2.4
*/




/***
 * Populate Dropdown Menu Select Option
 * Currently using the T4 List Group Element
 * 
 */
const listItemsNode = document.querySelectorAll('li.list-group-item');
let select = document.getElementById("categoryOptions");

let listItemsArr = []
for (const item of listItemsNode) {

    listItemsArr.push(item.innerHTML);

}

const listSet = new Set(listItemsArr);
let optionArr = Array.from(listSet);
optionArr.sort();

for(let i = 0; i < optionArr.length; i++) {

    let encodedStr = optionArr[i].replace(/&amp;/g, '&');
    let el = document.createElement("option");
    el.textContent = encodedStr;
    el.value = encodedStr;
    select.appendChild(el);

}


 

$(function () {
    // After the DOM is ready, Wait until the window loads
    $(window).load(function () {
        // Once window loads set a timeout delay
        setTimeout(function () {




            //** global array holds list of content items that will render after filter selection **//
            var visibleItems = [];
            var parseItems = {};



            
            //   ***   Process and Parse Visible Items   ***   //
            $(function () {
                let parseItemsToDisplay = function() {
                    // assign array of currently visible content items
                    visibleItems = $('.profileItem').not('.hideByDropdownCategories, hideByText');
                    // check to see if array is empty
                    if (visibleItems.length == 0) {
                        // when array is empty show the results message
                        $('.noResultsToShow').removeClass('hideResultsMessage');
                    } else {
                        // when array has content items suppress the results message
                        $('.noResultsToShow').addClass('hideResultsMessage');
                    }
                };
                parseItems.process = parseItemsToDisplay;
            });
            
            
            
            
            //  ***   Keyword Search   ***   //
            $(function () {
                // scan the keyword each character the user inputs
                $('#find-experts').on('keyup', function () {
                    // Assign Search Key
                    let keyword = $(this).val().toLowerCase();
                    // filter the items for the input key
                    $(function () {
                        $('.profileItem').filter(function () {
                            // when the search key is not present in the item then hide the item
                            $(this).toggleClass('hideByText', !($(this).text().toLowerCase().indexOf(keyword) > -1));
                        });
                    });
                    // parse out unselected content items and limit display to user selected items
                    parseItems.process();
                });
            });




            //   ***   Category Filter   ***   //
            $(function () {

                // let selectElement = document.getElementById('selectboxCategorieOptions');
                // selectElement.addEventListener('change', (event) => {

                // });


                // When the Dropdown Menu Selector Course Types Change - Execute change function
                $('#categoryOptions').change(function () {
                    // document.getElementsByClassName('gridOrganizer').classList.add("classToBeAdded");

                    // document.getElementById("div1").classList.add("classToBeAdded");
                    // Assign Search Key
                    let typeKey = $(this).val();
                    // If Search Key is Not Null then Compare to the Type List Items in Each Content Item
                    // document.getElementsByClassName('profileItem').classList.remove("hideByDropdownCategories");
                    if (typeKey) {
                        // search tags in each item
                        $('ul.list-group').filter(function (i, e) {
                            var typeValue = $(this).text();
                            // Check to see if the Key and Value are a Match
                            if (typeValue.match(typeKey)) {
                                $(this).parents('.profileItem').removeClass('hideByDropdownCategories');
                            } else {
                                $(this).parents('.profileItem').addClass('hideByDropdownCategories');
                            }
                        });
                        // Else the Search Key is Null so Reset all Content Items to Visible
                    } else {
                        // let elements = document.querySelectorAll(".profileItem");
                        // elements.classList.remove("hideByDropdownCategories");
                        // document.getElementsByClassName("profileItem").classList.remove("hideByDropdownCategories");
                        $('.profileItem').removeClass('hideByDropdownCategories');
                    }
                    // parse out unselected content items and limit display to user selected items
                    parseItems.process();
                });
            });




        }, 10);
    });
});


// </script>
