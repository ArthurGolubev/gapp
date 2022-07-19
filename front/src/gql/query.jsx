import { gql } from '@apollo/client'

export const GET_ALL_GRAPH = gql`
    query get_all_graph_query{
        getDb
    }
`

export const GET_LIST_NODE_LABELS = gql`
    query get_list_node_labels_query{
        getListNodeLabels
    }
`

export const GET_POSSIBLE_LINK_NAMES = gql`
    query get_possible_link_names_query($nodeId: String!){
        getPossibleLinkNames(nodeId: $nodeId)
    }
`