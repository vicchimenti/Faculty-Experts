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
 *      @version 3.3.4
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
function assignList(arrayOfValues, disciplineValidator) {

    let listValues = '';

    for (let i = 0; i < arrayOfValues.length; i++) {

        let disciplineItem = arrayOfValues[i].trim() || null;
        let validItem = (!disciplineValidator.includes(disciplineItem)) ? disciplineItem : null;

        if (validItem) {
            listValues += '<li class="list-group-item">' + validItem + '</li>';
        }
    }

    return listValues;
}




/***
 *      Returns an formatted list of disciplines
 */
function assignDisciplines(arrayOfValues) {

    let disciplineValues = '';

    for (let i = 0; i < arrayOfValues.length; i++) {

        let disciplineItem = arrayOfValues[i].trim() || null;

        if (disciplineItem) {
            disciplineValues += '<li class="d-none hidden visually-hidden disciplineList">' + disciplineItem + '</li>';
        }
    }

    return disciplineValues;
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
        disciplineList: getContentValues('<t4 type="content" name="Discipline List" output="normal" modifiers="striptags,htmlentities" />'),
        fullTextLink: getContentValues('<t4 type="content" name="Full Name" output="fulltext" use-element="true" filename-element="Full Name" modifiers="striptags,htmlentities" />'),
        contentId: getContentValues('<t4 type="meta" meta="content_id" />')

    };








    /***
     *  Declare/Assign local variables with base formatting
     * 
     * */
    let openCardBody = '<div class="card-body">';
    let closeCardBody = '</div>';
    let openCardFooter = '<div class="card-footer">';
    let closeCardFooter = '</div>';
    let endingHTML = '</article>';




    /***
     *  define beginning html wrapper
     * 
     * */
    let beginningHTML = (expertsDict.fullName.content) ?
        '<article class="gridFeedItem profileItem card shadow" id="expert' + expertsDict.contentId.content + '"  aria-label="' + expertsDict.fullName.content + '">' :
        (expertsDict.firstName.content && expertsDict.lastName.content) ?
        '<article class="gridFeedItem profileItem card shadow" id="expert' + expertsDict.contentId.content + '"  aria-label="' + expertsDict.firstName.content + ' ' + expertsDict.lastName.content + '">' :
        '<article class="gridFeedItem profileItem card shadow" id="expert' + expertsDict.contentId.content + '"  aria-label="' + expertsDict.contentName.content + '">';




    /***
     *  validate title link
     * 
     * */
    let titleLink = (expertsDict.fullTextLink.content && expertsDict.firstName.content && expertsDict.lastName.content) ?
        '<h3 class="card-title"><a href="' + expertsDict.fullTextLink.content + '" title="Link to full bio of ' + expertsDict.firstName.content + ' ' + expertsDict.lastName.content + '">' + expertsDict.firstName.content + ' ' + expertsDict.lastName.content + '</a></h3>' :
        (expertsDict.fullTextLink.content && expertsDict.fullName.content) ?
        '<h3 class="card-title"><a href="' + expertsDict.fullTextLink.content + '" title="Link to full bio of ' + expertsDict.fullName.content + '">' + expertsDict.fullName.content + '</a></h3>' :
        (expertsDict.fullTextLink.content) ?
        '<h3 class="card-title"><a href="' + expertsDict.fullTextLink.content + '" title="Link to full bio of ' + expertsDict.contentName.content + '">' + expertsDict.contentName.content + '</a></h3>' :
        '<h3 class="card-title">' + expertsDict.contentName.content + '</h3>';




    /***
     *  validate summary
     * 
     * */
    let summaryString = (expertsDict.summary.content) ?
        '<p class="card-text summary">' + expertsDict.summary.content + '</p>' :
        '<span class="card-text summary hidden visually-hidden">No valid summary provided</span>';




    /***
     *  parse the list of degrees
     * 
     * */
    let arrayOfDegrees = (expertsDict.degrees.content) ? expertsDict.degrees.content.split('\n') : null;
    let terminalDegree = arrayOfDegrees[0] || null;
    let degreeString = (terminalDegree) ?
        '<div class="terminalDegree card-subtitle mb-2 fst-italic font-italic">' + terminalDegree + '</div>' :
        '<span class="terminalDegree card-subtitle hidden visually-hidden">No valid degree entered</span>';




    /***
     *  parse for primary title
     * 
     * */
    let arrayOfTitles = (expertsDict.titles.content) ? expertsDict.titles.content.split('\n') : null;
    let titleOne = arrayOfTitles[0] || null;
    let titleString = (titleOne) ?
        '<div class="primaryTitle card-subtitle mb-2 text-muted">' + titleOne + '</div>' :
        '<span class="primaryTitle card-subtitle mb-2 text-muted hidden visually-hidden">No valid title provided</span>';




    /***
     *  parse the list of disciplines
     *  currently using nested t4 lists which generate an item for the college name
     *  we need to parse this out of this list of disciplines until this content item field is replaced
     * 
     * */
    let disciplineString = "Athletics, Arts & Sciences, Business and Economics, Education, Law, Nursing, School of Theology and Ministry, Science and Engineering";
    let arrayOfDisciplines = (expertsDict.disciplines.content) ? expertsDict.disciplines.content.split(',') : null;
    let listOfDisciplines = (arrayOfDisciplines) ? assignList(arrayOfDisciplines, disciplineString) : null;
    let validDisciplines = (listOfDisciplines) ?
        '<ul class="list-group">' + listOfDisciplines + '</ul>' :
        '<span class="list-group hidden visually-hidden">No areas of expertise provided</span>';




    /***
     *  test current content for semi-colon seperated list of disciplines
     *  this field in in development 20220928
     * 
     * */
    let disciplinArr = (expertsDict.disciplineList.content) ? expertsDict.disciplineList.content.split(';') : null;
    let disciplineFormattedList = (expertsDict.disciplineList.content) ? assignDisciplines(disciplinArr) : null;
    let disciplineListStr = (disciplineFormattedList) ?
        '<ul class="list-group d-none hidden visually-hidden">' + disciplineFormattedList + '</ul>' :
        '<span class="list-group hidden visually-hidden">No areas of expertise provided</span>';
            // let disciplineListStr = (expertsDict.disciplineList.content) ?
    //     '<span class="disciplineList d-none hidden visually-hidden">' + expertsDict.disciplineList.content + '</span>' :
    //     '<span class="disciplineList d-none hidden visually-hidden">No List Provided</span>';





    /***
     *  parse for college
     * 
     * */
    let collegeString = (expertsDict.college.content) ?
        '<p class="college footerText">' + expertsDict.college.content + '</p>' :
        '<span class="college footerText hidden visually-hidden">No college provided</span>';




    /***
     *  Parse for image
     *  and process valid media id
     * 
     * */
    let imageString = (expertsDict.primaryImage.content) ?
        '<span class="cardImageWrapper"><img src="' + expertsDict.primaryImage.content + '" class="expertsImage card-img-top p-0 m-0" alt="' + expertsDict.contentName.content + '" loading="auto" /></span>' :
        '<span class="expertsImage hidden visually-hidden">No Image Provided</span>';

    if (expertsDict.primaryImage.content) {

        let imageID = content.get('Photo').getID();
        let mediaInfo = getMediaInfo(imageID);
        let media = readMedia(imageID);
        let info = new ImageInfo();
        info.setInput(media);

        imageString = (info.check()) ?
            '<span class="cardImageWrapper"><img src="' + expertsDict.primaryImage.content + '" class="expertsImage card-img-top p-0 m-0" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" loading="auto" /></span>' :
            '<span class="cardImageWrapper"><img src="' + expertsDict.primaryImage.content + '" class="expertsImage noMediaId card-img-top p-0 m-0" loading="auto" /></span>';
    }








    /***
     *  write document once
     * 
     * */
    writeDocument(
        [
            beginningHTML,
            imageString,
            openCardBody,
            titleLink,
            titleString,
            degreeString,
            summaryString,
            validDisciplines,
            disciplineListStr,
            closeCardBody,
            openCardFooter,
            collegeString,
            closeCardFooter,
            endingHTML
        ]
    );




} catch (err) {
    document.write(err.message);
}