module Redirect = {
  [@react.component]
  let make = (~path) => {
    let language = React.useContext(LanguageContext.ctx);
    Utils.Router.push_route(~language, path);
    React.null;
  };
};

[@react.component]
let make = () => {
  let url = ReasonReactRouter.useUrl();

  let (language, setLanguage) =
    React.useState(() =>
      switch (url.hash) {
      | "fr" => I18n.FR
      | _ => I18n.EN
      }
    );

  let page_content =
    switch (url.path) {
    | ["policies", year] =>
      <PolicyComparisonIndex year={int_of_string(year)} />
    | ["policies", year, ...policyPath] =>
      let policy = String.concat("/", policyPath);
      <PolicyComparisonIndex
        year={int_of_string(year)}
        policy_handle={j|$year/$policy|j}
      />;
    | ["policies"] => <Redirect path="/policies/2015" />
    | ["about"] => <AboutIndex />
    | ["privacy"] => <PrivacyIndex />
    | [] => <SplashIndex />
    | _ => <PageNotFound />
    };

  <LanguageContext language>
    <div className="page">
      <Header setLanguage />
      <div className="container"> page_content </div>
      <Footer />
    </div>
  </LanguageContext>;
};