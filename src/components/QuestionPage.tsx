import { Title, Container, Button, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export const QuestionPage = () => {
  const [videoSrc, setVideoSrc] = useState("");
  const [saidNo, setSaidNo] = useState(false);
  const [saidYes, setSaidYes] = useState(false);

  useEffect(() => {
    setVideoSrc(
      "https://www.youtube.com/embed/XXmYe12a-UY?mute=1&autoplay=1&controls=1",
    );
  }, []);

  if (!videoSrc) return null;
  if (saidNo) {
    return (
      <Container>
        <img
          src="/horse.jpeg"
          alt="No"
          className="floating"
          style={{
            position: "fixed",
            top: "10%",
            left: "10%",
            pointerEvents: "none", // allows clicks to go through
          }}
        />
        <br></br>
        <Button onClick={() => setSaidNo(false)}>Try Again</Button>
        <style>{`
        @keyframes floatAround {
          0% { transform: translate(0, 0); }
          25% { transform: translate(30px, 50px); }
          50% { transform: translate(-20px, 80px); }
          75% { transform: translate(40px, -30px); }
          100% { transform: translate(0, 0); }
        }

        .floating {
          animation: floatAround 8s ease-in-out infinite;
        }
      `}</style>
      </Container>
    );
  }
  if (saidYes) {
    return (
      <Container>
        <img
          src="/meme.jpg"
          alt="Yes"
          className="floating"
          style={{
            position: "fixed",
            top: "10%",
            left: "10%",
            pointerEvents: "none", // allows clicks to go through
          }}
        />
        <br></br>
        <Text>Look at that, we are agreeing on something after all</Text>
        <style>{`
        @keyframes floatAround {
          0% { transform: translate(0, 0); }
          25% { transform: translate(30px, 50px); }
          50% { transform: translate(-20px, 80px); }
          75% { transform: translate(40px, -30px); }
          100% { transform: translate(0, 0); }
        }

        .floating {
          animation: floatAround 8s ease-in-out infinite;
        }
      `}</style>
      </Container>
    );
  }
  return (
    <Container>
      <Title>You will be my Valentine</Title>
      <iframe
        width="560"
        height="315"
        src={videoSrc}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <br />
      <Button onClick={() => setSaidYes(true)}>Yes</Button>{" "}
      <Button onClick={() => setSaidNo(true)}>No</Button>
    </Container>
  );
};
