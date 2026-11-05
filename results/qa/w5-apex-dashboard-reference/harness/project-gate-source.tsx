import { useProject } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/.reference/foglamp/apps/web/src/components/app/project-context';
// Mirrors AppShell's ProjectGate for the fixture's known nonempty project list.
export function ProjectGate({children}: {children: React.ReactNode}) { const {projectId}=useProject(); return projectId ? <>{children}</> : null; }
