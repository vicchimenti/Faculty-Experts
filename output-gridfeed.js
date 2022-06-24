/***
 *      @author  Victor Chimenti, MSCS
 *      @file    output-gridfeed.js
 *                  output/gridfeed
 *                  id:5522
 *      @see Seattle University Experts Application at https://www.seattleu.edu/newsroom/experts/
 *
 *      This layout works with the Grid Organizer and will display a faculty expert.
 *
 *      Document will write once when the page loads
 * 
 *      @version 3.0
 * 
 * */








/***
 *      Import T4 Utilities
 */
importClass(com.terminalfour.media.IMediaManager);
importClass(com.terminalfour.spring.ApplicationContextProvider);
importClass(com.terminalfour.publish.utils.BrokerUtils);
importClass(com.terminalfour.media.utils.ImageInfo);




/***
 *      Extract values from T4 element tags
 *      and confirm valid existing content item field
 */
function getContentValues(tag) {
    try {
        let _tag = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag).trim();
        return {
            isError: false,
            content: _tag == '' ? null : _tag
        };
    } catch (error) {
        return {
            isError: true,
            message: error.message
        };
    }
}




/***
 *      Parses array values for null
 */
function parseArray(rawValues) {

    let results = [];
    for (let value in rawValues) {

        if (rawValues[value]) results.push(rawValues[value]);
    }

    return results;
}

    


/***
 *      Returns an array of list items
 */
function assignList(arrayOfValues) {

    let listValues = '';

    for (let i = 0; i < arrayOfValues.length; i++) {

    if (arrayOfValues[i]) {

        listValues += '<li class="list-group-item d-inline deptBioli p-0 pe-md-4">' + arrayOfValues[i].trim() + '</li>';
    }
    }

    return listValues;
}




/***
 *      Returns a media object
 */
function getMediaInfo(mediaID) {

    let mediaManager = ApplicationContextProvider.getBean(IMediaManager);
    let media = mediaManager.get(mediaID, language);

    return media;
}




/***
 *      Returns a media stream object
 */
function readMedia(mediaID) {

    let mediaObj = getMediaInfo(mediaID);
    let oMediaStream = mediaObj.getMedia();

    return oMediaStream;
}




/***
 *      Write the document
 */
function writeDocument(array) {

    for (let i = 0; i < array.length; i++) {

        document.write(array[i]);
    }
}








/***
 *  Main
 */
try {


    /***
     *      Dictionary of content
     * */
    let expertsDict = {

        contentName: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
        fullName: getContentValues('<t4 type="content" name="Full Name" output="normal" modifiers="striptags,htmlentities" />'),
        lastName: getContentValues('<t4 type="content" name="Last Name" output="normal" modifiers="striptags,htmlentities" />'),
        firstName: getContentValues('<t4 type="content" name="First Name" output="normal" modifiers="striptags,htmlentities" />'),
        titles: getContentValues('<t4 type="content" name="Position Title(s)" output="normal" modifiers="striptags,htmlentities" />'),

        college: getContentValues('<t4 type="content" name="College" output="normal" modifiers="striptags,htmlentities" />'),
        description: getContentValues('<t4 type="content" name="Description" output="normal" modifiers="striptags,htmlentities" />'),
        officePhone: getContentValues('<t4 type="content" name="Phone" output="normal" modifiers="striptags,htmlentities" />'),
        emailAddress: getContentValues('<t4 type="content" name="Email Address" output="normal" modifiers="striptags,htmlentities,encode_emails" />'),
        bldgRoom: getContentValues('<t4 type="content" name="Building/Room Number" output="normal" modifiers="striptags,htmlentities" />'),
        departments: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
        primaryImagePath: getContentValues('<t4 type="content" name="Photo" output="normal" formatter="path/*" />'),
        fullTextLink: getContentValues('<t4 type="content" name="Name" output="fulltext" use-element="true" filename-element="Name" modifiers="striptags,htmlentities" />'),
        contentId: getContentValues('<t4 type="meta" meta="content_id" />')

    };
}





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
    // var anchorTag = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='meta' meta='html_anchor' />");
    var contentID = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='meta' meta='content_id' />");




    /***
     *  Declare/Assign local variables with base formatting
     * 
     * */
    var cardText = "<span class='card-text summary'><p>" + summary + "</p></span>";
    var matchKey = -1;
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
    var disciplineString = "Athletics, Arts & Sciences, Business and Economics, Education, Law, Nursing, School of Theology and Ministry, Science and Engineering";
    var schoolArray = ['Athletics','Arts & Sciences','Business and Economics','Education','Law','Nursing','School of Theology and Ministry','Science and Engineering'];

    var titleLink = '<h3 class="card-title"><a href="' + fullTextLink + '" title="Link to full bio of ' + firstName + ' ' + lastName + '">' + firstName + ' ' + lastName + '</a></h3>';
    var beginningHTML = '<div class="gridFeedItem profileItem card shadow" aria-label="' + firstName + ' ' + lastName + '" id="id' + contentID + '" data-position-default="ZoneA" data-position-selected="ZoneA">';
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

        // trim whitespace on all disciplines and process for unordered list
        for (let i = 0; i < arrayOfDisciplines.length; i++) {
            let disciplineItem = arrayOfDisciplines[i].trim();
            // console.log('Hello, Console!');
            // Check to see if existing discipline is a top level school
            if (!disciplineString.includes(disciplineItem)) {
                // if (schoolArray.indexOf(disciplineItem) === -1) {
                    // console.log("discipline item: " + disciplineItem);
                    // for (let j = 0; j < schoolArray.length; j++) {
                    //     console.log("school array item: " + j + ' ' + schoolArray[j]);

                    // }
                // If not a school then process as a discipline
                listItems += '<li class="list-group-item">' + disciplineItem + '</li>';
            }
        }

        // load all list items into an list group
        listOfDisciplines = '<ul class="list-group">' + listItems + '</ul>';
    }



    /***
     *  verify Main image and photo credits
     * 
     * */
    if (primaryImage == "") {

        thumbNailString = '<span class="hidden visually-hidden">No Image Provided</span>';

    } else {

        thumbNailString = '<span class="cardImageWrapper"><img src="' + primaryImage + '" class="card-img-top" title="' + firstName + ' ' + lastName + '" alt="' + contentName + '" loading="lazy" /></span>';

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
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, titleLink));
    document.write('<div class="card-subtitle mb-2 text-muted">' + titleOne + '</div>');
    document.write('<div class="card-subtitle mb-2 fst-italic font-italic">' + degreeOne + '</div>');
    document.write('<p class="card-text">' + summary + '</p>');
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, listOfDisciplines));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeCardBody));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openCardFooter));
    document.write('<p class="footerText">' + college + '</p>');
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeCardFooter));
    document.write(endingHTML);




} catch (err) {
    document.write(err.message);
}