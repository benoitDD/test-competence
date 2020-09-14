export const schema = `
type Mutation {
  signIn(login: String!, password: String!): User
  signUp(login: String!, password: String!, email: String!, avatar: String): User
  updateUser(avatar: String): User
  signOut: Boolean
  createArticle(title: String!, image: String!, text: String!, tags: [String!]!, status: Status!): Article
  updateArticle(articleId: ID!, title: String, image: String, text: String, tags: [String!], status: Status): Article
  removeArticle(articleId: ID!): Boolean
  createComment(userId: ID!, text: String!): Comment
}
type Query {
    searchArticles(text: String!): [Article]!
    article(articleId: ID!): Article
    commentsByArticle(articleId: ID!): [Comment]!
}
type User {
  id: ID!
  login: String!
  email: String!
  avatar: String!
}
type Article {
  id: ID!
  title: String!
  image: String!
  text: String!
  tags: [String!]!
  status: Status!
  author: User
  comment: [Comment]
}
enum Status {
  private
  public
}
type Comment {
  id: ID!
  author: User!
  text: String!
}
`
