from loguru import logger

def edit_link(driver, old_prop, link_id, attr, value):


    logger.info(link_id, old_prop, attr, value)
    try:
        session = driver.session(database='concept1')
        q = f"""
            MATCH ()-[r]->() WHERE ID(r)={link_id} REMOVE r.`{old_prop}` SET r.`{attr}`='{value}' RETURN r
        """
        response = list(session.run(q))

        return response
    except Exception as e:
        print("Query failed:", e)
    finally:
        if session is not None:
            session.close()
