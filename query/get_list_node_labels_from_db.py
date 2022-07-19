
from loguru import logger


def get_list_node_labels_from_db(driver):
    try:
        session = driver.session(database='concept1')
        q = """
            CALL db.labels()
        """
        response = list(session.run(q))

        # logger.warning(list(map(lambda x: x.value(), response)))
        # logger.warning(response[0].value())
        return list(map(lambda x: x.value(), response))
    except Exception as e:
        print("Query failed:", e)
    finally:
        if session is not None:
            session.close()
