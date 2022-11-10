import enum


class Role(enum.Enum):

    Admin = "Admin"
    Frozen = "Frozen"
    Marketeer = "Marketeer"


class SoldBy(enum.Enum):

    by_kilogram = "By Kilogram"
    by_unit = "By Unit"


class OrderStatus(enum.Enum):

    in_progress = "In Progress"
    was_seen = "Was seen"
    completed = "Completed"
    picked_up = "Picked Up"
    cancelled = "Cancelled"
