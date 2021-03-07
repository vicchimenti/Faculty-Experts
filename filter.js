<script type="text/javascript">
/***
*   @author Victor Chimenti, MSCS-SE '20
*   @file article-filter.js
*
*   jQuery
*   This script searches the Gadget Finder Article content items for matches to the
*   user selected search parameters in the filter field dropdown menu
*
*   @version 3.3
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
                    visibleItems = $('.newsItemWrapper').not('.hideByDropdownCategories');
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
                        $('.newsItem').filter(function () {
                            // when the search key is not present in the item then hide the item
                            $(this).toggleClass('hideByDropdownCategories', !($(this).text().toLowerCase().indexOf(keyword) > -1));
                        });
                    });
                    // parse out unselected content items and limit display to user selected items
                    parseItems.process();
                });
            });




            //   ***   Category Filter   ***   //
            $(function () {
                // When the Dropdown Menu Selector Course Types Change - Execute change function
                $('#selectboxCategories').change(function () {
                    // Assign Search Key
                    let typeKey = $(this).val();
                    // If Search Key is Not Null then Compare to the Type List Items in Each Content Item
                    if (typeKey) {
                        // search tags in each item
                        $('ul.categories').filter(function (i, e) {
                            var typeValue = $(this).text();
                            // Check to see if the Key and Value are a Match
                            if (typeValue.match(typeKey)) {
                                $(this).parents('.newsItemWrapper').removeClass('hideByDropdownCategories');
                            } else {
                                $(this).parents('.newsItemWrapper').addClass('hideByDropdownCategories');
                            }
                        });
                        // Else the Search Key is Null so Reset all Content Items to Visible
                    } else {
                        $('.newsItemWrapper').removeClass('hideByDropdownCategories');
                    }
                    // parse out unselected content items and limit display to user selected items
                    parseItems.process();
                });
            });




        }, 10);
    });
});
</script>
