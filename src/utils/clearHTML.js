export function clearHTML (str)  {
    let parser = new DOMParser();
    let dom = parser.parseFromString(str, "text/html");
    let text = "";
    let walkDOM = function (node, func) {
        func(node);
        node = node.firstChild;
        while (node) {
            walkDOM(node,func);
            node = node.nextSibling;
        }
    };

    walkDOM(dom, function (node) {
        if (node.tagName === 'BR') {
            text += node.outerHTML;
        }
        else if (node.nodeType === 3) { // Text node
            text += node.nodeValue;
        }
    });
    return text
}




