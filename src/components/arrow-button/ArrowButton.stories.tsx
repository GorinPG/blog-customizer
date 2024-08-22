import { Meta, Story } from '@storybook/react';
import { ArrowButton, ArrowButtonProps } from './ArrowButton';

const meta: Meta<ArrowButtonProps> = {
  component: ArrowButton,
  title: 'Components/ArrowButton',
};

export default meta;

const Template: Story<ArrowButtonProps> = (args) => <ArrowButton {...args} />;

export const DefaultArrowButton = Template.bind({});
DefaultArrowButton.args = {
  isOpen: false,
  onToggle: () => console.log('Button clicked'),
};