// Copyright (c) 2002 PTC Inc.   All Rights Reserved
///////////////////////////////////////////////////////////////////
// Utility Methods
///////////////////////////////////////////////////////////////////
//These are all the Strings to be translated.  They are put here to ensure they are declared, but are overridden with
//the localized variable declarations.
//   var valueMustBeStrNumMSG = "The 'value' parameter must be of type 'String' or a 'Number'";
//   var targetWindowExistsMSG = 'Target Window Exists';
//   var fieldOnlyAlpaNum_MSG = "This field can only contain AlphaNumerics or Underscores as input values:  ";
var orDelim = '';
var rgDelim = '';
var attDelim = '';
var valDelim = '';
var focusedInput;
var clearQuickInfoTimeOut = null;
var clearActionsTimeOut=null;
var lastActionMenuId=null;
var lastSecondaryMenuId="";
///////////////////////////////////////////////////////////////////
function ltrim(s) {
    if (isNumber(s)) {
        return s;
    }
    return trimString(s, /^\s*/);
}
///////////////////////////////////////////////////////////////////
function rtrim(s) {
    if (isNumber(s)) {
        return s;
    }
    return trimString(s, /^\s*$/);
}
///////////////////////////////////////////////////////////////////
function trim(s) {
    s = rtrim(ltrim(s));
    if (s == ' ' || s == '  ') {
        s = '';
    }
    return s;
}

function trimString(s, from) {
    if (Object.isString(s)) {
        var str = s.toString();
        return str.replace(from, "");
    } else {
        return s;
    }
}

function trimInvalidWhiteSpace(s) {

    if (s == null || !s.length) {
        return s;
    }

    //Removes White Space as defined:
    //space
    // Carriage Return
    // newline
    // form feed
    // TABs
    // Vertical TABs

    return trimString(s, /^\s+|\s+$/g);
}

function trimStrLR(s) {
    s = (s.replace(/^\s*/, "")).replace(/\s*$/, "");
    if (s == ' ' || s == '  ') {
        s = '';
    }
    return s;
}
///////////////////////////////////////////////////////////////////
function handleCheckBox(box, formval) {
    if (box.checked) {
        formval.value = 'true';
    } else {
        formval.value = 'false';
    }
}
///////////////////////////////////////////////////////////////////


function setSelectedValueOfListFromDisplay(select, display) {

    var text;
    for (var i = 0; i < select.options.length; i++) {
        text = select.options[i].text;
        if (display == text) {
            select.selectedIndex = i;
            return true;
        }
    }

    return false;
}
///////////////////////////////////////////////////////////////////
function setSelectedValueOfListFromValue(select, value) {
    var text;
    for (var i = 0; i < select.options.length; i++) {
        text = select.options[i].value;
        if (value == text) {
            select.selectedIndex = i;
            return true;
        }
    }
    select.selectedIndex = 0;
    return false;
}
///////////////////////////////////////////////////////////////////
function getSelectedValue(select) {
    return select.options[select.selectedIndex].value;
    //return select.options[select.selectedIndex].text;
}

///////////////////////////////////////////////////////////////////
function getSelectedDisplay(select) {
    //return select.options[select.selectedIndex].value;
    //jsDebug("display: " + select.options[select.selectedIndex].text);
    return select.options[select.selectedIndex].text;
}
///////////////////////////////////////////////////////////////////
function getValueFromDisplay(select, display) {
    //return select.options[select.selectedIndex].value;
    //jsDebug("display: " + select.options[select.selectedIndex].text);
    for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].text == display) {
            return select.options[i].value;
        }
    }
    return 'NOT FOUND';
}
///////////////////////////////////////////////////////////////////
function getDisplayFromValue(select, value) {
    //return select.options[select.selectedIndex].value;
    //jsDebug("display: " + select.options[select.selectedIndex].text);
    for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].value == value) {
            return select.options[i].text;
        }
    }
    return 'NOT FOUND';
}
///////////////////////////////////////////////////////////////////
function getDisplayFromValueIfPossible(select, value) {
    for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].value == value) {
            return select.options[i].text;
        }
    }
    return value;
}
///////////////////////////////////////////////////////////////////
function format(val) {
    // alert(" In format, val = " + val);
    if (!val) {
        return '';
    }
    if ('null' == val) {
        val = '';
    }
    if ('undefined' == val) {
        val = '';
    }
    if (isNaN(val)) {
        return trim(val);
    } else {
        return val;
    }
}
///////////////////////////////////////////////////////////////////

// This function uses functions in validation.js
function formatFloat(val, displayDigits) {
    //alert(" In format Float, val = " + val);
    if (!hasContent(val)) {
        val = "0.0";
    }

    if (displayDigits) {

        var numOfDecimalPoints = getNumOfOccurancesOfaChar(val, ".");
        if (numOfDecimalPoints = 0) {
            val = val + ".";
        }
        val = addZerosToDecimal(val, displayDigits);
        //alert("val = " + val + "\n" +
        //      "displayDigits = " + displayDigits + "\n" +
        //      "numOfDecimalPoints = " + numOfDecimalPoints);
        return val;
    } else {
        return parseFloat(val);
    }
}
///////////////////////////////////////////////////////////////////

// This function uses functions in validation.js
function formatCurrency(val, displayDigits) {
    // alert(" In format Currency, val = " + val);
    if (!hasContent(val)) {
        val = "0.0";
    }

    if (displayDigits) {
        var numOfDecimalPoints = getNumOfOccurancesOfaChar(val, ".");
        if (numOfDecimalPoints = 0) {
            val = val + ".";
        }
        val = addZerosToDecimal(val, displayDigits);
        //alert("val = " + val + "\n" +
        //      "displayDigits = " + displayDigits + "\n" +
        //      "numOfDecimalPoints = " + numOfDecimalPoints);
        return val;
    } else {
        return parseFloat(val);
    }
}
///////////////////////////////////////////////////////////////////
//function formatFloat(val){
//   if(!hasContent(val)){
//       return 0.0;
//   }
//   return parseFloat(val);
//}
///////////////////////////////////////////////////////////////////
function formatInt(val) {
    if (!hasContent(val)) {
        return 0;
    }
    return parseInt(val);
}
///////////////////////////////////////////////////////////////////
function checkEmptyInput(input) {
    if (document.MAINFORM && document.MAINFORM.onkeypress && focusedInput) {
        focusedInput = null;
    }
    if (input && input.value.length == 0) {
        input.value = " ";
    }
}

function removeEmptyInput(input) {
    if (document.MAINFORM && document.MAINFORM.onkeypress && input) {
        focusedInput = input;
    }
    if (input && input.value == " ") {
        input.value = "";
    }
}
///////////////////////////////////////////////////////////////////
function hasContentAllowZero(val) {
    if (val) {
        val = trimInvalidWhiteSpace(val);
    }
    if (val == '0.0') {
        return true;
    }

    if (!val || trim(val) == '' || val == 'null' || val == 'undefined') {
        return false;
    }
    return true;
}
///////////////////////////////////////////////////////////////////
function hasContentNoZero(val) {
    if (val) {
        val = trimInvalidWhiteSpace(val);
    }

    if (!val || trim(val) == '' || val == 'null' || val == 'undefined' || val == '0' || val == '0.0' || val == 0) {
        return false;
    }
    return true;
}

function hasContentNoDelim(val, noZeros) {
    if (val) {
        val = trimInvalidWhiteSpace(val);
    }

    if (noZeros) {
        if (!hasContentNoZero(val) || valDelim == val || orDelim == val || rgDelim == val || attDelim == val) {
            return false;
        }

    } else {
        if (!hasContent(val) || valDelim == val || orDelim == val || rgDelim == val || attDelim == val) {
            return false;
        }
    }

    return true;
}



///////////////////////////////////////////////////////////////////
//This function is being phased out, because FormatHelper.hasContent
//allows zeros and to mirror the functionality please use
// hasContentAllowZero or hasContentNoZero.
function hasContent(val) {
    if (val) {
        val = trimInvalidWhiteSpace(val);
    }

    if (!val || trim(val) == '' || val == 'null' || val == 'undefined') {
        return false;
    }
    return true;
}
///////////////////////////////////////////////////////////////////
function RGBIntToHex(integer) {
    hexValues = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
    hexDigit1 = Math.floor(integer / 16);
    hexDigit2 = (integer % 16);
    return hexValues[hexDigit1] + hexValues[hexDigit2];
}
///////////////////////////////////////////////////////////////////
function parseReturns(s) {
    if (isNumber(s)) {
        return s;
    }
    if (!s)
        return "";

    if (s.indexOf('\n') < 0) {
        return s;
    } else {
        return s.substring(0, s.indexOf('\n')) + "<br>" + parseReturns(s.substring(s.indexOf('\n') + 1, s.length));
    }
}
///////////////////////////////////////////////////////////////////
function rndStrOrNumFloat(value, sigDigits) {
    var tmpNumber;
    var numberToRound;
    if (typeof(value) == "string" || typeof(value) == "number") {
        if (typeof(value) == "string") {
            //alert("Str 1 Rounded Number = " + value);
            numberToRound = parseFloat(value);
            tmpNumber = Math.round(numberToRound * Math.pow(10, sigDigits));
            //alert("Str 2 Temp Number = " + tmpNumber + "\n" +
            //      "Str 2 Number To Round = " + numberToRound + "\n" +
            //      "Str 2 Rounded Number = " + (tmpNumber / Math.pow(10,sigDigits)));
            return "" + (tmpNumber / Math.pow(10, sigDigits));
        } else {
            numberToRound = value;
            tmpNumber = Math.round(numberToRound * Math.pow(10, sigDigits));
            //alert("Num Rounded Number = " + (tmpNumber / Math.pow(10,sigDigits)));
            return tmpNumber / Math.pow(10, sigDigits);
        }
    } else {
        alert(valueMustBeStrNumMSG);
    }

}

///////////////////////////////////////////////////////////////////
function applyCurrencyFormat(value, displayDigits) {
    var tmpNumber;
    var numberToRound;
    if (typeof(value) == "string" || typeof(value) == "number") {
        if (typeof(value) == "string") {
            numberToRound = parseFloat(value);
            tmpNumber = Math.round(numberToRound * Math.pow(10, sigDigits));
            // alert("Str Rounded Number = " + (tmpNumber / Math.pow(10,sigDigits)));
            return "" + (tmpNumber / Math.pow(10, sigDigits));
        } else {
            numberToRound = value;
            tmpNumber = Math.round(numberToRound * Math.pow(10, sigDigits));
            // alert("Num Rounded Number = " + (tmpNumber / Math.pow(10,sigDigits)));
            return tmpNumber / Math.pow(10, sigDigits);
        }
    } else {
        alert(valueMustBeStrNumMSG);
    }

}

////////////////////////////////////////////////////////////////////
/**
 *  Function <code>enterThenSelectById</code>
 *  Moves focus from the element that triggered the event to the specified
 *  elementId when the Enter key is pressed
 *
 *  @param     event  -  a  <code>event object</code> event resulting from the pressing
 *                       of the enter key
 *  @param     elementId   -  a  <code>String</code> the element Id of the the element
 *                            to move focus to
 *
 **/
function enterThenSelectById(evt, elementId) {
    var objToSelect;
    var is = new Is();
    var keyCode = (evt.which) ? evt.which : event.keyCode
    //alert("keyCode = " + keyCode);
    if ((keyCode == 13 && is.win) || // enter key on PC
        (keyCode == 13 && is.mac) || // return key on Mac
        (keyCode == 3 && is.mac)) { // enter key on Mac Num Pad

        objToSelect = document.getElementById(elementId);
        if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {

            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", true, true);
            objToSelect.dispatchEvent(evt);

        } else {
            objToSelect.click();
        }

    }
}

function removeSelectedOptionOnDeleteKey(evt, elementId) {
    var objToSelect;
    var keyCode = (evt.which) ? evt.which : event.keyCode;
    //if key pressed is 'Delete' key
    if (keyCode == 46) {
        objToSelect = document.getElementById(elementId);
        if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", true, true);
            objToSelect.dispatchEvent(evt);
        } else {
            objToSelect.click();
        }

    }
}
////////////////////////////////////////////////////////////////////
/** Copies the values of one input element From to another To. */
/**
 *  Function <code>setFromEqualToTo</code>
 *  Copies the values of one input element From to another To
 *
 *  @param     fromId  -  a  <code>String</code> the element Id of the value source
 *  @param     toId   -  a  <code>String</code> the element Id of the recieving element
 *
 **/

function setFromEqualToTo(fromId, toId) {
    var fromObj = document.getElementById(fromId);
    var toObj = document.getElementById(toId);
    toObj.value = fromObj.value;
}


///////////////////////////////////////////////////////////////////
// Simple conversion of locale specific numeric string to
// javascript programming locale (ie. output will contain period for decimal Separator)
// decimalSeparator is localized from DecimalFormatSymbols.getDecimalSeparator() in StandardTemplateHeader.jsp
function parse_locale(param) {
    var p = param.toString();
    p = p.replace(decimalSeparator, '.');
    return p;
}

///////////////////////////////////////////////////////////////////
// Simple format of locale specific numeric string, just adds
// the groupingSeparator as required to the whole number portion
// of the number.
// decimalSeparator is localized from DecimalFormatSymbols.getDecimalSeparator() in StandardTemplateHeader.jsp
// groupingSeparator is localized from DecimalFormatSymbols.getGroupingSeparator() in StandardTemplateHeader.jsp
function addGroupingSeparators(param) {
    // make sure we are using a string
    param += '';

    // get the whole number and the fractional part
    pieces = param.split(decimalSeparator);
    whole = pieces[0];
    frac = pieces.length > 1 ? decimalSeparator + pieces[1] : '';

    // number of digits in each delimited grouping
    // this could be localized if need be, but our supported locales all use 3 digit groups for now
    var groupingSize = 3;

    // Use a RegExpression to perform the formatting of the whole number
    // double backslash is the escape of the backslash in the string
    // \d+ in combination with \d{3} will match a group of 3 numbers preceded by any amount of numbers.
    // This tricks the search into replacing from right to left.
    var pattern = "(\\d+)(\\d{" + groupingSize + "})";
    var re = new RegExp(pattern, "");

    // Format it, until all grouping separators have been inserted
    while (re.test(whole)) {
        whole = whole.replace(re, '$1' + groupingSeparator + '$2');
    }

    // glue the fractional portion back onto the whole
    return whole + frac;
}

///////////////////////////////////////////////////////////////////
// Simple format of javascript programming locale numeric string to
// specific language locale (ie. output will contain locale specific decimal Separator)
// decimalSeparator is localized from DecimalFormatSymbols.getDecimalSeparator() in StandardTemplateHeader.jsp
function format_locale(param) {
    var p = param.toString();
    p = p.replace('.', decimalSeparator);
    // p = addGroupingSeparators(p);
    return p;
}

function format_number(p, d) {
    var r;
    if (p < 0) {
        p = -p;
        r = format_number2(p, d);
        if(r!=0){
            r = "-" + r;
        }
    } else {
        r = format_number2(p, d);
    }
    return format_locale(r);
}

