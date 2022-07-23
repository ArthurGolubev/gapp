from strawberry.scalars import JSON
from typing import List, NewType
import strawberry
from strawberry.fastapi import GraphQLRouter
from fastapi import FastAPI
from neo4j import GraphDatabase
from loguru import logger
from fastapi.staticfiles import StaticFiles
from mutations.create_link import create_link

from mutations.create_node import create_node
from mutations.delete_node import delete_node
from mutations.delete_link import delete_link
from query.get_jsonable_date import get_jsonable_date
from query.get_list_node_labels_from_db import get_list_node_labels_from_db
from query.get_possible_link_names_from_db import get_possible_link_names_from_db

logger.info('START_1')

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
        return get_list_node_labels_from_db(driver)

    @strawberry.field
    def get_possible_link_names(self, node_id: str) -> List[str]:
        return get_possible_link_names_from_db(driver, node_id)

@strawberry.type
class Mutation:
    @strawberry.mutation
    def add_node(self, node_labels: str, node_name: str, node_type: str, extra_attr: List[EA]) -> str:
        logger.info(f'{node_name=}')
        logger.info(f'{extra_attr=}')
        create_node(driver, node_name=node_name, node_labels=node_labels, node_type=node_type, extra_attr=extra_attr)
        return 'ok'

    @strawberry.mutation
    def add_link(self, source_id: str, target_id: str, link_name: str, extra_attr: List[EA]) -> str:
        create_link(driver, source_id=source_id, target_id=target_id, link_name=link_name, extra_attr=extra_attr)
        return 'ok'

    @strawberry.mutation
    def remove_node(self, node_id: str) -> str:
        delete_node(driver=driver, node_id=node_id)
        return "ok"

    @strawberry.mutation
    def remove_link(self, link_id: str) -> str:
        delete_link(driver=driver, link_id=link_id)
        return "ok"

schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(schema)

app = FastAPI()
app.include_router(graphql_app, prefix='/api/graphql')

@app.get('/test')
def test() -> str:
    return "He"


app.mount("/", StaticFiles(directory="front/dist"), name="static")


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

