import { Meta, Story } from '@storybook/react';
import { RadioGroup } from './RadioGroup';
import { RadioGroupProps } from './RadioGroup';
import { useState } from 'react';

const meta: Meta<RadioGroupProps> = {
  component: RadioGroup,
  title: 'Components/RadioGroup',
};

export default meta;

const Template: Story<RadioGroupProps> = (args) => {
  const [currentSelection, setCurrentSelection] = useState(args.options[0]);

  return (
    <RadioGroup
      {...args}
      selected={currentSelection}
      onChange={setCurrentSelection}
    />
  );
};

export const DefaultRadioGroup = Template.bind({});
DefaultRadioGroup.args = {
  options: [
    { title: '1 опция', value: '1 опция', className: '' },
    { title: '2 опция', value: '2 опция', className: '' },
    { title: '3 опция', value: '3 опция', className: '' },
    { title: '4 опция', value: '4 опция', className: '' },
  ],
  name: 'radio',
  title: 'Название радиогруппы',
};