function format_number2(pnumber, decimals) {

    return round_number(pnumber, decimals);
    /* Unreachable code
      var strNumber = new String(pnumber);
      var arrParts = strNumber.split('.');
      var intWholePart = parseInt(arrParts[0],10);
      var strResult = '';
      if (isNaN(intWholePart))
        intWholePart = '0';
      if(arrParts.length > 1 && arrParts[1].length > 0)
      {
        var decDecimalPart = new String(arrParts[1]);
        var i = 0;
        var intZeroCount = 0;
         while ( i < String(arrParts[1]).length )
         {
           if( parseInt(String(arrParts[1]).charAt(i),10) == 0 )
           {
             intZeroCount += 1;
             i += 1;
           }
           else
             break;
        }
        decDecimalPart = parseInt(decDecimalPart,10)/Math.pow(10,parseInt(decDecimalPart.length-decimals-1));
        Math.round(decDecimalPart);
        decDecimalPart = parseInt(decDecimalPart)/10;
        decDecimalPart = Math.round(decDecimalPart);

        //If the number was rounded up from 9 to 10, and it was for 1 'decimal'
        //then we need to add 1 to the 'intWholePart' and set the decDecimalPart to 0.

        if(decDecimalPart==Math.pow(10, parseInt(decimals)))
        {
          intWholePart+=1;
          decDecimalPart="0";
        }
        var stringOfZeros = new String('');
        i=0;
        if( decDecimalPart > 0 )
        {
          while( i < intZeroCount)
          {
            stringOfZeros += '0';
            i += 1;
          }
        }
        decDecimalPart = String(intWholePart) + "." + stringOfZeros + String(decDecimalPart);
        var dot = decDecimalPart.indexOf('.');
        if(dot == -1)
        {
          decDecimalPart += '.';
          dot = decDecimalPart.indexOf('.');
        }
        var l=parseInt(dot)+parseInt(decimals);
        while(decDecimalPart.length <= l)
        {
          decDecimalPart += '0';
        }
        strResult = decDecimalPart;
      }
      else
      {
        var dot;
        var decDecimalPart = new String(intWholePart);

        decDecimalPart += '.';
        dot = decDecimalPart.indexOf('.');
        var l=parseInt(dot)+parseInt(decimals);
        while(decDecimalPart.length <= l)
        {
          decDecimalPart += '0';
        }
        strResult = decDecimalPart;
      }

      // ADDED TO STOP 1. WHEN DECIMAL == 0
      if(decimals == 0 && strResult.indexOf(".") > -1){

        strResult = strResult.substring(0, strResult.indexOf("."));
      }



      return strResult;
      */
}

function round_number(num, dec) {
    //alert('ENTER:  round_number num='+num);

    // low-level numeric format with upward rounding at 5+
    var cDec = '.'; // decimal point symbol

    // ignore rounding if dec/sigdig is set to -1
    if (dec == -1)
        return num;

    if (!(dec >= 0 && dec <= 9))
        dec = 2;

    if (isNaN(num) || num == '') { // zero values are returned in proper decimal format
        var sdec = "";
        for (var i = 0; i < dec; i++)
            sdec += '0';
        return "0" + (sdec != "" ? cDec + sdec : "");
    }

    var snum = num.toString();

    if(snum.split('e').length > 1){
        num = (Math.round( num * Math.pow(10, dec ))) / Math.pow(10, dec);
        snum = num.toString();
    }

    var arr_num = snum.split(cDec);
    var neg = '';
    var nullify = 0;
    dec_a = arr_num.length > 1 ? arr_num[1].length : 0;

    if (dec_a <= dec) { // fill decimal places with trailing zeros if necessary
        if (!dec_a)
            arr_num[1] = "";

        for (var i = 0; i < dec - dec_a; i++)
            arr_num[1] += '0';

        dec_a = dec;
    }

    // total decimal places in value before rounding and formatting
    dec_i = dec_a;
    dec_a -= dec;
    //alert("found negative sign ="+arr_num[0].charAt(0));
    if (arr_num[0].charAt(0) == '-') { // preserve negative symbol, remove from value (calculations)
        neg = '-';
        arr_num[0] = arr_num[0].substring(1, arr_num[0].length);
    }

    // case when whole value is 0
    if (!parseInt(arr_num[0])) { // nullify a zero whole value for correct decimal point placement
        arr_num[0] = "1"; // 0 whole # would not preserve amount in calc.
        nullify = 1; // flag to remove greatest 1 portion from whole #
    }

    var whole = parseInt(arr_num[0] * Math.pow(10, arr_num[1].length));

    // remove leading zeros
    for (i = 0; i < arr_num[1].length; i++)
        if (arr_num[1].charAt(i) != '0')
            break;

    if (arr_num[1].length == i) { // decimal portion blank or all zeros
        if (nullify) {
            arr_num[0] = "0"; // remove 1 from greatest decimal place (restoration)
        }
        return ("" + neg + arr_num[0] + (arr_num[1] != "" ? (cDec + arr_num[1]) : ""));
    }

    whole += parseInt(arr_num[1].substring(i, arr_num[1].length));

    if (arr_num[1].length != dec) { // round number affecting appropriate cluster of decimal places
        var diff = "";
        var str = whole.toString();
        for (i = dec_a; i > 0; i--)
            diff += str.charAt(str.length - i);

        diff = Math.pow(10, dec_a) - parseInt(diff);
        whole += ((diff <= 5 * Math.pow(10, dec_a - 1)) ? diff : 0);
    }

    str = whole.toString();
    var str_f = "";
    var j = 0;
    var k = 0;

    if (nullify) {
        arr_num[0] = "0"; // remove 1 from greatest decimal place (restoration)
        str = (parseInt(str.charAt(0)) - 1) + str.substring(1, str.length);

    } else // re-assign whole numeric portion from entire numeric string value
        arr_num[0] = str.substring(0, str.length - dec_i);

    for (i = 0; i < str.length; i++) { // combine portions of decimal number (whole, fraction, sign)
        if (k - 1 > dec)
            break; // fraction termination case

        if (j == arr_num[0].length) {
            if (!j)
                str_f += 0;

            str_f += (dec != 0 ? cDec : ''); // insert decimal point
            --i; // backtrack one character
            k++; // signal fraction count
        } else // assign character by character
            str_f += str.charAt(i);

        j++;
        if (k) // fractional counter increment
            k++;
    }
    return "" + neg + str_f;
}
//////////////////////////////////////////////////////////////////////////////////////
function toggleDiv(divName) {
    var div = document.getElementById(divName);
    if(div) {
        if (div.style.display == 'none') {
            div.style.display = 'block';
            adjustTableMaxHeight();
        } else {
            div.style.display = 'none';
        }
    }
}

function toggleDivEditBom(divName) {
    var div = document.getElementById(divName);
    var isExpand = false;
    if (div.style.display == 'none') {
        div.style.display = 'table-row-group';
        isExpand = true;
    } else {
        div.style.display = 'none';
    }
    document.cookie = "AdvBOMStickyStateExpand"+"="+isExpand+";path=/";
}
//////////////////////////////////////////////////////////////////////////////////////
function hideDiv(div, frame) {
    if (div && div.tagName && (div.tagName == 'div' || div.tagName == 'DIV')) {
        div.style.display = 'none';
        return;
    }
    // TEXT PASSED IN.
    div = document.getElementById(div);
    if (hasContent(div) && hasContent(div.style)) {
        div.style.display = 'none';
    }
    if (hasContent(frame)) {
        frame = document.getElementById(frame);
        frame.style.display = 'none';
    }
}
//////////////////////////////////////////////////////////////////////////////////////
function swapDiv(divName1, divName2) {
    var div1 = document.getElementById(divName1);
    var div2 = document.getElementById(divName2);

    var temp = div1.innerHTML;

    div1.innerHTML = div2.innerHTML;
    div2.innerHTML = temp;
}

function swapDiv2(divName1, divName2, checkName) {
    var div1 = document.getElementById(divName1);
    var div2 = document.getElementById(divName2);
    //alert("checkboxName = " + checkName);
    var checkbox = document.getElementsByName(checkName);
    var checked = 'false';

    var temp = div1.innerHTML;
    if (checkbox[0].checked) {
        checked = 'true';
    }
    /*if(checkbox[1].checked){
        checked = 'true';
    }*/
    div1.innerHTML = div2.innerHTML;
    var checkbox1 = document.getElementsByName(checkName);
    if (checked == 'true') {
        checkbox1[0].checked = true;
        checkbox1[1].checked = true;
    } else {
        checkbox1[0].checked = false;
        checkbox1[1].checked = false;
    }

    div2.innerHTML = temp;

    if (checkbox[0].checked && checkbox[1].checked) {
        checkbox[0].checked = true;
        checkbox[1].checked = true;
    }
}

function changeDiv(divName) {
    toggleDiv(divName);
    swapDiv(divName + '_plus', divName + '_minus');
}

function changeDivEditBomHeader(divName) {
    toggleDivEditBom(divName);
    swapDiv(divName + '_plus', divName + '_minus');
}

function changeDiv2(divName, checkboxName) {
    //alert("checkboxName = " + checkboxName);
    toggleDiv(divName);
    swapDiv2(divName + '_plus', divName + '_minus', checkboxName);
}

function toggleExpandableDiv(divId, toggleIconId) {

    var div = document.getElementById(divId);
    var image = document.getElementById(toggleIconId);
    if (div.style.display == 'none') {
        div.style.display = 'block';
        image.src = wtImageLocation + '/expand_tree.png';
    } else {
        div.style.display = 'none';
        image.src = wtImageLocation + '/collapse_tree.png';
    }
    closeActionsMenu();
}
function toggleExpandableDivForStickyHeader(divId, toggleIconId) {

    var div = document.getElementById(divId);
    var image = document.getElementById(toggleIconId);
    if (div.style.display == 'none') {
        div.style.display = 'block';
        image.src = '../../images/collapse_alt3.png';
        if(document.getElementById('StickyProductStateExpand')){
            document.getElementById('StickyProductStateExpand').value = false;
            document.cookie = "StickyProductStateExpand"+"="+"false"+";";
        }
        if(document.getElementById('StickyMaterialStateExpand')){
            document.getElementById('StickyMaterialStateExpand').value = false;
            document.cookie = "StickyMaterialStateExpand"+"="+"false"+";";
        }

    } else {
        div.style.display = 'none';
        image.src = '../../images/expand_alt3.png';
        if(document.getElementById('StickyProductStateExpand')){
            document.getElementById('StickyProductStateExpand').value = true;
            document.cookie = "StickyProductStateExpand"+"="+"true"+";";
        }
        if(document.getElementById('StickyMaterialStateExpand')){
            document.getElementById('StickyMaterialStateExpand').value = true;
            document.cookie = "StickyMaterialStateExpand"+"="+"true"+";";
        }
    }
    closeActionsMenu();
}
function clearStickyHeaderCookies(){
    document.cookie = "StickyProductStateExpand"+"=;"+"expires=Thu, 01-Jan-70 00:00:01 GMT;"
    document.cookie = "StickyMaterialStateExpand"+"=;"+"expires=Thu, 03-Jan-70 00:00:01 GMT;";
    document.cookie = "AdvBOMStickyStateExpand"+"=;path=/;"+"expires=Thu, 03-Jan-70 00:00:01 GMT;";
}

//////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
/**
 *  Function <code>getValueFromArray</code>
 *  Retrieves the a value from a javascript array.
 *
 *  @param     arrayToScan  -  a <code>Array</code> an array of nest child arrays
 *  @param     valueToCompare   -  a <code>String</code> the value to search for in the child arrays
 *  @param     indexToCompare  -  a <code>String</code> the index of the value in the child array to compare
 *  @param     indexToGet   -  a <code>String</code> the index of the value in the child array to retrieve
 *
 *  @return    output -  a <code>String</code> if the valueToCompare is found then the value in indexToGet
 *                                             if the valueToCompare is not found then 'none' is returned
 **/
function getValueFromArray(arrayToScan, valueToCompare, indexToCompare, indexToGet) {
    var checkValue;
    var output = "none";
    for (c = 0; c < arrayToScan.length; c++) {
        checkValue = arrayToScan[c][indexToCompare];
        if (checkValue == valueToCompare) {
            output = arrayToScan[c][indexToGet];
        }
    }
    return output;
}

////////////////////////////////////////////////////////////////////
/**
 *  Function <code>getTokenItemJS</code>
 *  Retrieves a numbered token (segment) from a string using the javascript split
 *  method. This function is the js version of the java method getTokenItem in the
 *  flextype.UomConversionCache class. So a string like si.Length.mm would be
 *  tokenized (split) into three strings, based om the period '.' delimeter, seen as
 *  token itemNumber 1, 2, or 3. itemNumber 2 would return 'Length'.
 *
 *  @param     stringToSplit  -  a <code>Array</code> an array of nest child arrays
 *  @param     itemNumber   -  a <code>String</code> the value to search for in the child arrays
 *  @param     delimeter  -  a <code>String</code> the index of the value in the child array to compare
 *
 *  @return    output -  a <code>String</code> if the string contains a token Item then that string token is returned
 *                                             if the string does not contain a token Item then '' is returned
 **/
function getTokenItemJS(stringToSplit, itemNumber, delimeter) {
    var output = "";
    stringToSplit = trimStrLR(stringToSplit);
    var splitArray = stringToSplit.split(delimeter);
    if (itemNumber <= splitArray.length) {
        output = splitArray[itemNumber - 1];
    }
    return output;
}
//////////////////////////////////////////////////////////////////////
function loadListFromArray(selectName, array, selectedIndex) {
    var select = document.getElementById(selectName);
    for (var i = 0; i < array.length; i++) {
        select.options[select.length] = new Option(array[i], array[i]);
    }
    if (hasContent(selectedIndex)) {
        select.selectedIndex = selectedIndex;
    }
}
//////////////////////////////////////////////////////////////////////
function lauchOrFocusWindow(targetWindow, url, name, props) {

    if (!targetWindow) {
        targetWindow = flexWindowOpenAsPost(url, name, props);
        targetWindow.focus();

    } else {
        alert(targetWindowExistsMSG);
        if (targetWindow && !targetWindow.closed) {
            targetWindow.focus();
        } else {
            targetWindow = null;
            window.focus();
        }
    }
}

function openWindow(url, name, props, docToUse, inline) {
    flexWindowOpenAsPost(url + '&timestamp=' + timestamp, name, props, docToUse, inline);
}

//////////////////////////////////////////////////////////////////////
function replaceAll(oldStr, findStr, repStr) {
    var srchNdx = 0; // srchNdx will keep track of where in the whole line
    // of oldStr are we searching.
    var newStr = ""; // newStr will hold the altered version of oldStr.
    while (oldStr.indexOf(findStr, srchNdx) != -1)
    // As long as there are strings to replace, this loop
    // will run.
    {
        newStr += oldStr.substring(srchNdx, oldStr.indexOf(findStr, srchNdx));
        // Put it all the unaltered text from one findStr to
        // the next findStr into newStr.
        newStr += repStr;
        // Instead of putting the old string, put in the
        // new string instead.
        srchNdx = (oldStr.indexOf(findStr, srchNdx) + findStr.length);
        // Now jump to the next chunk of text till the next findStr.
    }
    newStr += oldStr.substring(srchNdx, oldStr.length);
    // Put whatever's left into newStr.
    return newStr;
}

//////////////////////////////////////////////////////////////////////
function isAlphaNumeric(theValue, fieldName) {
    var chr;
    for (var i = 0; i < theValue.length; i++) {
        chr = theValue.charAt(i)
        if (!((chr >= 'A' && chr <= 'Z') || (chr >= 'a' && chr <= 'z') || (chr >= '0' && chr <= '9') || (chr == '_'))) {
            alert(fieldOnlyAlpaNum_MSG + fieldName);
            return false;
        }
    }

    return true;
}
//////////////////////////////////////////////////////////////////////
/**  This function returns "true" if the passed activity string is not
 *   a FIND_* (Ex: FIND_AGENT, FIND_PRODUCT) activity.  The function is used
 *   by the UpdateReportFilter.jsp and the UpdateReportViewPage.jsp.
 */
function isSpecialFilterViewActivity(activity) {

    if (hasContent(activity)) {
        activity = activity.toUpperCase();
        if (activity.indexOf("FIND") != 0) {
            return true;
        }
    }

    return false;

}

function stacktrace() {
    var stack = "stacktrace:******\n";

    var c = stacktrace.caller;
    stack = stack + parseFuncName(c.toString());
    c = c.caller;
    while (c != null) {
        stack = stack + "\n" + parseFuncName(c.toString());
        c = c.caller;
    }
    stack = stack + "\n**************";
    return stack;
}

function parseFuncName(func) {
    var fstr = '' + func;
    var fname = fstr.substring(9, fstr.indexOf("("));
    return fname;
}


