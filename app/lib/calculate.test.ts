import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calcAmount,
  calcDelivered,
  convertK2OToElementalK,
  convertP2O5ToElementalP,
  type Fertilizer,
} from './calculate.ts';

const urea: Fertilizer = {
  id: '66',
  name: 'Urea',
  code: '46-0-0',
  N: 46,
  P: 0,
  K: 0,
  form: 'granular',
  category: 'nitrogen',
  p_unit: 'P2O5',
  k_unit: 'K2O',
};

describe('fertilizer conversions and calculator units', () => {
  it('converts P2O5 and K2O to elemental P and K using the stated factors', () => {
    assert.equal(convertP2O5ToElementalP(10), 4.364);
    assert.equal(convertK2OToElementalK(10), 8.302);
  });

  it('calculates the amount required for a target percent by volume', () => {
    const result = calcAmount({
      targetN: 0.1,
      targetP: 0,
      targetK: 0,
      volumeLitres: 1,
      fertilizer: urea,
    });

    assert.equal(result.amountG, 2.17);
    assert.equal(result.actualN, 0.1);
    assert.equal(result.limitingNutrient, 'N');
  });

  it('returns delivered nutrient percentages by volume', () => {
    const result = calcDelivered(2.17, urea, 1);
    assert.equal(result.actualN, 0.1);
    assert.equal(result.actualP, 0);
    assert.equal(result.actualK, 0);
  });
});