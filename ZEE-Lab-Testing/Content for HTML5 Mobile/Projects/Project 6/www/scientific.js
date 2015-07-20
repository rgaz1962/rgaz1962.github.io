
//<!--



// Javascript scientific calculator  (4 March 1996)



// (C) Copyright Rolf Howarth 1996



// rolf@insect.demon.co.uk







var NDIGITS = 16;



var STACKSIZE = 12;







var value = 0;          // current value in display



var memory = GetCookie("CalcMemory");   // current value in memory



if (!memory) memory = 0;



var level = 0;          // no. of items on stack



var entered = true;     // has value on display been 'entered'?



var decimal = 0;                // multiplier when entering after decimal point



var fixed = 0;          // force trailing zero display when entering decimals



var exponent = false;   // currently entering exponent?



var inverse = false;    // has the INV key been pressed?







if (location.search)



{



        // pass in value through command line



        value = location.search.substring(1,location.search.length);



}







function stackItem()



{



        this.value = 0;



        this.op = "";



}







function array(length)



{



        this[0] = 0;



        for (i=0; i<length; ++i)



        {



                this[i] = 0;



                this[i] = new stackItem();



        }



        this.length = length;



}







stack = new array(STACKSIZE);







function push(value,op,prec)



{



        if (level==STACKSIZE)



                return false;



        for (i=level;i>0; --i)



        {



                stack[i].value = stack[i-1].value;



                stack[i].op = stack[i-1].op;



                stack[i].prec = stack[i-1].prec;



        }



        stack[0].value = value;



        stack[0].op = op;



        stack[0].prec = prec;



        ++level;



        return true;



}







function pop()



{



        if (level==0)



                return false;



        for (i=0;i<level; ++i)



        {



                stack[i].value = stack[i+1].value;



                stack[i].op = stack[i+1].op;



                stack[i].prec = stack[i+1].prec;



        }



        --level;



        return true;



}







function format(value)



{



        var valStr = "" + value;



        if (valStr.indexOf("N")>=0 || (value == 2*value && value == 1+value))



                return "Error ";



        var i = valStr.indexOf("e")



        if (i>=0)



        {



                var expStr = valStr.substring(i+1,valStr.length);



                if (i>11) i=11;  // max 11 digits



                valStr = valStr.substring(0,i);



                if (valStr.indexOf(".")<0) valStr += ".";



                valStr += " " + expStr;



        }



        else



        {



                var valNeg = false;



                if (value < 0)



                        { value = -value; valNeg = true; }



                var valInt = Math.floor(value);



                var valFrac = value - valInt;



                var prec = NDIGITS - (""+valInt).length - 1;    // how many digits available after period



                if (! entered && fixed>0)



                        prec = fixed;



                var mult = " 1000000000000000000".substring(1,prec+2);



                var frac = Math.floor(valFrac * mult + 0.5);



                valInt = Math.floor(Math.floor(value * mult + .5) / mult);



                if (valNeg)



                        valStr = "-" + valInt;



                else



                        valStr = "" + valInt;



                var fracStr = "00000000000000"+frac;



                fracStr = fracStr.substring(fracStr.length-prec, fracStr.length);



                i = fracStr.length-1;



                if (entered || fixed==0)



                {



                        // remove trailing zeros unless fixed during entry.



                        while (i>=0 && fracStr.charAt(i)=="0")



                                --i;



                        fracStr = fracStr.substring(0,i+1);



                }



                if (i>=0) valStr += "." + fracStr;



//              document.result.debugField.value = "prec "+prec+", mult "+mult+", frac "+frac;



        }



        return valStr;



}







function refresh()



{



        var display = format(value);



        if (exponent)



        {



                if (expval<0)



                        display += " " + expval;



                else



                        display += " +" + expval;



        }



        if (display.indexOf(".")<0 && display != "Error ")



        {



                if (entered || decimal>0)



                        display += '.';



                else



                        display += ' ';



        }



        display = "               " + display;



        display = display.substring(display.length-NDIGITS-1,display.length);



        document.result.result.value = display;



        inverse = false;



}







function clearAll()



{



        level = 0;



        clear();



}







function clear()



{



        exponent = false;



        value = 0;



        enter();



        refresh();



}







function evalx()



{



        if (level==0)



                return false;



        op = stack[0].op;



        sval = stack[0].value;



//      alert("eval "+sval+op+value);



        if (op == '+')



                value = parseFloat(sval) + value;



        else if (op == '-')



                value = sval - value;



        else if (op == '*')



                value = sval * value;



        else if (op == '/')



                value = sval / value;



        else if (op == 'pow')



                value = Math.pow(sval,value);



        pop();



        if (op=='(')



                return false;



        return true;



}







function openp()



{



        enter();



        if (!push(0,'(',0))



        {



                value = "NAN";



        }



        refresh();



}







function closep()



{



        enter();



        while (evalx())



                ;



        refresh();



}







function operator(op)



{



        enter();



        if (op=='+' || op=='-')



                prec = 1;



        else if (op=='*' || op=='/')



                prec = 2;



        else if (op=="pow")



                prec = 3;



        if (level>0 && prec <= stack[0].prec)



                evalx();



        if (!push(value,op,prec))



        {



                value = "NAN";



        }



        refresh();



}







function enter()



{



        if (exponent)



                value = value * Math.exp(expval * Math.LN10);



        entered = true;



        exponent = false;



        decimal = 0;



        fixed = 0;



}







function equals()



{



        enter()



        while (level>0)



                evalx();



        refresh();



}







