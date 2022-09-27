{/* <script> */}


/***
*   @author Victor Chimenti, MSCS
*   @file filter.js
*   @see https://www.seattleu.edu/newsroom/experts/
*        Seattle University Newsroom Experts Application
*
*   @version 5.2.3
*/





const categoryDropdown = document.querySelector('#categoryOptions');
console.log(categoryDropdown);

const categoryKeywordSearch = document.querySelector('#find-experts');
console.log(categoryKeywordSearch);

const profiles = document.getElementsByClassName("profileItem");
categoryKeywordSearch.classList.add("classToBeAdded");
console.log(profiles);

const experts = document.querySelectorAll(".profileItem");
for (const expert of experts) {
    expert.classList.add("gotya");
}
console.log(...profiles);

const listItemsNode = document.querySelectorAll('li.list-group-item');


// console.log(listItemsArr);

let listItemsArr = []

for (const item of listItemsNode) {
    listItemsArr.push(item.innerHTML);

    // console.log(item.innerText);
}


console.log(...listItemsArr);

let listSet = new Set(listItemsArr);
let optionArr = Array.from(listSet);

optionArr.sort();

console.log(...optionArr);
console.log(listItemsArr.length);
console.log(optionArr.length);



// const input = document.querySelectorAll('.ul.list-group');
// let inputArray = [];
// for (const i of input) {
//     inputArray.push(i.input.)
// }
// console.log(...input);


// let lis = document.getElementsByClassName("profileItem").getElementsByTagName("li");
// let lis = document.getElementById("navbar").getElementsByTagName("li");
// console.log(...lis);


// input.forEach(function(el) {
//   el.addEventListener('input', function(e) {
//     if (e.target.value == "") {
//       e.target.profiles.classList.remove('form-group-with-value')
//     } else {
//       e.target.profiles.classList.add('form-group-with-value')
//     }

//   });
// });

// document.getElementsByClassName('gridOrganizer').classList.add("classToBeAdded");


let select = document.getElementById("categoryOptions");

for(let i = 0; i < optionArr.length; i++) {
    let opt = optionArr[i];
    let encodedStr = opt.replace(/&amp;/g, '&');
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
            
            
            
            
            //   ***   Keyword Search   ***   //
            // $(function () {
            //     // scan the keyword each character the user inputs
            //     $('#find-experts').on('keyup', function () {
            //         // Assign Search Key
            //         let keyword = $(this).val().toLowerCase();
            //         // filter the items for the input key
            //         $(function () {
            //             $('.profileItem').filter(function () {
            //                 // when the search key is not present in the item then hide the item
            //                 $(this).toggleClass('hideByText', !($(this).text().toLowerCase().indexOf(keyword) > -1));
            //             });
            //         });
            //         // parse out unselected content items and limit display to user selected items
            //         parseItems.process();
            //     });
            // });




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


            //   ***   School Filter   ***   //
            // $(function () {
            //     $('#SelectBox-BySchool input:radio').change(function () {
            //         let typeKey = $(this).val();
            //         let viewAll = "All";

            //         if (typeKey != viewAll) {
            //             $('.college').filter(function (i, e) {
            //                 var typeValue = $(this).text();

            //                 if (typeValue.match(typeKey)) {
            //                     $(this).parents('.cejscourseWrapper').removeClass('hideBySchool');
            //                 } else {
            //                     $(this).parents('.cejscourseWrapper').addClass('hideBySchool');
            //                 }

            //             });
            //         } else {
            //             $('.cejscourseWrapper').removeClass('hideBySchool');
            //         }

            //         parseItems.process();
            //     });
            // });

            // $(function () {
            //     $('#SelectBox-ByLsap').change(function () {
            //         let elementKeys = [];
            //         elementKeys[0] = 'Any';
            //         $('input[name=SelectBox-ByLsap]:checked').each(function (item) {
            //             elementKeys[item] = $(this).val();
            //         });

            //         if (elementKeys[0] != "Any") {
            //             $('ul.lsapIconDashboard').filter(function (i, e) {
            //                 let elementValue = $(this).text() || null;
            //                 $(this).parents('.cejscourseWrapper').addClass('hideByLsap');

            //                 if (elementValue) {

            //                     for (let index = 0; index < elementKeys.length; index++) {
            //                         if (elementValue.includes(elementKeys[index])) {
            //                             $(this).parents('.cejscourseWrapper').removeClass('hideByLsap');
            //                         }
            //                     }
            //                 }
            //             });
            //         } else {
            //             $('.cejscourseWrapper').removeClass('hideByLsap');
            //         }

            //         parseItems.process();
            //     });
            // });




        }, 10);
    });
});


// </script>
