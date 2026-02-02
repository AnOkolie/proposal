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
  const navigate = useNavigate();

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

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [textInput, setTextInput] = useState(""); // For debounced text input

  const question = questions[index];
  const isCorrect =
    question && String(answers[index]) === String(question.answer);

  // Update the answer after the user stops typing for 500ms
  useEffect(() => {
    if (question?.answerType !== "text") return;
    const handler = setTimeout(() => {
      setAnswers((prev) => {
        const next = [...prev];
        next[index] = textInput;
        return next;
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [textInput, index, question]);

  // Reset input field when moving to next question
  useEffect(() => {
    setTextInput(answers[index] || "");
  }, [index, answers]);

  // Auto-advance on correct answers
  useEffect(() => {
    if (!isCorrect) return;
    const timer = setTimeout(() => setIndex((i) => i + 1), 700);
    return () => clearTimeout(timer);
  }, [isCorrect]);

  // Show toast notifications
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

  useEffect(() => {
    if (!question || !answers[index]) return;

    if (isCorrect) {
      showToast("success", "Well done!");
    } else {
      // Specific "lie" cases
      if (question.id === 2 && answers[index] === "23") {
        showToast("error", "It's a Sunday, be honest!");
      } else if (question.id === 4 && answers[index] === "Ibukun") {
        showToast("error", "Insert eye roll here 🙄");
      } else {
        showToast("error", "That's not right!");
      }
    }
  }, [answers[index]]);

  // Handle answer selection for radios
  const handleRadioChange = (value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  // Quiz complete
  if (index >= questions.length) {
    return (
      <Container size="sm" mt="xl">
        <Paper p="xl" radius="md" withBorder>
          <Alert color="blue" title="Quiz complete 🎉">
            You’ve completed the quiz and unlocked a reward.
          </Alert>
          <Button mt="md" onClick={() => navigate("/proposal")}>
            Continue
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="sm" mt="xl">
      <Paper p="xl" radius="md" withBorder>
        {/* Progress bar */}
        <Progress
          value={((index + 1) / questions.length) * 100}
          mb="lg"
          radius="xl"
          size="lg"
        />

        {/* Question */}
        <Text size="lg" fw={600} mb="md">
          {question.text}
        </Text>

        {/* Text input with debounce */}
        {question.answerType === "text" ? (
          <TextInput
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Type your answer..."
            size="md"
            radius="md"
            styles={{
              input: {
                border: "1px solid #eaeaea",
                padding: "14px",
                fontSize: 14,
              },
            }}
          />
        ) : (
          // Radio options in 2-column grid
          <Radio.Group value={answers[index]} onChange={handleRadioChange}>
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
                      "&:hover": { borderColor: "var(--mantine-color-blue-4)" },
                    }),
                    label: { width: "100%", fontSize: 14 },
                  }}
                />
              ))}
            </SimpleGrid>
          </Radio.Group>
        )}
      </Paper>
    </Container>
  );
};
