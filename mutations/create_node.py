from loguru import logger

def create_node(driver, node_labels, node_name, node_type, extra_attr):
    

    logger.warning(extra_attr[0].value)
    attrs = "{" 
    attrs += f"`Тип`: '{node_type}',"
    attrs += f" `Название`: '{node_name}' "
    for attr in extra_attr:
        attrs += ", "
        attrs += f"`{attr.name}`"
        attrs += ": "
        attrs += f"'{attr.value}'"
    attrs += "}"
    try:
        session = driver.session(database='concept1')
        q = f"""
            CREATE (n: `{node_labels}` {attrs}) return n
        """
        response = session.run(q)

        print(response.data())
        print(response.consume())
        print(response.consume().data())
        logger.info("W0 ->", response)
        logger.info("W1 ->", response.consume())
        logger.info("W3 ->", response)
        # logger.info("W2 ->", response.keys())
        response = list(response)

        return response
    except Exception as e:
        print("Query failed:", e)
    finally:
        if session is not None:
            session.close()
