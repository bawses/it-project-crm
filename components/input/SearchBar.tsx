// A simple controlled search bar with a looking-glass icon

import { Box, InputBase } from "@material-ui/core";

// MaterialUI Icons
import SearchIcon from "@material-ui/icons/Search";

interface SearchBarProps {
  value: string,
  handleChange: (newVal: string) => void
}

export default function SearchBar({ value, handleChange }: SearchBarProps) {
  return (
    <Box boxShadow={3} display="flex" paddingY={1} mb={1} borderRadius={6}>
      <Box width={2} mr={5} ml={2}><SearchIcon /></Box>
      <InputBase
        placeholder="Search your contacts..."
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        fullWidth={true}
      />
    </Box>
  )
}