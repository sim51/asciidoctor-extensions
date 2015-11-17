'use strict';

var elements = document.getElementsByClassName("code_highlight");
for( var i=0; i< elements.length; i++) {
    var element = elements[i];
    var mode = element.getAttribute("data-lang");
    CodeMirror.fromTextArea(element, { 'readonly':true, 'mode':mode, 'theme':'neo', 'lineNumbers':true, 'lineWrapping':true});
}
