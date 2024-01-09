import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const CoinsList = styled.ul`
  overflow-y: scroll;
  flex-grow: 1;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;

  a {
    transition: all 0.2s ease-in-out;
    display: flex;
    align-items: center;
    padding: 20px;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
      font-size: 16.5px;
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const CoinIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
        <link rel="icon" href="/favicon.ico" data-react-helmet="true" />
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}/chart`,
                  state: { name: coin.name, symbol: coin.symbol.toLowerCase() },
                }}
              >
                <CoinIcon src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
