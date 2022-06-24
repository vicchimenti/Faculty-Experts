try {
    importClass(com.terminalfour.publish.utils.BrokerUtils);

    function processT4Tags(t4Tag) {
        myContent = content || null;
        return String(BrokerUtils.processT4Tags(dbStatement, publishCache, section, myContent, language, isPreview, t4Tag));
    }

    var customTitle, separator, fullTextElement;

    customTitle = '<t4 type="content" name="Custom Page Title" output="normal" modifiers="striptags, htmlentities"  />'; //It handle the Section Meta Description Element used to display the

    separator = " | "; //This will be the separator used
    fullTextElement = "Meta Title"; //This is the element used for fulltext pages - if left empty

    //Custom Page Title Program Layout

    var defaultTitle, titles, value, finalTitle;

    defaultTitle = String(processT4Tags('<t4 type="title" />'));

    if (typeof fullTextElement !== 'undefined' && fullTextElement !== "") {
        defaultTitle = processT4Tags('<t4 type="title" append-content="true" append-element="' + fullTextElement + '" separator="||" />');
    }

    if (typeof separator === 'undefined') {
        separator = " - ";
    }

    value = '';
    if (typeof customTitle !== 'undefined') {
        value = processT4Tags(customTitle);
    }

    titles = defaultTitle.split('||');
    finalTitle = titles[0];
    if (value != '') {
        finalTitle = value;
    }

    if (typeof titles[1] !== 'undefined') {
        finalTitle = finalTitle + separator + titles[1];
    }
    document.write(finalTitle);

} catch (err) {
    document.write(err);
}