function findVertPosOfObjectWithinElement(obj, el) {
    var curtop = 0;
    curtop = obj.offsetTop;
    while ((obj = obj.offsetParent) && (obj.id !== el.id)) {

        //alert('obj = ' + obj.id + ' obj.tagName = ' + obj.tagName + ' obj.offsetTop = ' + obj.offsetTop + ' curtop = ' + curtop );
        curtop += obj.offsetTop;
    }

    return curtop;
}

function findHorzPosOfObjectWithinElement(obj, el){
    var curleft = 0;
    curleft = obj.offsetLeft
    while ((obj = obj.offsetParent) && (obj.id !== el.id)) {

        //alert('obj = ' + obj + ' obj.tagName = ' + obj.tagName + ' obj.offsetLeft = ' + obj.offsetLeft + ' curleft = ' + curleft );
        curleft += obj.offsetLeft
    }
    return curleft;
}

function findVertPosOfObject(obj) {
    var curtop = 0;

    if (obj) {
		var rect = obj.getBoundingClientRect();
        curtop = rect.top;
    }

    return curtop;
}


function findHorzPosOfObject(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
        if (typeof Ext !== 'undefined') {
            if (obj.offsetParent.className.indexOf("x-grid-cell-inner") === 0 || obj.up('.x-expand-row')) { // We are in an ExtJS Grid cell. Just get absolute location
                var rect = obj.getBoundingClientRect();
                return rect.left;
            }
        }
        if (obj.offsetParent.className.indexOf("ag-cell")===0) { //we need absolute location for quickinfo card
                var rect = obj.getBoundingClientRect();
                return rect.left;
            }

        curleft = obj.offsetLeft
        while (obj = obj.offsetParent) {

            //alert('obj = ' + obj + ' obj.tagName = ' + obj.tagName + ' obj.offsetLeft = ' + obj.offsetLeft + ' curleft = ' + curleft );
            curleft += obj.offsetLeft
        }
    }
    return curleft;
}

function findExtJSGrid(obj) {
    return document.getElementById("flexExtGrid");
    //    if (obj.offsetParent) {
    //        curleft = obj.offsetLeft
    //        while (obj = obj.offsetParent) {
    //            if (obj.id("x-grid-view") === 0) { // We are in an ExtJS Grid
    //                return obj;
    //            }
    //        }
    //    }
    //    return null;
}

var actionMenuId;
var lastID,lastMenuPrefix;

function clearActionsDialogTimeOut(menuId) {
    if (clearActionsTimeOut != null) {
        clearTimeout(clearActionsTimeOut);
        clearActionsTimeOut = null;
    }
}

//Returns an object that contains a "fromLeft" and "fromTop" value
function determineInitialActionMenuPosition(id, id2, menuPrefix, appendTo){
    var acMenuPos = {fromLeft: 0, fromTop: 0};
    //console.log('menuPrefix + id = ' + menuPrefix + id);
    var sourceLink = document.getElementById(menuPrefix + id);
    //console.log('sourceLink + ' + sourceLink.parentNode.innerHTML);
    if (sourceLink != null) {
        if(!appendTo) {//Action menu is to be positioned relative to the main content area
        	if(window.parent.contentframe && window.parent.contentframe.document.getElementsByClassName("themedPage")){
                	var ft = sourceLink.getClientRects()[0].top;
        	}else{
        		var ft = findVertPosOfObject(sourceLink);
        	}
            var productNavigator = document.getElementById('productNavigator');
            var siteNavigator = document.getElementById('siteNavigator');

            if (hasContent(ft)) {
                acMenuPos.fromTop = ft + sourceLink.offsetHeight;
            }

            //  reposition action menu according to scroll bar for side naviagtion.
            if (productNavigator !== null) {
                acMenuPos.fromTop = acMenuPos.fromTop - productNavigator.scrollTop;
            }
            if (siteNavigator !== null) {
                acMenuPos.fromTop = acMenuPos.fromTop - siteNavigator.scrollTop;
            }

            var fl = findHorzPosOfObject(sourceLink);
            if (hasContent(fl)) {
                acMenuPos.fromLeft = fl;
            }
        }else{//Action menu is the be positioned relative to the element it is appended to.
            acMenuPos.fromTop = findVertPosOfObjectWithinElement(sourceLink, appendTo) + sourceLink.offsetHeight;
            acMenuPos.fromLeft = findHorzPosOfObjectWithinElement(sourceLink, appendTo);
        }
    }

    return acMenuPos;
}

function getActionsMenu(id, menutype, additionalParams, menuPrefix) {
	_getActionsMenu(id, id, menutype, additionalParams, menuPrefix);
	}
	
function getActionsMenu2(id, id2, menutype, additionalParams, menuPrefix) {
	_getActionsMenu(id, id2, menutype, additionalParams, menuPrefix);
	}	

function _getActionsMenu(id, id2,menutype, additionalParams, menuPrefix) {
    //clear any previously set timeouts to close the menu
    clearActionsDialogTimeOut();

    if (!hasContent(additionalParams)) {
        additionalParams = '';
    }
    // used for reposition action menu for side navigation
    lastID = id;
    lastMenuPrefix = menuPrefix;


    console.log('getActionsMenu: id = ' + id + ' menuType = ' + menutype + ' additionalParams = ' + additionalParams + 'menuPrefix = ' + menuPrefix);
    var menu = document.getElementById('actionOptions');
    if (menu && menu.style.display == 'block') {
        menu.style.display = 'none';
        if (is.ie) {
            showElem(menu);
        }
        var secondaryMenu = document.getElementById('secondaryActionOptions');
        if (secondaryMenu && secondaryMenu.style.display == 'block') {
            secondaryMenu.style.display = 'none';
            if (is.ie) {
                showElem(secondaryMenu);
            }
        }

        // IF THIS IS THE SAME MENU AS PREVIOUSLY LOADED AND IT WAS VISIBLE
        // HIDE IT AND RETURN. THIS PROVIDE A WAY OF CLOSING A MENU THAT
        // IS OPENED WITHOUT CLICKING ANYTHING ELSE
        if (actionMenuId == id) {
            return;
        }
    }

    actionMenuId = id;

    var text = '<br><br><b><center>' + loadingMenu_MSG + '<br><br><img src=\'' + urlContext + '/images/blue-loading.gif\' border="0"></center><br><br>';
    var fromTop = 200;
    var fromLeft = 200;

    // DETERMINE PREFIX TO USE FOR THE LINK ID
    if (!hasContent(menuPrefix)) {
        menuPrefix = 'ac_';
    }

    if (!menu) {
        menu = document.createElement("div");
        menu.id = 'actionOptions';
        menu.className = 'actionOptions';
        //document.body.appendChild(menu);
    }

    var appendTo = null;
    if (menuPrefix === "qi_"){//If this menu belongs to a quick info div, append it inside
        var quickInfoDiv = document.getElementById('quickInfoDiv');
        if(quickInfoDiv){
            quickInfoDiv.style.zIndex = '201';
            appendTo = quickInfoDiv;
        }
    }

    var acMenuPos = determineInitialActionMenuPosition(id, id2, menuPrefix, appendTo);

    fromTop = acMenuPos.fromTop;
    fromLeft = acMenuPos.fromLeft;

    if (appendTo != null && (menutype != "SEASONGROUP")) {
        appendTo.appendChild(menu);
    } else {//Append the actions menu to the body otherwise
        document.body.appendChild(menu);
    }
    
    menu.style.position = 'absolute';
    
    if(typeof Ext !== 'undefined' || document.getElementById('lineSheetExpandForm')){
        menu.style.display = 'block';
        menu.style.zIndex = 201;
        menu.style.left = fromLeft;
        menu.style.top = fromTop;
        //menu.style.width = 100;        
    }else{
        jQuery(menu).show();
        jQuery(menu).position( { my: "left top", at : "left bottom", of : document.getElementById(menuPrefix + id2)});
    }

    menu.className = 'actionOptions';
    if(document.lineSheetExpandForm){
	    menu.className += ' lineSheetExpandActionOptions'
     }
    menu.innerHTML = text;

   if (is.ie) {
        hideElem(menu);
    }

    var url = location.protocol + '//' + location.host + urlContext + masterControllerURL;
    var sOptions = 'activity=GET_ACTIONS_MENU&oid=' + id;
    sOptions += '&menuType=' + menutype;
    sOptions += additionalParams;
    sOptions += '&timecode=' + new Date().getTime();

    if (typeof(activeProductId) != 'undefined' && hasContent(activeProductId)) {
        sOptions += '&activeProductId=' + activeProductId;
    }
    if (typeof(activeOid) != 'undefined' && hasContent(activeOid)) {
        sOptions += '&activeOid=' + activeOid;
    } else if (document.APP_CONTEXT && document.APP_CONTEXT.activeProductId && hasContent(document.APP_CONTEXT.activeProductId)) {
        sOptions += '&activeOid=' + document.APP_CONTEXT.activeProductId;
    }

    runPostAjaxRequest(url, sOptions, 'completeGetActionsMenu');
    lastActionMenuId=menuPrefix+id2;
    //Registering event listener for closing action drop menu, when clicked outside the Menu widget.
    addListener(document, 'click', listenForClickOutsideactions, false);
    //Registering event listener for closing action drop menu, when user goes away from the Menu widget.
    addListener(menu, 'mouseover', mouseOveractionsDialogSetTime, false);
    addListener(menu, 'mouseleave', setActionDialogTimeOut, false);
    //Address issue where action menu wouldn't close if the user clicked to open the menu but never moused over it.
    var sourceLink = document.getElementById(menuPrefix + id2);
    addListener(sourceLink, 'mouseleave', setActionDialogTimeOut, false);
    addListener(document.getElementById('contentDiv'), 'scroll', closeActionsMenu, false);
    addListener(document.getElementsByClassName('table-wrapper')[0], 'scroll', closeActionsMenu, false);
}
var clickY=0;
function listenForClick(e){
    clickY = e.pageY;
}
// reposition action menu on side navigation
function repositionActionMenu(){
    var menu = document.getElementById('actionOptions');
    if (menu && menu.style.display == 'block') {
        var fromTop = 200;
        var fromLeft = 200;
        var posOffset = 0;
        // DETERMINE PREFIX TO USE FOR THE LINK ID
        if (!hasContent(lastMenuPrefix)) {
            lastMenuPrefix = 'ac_';
        }
        var sourceLink = document.getElementById(lastMenuPrefix + lastID);
        if (sourceLink != null) {
            var ft = findVertPosOfObject(sourceLink);
            var productNavigator = document.getElementById('productNavigator');
            var siteNavigator = document.getElementById('siteNavigator');

            if (hasContent(ft)) {
                fromTop = ft - posOffset + sourceLink.offsetHeight;
            }
            //  reposition action menu according to scroll bar.
            if (productNavigator !== null) {
                fromTop = fromTop - productNavigator.scrollTop;
             }
             if(siteNavigator !== null) {
                fromTop = fromTop - siteNavigator.scrollTop;
             }
            if (fromTop > 28) {
                menu.style.top = fromTop;
            }
            else {
               menu.style.top = 30;
            }
        }
     }
}
function repositionProductNavActionMenu(){
      var menu = document.getElementById('actionOptions');
        if (menu && menu.style.display == 'block') {
             menu.style.top = clickY+10;
        }
}
function completeGetActionsMenu(xml, text) {

    //alert('text = ' + text);
    var menu = document.getElementById('actionOptions');
    console.log("inserting actions menu now: menu = " + menu + ' ' + menu.style.display);
    text = text.strip();
    if (!text.empty()) {
        menu.innerHTML = text;
        var options = menu.getElementsByTagName("a");
        if (options.length == 1) {
            var link = options[0];
            if (link.href != null && (link.href.indexOf("getSecondaryActionsMenu") > -1)) {
                link.focus();
                if (is.ie) {
                    link.click();
                } else {
                    var ref = link.href;
                    ref = ref.replace(/,%20/g, ',');
                    link.href = ref;
                    eval(link.href);
                }
                lastSecondaryMenuId="ONE_OPTION_ONLY";
            }
        }else{
            lastSecondaryMenuId="";
        }
        if (typeof Ext !== 'undefined') {
            if (menu.offsetTop + menu.offsetHeight > menu.parentNode.offsetHeight + menu.parentNode.scrollTop - 20) {
                menu.style.top = menu.offsetTop - 20 - menu.offsetHeight;
            }
            if (menu.offsetLeft + menu.offsetWidth > menu.parentNode.offsetWidth + menu.parentNode.scrollLeft - 20) {
                menu.style.left = menu.parentNode.offsetWidth + menu.parentNode.scrollLeft - 20 - menu.offsetWidth;
            }
        }
        //Adjust the primary actions menu if it is to be rendered outside the viewable area
        adjustElementWithinWindow(menu);
    } else {
        closeActionsMenu();
    }

}

function closeActionsMenu() {
    var menu = document.getElementById('actionOptions');
    if (menu) {
        menu.style.display = 'none';
        showElem(menu);

    }
    var menu2 = document.getElementById('secondaryActionOptions');
    if (menu2 && menu2.style.display == 'block') {
        menu2.style.display = 'none';
        showElem(menu2);
    }
    removeListener(document.getElementById('contentDiv'), 'scroll', closeActionsMenu, false);
    removeListener(document.getElementsByClassName('table-wrapper')[0], 'scroll', closeActionsMenu, false);
}



var secondaryActionMenuId;

function getSecondaryActionsMenu(id, menutype, additionalParams) {
    if (!hasContent(additionalParams)) {
        additionalParams = '';
    }
    //console.log('getSecondaryActionsMenu: id = ' + id + ' menuType = ' + menutype );

    var menu = document.getElementById('secondaryActionOptions');
    if (menu && menu.style.display == 'block') {
        menu.style.display = 'none';
        if (is.ie) {
            showElem(menu);
        }
        // IF THIS IS THE SAME MENU AS PREVIOUSLY LOADED AND IT WAS VISIBLE
        // HIDE IT AND RETURN. THIS PROVIDE A WAY OF CLOSING A MENU THAT
        // IS OPENED WITHOUT CLICKING ANYTHING ELSE
        if (secondaryActionMenuId == id) {
            return;
        }
    }

    secondaryActionMenuId = id;

    var text = '<br><br><b><center>' + loadingMenu_MSG + '<br><br><img src=\'' + urlContext + '/images/blue-loading.gif\' border="0"></center><br><br>';
    var fromTop = 200;
    var fromLeft = 200;
    var posOffset = 0;

    var sourceLink = document.getElementById('mac_' + id);

    if (sourceLink != null) {
        //Position the secondary actions menu to align with its corresponding link in the primary actions menu
        fromTop = sourceLink.offsetTop;
    }

    if (!menu) {
        menu = document.createElement("div");
        menu.id = 'secondaryActionOptions';
        menu.className = 'actionOptions';
        document.body.appendChild(menu);

    }

    var appendTo = document.getElementById('actionOptions');
    //The secondary actions menu should always be appended to the div of the primary actions menu
    if(appendTo) {
        appendTo.appendChild(menu);
        //Position the secondary actions menu at the right edge of the primary actions menu
        fromLeft = appendTo.clientWidth;
    }else{//Shouldn't get here but if we do, render the secondary menu somewhere
        document.body.appendChild(menu);
    }

    menu.style.display = 'block';
    menu.style.zIndex = 202;
    menu.style.position = 'absolute';
    menu.style.left = fromLeft;
    menu.style.top = fromTop;
    menu.style.width = 150;
    menu.className = 'actionOptions';
    menu.innerHTML = text;


    var actionMenu = document.getElementById('actionOptions');

    if (is.ie) {
        hideElem(menu);
    }
    //menu.onmouseout = function(ev){ checkHideActionsMenu(this); }


    if ('PRODUCT' == menutype) {
        getProductActions(id);
    } else { // LINESHEET NOW HANDLED HERE..... controller will route Linesheet menu requests to ProductActionsMenu.jsp
        //console.log("calling runAjaxRequest with menutype NOT PRODUCT ");
        runPostAjaxRequest(location.protocol + '//' + location.host + urlContext + masterControllerURL, 'activity=GET_ACTIONS_MENU&oid=' + id + '&menuType=' + menutype + additionalParams + '&timecode=' + new Date().getTime(), 'completeGetSecondaryActionsMenu');
    }


}

