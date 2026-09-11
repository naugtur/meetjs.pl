// solid-icons ships 1.x-era types; its IconProps resolves `class` off the old
// JSX namespace. Augment it so icon components accept `class` under 2.0.
import 'solid-icons';

declare module 'solid-icons' {
  interface IconProps {
    class?: unknown;
  }
}
