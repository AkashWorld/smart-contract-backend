const graphql = require('graphql');
const _ = require('lodash'); 

const{GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLInt,GraphQLID} = graphql;
//test data
var Patients=[
	{name:'Dad',address:'New Jersey',id:'001',age:36},
	{name:'Mom',address:'New York',id:'002',age:34}
];
var data = [
    { id: '001', blood_pressure: 130, heart_rate: 23 },
    { id: '002', blood_pressure: 120, heart_rate: 20 }
];

const Patient = new GraphQLObjectType({
    name: 'Patient',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        age: { type: GraphQLInt },
        user_data: {
            type: Parameters,
            resolve(parent, args) {
                return _.find(data, { id: parent.id });
            }
        }
	})
});

const Parameters = new GraphQLObjectType({
    name: 'Parameters',
    fields:()=>({
        id: { type: GraphQLID },
        blood_pressure: { type: GraphQLInt },
        heart_rate: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: Patient,
            args: { name: { type: GraphQLString } },
            resolve(parent, args) {
                //code to get the data
                return _.find(Patients, { name: args.name });
            }
        },
        parameters: {
            type: Parameters,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code to get the data
                return _.find(data, {id:args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
	query:RootQuery
});
