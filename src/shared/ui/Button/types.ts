import type { ButtonHTMLAttributes } from 'vue';

export const buttonVariants = {
  primary: 'px-4 py-2 bg-primary text-white disabled:bg-gray-100 disabled:text-gray-400',
  secondary: 'px-4 py-2 bg-primary-light text-primary-dark disabled:bg-gray-100 disabled:text-gray-400',
  ghost: '',
};

export type ButtonVariant = keyof typeof buttonVariants;

export const buttonSizes = {
  base: '',
  icon: '',
};

export type ButtonSize = keyof typeof buttonSizes;

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: ButtonHTMLAttributes['type'];
}
