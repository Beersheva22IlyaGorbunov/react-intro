import { Box, Button, Divider, Stack } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import SignInForm from "../components/forms/SignInForm";
import { authService } from "../config/service-config";
import ActionResult from "../model/ActionResult";
import LoginData from "../model/LoginData";
import UserData from "../model/UserData";
import { signIn } from "../redux/slices/AuthSlice";

const ServiceButton = ({
  title,
  iconUrl,
  onClick,
}: {
  title: string;
  iconUrl: string;
  onClick: (loginData: LoginData) => Promise<ActionResult>;
}) => {
  return (
    <Button
      onClick={() => onClick({ email: title, password: "" })}
      fullWidth
      variant="outlined"
      startIcon={<img height="20px" width="20px" src={iconUrl} alt={`${title} icon`} />}
    >
      {title}
    </Button>
  );
};

const SignIn: React.FC = () => {
  const dispatch = useDispatch();

  const services = authService.getAvailableProvider();

  async function loginFn(loginData: LoginData): Promise<ActionResult> {
    const result: ActionResult = {
      status: "error",
      message: "",
    };
    let loginRes: UserData = null;
    try {
      loginRes = await authService.login(loginData);
    } catch (e) {
      result.message = (e as Error).message;
    }
    if (loginRes !== null) {
      dispatch(signIn(loginRes));
    }
    return result;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box width="sx">
        <SignInForm onSignIn={loginFn} />
        {services.length > 0 && (
          <>
            <Divider sx={{ mb: 2 }}>OR</Divider>
            <Stack sx={{ width: "50%", marginX: "auto" }} spacing={1}>
              {services.map((service) => (
                <ServiceButton
                  key={service.providerName}
                  title={service.providerName}
                  iconUrl={service.providerIconUrl}
                  onClick={loginFn}
                />
              ))}
            </Stack>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SignIn;
