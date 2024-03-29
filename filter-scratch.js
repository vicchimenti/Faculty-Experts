{/* <script> */}


/***
*   @author Victor Chimenti, MSCS
*   @file filter.js
*   @see https://www.seattleu.edu/newsroom/experts/
*        Seattle University Newsroom Experts Application
*
*   @version 5.3.3
*/




/***
 * Populate Dropdown Menu Select Options
 * Currently using the T4 List Group Element
 * 
 */
const listItemsNode = document.querySelectorAll("li.list-group-item");
let listItemsArr = []
for (const item of listItemsNode) {

    listItemsArr.push(item.innerHTML);
}

const listSet = new Set(listItemsArr);
let optionArr = Array.from(listSet);
optionArr.sort();
let select = document.getElementById("categoryOptions");
for(let i = 0; i < optionArr.length; i++) {

    let encodedStr = optionArr[i].replace(/&amp;/g, "&");
    let el = document.createElement("option");
    el.textContent = encodedStr;
    el.value = encodedStr;
    select.appendChild(el);
}



/***
 * scratch items for semicolon list debugging
 */
//  const categoryDropdown = document.querySelector('#categoryOptions');
//  console.log(categoryDropdown);
 
//  const categoryKeywordSearch = document.querySelector('#find-experts');
//  console.log(categoryKeywordSearch);
 
//  const profiles = document.getElementsByClassName("profileItem");
//  categoryKeywordSearch.classList.add("classToBeAdded");
//  console.log(profiles);
 
 const disciplines = document.querySelectorAll(".disciplineList");
//  for (const expert of experts) {
//      expert.classList.add("gotya");
//  }
//  console.log(disciplines);
 
//  const listItemsNode = document.querySelectorAll('li.list-group-item');
 
 
 // console.log(listItemsArr);
 
 let disciplineItems = [];
 
 for (const item of disciplines) {
    disciplineItems.push(item.innerHTML);
 
    //  console.log(item.innerText);
 }
 
 
 console.log(...disciplineItems);
 
//  let listSet = new Set(listItemsArr);
//  let optionArr = Array.from(listSet);
 
//  optionArr.sort();
 
//  console.log(...optionArr);
//  console.log(listItemsArr.length);
//  console.log(optionArr.length);
 
 
 
 // const input = document.querySelectorAll('.ul.list-group');
 // let inputArray = [];
 // for (const i of input) {
 //     inputArray.push(i.input.)
 // }
 // console.log(...input);
 
 
 // let lis = document.getElementsByClassName("profileItem").getElementsByTagName("li");
 // let lis = document.getElementById("navbar").getElementsByTagName("li");
 // console.log(...lis);
 
 





 

$(function () {
    $(window).load(function () {
        // Once window loads set a timeout delay
        setTimeout(function () {




            //** global array holds list of content items that will render after filter selection **//
            let visibleItems = [];
            let parseItems = {};




            //   ***   Process and Parse Visible Items   ***   //
            $(function () {
                let parseItemsToDisplay = function() {
                    visibleItems = $('.profileItem').not('.hideByDropdownCategories, .hideByText');
                    if (!visibleItems.length > 0) {
                        $('.noResultsToShow').removeClass('hideResultsMessage');
                    } else {
                        $('.noResultsToShow').addClass('hideResultsMessage');
                    }
                };
                parseItems.process = parseItemsToDisplay;
            });

            
            
            
            //  ***   Keyword Search   ***   //
            $(function () {

                $('#find-experts').on('keyup', function () {

                    let keyword = $(this).val().toLowerCase();
                    $(function () {
                        $('.profileItem').filter(function () {
                            $(this).toggleClass('hideByText', !($(this).text().toLowerCase().indexOf(keyword) > -1));
                        });
                    });

                    parseItems.process();
                });
            });




            //   ***   Category Filter   ***   //
            $(function () {

                $('#categoryOptions').change(function () {

                    let typeKey = $(this).val();
                    if (typeKey) {

                        $('ul.list-group').filter(function (i, e) {
                            var typeValue = $(this).text();
                            if (typeValue.match(typeKey)) {
                                $(this).parents('.profileItem').removeClass('hideByDropdownCategories');
                            } else {
                                $(this).parents('.profileItem').addClass('hideByDropdownCategories');
                            }
                        });

                    } else {

                        $('.profileItem').removeClass('hideByDropdownCategories');
                    }

                    parseItems.process();
                });
            });




        }, 10);
    });
});


// </script>
