import useLocation from "@/hooks/useLocation";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [_, setLocation] = useLocation();

  useEffect(() => {
    setLocation("/auth/signin");
  }, []);

  return null;
};

export default Home;
