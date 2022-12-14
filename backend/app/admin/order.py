from sqladmin import ModelView

from app.model import Order


class OrderView(ModelView, model=Order):
    """Class for setting up the Admin panel for the Product model"""

    # Permission
    can_create = False
    can_edit = False
    can_delete = False
    can_view_details = False
    can_export = False

    # Metadata
    name = "Order"
    name_plural = "Orders"
    icon = "fa-solid fa-file"

    column_list = [
        Order.id,
        Order.phone_number_id,
        Order.business_id,
        Order.status,
        Order.note,
        Order.order_uid,
    ]
    column_sortable_list = [
        Order.id,
        Order.status,
        Order.business_id,
    ]

    # Details
    # column_details_list = [User.id, User.username]

    # Pagination
    page_size = 50
    page_size_options = [25, 50, 100, 200]
