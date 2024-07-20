import { Select } from "@mantine/core";

import currencies from "../assets/currencies.json";

const ComboX = ({ value, onChange, position = "bottom-start" }) => {
  return (
    <Select
      data={currencies}
      {...{ value, onChange }}
      placeholder="Pick value"
      nothingFoundMessage="Nothing found..."
      allowDeselect={false}
      comboboxProps={{ width: 310, position }}
      searchable
    />
  );
};

export default ComboX;
