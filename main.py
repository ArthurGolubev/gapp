from strawberry.scalars import JSON
from typing import List, NewType
import strawberry
from strawberry.fastapi import GraphQLRouter
from fastapi import FastAPI
from neo4j import GraphDatabase
from loguru import logger
from fastapi.staticfiles import StaticFiles

from mutations.create_node import create_node
from query.get_jsonable_date import get_jsonable_date
from query.get_list_node_labels import get_list_node_labels


JSON = strawberry.scalar(
    NewType("JSON", object),
    description="The `JSON` scalar type represents JSON values as specified by ECMA-404",
    serialize=lambda v: v,
    parse_value=lambda v: v,
)

PEP = strawberry.scalar(
    
)

@strawberry.input
class EA:
    name: str
    value: str


@strawberry.type
class Query:
    @strawberry.field
    def hello(self) -> str:
        return f'hello world'

    @strawberry.field
    def get_db(self) -> JSON:
        return get_jsonable_date(driver)

    @strawberry.field
    def get_list_node_labels(self) -> List[str]:
        return get_list_node_labels(driver)


@strawberry.type
class Mutation:
    @strawberry.mutation
    def add_node(self, node_labels: str, node_name: str, node_type: str, extra_attr: List[EA]) -> str:
        logger.info(f'{node_name=}')
        logger.info(f'{extra_attr=}')
        create_node(driver, node_name=node_name, node_labels=node_labels, node_type=node_type, extra_attr=extra_attr)
        return 'ok'

schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(schema)

app = FastAPI()
app.include_router(graphql_app, prefix='/api/graphql')



app.mount("/static", StaticFiles(directory="front/dist"), name="static")


driver = GraphDatabase.driver(uri="bolt://localhost:7687", auth=('neo4j', '123'))


def graph():
    try:
        session = driver.session(database='concept1')
        q2= """
        MATCH path = (p)-[:`НАХОДИТСЯ_В`]->(c)
        WITH collect(path) AS paths
        CALL apoc.convert.toTree(paths)
        YIELD value
        RETURN value;"""
        q3 = """
        MATCH (n)-[r]-() RETURN n, r
        """
        # response = list(session.run(q2))
        response = list(session.run(q3))
        return response
    except Exception as e:
        print("Query failed:", e)
    finally:
        if session is not None:
            session.close()


@app.get('/graph')
def get_graph():
    response = graph()
    logger.debug(response)
    return response
    return {"status": "ok"}

