import { I18nextProvider } from 'react-i18next';
import i18n from 'settings/i18n';
import { ChildrenProps } from 'types/children-props';

function I18Provider ({ children }: ChildrenProps) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export { I18Provider };
