import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import styled from "styled-components";

const ChartBox = styled.div`
  border: 2px solid ${(props) => props.theme.boxColor};
  padding: 5px;
  border-radius: 10px;
  font-size: 12px;
`;

const PriceTable = styled.table``;

const DataTr = styled.tr`
  display: table-row;
`;
const DateTd = styled.td`
  display: table-cell;
  width: 15%;
  padding: 5px;
  text-align: center;
`;
const PriceTd = styled.td`
  display: table-cell;
  padding: 5px 10px 5px 0;
  width: 10%;
  text-align: right;
  border-left: 1px solid ${(props) => props.theme.boxColor};
`;

interface ICharProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function formatDate(date: Date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function Price({ coinId }: ICharProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["price", coinId], () => fetchCoinHistory(coinId), {
    refetchInterval: 600000,
  });

  return (
    <ChartBox>
      {isLoading ? (
        "Loading price..."
      ) : (
        <PriceTable>
          <tbody>
            <tr>
              <DateTd>Date</DateTd>
              <th>Open($)</th>
              <th>Close($)</th>
              <th>High($)</th>
              <th>Low($)</th>
              <th>Vol</th>
            </tr>
            {data?.map((price) => (
              <DataTr key={price.time_open}>
                <DateTd>{formatDate(new Date(price.time_open * 1000))}</DateTd>
                <PriceTd>{price.open}</PriceTd>
                <PriceTd>{price.close}</PriceTd>
                <PriceTd>{price.high}</PriceTd>
                <PriceTd>{price.low}</PriceTd>
                <PriceTd>{Math.round(Number(price.volume) * 100) / 100}</PriceTd>
              </DataTr>
            ))}
          </tbody>
        </PriceTable>
      )}
    </ChartBox>
  );
}

export default Price;
