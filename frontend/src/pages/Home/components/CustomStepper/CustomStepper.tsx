import Stepper from "@mui/material/Stepper";
import { Step, StepLabel } from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#5099dd",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#5099dd",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#D1D1D1",
    borderTopWidth: 5,
    borderRadius: 1,
  },
}));

type CustomStepperProps = {
  steps: { key: string; btnName: string }[];
  activeStep: number;
};

const CustomStepper = ({ activeStep, steps }: CustomStepperProps) => {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      connector={<CustomConnector />}
    >
      {steps.slice(1, -1).map((obj) => (
        <Step
          key={obj.key}
          sx={{
            "& .MuiStepLabel-labelContainer": {
              color: "black",
            },
            "& .MuiStepLabel-root .Mui-active": {
              color: "rgba(0, 0, 0, 0.38)",
            },
            "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
              color: "black",
            },
          }}
        >
          <StepLabel>
            {obj.key[0].toLocaleUpperCase() +
              obj.key.replace("_", " ").slice(1)}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export { CustomStepper };
