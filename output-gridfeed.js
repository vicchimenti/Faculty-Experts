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
 *      @version 3.2
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
        degrees: getContentValues('<t4 type="content" name="Degree(s)" output="normal" modifiers="striptags,htmlentities" />'),
        college: getContentValues('<t4 type="content" name="College" output="normal" modifiers="striptags,htmlentities" />'),
        department: getContentValues('<t4 type="content" name="Department" output="normal" modifiers="striptags,htmlentities" />'),
        summary: getContentValues('<t4 type="content" name="Summary" output="normal" modifiers="striptags,htmlentities" />'),
        primaryImage: getContentValues('<t4 type="content" name="Photo" output="normal" formatter="path/*" />'),
        disciplines: getContentValues('<t4 type="content" name="Disciplines" output="normal" display_field="value" />'),
        fullTextLink: getContentValues('<t4 type="content" name="Full Name" output="fulltext" use-element="true" filename-element="Full Name" modifiers="striptags,htmlentities" />'),
        contentId: getContentValues('<t4 type="meta" meta="content_id" />')

    };









    /***
     *  Declare/Assign local variables with base formatting
     * 
     * */
    
    // var cardText = "<span class='card-text summary'><p>" + summary + "</p></span>";
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
    // var beginningHTML = '<div class="gridFeedItem profileItem card shadow" aria-label="' + firstName + ' ' + lastName + '" id="id' + contentId + '" data-position-default="ZoneA" data-position-selected="ZoneA">';
    
    let endingHTML = '</article>';




    /***
     *  define beginning html wrapper
     * 
     * */
     let beginningHTML = (expertsDict.fullName.content) ?
        '<article class="gridFeedItem profileItem card shadow" id="expert' + expertsDict.contentId.content + '"  aria-label="' + expertsDict.fullName.content + '">' :
        (expertsDict.firstName.content && expertsDict.lastName.content) ?
        '<article class="gridFeedItem profileItem card shadow" id="expert' + expertsDict.contentId.content + '"  aria-label="' + expertsDict.firstName.content + ' ' + expertsDict.lastName.content + '">' :
        '<article class="gridFeedItem profileItem card shadow" id="expert' + expertsDict.contentId.content + '"  aria-label="' + expertsDict.contentName.content + '">' ;




    /***
     *  validate summary
     * 
     * */
    let cardText = (expertsDict.summary.content) ?
        '<p class="card-text summary">' + expertsDict.summary.content + '</p>' :
        '<span class="card-text summary hidden visually-hidden">No valid summary provided</span>';





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
    // if (primaryImage == "") {

    //     thumbNailString = '<span class="hidden visually-hidden">No Image Provided</span>';

    // } else {

    //     thumbNailString = '<span class="cardImageWrapper"><img src="' + primaryImage + '" class="card-img-top" title="' + firstName + ' ' + lastName + '" alt="' + contentName + '" loading="lazy" /></span>';

    // }

    /***
     *  Parse for image
     *  and process valid media id
     * 
     * */
     let imageString = (expertsDict.primaryImage.content) ?
        '<span class="cardImageWrapper"><img src="' + expertsDict.primaryImage.content + '" class="expertsImage card-img-top p-0 m-0" loading="auto" /></span>' :
        '<span class="expertsImage hidden visually-hidden">No Image Provided</span>';

    if (expertsDict.primaryImage.content) {

        let imageID = content.get('Photo').getID();
        let mediaInfo = getMediaInfo(imageID);
        let media = readMedia(imageID);
        let info = new ImageInfo;
        info.setInput(media);

        imageString = (info.check()) ?
            '<span class="cardImageWrapper"><img src="' + expertsDict.primaryImage.content + '" class="expertsImage card-img-top p-0 m-0" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" loading="auto" /></span>' :
            '<span class="cardImageWrapper"><img src="' + expertsDict.primaryImage.content + '" class="expertsImage noMediaId card-img-top p-0 m-0" loading="auto" /></span>';
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




    /***
     *  write document once
     * 
     * */
    writeDocument(
        [
            beginningHTML,

            openRow,
            openImageWrapper,
            imageString,
            closeImageWrapper,
            openBodyWrapper,
            openBody,

            cardText,


            titleLink,
            titleString,
            subtitleString,
            summaryBioString,
            closeBody,
            closeBodyWrapper,
            closeRow,

            endingHTML
        ]
    );




} catch (err) {
    document.write(err.message);
}