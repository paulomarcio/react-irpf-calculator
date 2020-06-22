import React, { InputHTMLAttributes } from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

interface IMaskOptions {
  prefix?: string;
  suffix?: string;
  includeThousandsSeparator?: boolean;
  thousandsSeparatorSymbol?: string;
  allowDecimal?: boolean;
  decimalSymbol?: string;
  decimalLimit?: number; // how many digits allowed after the decimal
  integerLimit?: number; // limit length of integer numbers
  allowNegative?: boolean;
  allowLeadingZeroes?: boolean;
}

interface ICurrencyInput extends InputHTMLAttributes<HTMLInputElement> {
  maskOptions?: IMaskOptions;
}

const defaultMaskOptions = {
  prefix: '',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '',
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

const CurrencyInput: React.FC<ICurrencyInput> = ({
  maskOptions,
  onChange,
  ...inputProps
}: ICurrencyInput) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  });

  return <MaskedInput mask={currencyMask} {...inputProps} onChange={onChange} />;
};

export default CurrencyInput;
