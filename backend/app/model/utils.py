import uuid


def gen_unique_uid() -> str:
    return str(uuid.uuid4())
