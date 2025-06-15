import { type MaybeRefOrGetter, onScopeDispose, toValue, watchEffect } from 'vue';

export function useBodyScrollLock(isLocked: MaybeRefOrGetter<boolean>) {
  let originalOverflow: string | null = null;

  const lock = () => {
    if (originalOverflow === null)
      originalOverflow = document.body.style.overflow || '';

    document.body.style.overflow = 'hidden';
  };

  const unlock = () => {
    if (originalOverflow !== null) {
      document.body.style.overflow = originalOverflow;
      originalOverflow = null;
    }
  };

  watchEffect(() => {
    if (toValue(isLocked))
      lock();
    else
      unlock();
  });

  onScopeDispose(() => {
    unlock();
  });

  return {
    lock,
    unlock,
  };
}
