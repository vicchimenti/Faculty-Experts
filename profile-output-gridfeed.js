/***
 *     @author Victor Chimenti, MSCS-SE '20
 *     @file profile-output-gridfeed.js
 *     @see Seattle University Experts Application at https://www.seattleu.edu/newsroom/for-the-media/
 * 
 *
 *     This new content type layout is a smart layout for news items that must obey
 *     a masonry grid layout. In this iteration this layout will be dedicated
 *     to the profile content type which is being developed for the faculty experts app.
 *
 *     This content layout will be the organizer layout and will link to the
 *     full text layout to reveal the full article.
 *
 *     Document will write once when the page loads
 *
 *     @version 2.11
 */




try {

    /***
     *  Assign local variables from the content type's fields
     * 
     * */
    var contentName = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Name' output='normal' modifiers='striptags,htmlentities' />");
    var lastName = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Last Name' output='normal' modifiers='striptags,htmlentities' />");
    var firstName = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='First Name' output='normal' modifiers='striptags,htmlentities' />");
    var titles = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Position Title(s)' output='normal' display_field='name' />");
    var degrees = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Degree(s)' output='normal' display_field='name' />");
    var college = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='College' output='normal' modifiers='striptags,htmlentities' />");
    var department = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Department' output='normal' modifiers='striptags,htmlentities' />");
    var summary = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Summary' output='normal' modifiers='striptags,htmlentities' />");
    var biography = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Biography' output='normal' display_field='value' />");
    var primaryImage = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Photo' output='normal' formatter='path/*' />");
    var rollOverImage = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Rollover Photo' output='normal' formatter='path/*' />");
    var cv = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='CV' output='normal' formatter='path/*' />");
    var phone = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Phone' output='normal' modifiers='striptags,htmlentities' />");
    var emailAddress = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Email Address' output='normal' display_field='name' />");
    var roomNumber = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Building/Room Number' output='normal' display_field='name' />");
    var personalWebLink = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Personal Website' output='normal' modifiers='striptags,htmlentities' />");
    var disciplines = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Disciplines' output='normal' display_field='value' />");
    var fullTextLink = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Name' output='fulltext' use-element='true' filename-element='Name' modifiers='striptags,htmlentities' />");
    var anchorTag = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='meta' meta='html_anchor' />");
    var contentID = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='meta' meta='content_id' />");

    
 

    /***
     *  Declare/Assign local variables with base formatting
     * 
     * */
    var cardText = "<span class='card-text summary'><p>" + summary + "</p></span>";
    var titleLink = "";
    // var listItems = "";
    var listOfDegrees = "";
    var listOfTitles = "";
    var listOfDisciplines = "";
    var thumbNailString = "";
    var titleOne = "";
    var degreeOne = "";
    var contactPhone = "";
    var contactEmail = "";
    var openCardBody = '<div class="card-body">';
    var closeCardBody = '</div>';
    var openCardFooter = '<div class="card-footer">';
    var closeCardFooter = '</div>';
    var anchorWrap = '<div class="visually-hidden hidden">' + anchorTag + '</div>';
    // var beginningHTML = '<div class="gridFeedItem card shadow col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4" title="' + profileTitle + '" id="id<t4 type=\'meta\' meta=\'content_id\' data-position-default="ZoneA" data-position-selected="ZoneA" />">';
    var endingHTML = '</div>';
    var beginningHTML = '<div class="gridFeedItem card shadow col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4" title="' + contentName + '" id="id' + contentID + '" data-position-default="ZoneA" data-position-selected="ZoneA">';




    /***
     *  parse the list of degrees, add <li> tags
     * 
     * */
    if (degrees != "") {
        var arrayOfDegrees = degrees.split('\n');
        let listItems = "";
        for (let i = 0; i < arrayOfDegrees.length; i++) {
            listItems += '<li class="tag">' + arrayOfDegrees[i] + '</li>';
        }
        listOfDegrees = '<div class="tags"><ul class="profileDegrees">' + listItems + '</ul></div>';
        degreeOne = arrayOfDegrees[0];
    }




    /***
     *  parse the list of titles, add <li> tags
     * 
     * */
    if (titles != "") {
        var arrayOfTitles = titles.split('\n');
        let listItems = "";
        for (let i = 0; i < arrayOfTitles.length; i++) {
            listItems += '<li class="tag">' + arrayOfTitles[i] + '</li>';
        }
        listOfTitles = '<div class="tags"><ul class="profileTitles">' + listItems + '</ul></div>';
        titleOne = arrayOfTitles[0];
    }




    /***
     *  parse the list of disciplines, add <li> tags
     * 
     * */
    if (disciplines != "") {
        var arrayOfDisciplines = disciplines.split(',');
        let listItems = "";
        for (let i = 0; i < arrayOfDisciplines.length; i++) {
            listItems += '<li class="list-group-item">' + arrayOfDisciplines[i] + '</li>';
        }
        listOfDisciplines = '<ul class="list-group">' + listItems + '</ul>';
    }




    /***
     *  determine if the article contains full text content
     * 
     * */
    if (biography == "") {
        titleLink = '<h3 class="card-title">' + contentName + '</h3>';
    } else {
        titleLink = '<h3 class="card-title"><a href="' + fullTextLink + '">' + firstName + ' ' + lastName + '</a></h3>';
    }




    /***
     *  verify Main image and photo credits
     * 
     * */
    if (primaryImage == "") {
        thumbNailString = '<span class="hidden">No Image Provided</span>';

    } else {
        thumbNailString = '<span class="cardImageWrapper"><img src="' + primaryImage + '" class="card-img-top" alt="' + contentName + '" /></span>';
    }




    /***
     *  verify Phone
     * 
     * */
    if (phone == "") {
        contactPhone = '<span class="hidden">No Phone Provided</span>';

    } else {
        contactPhone = '<p class="contactInfo phone">Phone: ' + phone + '</p>';
    }




    /***
     *  verify email
     * 
     * */
    if (emailAddress == "") {
        contactEmail = '<span class="hidden">No Phone Provided</span>';

    } else {
        contactEmail = '<p class="contactInfo">Email: ' + emailAddress + '</p>';
    }



    
    /***
     *  Write the document once
     * 
     * */
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, beginningHTML));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, thumbNailString));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openCardBody));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, anchorWrap));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, titleLink));
    document.write('<div class="card-subtitle mb-2 text-muted">' + titleOne + '</div>');
    document.write('<p class="card-text">' + summary + '</p>');
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, listOfDisciplines));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeCardBody));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openCardFooter));
    document.write('<p class="text-muted">' + college + '</p>');
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeCardFooter));
    document.write(endingHTML);




} catch (err) {
    document.write(err.message);
}