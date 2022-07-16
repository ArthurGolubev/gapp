import { InMemoryCache } from '@apollo/client'


const linkTransform = (link) => {
    return {
        linkLabel: link.label,
        source: link.start.id,
        target: link.end.id
    }
}

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                getDb: {
                    merge(existing, incoming){
                        if (!existing){
                            let data = JSON.parse(incoming)
                            const graph = {
                                nodes: [...data.nodes],
                                links: data.rels.map(link => linkTransform(link)),
                            }
                            return graph
                        }
                        return existing
                    }
                }
            }
        }
    }
}
)

export default cache