function completeGetSecondaryActionsMenu(xml, text) {
    //console.log("inserting secondary actions menu now");
    //alert('text = ' + text);
    var menu = document.getElementById('actionOptions');
    var secondarymenu = document.getElementById('secondaryActionOptions');
    secondarymenu.innerHTML = text;

    /* Adjust secondary actions menu. Pass true to second parameter to ensure secondary actions menu renders
    *  on the left side of the primary actions menu if it would otherwise appear outside the viewable area
    */
    adjustElementWithinWindow(secondarymenu, true);
}

/*
* Function to adjust elements that would otherwise be rendered outside of the viewable area
* @param1: The element to reposition
* @param2: A boolean to set whether we should adjust the element if after it is moved if covers part of its parent (used for secondary actions menu). Does not apply
*   to elements appended to the body of the document.
* */
function adjustElementWithinWindow(el, adjustIfOverlap) {
    var widthOfWindow = getInsideWindowWidth();
    var scrollLeftOffset = document.body.scrollLeft;
    var heightOfWindow = getInsideWindowHeight();
    var scrollTopOffset = document.body.scrollTop;
    var extraShiftVertical = 20;//extra amount to shift up or down so that the component isn't right again the edge of the browser
    var extraShiftHorizontal = 20;//extra amount to shift up or down so that the component isn't right again the edge of the browser

    //Check bottom edge
    var ft = findVertPosOfObject(el);
    var vertPositionRelToViewPort;
    if(ft > scrollTopOffset && ft > heightOfWindow){
    	vertPositionRelToViewPort = ft - scrollTopOffset;
    }else{
        vertPositionRelToViewPort = ft;
    	extraShiftVertical = 0;
    }

    if(hasContent(ft)  && hasContent(heightOfWindow)){
        var heightOfElement = el.clientHeight;
        var elementVerticalOverflow = (vertPositionRelToViewPort + heightOfElement) - heightOfWindow;
        if(elementVerticalOverflow > 0){
	      if(document.lineSheetExpandForm && (el.offsetTop - elementVerticalOverflow - extraShiftVertical)< 0){
		    el.style.top = 0;
	     } else{
            el.style.top = (el.offsetTop - elementVerticalOverflow - extraShiftVertical) + 'px';
         }
        }
    }

    //Check right edge
    var fl = findHorzPosOfObject(el);
    var horzPositionRelToViewPort = fl - scrollLeftOffset;
    if(hasContent(fl) && hasContent(widthOfWindow)){
        var widthOfElement = el.clientWidth;
        var elementHorizontalOverflow = (horzPositionRelToViewPort + widthOfElement) - widthOfWindow;
        if(elementHorizontalOverflow > 0){
            el.style.left = (el.offsetLeft - elementHorizontalOverflow - extraShiftHorizontal) + 'px';
        }
    }

    if((el.offsetLeft + el.clientWidth) > widthOfWindow){
        el.style.left = (widthOfWindow - el.clientWidth - extraShiftHorizontal) + 'px';
    }

    //Adjust child component if requested
    if(adjustIfOverlap && el.parentElement !== document.body) {
        var leftEdgeOfChildElementRelativeToParentElement = el.offsetLeft;
        var rightEdgeOfChildElementRelativeToParentElement = leftEdgeOfChildElementRelativeToParentElement + el.clientWidth;
        if (((0 <= leftEdgeOfChildElementRelativeToParentElement) && (leftEdgeOfChildElementRelativeToParentElement < el.parentElement.clientWidth)) ||
            ((0 <= rightEdgeOfChildElementRelativeToParentElement) && (rightEdgeOfChildElementRelativeToParentElement < el.parentElement.clientWidth))) {
            el.style.left = (0 - el.clientWidth) + 'px';
        }
    }

    //Display the quickInfoDiv now that it is repositioned
    el.style.visibility = "visible";
}

function closeExtPanels() {
    if (typeof Ext !== 'undefined' && typeof Ext.ComponentQuery !== 'undefined') {
        var panelsArray = Ext.ComponentQuery.query('panel');
        if (panelsArray !== null) {
            for (i = 0; i < panelsArray.length; i++) {
                var cmp = panelsArray[i];
                if (cmp != null) {
                    // cmp.setDisabled(true); // This hangs Ext with large tables on close
                    cmp.setSize(0, 0);
                }
            }
        }
    }

}




/** THE NEXT TWO METHODS ARE TEMP DEMO METHODS.... SHOULD NOT BE HERE IN PROD
 */
function launchColorChooser() {

    var colorChooser = document.getElementById('colorChooser');
    colorChooser.style.display = 'block';

    // GETS RUN EACH TIME THE METHOD IS CALLED, WHICH CAUSES ISSUES...
    // SHOULD ONLY RUN ONCE...
    makeClickable(document.getElementById('color1'));
    makeClickable(document.getElementById('color2'));
    makeClickable(document.getElementById('color3'));
    makeClickable(document.getElementById('color4'));
    makeClickable(document.getElementById('color5'));
    makeClickable(document.getElementById('color6'));
    makeClickable(document.getElementById('color7'));
    makeClickable(document.getElementById('color8'));
    makeClickable(document.getElementById('color9'));
    makeClickable(document.getElementById('color10'));
    makeClickable(document.getElementById('color11'));
    addDropTarget(document.getElementById('colorwayTable'));
    makeWindowClickable(document.getElementById('colorChooserTitle'));
}

function handleTargetDropEvent(ev, targetObj) {


    var targetTable = targetObj; //document.getElementById('targetTable');
    var lastRow = getRow(targetTable, getRowCount(targetTable) - 1);
    if (getCellCount(lastRow) > 4) {
        lastRow = targetTable.insertRow(getRowCount(targetTable));
    }

    var cell = lastRow.insertCell(getCellCount(lastRow));
    dragObject.style.position = 'relative';
    dragObject.style.top = null;
    dragObject.style.left = null;
    dragObject.style.zIndex = dragObject.parentNode.style.zIndex;
    cell.appendChild(dragObject);

}

/**	Peek UI code change : Start */

function showPeekViewWindow(clickId,ajaxUrl){
	var peekViewWindow = document.getElementById("peekViewWindow");
	if(peekViewWindow){
		peekViewWindow.style.display = "block";
		peekViewWindow.getElementsByTagName('iFrame')[0].src = ajaxUrl;
	}
}
function closePeekViewWindow(){	
	// Close now
   	var peekViewWindow = document.getElementById("peekViewWindow")? document.getElementById("peekViewWindow"): window.top.contentframe.document.getElementById("peekViewWindow");
	if(peekViewWindow){
		peekViewWindow.style.display = "none";
		// Clear the iFrame content
		peekViewWindow.getElementsByTagName('iFrame')[0].src = 'about:blank';
		var val = document.MAINFORM.activity.value;
		if(val != 'VIEW_WORK_LIST_TABLE'){
			window.parent.closePeekView(val);
		}else{
			closePeekView(val);
		}
		
	}
}

function closePeekView (val){
	if(val == "PRODUCT_PEEK_VIEW"){
		var event = new CustomEvent("closeProductPeekView",{detail : ''});
		document.dispatchEvent(event);
	}else if(val == 'COMPONENT_PEEK_VIEW'){
		var event = new CustomEvent("closeComponentPeekView",{detail : ''});
		document.dispatchEvent(event);
	}else{
		var evnt = new CustomEvent("closePeekView",{detail : ''});
		document.dispatchEvent(evnt);
	}
}

function viewProductPeekViewObject(oid){
	closePeekViewWindow();
	viewObject(oid);
}

/**	Peek UI code change : End */

/** CODE QUICK INFO POP UP
 */
var currentDelaySource;

function showDelayDiv(hoverId, ajaxUrl, completeFunction) {
    //console.log("showDelayDiv: hoverId = " + hoverId + " ajaxUrl = " + ajaxUrl + " currentDelaySource = " + currentDelaySource);
    var windowType = document.getElementsByName('windowType');
    if(windowType && windowType.length > 0 && windowType[0].value == 'READ_ONLY_POPUP') {
        return;
    }
    if (currentDelaySource != hoverId) {
        currentDelaySource = hoverId;
        //console.log('showDelayDiv: currentDelaySource != hoverId');
        setTimeout('showDelayDivNow(\'' + hoverId + '\', \'' + ajaxUrl + '\', \'' + completeFunction + '\')', QUICKINFO_TIMEOUT);
    } else {
        //console.log('showDelayDiv: currentDelaySource == hoverId');
    }
}

function showDelayDivNow(hoverId, ajaxUrl, completeFunction) {
    //console.log("showDelayDivNow: hoverId = " + hoverId + " ajaxUrl = " + ajaxUrl + " currentDelaySource= " + currentDelaySource);
    if (currentDelaySource == hoverId) {

        var sUrl, sOptions;
        var iQuestionMarkAt = ajaxUrl.indexOf("?");
        if (iQuestionMarkAt > -1) {
            sUrl = ajaxUrl.substr(0, iQuestionMarkAt);
            sOptions = ajaxUrl.substr(iQuestionMarkAt + 1);
        } else {
            sUrl = ajaxUrl;
            sOptions = "";
        }

        //console.log("showDelayDivNow: hoverId" + hoverId + " URL = " + ajaxUrl);
        
		quickInfoSourceObj = currentDelaySource;
		
        if (completeFunction == null || completeFunction == "undefined")
            runPostAjaxRequest(sUrl, sOptions, 'completeShowQuickInfo');
        else
            runPostAjaxRequest(sUrl, sOptions, completeFunction);
    } else {
        //console.log('showDelayDivNow: currentDelaySource != hoverId');

    }
    //stopDelayDiv();
}

function stopDelayDiv() {
    currentDelaySource = '';
    //closeQuickInfo();
}

function closeQuickInfo() {
    if (quickInfoDiv && quickInfoDiv.style.visibility == 'visible') {

        // THIS CODE WILL HIDE THE QUICK INFO BOX ON MOUSE OUT OF THE LINK..
        // THIS PREVENTS US FROM
        quickInfoDiv.style.visibility = 'hidden';
        if (is.ie && quickInfoDivFrame) {
            quickInfoDivFrame.style.display = 'none';
        }
        // clear timeout from the QuickInfo Dialog
        clearQuickInfoDialogTimeOut();
        removeListenerFromQuickInfoDialog();
        closeActionsMenu();

    }
    var popupframe = window.parent.document.getElementById('popupframe');
    if(popupframe && (popupframe.style.display == "block" || (popupframe.contentWindow.document.getElementById('quickInfoDiv') && popupframe.contentWindow.document.getElementById('quickInfoDiv').style.visibility == 'visible'))){
        popupframe.style.display = "none";
        popupframe.contentWindow.document.getElementById('quickInfoDiv').style.visibility = 'hidden';
        // clear timeout from the QuickInfo Dialog
        clearQuickInfoDialogTimeOut();
        removeListenerFromQuickInfoDialog();
        closeActionsMenu();
    }
}

//set quick info dialog timeout
function setQuickInfoDialogTimeOut() {
    clearQuickInfoDialogTimeOut();
    if (QUICKINFO_CLOSE_AFTER_TIMEOUT) {
        clearQuickInfoTimeOut = setTimeout(closeQuickInfo, QUICKINFO_CLOSE_TIMEOUT);
    }
}
function setActionDialogTimeOut() {
    clearActionsDialogTimeOut();
    clearActionsTimeOut = setTimeout(closeActionsMenu, QUICKINFO_CLOSE_TIMEOUT);

}
// clear quick info dialog timeout
function clearQuickInfoDialogTimeOut(e) {
    if(e){
        e.stopPropagation();
    }
    if (clearQuickInfoTimeOut != null) {
        clearTimeout(clearQuickInfoTimeOut);
        clearQuickInfoTimeOut = null;
    }
}

var quickInfoDiv;
var quickInfoDivFrame;
var quickInfoSourceObj;
var cellWidth;

function completeShowQuickInfo(xml, text,optionalParam) {

	if(quickInfoDiv || document.getElementById("quickInfoDiv")){
		quickInfoDiv = quickInfoDiv ? quickInfoDiv : document.getElementById("quickInfoDiv");
		quickInfoDiv.innerHTML = "";
	}

    clearQuickInfoDialogTimeOut();
	var sourceLink = document.getElementById(quickInfoSourceObj);
	if(sourceLink && sourceLink.nodeName != "A"){
		var childLinkElements = sourceLink.getElementsByTagName('a');
		if(childLinkElements.length > 0){
			sourceLink = childLinkElements[0];
		}
	}
	
	if(sourceLink && null !=sourceLink.closest(".ag-cell") && null!= sourceLink.closest(".ag-cell").offsetWidth){
	  cellWidth = sourceLink.closest(".ag-cell").offsetWidth;
	  if(null!=window.getComputedStyle(sourceLink.closest(".ag-cell"), null).getPropertyValue('padding-left')){
	  cellWidth = sourceLink.closest(".ag-cell").offsetWidth - parseInt(window.getComputedStyle(sourceLink.closest(".ag-cell"), null).getPropertyValue('padding-left'));
	  }
	}
    var fromTop = 0;
    var fromLeft = 0;
    var posOffset = 0;
    var quickInfoDivWidth = 300;
    var quickInfoDivShift = 50;

    if (!quickInfoDiv || !document.getElementById("quickInfoDiv")) {
        //Create the quickInfoDiv for the first time
        quickInfoDiv = document.createElement("div");
        quickInfoDiv.id = 'quickInfoDiv';
        quickInfoDiv.style.display = 'block';
        quickInfoDiv.style.zIndex = 200;
        quickInfoDiv.style.position = 'fixed';
        quickInfoDiv.style.width = quickInfoDivWidth;
        if(document.lineSheetExpandForm){
        quickInfoDiv.className = 'quickInfoLineSheetExapndRow';
        }
        if("colorwayFromSideBar" != optionalParam){
            document.body.appendChild(quickInfoDiv);
        }else{
            window.parent.document.getElementById('popupframe').contentWindow.document.getElementById('reusablePopupPlaceholder').appendChild(quickInfoDiv);
        }
    }

    //Ensure quickInfoDiv is hidden while it's position is calculated
    quickInfoDiv.style.visibility = 'hidden';
    quickInfoDiv.innerHTML = text;

    if("colorwayFromSideBar" != optionalParam){
        if (sourceLink != null) {
            //Set the initial position of the quick info div
            var ft = findVertPosOfObject(sourceLink);
            fromTop = ft;
            if (fromTop < 0) {
                fromTop = 0;
            }
            var fl = findHorzPosOfObject(sourceLink);
            var widthOfSourceLink = sourceLink.offsetWidth;
            if('undefined' != cellWidth && cellWidth<widthOfSourceLink){
             widthOfSourceLink = cellWidth;
            }
            fromLeft = fl + widthOfSourceLink;

        //To adjust quickInfo popup with custom scrollbar on table
        var customScrollbar = sourceLink.closest(".table-wrapper");
        var scrollLeftOffSetTable = 0;
        if(customScrollbar){
            scrollLeftOffSetTable = customScrollbar.scrollLeft;
            fromLeft = fromLeft - scrollLeftOffSetTable;
        }
		
        quickInfoDiv.style.left = fromLeft;
        quickInfoDiv.style.top = fromTop;
        //Check if the quick info div is going to appear outside the viewable area, if so, adjust it
        //adjustElementWithinWindow(quickInfoDiv);
        setTimeout('adjustElementWithinWindow(quickInfoDiv)', 150);
        }

    }else{
        var eventTargetPos  = sourceLink.getBoundingClientRect();
        quickInfoDiv.style.left = (eventTargetPos.left + eventTargetPos.width) + 'px';
        quickInfoDiv.style.top = (eventTargetPos.top + 42)  + 'px';// Height of header frame => 42px
        //Display the quickInfoDiv now that it is repositioned
        quickInfoDiv.style.visibility = "visible";
    }


    if("colorwayFromSideBar" != optionalParam){
    var quickInfoTable = document.getElementById("quickInfoTable");
    var viewableWidth = quickInfoTable.offsetWidth + 50;
    if (viewableWidth > quickInfoDiv.offsetWidth) {
        quickInfoDiv.style.width = viewableWidth;
    }
    }else{
        var quickInfoTable = window.parent.document.getElementById('popupframe').contentWindow.document.getElementById("quickInfoTable");
    }
    if (is.ie) {
        if (!quickInfoDivFrame) {
            quickInfoDivFrame = document.createElement("iframe");
            quickInfoDivFrame.id = "quickInfoDivFrame";
            quickInfoDivFrame.src = "about:blank";
            quickInfoDivFrame.scrolling.value = "no";
            quickInfoDivFrame.style.position = "absolute";
            quickInfoDivFrame.style.display = "none";
            document.body.appendChild(quickInfoDivFrame);
        }
        quickInfoDivFrame.style.width = quickInfoDiv.offsetWidth;
        quickInfoDivFrame.style.height = quickInfoDiv.offsetHeight - 20;
        quickInfoDivFrame.style.top = fromTop + 10;
        quickInfoDivFrame.style.left = fromLeft;
        quickInfoDivFrame.style.zIndex = quickInfoDiv.style.zIndex - 1;
        quickInfoDivFrame.style.display = 'block';
    }
    //document.onkeydown = listenForCloseQuickInfo;

    addListener(document, 'keydown', listenForCloseQuickInfo, false);
    addListener(document, 'click', listenForClickOutsideQuickInfo, false);

    if (QUICKINFO_CLOSE_AFTER_TIMEOUT) {
        addListener(quickInfoDiv, 'mouseover', clearQuickInfoDialogTimeOut, false);
        addListener(quickInfoDiv, 'mouseleave', setQuickInfoDialogTimeOut, false);

        if("colorwayFromSideBar" != optionalParam){
            addListener(sourceLink, 'mouseleave', setQuickInfoDialogTimeOut, false);
        }else{
            // Utilize sourceClonePlaceholder for cloning original sourceLink and handle mouseleave event
			var originalRect = sourceLink.getBoundingClientRect();            
            var cloneSourceLink = window.parent.document.getElementById('popupframe').contentWindow.document.getElementById("sourceClonePlaceholder");
            cloneSourceLink.style.position = "absolute";
            cloneSourceLink.style.top = originalRect.top + 42;
            cloneSourceLink.style.left = originalRect.left;
            cloneSourceLink.style.width = originalRect.width;
            cloneSourceLink.style.height = originalRect.height;
            addListener(cloneSourceLink, 'mouseleave', setQuickInfoDialogTimeOut, false);
        }

    }

}

