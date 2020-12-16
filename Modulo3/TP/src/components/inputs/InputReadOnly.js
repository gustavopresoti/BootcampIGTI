import React, { Component } from 'react';
import { calculateSalaryFrom } from '../../helpers/salary';
import { formatNumber } from '../../helpers/formatHelpers';
import css from './inputreadonly.module.css';

export default class InputReadOnly extends Component {
  render() {
    const { fullSalary } = this.props;
    const newSalary = calculateSalaryFrom(fullSalary);

    return (
      <div className={css.flexRow}>
        <section className={css.section}>
          <label>Base INSS</label>
          <input
            className={css.baseINSS}
            value={formatNumber(newSalary.baseINSS)}
            type="text"
            readOnly
          />
        </section>

        <section className={css.section}>
          <label>Desconto INSS</label>
          <input
            className={css.discountINSS}
            value={`${formatNumber(newSalary.discountINSS)} (${formatNumber(
              newSalary.checkedPercentINSS
            )}%)`}
            type="text"
            readOnly
          />
        </section>

        <section className={css.section}>
          <label>Base IRPF</label>
          <input
            className={css.baseIRPF}
            value={formatNumber(newSalary.baseIRPF)}
            type="text"
            readOnly
          />
        </section>

        <section className={css.section}>
          <label>Desconto IRPF</label>
          <input
            className={css.discountIRPF}
            value={`${formatNumber(newSalary.discountIRPF)} (${formatNumber(
              newSalary.checkedPercentIRPF
            )}%)`}
            type="text"
            readOnly
          />
        </section>

        <section className={css.section}>
          <label>Salário líquido</label>
          <input
            className={css.netSalary}
            value={`${formatNumber(newSalary.netSalary)} (${formatNumber(
              newSalary.checkedPercentNetSalary
            )}%)`}
            type="text"
            readOnly
          />
        </section>
      </div>
    );
  }
}
