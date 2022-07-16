import { gql } from "@apollo/client";

export const ADD_NODE = gql`
    mutation add_node_mutation(
        $nodeLabels: String!
        $nodeName: String!
        $nodeType: String!
        $extraAttr: [EA!]!
        ){
        addNode(
            nodeLabels: $nodeLabels
            nodeName: $nodeName
            nodeType: $nodeType
            extraAttr: $extraAttr
        )
    }
`