function digit(n)



{



        if (entered)



        {



                value = 0;



                digits = 0;



                entered = false;



        }



        if (n==0 && digits==0)



        {



                refresh();



                return;



        }



        if (exponent)



        {



                if (expval<0)



                        n = -n;



                if (digits < 3)



                {



                        expval = expval * 10 + n;



                        ++digits;



                        refresh();



                }



                return;



        }



        if (value<0)



                n = -n;



        if (digits < NDIGITS-1)



        {



                ++digits;



                if (decimal>0)



                {



                        decimal = decimal * 10;



                        value = value + (n/decimal);



                        ++fixed;



                }



                else



                        value = value * 10 + n;



        }



        refresh();



}







function sign()



{



        if (exponent)



                expval = -expval;



        else



                value = -value;



        refresh();



}







function period()



{



        if (entered)



        {



                value = 0;



                digits = 1;



        }



        entered = false;



        if (decimal == 0)



        {



                decimal = 1;



        }



        refresh();



}







function exp()



{



        if (entered || exponent)



                return;



        exponent = true;



        expval = 0;



        digits = 0;



        decimal = 0;



        refresh();



}







function inv()



{



        inverse = !inverse;



}







function func(f)



{



        enter();



        if (f=="1/x")



                value = 1/value;



        else if (f=="swap")



        {



                var tmp = value;



                value = stack[0].value;



                stack[0].value = tmp;



        }



        else if (f=='n!')



        {



                if (value<0 || value>200 || value != Math.round(value))



                        value = "NAN";



                else



                {



                        var n = 1;



                        var i;



                        for (i=1;i<=value;++i)



                                n *= i;



                        value = n;



                }



        }



        else if (f=="MR")



                value = memory;



        else if (f=="M+")



        {



                memory += value;



                SetCookie("CalcMemory", memory);



        }



        else if (f=="Min")



        {



                memory = value;



                SetCookie("CalcMemory", memory);



        }



        else if (inverse)



        {



                if (f=="sin")



                        value = Math.asin(value)*180/Math.PI;



                else if (f=="cos")



                        value = Math.acos(value)*180/Math.PI;



                else if (f=="tan")



                        value = Math.atan(value)*180/Math.PI;



                else if (f=="log")



                        value = Math.exp(value * Math.LN10);



                else if (f=="log2")



                        value = Math.exp(value * Math.LN2);



                else if (f=="ln")



                        value = Math.exp(value);



                else if (f=="sqrt")



                        value = value*value;



                else if (f=="pi")



                        value = Math.E;



        }



        else



        {



                if (f=="sin")



                        value = Math.sin(value/180 * Math.PI);



                else if (f=="cos")



                        value = Math.cos(value/180 * Math.PI);



                else if (f=="tan")



                        value = Math.tan(value/180 * Math.PI);



                else if (f=="log")



                        value = Math.log(value)/Math.LN10;



                else if (f=="log2")



                        value = Math.log(value)/Math.LN2;



                else if (f=="ln")



                        value = Math.log(value);



                else if (f=="sqrt")



                        value = Math.sqrt(value);



                else if (f=="pi")



                        value = Math.PI;



        }



        refresh();



}







function hex()



{



        location = "calc_hex.html?"+value;



}







/////////////



//



//  Cookie Functions - Second Helping  (21-Jan-96)



//  Written by:  Bill Dortch, hIdaho Design <bdortch@netw.com>



//  The following functions are released to the public domain.



//







function getCookieVal (offset) {



  var endstr = document.cookie.indexOf (";", offset);



  if (endstr == -1)



    endstr = document.cookie.length;



  return unescape(document.cookie.substring(offset, endstr));



}







function GetCookie (name) {



  var arg = name + "=";



  var alen = arg.length;



  var clen = document.cookie.length;



  var i = 0;



  while (i < clen) {



    var j = i + alen;



    if (document.cookie.substring(i, j) == arg)



      return getCookieVal (j);



    i = document.cookie.indexOf(" ", i) + 1;



    if (i == 0) break; 



  }



  return null;



}







//  Function to create or update a cookie.



//    name - String object object containing the cookie name.



//    value - String object containing the cookie value.  May contain



//      any valid string characters.



//    [expires] - Date object containing the expiration data of the cookie.  If



//      omitted or null, expires the cookie at the end of the current session.



//    [path] - String object indicating the path for which the cookie is valid.



//      If omitted or null, uses the path of the calling document.



//    [domain] - String object indicating the domain for which the cookie is



//      valid.  If omitted or null, uses the domain of the calling document.



//    [secure] - Boolean (true/false) value indicating whether cookie transmission



//      requires a secure channel (HTTPS).  



//



function SetCookie (name, value) {



  var argv = SetCookie.arguments;



  var argc = SetCookie.arguments.length;



  var expires = (argc > 2) ? argv[2] : null;



  var path = (argc > 3) ? argv[3] : null;



  var domain = (argc > 4) ? argv[4] : null;



  var secure = (argc > 5) ? argv[5] : false;



  document.cookie = name + "=" + escape (value) +



    ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +



    ((path == null) ? "" : ("; path=" + path)) +



    ((domain == null) ? "" : ("; domain=" + domain)) +



    ((secure == true) ? "; secure" : "");



}







function DeleteCookie (name) {



  var exp = new Date();



  exp.setTime (exp.getTime() - 1);  // This cookie is history



  var cval = GetCookie (name);



  document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();



}







//



// End of cookie functions



//////////







// -->







