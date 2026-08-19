const fs = require('fs');

const SAMPLE_RATE = 44100;
const TARGET_PEAK = 0.80;
const FADE_IN_MS = 2;
const FADE_OUT_MS = 2;

const FILES = ['Shoot51', 'player_death', 'alien_death1', 'key'];

/**
 * Reads all samples of a WAV file.
 * @param {Buffer} buffer - The file data
 * @returns {number[]} The samples
 */
function readSamples(buffer) {
    const dataSize = buffer.readInt32LE(40);
    const sampleCount = dataSize / 2;
    const samples = [];
    for (let i = 0; i < sampleCount; i++) {
        samples.push(buffer.readInt16LE(44 + i * 2));
    }
    return samples;
}

/**
 * Removes the DC offset so the mean value is zero.
 * @param {number[]} samples - The samples
 * @returns {number[]} The samples without offset
 */
function removeDcOffset(samples) {
    let sum = 0;
    for (let i = 0; i < samples.length; i++) {
        sum += samples[i];
    }
    const mean = sum / samples.length;
    const result = [];
    for (let i = 0; i < samples.length; i++) {
        result.push(samples[i] - mean);
    }
    return result;
}

/**
 * Scales the samples so the loudest value reaches 85 percent.
 * @param {number[]} samples - The samples
 * @returns {number[]} The scaled samples
 */
function normalize(samples) {
    let loudest = 0;
    for (let i = 0; i < samples.length; i++) {
        const absolute = Math.abs(samples[i]);
        if (absolute > loudest) {
            loudest = absolute;
        }
    }
    const target = TARGET_PEAK * 32767;
    const factor = target / loudest;
    const result = [];
    for (let i = 0; i < samples.length; i++) {
        result.push(Math.round(samples[i] * factor));
    }
    return result;
}

/**
 * Fades the start and the end of the samples to avoid clicks.
 * @param {number[]} samples - The samples
 * @returns {number[]} The faded samples
 */
function applyFades(samples) {
    const fadeIn = Math.round((FADE_IN_MS / 1000) * SAMPLE_RATE);
    const fadeOut = Math.round((FADE_OUT_MS / 1000) * SAMPLE_RATE);
    const result = samples.slice();
    for (let i = 0; i < fadeIn; i++) {
        result[i] = Math.round(result[i] * (i / fadeIn));
    }
    for (let i = 0; i < fadeOut; i++) {
        const position = result.length - 1 - i;
        result[position] = Math.round(result[position] * (i / fadeOut));
    }
    return result;
}

/**
 * Writes the samples back into the WAV file.
 * @param {Buffer} buffer - The file data
 * @param {number[]} samples - The samples
 */
function writeSamples(buffer, samples) {
    for (let i = 0; i < samples.length; i++) {
        buffer.writeInt16LE(samples[i], 44 + i * 2);
    }
}

/**
 * Repairs one WAV file.
 * @param {string} name - The file name without extension
 */
function fixFile(name) {
    const path = 'sounds/' + name + '.wav';
    const buffer = fs.readFileSync(path);
    const samples = readSamples(buffer);
    const withoutOffset = removeDcOffset(samples);
    const normalized = normalize(withoutOffset);
    const faded = applyFades(normalized);
    writeSamples(buffer, faded);
    fs.writeFileSync(path, buffer);
    console.log('Fixed: ' + name + '.wav');
}

for (const name of FILES) {
    fixFile(name);
}
