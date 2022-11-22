import { Card, CardContent, Grid, Modal, Typography } from "@mui/material";
import { ProductItemProps } from "./ProductList.type";

type AddItemModalProps = {
  onClose: () => void;
  item: Omit<ProductItemProps, "onClick"> | null;
};

export function AddItemModal({ onClose, item }: AddItemModalProps) {
  return (
    <Modal
      open={!!item}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid container alignItems={"center"} justifyContent={"center"}>
        <Card>
          <CardContent>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Modal>
  );
}
