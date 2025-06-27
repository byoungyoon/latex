"use client"

import cx from 'classnames';
import { renderMathInElement } from 'mathlive';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { makeGroup } from '@/app/_state/makeGroup';
import { onResultLoad } from '@/app/_state/onResultLoad';
import { useLatex } from '@/app/_state/useLatex';

type Props = {
  content: string;
  className?: string;
  questionIndex?: number;

  onLoad?: (height: number[], element?: HTMLElement[]) => void;
};

export default function BaseMathJax({ content, className, onLoad, questionIndex = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  /**
   * 받아오는 content 개조 (맨 상위 div 제거, span 태그 제거, 한국에서만 쓰는 수식기호 변형
   */
  const replaceContent = useMemo(
    () =>
      content
        .replace(/^<DIV[^>]*>/, '')
        .replace(/<\/DIV>$/, '')
        .replace(/<SPAN[^>]*>/gi, '')
        .replace(/<\/SPAN>/gi, '')
        .replaceAll('font-size', '')
        .replace(/<br[^>]*>/gi, '')
        .replaceAll(' black', ' #aaa')
        .replaceAll('\\rightarrow', '→')
        .replace(/꿵/g, '<span style="font-family: math_bjsc3">꿵</span>')
        .replace(/꿶/g, '<span style="font-family: math_bjsc3">꿶</span>')
        .replace(/꿸/g, '<span style="font-family: math_bjsc3">꿸</span>')
        .replaceAll('\\cfrac', '\\displaystyle \\frac'),
    [content],
  );

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    /**
     * 라텍스 문자 개조 (mathlive에서 사용할 수 있게 변경)
     */
    const nContent = replaceContent.replace(/\[!\s*(.*?)\s*!]/g, (_, math) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      math = useLatex(math);
      return `\\(${math}\\)`;
    });

    ref.current.innerHTML = nContent === '' ? '없음' : nContent;

    makeGroup(ref.current);
    // concatTileGroup(ref.current);

    /**
     * content가 공백일 경우 변경이 되는 경우가 없어서 예외처리
     */
    if (replaceContent === nContent) setIsLoaded(true);
    /**
     * 이미지나 라텍스 문자로 인해 높이값 변화 측정을 위해서 observer 처리
     */
    const observer = onResultLoad(ref.current, setIsLoaded);

    renderMathInElement(ref.current);
    return () => observer.disconnect();
  }, [replaceContent]);

  useEffect(() => {
    if (!ref.current || !isLoaded || !onLoad) return;

    const groups = ref.current.querySelectorAll('.question-choice-group');

    groups.forEach((element) => {
      const group = element as HTMLDivElement;
      const children = Array.from(group.children) as HTMLDivElement[];

      if (children.length === 0) return;

      const maxWidth = Math.max(...children.map((el) => el.scrollWidth));
      const groupWidth = group.getBoundingClientRect().width;

      const ratio = maxWidth / groupWidth;

      let itemsPerRow = questionIndex;
      if (questionIndex === 0) {
        if (ratio <= 0.2) itemsPerRow = 5;
        else if (ratio <= 0.33) itemsPerRow = 3;
        else if (ratio <= 0.5) itemsPerRow = 2;
        else itemsPerRow = 1;
      }

      children.forEach((child) => {
        child.style.flex = `0 0 ${100 / itemsPerRow}%`;
      });
    });

    onLoad(
      Array.from(ref.current.children).map((child) => (child as HTMLElement).getBoundingClientRect().height),
      Array.from(ref.current.children) as HTMLElement[],
    );
  }, [isLoaded]);

  return <div ref={ref} className={cx(className, 'container')} />;
}
