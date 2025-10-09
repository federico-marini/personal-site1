export function useMDXComponents(
  components: Record<string, React.ComponentType<any>>
) {
  // Return components as-is; avoid client-only contexts/providers.
  return components;
}


