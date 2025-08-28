import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { dropdownStyles } from './DropDown.styles';
import { DropdownProps } from '../../types/Dropdown';

type DropdownItem = {
  label: string;
  value: string;
};

const items: DropdownItem[] = [
  { label: 'Mitch', value: 'Mitch' },
  { label: 'Lizzie', value: 'Lizzie' },
  { label: 'Jewell', value: 'Jewell' },
  { label: 'Andrea', value: 'Andrea' },
];

const Dropdown: React.FC<DropdownProps> = ({ onSelect, populatedVal }) => {
  const getValue = (val: string | undefined) => {
    if (!val) return null;

    for (let i = 0; i < items.length; i++) {
      if (items[i].value === val)
        return { label: `${items[i].label}`, value: `${items[i].value}` };
    }
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<DropdownItem | null>(
    getValue(populatedVal) ?? null,
  );

  const handleSelect = (item: DropdownItem) => {
    setSelected(item);
    setIsOpen(false);
    onSelect(item.value);
  };

  const renderItem: ListRenderItem<DropdownItem> = ({ item }) => (
    <TouchableOpacity
      style={dropdownStyles.dropdownItem}
      onPress={() => handleSelect(item)}
    >
      <Text style={dropdownStyles.dropdownItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={dropdownStyles.container}>
      {/* Dropdown Button */}
      <TouchableOpacity
        style={dropdownStyles.dropdownButton}
        onPress={() => setIsOpen(prev => !prev)}
      >
        <Text style={dropdownStyles.dropdownButtonText}>
          {selected ? selected.label : 'Select a staff member'}
        </Text>
      </TouchableOpacity>

      {/* Dropdown List */}
      {isOpen && (
        <View style={dropdownStyles.dropdownList}>
          <FlatList
            data={items}
            keyExtractor={item => item.value}
            renderItem={renderItem}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
};

export default Dropdown;
