import uuid
from random import randint


def gen_unique_uid() -> str:
    return str(uuid.uuid4())


def gen_confirm_code() -> str:
    return "".join([str(randint(0, 9)) for _ in range(6)])
