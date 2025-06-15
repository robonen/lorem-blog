import { clamp } from '@robonen/stdlib';
import { nextTick, onMounted, onUnmounted, ref, type TemplateRef, watch } from 'vue';

export function useTextAreaAutosize(textareaRef: TemplateRef<HTMLTextAreaElement | null>) {
  const minHeight = ref(0);
  const maxHeight = ref(Infinity);

  const resize = () => nextTick(() => {
    const textarea = textareaRef.value;
    if (!textarea)
      return;

    textarea.style.height = 'auto';

    const newHeight = clamp(textarea.scrollHeight, minHeight.value, maxHeight.value);

    textarea.style.height = `${newHeight}px`;

    textarea.style.overflowY = newHeight >= maxHeight.value ? 'auto' : 'hidden';
  });

  const handleInput = () => {
    resize();
  };

  onMounted(() => {
    const textarea = textareaRef.value;
    if (textarea) {
      minHeight.value = textarea.offsetHeight;

      textarea.addEventListener('input', handleInput);
      textarea.addEventListener('paste', handleInput);

      resize();
    }
  });

  onUnmounted(() => {
    const textarea = textareaRef.value;
    if (textarea) {
      textarea.removeEventListener('input', handleInput);
      textarea.removeEventListener('paste', handleInput);
    }
  });

  watch(textareaRef, (newTextarea) => {
    if (newTextarea) {
      minHeight.value = newTextarea.offsetHeight;
      resize();
    }
  });

  const setMinHeight = (height: number) => {
    minHeight.value = height;
    resize();
  };

  const setMaxHeight = (height: number) => {
    maxHeight.value = height;
    resize();
  };

  return {
    resize,
    setMinHeight,
    setMaxHeight,
  };
}
