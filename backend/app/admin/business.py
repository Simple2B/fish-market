from sqladmin import ModelView

from app.model import Business


class BusinessView(ModelView, model=Business):
    """Class for setting up the Admin panel for the Product model"""

    # Permission
    can_create = False
    can_edit = False
    can_delete = False
    can_view_details = False
    can_export = False

    # Metadata
    name = "Market"
    name_plural = "Markets"
    icon = "fa-solid fa-store"

    column_list = [
        Business.id,
        Business.name,
        Business.user_id,
        Business.logo,
        Business.web_site_id,
    ]
    column_sortable_list = [
        Business.id,
        Business.name,
        Business.user_id,
    ]

    # Details
    # column_details_list = [User.id, User.username]

    # Pagination
    page_size = 50
    page_size_options = [25, 50, 100, 200]
