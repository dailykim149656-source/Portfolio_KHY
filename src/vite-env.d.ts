declare module 'virtual:portfolio-posts' {
  export type PortfolioPost = {
    slug: string;
    title: string;
    body: string;
    lastModified: string;
    sourcePath: string;
  };

  export const posts: PortfolioPost[];
}
