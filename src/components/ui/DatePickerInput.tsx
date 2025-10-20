import { DatePickerInput } from "@mantine/dates";
import type { TDateRange } from "./DateRangePicker";
import type { Dispatch, SetStateAction } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  isOpen: boolean;
  value: string | null;
  setValue: Dispatch<SetStateAction<string | null>>;
  placeholder: string;
  datePickerType: 'start' | 'end';
  dateRange: TDateRange;
  setActivePicker: Dispatch<SetStateAction<"start" | "end" | null>>;
}
const DatePickerCustomInput = ({
  isOpen,
  value,
  setValue,
  placeholder,
  datePickerType,
  dateRange,
  setActivePicker
}: Props) => {
  return (
    <DatePickerInput
      placeholder={placeholder}
      value={value}
      onChange={setValue}
      maxDate={dateRange.endDate || new Date()}
      w={180}
      hideOutsideDates
      weekendDays={[]}
      valueFormat="DD MMM YYYY"
      onClick={() => setActivePicker(datePickerType)}
      onBlur={() => setActivePicker(null)}
      rightSection={
        isOpen ? 
        <ChevronUp width={20} height={20} /> : 
        <ChevronDown width={20} height={20} />
      }
      rightSectionPointerEvents="none"
      classNames={{
        input: `border-3 ${isOpen ? 'bg-[#FFFFFF] border-[#131316]' : 'bg-[#EFF1F6] border-[#EFF1F6]'}`
      }}
    />
  )
}

export default DatePickerCustomInput;
