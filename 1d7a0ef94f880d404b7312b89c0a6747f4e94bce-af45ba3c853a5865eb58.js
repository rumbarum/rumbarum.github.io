(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"/9aa":function(e,t,n){var a=n("NykK"),r=n("ExA7");e.exports=function(e){return"symbol"==typeof e||r(e)&&"[object Symbol]"==a(e)}},"/d1K":function(e,t,n){"use strict";n.d(t,"a",(function(){return j}));var a=n("q1tI"),r=n.n(a),o=n("Wbzz"),u=n("iSRb"),i=n.n(u),c=function(e){var t=e.author,n=e.isIndex;return r.a.createElement("div",{className:i.a.author},r.a.createElement(o.Link,{to:"/"},r.a.createElement("img",{src:Object(o.withPrefix)(t.photo),className:i.a.author__photo,width:"75",height:"75",alt:t.name})),!0===n?r.a.createElement("h1",{className:i.a.author__title},r.a.createElement(o.Link,{className:i.a["author__title-link"],to:"/"},t.name)):r.a.createElement("h2",{className:i.a.author__title},r.a.createElement(o.Link,{className:i.a["author__title-link"],to:"/"},t.name)),r.a.createElement("p",{className:i.a.author__subtitle},t.bio))},l=n("7Qib"),s=n("euHg"),f=n.n(s),m=function(e){var t=e.name,n=e.icon;return r.a.createElement("svg",{className:f.a.icon,viewBox:n.viewBox},r.a.createElement("title",null,t),r.a.createElement("path",{d:n.path}))},d=n("aU/I"),_=n.n(d),p=function(e){var t=e.contacts;return r.a.createElement("div",{className:_.a.contacts},r.a.createElement("ul",{className:_.a.contacts__list},Object.keys(t).map((function(e){return t[e]?r.a.createElement("li",{className:_.a["contacts__list-item"],key:e},r.a.createElement("a",{className:_.a["contacts__list-item-link"],href:Object(l.a)(e,t[e]),rel:"noopener noreferrer",target:"_blank"},r.a.createElement(m,{name:e,icon:Object(l.b)(e)}))):null}))))},x=n("Nrk+"),b=n.n(x),g=function(e){var t=e.copyright;return r.a.createElement("div",{className:b.a.copyright},t)},h=n("je8k"),v=n.n(h),E=function(e){var t=e.menu;return r.a.createElement("nav",{className:v.a.menu},r.a.createElement("ul",{className:v.a.menu__list},t.map((function(e){return r.a.createElement("li",{className:v.a["menu__list-item"],key:e.path},r.a.createElement(o.Link,{to:e.path,className:v.a["menu__list-item-link"],activeClassName:v.a["menu__list-item-link--active"]},e.label))}))))},y=n("SySy"),N=n.n(y),k=n("gGy4"),A=n("VV8g"),j=function(e){var t=e.isIndex,n=Object(k.b)(),a=n.author,o=n.copyright,u=n.menu,i=Object(k.c)();return r.a.createElement("div",{className:N.a.sidebar},r.a.createElement("div",{className:N.a.sidebar__inner},r.a.createElement(c,{author:a,isIndex:t}),r.a.createElement(E,{menu:u}),r.a.createElement(p,{contacts:a.contacts}),r.a.createElement(g,{copyright:o}),r.a.createElement(A.a,{tags:i.map((function(e){return e.fieldValue})),tagSlugs:i.map((function(e){return"/tag/"+e.fieldValue.toLowerCase()})),inSidebar:!0})))}},"3cYt":function(e,t){e.exports=function(e){return function(t){return null==e?void 0:e[t]}}},"6nK8":function(e,t,n){var a=n("dVn5"),r=n("fo6e"),o=n("dt0z"),u=n("9NmV");e.exports=function(e,t,n){return e=o(e),void 0===(t=n?void 0:t)?r(e)?u(e):a(e):e.match(t)||[]}},"9NmV":function(e,t){var n="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",a="["+n+"]",r="\\d+",o="[\\u2700-\\u27bf]",u="[a-z\\xdf-\\xf6\\xf8-\\xff]",i="[^\\ud800-\\udfff"+n+r+"\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",c="(?:\\ud83c[\\udde6-\\uddff]){2}",l="[\\ud800-\\udbff][\\udc00-\\udfff]",s="[A-Z\\xc0-\\xd6\\xd8-\\xde]",f="(?:"+u+"|"+i+")",m="(?:"+s+"|"+i+")",d="(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?",_="[\\ufe0e\\ufe0f]?"+d+("(?:\\u200d(?:"+["[^\\ud800-\\udfff]",c,l].join("|")+")[\\ufe0e\\ufe0f]?"+d+")*"),p="(?:"+[o,c,l].join("|")+")"+_,x=RegExp([s+"?"+u+"+(?:['’](?:d|ll|m|re|s|t|ve))?(?="+[a,s,"$"].join("|")+")",m+"+(?:['’](?:D|LL|M|RE|S|T|VE))?(?="+[a,s+f,"$"].join("|")+")",s+"?"+f+"+(?:['’](?:d|ll|m|re|s|t|ve))?",s+"+(?:['’](?:D|LL|M|RE|S|T|VE))?","\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])","\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",r,p].join("|"),"g");e.exports=function(e){return e.match(x)||[]}},AP2z:function(e,t,n){var a=n("nmnc"),r=Object.prototype,o=r.hasOwnProperty,u=r.toString,i=a?a.toStringTag:void 0;e.exports=function(e){var t=o.call(e,i),n=e[i];try{e[i]=void 0;var a=!0}catch(c){}var r=u.call(e);return a&&(t?e[i]=n:delete e[i]),r}},ExA7:function(e,t){e.exports=function(e){return null!=e&&"object"==typeof e}},KfNM:function(e,t){var n=Object.prototype.toString;e.exports=function(e){return n.call(e)}},Kz5y:function(e,t,n){var a=n("WFqU"),r="object"==typeof self&&self&&self.Object===Object&&self,o=a||r||Function("return this")();e.exports=o},N1om:function(e,t,n){var a=n("sgoq")((function(e,t,n){return e+(n?"-":"")+t.toLowerCase()}));e.exports=a},"Nrk+":function(e,t,n){e.exports={copyright:"Copyright-module--copyright--1ariN"}},NykK:function(e,t,n){var a=n("nmnc"),r=n("AP2z"),o=n("KfNM"),u=a?a.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":u&&u in Object(e)?r(e):o(e)}},RBgx:function(e,t,n){e.exports={page:"Page-module--page--2nMky",page__inner:"Page-module--page__inner--2M_vz",page__title:"Page-module--page__title--GPD8L",page__body:"Page-module--page__body--Ic6i6"}},RXmK:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n("q1tI"),r=n.n(a),o=n("RBgx"),u=n.n(o),i=function(e){var t=e.title,n=e.children,o=Object(a.useRef)();return Object(a.useEffect)((function(){o.current.scrollIntoView()})),r.a.createElement("div",{ref:o,className:u.a.page},r.a.createElement("div",{className:u.a.page__inner},t&&r.a.createElement("h1",{className:u.a.page__title},t),r.a.createElement("div",{className:u.a.page__body},n)))}},SySy:function(e,t,n){e.exports={sidebar:"Sidebar-module--sidebar--X4z2p",sidebar__inner:"Sidebar-module--sidebar__inner--Jdc5s"}},TKrE:function(e,t,n){var a=n("qRkn"),r=n("dt0z"),o=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,u=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]","g");e.exports=function(e){return(e=r(e))&&e.replace(o,a).replace(u,"")}},WFqU:function(e,t,n){(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t;e.exports=n}).call(this,n("eKGF"))},Z0cm:function(e,t){var n=Array.isArray;e.exports=n},"aU/I":function(e,t,n){e.exports={contacts:"Contacts-module--contacts--1rGd1",contacts__list:"Contacts-module--contacts__list--3OgdW","contacts__list-item":"Contacts-module--contacts__list-item--16p9q","contacts__list-item-link":"Contacts-module--contacts__list-item-link--2MIDn"}},asDA:function(e,t){e.exports=function(e,t,n,a){var r=-1,o=null==e?0:e.length;for(a&&o&&(n=e[++r]);++r<o;)n=t(n,e[r],r,e);return n}},dVn5:function(e,t){var n=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;e.exports=function(e){return e.match(n)||[]}},dt0z:function(e,t,n){var a=n("zoYe");e.exports=function(e){return null==e?"":a(e)}},eUgh:function(e,t){e.exports=function(e,t){for(var n=-1,a=null==e?0:e.length,r=Array(a);++n<a;)r[n]=t(e[n],n,e);return r}},euHg:function(e,t,n){e.exports={icon:"Icon-module--icon--Gpyvw"}},fo6e:function(e,t){var n=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;e.exports=function(e){return n.test(e)}},iSRb:function(e,t,n){e.exports={author__photo:"Author-module--author__photo--36xCH",author__title:"Author-module--author__title--2CaTb","author__title-link":"Author-module--author__title-link--Yrism",author__subtitle:"Author-module--author__subtitle--cAaEB"}},je8k:function(e,t,n){e.exports={menu:"Menu-module--menu--Efbin",menu__list:"Menu-module--menu__list--31Zeo","menu__list-item":"Menu-module--menu__list-item--1lJ6B","menu__list-item-link":"Menu-module--menu__list-item-link--10Ush","menu__list-item-link--active":"Menu-module--menu__list-item-link--active--2CbUO"}},nmnc:function(e,t,n){var a=n("Kz5y").Symbol;e.exports=a},qRkn:function(e,t,n){var a=n("3cYt")({"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"s"});e.exports=a},sgoq:function(e,t,n){var a=n("asDA"),r=n("TKrE"),o=n("6nK8"),u=RegExp("['’]","g");e.exports=function(e){return function(t){return a(o(r(t).replace(u,"")),e,"")}}},zoYe:function(e,t,n){var a=n("nmnc"),r=n("eUgh"),o=n("Z0cm"),u=n("/9aa"),i=a?a.prototype:void 0,c=i?i.toString:void 0;e.exports=function e(t){if("string"==typeof t)return t;if(o(t))return r(t,e)+"";if(u(t))return c?c.call(t):"";var n=t+"";return"0"==n&&1/t==-1/0?"-0":n}}}]);
//# sourceMappingURL=1d7a0ef94f880d404b7312b89c0a6747f4e94bce-af45ba3c853a5865eb58.js.map