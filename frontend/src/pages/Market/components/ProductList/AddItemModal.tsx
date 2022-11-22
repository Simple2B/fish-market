import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Modal,
  Switch,
  Typography,
} from "@mui/material";
import Container from "@mui/system/Container";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";
import { ProductItemProps, ItemUnit } from "./ProductList.type";

type AddItemModalProps = {
  onClose: () => void;
  item: Omit<ProductItemProps, "onClick"> | null;
};

type SwitchOptions = ItemUnit.kilogram | ItemUnit.by_unit;

export function AddItemModal({ onClose, item }: AddItemModalProps) {
  const [amount, setAmount] = useState<number>(0);

  const [selectedType, setSelectedType] = useState<SwitchOptions>(
    ItemUnit.kilogram
  );

  useEffect(() => {
    if (item && ItemUnit[item.sold_by] === ItemUnit.by_unit) {
      setSelectedType(ItemUnit.by_unit);
    }
  }, [item]);

  const handleSwitchChange = () => {
    setSelectedType((currentValue: SwitchOptions) => {
      if (currentValue === ItemUnit.kilogram) {
        setAmount(Math.round(amount));
        return ItemUnit.by_unit;
      }
      setAmount(Math.round(amount * 100) / 100);
      return ItemUnit.kilogram;
    });
  };

  const handlerAddAmount = () => {
    if (selectedType === ItemUnit.by_unit) {
      setAmount(Math.round(amount + 1));
    } else if (selectedType === ItemUnit.kilogram) {
      setAmount(Math.round((amount + 0.1) * 100) / 100);
    }
  };

  const handlerRemoveAmount = () => {
    if (selectedType === ItemUnit.by_unit) {
      setAmount(Math.round(amount - 1));
    } else if (selectedType === ItemUnit.kilogram) {
      setAmount(Math.round((amount - 0.1) * 100) / 100);
    }
    if (amount <= 0) {
      setAmount(0);
    }
  };

  return (
    <Modal
      open={!!item}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        {!!item && (
          <Grid container alignItems={"center"} justifyContent={"center"}>
            <Grid item xs={8}>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={6}>
                      <img
                        width="270px"
                        height="220px"
                        src={item?.image}
                        alt="Fish image"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Container
                        sx={{
                          flexDirection: "row",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>{item?.name}</Typography>
                        <Typography>
                          {item?.price} {ItemUnit.kilogram}
                        </Typography>
                      </Container>
                      <Container
                        sx={{
                          flexDirection: "row",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={
                            selectedType === ItemUnit.by_unit
                              ? {
                                  fontWeight: "bold",
                                }
                              : undefined
                          }
                        >
                          By amount*
                        </Typography>
                        <Switch
                          checked={selectedType === ItemUnit.kilogram}
                          onChange={handleSwitchChange}
                          color="default"
                        />
                        <Typography
                          sx={
                            selectedType === ItemUnit.kilogram
                              ? {
                                  fontWeight: "bold",
                                }
                              : undefined
                          }
                        >
                          By kg
                        </Typography>
                        <IconButton onClick={handlerRemoveAmount} size="small">
                          <RemoveIcon fontSize="inherit" />
                        </IconButton>
                        <Typography>{amount}</Typography>
                        <IconButton onClick={handlerAddAmount} size="small">
                          <AddIcon fontSize="inherit" />
                        </IconButton>
                      </Container>
                      <Container
                        sx={{
                          flexDirection: "row",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>{item?.name}</Typography>
                        <Typography></Typography>
                      </Container>
                      <Container
                        sx={{
                          flexDirection: "row",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>{item?.name}</Typography>
                        <Typography></Typography>
                      </Container>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </>
    </Modal>
  );
}
