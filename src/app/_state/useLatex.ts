import he from 'he';
import { renderMathInElement } from 'mathlive';

/**
 * 문법이 안 맞는 경우 \\rm -> \\mathrm, \\it -> \\ 로 변경
 * @param latex
 */
export const useLatex = (latex: string) => {
    let result = latex;

    try {
        renderMathInElement(latex);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        result = latex
            .replace(/\\rm/g, '\\mathrm')
            .replace(/\\it/g, '\\')
            .replace(/\\left/g, '')
            .replace(/\\right/g, '')
            .replace(/\\boldsymbol/g, '')
            .replace('* PER *', '\\%');
    }

    return he.decode(result);
};
