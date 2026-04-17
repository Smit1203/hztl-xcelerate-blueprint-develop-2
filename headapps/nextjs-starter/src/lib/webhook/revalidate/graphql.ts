export const GetItemUrl = `
  query GetItemUrl($id: String, $lang: String = "en-US") {
  item(path: $id, language: $lang) {
    language {
      name
    }
    url {
      path
      siteName
      hostName
      scheme
    }
    id
  }
}
`;
