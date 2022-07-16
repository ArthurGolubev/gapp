import React from 'react'
import { ForceGraph2D } from 'react-force-graph'
import { useQuery } from '@apollo/client'
import SpriteText from 'three-spritetext';
import { GET_ALL_GRAPH } from '../gql/query';


const Canva = () => {
    const { data, error } = useQuery(GET_ALL_GRAPH)

    console.log('err ->', error)

    if (data && !error) {
        console.log('data ->', data)
        return (
            <div className="App">
                <ForceGraph2D
                    // width='400'
                    // backgroundColor='#ff10ff'
                    showNavInfo={true}
                    graphData={data.getDb}
                    nodeLabel={d => `
                        Тип: ${d['properties']['Тип']}\n
                        Название: ${d['properties']['Название']}`
                    }
                    linkLabel={l=>l.source.id}
                    nodeAutoColorBy={d => d['properties']['Тип']}
                    // nodeAutoColorBy={d => d.id}
                    // nodeColor={d => d.color}
                    // linkDirectionalArrowLength={3.5}
                    // linkDirectionalArrowRelPos={1}
                    // linkCurvature={0.25}
                    onNodeClick={d=>console.log(d.id)}
                    linkThreeObjectExtend={true}
                    linkThreeObject={link => {
                        // extend link with text sprite
                        const sprite = new SpriteText('1200');
                        sprite.color = 'ffffff';
                        sprite.textHeight = 1.5;
                        return sprite;
                    }}
                    linkPositionUpdate={(sprite, { start, end }) => {
                        const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
                        [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
                        })));

                        // Position sprite
                        Object.assign(sprite.position, middlePos);
                    }}
                    />
            </div>
        )
    }
    return null
}

export default Canva