
from loguru import logger


def get_possible_link_names_from_db(driver, node_id):
    try:
        session = driver.session(database='concept1')
        q = f"""
            MATCH (n)-[p]-()
            WHERE ID(n) = {node_id}
            RETURN collect(distinct type(p))
        """
        response = list(session.run(q))
        return response[0].value()
    except Exception as e:
        print("Query failed:", e)
    finally:
        if session is not None:
            session.close()
