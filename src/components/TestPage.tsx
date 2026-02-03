import {
  Box,
  Container,
  Text,
  Title,
  Button,
  Card,
  Paper,
  Group,
  Flex,
} from "@mantine/core";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

function generateRandomPath(
  steps: number,
  maxX: number,
  maxY: number,
  finalX: number,
  finalY: number,
) {
  const x: number[] = [];
  const y: number[] = [];

  for (let i = 0; i < steps; i++) {
    x.push(Math.random() * maxX * 2 - maxX);
    y.push(Math.random() * maxY);
  }

  x.push(finalX);
  y.push(finalY);

  return { x, y };
}

export const TestPage = () => {
  const [saidNo, setSaidNo] = useState(false);
  const [saidYes, setSaidYes] = useState(false);
  const [path, setPath] = useState({ x: [0], y: [0] });
  const [explosion, setExplosion] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Generate motion path when user clicks "No"
  useLayoutEffect(() => {
    if (!saidNo || !textRef.current || !imageRef.current) return;

    const imageRect = imageRef.current.getBoundingClientRect();
    const textRect = textRef.current.getBoundingClientRect();

    const targetX = imageRect.left - textRect.left;
    const targetY = imageRect.top - textRect.top;

    const randomPath = generateRandomPath(6, 120, 100, targetX, targetY);
    setPath(randomPath);
  }, [saidNo]);

  // Play launch audio when user clicks "No"
  useEffect(() => {
    if (saidNo && audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current
        .play()
        .catch((err) => console.log("Audio play failed:", err));
      if (explosion && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // optional, reset to start
      }
    }
  }, [saidNo, explosion]);

  // Play explosion video after text animation completes
  const handleTextAnimationComplete = () => {
    setExplosion(true);

    if (videoRef.current) {
      videoRef.current.currentTime = 0; // start at beginning
      videoRef.current
        .play()
        .catch((err) => console.log("Video play failed:", err));

      // Set a timer to flip the boolean after X seconds
      const duration = 5000; // 5000ms = 5 seconds
      const timer = setTimeout(() => {
        setVideoFinished(true);
      }, duration);

      // Clean up timer if component unmounts
      return () => clearTimeout(timer);
    }
  };

  if (videoFinished) {
    return (
      <Box style={{ minHeight: "100vh", backgroundColor: "pink" }}>
        <Container>
          <img
            src="gameover.webp"
            alt="Game Over"
            style={{ width: "600px", height: "400px", objectFit: "cover" }}
          />
          <br />
          <Button onClick={() => window.location.reload()}>Try Again</Button>
          <audio src="game-over.mp3" autoPlay />
        </Container>
      </Box>
    );
  }

  if (saidYes) {
    return (
      <Box style={{ minHeight: "100vh", backgroundColor: "pink" }}>
        <Container>
          <Title p={"lg"}>Yea thats what i thought</Title>
          <img
            src="mcqueenSally.jpg"
            alt="Game Over"
            style={{ width: "600px", height: "400px", objectFit: "cover" }}
          />
          <br />
          <Text p={"lg"}>🎉🥳🎊🥳🎉🎊</Text>
          <Button onClick={() => window.location.reload()}>Replay</Button>
          <audio src="kachow.mp3" autoPlay />
          <motion.div
            ref={textRef}
            initial={{ x: 0, y: 0 }}
            animate={{ x: path.x, y: path.y }}
            transition={{ duration: 3, ease: "easeInOut" }}
            style={{ position: "fixed", fontSize: 24, fontWeight: 600 }}
          ></motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <Box style={{ minHeight: "100vh", backgroundColor: "pink" }}>
      <Container size="sm" pt="xl">
        <Title>Will you?</Title>
        <Group wrap="nowrap" style={{ width: "100%" }}>
          <Card
            shadow="lg"
            padding="lg"
            radius="md"
            withBorder
            h={400}
            w={400}
            bg="cyan"
          >
            <Flex justify="center" align="center" h="100%">
              <Paper shadow="xs" p="md">
                <img src="cars2.jpeg" alt="Cars" />
              </Paper>
            </Flex>
            <p style={{ justifyContent: "right", color: "blue" }}>
              From: Anthony
            </p>
          </Card>
          <Card
            shadow="lg"
            padding="lg"
            radius="md"
            withBorder
            h={400}
            w={400}
            bg="cyan"
          >
            <Flex justify="center" align="center" h="100%">
              <Paper shadow="xs" p="lg">
                <Flex justify="center" gap="md">
                  <Button
                    variant="filled"
                    color="green"
                    onClick={() => setSaidYes(true)}
                  >
                    YES
                  </Button>
                  <Button
                    variant="filled"
                    color="red"
                    onClick={() => setSaidNo(true)}
                  >
                    NO
                  </Button>
                </Flex>
              </Paper>
            </Flex>
            <p style={{ justifyContent: "right", color: "yellow" }}>
              To: Ibukun
            </p>
          </Card>
        </Group>
      </Container>

      {/* Flying Text */}
      {saidNo && !explosion && (
        <motion.div
          ref={textRef}
          initial={{ x: 0, y: 0 }}
          animate={{ x: path.x, y: path.y }}
          transition={{ duration: 3, ease: "easeInOut" }}
          style={{ position: "fixed", fontSize: 24, fontWeight: 600 }}
          onAnimationComplete={handleTextAnimationComplete}
        >
          <Text fw={700}>🚀</Text>
        </motion.div>
      )}

      {/* Target Image */}
      {!explosion && (
        <img
          ref={imageRef}
          src="legos_2.jpeg"
          style={{ position: "fixed", bottom: 40, right: 40, width: 150 }}
        />
      )}

      {/* Explosion Video */}
      {explosion && (
        <>
          <video
            ref={videoRef}
            src="explosionVideo.mp4#t,1"
            muted
            style={{ position: "fixed", bottom: 40, right: 40, width: 150 }}
            autoPlay
            onEnded={() => setVideoFinished(true)}
          />
          <audio src="explosionAudio.wav" autoPlay />
        </>
      )}

      {/* Launch Audio */}
      <audio ref={audioRef} src="launchAudio.mp3" preload="auto" />
    </Box>
  );
};
