export const makeGroup = (element: HTMLDivElement) => {
  const choiceRegex = /^[①②③④⑤⑥⑦⑧⑨⑩]/;

  const titleGroup: HTMLElement[] = [];
  const choiceGroup: HTMLElement[] = [];

  Array.from(element.children ?? []).forEach((div) => {
    const text = div.textContent?.trim() || '';

    if (choiceRegex.test(text)) choiceGroup.push(div as HTMLElement);
    else titleGroup.push(div as HTMLElement);
  });

  const titleWrapper = document.createElement('div');
  titleWrapper.className = 'question-title-group';
  titleGroup.forEach((el) => titleWrapper.appendChild(el));

  const choiceWrapper = document.createElement('div');
  choiceWrapper.className = 'question-choice-group';
  choiceGroup.forEach((el) => {
    const firstTextNode = Array.from(el.childNodes).find((n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim());
    if (!firstTextNode) return;

    const textContent = firstTextNode.textContent!;
    const match = textContent.match(choiceRegex);

    if (match) {
      const span = document.createElement('span');
      span.className = 'choice-index';
      span.textContent = match[0];

      // 첫 문자 이후 나머지 텍스트도 분리 보존
      const rest = textContent.slice(match[0].length);
      const restNode = document.createTextNode(rest);

      el.replaceChild(restNode, firstTextNode);
      el.insertBefore(span, restNode);
    }

    const children = Array.from(el.childNodes);
    const indexSpan = children.find(
      (node) => node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).classList.contains('choice-index'),
    );

    const wrapper = document.createElement('div');
    children.forEach((child) => {
      if (child !== indexSpan) wrapper.appendChild(child);
    });

    if (indexSpan) {
      el.innerHTML = '';
      el.appendChild(indexSpan);
      el.appendChild(wrapper);
    }

    choiceWrapper.appendChild(el);
  });

  element.innerHTML = '';

  element.appendChild(titleWrapper);
  element.appendChild(choiceWrapper);
};
