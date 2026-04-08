import { useKickoffStore } from '../state/kickoffStore';

/**
 * Hook for replacing template variables in text
 * Variables: {{kundenname}}, {{domain}}
 */
export function useVariables() {
  const projectSettings = useKickoffStore((state) => state.projectSettings);

  /**
   * Replace all template variables in the given text
   */
  const replaceVariables = (text: string): string => {
    if (!text) return text;

    return text
      .replace(/\{\{kundenname\}\}/g, projectSettings.kundenname || 'Kunde')
      .replace(/\{\{domain\}\}/g, projectSettings.domain || 'www.beispiel.de');
  };

  /**
   * Get a specific variable value
   */
  const getVariable = (name: 'kundenname' | 'domain'): string => {
    switch (name) {
      case 'kundenname':
        return projectSettings.kundenname || 'Kunde';
      case 'domain':
        return projectSettings.domain || 'www.beispiel.de';
      default:
        return '';
    }
  };

  return {
    replaceVariables,
    getVariable,
    kundenname: projectSettings.kundenname || 'Kunde',
    domain: projectSettings.domain || 'www.beispiel.de',
  };
}

export default useVariables;