function mouseOveractionsDialogSetTime(e) {
    if(e.target.id.indexOf('mac_')>-1 && lastSecondaryMenuId!=e.target.id && lastSecondaryMenuId!="ONE_OPTION_ONLY"){
        lastSecondaryMenuId=e.target.id;
        var sHref=e.target.href;
        sHref=sHref.replace('javascript:','');
        sHref=sHref.replace(';','');
        setTimeout(decodeURI(sHref),1);
    }

    var currentActionMenuId=e.target.id;
    if (lastActionMenuId===currentActionMenuId ||currentActionMenuId=="" ||currentActionMenuId==" ") {
            clearTimeout(clearActionsTimeOut);
            clearActionsTimeOut = null;
            return;
    }else if(currentActionMenuId.indexOf('mac_')<-1 && currentActionMenuId.indexOf('ac_')>-1){
        setActionDialogTimeOut();
    }

}

//When user clicks outside the actions menu then close it
function listenForClickOutsideactions(e) {
    var menu = document.getElementById('actionOptions');
    if((menu && menu.contains(e.target)) || e.target.className === "actions_link"){//Use logic within getActionsMenu to close the menu if the link is clicked again
        return;//Clicked an element inside the actions div; do nothing
    }else{
        closeActionsMenu();
    }
}

// when user click outside quick info dialog then close it
function listenForClickOutsideQuickInfo(e) {
    if (quickInfoDiv && quickInfoDiv.contains(e.target)) {
        return;//Clicked an element inside the quickInfo div; do nothing
    }else {
        closeQuickInfo();
    }
}

function listenForCloseQuickInfo(e) {

    if (!quickInfoDiv || quickInfoDiv.style.visibility == 'hidden') {
        return;
    }

    if (document.all) e = event;
    //console.log('e.keyCode = ' + e.keyCode);
    if (e.keyCode == '27') {
        closeQuickInfo()
    }
}

// remove listener from the quick info dialog
function removeListenerFromQuickInfoDialog() {
    removeListener(document, 'click', listenForClickOutsideQuickInfo, false);
    removeListener(document, 'keydown', listenForCloseQuickInfo, false);
    if (QUICKINFO_CLOSE_AFTER_TIMEOUT) {
        removeListener(document.getElementById("quickInfoDiv"), 'mouseover', clearQuickInfoDialogTimeOut, false);
        removeListener(document.getElementById("quickInfoDiv"), 'mouseleave', setQuickInfoDialogTimeOut, false);

    }
}


//////////////////////////////////////////////////////////////////
// START AJAX SEARCH CODE
//////////////////////////////////////////////////////////////////

var quickSearchLink;
var quickSearchFormName;
var activeSelectorRow;
var currentSelectWidget;
var selectorDiv;
var oldSelectorValue;
var lastSelectorKeyStrokeTime;
var extJSMenuNeeded = false;
var quickSearchLinkMap = {};
var quickSearchLinkNodeMap = {};
var quickSearchLinkValue;

function showTypeAheadChooser(link, formName, module, refType, rootTypeId, searchDelay, required) {

    if (typeof searchDelay === "undefined") {
        searchDelay = 750;
    }
    if (typeof required === "undefined") {
        required = false;
    }

    //alert(' link = ' + link + ' module = ' + module + ' refType = ' + refType + ' rootId = ' + rootId);
    //alert("link = " + link.innerHTML);
    if (selectorDiv == null || (selectorDiv != null && selectorDiv.style.display == 'none')) {
        quickSearchLink = link;
        quickSearchFormName = formName;
        quickSearchLinkMap[link.parentNode.id] = link;
        quickSearchLinkNodeMap[link.parentNode.id] = link.parentNode;
        oldSelectorValue = '';
        var parent = link.parentNode;
        extJSMenuNeeded = true;
        parent.removeChild(link);
        parent.innerHTML = '<input id=\'quickSearchInput\' onKeyUp=\'showSelector(this, "' + module + '", "' + refType + '", "' + rootTypeId + '", "' + searchDelay + '", "' + required + '");\' onBlur=\'hideQuickSearchInput(this)\'  onKeyPress=\'return disableEnterKey(event)\'>';

        var input = document.getElementById('quickSearchInput');
        input.addEventListener("keydown", function(e) {
            selector_keyNavigation(e);
        });
        input.focus();
        extJSMenuNeeded = false;
    }

}

function hideQuickSearchInput(input) {
    setTimeout(function(){ // allow other listeners to fire first
        hideQuickSearchInputNow(input);
    }, 250);
}

function isEmptyMap(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}

function hideQuickSearchInputNow(input) {
    var parent = input.parentNode;
    if (parent) {
        parent.removeChild(input);
        if(!isEmptyMap(quickSearchLinkMap)) {
            parent.appendChild(quickSearchLinkMap[parent.id]);
            quickSearchLink.focus();

            for(var parentKey in quickSearchLinkMap) {
                  if(parentKey != parent.id){
                      while (quickSearchLinkNodeMap[parentKey].firstChild) {
                          quickSearchLinkNodeMap[parentKey].removeChild(quickSearchLinkNodeMap[parentKey].firstChild);
                      }
                      quickSearchLinkNodeMap[parentKey].appendChild(quickSearchLinkMap[parentKey]);
                  }
            }
        } else {
            parent.appendChild(quickSearchLink);
            quickSearchLink.focus();
        }
    }
    if (selectorDiv && selectorDiv.style.display !== 'none') {
        closeSelector();
        quickSearchFormName = '';
    }
}

function selector_keyNavigation(e) {

    if (!selectorDiv || selectorDiv.style.display == 'none') {
        return;
    }

    if (document.all) e = event;


    //createPopUp('selector_keyNavigation: ' + new Date().getTime() + ' e.keyCode = ' + e.keyCode);

    //console.trace();

    if (e.keyCode == 38) { // Up arrow
        if (!activeSelectorRow) return;
        if (activeSelectorRow && !getPrevRowFromRow(activeSelectorRow)) return;
        selectSelectorRow(getPrevRowFromRow(activeSelectorRow));
    }



    if (selectorDiv && selectorDiv.style.display != 'none' && e.keyCode == 40) { // Down arrow
        if (!activeSelectorRow) {
            selectSelectorRow(getFirstSelectorRow());
        } else {
            if (!getNextRowFromRow(activeSelectorRow)) {
                return;
            }
            selectSelectorRow(getNextRowFromRow(activeSelectorRow));
        }
    }

    if (e.keyCode == 13 || e.keyCode == 9) { // Enter key or tab key
        //Commented out this code, because it was causing the Enter key to
        //not work for textArea attributes, and quick search (among other places)
        //alert("Enter");
        if (activeSelectorRow) selectSelectorValue(activeSelectorRow);
        //if(e.keyCode==13)return false; else return true;
    }
    if (e.keyCode == 27) { // Escape key
        closeSelector();
    }
}

/** Selects a row in the selector
 */
function selectSelectorRow(rowToSelect) {
    //  alert(rowToSelect.tagName + ' ' + rowToSelect.rowIndex);
    if (activeSelectorRow) activeSelectorRow.className = '';
    rowToSelect.className = 'CHOOSER_SELECTED';
    activeSelectorRow = rowToSelect;

    // STILL NEED TO HANDLE SCROLLING
}

function mouseOverSelectorRow(row) {
    selectSelectorRow(row);
}

function clickSelectorRow(row) {
    selectSelectorValue(row);
}

function getNextRowFromRow(row) {
    var obj = row;
    while (obj.nextSibling) {
        obj = obj.nextSibling;
        if (obj.tagName == 'TR' && obj.id != "recordCount") {
            return obj;
        }
    }
}

function getPrevRowFromRow(row) {
    var obj = row;
    while (obj.previousSibling) {
        obj = obj.previousSibling;
        if (obj.tagName == 'TR') {
            return obj;
        }
    }
}

function getFirstSelectorRow() {
    var table = document.getElementById('selector_Table');
    return getRowFromTable(table, 0);

}

function closeSelector() {
    var selector = document.getElementById('selectorDiv');
    if (selector) {
        selector.style.display = 'none';
    }
    activeSelectorRow = false;
    if (is.ie) {
        showElem(document.getElementById("selectorDiv"), document.getElementById("divContent"));
    }

}

function getRowFromTable(table, index) {
    var count = 0;
    var tableBody;
    var childNodesLength = table.childNodes.length;
    for (var i = 0; i < childNodesLength; i++) {
        if ("TEXT" != table.childNodes[i].tagName) {
            tableBody = table.childNodes[i];
            continue;
        }
    }
    childNodesLength = tableBody.childNodes.length;
    for (var i = 0; i < childNodesLength; i++) {
        if (tableBody.childNodes[i].tagName == 'TR') {
            if (count == index) {
                return tableBody.childNodes[i];
            }
            count++;
        }
    }
}

function selectSelectorValue(selectedRow) {

    //alert('selectSelectorValue ' + selectedRow.id);
    var selectedId = selectedRow.id;
    var displayValue = selectedId;

    //var rowText = trim(selectedRow.innerHTML);
    //displayValue = rowText.substring(4, rowText.length);

    //alert(rowText.length);
    //alert(displayValue);
    //displayValue = displayValue.substring(0, displayValue.length - 5);
    //alert(displayValue);
    displayValue = selectedRow.childNodes[0].innerHTML;
    if (!hasContent(displayValue)) {
        displayValue = selectedRow.childNodes[1].innerHTML;
    }
    closeSelector();

    var aInput = currentSelectWidget;
    console.log("selectSelectorValue: aInput" + aInput);

    if (aInput) {
        console.log("aInput not null");
        var parent = aInput.parentNode;
        //alert(parent);
        parent.removeChild(aInput);
        console.log("removed input");
        quickSearchLink.innerHTML = displayValue;
        parent.appendChild(quickSearchLink);
        quickSearchLink.focus();
    } else {
        console.log("Input was null");
    }

    var text = '';
    if (eval('document.MAINFORM.' + quickSearchFormName)) {
        text = 'document.MAINFORM.' + quickSearchFormName + '.value = \'' + selectedId + '\'';
    } else if (eval('document.getElementById(\'' + quickSearchFormName + '\')')) {
        text = 'document.getElementById(\'' + quickSearchFormName + '\')' + '.value = \'' + selectedId + '\'';
    } else if (eval('document.AJAXFORM.' + quickSearchFormName)) {
        text = 'document.AJAXFORM.' + quickSearchFormName + '.value = \'' + selectedId + '\'';
    }
    console.log("text = " + text);
    eval(text);
    quickSearchFormName = '';
    quickSearchLink.focus();

}

function showSelector(element, module, refType, rootTypeId, searchDelay, required) {

    if (typeof searchDelay === "undefined") {
        searchDelay = 750;
    }
    if (typeof required === "undefined") {
        required = false;
    }

    var lastKeyStrokeTime = new Date().getTime();
    lastSelectorKeyStrokeTime = lastKeyStrokeTime;

    var method = 'showSelectorNow(\'' + element.id + '\', \'' + module + '\', \'' + refType + '\', \'' + rootTypeId + '\', ' + lastKeyStrokeTime + ', \'' + required + '\'' + ')';
    //alert(method);
    setTimeout(method, searchDelay);

}

function showSelectorNow(elementId, module, refType, rootTypeId, timeStamp, required) {

    if (typeof required === "undefined") {
        required = false;
    }

    if (lastSelectorKeyStrokeTime != timeStamp) {
        // ANOTHER KEY WAS HIT WITHING THE TIME THAT THIS TIMEOUT OCCURED...
        // WAIT FOR THE NEXT METHOD CALL...
        return;
    }
    var element = document.getElementById(elementId);

    if (!element || element.value == oldSelectorValue) {
        return;
    }
    var criteria = element.value;
    oldSelectorValue = criteria;

    if (!hasContent(criteria)) {
        closeSelector();
        return;
    }
    currentSelectWidget = element;
    selectorDiv = document.getElementById('selectorDiv');
    if (!selectorDiv) {
        selectorDiv = document.createElement("div");
        selectorDiv.id = 'selectorDiv';

        //Adding the selectorDiv as a child of the allSpace div instead of the body of the content frame
        //The allSpace div is the topmost container div in the content frame. This is being done
        //so that the selectorDiv will size itself appropriately based on the full scrollable content
        //space available. Instead if we add the selectorDiv to the body the width of the selectorDiv
        //gets cutoff based on the body tag which is usually the visible area in the window causing the
        //all the search choices to be wrapped in a narrow selector popup
        //note for this to work, the allSpace div style is set in main.css to position-relative and display-table
        var allSpaceDiv = document.getElementById('allSpace');
        if (allSpaceDiv) {
            allSpaceDiv.appendChild(selectorDiv);
        } else
            document.body.appendChild(selectorDiv);
        selectorDiv.className = 'SELECTOR';
        selectorDiv.style.display = 'none';
    }
    criteria = encodeURIComponent(criteria);
    runPostAjaxRequest(location.protocol + '//' + location.host + urlContext + masterControllerURL, 'activity=AJAX_SEARCH&criteria=' + criteria + '&module=' + module + '&refType=' + refType + '&rootTypeId=' + rootTypeId + '&timecode=' + new Date().getTime() + '&quickSearchFormName=' + quickSearchFormName + '&hideClearValueButton=' + required, 'completeShowSelector');
}

