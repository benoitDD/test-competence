export const schema = `
type Mutation {
  signIn(login: String!, password: String!): UserAndToken
  signUp(login: String!, password: String!, email: String!, avatar: String): UserAndToken
  updateUser(avatar: String): User
  signOut: Boolean
  createArticle(title: String!, image: String!, text: String!, tags: [String!]!, status: Status!): Article
  updateArticle(id: ID!, title: String, image: String, text: String, tags: [String!], status: Status): Article
  removeArticle(id: ID!): Boolean
  createComment(text: String!, articleId: ID!): Comment
}
type Query {
    searchArticles(text: String!, limit: Int!, skip: Int): [Article]!
    article(id: ID!): Article
    commentsByArticle(articleId: ID!, limit: Int!, skip: Int): [Comment]!
}
type User {
  id: ID!
  login: String!
  email: String!
  avatar: String!
}
type UserAndToken {
  id: ID!
  login: String!
  email: String!
  avatar: String!
  token: String!
}
type Article {
  id: ID!
  title: String!
  image: String!
  text: String!
  tags: [String!]!
  status: Status!
  author: User
  comments(limit: Int!, skip: Int): [Comment]
}
enum Status {
  private
  public
}
type Comment {
  id: ID!
  author: User!
  text: String!
  article: Article!
}
`
