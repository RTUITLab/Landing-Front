export interface ProjectsData{
  title: string,
  description: string,
  images: string[],
  videos: string[],
  tags: string[],
  tech: string[],
  developers: string[],
  site: string,
  sourceCode:sourceCodeData[],
  date:string,
}

interface sourceCodeData{
  name: string,
  link:string
}