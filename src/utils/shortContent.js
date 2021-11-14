export function shortContent (content,limit=100) {
    content = content.trim();
    if( content.length <= limit) return content;

    content = content.slice( 0, limit);
    const lastSpace = content.lastIndexOf(" ");

    if( lastSpace > 0) {
        content = content.substr(0, lastSpace);
    }

    return content + "...";

}




