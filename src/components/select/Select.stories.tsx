import { Meta, Story } from '@storybook/react';
import { Select } from './Select';
import { SelectProps } from './Select';
import { useState } from 'react';

const meta: Meta<SelectProps> = {
  component: Select,
  title: 'Components/Select',
};

export default meta;

const Template: Story<SelectProps> = (args) => {
  const [currentSelection, setCurrentSelection] = useState(args.options[0]);

  return (
    <Select
      {...args}
      selected={currentSelection}
      onChange={setCurrentSelection}
    />
  );
};

export const DefaultSelect = Template.bind({});
DefaultSelect.args = {
  options: [
    { title: '1 опция', value: '1 опция', className: '' },
    { title: '2 опция', value: '2 опция', className: '' },
    { title: '3 опция', value: '3 опция', className: '' },
    { title: '4 опция', value: '4 опция', className: '' },
  ],
  placeholder: 'Выберите опцию',
  title: 'Название выбора',
};
