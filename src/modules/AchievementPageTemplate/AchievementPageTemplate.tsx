import {Helmet} from "react-helmet";
import {AchievementPageTemplate} from "./types";

export default function AchievementPageTemplate({title, coverLink, desc}: AchievementPageTemplate) {
  return (
    <div>
      <Helmet
      title={"RTUITLab | "+title}
      >
        <meta property="og:title" content={"RTUITLab | "+title}/>
        <meta property="title" content={"RTUITLab | "+title}/>
        <meta property="og:type" content="article"/>
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={coverLink}/>
        <meta property="og:description" content={desc}/>
      </Helmet>

      fd
    </div>
  )
}
