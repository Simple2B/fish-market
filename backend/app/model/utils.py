import uuid
from random import randint


def gen_unique_uid() -> str:
    return str(uuid.uuid4())


def gen_confirm_code() -> str:
    return "".join(
        [str(randint(0, 9)) if index >= 1 else str(randint(1, 9)) for index in range(4)]
    )
