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
        response = list(session.run(q))

        return response
    except Exception as e:
        print("Query failed:", e)
    finally:
        if session is not None:
            session.close()
