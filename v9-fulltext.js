/***
 *     @author Victor Chimenti, MSCS-SE '20
 *     @file v9-fulltext.js
 *     @see Seattle University Newsroom Experts Application at https://www.seattleu.edu/newsroom/experts/
 *
 *     This content layout will display an individual profile on it's own fulltext URL.
 *
 *     Document will write once when the page loads
 *
 *     @version 3.3
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
    var cv = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='CV' output='normal' formatter='path/*' />");
    var phone = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Phone' output='normal' modifiers='striptags,htmlentities' />");
    var emailAddress = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Email Address' output='normal' display_field='name' />");
    var roomNumber = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Building/Room Number' output='normal' display_field='name' />");
    var personalWebLink = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Personal Website' output='normal' modifiers='striptags,htmlentities' />");
    var disciplines = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Disciplines' output='normal' display_field='value' />");
    // var fullTextLink = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Name' output='fulltext' use-element='true' filename-element='Name' modifiers='striptags,htmlentities' />");
    var anchorTag = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='meta' meta='html_anchor' />");
    var contentID = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='meta' meta='content_id' />");




    /***
     *  Declare/Assign local variables with base formatting
     * 
     * */
    var listOfDegrees = "";
    var listOfTitles = "";
    var listOfDisciplines = "";
    var titleOne = "";
    var degreeOne = "";
    var openCardBody = '<div class="card-body">';
    var closeCardBody = '</div>';
    var openImg = '<div class="facultyProfilePicture col-12 hidden visually-hidden">';
    var closeImg = '</div>';
    var primaryImageString = '<img src="" class="hidden visually-hidden" alt="" />';
    var openPrimaryImage = '<div class="facultyPhoto card-img hidden visually-hidden">';
    var closePrimaryImage = '</div>';
    var openImageOverlay = '<div class="facultyProfileName card-img-overlay d-flex align-items-end align-items-md-start hidden visually-hidden">';
    var closeImageOverlay = '</div>';
    var overlayHeader = '<h1 class="card-title mb-2 hidden visually-hidden">No image provided</h1>';
    var degreeWrapper = '<div class="card-subtitle fst-italic font-italic hidden visually-hidden"><p class="card-text ml-2 ms-2">No degree entered</p></div>';
    var titleWrapper = '<div class="card-subtitle mb-1 text-muted hidden visually-hidden"><p class="card-text ml-2 ms-2">No title entered</p></div>';
    var disciplineWrapper = '<div class="facultyDisciplines hidden visually-hidden"><h2>Areas of Expertise</h2><p class="card-text ml-2 ms-2"></p></div>';
    var bioString = '<h3 class="hidden visually-hidden">Biography</h3><div class="card-text ml-2 ms-2 hidden visually-hidden">No Bio Entered</div>';
    var disciplineString = "Athletics, Arts & Sciences, Business and Economics, Education, Law, Nursing, School of Theology and Ministry, Science and Engineering";
    var openTop = '<div class="facultyProfileTop"><div class="standardContent">';
    var closeTop = '</div></div>';
    var openProfile = '<div class="facultyProfileInfo col-12">';
    var closeProfile = '</div>';
    var openMiddle = '<div class="facultyProfileMiddle standardContent"><div class="col-12">';
    var closeMiddle = '</div></div>';
    var openBio = '<div class="primaryProfileContent col-12"><div class="facultyProfileBiography">';
    var closeBio = '</div>';
    var beginningHTML = '<div class="facultyProfileWrapper card border-0 col-8 offset-2 shadow" title="' + firstName + ' ' + lastName + '" id="id' + contentID + '-fulltext">';
    var endingHTML = '</div>';




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
        degreeWrapper = '<div class="card-subtitle fst-italic font-italic"><p class="card-text ml-2 ms-2">' + degreeOne + '</p></div>';
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
        titleWrapper = '<div class="card-subtitle mb-1 text-muted"><p class="card-text ml-2 ms-2">' + titleOne + '</p></div>'
    }




    /***
     *  parse the list of disciplines, add <li> tags
     * 
     * */
    if (disciplines != "") {
        var arrayOfDisciplines = disciplines.split(',');
        let listItems = "";
        let arrayOfSchools = [];

        // trim whitespace on all disciplines and process for unordered list
        for (let i = 0; i < arrayOfDisciplines.length; i++) {
            let disciplineItem = arrayOfDisciplines[i].trim();

            // Check to see if existing discipline is a top level school
            if (disciplineString.includes(disciplineItem)) {
                let schoolString = arrayOfSchools.toString();

                // If a school then only display once
                if (!schoolString.includes(disciplineItem)) {
                    arrayOfSchools.push(disciplineItem);
                    listItems += '<li class="list-group-item itemParent">' + disciplineItem + '</li>';
                }

                // If not a school then process as a discipline
            } else {
                listItems += '<li class="list-group-item">' + disciplineItem + '</li>';
            }
        }

        // load all list items into an list group
        listOfDisciplines = '<ul class="list-group d-flex flex-row justify-content-around">' + listItems + '</ul>';
        disciplineWrapper = '<div class="facultyDisciplines"><h2>Areas of Expertise</h2><p class="card-text ml-2 ms-2">' + listOfDisciplines + '</p></div>';
    }




    /***
     *  determine if the article contains full biography
     * 
     * */
    if (biography != "") {
        bioString = '<h3 class="bioHeader">Biography</h3><div class="card-text ml-2 ms-2">' + biography + '</div>';
    }




    /***
     *  verify Primary image and set overlay
     * 
     * */
    if (primaryImage != "") {
        openImg = '<div class="facultyProfilePicture col-12">';
        openPrimaryImage = '<div class="facultyPhoto card-img">';
        primaryImageString = '<img src="' + primaryImage + '" alt="' + firstName + ' ' + lastName + '" />';
        openImageOverlay = '<div class="facultyProfileName card-img-overlay d-flex align-items-end align-items-md-start">';
        overlayHeader = '<h1 class="card-title mb-2">' + firstName + ' ' + lastName + '</h1>';
    }




    /***
     *  Write the document once
     * 
     * */
    document.write(anchorTag);
    document.write(beginningHTML);
    document.write(openTop);
    document.write(openImg);
    document.write(openPrimaryImage);
    document.write(primaryImageString);
    document.write(closePrimaryImage);
    document.write(openImageOverlay);
    document.write(overlayHeader);
    document.write(closeImageOverlay);
    document.write(closeImg);
    document.write(openProfile);
    document.write(titleWrapper);
    document.write(degreeWrapper);
    document.write(closeProfile);
    document.write(closeTop);
    document.write(openCardBody);
    document.write(openMiddle);
    document.write(disciplineWrapper);
    document.write(closeMiddle);
    document.write(openBio);
    document.write(bioString);
    document.write(closeBio);
    document.write(closeCardBody);
    document.write(endingHTML);




} catch (err) {
    document.write(err.message);
}