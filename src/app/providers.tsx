import { UiProvider } from '@contexts/uiContext';

import { ScrollProvider } from '@/contexts/ScrollContext';

interface IProviders {
  children: React.ReactNode;
}

export default function Providers({ children }: IProviders): React.ReactNode {
  return (
    <UiProvider>
      <ScrollProvider>{children}</ScrollProvider>
    </UiProvider>
  );
}
