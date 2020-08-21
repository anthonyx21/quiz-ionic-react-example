import React from 'react';

export const shuffle = <T extends unknown>(array: Array<T>) => {
    const output = [...array];
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * i);
        const temp = output[i];
        output[i] = output[j];
        output[j] = temp;
    }
    return output;
};
// const shuffle = function <T>(array: Array<T>) {
//     const output = [...array];
//     for (let i = array.length - 1; i > 0; i -= 1) {
//         const j = Math.floor(Math.random() * i);
//         const temp = output[i];
//         output[i] = output[j];
//         output[j] = temp;
//     }
//     return output;
// };
export const renderHTML = (escapedHTML: string) =>
    React.createElement('div', {
        dangerouslySetInnerHTML: { __html: escapedHTML }
    });
