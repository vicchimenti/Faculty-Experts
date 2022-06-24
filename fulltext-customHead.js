/***
 *     @author Victor Chimenti, MSCS-SE '20
 *     @file custom-head-code.js
 *
 *     This document will format the tags necessary to pull metadata from the
 *     source and insert it into the head of a page layout.
 *
 *     The doc will need to be customized to any content type that uses 
 *     the custom head code layout. It is to be used in conjunction with a
 *     nav object which is coded into the page head.
 *
 *     Document will write once when the page loads
 *
 *     @version 1.4
 */




 try {

    var headTitle = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Meta Title' output='normal' modifiers='striptags,htmlentities' />");
    var appendedTitle = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, '<t4 type="title" append-content="true" append-element="' + headTitle + '" separator="||" include_content_on_index="false"/>');
    var headTitleString = '<title><t4 type="title" /></title>';
    // var appendedTitle = processT4Tags('<t4 type="title" append-content="true" append-element="' + headTitle + '" separator="||" />');


    if (headTitle != "") {
        headTitleString = "<title>" + appendedTitle + "</title>";
    }


    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, headTitleString));


} catch (err) {
    document.write(err.message);
}