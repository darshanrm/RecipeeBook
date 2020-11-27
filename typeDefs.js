const { gql } = require('apollo-server-express');

//type definitions(query,mutation input output format)
const typeDefs = gql`
type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  
type Recipee {
    id:ID,
    author:String,
    recipee:String,
    description:String,
    ingredients:[String],
    procedure:String,
    tags:[String],
    photo:String,
    profile:String,
    createdAt:String,
    updatedAt:String
  }

type Query {
    recipees: [Recipee]
    recipee(id: String): Recipee
    recipeesByAuthor(authorName: String): [Recipee]
    }

input inRecipee {
        recipee:String,
        author:String,
        description:String,
        ingredients:[String],
        procedure:String,
        tags:[String],
        photo:Upload!,
        profile:Upload,
      }

type Mutation {
    addRecipee(recipee:inRecipee): Recipee
    singleUpload(file: Upload!): File
}
`;


module.exports = {
    typeDefs: typeDefs
}