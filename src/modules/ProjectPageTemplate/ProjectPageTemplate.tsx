import {Helmet} from "react-helmet";
import {ProjectPageTemplateProps} from './types'


export default function ProjectPageTemplate({title, coverLink, desc}: ProjectPageTemplateProps) {
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
