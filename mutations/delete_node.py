from loguru import logger

def delete_node(driver, node_id):
    

    try:
        session = driver.session(database='concept1')
        q = f"""
            MATCH (n) WHERE ID(n)={node_id} DETACH DELETE n
        """
        response = list(session.run(q))

        return response
    except Exception as e:
        print("Query failed:", e)
    finally:
        if session is not None:
            session.close()
