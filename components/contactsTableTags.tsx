import Select, { OnChangeValue, StylesConfig } from "react-select"
import makeAnimated from "react-select/animated"
import { COLORS } from "../lib/Colors";

export type SelectValue = { value: string, label: string }

interface ContactsTableTagsProps {
  instanceId: string,
  handleTagChange: (newTags: OnChangeValue<SelectValue, true>) => void
}

const animatedComponents = makeAnimated();

const options = [
  { value: "Melbourne AI Conference 2019", label: "Melbourne AI Conference 2019" },
  { value: "Finance", label: "Finance" },
  { value: "Coworkers", label: "Coworkers" },
  { value: "Friends", label: "Friends" },
  { value: "Family", label: "Family" },
  { value: "Google Conference 2056", label: "Google Conference 2056" }
]

const colourStyles: StylesConfig<any, true> = {
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
  return (
    <Select
      instanceId={instanceId}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      styles={colourStyles}
      onChange={(value: OnChangeValue<SelectValue, true>, actionMeta) => { handleTagChange(value) }}
    />
  )
}