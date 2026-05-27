import { useLocalSearchParams } from "expo-router";

import { ComingSoonDetail } from "#shared/coming-soon";

const App: React.FC = () => {
  const { feature } = useLocalSearchParams<{ feature: string }>();
  return <ComingSoonDetail slug={feature} />;
};

export default App;
