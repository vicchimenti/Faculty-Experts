/***
 *     @author Victor Chimenti, MSCS-SE '20
 *     @file v9-fulltext.js
 *     @see Seattle University Newsroom Experts Application at https://www.seattleu.edu/newsroom/experts/
 *
 *     This content layout will display an individual profile on it's own fulltext URL.
 *
 *     Document will write once when the page loads
 *
 *     @version 3.1
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
    var fullTextLink = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Name' output='fulltext' use-element='true' filename-element='Name' modifiers='striptags,htmlentities' />");
    var anchorTag = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='meta' meta='html_anchor' />");
    var contentID = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='meta' meta='content_id' />");




    /***
     *  Declare/Assign local variables with base formatting
     * 
     * */
    var cardText = "<span class='card-text summary'><p>" + summary + "</p></span>";
    var matchKey = -1;
    var titleLink = "";
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
    var disciplineString = "Athletics, Arts & Sciences, Business and Economics, Education, Law, Nursing, School of Theology and Ministry, Science and Engineering";
    var openTop = '<div class="facultyProfileTop"><div class="standardContent">S';
    var closeTop = '</div></div>';
    var openImg = '<div class="facultyProfilePicture col-12">';
    var closeImg = '</div>';
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
        listOfDisciplines = '<ul class="list-group">' + listItems + '</ul>';
    }




    /***
     *  determine if the article contains full text content
     * 
     * */
    if (biography == "") {
        titleLink = '<h3 class="card-title">' + firstName + ' ' + lastName + '</h3>';
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
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, anchorTag));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, beginningHTML));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openTop));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openImg));


    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeImg));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openProfile));


    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeProfile));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeTop));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openCardBody));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openMiddle));



    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeMiddle));
    document.write(openBio);



    document.write(closeBio);
    document.write(closeCardBody);
    document.write(endingHTML);





    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, thumbNailString));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, titleLink));
    document.write('<div class="card-subtitle mb-2 text-muted">' + titleOne + '</div>');
    document.write('<p class="card-text">' + summary + '</p>');
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, listOfDisciplines));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openCardFooter));


    document.write('<p class="footerText">' + degreeOne + '</p>');
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeCardFooter));

    document.write(endingHTML);




} catch (err) {
    document.write(err.message);
}