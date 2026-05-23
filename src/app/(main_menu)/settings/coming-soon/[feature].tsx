import { useLocalSearchParams } from "expo-router";

import { ComingSoonDetail } from "#shared/components/ComingSoon";

const ComingSoonFeaturePage: React.FC = () => {
  const { feature } = useLocalSearchParams<{ feature: string }>();
  return <ComingSoonDetail slug={feature} />;
};
export default ComingSoonFeaturePage;
