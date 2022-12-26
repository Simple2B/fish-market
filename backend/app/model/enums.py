import enum


class UserRole(enum.Enum):

    Admin = "Admin"
    Marketeer = "Marketeer"


class SoldBy(enum.Enum):

    unknown = "unknown"
    by_kilogram = "by_kilogram"
    by_unit = "by_unit"
    by_both = "by_both"


class OrderStatus(enum.Enum):

    created = "created"
    pending = "pending"
    in_progress = "in_progress"
    ready = "ready"
    picked_up = "picked_up"
    can_not_complete = "can_not_complete"
