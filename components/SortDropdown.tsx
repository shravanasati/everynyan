import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SortOption {
  title: string;
  value: string;
}

interface SortDropdownProps {
  options: SortOption[];
  value: string;
  onValueChange: (value: string) => void;
}

export function SortDropdown({ options, value, onValueChange }: SortDropdownProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} className="focus:bg-primary/50">
            {option.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

