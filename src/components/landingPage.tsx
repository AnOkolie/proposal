import { Box, Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const landingPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/game");
  };
  return (
    <Box>
      <Text c={"cyan"}>
        So I'm bored, so were going to play a little get to know you game
      </Text>
      <br></br>
      <Button onClick={handleClick}>Start Game</Button>
      <br></br>
      <img src="https://anokolie.github.io/proposal/legos_2.jpeg"></img>
      <br />
    </Box>
  );
};
