export type TNewsResponse = {
     id: number,
      title: string,
      slug: string,
      type: {label: string, value: string},
      priority:{label: string, value: string},
      short_description: string,
      image: string,
      published_date: string,
}