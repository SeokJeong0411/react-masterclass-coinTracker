import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface ICharProps {
  coinId: string;
}

function Chart({ coinId }: ICharProps) {
  const { isLoading, data } = useQuery(["price", coinId], () => fetchCoinHistory(coinId));

  return <h1>Chart</h1>;
}

export default Chart;
