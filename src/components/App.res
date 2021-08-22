let selectLanguage = x =>
  switch x {
  | "fr" => I18n.FR
  | _ => I18n.EN
  }

@react.component
let make = () => {
  let url = ReasonReactRouter.useUrl()
  let (language, setLanguage) = React.useState(() => url.hash |> selectLanguage)
  
  module T = Strings.Translations({
    let language = language
  })

  React.useEffect1(() => {
    setLanguage(_ => selectLanguage(url.hash))
    None
  }, [url])

  let (page_content, subheading) = switch url.path {
    /** Yearly election pages */
    // Policies
    | list{"policies", year} => (<PolicyComparisonIndex year={int_of_string(year)} />, Some(year))
    | list{"policies", year, ...policyPath} =>
      let policy = String.concat("/", policyPath)
      (<PolicyComparisonIndex year={int_of_string(year)} policy_handle=j`$year/$policy` />, Some(year))
    | list{"policies"} => (<Utils.SilentRedirect path="/policies/2021" />, None)

    // Topics
    // | list{"topics", year} => (<TopicIndex year={int_of_string(year)} />, Some(year))

    /** Root site content */
    | list{"about"} => (<AboutIndex />, Some(Content.Strings.about->T.text_to_string))
    | list{"privacy"} => (<PrivacyIndex />, Some(Content.Strings.privacy_policy->T.text_to_string))
    | list{} => (<Utils.SilentRedirect path="/policies/2021" />, None)
    | _ => (<PageNotFound />, Some("Page Not Found"))
  }

  <LanguageContext language>
    <div className="page">
      <Header setLanguage subheading />
      <div className="container"> page_content </div>
      <Footer />
    </div>
  </LanguageContext>
}
