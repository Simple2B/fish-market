from sqladmin import ModelView

from app.model import PhoneNumber


class PhoneView(ModelView, model=PhoneNumber):
    """Class for setting up the Admin panel for the Product model"""

    # Permission
    can_create = False
    can_edit = False
    can_delete = True
    can_view_details = True
    can_export = True

    # Metadata
    name = "Phone number"
    name_plural = "Phone numbers"
    icon = "fa-solid fa-phone"

    column_list = [
        PhoneNumber.id,
        PhoneNumber.number,
        PhoneNumber.confirm_code,
        PhoneNumber.is_number_verified,
    ]

    column_sortable_list = [
        PhoneNumber.id,
        PhoneNumber.number,
        PhoneNumber.is_number_verified,
    ]

    # Details
    column_details_list = [
        PhoneNumber.number,
        PhoneNumber.is_number_verified,
        PhoneNumber.confirm_code,
    ]

    # Pagination
    page_size = 50
    page_size_options = [25, 50, 100, 200]
