from loguru import logger

def delete_link(driver, link_id):
    

    try:
        session = driver.session(database='concept1')
        q = f"""
            MATCH ()-[r]->() WHERE ID(r)={link_id} DELETE r
        """
        response = session.run(q)

        response = list(response)

        return response
    except Exception as e:
        print("Query failed:", e)
    finally:
        if session is not None:
            session.close()
