import React, { createContext, useContext, useState, ReactNode } from 'react';
import { isEqual } from 'lodash-es';

interface Setting {
  key: string;
  element: ReactNode;
}

interface SettingsContextProps {
  settings: Setting[];
  registerSetting: (key: string, element: ReactNode) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Setting[]>([]);

  const registerSetting = (key: string, element: ReactNode) => {
    setSettings((prevSettings) => {
      // Check if the setting with the same key already exists
      const existingSettingIndex = prevSettings.findIndex(setting => setting.key === key);
      if (existingSettingIndex !== -1) {
        // Check if the new element is different from the existing one
        if (!isEqual(prevSettings[existingSettingIndex].element, element)) {
          // Replace the existing setting
          const updatedSettings = [...prevSettings];
          updatedSettings[existingSettingIndex] = { key, element };
          return updatedSettings;
        }
        // If the element is the same, return the previous settings
        return prevSettings;
      }
      // Add the new setting
      return [...prevSettings, { key, element }];
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, registerSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};