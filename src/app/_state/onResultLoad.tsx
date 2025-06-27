import { Dispatch, SetStateAction } from 'react';

export const onResultLoad = (element: HTMLDivElement, setIsLoaded: Dispatch<SetStateAction<boolean>>) => {
  const observer = new MutationObserver(() => {
    const images = element.querySelectorAll('img');
    if (images && images.length > 0) {
      const promises = Array.from(images).map((image) => {
        return new Promise<void>((resolve, reject) => {
          if (image.complete) resolve();
          else {
            image.onload = () => resolve();
            image.onerror = reject;
          }
        });
      });

      Promise.all(promises)
        .catch(() => {
          console.error('Image loading error');
        })
        .finally(() => setIsLoaded(true));
    } else {
      setIsLoaded(true);
    }
  });

  observer.observe(element, {
    childList: true,
    subtree: true,
  });

  return observer;
};
