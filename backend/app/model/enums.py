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
    was_seen = "was_seen"
    in_progress = "in_progress"
    completed = "completed"
    picked_up = "picked_up"
    cancelled = "cancelled"  # TODO: consider to add another cancellation kind
