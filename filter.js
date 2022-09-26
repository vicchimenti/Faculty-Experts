<script>
/***
*   @author Victor Chimenti, MSCS
*   @file filter.js
*   @see https://www.seattleu.edu/newsroom/experts/
*        Seattle University Newsroom Experts Application
*
*   @version 5.1
*/






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
            $(function () {
                // scan the keyword each character the user inputs
                $('#id_search').on('keyup', function () {
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
                // When the Dropdown Menu Selector Course Types Change - Execute change function
                $('#selectboxCategorieOptions').change(function () {
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
                        let elements = document.querySelectorAll(".profileItem");
                        elements.classList.remove("hideByDropdownCategories");
                        // document.getElementsByClassName("profileItem").classList.remove("hideByDropdownCategories");
                        // $('.profileItem').removeClass('hideByDropdownCategories');
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
</script>