function completeShowSelector(xml, text) {
    //document.body.addEventListener('onkeyup', selector_keyNavigation, false);
    //document.onkeyup = selector_keyNavigation;


    var element = currentSelectWidget;
    selectorDiv = document.getElementById('selectorDiv');
    selectorDiv.innerHTML = '';

    selectorDiv.innerHTML = text;

    console.log("selector results = " + text);
    activeSelectorRow = false;

    var fromTop;
    var fromLeft;
    var posOffset = 0;
    if (element != null) {
        var ft = findVertPosOfObject(element);

        if (hasContent(ft)) {
            fromTop = ft - posOffset + element.offsetHeight;
        }

        var fl = findHorzPosOfObject(element);
        if (hasContent(fl)) {
            fromLeft = fl - posOffset;
        }
    }
    selectorDiv.style.display = 'block';
    selectorDiv.style.zIndex = 20000;
    selectorDiv.style.position = 'absolute';
    selectorDiv.style.left = getDivAbsolutePos(element).x;
    selectorDiv.style.top = getDivAbsolutePos(element).y + 20;
    if (is.ie) {
        hideElem(selectorDiv);
    }
}
//document.onkeyup = selector_keyNavigation;

function isExtJSMenuNeeded() {
    if (extJSMenuNeeded) {
        return true;
    }
    var selectorDiv = document.getElementById('selectorDiv');
    if (selectorDiv && selectorDiv.style.display == 'block') {
        return true;
    }
    var calendarDivs = document.getElementsByClassName('calendar');
    for (var i = 0; i < calendarDivs.length; i++) {
        if (calendarDivs[i] && calendarDivs[i].style.display == 'block') {
            return true;
        }
    }
    return false;
}

//////////////////////////////////////////////////////////////////
// END SELETOR CODE
//////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////
// START FILE BOX CODE
//////////////////////////////////////////////////////////////////
function showFileBox(formElementName) {

    //alert("showFileBox: " + formElementName);
    var toggle = document.getElementById(formElementName + 'Toggle');
    toggle.style.display = 'none';

    var input = document.getElementById(formElementName + 'Widget');
    input.style.display = 'block';
}


//////////////////////////////////////////////////////////////////
// START QUICK IMAGE CODE
//
//////////////////////////////////////////////////////////////////
var quickImageDiv;
var waitingOnSize;
var alreadyHidden;

function showQuickImage(url, element,gridId) {
    if (waitingOnSize && alreadyHidden) {
        alreadyHidden = false;
        return;
    }

    var fromTop = 0;
    var fromLeft = 0;
    var posOffset = 0;
    if (element) {
        var abs_rect = getDivAbsolutePosWithScrollFactor(element)
        var ft = abs_rect.y;

        if (hasContent(ft)) {
            fromTop = ft - posOffset;
        }

        var fl = abs_rect.x;

        // Handle image element too close to window border
        var elemPositionRelToWindowBorder = getInsideWindowWidth() - fl;
        var fromRight = elemPositionRelToWindowBorder;
        fromRight = fromRight + 10;

        // Handle image element normal positioning
        if (hasContent(fl)) {
            fromLeft = fl + 50;
        }
    }
    if (fromTop < 0) {
        fromTop = 0;
    }

    //alert('\nft='+ft+'\nfl='+fl+'\ninnerWindow='+getInsideWindowWidth());

    if (!quickImageDiv) {
        quickImageDiv = document.createElement("div");
        quickImageDiv.id = 'quickImageDiv';
        document.body.appendChild(quickImageDiv);
    }

    quickImageDiv.style.zIndex = 20000;

    if(gridId == 'pomLibraryGrid-normal' || element.GridId == 'pomLibraryGrid-normal' ||
            gridId == 'pomClipboardGrid-normal' || element.GridId == 'pomClipboardGrid-normal'){
        quickImageDiv.style.position = 'fixed';
    }
    else{
        quickImageDiv.style.position = 'absolute';
    }

    // draw on left of element when icon link is within 100 pixels of the right window border
    if (elemPositionRelToWindowBorder < 100) {
        quickImageDiv.style.right = fromRight;
    } else { // draw on right of element
        quickImageDiv.style.left = fromLeft;
    }

    quickImageDiv.style.top = fromTop;
    quickImageDiv.className = 'quickImage';

    // If image is larger than 150 pixels wide/high then scale it to a max of 150px on it's greatest dimension
    // allows other dimension to scale proportionally
    var imgObj = new Image();
    imgObj.src = url;
    alreadyHidden = false;
    if (imgObj.width == 0 && imgObj.height == 0) {
        if(gridId){
            element.GridId = gridId;
        }
        var Parms = new Array(url, element);
        waitingOnSize = true;
        setTimeout(function() {
            showQuickImage.apply(this, Parms);
        }, 400);
        return;
    }
    quickImageDiv.style.display = 'block';
    waitingOnSize = false;
    if (imgObj.width > imgObj.height) {
        if (imgObj.width > 150) {
            quickImageDiv.innerHTML = '<img width="' + 150 + '" src="' + imgObj.src + '">';
        } else {
            quickImageDiv.innerHTML = '<img src="' + imgObj.src + '">';
        }
    } else {
        if (imgObj.height > 150) {
            quickImageDiv.innerHTML = '<img height ="' + 150 + '" src="' + imgObj.src + '">';
        } else {
            quickImageDiv.innerHTML = '<img src="' + imgObj.src + '">';
        }
    }
    quickImageDiv.style.top = fromTop - quickImageDiv.clientHeight;

    if (is.ie) {
        hideElem(quickImageDiv);
    }

}

function getInsideWindowWidth() {
    if (window.innerWidth) {
        return window.innerWidth;
    } else if (document.compatMode && document.compatMode.indexOf("CSS1") >= 0) {
        return document.body.parentElement.clientWidth;
    } else if (document.body && document.body.clientWidth) {
        return document.body.clientWidth;
    }
    return 0;
}

/*
* Created to simplify the automated tested process. Doesn't need legacy 'else if' statements of its related width function.
* */
function getInsideWindowHeight() {
    if(window.innerHeight){
        return window.innerHeight;
    }
    return 0;
}

function hideQuickImage() {

    if (waitingOnSize) {
        alreadyHidden = true;
    }
    if (quickImageDiv) {
        quickImageDiv.style.display = 'none';
        if (is.ie) {
            if (document.getElementById("divContent")) {
                showElem(quickImageDiv, document.getElementById("divContent"));
            } else {
                showElem(quickImageDiv);
            }
        }
    }

}


function addHiddenElement(element, value, parent) {
    var elementObject = document.getElementById(element);
    //Element may only have a name, and not an id.
    if (elementObject == null) {
        var elements = document.getElementsByName(element);
        elementObject = elements[0];
    }
    //Didn't find an element, so create a new one
    if (elementObject == null) {
        currentElement = document.createElement("input");
        currentElement.setAttribute("type", "hidden");
        currentElement.setAttribute("name", element);
        currentElement.setAttribute("id", element);
        currentElement.setAttribute("value", value);

        if (parent == null) {
            parent = document.MAINFORM.activity.parentNode;
        }
        parent.appendChild(currentElement);
    } else {
        elementObject.value = value;
    }

}
//////////////////////////////////////////////////////////////////////////////////////
function createPopUp(text, id, positionObject) {
    var closeParenth = closeWithParenths;
    //debug("createPopUp: id = " + id);
    if (!hasContent(id)) {
        id = '100';
    }
    //debug('id = ' + id);
    var button = "<a href=\"javascript:closeDiv(\'" + id + "\')\">" + closeParenth + " </a><br><br>";

    text = button + text;
    var fromTop = 200;
    var posOffset = 30;

    if (positionObject != null) {
        var ft = findVertPos(positionObject);

        if (hasContent(ft)) {
            fromTop = ft - posOffset;
        }
    }


    var newDiv = document.createElement("div");
    newDiv.id = id;
    document.body.appendChild(newDiv);
    newDiv.style.display = 'block';
    newDiv.style.zIndex = 2;
    newDiv.style.position = 'absolute';
    newDiv.style.left = 100;
    newDiv.style.top = parseInt(fromTop);
    newDiv.style.width = 600;
    newDiv.className = 'BORDERED_BLOCK';
    newDiv.innerHTML = text;

    latestPopupId = id;
    //newDiv.onclick = 'closeDiv("100)';
}
//////////////////////////////////////////////////////////////////////////////////////
function closeDiv(id) {
    var div = document.getElementById(id);
    if (div) {
        div.parentNode.removeChild(div);
    }
}
///////////////////////////////////////////////////////////////////////////////
function findVertPos(obj) {
    return findVertPosOfObject(obj);
}
///////////////////////////////////////////////////////////////////////////////
function showDiv(div) {
    if (div && div.tagName && div.tagName == 'div') {
        div.style.display = 'block';
        return;
    }
    div = document.getElementById(div);
    div.style.display = 'block';
    adjustTableMaxHeight();
}
///////////////////////////////////////////////////////////////////////////////
/*function findHorzPosOfObject(obj) {
    var curLeft = 0;
    if (obj.offsetParent) {
        curLeft = obj.offsetLeft
        while (obj = obj.offsetParent) {
            curLeft += obj.offsetLeft
        }
    }

    return curLeft;
}*/
function findHorzPos(obj) {
    return findHorxPosOfObject(obj);
}



function ajaxFormElementsArray(ajaxForm, chooserCheckBox, checkBoxRequired) {
    var elementArray = {};
    var allInputs = ajaxForm.elements;
    if (chooserCheckBox == null) {
        chooserCheckBox = ajaxForm.selectedIds;
    }

    if (chooserCheckBox != null) {
        if (hasContent(chooserCheckBox.length)) {
            chooserCheckBoxName = chooserCheckBox[0].name;
        } else {
            chooserCheckBoxName = chooserCheckBox.name;
        }

        elementArray[chooserCheckBoxName] = getCheckBoxIds(chooserCheckBox, checkBoxRequired);
    }

    for (var k = 0; k < allInputs.length; k++) {
        if ((chooserCheckBox != null && allInputs[k].name != chooserCheckBoxName) || chooserCheckBox == null) {
            elementArray[allInputs[k].name] = format(allInputs[k].value);
        }

    }
    return elementArray;
}


var NAME_VALUE_DELIMITER = '|&^&|';
var ATTRIBUTE_DELIMITER = '|-()-|'


/******Used to create the multi-form inputs with delimiters*******/
function ajaxFormElementsString(ajaxForm, chooserCheckBox, checkBoxRequired) {
    var dataString = new quickDoc();
    var chooserCheckBoxName = "";
    var allInputs = ajaxForm.elements;
    if (chooserCheckBox == null) {
        chooserCheckBox = ajaxForm.selectedIds;
    }

    if (chooserCheckBox != null) {
        if (hasContent(chooserCheckBox.length)) {
            chooserCheckBoxName = chooserCheckBox[0].name;
        } else {
            chooserCheckBoxName = chooserCheckBox.name;
        }

        dataString.write(chooserCheckBoxName + NAME_VALUE_DELIMITER + getCheckBoxIds(chooserCheckBox, checkBoxRequired) + ATTRIBUTE_DELIMITER);

    }

    for (var k = 0; k < allInputs.length; k++) {

        if ((chooserCheckBox != null && allInputs[k].name != chooserCheckBoxName) || chooserCheckBox == null) {
            dataString.write(allInputs[k].name + NAME_VALUE_DELIMITER + allInputs[k].value + ATTRIBUTE_DELIMITER);

        }

    }
    return encodeURIComponent(dataString.toString());
}

function ajaxFormString(ajaxForm, chooserCheckBox, checkBoxRequired, skipEmpty) {
    var dataString = new quickDoc();
    var chooserCheckBoxName = "";
    var allInputs = ajaxForm.elements;
    if (chooserCheckBox == null) {
        chooserCheckBox = ajaxForm.selectedIds;
    }

    if (chooserCheckBox != null) {
        if (hasContent(chooserCheckBox.length)) {
            chooserCheckBoxName = chooserCheckBox[0].name;
        } else {
            chooserCheckBoxName = chooserCheckBox.name;
        }

        dataString.write(chooserCheckBoxName + "=" + getCheckBoxIds(chooserCheckBox, checkBoxRequired) + "&");

    }

    for (var k = 0; k < allInputs.length; k++) {

        if ((chooserCheckBox != null && allInputs[k].name != chooserCheckBoxName) || chooserCheckBox == null) {
            if (allInputs[k].name != null && hasContent(allInputs[k].name) && (!skipEmpty || hasContent(allInputs[k].value))) {
                if (dataString.toString().length > 0) {
                    dataString.write("&");
                }
                if (allInputs[k].name == 'indexSearchType') {
                    dataString.write(allInputs[k].name + "=" + encodeURIComponent(trim(getRadioValue(document.AJAXFORM.indexSearchType))));
                } else {
                    dataString.write(allInputs[k].name + "=" + encodeURIComponent(trim(allInputs[k].value)));
                }
            }
        }

    }
    return dataString.toString();
}

function ajaxFormElementsArrayToString(elementsArray) {
    var dataString = new quickDoc();
    var key;
    for (key in elementsArray) {
        if (key != null && hasContent(key)) {
            if (dataString.toString().length > 0) {
                dataString.write("&");
            }
            dataString.write(key + "=" + trim(elementsArray[key]));

        }
    }
    return dataString.toString();
}
////////////////////////////////////////////
/** Optimized object for string concatenation.
 */
function quickDoc() {
    this.content = [];
    this.write = function(str) {
        this.content[this.content.length] = str;
    }
    this.writeln = function(str) {
        this.content[this.content.length] = str + "\n";
    }
    this.toString = function() {
        return this.content.join("");
    }
    this.clear = function() {
        delete this.content;
        this.content = null;
        this.content = new Array;
    }
}
////////////////////////////////////////////
// Cross-browser implementation of element.addEventListener()
function addListener(element, type, expression, bubbling) {
    //console.log('addListener: ' + element + ' type = ' + type + ' expression = ' + expression);
    bubbling = bubbling || false;
    if (element != null && window.addEventListener) { // Standard
        element.addEventListener(type, expression, bubbling);
        return true;

    } else if (element != null && window.attachEvent) { // IE
        element.attachEvent('on' + type, expression);
        return true;

    } else {
        return false;
    }
}

////////////////////////////////////////////
//Cross-browser implementation of element.removeEventListener()
function removeListener(element, type, expression, bubbling) {
    bubbling = bubbling || false;
    if (element != null && window.removeEventListener) { // Standard
        element.removeEventListener(type, expression, bubbling);
        return true;

    } else if (element != null && window.detachEvent) { // IE
        element.detachEvent('on' + type, expression);
        return true;

    } else {
        return false;
    }
}




//////Used to hide and unhide all dropdown list in IE prior to version IE 7.0 when the dragged window is moved/////////////

function getDivAbsolutePos(el) {
    var SL = 0,
        ST = 0;
    var is_div = /^div$/i.test(el.tagName);
    if (is_div && el.scrollLeft)
        SL = el.scrollLeft;
    if (is_div && el.scrollTop)
        ST = el.scrollTop;
    var r = {
        x: el.offsetLeft - SL,
        y: el.offsetTop - ST
    };
    if(el.parentElement && el.parentElement.scrollLeft) {
        var tmp = getDivAbsolutePosWithScrollFactor(el)
        r.x += tmp.x;
        r.y += tmp.y;
    }
    if (el.offsetParent) {
        var tmp = getDivAbsolutePos(el.offsetParent);
        r.x += tmp.x;
        r.y += tmp.y;
    }
    return r;
}

