/** Joins truthy class names (former src/utils/classNames.tsx). */
export const classNames = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ');
