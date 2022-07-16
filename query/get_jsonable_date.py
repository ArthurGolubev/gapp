import json
from loguru import logger


def get_jsonable_date(driver):
    try:
        session = driver.session(database='concept1')
        q = """
            CALL apoc.export.json.all(null, {useTypes:true, stream: true, jsonFormat: 'JSON'})
            YIELD file, nodes, relationships, properties, data
            RETURN file, nodes, relationships, properties, data
        """
        response = list(session.run(q))

        data = dict(response[0])["data"]
        dict_data = json.loads(data)
        logger.debug(f'{len(dict_data["nodes"])=}')
        logger.warning(f"{len(dict_data['rels'])=}")

        return data
    except Exception as e:
        print("Query failed:", e)
    finally:
        if session is not None:
            session.close()
