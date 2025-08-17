import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useSocket } from 'hooks/useSocket';
import { OPERATOR } from 'constants/operator.enum';
import { VALUES_KEY_LABELS } from 'constants/values_key';

// Data value of the provider context
type ContextValue = {
  operator?: OPERATOR;
  metrics?: string[];
  dateRange?: [string, string];
  setOperator?: (_operator: OPERATOR) => void;
  setDateRange?: (_dateRange: [string, string]) => void;
  setMetrics?: (_metrics: string[]) => void;
};
// default value of the context
export const defaultValue: ContextValue = {
  dateRange: ['2004-03-01T04:00:00.000Z', '2004-05-01T04:00:00.000Z'],
  operator: OPERATOR.AVG,
};

// create context
const Context = createContext<ContextValue>(defaultValue);

// Proptypes of Provider Component
type ContextProps = {
  children: ReactNode;
};

/**
 * Provider component
 * */
const DataProvider = ({ ...props }: ContextProps) => {
  const [operator, setOperator] = useState<ContextValue['operator']>(defaultValue.operator);
  const [dateRange, setDateRange] = useState<ContextValue['dateRange']>(defaultValue.dateRange);
  const [metrics, setMetrics] = useState<ContextValue['metrics']>(Object.keys(VALUES_KEY_LABELS));

  const { data, isConnected } = useSocket();

  console.log('Real time data', ' =>', data);

  return (
    <Context.Provider value={{ operator, setOperator, dateRange, setDateRange, metrics, setMetrics }} {...props} />
  );
};

const useData = () => {
  const context = useContext(Context);
  if (context === undefined) {
    return defaultValue;
  }
  return context;
};

export { DataProvider, useData };
