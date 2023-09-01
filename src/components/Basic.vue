
<script setup lang="ts">
import * as tf from '@tensorflow/tfjs';
import {capacityInputs, dataSizeInputs, failureCountInputs,
transferDaysOutputs, capacityTests, dataSizeTests, failureCountTests} from './data';

defineProps<{
  msg: string
}>()

// const exampleCount = 10;
const exampleCount = capacityInputs.length;
const dimensionCount = 3;

// Define a model for linear regression.
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [dimensionCount]}));

console.log(capacityInputs, dataSizeInputs, failureCountInputs, transferDaysOutputs);

// Prepare the model for training: Specify the loss and the optimizer.
model.compile(
  {
      optimizer: 'rmsprop',
  loss: 'meanSquaredError',
  metrics: ['accuracy'],
    }
  );

// Generate some synthetic data for training.
// const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
// const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);
// const tests = tf.tensor2d([5], [1, 1]);

const input = []
for (let i = 0; i < exampleCount; i++) {
  input.push([capacityInputs[i], dataSizeInputs[i], failureCountInputs[i]]);
};
console.log(input);

const labels = []
for (let i = 0; i < exampleCount; i++) {
  labels.push(transferDaysOutputs[i]);
};
console.log(labels);

const testsData = []
for (let i = 0; i < capacityTests.length; i++) {
  testsData.push([capacityTests[i], dataSizeTests[i], failureCountTests[i]]);
};
console.log(testsData);

// const xs = tf.tensor([capacityInputs, dataSizeInputs, failureCountInputs]);
const xs = tf.tensor2d(input, [exampleCount, dimensionCount]);
const ys = tf.tensor2d(labels, [exampleCount, 1]);
const tests = tf.tensor2d(testsData, [testsData.length, dimensionCount]);

xs.print();
ys.print();
tests.print();

// Train the model using the data.
model.fit(xs, ys).then(() => {
  // Use the model to do inference on a data point the model hasn't seen before:
  const mOutput = model.predict(tests, {verbose: true});
  mOutput.data().then(v => {
    console.log(mOutput, v);
    v.map(e => {
      console.log(scientificToDecimal(e));
    })
  })
});

var scientificToDecimal = function (num) {
    var nsign = Math.sign(num);
    //remove the sign
    num = Math.abs(num);
    //if the number is in scientific notation remove it
    if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
        var zero = '0',
                parts = String(num).toLowerCase().split('e'), //split into coeff and exponent
                e = parts.pop(), //store the exponential part
                l = Math.abs(e), //get the number of zeros
                sign = e / l,
                coeff_array = parts[0].split('.');
        if (sign === -1) {
            l = l - coeff_array[0].length;
            if (l < 0) {
              num = coeff_array[0].slice(0, l) + '.' + coeff_array[0].slice(l) + (coeff_array.length === 2 ? coeff_array[1] : '');
            }
            else {
              num = zero + '.' + new Array(l + 1).join(zero) + coeff_array.join('');
            }
        }
        else {
            var dec = coeff_array[1];
            if (dec)
                l = l - dec.length;
            if (l < 0) {
              num = coeff_array[0] + dec.slice(0, l) + '.' + dec.slice(l);
            } else {
              num = coeff_array.join('') + new Array(l + 1).join(zero);
            }
        }
    }

    return nsign < 0 ? '-'+num : num;
};
</script>

<template>
  <div class="calc">
    <h1 class="green">Basic</h1>
    <h3>
      Uses appliance capacity and customer data size.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

</style>
