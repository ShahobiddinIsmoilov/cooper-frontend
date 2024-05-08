import { Grid, Textarea } from "@mantine/core";

interface Props {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

export default function ManageDetails(props: Props) {
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
        <p className="ml-1 mb-1">Hamjamiyat nomi:</p>
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
        <p className="ml-1 mb-1">Hamjamiyat haqida qisqacha:</p>
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
