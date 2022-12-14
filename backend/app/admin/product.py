from sqladmin import ModelView

from app.model import Product


class ProductView(ModelView, model=Product):
    """Class for setting up the Admin panel for the Product model"""

    # Permission
    can_create = False
    can_edit = True
    can_delete = False
    can_view_details = True
    can_export = False

    # Metadata
    name = "Product"
    name_plural = "Products"
    icon = "fa-solid fa-fish"

    column_list = [
        Product.id,
        Product.business_id,
        Product.name,
        Product.price,
        Product.sold_by,
        Product.image,
        Product.is_out_of_stoke,
        Product.is_deleted,
    ]
    column_sortable_list = [
        Product.business_id,
    ]

    # Details
    # column_details_list = [User.id, User.username]

    # Pagination
    page_size = 50
    page_size_options = [25, 50, 100, 200]