function getDivAbsolutePosWithScrollFactor(el) {
    var r = {
        x: 0,
        y: 0
    };
    if (el.offsetParent) {
        if (el.offsetParent.className.indexOf("x-grid-cell-inner") === 0) { // We are in an ExtJS Grid cell. Just get absolute location
            var rect = el.getBoundingClientRect();
            r.x = rect.right;
            r.y = rect.top;
            return r;
        }

        var tmp = getDivAbsolutePos(el.offsetParent);
        r.x += tmp.x;
        r.y += tmp.y;
    }
    scroll_factor = getDivScrollFactor(el);
    r.x -= scroll_factor.x;
    r.y -= scroll_factor.y;
    return r;
}

function getDivScrollFactor(el) {
    var SL = 0,
        ST = 0;
    var is_div = /^div$/i.test(el.tagName);
    if (is_div && el.scrollLeft) {
        if (el.className.indexOf("x-grid-view") !== 0) {
            SL = el.scrollLeft;
        }
    }
    if (is_div && el.scrollTop) {
        if (el.className.indexOf("x-grid-view") !== 0) {
            ST = el.scrollTop;
        }
    }
    var r = {
        x: SL,
        y: ST
    };
    if (el.parentElement) {
        var tmp = getDivScrollFactor(el.parentElement);
        r.x += tmp.x;
        r.y += tmp.y;
    }
    return r;
}

function showElem(el, includeEl) {

    function getFlexVisib(obj) {
        var value = obj.style.visibility;
        if (!value) {
            if (document.defaultView && typeof(document.defaultView.getComputedStyle) == "function") { // Gecko, W3C
                if (!(/Konqueror|Safari|KHTML/i.test(navigator.userAgent)))
                    value = document.defaultView.
                getComputedStyle(obj, "").getPropertyValue("visibility");
                else
                    value = '';
            } else if (obj.currentStyle) { // IE
                value = obj.currentStyle.visibility;
            } else
                value = '';
        }
        return value;
    }

    var tags = new Array("applet", "iframe", "select");


    var inThisDiv = false;

    for (var k = tags.length; k > 0;) {
        var ar = document.getElementsByTagName(tags[--k]);
        var cc = null;

        var bb;
        for (var i = ar.length; i > 0;) {
            inThisDiv = false;
            cc = ar[--i];
            bb = cc;
            if (includeEl) {
                while (bb.parentNode != null) {
                    if (bb.parentNode.id != null && includeEl && bb.parentNode.id == includeEl.id) {
                        inThisDiv = true;
                        break;
                    } else {
                        bb = bb.parentNode;
                    }
                }
            }
            if (inThisDiv || !includeEl) {
                if (!cc.__flex_save_visibility) {
                    cc.__flex_save_visibility = getFlexVisib(cc);
                }
                cc.style.visibility = cc.__flex_save_visibility;
            }



        }
    }
}

function hideElem(el, excludeEl, allowShow) {
    function getFlexVisib(obj) {
        var value = obj.style.visibility;
        if (!value) {
            if (document.defaultView && typeof(document.defaultView.getComputedStyle) == "function") { // Gecko, W3C
                if (!(/Konqueror|Safari|KHTML/i.test(navigator.userAgent)))
                    value = document.defaultView.
                getComputedStyle(obj, "").getPropertyValue("visibility");
                else
                    value = '';
            } else if (obj.currentStyle) { // IE
                value = obj.currentStyle.visibility;
            } else
                value = '';
        }
        return value;
    }

    var tags = new Array("applet", "iframe", "select");

    var p = getDivAbsolutePos(el);
    var EX1 = p.x;
    var EX2 = el.offsetWidth + EX1;
    var EY1 = p.y;
    var EY2 = el.offsetHeight + EY1;

    var bb;
    var inThisDiv = false;
    for (var k = tags.length; k > 0;) {
        var ar = document.getElementsByTagName(tags[--k]);
        var cc = null;

        for (var i = ar.length; i > 0;) {
            inThisDiv = false;
            cc = ar[--i];
            bb = cc;
            if (excludeEl) {
                while (bb.parentNode != null) {
                    if (bb.parentNode.id != null && excludeEl && bb.parentNode.id == excludeEl.id) {
                        inThisDiv = true;
                        break;
                    } else {
                        bb = bb.parentNode;
                    }
                }

                if (inThisDiv) {
                    continue;
                }
            }
            p = getDivAbsolutePos(cc);
            var CX1 = p.x;
            var CX2 = cc.offsetWidth + CX1;
            var CY1 = p.y;
            var CY2 = cc.offsetHeight + CY1;

            //alert(cc.name + ": " + CX1 + " vs " + EX2 + " " + CX2 + " vs " + EX1);


            if (allowShow && (el.hidden || (CX1 > EX2) || (CX2 < EX1) || (CY1 > EY2) || (CY2 < EY1))) {
                if (!cc.__flex_save_visibility) {
                    cc.__flex_save_visibility = getFlexVisib(cc);
                }
                cc.style.visibility = cc.__flex_save_visibility;
            } else if ((CX1 < EX2) && (CX2 > EX1) && (CY1 < EY2) && (CY2 > EY1)) {
                if (!cc.__flex_save_visibility) {
                    cc.__flex_save_visibility = getFlexVisib(cc);
                }
                cc.style.visibility = "hidden";
            }
        }
    }
}
//////Used to hide and unhide all dropdown list in IE prior to version IE 7.0 when the dragged window is moved/////////////
function showHidableTableColumns(id, linkId) {
    var buttonElement = document.querySelector("a#"+linkId);
    var configDiv = document.getElementById("columnHide" + id);
    //var divFrame = document.getElementById("divFrame" + id);

    var fromTop;
    var fromLeft;
    var posOffset = 10;
    var link = document.getElementById(linkId);
    var tbody = document.getElementById("hideColButton" +id);
    if(!tbody){
     tbody = document.getElementsByTagName("form")[0];
       configDiv.style.left = getDivAbsolutePos(link).x;
       configDiv.style.top = getDivAbsolutePos(link).y + posOffset;
    }
    //for SPR 2082954 ,after append the div into body , it remove the hidden column attrs beyond mainform ,
    //and put into body element , so those columns attrs could not pass to the next page, the config of
    //columns is totally wrong
    tbody.appendChild(configDiv);
    if (null != configDiv && configDiv.style.display == 'none') {
        configDiv.style.display = 'block';
        configDiv.style.width = 200;
        configDiv.style.zIndex = 1000;
        configDiv.style.position = 'absolute';
        buttonElement.classList.add("hightlight");
    } else if (null != configDiv && configDiv.style.display == 'block') {
        hideDiv("columnHide" + id);
        buttonElement.classList.remove("hightlight");
    }

}

function toggleButtonStyle(id){
    var buttonElement = document.querySelector("a#"+id);
    if(buttonElement){
        buttonElement.classList.remove("hightlight");
    }
}


function setCheckBoxGroupState(name, checked) {

    var checkbox = document.getElementsByName(name);
    for (i = 0; i < checkbox.length; i++) {

        if (checked) {
            checkbox[i].checked = true;
        } else {
            checkbox[i].checked = false;
        }
    }
}

////////////////////////////////////////////////////
function resizeImage(imgObj, maxWidth, maxHeight) {

    // JC - added setTimeout to give Internet Explorer a chance for page render before resize, otherwise resize does not occur.
    // must be a bug in IE onLoad processing.....
    var Parms = new Array(imgObj, maxWidth, maxHeight);
    setTimeout(function() {
        resizeImageNow.apply(this, Parms);
    }, 10); // 400 ms delay to allow imgObj to be rendered in IE.

}

////////////////////////////////////////////////////
function resizeImageNow(imgObj, maxWidth, maxHeight) {

    // imgObj should already be set to style.display=block or IE will not be able to redraw the image because retrieval of width/height returns null
    if (imgObj.height == 0) {
        var Parms = new Array(imgObj, maxWidth, maxHeight);
        setTimeout(function() {
            resizeImageNow.apply(this, Parms);
        }, 400);
        return;
    }
    if (imgObj.width > imgObj.height) {
        if (maxWidth > 0 && imgObj.width > maxWidth) {
            imgObj.width = maxWidth;
        }
    } else {
        if (maxHeight > 0 && imgObj.height > maxHeight) {
            imgObj.height = maxHeight;
        }
    }

    // ensure image is visible
    imgObj.style.display = 'block';
    imgObj.style.visibility = 'visible';
    imgObj.style.maxWidth = maxWidth + 'px';
}



////////////////////////////////////////////////////
var moaHelper = {};
moaHelper.ATTRIBUTE_DELIMITER = '|-()-|';
moaHelper.NAME_VALUE_DELIMITER = '|&^&|';

moaHelper.addPair = new function(s, name, value) {
    s += ATTRIBUTE_DELIMITER + name + NAME_VALUE_DELIMITER + value;
    return s;
}

////////////////////////////////////////////////////
function escapeString(s) {
    // Escape single quotes found in string
    var sArray = s.split("'");
    var lastj = sArray.length;
    s = '';
    for (var j = 0; j < lastj; j++) {
        s += sArray[j] + '\\' + "'";
    }
    var last = s.length - 2;
    s = s.substring(0, last);

    // change double quotes to &quot; html syntax
    var sArray = s.split("\"");
    var lastj = sArray.length;
    s = '';
    for (var j = 0; j < lastj; j++) {
        s += sArray[j] + '&quot;';
    }
    var last = s.length - 6;
    return s.substring(0, last);
}

/**
 * Usage: parseNumOfBytesInJava(myString, "UTF8", "\r\n")
 * Simulates Java calculation of <code>myString.getBytes("UTF8").length</code>
 *
 * @param1: the string to parse
 * @param2: character encoding used when converting the string to bytes in Java(example: UTF8)
 * @param3: value of "line.separator" in Java (example: "\r\n" in Window platform, and "\n" in Unix platform)
 */
function parseNumOfBytesInJava(input, encoding, lineSeparator) {
    var count = -1;
    var toParse = String(input);
    
    if ("UTF8" == encoding) {
        var k = 0;
        for (var i = 0; i < toParse.length; i++) {
            var c = toParse.charAt(i);
            if (c >= '\u0000' && c <= '\u007F') {
                k++;
            } else if (c > '\u07FF') {
                k += 3;
            } else {
                k += 2;
            }
        }
        count = k;
    } else {
        // other types of character encoding extended here @TODO: other encoding format like GBK
        count = toParse.length;
    }
    return count;
}

function convertSpaceToZero(elm) {
    var value = elm.value;
    if (elm.value == ' ') {
        elm.value = 0;
    }
}

function highlightButton(button) {
    if (button && button.tagName && button.tagName == "A") {
        if ((button.getAttribute('className') == 'button') ||
            (button.getAttribute('class') == 'button')
        ) {
            button.setAttribute("class", "button_HLT");
            button.setAttribute("className", "button_HLT");
        }
    } else {
        button = document.getElementById(button);
        button.setAttribute("class", "button_HLT");
        button.setAttribute("className", "button_HLT");
    }
}

function unHighlightButton(button) {
    if (button && button.tagName && button.tagName == "A") {
        if ((button.getAttribute('className') == 'button_HLT') ||
            (button.getAttribute('class') == 'button_HLT')
        ) {
            button.setAttribute("class", "button");
            button.setAttribute("className", "button");
        }
    } else {
        button = document.getElementById(button);
        button.setAttribute("class", "button");
        button.setAttribute("className", "button");
    }
}

function getCenter() {

    var db = (document.compatMode && document.compatMode.toLowerCase() != "backcompat") ? document.documentElement : (document.body || null);
    var ypos = Math.ceil(db.clientHeight / 2) + document.body.scrollTop;
    var xpos = Math.ceil(db.clientWidth / 2) + document.body.scrollLeft;

    var center = {};
    center["x"] = xpos;
    center["y"] = ypos;


    return center;
}

function getCenteredPosition(width, height) {
    var posx = 0;
    var posy = 0;

    var center = getCenter();
    var cx = center["x"];
    var cy = center["y"];

    var db = (document.compatMode && document.compatMode.toLowerCase() != "backcompat") ? document.documentElement : (document.body || null);

    if (width < db.clientWidth) {
        posx = cx - Math.ceil(width / 2);
    } else {
        posx = document.body.scrollLeft;
    }

    if (height < db.clientHeight) {
        posy = cy - Math.ceil(height / 2);
    } else {
        posy = document.body.scrollTop;
    }

    var pos = {};
    pos["x"] = posx;
    pos["y"] = posy;

    return pos;
}

function grayOut(vis, options) {
    // Pass true to gray out screen, false to ungray
    // options are optional.  This is a JSON object with the following (optional) properties
    // opacity:0-100         // Lower number = less grayout higher = more of a blackout
    // zindex: #             // HTML elements with a higher zindex appear on top of the gray out
    // bgcolor: (#xxxxxx)    // Standard RGB Hex color code
    // grayOut(true, {'zindex':'50', 'bgcolor':'#0000FF', 'opacity':'70'});
    // Because options is JSON opacity/zindex/bgcolor are all optional and can appear
    // in any order.  Pass only the properties you need to set.

    var options = options || {};
    var zindex = options.zindex || 50;
    var opacity = options.opacity || 70;
    var opaque = (opacity / 100);
    var bgcolor = options.bgcolor || '#000000';
    var dark = document.getElementById('darkenScreenObject');
    if (!dark) {
        // The dark layer doesn't exist, it's never been created.  So we'll
        // create it here and apply some basic styles.
        // If you are getting errors in IE see: http://support.microsoft.com/default.aspx/kb/927917
        var tbody = document.getElementsByTagName("body")[0];
        var tnode = document.createElement('div'); // Create the layer.
        tnode.style.position = 'absolute'; // Position absolutely
        tnode.style.top = '0px'; // In the top
        tnode.style.left = '0px'; // Left corner of the page
        tnode.style.overflow = 'hidden'; // Try to avoid making scroll bars
        tnode.style.display = 'none'; // Start out Hidden
        tnode.id = 'darkenScreenObject'; // Name it so we can find it later
        tbody.appendChild(tnode); // Add it to the web page
        dark = document.getElementById('darkenScreenObject'); // Get the object.
    }
    if (vis) {
        // Calculate the page width and height
        if (document.body && (document.body.scrollWidth || document.body.scrollHeight)) {
            var pageWidth = document.body.scrollWidth + 'px';
          if (is.ie && bodyHeight) {
                if (document.body.scrollHeight > bodyHeight) {
                    var pageHeight = document.body.scrollHeight + 'px';
                } else {
                    var pageHeight = bodyHeight + 'px';
                }
            } else {
                var pageHeight = document.body.scrollHeight + 'px';
            }
        } else if (document.body.offsetWidth) {
            var pageWidth = document.body.offsetWidth + 'px';
            var pageHeight = document.body.offsetHeight + 'px';
        } else {
            var pageWidth = '100%';
            var pageHeight = '100%';
        }
        //set the shader to cover the entire page and make it visible.
        dark.style.opacity = opaque;
        dark.style.MozOpacity = opaque;
        dark.style.filter = 'alpha(opacity=' + opacity + ')';
        dark.style.zIndex = zindex;
        dark.style.backgroundColor = bgcolor;
        dark.style.width = pageWidth;
        dark.style.height = pageHeight;
        dark.style.display = 'block';
    } else {
        dark.style.display = 'none';
    }
}

function parseNumericFromOid(strId) {
    if (strId.indexOf(":") > -1) {
        return strId.substring(strId.lastIndexOf(':') + 1);
    }

    return strId;
}

