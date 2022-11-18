import enum


class UserRole(enum.Enum):

    Admin = "Admin"
    Marketeer = "Marketeer"


class SoldBy(enum.Enum):

    unknown = "unknown"
    by_kilogram = "by_kilogram"
    by_unit = "by_unit"


class OrderStatus(enum.Enum):

    created = "Created"
    was_seen = "Was seen"
    in_progress = "In Progress"
    completed = "Completed"
    picked_up = "Picked Up"
    cancelled = "Cancelled"  # TODO: consider to add another cancellation kind
