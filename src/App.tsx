import React, { ChangeEvent, useState } from 'react';

import api from './services/api';

import CurrencyInput from './components/CurrencyInput';

import GlobalStyle from './styles';

interface IFormResponse {
  aliquota: number;
  parcela: number;
  dependentes: number;
  irpf: number
}

const App: React.FC = () => {
  const [hasResponse, setHasResponse] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [salary, setSalary] = useState<number>(0);
  const [dependents, setDependents] = useState<number>(0);

  const [irpfAliquot, setIrpfAliquot] = useState<number>(0);
  const [irpfQuotaValue, setIrpfQuotaValue] = useState<number>(0);
  const [irpfDependentValue, setIrpfDependentValue] = useState<number>(0);
  const [irpfFinalValue, setIrpfFinalValue] = useState<number>(0);

  const handleName = (event: ChangeEvent<HTMLInputElement>): void => {
    const newName = event.currentTarget.value;
    setName(newName);
    console.log(newName);
  }

  const handleSalary = (event: ChangeEvent<HTMLInputElement>): void => {
    const newSalary = parseFloat(event.currentTarget.value.replace(',', '.'));
    setSalary(newSalary);
  };

  const handleDependents = (event: ChangeEvent<HTMLInputElement>): void => {
    const newDependents = parseFloat(event.currentTarget.value.replace(',', '.'));
    setDependents(newDependents);
  };

  const handleSubmitForm = (): void => {
    api.post('impostos/irpf', {
      name, salary, dependents
    }).then((response) => {
      const { aliquota, parcela, dependentes, irpf } = response.data;
    
      setIrpfAliquot(aliquota);
      setIrpfQuotaValue(parcela);
      setIrpfDependentValue(dependentes);
      setIrpfFinalValue(irpf);
      setHasResponse(true);
    });
    console.log('Aqui');
  }

  return (
    <>
      <GlobalStyle />
      <section>
        <form>
          <div className="section-header">Cálculo de IRPF</div>
          <div className="section-body">
            <div>
              <label>Nome:</label>
              <input type="text" name="name" onChange={handleName} />
            </div>
            <div>
              <label>Salário:</label>
              <CurrencyInput
                name="salary"
                placeholder="0,00"
                onChange={handleSalary}
              />
            </div>
            <div>
              <label>Dependentes:</label>
              <CurrencyInput name="dependents" placeholder="0" onChange={handleDependents} />
            </div>
          </div>
          <div className="section-footer">
            <button type="button" onClick={handleSubmitForm}>Calcular</button>
          </div>
        </form>
      </section>

      {hasResponse && <section>
        <div className="section-header">Resposta</div>
        <div className="section-body">
          <p><strong>Alíquota:</strong> { Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(irpfAliquot) }%</p>
          <p><strong>Parcela:</strong> { Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(irpfQuotaValue) }</p>
          <p><strong>Valor por Dependentes:</strong> { Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(irpfDependentValue) }</p>
          <p><strong>IRPF:</strong> { Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(irpfFinalValue) }</p>
        </div>
      </section>}
    </>
  );
}

export default App;