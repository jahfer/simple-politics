// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var ReasonReactRouter = require("reason-react/src/ReasonReactRouter.js");
var Strings$OurPolitics = require("./Strings.bs.js");
var SplashIndex$OurPolitics = require("./SplashIndex.bs.js");
var PageNotFound$OurPolitics = require("./PageNotFound.bs.js");
var LanguageContext$OurPolitics = require("./LanguageContext.bs.js");
var PolicyComparisonIndex$OurPolitics = require("./PolicyComparisonIndex.bs.js");

function App$LanguageSelector(Props) {
  var match = React.useState((function () {
          return /* EN */0;
        }));
  var setLanguage = match[1];
  var language = match[0];
  var match$1 = language === /* EN */0;
  var match$2 = language === /* FR */1;
  return React.createElement("div", {
              className: "langSelection"
            }, React.createElement("a", {
                  className: match$1 ? "active" : "",
                  href: "#en",
                  onClick: (function (param) {
                      return Curry._1(setLanguage, (function (param) {
                                    return /* EN */0;
                                  }));
                    })
                }, "EN"), React.createElement("span", undefined, " | "), React.createElement("a", {
                  className: match$2 ? "active" : "",
                  href: "#fr",
                  onClick: (function (param) {
                      return Curry._1(setLanguage, (function (param) {
                                    return /* FR */1;
                                  }));
                    })
                }, "FR"));
}

var LanguageSelector = /* module */[/* make */App$LanguageSelector];

function App(Props) {
  var match = React.useState((function () {
          return /* EN */0;
        }));
  var language = match[0];
  var lang_string = Curry._2(Strings$OurPolitics.Language[/* react_string */2], language, language);
  var url = ReasonReactRouter.useUrl(undefined, /* () */0);
  var match$1 = url[/* path */0];
  var page_content;
  if (match$1) {
    if (match$1[0] === "policies") {
      var match$2 = match$1[1];
      page_content = match$2 ? (
          match$2[1] ? React.createElement(PageNotFound$OurPolitics.make, { }) : React.createElement(PolicyComparisonIndex$OurPolitics.make, {
                  year: Caml_format.caml_int_of_string(match$2[0])
                })
        ) : React.createElement(PolicyComparisonIndex$OurPolitics.make, { });
    } else {
      page_content = React.createElement(PageNotFound$OurPolitics.make, { });
    }
  } else {
    page_content = React.createElement(SplashIndex$OurPolitics.make, { });
  }
  return React.createElement(LanguageContext$OurPolitics.make, LanguageContext$OurPolitics.makeProps(language, React.createElement("div", {
                      className: "page"
                    }, React.createElement(App$LanguageSelector, { }), React.createElement("a", {
                          href: "#",
                          onClick: (function (param) {
                              return ReasonReactRouter.push("/");
                            })
                        }, React.createElement("h1", {
                              className: "pageTitle lang-" + (String(lang_string) + "")
                            }, "Our Politics")), page_content), /* () */0));
}

var make = App;

exports.LanguageSelector = LanguageSelector;
exports.make = make;
/* react Not a pure module */