function escapeHTML(val) {
    return val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function escapeJSForDoubleQuote(val) {
    return val.replace(/&/g, '\\x26').replace(/</g, '\\x3C').replace(/>/g, '\\x3E').replace(/"/g, '&quot;').replace(/'/g, "\\'");
}

function escapeJSForSingleQuote(val) {
    return val.replace(/&/g, '\\x26').replace(/</g, '\\x3C').replace(/>/g, '\\x3E').replace(/"/g, '\\"').replace(/'/g, "&#39;");
}

function escapeJS(val) {
    return val.replace(/&/g, '\\x26').replace(/</g, '\\x3C').replace(/>/g, '\\x3E').replace(/"/g, '\\"').replace(/'/g, "\\'");
}

function unEscapeHTML(val) {
    return val.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
}

var HTMLEncoder = {

    NBSP: "&nbsp;",
    AMPERSAND_HTML_ENCODED: "&#38;",
    LESS_THAN_HTML_ENCODED: "&lt;",
    GREATER_THAN_HTML_ENCODED: "&gt;",
    DOUBLE_QUOTE_HTML_ENCODED: "&quot;",
    SINGLE_QUOTE_HTML_ENCODED: "&#39;",

    /**
     * Replaces multiple adjacent spaces with &nsbp;'s.
     * @param {String} str
     */
    handleAdjacentSpaces: function(str) {
        /**
         * @private
         * @param {String} spaces
         * @return {String} amount of consecutive &nbsp;'s matches the length of the passed in string
         */
        function getReplacementString(spaces) {
            var returnVal = '';
            var i = spaces.length;
            while (i--) {
                returnVal += PTC.util.HTMLEncoder.NBSP;
            }
            return returnVal;
        }

        if (typeof str === 'string') {
            //only capture 2 or more spaces
            str = str.replace(/( ){2,}/g, getReplacementString);
        }
        return str;
    },

    /**
     * Encodes the given string for use in HTML content. HTML content is generally defined as text displayed
     * in the page body and not within the &lt;..&gt; delimiters of a tag or directive.
     * <p>
     * This should be called before rendering untrusted data in HTML content.
     * <p>
     * Examples of HTML content:
     * <ul>
     * <li>&lt;body&gt; This is HTML content &lt;&#47;body&gt;
     * <li>&lt;div&gt; This is HTML content &lt;&#47;div&gt;
     * <li>&lt;p&gt; This is HTML content &lt;&#47;p&gt;
     * <li>&lt;td&gt; This is HTML content &lt;&#47;td&gt;
     * <li>&lt;textarea&gt; This is HTML content &lt;&#47;textarea&gt;
     * </ul>
     *
     * Only HTML-encodes the following characters: &, &lt;, &gt;, ', ". These characters should be sufficient as long
     * as HTML attributes are properly quoted.
     *
     * @param {String} Input str
     * @return {String} Encoded characters within the input string.
     */
    encodeForHTMLContent: function(str) {
        if (typeof str === 'string') {
            str = str.replace(/[&]/g, this.AMPERSAND_HTML_ENCODED);
            str = str.replace(/[<]/g, this.LESS_THAN_HTML_ENCODED);
            str = str.replace(/[>]/g, this.GREATER_THAN_HTML_ENCODED);
            str = str.replace(/[\"]/g, this.DOUBLE_QUOTE_HTML_ENCODED);
            str = str.replace(/[\']/g, this.SINGLE_QUOTE_HTML_ENCODED);
        }
        return str;
    },

    /**
     * Placeholder function. Currently just calls encodeForHTMLContent()
     * @param {String} str
     * @return {Object} Encoded string for use in a non-URI HTML tag attribute value or as the value of a text area or
     * select field.
     */
    encodeForHTMLAttribute: function(str) {
        return this.encodeForHTMLContent(str);
    },

    /**
     * calls encodeForHTMLContent() and also replaces all occurrences of multiple spaces with &nsbp;'s.
     * @param {String} str
     * @return {Object} Encoded string for display in HTML content.
     */
    encodeAndFormatForHTMLContent: function(str) {
        return this.handleAdjacentSpaces(this.encodeForHTMLContent(str));
    },

    /**
     * Placeholder function. Currently just calls encodeForHTMLContent()
     * @param {String} str
     * @return {Object} Encoded string for use in HTML content with URL string patterns converted to hyperlinks.
     */
    encodeForHTMLContentAndCreateHyperLinks: function(str) {
        return this.encodeForHTMLContent(str);
    },

    /**
     * Placeholder function. Currently just calls encodeForHTMLContent()
     * @param {String} str
     * @return {Object} Encoded string for use in a HTTPServletResponse header.
     */
    encodeForHTTPServletResponse: function(str) {
        return this.encodeForHTMLContent(str);
    }
};

/* Decodes the given string in cases when encoded data is directly added into the UI without any HTML decoding */
function htmlDecode(value) {

    if(typeof value != "string") return value;
    value=value.replace(/</g,"&lt;");
    value=value.replace(/>/g,"&gt;");
    var ta=document.createElement("textarea");
    ta.innerHTML=value;

    return ta.value;
}

///////////////////////////////////// For Restyling Pages //////////////////////////////////////////

function clickSelectorRowV2(row) {
    selectSelectorValueV2(row);
}

function showTypeAheadChooserV2(link, formName, module, refType, rootTypeId, searchDelay, required) {

    if (typeof searchDelay === "undefined") {
        searchDelay = 750;
    }
    if (typeof required === "undefined") {
        required = false;
    }

    //alert(' link = ' + link + ' module = ' + module + ' refType = ' + refType + ' rootId = ' + rootId);
    //alert("link = " + link.innerHTML);
    if (selectorDiv == null || (selectorDiv != null && selectorDiv.style.display == 'none')) {
        quickSearchLink = link;
        if(hasContent(quickSearchLink.value)){
        quickSearchLinkValue = quickSearchLink.value;
       //quickSearchLink.value = "";
        quickSearchLink.setSelectionRange(0,quickSearchLink.value.length);
        }
        quickSearchFormName = formName;
    }
    if (currentFocus>0){
        currentFocus = 0;
    }
}

function selectSelectorValueV2(selectedRow) {

    var selectedId = selectedRow.id;
    var displayValue = selectedId;

    displayValue = selectedRow.textContent;

    closeSelector();

    var aInput = currentSelectWidget;
    console.log("selectSelectorValue: aInput" + aInput);
    if (selectedId == '0'){
        quickSearchLinkValue = '';
        displayValue = '';
    } else {
        quickSearchLinkValue = displayValue.trim();
    }

    if (aInput) {
        console.log("aInput not null");
        var parent = aInput.parentNode;
        console.log("removed input");
        aInput.value = displayValue.trim();
    } else {
        console.log("Input was null");
    }

    var text = '';
    if (eval('document.MAINFORM.' + quickSearchFormName)) {
        text = 'document.MAINFORM.' + quickSearchFormName + '.value = \'' + selectedId + '\'';
    } else if (eval('document.getElementById(\'' + quickSearchFormName + '\')')) {
        text = 'document.getElementById(\'' + quickSearchFormName + '\')' + '.value = \'' + selectedId + '\'';
    } else if (eval('document.AJAXFORM.' + quickSearchFormName)) {
        text = 'document.AJAXFORM.' + quickSearchFormName + '.value = \'' + selectedId + '\'';
    }
    console.log("text = " + text);
    eval(text);
    quickSearchFormName = '';
    quickSearchLink.focus();

}

function showSelectorV2(element, module, refType, rootTypeId, searchDelay, required) {

	if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode === 9 || event.keyCode === 13) {
		console.log("ignoring up/down/tab/enter key as it shouldn't trigger an ajax search'");
		return;
	}
    if (typeof searchDelay === "undefined") {
        searchDelay = 750;
    }
    if (typeof required === "undefined") {
        required = false;
    }

    var lastKeyStrokeTime = new Date().getTime();
    lastSelectorKeyStrokeTime = lastKeyStrokeTime;

    var method = 'showSelectorNowV2(\'' + element.id + '\', \'' + module + '\', \'' + refType + '\', \'' + rootTypeId + '\', ' + lastKeyStrokeTime + ', \'' + required + '\'' + ')';
    setTimeout(method, searchDelay);

}

function showSelectorNowV2(elementId, module, refType, rootTypeId, timeStamp, required) {

    if (typeof required === "undefined") {
        required = false;
    }

    if (lastSelectorKeyStrokeTime != timeStamp) {
        // ANOTHER KEY WAS HIT WITHING THE TIME THAT THIS TIMEOUT OCCURED...
        // WAIT FOR THE NEXT METHOD CALL...
        return;
    }
    var element = document.getElementById(elementId);

    if (!element || element.value.trim() == '') {
        return;
    }
    var criteria = element.value;

    currentSelectWidget = element;
    selectorDiv = document.getElementById('selectorDiv');
    if (!selectorDiv) {
        selectorDiv = document.createElement("div");
        selectorDiv.id = 'selectorDiv';

        document.body.appendChild(selectorDiv);
        //Adding the selectorDiv as a child of the selected quicksearch input field
        //element.parentElement.appendChild(selectorDiv);
        selectorDiv.className = 'objectRefWidget__autocomplete__selector';
        selectorDiv.style.display = 'none';
        if(!element.isKeydownEvent){
            element.addEventListener("keydown", function(e) {
                selector_keyNavigationV2(e);
            });
            element['isKeydownEvent'] = 'true';
        }
    }
    criteria = encodeURIComponent(criteria);
    runPostAjaxRequest(location.protocol + '//' + location.host + urlContext + masterControllerURL, 'activity=AJAX_SEARCH_V2&criteria=' + criteria + '&module=' + module + '&refType=' + refType + '&rootTypeId=' + rootTypeId + '&timecode=' + new Date().getTime() + '&quickSearchFormName=' + quickSearchFormName + '&hideClearValueButton=' + required + '&format=JSON', 'completeShowSelectorV2');
}

function completeShowSelectorV2(xml, text) {

    var element = currentSelectWidget;
    selectorDiv = document.getElementById('selectorDiv');
    selectorDiv.innerHTML = '';

	if(text.indexOf('NOT_SUPPORTED_ID_INDEX') > 0) {
		generateNotSupportedMsg(text, selectorDiv, element);
	} else {
        generateAutoCompleteList(text, selectorDiv, element);
    }

    console.log("selector results = " + text);
    activeSelectorRow = false;
    
    jQuery(selectorDiv).show();
    jQuery(selectorDiv).position( { my: "left top", at : "left bottom", of : currentSelectWidget });
	selectorDiv.style.minWidth = element.clientWidth - 2;
	selectorDiv.style.zIndex = 20000;
	
    var scrollDiv = document.getElementById('contentDiv')? document.getElementById('contentDiv') : window.parent.contentframe.document.getElementById('contentDiv');
    scrollDiv.addEventListener("scroll", function(e) {
        if(document.getElementById('selectorDiv')){
            showOriginalValue();
            }
    });

    if (is.ie) {
        hideElem(selectorDiv);
    }
    if (currentFocus>0){
        currentFocus = 0;
    }
}

function showOriginalValue(){
    if(document.getElementById('selectorDiv')){
    if (quickSearchLink){
    	quickSearchLink.value = quickSearchLinkValue?quickSearchLinkValue : "";
    }
    quickSearchLinkValue = '';
    if (document.getElementById('selectorDiv')){
        document.getElementById('selectorDiv').remove();
    }
    if (currentFocus>0){
        currentFocus = 0;
    }
    selectorDiv = null;
    }
    if (hasContent(quickSearchLinkValue)){
        quickSearchLink.value = quickSearchLinkValue;
        quickSearchLinkValue = '';
    }
}

function generateNotSupportedMsg(json, selectorDiv, element){
    var div = document.createElement("div");
    div.id = 'selector_Table';
    div.cellspacing = '0';
    if (json){
        var jsonObj = JSON.parse(json);
        jsonObj.forEach(function (item){
            var childDiv = document.createElement("div");
            childDiv.id = item.id;
            childDiv.innerHTML = item.name;
            childDiv.style.maxWidth = element.clientWidth;
            div.appendChild(childDiv);
        });
    }
    selectorDiv.appendChild(div);
    selectorDiv.style.position = 'absolute';
    selectorDiv.classList.remove('objectRefWidget__autocomplete__selector');
}

function generateAutoCompleteList(json, selectorDiv, element){
    var div = document.createElement("div");
    div.id = 'selector_Table';
    div.className = 'objectRefWidget__autocomplete__selector__table';
    div.cellspacing = '0';
    if (json){
        var jsonObj = JSON.parse(json);
        var count = 0;
        if(element.parentElement.getAttribute('requiredflag') != 'true'){
            var childDiv = document.createElement("div");
            childDiv.id = '0';
            childDiv.onmouseover = function(e){mouseOverSelectorRowV2(this)};
            childDiv.onmousedown = function(e){clickSelectorRowV2(this)};
            childDiv.innerHTML = clearValues;
            div.appendChild(childDiv);
        }
        jsonObj.forEach(function (item){
            var childDiv = document.createElement("div");
            if(item.total_count >= 0){
                var childDiv1 = document.createElement("div");
                childDiv.id = 'recordCount';
                childDiv.className = 'recordCount';
                childDiv1.style.textAlign = 'right';
                var msg=ofMsg.replace("{0}", count);
                var resultMsg=msg.replace("{1}", item.total_count);
                childDiv1.innerHTML = '<i>' + resultMsg + '</i>';
                childDiv.appendChild(childDiv1);
            } else {
                childDiv.id = item.id;
                childDiv.className = 'optionList';
                childDiv.onmouseover = function(e){mouseOverSelectorRowV2(this)};
                childDiv.onmousedown = function(e){clickSelectorRowV2(this)};
                childDiv.innerHTML = item.name;
                count++;
            }
            div.appendChild(childDiv);

        });
    }
    selectorDiv.appendChild(div);
}

/** Selects a row in the selector
 */
function selectSelectorRowV2(rowToSelect) {
    if (activeSelectorRow) activeSelectorRow.className = '';
    rowToSelect.className = 'chooser-selected';
    activeSelectorRow = rowToSelect;
}

function mouseOverSelectorRowV2(row) {
    selectSelectorRowV2(row);
}

var currentFocus=0;
function selector_keyNavigationV2(e) {

    if (!selectorDiv || selectorDiv.style.display == 'none') {
        return;
    }
    if (selectorDiv) x = selectorDiv.getElementsByTagName("div");
    if (document.all) e = event;

    if (e.keyCode == 38) { // Up arrow
        if (currentFocus-1 <= 0){
            return;
        }
        currentFocus--;
        addActive(x);
    }

    if (selectorDiv && e.keyCode == 40) { // Down arrow
        if (x[currentFocus+1].id == 'recordCount'){
            return;
        }
        currentFocus++;
        addActive(x);
    }

    if (e.keyCode == 13 || e.keyCode == 9) { // Enter key or tab key
        e.preventDefault();
        if (currentFocus > -1) {
            if (x) x[currentFocus].onmousedown();
        }
    }
    if (e.keyCode == 27) { // Escape key
        closeSelector();
    }
}

function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    //add class "activeOptionList"
    x[currentFocus].classList.add("chooser-selected");
}

function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("chooser-selected");
    }
}

function notifyToastMessage() {
	
	var errorMsg = 	document.MAINFORM.errorMessage.value;
	if(errorMsg != null && errorMsg != undefined && errorMsg.length > 0){
		document.MAINFORM.savedFromPeek.value = "false";
		return;
	}
	else
	{
		jQuery( function() 
		{
			jQuery( "#toastMsgPeekView" ).dialog({  dialogClass: "no-close peek-success",draggable:false,minHeight:50});  
		} );
		
		document.MAINFORM.savedFromPeek.value = "false";
		setTimeout(hideToast,3000);
	}
}

function hideToast(){
	jQuery( function() 
	{    
		jQuery( "#toastMsgPeekView" ).dialog( "close" );
	} );
}
//START: ID-R100 - Product Season Report
function patViewObjectReport(oid, replace, targetWindowName, additionalParameters) {
	if(additionalParameters.indexOf("amp;")  > -1)
	{
		additionalParameters = additionalParameters.replaceAll("amp;", "");
	}
	viewObject(oid, replace, targetWindowName, additionalParameters);
}
//END: ID-R100 - Product Season Report