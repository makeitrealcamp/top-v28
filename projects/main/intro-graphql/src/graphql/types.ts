export const typeDefs = `

type Task{
   id: ID!
   title: String!
   description: String
}

#root type

 type Query{
  getAllTasks: [Task]
 }
  type  Mutation{
   createTask(title: String!, description: String): Task!
   }
`;