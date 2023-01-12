from app import model as m

CONFIRM_MES_KEY = "confirm"


MESSAGE_TEXT = {
    "EN": {
        CONFIRM_MES_KEY: "Confirmation Code: {} You Will receive an SMS when your order is ready! {} {}",
        m.OrderStatus.ready: "Your order is ready at {}, please come over and pick it up. You can contact us at: {} Your order num’: {} You can always order online at: {}",
        m.OrderStatus.can_not_complete: "Apologies! Your order at {} could not be completed, please call us so we can work out an alternative for you. {} Your order num’: {}",
    },
    "IL": {
        CONFIRM_MES_KEY: "Confirmation Code: {} You Will receive an SMS when your order is ready! {} {}",
        m.OrderStatus.ready: "Your order is ready at {}, please come over and pick it up. You can contact us at: {} Your order num’: {} You can always order online at: {}",
        m.OrderStatus.can_not_complete: "Apologies! Your order at {} could not be completed, please call us so we can work out an alternative for you. {} Your order num’: {}",
    },  # I need a little help with Hebrew
}
