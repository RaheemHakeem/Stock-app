import { AutoComplete } from "../components/AutoComplete";
import { StockList } from "../components/StockList";
export const StockOverviewPage = () => {
  return (
    <div>
      <div className="container">
        <h2 className="mt-5 text-center">Rav Stocks</h2>
      </div>
      <AutoComplete />
      <StockList />
    </div>
  );
};
