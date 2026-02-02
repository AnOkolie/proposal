import { useEffect, useState } from "react";
import {
  Alert,
  Container,
  Progress,
  Radio,
  Text,
  TextInput,
  Paper,
  SimpleGrid,
  Button,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export const StartingPage = () => {
  const questions = [
    {
      id: 1,
      text: "What's your name?",
      answer: "Ibukun",
      options: [],
      answerType: "text",
    },
    {
      id: 2,
      text: "How old are you?",
      answer: "30",
      options: ["23", "30", "20"],
      answerType: "select",
    },
    {
      id: 3,
      text: "Is your forehead massive?",
      answer: "true",
      options: ["true", "false"],
      answerType: "select",
    },
    {
      id: 4,
      text: "Who would you say is the funnier one?",
      answer: "Anthony",
      options: ["Anthony", "Ibukun"],
      answerType: "select",
    },
  ];
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswerChange = (value?: string | null) => {
    if (value == null) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const showToast = (type: "success" | "error", message: string) => {
    notifications.show({
      title: type === "success" ? "Success" : "Oops!",
      message,
      color: type === "success" ? "teal" : "red",
      icon: type === "success" ? <IconCheck size={18} /> : <IconX size={18} />,
      autoClose: 2500,
      withCloseButton: false,
      radius: "xl",
      styles: (theme) => ({
        root: {
          boxShadow: theme.shadows.md,
          fontWeight: 500,
          padding: "12px 16px",
          minWidth: 200,
        },
        title: { fontSize: 14 },
        description: { fontSize: 13, opacity: 0.9 },
      }),
    });
  };

  const question = questions[index];
  const isCorrect =
    question && String(answers[index]) === String(question.answer);

  // Advance index automatically for correct answers
  useEffect(() => {
    if (!isCorrect) return;
    const timer = setTimeout(() => setIndex((i) => i + 1), 700);
    return () => clearTimeout(timer);
  }, [isCorrect]);

  // Show toast on answer change
  useEffect(() => {
    if (!question || !answers[index]) return;

    if (isCorrect) {
      showToast("success", "Well done!");
    } else {
      if (question.id === 2 && answers[index] === "23") {
        showToast("error", "It's a Sunday, be honest!");
      } else if (question.id === 4 && answers[index] === "Ibukun") {
        showToast("error", "Lmaooooo Insert eye roll here 🙄");
      } else {
        showToast("error", "That's not right!");
      }
    }
  }, [answers[index]]);

  return (
    <Container size="sm" mt="xl">
      {index >= questions.length ? (
        <Paper p="xl" radius="md" withBorder>
          <Alert color="blue" title="Quiz complete 🎉">
            You’ve completed the quiz and unlocked a reward.
          </Alert>
          <Button mt="md" onClick={() => navigate("/proposal")}>
            Click me
          </Button>
        </Paper>
      ) : (
        <Paper p="xl" radius="md" withBorder>
          <Progress
            value={((index + 1) / questions.length) * 100}
            mb="lg"
            radius="xl"
            size="lg"
          />
          <Text size="lg" fw={600} mb="md">
            {question.text}
          </Text>

          {question.answerType === "text" ? (
            <TextInput
              size="md"
              radius="md"
              placeholder="Type your answer..."
              onChange={(e) => handleAnswerChange(e.target.value)}
              styles={{
                input: {
                  border: "1px solid #eaeaea",
                  padding: "14px",
                  fontSize: "14px",
                },
              }}
            />
          ) : (
            <Radio.Group value={answers[index]} onChange={handleAnswerChange}>
              <SimpleGrid cols={2} spacing="md" mt="md">
                {question.options.map((option) => (
                  <Radio
                    key={option}
                    value={option}
                    label={option}
                    styles={{
                      radio: { display: "none" },
                      root: ({ checked }: { checked: boolean }) => ({
                        border: checked
                          ? "2px solid var(--mantine-color-blue-6)"
                          : "1px solid #eaeaea",
                        backgroundColor: checked
                          ? "var(--mantine-color-blue-0)"
                          : "white",
                        borderRadius: 10,
                        padding: "16px",
                        cursor: "pointer",
                        transition: "all 150ms ease",
                        textAlign: "center",
                        fontWeight: checked ? 600 : 500,
                        boxShadow: checked ? "0 0 5px rgba(0,0,0,0.1)" : "none",
                        "&:hover": {
                          borderColor: "var(--mantine-color-blue-4)",
                        },
                      }),
                      label: { width: "100%", fontSize: 14 },
                    }}
                  />
                ))}
              </SimpleGrid>
            </Radio.Group>
          )}
        </Paper>
      )}
    </Container>
  );
};
