import { useCallback, useEffect, useState } from "react";
import Select, { OnChangeValue, StylesConfig } from "react-select"
import makeAnimated from "react-select/animated"
import { getAllTags } from "../../api_client/UserClient";
import { COLORS } from "../../lib/Colors";

export type SelectValue = { value: string, label: string }

interface ContactsTableTagsProps {
  instanceId: string,
  handleTagChange: (newTags: OnChangeValue<SelectValue, true>) => void
}

const animatedComponents = makeAnimated();

const colourStyles: StylesConfig<any, true> = {
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
  option: (provided, state) => ({
    ...provided,
    color: state.data.color
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: COLORS.primaryBlueLight
  })
}

export default function ContactsTableTags({ instanceId, handleTagChange }: ContactsTableTagsProps) {
  const [tagOptions, setTagOptions] = useState<string[]>([]);

  const fetchAllTags = useCallback(async () => {
    try {
      const allTags = await getAllTags();
      setTagOptions(allTags);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchAllTags();
  }
    , [fetchAllTags]);

  return (
    <Select
      instanceId={instanceId}
      closeMenuOnSelect={false}
      placeholder="Select tag(s)..."
      noOptionsMessage={() => "No other tags remaining. Create more in the profile of any of your contacts"}
      components={animatedComponents}
      isMulti
      options={tagOptions.map((tag) => ({ value: tag, label: tag }))}
      styles={colourStyles}
      onChange={(value: OnChangeValue<SelectValue, true>, actionMeta) => { handleTagChange(value) }}
    />
  )
}