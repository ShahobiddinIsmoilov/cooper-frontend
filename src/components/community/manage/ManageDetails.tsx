import { Grid, Textarea } from "@mantine/core";
import { useLanguage } from "../../../contexts/LanguageContext";

interface Props {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

export default function ManageDetails(props: Props) {
  const { language } = useLanguage();

  function handleFormatting(s: string) {
    s = s.replace(/\s\s+/g, " ");
    s = s.replace(/\n/g, "");
    return s;
  }

  function handleNameChange(value: string) {
    props.setName(handleFormatting(value));
  }

  function handleDescriptionChange(value: string) {
    props.setDescription(handleFormatting(value));
  }

  return (
    <Grid mt={16} mb={100}>
      <Grid.Col span={{ base: 12, xs: 5 }}>
        <p className="ml-1 mb-1">{labels.name[language]}:</p>
        <Textarea
          variant="unstyled"
          maxLength={32}
          bg={"dark"}
          autosize
          value={props.name}
          placeholder="Nom yozilishi shart"
          size="lg"
          onChange={(e) => handleNameChange(e.target.value)}
          className={`border border-line rounded-xl px-3 sm:px-4`}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 7 }}>
        <p className="ml-1 mb-1">{labels.description[language]}:</p>
        <Textarea
          variant="unstyled"
          maxLength={500}
          bg={"dark"}
          autosize
          value={props.description}
          placeholder="Tavsif yozilishi shart"
          size="lg"
          onChange={(e) => handleDescriptionChange(e.target.value)}
          className={`border border-line rounded-xl px-3 sm:px-4`}
        />
      </Grid.Col>
    </Grid>
  );
}

const labels = {
  name: {
    uz: "Hamjamiyat nomi",
    en: "Community name",
    ru: "Community name",
  },
  description: {
    uz: "Hamjamiyat haqida qisqacha",
    en: "Community description",
    ru: "Community description",
  },
};
