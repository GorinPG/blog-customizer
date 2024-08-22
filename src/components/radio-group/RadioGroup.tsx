import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import { Option } from './Option';
import styles from './RadioGroup.module.scss';

export interface RadioGroupProps {
	name: string;
	options: OptionType[];
	selected: OptionType;
	onChange?: (value: OptionType) => void;
	title: string;
  }

export const RadioGroup = ({
  name,
  options,
  selected,
  onChange,
  title,
}: RadioGroupProps) => {

  const handleOptionChange = (option: OptionType) => onChange?.(option);

  return (
    <div className={styles.wrapper}>
      {title && (
        <Text weight={800} size={12} uppercase>
          {title}
        </Text>
      )}
      <div className={styles.radioGroup}>
        {options.map((option) => (
          <Option
            key={option.value}
            groupName={name}
            value={option.value}
            title={option.title}
            selected={selected}
            onChange={() => handleOptionChange(option)}
            option={option}
          />
        ))}
      </div>
    </div>
  );
};
