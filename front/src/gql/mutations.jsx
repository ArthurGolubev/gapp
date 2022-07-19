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

export const ADD_LINK = gql`
    mutation add_link_query(
        $sourceId: String!
        $targetId: String!
        $linkName: String!
        $extraAttr: [EA!]!
        ){
        addLink(
            sourceId: $sourceId
            targetId: $targetId
            linkName: $linkName
            extraAttr: $extraAttr
        )
    }
`