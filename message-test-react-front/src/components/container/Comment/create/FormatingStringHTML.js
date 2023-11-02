import DOMPurify from 'dompurify';

function checkPaternA(input) {
    //                        1   2        3    4                5    6      7
    let pattern = /(&lt;)(a)(\s[^>]*)?(>)(?!.*?&lt;a\b)(.*?)(&lt;)(\/a>)/g;
    let newRepl = input.replace(pattern, '<$2$3$4$5<$7');
    return newRepl;
}

function checkPaternStrong(input) {
    //                        1      2            3                 4        5
    let pattern = /(&lt;)(strong>)(?!.*?&lt;strong\b)(.*?)(&lt;)(\/strong>)/g;
    let newRepl = input.replace(pattern, '<$2$3<$5');
    return newRepl;
}

function checkPaternCode(input) {
    //                        1    2             3              4       5
    let pattern = /(&lt;)(code>)(?!.*?&lt;code\b)(.*?)(&lt;)(\/code>)/g;
    let newRepl = input.replace(pattern, '<$2$3<$5');
    return newRepl;
}

function checkPaternI(input) {
    //                        1    2       3              4      5
    let pattern = /(&lt;)(i>)(?!.*?&lt;i\b)(.*?)(&lt;)(\/i>)/g;
    let newRepl = input.replace(pattern, '<$2$3<$5');
    return newRepl;
}

function formatString(input) {

    input = input.replace(/</g, "&lt;");
    input = checkPaternA(input);
    input = checkPaternStrong(input);
    input = checkPaternCode(input);
    input = checkPaternI(input);
    return input;
}

export default formatString;