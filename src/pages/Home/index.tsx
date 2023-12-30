import useLocation from "@/hooks/useLocation";
import { SIGNIN } from "@/utils/constants/paths";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [_, setLocation] = useLocation();

  useEffect(() => {
    setLocation(SIGNIN);
  }, []);

  return null;
};

export default Home;
