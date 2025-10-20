import { Checkbox, Combobox, Input, Pill, PillsInput, useCombobox } from '@mantine/core';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  data: string[];
  value: string[];
  setValue: (val: string[]) => void;
}
const MultiSelectDropdown = ({ data, value, setValue }: Props) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const values = value.length > 1 ? value.join(', ') : '';

  const handleValueSelect = (val: string) => {
    const arr = value.includes(val) ? value.filter((v) => v !== val) : [...value, val];
    setValue(arr);
  }

  const handleValueRemove = (val: string) => {
    const arr = value.filter((v) => v !== val);
    setValue(arr);
  }

  const options = data.map((item) => {
    return (
      <Combobox.Option value={item} key={item} p={14}>
        <Checkbox value={item} label={item} color="#1C1B1F" fw="600" checked={value.includes(item)} onChange={() => handleValueSelect(item)} />
      </Combobox.Option>
    );
  });

  const isDropdownOpened = combobox.dropdownOpened;

  return (
    <Combobox store={combobox} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput pointer onClick={() => combobox.toggleDropdown()} className='w-full'
          classNames={{
            input: `border-3 ${isDropdownOpened ? 'bg-[#FFFFFF] border-[#131316]' : 'bg-[#EFF1F6] border-[#EFF1F6]'}`
          }}
          rightSection={
            isDropdownOpened ? 
            <ChevronUp width={20} height={20} /> : 
            <ChevronDown width={20} height={20} />
          }
          rightSectionPointerEvents="none"
        >
          <Pill.Group className='truncate'>
            {values.length > 0 ? (
              values
            ) : (
              <Input.Placeholder>Pick one or more values</Input.Placeholder>
            )}

            <Combobox.EventsTarget>
              <PillsInput.Field
                type="hidden"
                onBlur={() => combobox.closeDropdown()}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && value.length > 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown style={{ boxShadow: '0px 6px 12px 0px #5C738314, 0px 4px 8px 0px #5C738314'}}>
        <Combobox.Options>
          {options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default MultiSelectDropdown;
