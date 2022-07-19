from loguru import logger

def create_link(driver, source_id, target_id, link_name, extra_attr):
    

    logger.warning(extra_attr)
    attrs = "{" 
    for attr in extra_attr:
        logger.debug(attr)
        attrs += f"`{attr.name}`"
        attrs += ": "
        attrs += f"'{attr.value}'"
        attrs += ", "
    attrs = attrs[:-2]
    attrs += "}"
    try:
        session = driver.session(database='concept1')
        q = f"""
            MATCH (s), (t) WHERE ID(s)={source_id} and ID(t)={target_id} CREATE (s)-[r:`{link_name}` {attrs}]->(t) RETURN r
        """
        response = list(session.run(q))

        return response
    except Exception as e:
        print("Query failed:", e)
    finally:
        if session is not None:
            session.close()
