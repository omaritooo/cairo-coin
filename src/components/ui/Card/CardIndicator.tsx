import { Card } from "./Card";

export const CardIndicator = () => {
  console.log("Mounted");

  return (
    <Card icon={<CardIndicator />} loading={false} name="Indicator">
      Indictaor
    </Card>
  );
};
